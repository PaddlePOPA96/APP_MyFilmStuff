import {
  Heading,
  FlatList,
  Box,
  Divider,
  Spinner,
  Center,
  Image,
  ScrollView,
  Text,
  Pressable,
} from "@gluestack-ui/themed";
import { ImageBackground } from "react-native";

import { Categories, Header, moviesItem } from "../../components";
import { useEffect, useState } from "react";
import { Link } from "expo-router";
import CategoryButton from "../../components/category-button";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";

import FavoriteButton from "../../components/favorite-button";

const categories = [
  {
    id: 0,
    title: "All Movies",
    categories: "All Movies",
  },
  {
    id: 1,
    title: "Now Playing",
    categories: "Now Playing",
  },
  {
    id: 2,
    title: "Top Rated",
    categories: "Top Rated",
  },
  {
    id: 3,
    title: "Coming Soon",
    categories: "Coming Soon",
  },
];

const API_KEY = "YOUR_API_KEY";
const Home = () => {
  const navigation = useNavigation();

  const [activeCategory, setActiveCategory] = useState(0);
  const [movies, setMovies] = useState();
  const [movies2, setMovies2] = useState();
  const [movies3, setMovies3] = useState();
  const [movies4, setMovies4] = useState();
  const [movies5, setMovies5] = useState();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/now_playing?api_key=376b068b6931955f89047ad9e1c7b03b"
      );

      const response2 = await fetch(
        "https://api.themoviedb.org/3/movie/popular?api_key=376b068b6931955f89047ad9e1c7b03b"
      );

      const response3 = await fetch(
        "https://api.themoviedb.org/3/movie/top_rated?api_key=376b068b6931955f89047ad9e1c7b03b"
      );

      const response4 = await fetch(
        "https://api.themoviedb.org/3/movie/upcoming?api_key=376b068b6931955f89047ad9e1c7b03b"
      );

      const data = await response.json();
      const data2 = await response2.json();
      const data3 = await response3.json();
      const data4 = await response4.json();
      Promise.all([data.results, data2.results, data3.results, data4.results])
        .then((responses) => {
          const combinedData = responses.reduce(
            (acc, data) => acc.concat(data),
            []
          );
          setMovies(combinedData);
          setIsLoading(false);

        })
        .catch((error) => {});
    };

    fetchData();
  }, []);

  useEffect(() => movies && console.log(movies), [movies]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/now_playing?api_key=376b068b6931955f89047ad9e1c7b03b"
      );

      const data = await response.json();

      setMovies2(data.results);
      setIsLoading(false);

    };

    fetchData();
  }, []);

  useEffect(() => movies2 && console.log(movies2), [movies2]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/popular?api_key=376b068b6931955f89047ad9e1c7b03b"
      );

      const data = await response.json();

      setMovies3(data.results);
      setIsLoading(false);

    };

    fetchData();
  }, []);

  useEffect(() => movies3 && console.log(movies3), [movies3]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/top_rated?api_key=376b068b6931955f89047ad9e1c7b03b"
      );

      const data = await response.json();

      setMovies4(data.results);
      setIsLoading(false);

    };

    fetchData();
  }, []);

  useEffect(() => movies4 && console.log(movies4), [movies4]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/upcoming?api_key=376b068b6931955f89047ad9e1c7b03b"
      );

      const data = await response.json();

      setMovies5(data.results);
      setIsLoading(false);

    };

    fetchData();
  }, []);

  useEffect(() => movies5 && console.log(movies5), [movies5]);

  const [StatusActive, setStatusActive] = useState("All Movies");
  const setStatus = (StatusActive) => {
    if (StatusActive === "All Movies") {
      setMovies([...movies]);

    } else if (StatusActive === "Now Playing") {
      setMovies2([...movies2]);
    } else if (StatusActive === "Popular") {
      setMovies3([...movies3]);
    } else if (StatusActive === "Top Rated") {
      setMovies4([...movies4]);
    } else {
      setMovies5([...movies5]);
    }
    setStatusActive(StatusActive);
  };

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
      <ScrollView>
        <Box p={10}>
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

  return (
    <>
      <Header title={"CinemSkuy"} />
      <Box>
        <ScrollView>
          <Box py={"$4"} bg={"$black"}>
            <Categories />
          </Box>

          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <Box flexDirection="row" mt={20}>
              {categories.map((item, index) => {
                return (
                  <CategoryButton
                    title={item.title}
                    isFirst={index == 0 ? true : false}
                    isActive={index == activeCategory ? true : false}
                    key={index}
                    onPress={() => [
                      setStatus(item.categories),
                      setActiveCategory(index),
                    ]}
                  />
                );
              })}
            </Box>
          </ScrollView>

          {isLoading ? (
        <Center flex={1}>
          <Spinner size={"large"} color={"$black"} />
        </Center>
      ) : 
          (<FlatList
            scrollEnabled={false}
            paddingBottom={100}
            data={
              StatusActive == "All Movies"
                ? movies
                : StatusActive == "Now Playing"
                ? movies2
                : StatusActive == "Popular"
                ? movies3
                : StatusActive == "Top Rated"
                ? movies4
                : movies5
            }
            renderItem={renderitem}
            numColumns={2}
          />)}
        </ScrollView>

        <Pressable
          backgroundColor="black"
          position="absolute"
          justifyContent="center"
          bottom={100}
          borderRadius={100}
          right={10}
          p={20}
          onPress={() => {
            navigation.navigate("favorite-page");
          }}
        >
          <MaterialCommunityIcons name={"heart"} size={25} color={"red"} />
        </Pressable>
      </Box>
    </>
  );
};

export default Home;
