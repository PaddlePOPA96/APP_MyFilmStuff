import React, { useEffect, useState } from "react";
import { FlatList , Box, ScrollView, Text, Pressable, Center, Spinner } from "@gluestack-ui/themed";
import { ImageBackground } from "react-native";
import { useNavigation } from "expo-router";
import {  Header } from "../../components";
import { Link } from "expo-router";



const API_KEY = "YOUR_API_KEY";

const Actor = () => {
  const navigation = useNavigation();
  const [actors, setActors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/person/popular?api_key=376b068b6931955f89047ad9e1c7b03b`
        );
        const data = await response.json();
        setActors(data.results);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching actors:", error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handlePress = (actor) => {
    navigation.navigate("ActorDetail", {
      name: actor.original_name,
      image: `https://image.tmdb.org/t/p/w500${actor.profile_path}`,
      gender: actor.gender === 2 ? "Male" : "Female",
      knownForDepartment: actor.known_for_department,
      originalName: actor.name,
      popularity: actor.popularity,
      knownFor: actor.known_for, // Mengirimkan knownFor ke halaman ActorDetail
    });
  };


  
  const renderActor = ({ item }) => (
    <Link
    href={{
      pathname: "/actor-detail",
      query: {
        name: item.original_name,
        image: `https://image.tmdb.org/t/p/w500${item.profile_path}`,
        gender: item.gender === 2 ? "Male" : "Female",
        knownForDepartment: item.known_for_department,
        originalName: item.name,
        popularity: item.popularity,
        knownFor: item.known_for, // Array of movies/TV shows
      }
    }}
    asChild
    >
      <Pressable style={{ width: "50%" }}>
      <Box p={10}>
          <ImageBackground
            alt={item.original_name}
            style={{ width: "100%", height: 230 }}
            source={{ uri: `https://image.tmdb.org/t/p/w500${item.profile_path}` }}
            resizeMode="cover"
            imageStyle={{ borderRadius: 20 }}
          >
           
          </ImageBackground>
          <Text textAlign="center" fontWeight="bold" fontSize={15} mt={10} color="black">
              {item.original_name}
            </Text>
            <Text textAlign="center" fontSize={12} mt={5} color="black">
              Gender: {item.gender === 2 ? "Male" : "Female"}
            </Text>
        </Box>
      </Pressable>
    </Link>
  );

  return (
    <>
          <Header title={"CinemSkuy"} />

    
    <FlatList
      data={actors}
      renderItem={renderActor}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      contentContainerStyle={{ padding: 6}}
      ListEmptyComponent={
        isLoading ? (
          <Center flex={1}>
            <Spinner size={"large"} color={"$black"} />
          </Center>
        ) : null
      }
    />
    </>
  );
  
};

export default Actor;