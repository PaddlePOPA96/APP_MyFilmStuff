import {
  Text,
  HStack,
  IconButton,
  Icon,
  Box,
  Checkbox,
  Pressable,
  Image,
} from "@gluestack-ui/themed";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";

const Favorite = (props) => {
  const { data, onChecked, onDeleted, deletedIcon, onItemPress } = props;

  const [liked, setLiked] = useState(false);

  return (
    <Pressable onPress={onItemPress}>
      <Box
        flexDirection="row"
        px={3}
        py={4}
        bg={data.liked ? "primary.500" : "#fff"}
        my="7.5px"
        borderRadius={5}
      >
        <Image source={data.image} />

        <Box>
          <Text
            width="100%"
            fontSize={16}
            flexShrink={1}
            textAlign="left"
            mx="10px"
            strikeThrough={data.liked}
          >
            {data.title}
          </Text>
        </Box>

        <Checkbox
          isChecked={data.liked}
          onChange={onChecked}
          accessibilityLabel="This is a dummy checkbox"
          value={data.title}
          aria-label="This is a dummy checkbox"
        />

        <Pressable onPress={() => [setLiked((isLiked) => !isLiked)]}>
          <MaterialCommunityIcons
            name={true ? "heart" : "heart-outline"}
            size={32}
            color={true ? "red" : "black"}
          />
        </Pressable>
      </Box>
    </Pressable>
  );
};

export default Favorite;
