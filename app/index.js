import { useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { getData } from "../utils/localStorage";
import { Box, Image  } from "@gluestack-ui/themed";

const Root = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(async () => {
      const userData = await getData("user");
      if (userData) {
        navigation.replace("(tabs)");
      } else {
        navigation.navigate("login");
      }
    }, 3000);
  }, []);

  return (
    <Box flex={1} alignItems= 'center' justifyContent= 'center'>
      <Image
        source={require("../assets/cinemskuy2.png" )}
        style={{ width: 200, height: 200 }}alt="icon"
      />
    </Box>
  );
};


export default Root;
