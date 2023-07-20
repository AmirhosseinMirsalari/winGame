import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { IReviews } from "../types/product";

export function useLoadReviews(reviews: IReviews[] | []) {
  const [indexOfLoadedReviews, setIndexOfLoadedReviews] = useState(6);
  const router = useRouter();

  const loadMoreReviewsHandler = () => {
    setIndexOfLoadedReviews((prev) => {
      if (prev < reviews.length) {
        return prev + 6;
      }
      return 6;
    });
  };

  useEffect(() => {
    const { hash } = router.query;
    if (!hash || !hash.includes("#review")) {
      return;
    }
    const hashId = hash.replace("#review-", "");
    const index = reviews.findIndex((item) => item._id === hashId);
    if (index > indexOfLoadedReviews) {
      setIndexOfLoadedReviews(index + 1);
    }
  }, [router.query]);

  return { indexOfLoadedReviews, loadMoreReviewsHandler };
}
