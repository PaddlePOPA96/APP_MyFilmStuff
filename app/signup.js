import {
  Center,
  Heading,
  Alert,
  Box,
  Image,
  FormControl,
  Text,
  AlertText,
  ScrollBox,
  Pressable,
  ModalBackdrop,
  Modal,
  ScrollView,
} from "@gluestack-ui/themed";
import firebase from "firebase/compat/app";
import moment from "moment";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "expo-router";
import { Input, Button } from "../components";
import { registerUser } from "./AuthAction";
import React, { useState, useEffect } from "react";
import * as FileSystem from "expo-file-system";
import FIREBASE from "../config/FIREBASE/index";
import { getAuth } from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useWindowDimensions } from "react-native";

const SignUp = () => {
  const navigation = useNavigation();
  const [nama, setNama] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [nohp, setNohp] = useState("");
  const [password, setPassword] = useState("");
  const [birth, setBirth] = useState("");
  const [country, setCountry] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [imageSource, setImageSource] = useState(null);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [uploading, setUploading] = useState(false);
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;

  const toggleModal = () => setIsModalVisible(!isModalVisible);

  useEffect(() => {
    (async () => {
      let galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === "granted");
    })();
  }, []);

  const handleImagePress = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    const imgUri = result.assets[0].uri;
    if (!result.cancelled) {
      setImageSource(imgUri);
      setIsModalVisible(false);
    }
  };

  if (hasGalleryPermission === false) {
    console.log("no access");
  }
  const handleCameraPress = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    const imgUri = result.assets[0].uri;
    if (!result.cancelled) {
      setImageSource(imgUri);
      setIsModalVisible(false);
    }
  };

  const toggleAlert = (message) => {
    setShowAlert(!showAlert);
    setAlertMessage(message);
  };

  const onRegister = async (imageUri) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", imageSource, true);
      xhr.send(null);
    });

    const min = 1;
    const max = 10000;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

    const ref = firebase
      .storage()
      .ref()
      .child(`Pictures/Images` + randomNumber);
    const snapshot = ref.put(blob);
    snapshot.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      () => {
        setUploading(true);
      },
      (error) => {
        setUploading(false);
        console.log(error);
        blob.close();
        return;
      },
      () => {
        snapshot.snapshot.ref.getDownloadURL().then(async (url) => {
          setUploading(false);
          console.log("Download URL: ", url);
          setImageSource(url);
          blob.close();
          const now = moment();

          const formattedDate = now.format("MMMM Do YYYY");
          if (
            nama &&
            username &&
            email &&
            nohp &&
            password &&
            birth &&
            country
          ) {
            const data = {
              nama: nama,
              username: username,
              email: email,
              nohp: nohp,
              birth: birth,
              country: country,
              fotoProfil: url,
              joined: formattedDate,

              status: "user",
            };

            console.log(data);

            try {
              const user = await registerUser(data, password);
              return navigation.replace("login");
            } catch (error) {
              console.log("Error", error.message);
              toggleAlert(error.message);
            }
          } else {
            console.log("Error", "Data tidak lengkap");
            toggleAlert("Data tidak lengkap");
          }

          setUploading(true);
        });
      }
    );
  };

  return (
    <>
      <ScrollView>
        <Box
          position="absolute"
          width={windowWidth}
          backgroundColor="$yellow300"
          height={340}
          borderBottomRightRadius={200}
        ></Box>
        <Box
          pr={30}
          pl={30}
          flex={1}
          mt={120}
          justifyContent="center"
          textAlign="center"
        >
          <Box alignItems="start" mb={40}>
            <Text
              color="$black"
              fontWeight="bold"
              textAlign="start"
              fontSize={30}
              pt={30}
            >
              Welcome,
            </Text>
          </Box>
          <Box justifyContent="center">
            <Box alignItems="start" flexDirection="row">
              <Box>
                <Pressable onPress={() => setIsModalVisible(!isModalVisible)}>
                  <Image
                    source={{
                      uri:
                        imageSource != null
                          ? imageSource
                          : "https://www.w3schools.com/howto/img_avatar.png",
                    }}
                    style={{ width: 100, height: 100, borderRadius: 100 }}
                  />
                </Pressable>
                {uploadPercentage > 0 && (
                  <Text>Uploading... {uploadPercentage}%</Text>
                )}
              </Box>
              <Text
                color="$black"
                fontWeight="bold"
                ml={30}
                mt={30}
                width={200}
              >
                Press Avatar To Add Your Profile
              </Text>
            </Box>

            <Box mt={30}>
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
                    label="Password"
                    secureTextEntry
                    value={password}
                    onChangeText={(password) => setPassword(password)}
                    height={"$10"}
                  />
                  <Input
                    label="Telephone Number"
                    keyboardType="phone-pad"
                    value={nohp}
                    onChangeText={(nohp) => setNohp(nohp)}
                    height={"$10"}
                  />
                  <Input
                    label="Place, Date Of Birth"
                    value={birth}
                    onChangeText={(birth) => setBirth(birth)}
                    height={"$10"}
                  />
                  <Input
                    label="Country"
                    value={country}
                    onChangeText={(country) => setCountry(country)}
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
                    onRegister(imageSource);
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </ScrollView>
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
                Choose
              </Text>
              <Box display="flex" flexDirection="row">
                <Button
                  title="Pilih dari Galeri"
                  onPress={() => handleImagePress()}
                  borderRadius={20}
                  padding={10}
                  elevation={2}
                ></Button>
                <Button
                  title="Ambil Foto"
                  onPress={() => handleCameraPress()}
                  borderRadius={20}
                  padding={10}
                  elevation={2}
                ></Button>
              </Box>
            </Box>
          </Box>
        </Modal>
      )}
    </>
  );
};

export default SignUp;
