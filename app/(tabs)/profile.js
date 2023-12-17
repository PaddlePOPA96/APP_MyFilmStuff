import { Center, Heading, Text, View, Image } from "@gluestack-ui/themed";
import { Header,Button } from "../../components";
import { clearStorage, getData } from "../../utils";
import FIREBASE from "../../config/FIREBASE";
import React, { useState, useEffect } from "react";
import {useWindowDimensions} from 'react-native';
import { useNavigation } from "expo-router";

const Profile = () => {
  const [profile, setProfile] = useState(null);
const windowWidth = useWindowDimensions().width;
const windowHeight = useWindowDimensions().height;
const navigation = useNavigation();

  const getUserData = () => {
    getData("user").then((res) => {
      const data = res;
      if (data) {
        console.log("isi data", data);
        setProfile(data);
      } else {
        navigation.replace('Login');
      }
    });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getUserData();
    });

    return () => {
      unsubscribe();
    };
  }, [navigation]);

  const onSubmit = (profile) => {
    if (profile) {
      FIREBASE.auth()
        .signOut()
        .then(() => {
          // Sign-out successful.
          clearStorage();
          navigation.replace("login");
        })
        .catch((error) => {
          // An error happened.
          alert(error);
        });
    } else {
      navigation.replace("login");
    }
  };

  return (
    <>
      <Header title={"Profile"} />
      <View bg="$yellow300" width={windowWidth} height={windowHeight}>
  
     
      <Center flex={1} position="fixed" marginBottom={280}>
        <Image
          borderRadius={500}
          width={150}
          height={150}
          borderColor="black"
          borderWidth={5}
          source={{ uri: "https://www.w3schools.com/howto/img_avatar.png" }}
        />
        <Text padding={30} fontWeight="bold" fontSize={30} color="black">
        {profile?.nama}
        </Text>
        <Text>Joined Since: November 2023</Text>
        <Text></Text>
        <Button
        bgColor="black"
        bgTxt="$yellow300"
          type="text"
          title={profile ? "Logout" : "Login"}
          padding={"$3"}
          onPress={() => onSubmit(profile)}
        /> 
       
      </Center> 
      </View>
    </>
  );
};

export default Profile;
