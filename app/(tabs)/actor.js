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
import { Header } from "../../components";
import { useEffect, useState } from "react";
import { Link } from "expo-router";
import CategoryButton from "../../components/category-button";

const actordata = [
  {
    id: 11,
    name: "John Cena Jr.",
    description: "",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/John_Cena_July_2018.jpg/800px-John_Cena_July_2018.jpg",

    genre: "Producer/Actor",
    born: "April, 23 1977",
    parent: "Carol Cena",
    spouses: "Shay Shariatzadeh",
    other:
      "TV commercial for the Stacker 2 YJ Stinger Extreme Energy Drink from NVE Pharmaceuticals. As of 2020 Stacker 2 is still used as the label for some supplements, but the YJ Stinger Extreme Energy Drink is no longer produced",
    link: "https://www.imdb.com/name/nm1078479/",
    categories: "Actor",
  },
  {
    id: 12,
    name: "Angelina Jolie",
    description: "",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm91ttrInqVYkGddA4AnTNfJc-o4SbmDZL8Vv_NH0qnUgkqRmY",
    genre: "",
    born: "",
    parent: "",
    spouses: "",
    other: "",
    link: "https://www.imdb.com/name/nm1078479/",
    categories: "Actress",
  },
];

const categories = [
  {
    id: 0,
    name: "All",
    categories: "All",
  },
  {
    id: 1,
    name: "Actress",
    categories: "Actress",
  },
  {
    id: 2,
    name: "Actor",
    categories: "Actor",
  },
];
const Actor = () => {
  const [datasList, setDatas] = useState(actordata);
  const [StatusActive, setStatusActive] = useState("All");
  const setStatus = (StatusActive) => {
    if (StatusActive !== "All") {
      setDatas([...actordata.filter((e) => e.categories === StatusActive)]);
    } else {
      setDatas(actordata);
    }
    setStatusActive(StatusActive);
  };

  const [activeCategory, setActiveCategory] = useState(0);

  const renderitem = ({ item }) => {
    const actorsitem = {
      name: item.name,
      image: item.image,
      description: item.description,
      genre: item.genre,
      born: item.born,
      parent: item.parent,
      spouses: item.spouses,
      other: item.other,
      link: item.link,
    };

    return (
      <Box>
        <Box p={10} flexDirection="row" alignItems="center">
          <Link
            href={{
              pathname: "/actor-detail",
              params: actorsitem,
            }}
            asChild
          >
            <Pressable>
              <Image
                alt={item.name}
                source={{ uri: item.image }}
                w={100}
                h={100}
                borderRadius={10}
                marginRight={10}
              />
            </Pressable>
          </Link>
          <Divider orientation="vertical" h="80%" mx={10} color="gray.300" />

          <Link
            href={{
              pathname: "/actor-detail",
              params: actorsitem,
            }}
            asChild
          >
            <Pressable>
              <Text
                textAlign="left"
                size="xl"
                fontWeight="bold"
                mt={10}
                flexShrink={1}
              >
                {item.name}
              </Text>
              <Text
                textAlign="left"
                size="sm"
                fontWeight="bold"
                mt={8}
                flexShrink={1}
              >
                {item.born}
              </Text>
            </Pressable>
          </Link>
        </Box>

        <Divider orientation="horizontal" my={2} color="black.100" />
      </Box>
    );
  };

  return (
    <>
      <Header title={"Actor"} />
      <Box>
        <ScrollView>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <Box flexDirection="row" mt={20}>
              {categories.map((item, index) => (
                <CategoryButton
                  title={item.categories}
                  isFirst={index === 0}
                  isActive={index === activeCategory}
                  key={index}
                  onPress={() => [
                    setStatus(item.categories),
                    setActiveCategory(index),
                  ]}
                />
              ))}
            </Box>
          </ScrollView>

          <FlatList
            scrollEnabled={false}
            paddingBottom={100}
            data={datasList}
            renderItem={renderitem}
            numColumns={1} // Set numColumns to 1 for a single column (list view)
          />
        </ScrollView>
      </Box>
    </>
  );
};

export default Actor;
