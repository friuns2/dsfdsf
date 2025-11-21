import { Hotel } from '../types';

const APIFY_TOKEN = import.meta.env.VITE_APIFY_TOKEN;
const ACTOR_NAME = 'poidata~google-maps-scraper';
const API_BASE_URL = 'https://api.apify.com/v2';

// NOTE: A CORS proxy is used to bypass browser security restrictions (Same-Origin Policy)
// that prevent web pages from making requests to a different domain. The Apify API does not
// send the necessary CORS headers for direct browser-side access.
// We are using 'thingproxy' as it is known to correctly handle POST requests with JSON bodies.
const CORS_PROXY = 'https://thingproxy.freeboard.io/fetch/';

const proxiedUrl = (url: string) => `${CORS_PROXY}${url}`;

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchHotelReviews = async (
  setLoadingMessage: (message: string) => void
): Promise<Hotel[]> => {
  const actorInput = {
    searchStringsArray: ["hotel"],
    locationQuery: "Danang",
    maxCrawledPlacesPerSearch: 50,
    maxReviews: 10,
  };

  try {
    // 1. Start the Actor run
    setLoadingMessage('Starting scraper... This may take a moment.');
    const runUrl = `${API_BASE_URL}/acts/${ACTOR_NAME}/runs?token=${APIFY_TOKEN}`;
    const runResponse = await fetch(
      proxiedUrl(runUrl),
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(actorInput),
      }
    );

    if (!runResponse.ok) {
      const errorText = await runResponse.text();
      console.error("Proxy/API Error Body:", errorText);
      throw new Error(`Failed to start Apify actor. Server responded with ${runResponse.status}: ${runResponse.statusText}`);
    }

    const runData = await runResponse.json();
    const { id: runId, defaultDatasetId } = runData.data;

    // 2. Poll for the run to complete
    setLoadingMessage('Scraping in progress... this can take a few minutes.');
    let runStatus = '';
    let attempt = 0;
    while (runStatus !== 'SUCCEEDED' && attempt < 30) { // Timeout after ~5 minutes
      await delay(10000); // Poll every 10 seconds
      attempt++;
      setLoadingMessage(`Scraping in progress... (check ${attempt}/30)`);
      
      const statusUrl = `${API_BASE_URL}/acts/${ACTOR_NAME}/runs/${runId}?token=${APIFY_TOKEN}`;
      const statusResponse = await fetch(
        proxiedUrl(statusUrl)
      );
      if (!statusResponse.ok) {
        // Continue polling even if one status check fails
        console.warn(`Failed to get run status, attempt ${attempt}`);
        continue;
      }
      const statusData = await statusResponse.json();
      runStatus = statusData.data.status;
      
      if (runStatus === 'FAILED' || runStatus === 'ABORTED' || runStatus === 'TIMED-OUT') {
        throw new Error(`Apify actor run failed with status: ${runStatus}`);
      }
    }

    if (runStatus !== 'SUCCEEDED') {
      throw new Error('Apify actor run did not succeed in time.');
    }

    // 3. Fetch the results from the dataset
    setLoadingMessage('Scraping complete! Fetching results...');
    const itemsUrl = `${API_BASE_URL}/datasets/${defaultDatasetId}/items?token=${APIFY_TOKEN}&format=json`;
    const itemsResponse = await fetch(
      proxiedUrl(itemsUrl)
    );

    if (!itemsResponse.ok) {
      const errorText = await itemsResponse.text();
      console.error("Proxy/API Error Body:", errorText);
      throw new Error(`Failed to fetch dataset items. Server responded with ${itemsResponse.status}: ${itemsResponse.statusText}`);
    }

    const results = (await itemsResponse.json()) as Hotel[];
    return results.filter(item => item.title && Array.isArray(item.reviews)); // Basic data validation
  } catch (error) {
    console.error('Error during Apify process:', error);
    if (error instanceof Error) {
        throw new Error(error.message);
    }
    throw new Error('An unknown error occurred during the Apify process.');
  }
};
