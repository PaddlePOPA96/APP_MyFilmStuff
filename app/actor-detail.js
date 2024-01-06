import React, { useEffect, useState } from "react";
import { Box, ScrollView, Text, Image } from "@gluestack-ui/themed";
import { useRoute } from "@react-navigation/native";

const ActorDetail = () => {
  const route = useRoute();
  const { name, image, gender, knownForDepartment, originalName, popularity, knownFor } = route.params;

  return (
    <ScrollView>
      <Box alignItems="center" p={10}>
        <Image
          source={{ uri: image }}
          alt="Actor Image"
          style={{ width: 150, height: 230 }}
        />
        <Text fontWeight="bold" fontSize={18} mt={10}>{name}</Text>
        <Text fontSize={14}>{`Gender: ${gender}`}</Text>
        <Text fontSize={14}>{`Known for Department: ${knownForDepartment}`}</Text>
        <Text fontSize={14}>{`Original Name: ${originalName}`}</Text>
        <Text fontSize={14}>{`Popularity: ${popularity}`}</Text>
        
        <Text fontWeight="bold" fontSize={16} mt={10}>Known For</Text>
        {knownFor && knownFor.map((movie, index) => (
          <Box key={index} p={10}>
            <Text>{movie.title || movie.original_name}</Text>
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
              style={{ width: 100, height: 150 }}
              alt="Movie Image"
            />
          </Box>
        ))}
      </Box>
    </ScrollView>
  );
};

export default ActorDetail;
