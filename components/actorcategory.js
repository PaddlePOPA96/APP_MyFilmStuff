import React from "react";
import { ScrollView, Box, Text, ImageBackground, Pressable } from "@gluestack-ui/themed";
import { Link } from "expo-router";

const actorsData = [
  {
    name: "John Cena Jr.",
    description:
      "John Felix Anthony Cena was born on April 23, 1977, in West Newbury, Massachusetts to Carol Cena and John Joseph Cena...",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/John_Cena_July_2018.jpg/800px-John_Cena_July_2018.jpg",
    genre: "Producer/Actor",
    born: "April 23, 1977",
    parent: "Carol Cena",
    spouses: "Shay Shariatzadeh",
    other:
      "TV commercial for the Stacker 2 YJ Stinger Extreme Energy Drink from NVE Pharmaceuticals...",
    link: "https://www.imdb.com/name/nm1078479/",
    categories: "Actor",
  },

  
];
const actorcategory = () => {
  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      {actorsData.map((actor, index) => (
        <Box p={12} key={index}>
          <ImageBackground
            style={{ width: 340 }}
            source={{ uri: actor.image }}
            resizeMode="cover"
            imageStyle={{ borderRadius: 10 }}
          >
            <Box bg={"rgba(0,0,0, 0.60)"} p={5}>
              <Box mt={120}>
                <Text mb={10} fontSize={20} color={"$white"}>
                  {actor.name}
                </Text>
                <Text mb={20} color={"$black"} h={50}>
                  {actor.description}
                </Text>
                <Link
                  href={{
                    pathname: "/actor-detail",
                    params: {
                      name: actor.name,
                      image: actor.image,
                      description: actor.description,
                      genre: actor.genre,
                      born: actor.born,
                      parent: actor.parent,
                      spouses: actor.spouses,
                      other: actor.other,
                      link: actor.link,
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
      ))}
    </ScrollView>
  );
};

export default actorcategory;
