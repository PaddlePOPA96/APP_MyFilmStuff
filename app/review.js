import {
    Center,
    Heading,
    Box,
    Text,
    HStack,
    VStack,
    ScrollView,
    Alert,
    View,
    TextInput,
    Input,
    Link,
    Button, FormControl, InputField
  } from "@gluestack-ui/themed";
  import { Header } from "../components";
  import React, { useState } from 'react';
  import { addReview, getReview } from "../app/AuthAction";
  import { useNavigation } from "@react-navigation/native";
  
  const review = () => {
    const navigation = useNavigation();
    const [form, setForm] = useState(null);
    const [nama, setNama] = useState("");
    const [film, setFilm] = useState("");
    const [email, setEmail] = useState("");
    const [komentar, setKomentar] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
  
    const toggleModal = () => {
      setIsModalVisible(!isModalVisible);
    };
  
    const toggleAlert = (message) => {
      setShowAlert(!showAlert);
      setAlertMessage(message);
    };
  
    const onAddReview = async () => {
      if (nama && film && email && komentar) {
        const data = {
          nama: nama,
          film: film,
          email: email,
          komentar: komentar,
        };
  
        console.log(data);
        try {
          const user = await addReview(data);
          navigation.navigate("review");
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
        <Header title={"Review"}/>
        <Box flex={1}>
        <ScrollView>
  
        <Center paddingTop={"$2"} paddingHorizontal={"$4.5"}>
          <Heading fontSize={"$lg"} paddingBottom={"$4.5"}>Add Review</Heading>
          <Box width={"$full"} height={"$full"} borderRadius={"$3xl"} marginBottom={"$3.5"} bg="$white" shadowColor="$black" shadowOpacity={"$20"}>
          <VStack>
          <FormControl width={"$72"} marginLeft={"$4.5"}>
              <Heading fontSize={"$md"}>Name</Heading>
              <Input w={"$full"} >
                <InputField onChangeText={(nama) => setNama(nama)}/>
              </Input>
              <Heading fontSize={"$md"}>Film</Heading>
              <Input  >
              <InputField onChangeText={(film) => setFilm(film)}/>
              </Input>
              <Heading fontSize={"$md"}>Email</Heading>
              <Input  >
              <InputField onChangeText={(email) => setEmail(email)}/>
              </Input>
              <Heading fontSize={"$md"}>komentar</Heading>
              <Input  >
              <InputField onChangeText={(komentar) => setKomentar(komentar)}/>
              </Input>
            <Button size={"sm"} width={"$68"} marginTop={"$8"} title="Save" backgroundColor={"$black"} onPress={() => {
              onAddReview();
            }}>
              <Text color="$yellow">Submit</Text>
            </Button>
            <Button size={"sm"} width={"$68"} marginTop={"$8"} title="Save" backgroundColor={"$black"} onPress={() => {
              navigation.navigate("list");
            }}>
              <Text color="$yellow">List</Text>
            </Button>
          </FormControl>
          </VStack>
          </Box>
        </Center>
        </ScrollView>
      </Box>
      </>
    );
  };
  
  
  
  export default review;
  