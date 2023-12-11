import { Header } from "../components";
import {
  Heading,
  FlatList,
  Text,
  Center,
  Image,
  ScrollView,
  Box,
  Button,
  VStack,
} from "@gluestack-ui/themed";
import { Link } from "expo-router";

const PaymentFilm = () => {
  return (
    <>
      <Header title={"Payment"} withBack={true} />
      <ScrollView>
        <Center paddingHorizontal={"$4.5"}>
          <Heading marginBottom={"$3.5"}>Payment</Heading>
          <Box
            width={"$full"}
            height={"$96"}
            borderRadius={"$3xl"}
            marginBottom={"$3.5"}
            bg="$white"
            shadowColor="$black"
            shadowOpacity={"$20"}
          >
            <VStack>
              <Center>
                <Image
                  marginTop={"$20"}
                  size="sm"
                  borderRadius="$full"
                  source={{
                    uri: "https://play-lh.googleusercontent.com/pqoyI2JaPd3uOYt-5GzVqi82OvhBC9Jf-EPQqPDhCbyekdKZe5r-hOGlF4qE1ddWe3o",
                  }}
                />
                <Heading marginTop={"$2.5"}>No Dana : 081373193</Heading>
              </Center>
              <Center>
                <Image
                  marginTop={"$3.5"}
                  size="sm"
                  borderRadius="$full"
                  source={{
                    uri: "https://i0.wp.com/amanahfurniture.com/wp-content/uploads/2022/10/logo-bni-46.png",
                  }}
                />
                <Heading marginTop={"$2.5"}>No BNI : 66213213974</Heading>
              </Center>
              <Center>
                <Button
                  size="sm"
                  width={"$48"}
                  marginTop={"$4.5"}
                  backgroundColor={"$black"}
                >
                  <Link
                    href={{
                      pathname: "/(tabs)/transaction",
                    }}
                    asChild
                  >
                    <Text color="$yellow">Submit</Text>
                  </Link>
                </Button>
              </Center>
            </VStack>
          </Box>
        </Center>
      </ScrollView>
    </>
  );
};

export default PaymentFilm;
