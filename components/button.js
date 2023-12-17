import { Text, Pressable, View } from "@gluestack-ui/themed";
import React from "react";

const Button = ({ padding, title, onPress, fontSize, bgTxt, bgColor }) => {
  return (
    <Pressable
      onPress={onPress}
      padding={padding}
      borderRadius={20} 
      backgroundColor={bgColor}
      my={"$3"}
    >
      <Text
        color={bgTxt}
        fontWeight="bold"
        textAlign="center"
        fontSize={fontSize ? fontSize : "$lg"}
      >
        {title}
      </Text>
    </Pressable>
  );
};

export default Button;
