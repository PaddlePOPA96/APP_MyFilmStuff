import React, { useState, useEffect } from 'react';
import { ScrollView, VStack, Heading, Text } from "@gluestack-ui/themed";
import { Header } from "../components";
import { getReview } from "./AuthAction";

const ListReview = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      const reviewData = await getReview();
      setReviews(reviewData);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  return (
    <>
      <Header title={"List Review"}/>
      <ScrollView>
        <VStack padding={"$4.5"}>

          <Heading fontSize={"$lg"} paddingBottom={"$4.5"}>Review List</Heading>

          {reviews.length === 0 ? (
            <Text>No reviews yet.</Text>
          ) : (
            <VStack>
              {reviews.map((review, index) => (
                <VStack key={index} marginBottom={"$4.5"} padding={"$4.5"} borderRadius={"$3xl"} bg="$white" shadowColor="$black" shadowOpacity={"$20"}>
                  <Heading fontSize={"$md"}>Name: {review.nama}</Heading>
                  <Heading fontSize={"$md"}>Film: {review.film}</Heading>
                  <Heading fontSize={"$md"}>Email: {review.email}</Heading>
                  <Heading fontSize={"$md"}>Komentar: {review.komentar}</Heading>
                </VStack>
              ))}
            </VStack>
          )}

        </VStack>
      </ScrollView>
    </>
  );
};

export default ListReview;