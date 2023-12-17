import {
  Center,
  Heading,
  Alert,
  Box,
  Image,
  FormControl,
  Text,
  Modal,
  ModalBackdrop,
  AlertText,
} from "@gluestack-ui/themed";
import { useNavigation } from "expo-router";
import { Input, Button } from "../components";
import { registerUser } from "./AuthAction";
import React, { useState, useEffect } from "react";

const SignUp = () => {
  const navigation = useNavigation();
  const [nama, setNama] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [nohp, setNohp] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");


  const toggleAlert = (message) => {
    setShowAlert(!showAlert);
    setAlertMessage(message);
  };

  const onRegister = async () => {
    if (nama && username && email && nohp && password) {
      const data = {
        nama: nama,
        username: username,
        email: email,
        nohp: nohp,
        status: "user",
      };

      console.log(data);

      try {
        const user = await registerUser(data, password);
        navigation.replace("login");
      } catch (error) {
        console.log("Error", error.message);
        toggleAlert(error.message);
      }
    } else {
      console.log("Error", "Data tidak lengkap");
      toggleAlert("Data tidak lengkap");
    }
  };

  return (
    <>
      <Box flex={1} justifyContent= 'center' textAlign="center">
        <Box pr={30} pl={30} justifyContent= 'center'>
           <Box alignItems="center">
                       <Image source={require("../assets/cinemskuy.png")} />
           </Box>
           <Text color="$black" fontWeight= 'bold' textAlign="center">Sign Up Account</Text>

        <Box style={{ gap: 10 }}>
        <FormControl>
          <Input
            label="Nama"
            value={nama}
            onChangeText={(nama) => setNama(nama)}
            height={"$10"}
          />
           <Input
            label="Username"
            value={username}
            onChangeText={(username) => setUsername(username)}
            height={"$10"}
          />
          <Input
            label="Email"
            value={email}
            onChangeText={(email) => setEmail(email)}
            height={"$10"}
          />
          <Input
            label="No. Handphone"
            keyboardType="phone-pad"
            value={nohp}
            onChangeText={(nohp) => setNohp(nohp)}
            height={"$10"}
          />
          <Input
            label="Password"
            secureTextEntry
            value={password}
            onChangeText={(password) => setPassword(password)}
            height={"$10"}
          />
        </FormControl>
      

        </Box>
        <Box mt={50}>
         <Button
         bgColor="$yellow300"
         bgTxt="black"
            title="Register"
            type="text"
            icon="submit"
            padding={"$3"}
            fontSize={"$md"}
            onPress={() => {
              onRegister();
            }}
          />
          
        </Box>
        </Box>
        
       
      </Box>
    </>
  );
};

export default SignUp;
