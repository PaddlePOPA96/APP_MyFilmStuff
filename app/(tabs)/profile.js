import { Center, Heading, Text, View, Image } from "@gluestack-ui/themed";
import { Header } from "../../components";

const Profile = () => {
  return (
    <>
      <Header title={"Profile"} />
      <View bg="$yellow300" width={360} height={200}>
          <Text textAlign="center" marginTop={50}>Ini Background</Text>
        </View>
      <Center flex={1} position="fixed" marginBottom={280}>
        <Image borderRadius={500} width={150} height={150} borderColor="black" borderWidth={5} source={{ uri:"https://www.w3schools.com/howto/img_avatar.png", }}/>
        <Text padding={30} fontWeight="bold" fontSize={30} color="black">YOUR NAME</Text>
        <Text>Joined Since: November 2023</Text>
        <Text></Text>
      </Center>
    </>
  );
};

export default Profile;