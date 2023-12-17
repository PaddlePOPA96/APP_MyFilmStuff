import { Heading, Center, Box, Text, HStack, VStack, ScrollView, Input, FormControl, InputField, Button  } from "@gluestack-ui/themed";
import { Header } from "../components";
import { Link } from "expo-router";

const formtransaction = () => {
  
  return (
    <Box flex={1}><Header title={"Form Transaction"} withBack={true} />
      <ScrollView>

      <Center paddingTop={"$2"} paddingHorizontal={"$4.5"}>
        <Heading fontSize={"$lg"} paddingBottom={"$4.5"}>Form Order</Heading>
        <Box width={"$full"} height={"$96"} borderRadius={"$3xl"} marginBottom={"$3.5"} bg="$white" shadowColor="$black" shadowOpacity={"$20"}>
        <VStack>
        <FormControl width={"$72"} marginLeft={"$4.5"}>
            <Heading fontSize={"$md"}>Name</Heading>
            <Input >
              <InputField />
            </Input>
        </FormControl>
        <FormControl width={"$72"} marginLeft={"$4.5"}>
            <Heading fontSize={"$md"}>Email</Heading>
            <Input >
              <InputField />
            </Input>
        </FormControl>
        <FormControl width={"$72"} marginLeft={"$4.5"}>
            <Heading fontSize={"$md"}>No. Telp</Heading>
            <Input >
              <InputField />
            </Input>
        </FormControl>
        <FormControl width={"$72"} marginLeft={"$4.5"}>
            <Heading fontSize={"$md"}>Total Tiket</Heading>
            <Input >
              <InputField />
            </Input>
        </FormControl>
        <Center>
          <Button size="sm" width={"$48"} marginTop={"$8"} backgroundColor={"$black"}
          > 
          <Link href={{
            pathname: "/payment-film",
          }}
          asChild>
            <Text color="$yellow">Payment</Text>
          </Link>
          </Button>
        </Center>
        </VStack>
        </Box>
      </Center>
      </ScrollView>
    </Box>
  );
};

export default formtransaction;