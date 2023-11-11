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
import { Categories, Header, actorsitem } from "../../components";
import { useEffect, useState } from "react";
import { Link } from "expo-router";
import CategoryButton from "../../components/category-button";

const datas = [
  {
    id: 1,
    name: "John Cena Jr.",
    description:
      "John Felix Anthony Cena was born on April 23, 1977 in West Newbury, Massachusetts to Carol Cena and John Joseph Cena. He is of Italian (father) and French-Canadian and English (mother) descent, and is the grandson of baseball player Tony Lupien. When he was in college, he played football. He then continued on to be a bodybuilder and a limousine driver. ",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/John_Cena_July_2018.jpg/800px-John_Cena_July_2018.jpg",

    genre: "Producer/Actor",
    born: "April, 23 1977",
    parent: "Carol Cena",
    spouses: "Shay Shariatzadeh",
    other: "TV commercial for the Stacker 2 YJ Stinger Extreme Energy Drink from NVE Pharmaceuticals. As of 2020 Stacker 2 is still used as the label for some supplements, but the YJ Stinger Extreme Energy Drink is no longer produced"
    ,
    link: "https://www.imdb.com/name/nm1078479/",
    categories: "Actor",

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
      <ScrollView>
        <Box p={10}>
          <Link
            href={{
              pathname: "/actor-detail",
              params: actorsitem,
            }}
            asChild
          >
            <Pressable>
              <Box p={10}>
                <Image
                  alt={item.name}
                  source={{ uri: item.image }}
                  w={170}
                  h={200}
                />
                <Text textAlign="center" fontWeight="bold" mt={10}>
                  {item.name}
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
      <Header title={"Actor"} />
      <Box>
        <ScrollView>
          <Box py={"$2"} bg={"$yellow"}>
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
      </Box>
    </>
  );
};

export default Actor;