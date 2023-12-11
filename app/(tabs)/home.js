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
  useWindowDimensions,
} from "@gluestack-ui/themed";
import { Categories, Header, moviesItem } from "../../components";
import { useEffect, useState } from "react";
import { Link } from "expo-router";
import CategoryButton from "../../components/category-button";
import datas from "../../datas";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";



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
    title: "Coming Soon",
    categories: "Coming Soon",
  },
];

const Home = () => {
  const [datasList, setDatas] = useState(datas);
  const [StatusActive, setStatusActive] = useState("Now");
  const setStatus = (StatusActive) => {
    if (StatusActive !== "All Movies") {
      setDatas([...datas.filter((e) => e.categories === StatusActive)]);
    } else {
      setDatas(datas);
    }
    setStatusActive(StatusActive);
  };

  const navigation = useNavigation();


  const [activeCategory, setActiveCategory] = useState(0);

  const renderitem = ({ item }) => {
    const moviesItem = {
      id: item.id,
      title: item.title,
      image: item.image,
      synopsis: item.synopsis,
      genre: item.genre,
      year: item.year,
      duration: item.duration,
      producer: item.producer,
      director: item.director,
      writer: item.writer,
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
                <Image
                  alt={item.title}
                  source={{ uri: item.image }}
                  w={170}
                  h={200}
                />
                <Text textAlign="center" fontWeight="bold" mt={10}>
                  {item.title}
                </Text>
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
                    title={item.categories}
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

          <FlatList
            scrollEnabled={false}
            paddingBottom={100}
            data={datasList}
            renderItem={renderitem}
            numColumns={2}
          />
        </ScrollView>

        <Pressable
      backgroundColor="black"
      position="absolute"
      justifyContent= 'center'
      bottom={100}
      borderRadius={100}
      right={10}
      p={20}
      onPress={() => {
        navigation.navigate("favorite-page");
      }}
    >
      <MaterialCommunityIcons
                      name={"heart"}
                      size={25}
                      color={"red"}
                    />
    </Pressable>
      </Box>
    </>
  );
};

export default Home;
