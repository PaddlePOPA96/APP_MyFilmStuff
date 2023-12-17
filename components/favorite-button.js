import React, { useState } from "react";
import { Pressable } from "@gluestack-ui/themed";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FavoriteButton = (props) => {
  const [liked, setLiked] = useState(false);
  const [list, setList] = useState([]);

  const handleAddTask = (id, title, image, liked) => {
    setList((prevList) => [
      ...prevList,
      { id: id, title: title, image: image, isCompleted: false },
    ]);

    try {
      AsyncStorage.setItem(
        "@movie-list",
        JSON.stringify([
          ...list,
          { id: id, title: title, image: image, isCompleted: false },
        ])
      );
    } catch (e) {
      console.log("Error");
      console.error(e.message);
    }
  };

  return (
    <Pressable
      backgroundColor="white"
      justifyContent="center"
      borderRadius={100}
      p={10}
      onPress={() => [
        setLiked((isLiked) => !isLiked),
        handleAddTask(props.id, props.title, props.image, !liked),
      ]}
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
