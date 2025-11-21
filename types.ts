
export interface OwnerResponse {
  text: string;
  publishedAt: string;
}

export interface Review {
  text: string | null;
  rating: number;
  publishedAt: string;
  reviewerName: string;
  ownerResponse: OwnerResponse | null;
  images: { url: string }[] | null;
}

export interface Hotel {
  id: string;
  title: string;
  address: string;
  rating: number;
  reviewsCount: number;
  reviews: Review[];
  url: string;
}
