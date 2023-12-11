import {
  Center,
  Heading,
  Input,
  InputField,
  Button,
  ButtonText,
  Text,
  View,
  Image,
} from "@gluestack-ui/themed";
import { useNavigation } from "expo-router";

const Login = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.push("login");
  };

  return (
    <>
      <Center flex={1}>
        <Image source={require("../assets/cinemskuy.png")} />
        <Heading>Sign Up Account</Heading>
        <View style={{ gap: 10 }}>
          <Input width={220} borderColor="transparent">
            <InputField
              type="text"
              placeholder="New Username"
              borderColor="black"
              borderWidth={3}
              borderRadius={20}
              paddingLeft={14}
            />
          </Input>
          <Input width={220} borderColor="transparent">
            <InputField
              type="password"
              placeholder="Insert Password"
              borderColor="black"
              borderWidth={3}
              borderRadius={20}
              paddingLeft={14}
            />
          </Input>
          <Input width={220} borderColor="transparent">
            <InputField
              type="password"
              placeholder="Re-type Password"
              borderColor="black"
              borderWidth={3}
              borderRadius={20}
              paddingLeft={14}
            />
          </Input>
          <Input width={220} borderColor="transparent">
            <InputField
              type="text"
              placeholder="Email"
              borderColor="black"
              borderWidth={3}
              borderRadius={20}
              paddingLeft={14}
            />
          </Input>
          <Button borderRadius={20} bg="black" onPress={handlePress}>
            <ButtonText color="$yellow300" fontWeight="bold">
              Sign Up
            </ButtonText>
          </Button>
        </View>
        <View mt={50}>
          <Text mb={8} textAlign="center" fontWeight="bold" color="black">
            Already have account ?
          </Text>
          <Button
            width={220}
            borderRadius={20}
            bg="$yellow300"
            onPress={handlePress}
          >
            <ButtonText color="black" fontWeight="bold">
              Login
            </ButtonText>
          </Button>
        </View>
      </Center>
    </>
  );
};

export default Login;
