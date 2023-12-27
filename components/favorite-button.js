import React, { useState, useEffect } from "react";
import { Pressable } from "@gluestack-ui/themed";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FavoriteButton = (props) => {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const loadLikedStatus = async () => {
      try {
        const value = await AsyncStorage.getItem("@movie-list");
        if (value !== null) {
          const movieList = JSON.parse(value);
          const foundItem = movieList.find((item) => item.id === props.id);
          if (foundItem) {
            setLiked(foundItem.isCompleted);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    loadLikedStatus();
  }, [props.id]);

  const handleToggleFavorite = async () => {
    try {
      let updatedList = [];
      const value = await AsyncStorage.getItem("@movie-list");
      if (value !== null) {
        updatedList = JSON.parse(value);
      }

      const foundIndex = updatedList.findIndex((item) => item.id === props.id);
      if (foundIndex !== -1) {
        updatedList[foundIndex].isCompleted = !liked;
      } else {
        updatedList.push({
          id: props.id,
          title: props.title,
          image: props.image,
          isCompleted: !liked,
        });
      }

      await AsyncStorage.setItem("@movie-list", JSON.stringify(updatedList));
      setLiked((prevLiked) => !prevLiked);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Pressable
      backgroundColor="white"
      justifyContent="center"
      borderRadius={100}
      p={10}
      onPress={handleToggleFavorite}
    >
      <MaterialCommunityIcons
        name={liked ? "heart" : "heart-outline"}
        size={25}
        color={liked ? "red" : "black"}
      />
    </Pressable>
  );
};

export default FavoriteButton;
