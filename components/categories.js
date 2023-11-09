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
import { ImageBackground } from "react-native";

import { useEffect, useState } from "react";
import CategoryButton from "./category-button";

const datas = [
  {
    id: 1,
    title: "Maleficent",
    synopsis:
      "Maleficent is a kind fairy who was betrayed by her lover, Stefan. Soon, he will curse his daughter, Aurora, in order to avenge her thirst for justice.",
    image:
      "https://lumiere-a.akamaihd.net/v1/images/p_maleficent_19736_89c0d9e7.jpeg?region=0%2C0%2C540%2C810",

    genre: "Drama/Fantasy",
    year: "2014",
    duration: "1 h 38 m",
    producer: "Joe Roth",
    director: "Robert Stromberg",
    writer: "Linda Woolverton",
    cast: "Angelina Jolie, Brenton Thwaites,Sharlto Copley, Elle Fanning,  Sam Riley, Imelda Staunton, Juno Temple, Lesley Manville",
    link: "https://www.imdb.com/video/vi1449634329/?playlistId=tt1587310&ref_=tt_ov_vi",
    categories: "Coming Soon",
  },

  {
    id: 2,
    title: "Aladdin",
    image:
      "https://www.pixel4k.com/wp-content/uploads/2019/06/aladdin-movie-poster-4k_1560535101.jpg",
    synopsis:
      "A kind-hearted street urchin and a power-hungry Grand Vizier vie for a magic lamp that has the power to make their deepest wishes come true.",
    link: "https://www.imdb.com/video/vi3875453977/?playlistId=tt6139732&ref_=tt_ov_vi",
    genre: "Action | Adventure | Drama",
    year: "2016",
    duration: "2h 7m",
    producer: "Basil Iwanyk | Alex Proyas",
    director: "Alex Proyas",
    writer: "Matt Sazama | Burk Sharpless",
    cast: "Nikolaj Coster-Waldau,Gerard Butler, Brenton Thwaites,  Chadwick Boseman, Élodie Yung, Courtney Eaton, Rufus Sewell, Geoffrey Rush ",
    link: "https://www.imdb.com/video/vi3493246233/?playlistId=tt2404233&ref_=tt_ov_vi",
    categories: "Now Playing",
  
  },

  {
    id: 3,
    title: "Terminator Dark Fate",
    image:
      "https://www.hdwallpapers.in/download/terminator_dark_fate_movie_poster_4k_8k_hd-HD.jpg",
    synopsis:
      "An augmented human and Sarah Connor must stop an advanced liquid Terminator from hunting down a young girl, whose fate is critical to the human race.",
 
      genre: "Action | Adventure | Drama",
      year: "2016",
      duration: "2h 7m",
      producer: "Basil Iwanyk | Alex Proyas",
      director: "Alex Proyas",
      writer: "Matt Sazama | Burk Sharpless",
      cast: "Nikolaj Coster-Waldau,Gerard Butler, Brenton Thwaites,  Chadwick Boseman, Élodie Yung, Courtney Eaton, Rufus Sewell, Geoffrey Rush ",
      link: "https://www.imdb.com/video/vi3493246233/?playlistId=tt2404233&ref_=tt_ov_vi",
      categories: "Now Playing",
      },
];

const Categories = ({ onChange }) => {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(0);

 
  return (
    <>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {datas.map((category, index) => {
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
