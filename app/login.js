import { Center, Heading, Input, InputField, Button, ButtonText, Text, View, Image } from "@gluestack-ui/themed";
import { useNavigation, Link } from 'expo-router';

const Login = () => {
  const navigation = useNavigation();
  const signup = useNavigation();

 

  const SignUp = () => {
    signup.push ('signup')
  };

  return (
    <>
    <Center flex={1}>
        <Image source={require("../assets/cinemskuy.png")}/>
        <Heading>Log in Account</Heading>
        <View gap={10}>
        <Input width={220} borderColor="transparent">
        <InputField type="text"  placeholder="Username"
        borderColor="black" borderWidth={3} borderRadius={20} paddingLeft={14}/>
        </Input>
        <Input width={220} borderColor="transparent">
        <InputField type="password"  placeholder="Password"
        borderColor="black" borderWidth={3} borderRadius={20} paddingLeft={14}/>
        </Input>
        <Link
        href={{
              pathname: "/home",
            }}
            asChild>
            <Button borderRadius={20} bg="$yellow300">
          <ButtonText color="black" fontWeight="bold">Login</ButtonText>
        </Button>
        </Link>
       
        </View>  
        <View mt={50}>
        <Text mb={8} textAlign="center" fontWeight="bold" color="black">New in CinemSKUY ?</Text>
        <Button width={220} borderRadius={20} bg="black" onPress={SignUp}>
          <ButtonText color="$yellow300" fontWeight="bold">Sign Up</ButtonText>
        </Button>
        </View>
      </Center>
  </>
  );
};


export default Login;