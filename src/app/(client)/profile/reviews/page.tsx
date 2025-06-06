"use client";
import React from "react";
import ReviewOfCustomer from "../components/ReviewOfCustomer";
import useSWR from "swr";

const ReviewsPage = () => {
  const { data: reviews } = useSWR(
    `${process.env.NEXT_PUBLIC_URL_API}/api/review`
  );
  console.log("reviews", reviews);

  return (
    <>
      <ReviewOfCustomer review={reviews || []} />
    </>
  );
};

export default ReviewsPage;
