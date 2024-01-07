import {
  Center,
  Heading,
  FormControl,
  Text,
  Box,
  Image,
  Alert,
  Modal,
  ModalBackdrop,
  AlertText,
  Pressable,
} from "@gluestack-ui/themed";
import React, { useState, useEffect } from "react";

import { useWindowDimensions } from "react-native";

import { useNavigation, Link } from "expo-router";
import { Input, Button } from "../components";
import { loginUser } from "./AuthAction";

const Login = () => {
  const navigation = useNavigation();
  const signup = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;

  const toggleAlert = (message) => {
    setShowAlert(!showAlert);
    setAlertMessage(message);
  };

  const login = () => {
    if (email && password) {
      loginUser(email, password)
        .then((user) => {
          navigation.replace("(tabs)");
        })
        .catch((error) => {
          console.log("Error", error.message);
          toggleAlert(error.message);
        });
    }
  };

  return (
    <>
      <Box
        position="absolute"
        width={windowWidth}
        backgroundColor="$yellow300"
        height={300}
        borderBottomRightRadius={200}
      ></Box>

      <Box flex={1} justifyContent="center" textAlign="start">
        <Box pr={30} pl={30} justifyContent="center">
          <Box alignItems="start" mb={40}>
            <Image source={require("../assets/cinemskuy2.png")} />
            <Text
              color="$black"
              fontWeight="bold"
              textAlign="start"
              fontSize={30}
              pt={30}
            >
              Welcome Back,
            </Text>
          </Box>

          <FormControl mt={30} mb={30}>
            <Input
              label={"Email"}
              width={"$full"}
              height={"$10"}
              onChangeText={(text) => setEmail(text)} // Set email ke dalam state
              value={email}
            />
            <Input
              label="Password"
              width={"$full"}
              height={"$10"}
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)} // Set password ke dalam state
              value={password}
            />
          </FormControl>

          <Button
            title="Login"
            bgColor="$yellow300"
            bgTxt="black"
            type="text"
            padding={"$3"}
            onPress={() => login()}
          />

          <Box mt={30}>
            <Text size="sm" color="$black" mt={"$4"} textAlign="center">
              Don't have an account?
            </Text>

            <Button
              title="Register"
              bgColor="black"
              bgTxt="$yellow300"
              type="text"
              padding={"$3"}
              onPress={() => {
                navigation.navigate("signup");
              }}
            />
            {/* show Alert */}
            {showAlert && (
              <Modal isOpen={showAlert} onClose={() => toggleAlert()}>
                <ModalBackdrop />
                <Alert mx="$4" action="error" variant="solid">
                  <AlertText fontWeight="$bold">Error!</AlertText>
                  <AlertText>{alertMessage}</AlertText>
                </Alert>
              </Modal>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Login;
