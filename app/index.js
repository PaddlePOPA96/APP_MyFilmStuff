import { useNavigation } from "expo-router";
import { StyleSheet, View, Image } from "react-native";
import React, { useEffect } from "react";

const Root = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("login");
    }, 3000);
  }, []);

  return (
    <View style={styles.pages}>
      <Image
        source={require("../assets/cinemskuy.png")}
        style={{ width: 200, height: 200 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Root;
