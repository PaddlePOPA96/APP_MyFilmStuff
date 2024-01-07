import {
  Center,
  Heading,
  Text,
  View,
  Image,
  ModalBackdrop,
  Modal,
  Box,
} from "@gluestack-ui/themed";
import { Header, Button } from "../../components";
import { clearStorage, getData } from "../../utils";
import FIREBASE from "../../config/FIREBASE";
import React, { useState, useEffect } from "react";
import { useWindowDimensions } from "react-native";
import { useNavigation } from "expo-router";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const getUserData = () => {
    getData("user").then((res) => {
      const data = res;
      if (data) {
        console.log("isi data", data);
        setProfile(data);
      } else {
        navigation.replace("Login");
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
      <Box width={windowWidth} height={windowHeight}>
      <Box
        position="absolute"
        width={windowWidth}
        backgroundColor="#171717"
        height={90}
        borderRadius={40}
      ></Box>
        <Box flex={1} mt={55}>
          <Box justifyContent="center" alignItems="center" gap={20}>

            <Text fontWeight="bold" fontSize ={20} color="$yellow300">Profile</Text>

            <Image
              borderRadius={500}
              width={150}
              height={150}
              borderColor="black"
              borderWidth={5}
              source={{
                uri:
                  profile != null
                    ? profile?.fotoProfil
                    : "https://www.w3schools.com/howto/img_avatar.png",
              }}
            />
            <Text padding={30} fontWeight="bold" fontSize={30} color="black">
              {profile?.nama}
            </Text>
          </Box>

          <Box pl={30} pr={30}>
          <Box alignItems="start" mb={20}>
              <Text fontSize={13}>Email </Text>
              <Box
                pt={10}
                pb={10}
                borderBottomWidth={2}
                borderBottomColor="black"
              >
                <Text color="black" fontWeight="bold">
                  {profile?.email}
                </Text>
              </Box>
            </Box>

            <Box alignItems="start" mb={20}>
              <Text fontSize={13}>Place, Date Of Birth </Text>
              <Box
                pt={10}
                pb={10}
                borderBottomWidth={2}
                borderBottomColor="black"
              >
                <Text color="black" fontWeight="bold">
                  {profile?.birth}
                </Text>
              </Box>
            </Box>

            <Box alignItems="start" mb={20}>
              <Text fontSize={13}>Joined Since: </Text>
              <Box
                pt={10}
                pb={10}
                borderBottomWidth={2}
                borderBottomColor="black"
              >
                <Text color="black" fontWeight="bold">
                  {profile?.joined}
                </Text>
              </Box>
            </Box>

            <Box alignItems="start" mb={20}>
              <Text fontSize={13}>Country </Text>
              <Box
                pt={10}
                pb={10}
                borderBottomWidth={2}
                borderBottomColor="black"
              >
                <Text color="black" fontWeight="bold">
                  {profile?.country}
                </Text>
              </Box>
            </Box>

            <Button
              bgColor="black"
              bgTxt="$yellow300"
              type="text"
              title={profile ? "Logout" : "Login"}
              padding={"$3"}
              onPress={() => setIsModalVisible(!isModalVisible)}
            />
          </Box>
        </Box>
      </Box>

      {isModalVisible && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          isOpen={isModalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setIsModalVisible(false);
          }}
        >
          <Box
            flex={1}
            justifyContent="center"
            alignItems="center"
            marginTop={22}
          >
            <Box
              margin={20}
              backgroundColor="$white"
              borderRadius={20}
              padding={35}
              alignItems="center"
              shadowColor="#000"
              shadowOpacity={0.25}
              shadowRadius={4}
              elevation={5}
            >
              <Text marginBottom={15} textAlign="center">
                Are You Sure?
              </Text>
              <Button
                title="LogOut"
                onPress={() => onSubmit(profile)}
                borderRadius={20}
                padding={10}
                elevation={2}
              ></Button>
            </Box>
          </Box>
        </Modal>
      )}
    </>
  );
};

export default Profile;
