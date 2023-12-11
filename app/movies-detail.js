import {
  Box,
  Heading,
  Text,
  Image,
  Divider,
  ScrollView,
  Button,
  ButtonText,
} from "@gluestack-ui/themed";
import { Header } from "../components";
import { Link, useLocalSearchParams } from "expo-router";
import { ImageBackground } from "react-native";
import { useState } from "react";
import FavoriteButton from "../components/favorite-button";

const moviesDetail = () => {
  const params = useLocalSearchParams();
  const [activeCategory, setActiveCategory] = useState(true);
  return (
    <>
      <Header title={"Movies Detail"} withBack={true} />

      <ScrollView>
        <ImageBackground
          source={{ uri: params.image }}
          alt="Movies Image"
          role="img"
        >
          <Box bg={"rgba(0,0,0, 0.60)"}>
            <Box p={"$4"} mt={129}>
              <Heading
                lineHeight={"$2xl"}
                fontSize={"$3xl"}
                color={"$white"}
                mb={20}
                textAlign="center"
              >
                {params.title}
              </Heading>
              <Box flexDirection="row" justifyContent="center">
                <Text
                  color={"$white"}
                  textAlign="center"
                  lineHeight={"$2xs"}
                  fontSize={"$sm"}
                >
                  Released at {params.year}
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
                  Duration: {params.duration}
                </Text>

                <FavoriteButton
                  id={params.id}
                  title={params.title}
                  image={params.image}
                />
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
                height={80}
              >
                <ButtonText color={"$black"}>Read More</ButtonText>
              </Button>
            </Link>

            <Link
              href={{
                pathname: "/payment-film",
                params: { link: params.link },
              }}
              asChild
            >
              <Button
                backgroundColor="$yellow300"
                borderRadius={20}
                alignSelf="flex-start"
                height={80}
              >
                <ButtonText color={"$black"}>Buy Ticket</ButtonText>
              </Button>
            </Link>
          </Box>

          <Text
            width={335}
            marginBottom={"$4"}
            lineHeight={"$xs"}
            fontSize={"$sm"}
          >
            {params.synopsis}
          </Text>

          <Box p={15}>
            <Box>
              <Text
                marginBottom={"$4"}
                lineHeight={"$xs"}
                fontSize={"$sm"}
                fontWeight="bold"
              >
                Producer
              </Text>
              <Text marginBottom={"$4"} lineHeight={"$xs"} fontSize={"$sm"}>
                {params.producer}
              </Text>
            </Box>

            <Box>
              <Text
                marginBottom={"$4"}
                lineHeight={"$xs"}
                fontSize={"$sm"}
                fontWeight="bold"
              >
                Director
              </Text>
              <Text marginBottom={"$4"} lineHeight={"$xs"} fontSize={"$sm"}>
                {params.director}
              </Text>
            </Box>

            <Box>
              <Text
                marginBottom={"$4"}
                lineHeight={"$xs"}
                fontSize={"$sm"}
                fontWeight="bold"
              >
                Writer:
              </Text>
              <Text marginBottom={"$4"} lineHeight={"$xs"} fontSize={"$sm"}>
                {params.writer}
              </Text>
            </Box>

            <Box>
              <Text
                marginBottom={"$4"}
                lineHeight={"$xs"}
                fontSize={"$sm"}
                fontWeight="bold"
              >
                Cast:
              </Text>
              <Text marginBottom={"$4"} lineHeight={"$xs"} fontSize={"$sm"}>
                {params.cast}
              </Text>
            </Box>
          </Box>
        </Box>
      </ScrollView>
    </>
  );
};

export default moviesDetail;
