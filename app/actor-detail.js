import React from "react";
import {
  Box,
  Heading,
  Text,
  Image,
  ScrollView,
  Button,
  ButtonText,
} from "@gluestack-ui/themed";
import { Header } from "../components";
import { Link, useLocalSearchParams } from "expo-router";
import { ImageBackground } from "react-native";

const actorDetail = () => {
  const params = useLocalSearchParams();
  return (
    <>
      <ScrollView>
        <ImageBackground
          source={{ uri: params.image }}
          alt="Actor Image"
          role="img"
        >
          <Box bg={"rgba(0,0,0, 0.60)"}>
            <Box p={"$4"} mt={500}>
              <Heading
                lineHeight={"$2xl"}
                fontSize={"$3xl"}
                color={"$white"}
                mb={20}
                textAlign="center"
              >
                {params.name}
              </Heading>
              <Box flexDirection="row" justifyContent="center">
                <Text
                  color={"$white"}
                  textAlign="center"
                  lineHeight={"$2xs"}
                  fontSize={"$sm"}
                >
                  Born: {params.born}
                </Text>
                <Text
                  color={"$white"}
                  textAlign="center"
                  lineHeight={"$2xs"}
                  fontSize={"$sm"}
                  marginHorizontal={20}
                >
                  |
                </Text>
                <Text
                  color={"$white"}
                  textAlign="center"
                  lineHeight={"$2xs"}
                  fontSize={"$sm"}
                >
                  Genre: {params.genre}
                </Text>
              </Box>
            </Box>
          </Box>
        </ImageBackground>

        <Box alignItems="center" p={10} marginTop={20}>
          <Box flexDirection="row" marginBottom={20}>
            <Link
              href={{
                pathname: "/web",
                params: { link: params.link },
              }}
              asChild
            >
              <Button
                marginRight={20}
                backgroundColor="$yellow300"
                borderRadius={20}
                alignSelf="flex-start"
                flexDirection="column"
                height={40}
              >
                <ButtonText color={"$black"}>Read More</ButtonText>
              </Button>
            </Link>

            <Link
              href={{
                pathname: "/web",
                params: { link: params.link },
              }}
              asChild
            >
              <Button
                backgroundColor="$yellow300"
                borderRadius={20}
                alignSelf="flex-start"
                height={40}
              >
                <ButtonText color={"$black"}>add to favourite</ButtonText>
              </Button>
            </Link>
          </Box>

          <Text
            width={335}
            marginBottom={"$4"}
            lineHeight={"$xs"}
            fontSize={"$sm"}
          >
            {params.description}
          </Text>

          <Box p={15}>
            <Box>
              <Text
                marginBottom={"$4"}
                lineHeight={"$xs"}
                fontSize={"$sm"}
                fontWeight="bold"
              >
                Parent
              </Text>
              <Text marginBottom={"$4"} lineHeight={"$xs"} fontSize={"$sm"}>
                {params.parent}
              </Text>
            </Box>

            <Box>
              <Text
                marginBottom={"$4"}
                lineHeight={"$xs"}
                fontSize={"$sm"}
                fontWeight="bold"
              >
                Spouses
              </Text>
              <Text marginBottom={"$4"} lineHeight={"$xs"} fontSize={"$sm"}>
                {params.spouses}
              </Text>
            </Box>

            <Box>
              <Text
                marginBottom={"$4"}
                lineHeight={"$xs"}
                fontSize={"$sm"}
                fontWeight="bold"
              >
                Other
              </Text>
              <Text marginBottom={"$4"} lineHeight={"$xs"} fontSize={"$sm"}>
                {params.other}
              </Text>
            </Box>
          </Box>
        </Box>
      </ScrollView>
    </>
  );
};

export default actorDetail;
