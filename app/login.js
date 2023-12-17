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
} from "@gluestack-ui/themed";
import React, { useState, useEffect } from "react";

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
    <Box flex={1} justifyContent= 'center' textAlign="center">
      <Box pr={30} pl={30} justifyContent= 'center'>
    <Box alignItems="center">
        <Image source={require("../assets/cinemskuy.png")} />
    </Box>
      <Text color="$black" fontWeight= 'bold' textAlign="center">Log in Account</Text>
      <Box>
      <FormControl>
          <Input
            label={"Login"}
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
            bgColor= "$yellow300"
            bgTxt="black"
            type="text"
            padding={"$3"}
            onPress={() => login()}
          />

      </Box>
      <Box mt={50}>
      <Text size="sm" color="$black" mt={"$4"}  textAlign="center">
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
  );
};

export default Login;
