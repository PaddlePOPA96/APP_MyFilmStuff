import {
  Box,
  Heading,
  Text,
  Image,
  Divider,
  ScrollView,
  Button,
  ButtonText,
  Pressable,
  FlatList,
} from "@gluestack-ui/themed";
import { Header } from "../components";
import { Link, useLocalSearchParams } from "expo-router";
import { ImageBackground } from "react-native";
import { useState, useEffect } from "react";
import FavoriteButton from "../components/favorite-button";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const moviesDetail = () => {
  const navigation = useNavigation();

  const params = useLocalSearchParams();
  const [activeCategory, setActiveCategory] = useState(true);
  const [similar, setSimilar] = useState();
  const [cast, setCast] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${params.id}/similar?api_key=376b068b6931955f89047ad9e1c7b03b`
      );

      const data = await response.json();

      setSimilar(data.results);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${params.id}/credits?api_key=376b068b6931955f89047ad9e1c7b03b`
      );

      const data = await response.json();

      setCast(data.cast);
    };

    fetchData();
  }, []);

  const renderitem = ({ item }) => {
    const moviesItem = {
      id: item.id,
      title: item.original_title,
      image: "https://image.tmdb.org/t/p/w500/" + item.poster_path,
      synopsis: item.overview,
      genre: item.genre,
      year: item.release_date,
      duration: item.duration,
      cast: item.cast,
      link: item.link,
    };

    return (
      <ScrollView horizontal={true}>
        <Box>
          <Link
            href={{
              pathname: "/movies-detail",
              params: moviesItem,
            }}
            asChild
          >
            <Pressable>
              <Box p={10}>
                <Box>
                  <ImageBackground
                    alt={item.original_title}
                    style={{ width: 150, height: 230 }}
                    source={{
                      uri:
                        "https://image.tmdb.org/t/p/w500/" + item.poster_path,
                    }}
                    resizeMode="cover"
                    imageStyle={{ borderRadius: 10 }}
                  />
                </Box>

                <Box style={{ width: 150 }}>
                  <Text
                    textAlign="center"
                    fontWeight="bold"
                    fontSize={15}
                    mt={10}
                  >
                    {item.original_title}
                  </Text>
                </Box>
              </Box>
            </Pressable>
          </Link>
        </Box>
      </ScrollView>
    );
  };

  const renderitem2 = ({ item }) => {
    const moviesItem = {
      id: item.id,
      title: item.original_title,
      image: "https://image.tmdb.org/t/p/w500/" + item.poster_path,
      synopsis: item.overview,
      genre: item.genre,
      year: item.release_date,
      duration: item.duration,
      cast: item.cast,
      link: item.link,
    };
    return (
      <ScrollView horizontal={true}>
        <Box>
          <Link
            href={{
              pathname: "/movies-detail",
            }}
            asChild
          >
            <Pressable>
              <Box p={10}>
                <Box>
                  <ImageBackground
                    alt={item.name}
                    style={{ width: 150, height: 150 }}
                    source={{
                      uri:
                        "https://image.tmdb.org/t/p/w500/" + item.profile_path,
                    }}
                    resizeMode="cover"
                    imageStyle={{ borderRadius: 100 }}
                  />
                </Box>

                <Box style={{ width: 150 }}>
                  <Text
                    textAlign="center"
                    fontWeight="bold"
                    fontSize={15}
                    mt={10}
                  >
                    {item.name}
                  </Text>
                </Box>
              </Box>
            </Pressable>
          </Link>
        </Box>
      </ScrollView>
    );
  };

  const [videoUrl, setVideoUrl] = useState(null);

  const fetchVideoUrl = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${params.id}/videos?api_key=376b068b6931955f89047ad9e1c7b03b`
    );
    const data = await response.json();
    setVideoUrl(data.results[0].key);
  };
  return (
    <>
      <ScrollView>
        <ImageBackground
          source={{ uri: params.image }}
          alt="Movies Image"
          role="img"
        >
          <Box bg={"rgba(0,0,0, 0.60)"}>
            <Box
              flexDirection="row"
              mt={50}
              ml={20}
              mr={20}
              justifyContent="space-between"
            >
              <Pressable
                backgroundColor="black"
                justifyContent="center"
                borderRadius={100}
                p={10}
                onPress={() => navigation.goBack()}
              >
                <Ionicons name="arrow-back-outline" size={32} color="yellow" />
              </Pressable>

              <FavoriteButton
                id={params.id}
                title={params.title}
                image={params.image}
              />
            </Box>
            <Box p={"$4"} mt={159} mb={40}>
              <Heading
                lineHeight={"$2xl"}
                fontSize={"$3xl"}
                color={"$white"}
                mb={20}
                textAlign="center"
              >
                {params.title}
              </Heading>
              <Text
                color={"$white"}
                textAlign="center"
                lineHeight={"$2xs"}
                fontSize={"$sm"}
              >
                Released at {params.year}
              </Text>
            </Box>
            <Link
              href={{
                pathname: "/web",
                params: {
                  id: params.id,
                  videoUrl: videoUrl,
                  title: params.title,
                  synopsis: params.synopsis,
                },
              }}
              asChild
            >
              <Pressable
                backgroundColor="$yellow300"
                justifyContent="center"
                borderRadius={100}
                p={20}
                bottom={-30}
                right={160}
                position="absolute"
                onPress={() => fetchVideoUrl()}
              >
                <MaterialCommunityIcons
                  name={"play"}
                  size={30}
                  color={"black"}
                />
              </Pressable>
            </Link>

            
          </Box>
        </ImageBackground>

        <Box p={10} marginTop={40}>
          <Box alignItems="center">
            <Text
              width={335}
              marginBottom={"$4"}
              lineHeight={"$xs"}
              fontSize={"$sm"}
            >
              {params.synopsis}
            </Text>
          </Box>

          <Box pl={12} mt={20} alignItems="start" width={150}>
            <Text
              fontWeight="bold"
              color="$black"
              borderBottomWidth={1}
              borderBottomColor="#000"
            >
              Similar Film
            </Text>
          </Box>

          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            scrollEnabled={true}
            paddingBottom={5}
            data={similar}
            renderItem={renderitem}
          />

          <Box pl={12} alignItems="start" width={100}>
            <Text
              fontWeight="bold"
              color="$black"
              borderBottomWidth={1}
              borderBottomColor="#000"
            >
              Our Cast
            </Text>
          </Box>

          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            scrollEnabled={true}
            paddingBottom={5}
            data={cast}
            renderItem={renderitem2}
          />
        </Box>
      </ScrollView>

<Box pl ={20} pr={8}>
  
              <Box p ={10}>
                 <Pressable
                  backgroundColor="black"
                  position="absolute"
                  justifyContent="center"
                  bottom={20}
                  width='100%'
                  borderRadius={100}
                  p={20}
                  onPress={() => {
                    navigation.navigate("review");
                  }}
              >
              <Text color="$yellow300" fontWeight='bold'>Review</Text>
              </Pressable>
              </Box>
           

</Box>
       </>
  );
};

export default moviesDetail;
