import {
  Center,
  ScrollView,
  Spinner,
  Image,
  Box,
  Text,
  Pressable,
} from "@gluestack-ui/themed";

import { Link } from "expo-router";
import { ImageBackground} from "react-native";

import { useEffect, useState } from "react";
import CategoryButton from "./category-button";
import dataCategories from "../dataCategories";


const Categories = ({ onChange }) => {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(0);


  return (
    <>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {dataCategories.map((category, index) => {
          return (
            <Box p={12} key={index}>
              <ImageBackground
                style={{ width: 340 }}
                source={{ uri: category.image }}
                resizeMode="cover"
                imageStyle={{ borderRadius: 10 }}
              >
                <Box bg={"rgba(0,0,0, 0.60)"} p={5}>
                  <Box mt={120}>
                    <Text mb={10} fontSize={20} color={"$white"}>
                      {category.title}
                    </Text>
                    <Text mb={20} color={"$white"} h={50}>
                      {category.synopsis}
                    </Text>

                    <Link
                      href={{
                        pathname: "/movies-detail",
                        params: {
                          title: category.title,
                          image: category.image,
                          synopsis: category.synopsis,
                          genre: category.genre,
                          year: category.year,
                          duration: category.duration,
                          producer: category.producer,
                          director: category.director,
                          writer: category.writer,
                          cast: category.cast,
                          link: category.link,
                        },
                      }}
                      asChild
                    >
                      <Pressable
                        p={15}
                        bg={"$yellow300"}
                        alignSelf="flex-start"
                        borderRadius={10}
                      >
                        <Text fontWeight="bold" color={"$black"}>
                          See More
                        </Text>
                      </Pressable>
                    </Link>
                  </Box>
                </Box>
              </ImageBackground>
            </Box>
          );
        })}
      </ScrollView>
    </>
  );
};

export default Categories;
