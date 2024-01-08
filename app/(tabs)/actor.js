import React, { useEffect, useState } from "react";
import { FlatList, Box, ScrollView, Text, Pressable, Center, Spinner } from "@gluestack-ui/themed";
import { ImageBackground } from "react-native";
import { useNavigation } from "expo-router";
import { Header } from "../../components";
import { Link } from "expo-router";

const API_KEY = "376b068b6931955f89047ad9e1c7b03b";

const Actor = () => {
  const navigation = useNavigation();
  const [actors, setActors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/person/popular?api_key=${API_KEY}`
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

  useEffect(() => actors && console.log(actors), [actors]);

  const renderActor = ({ item }) => {
    const actorItem = {
      id: item.id,
      title: item.original_name,
      image: `https://image.tmdb.org/t/p/w500${item.profile_path}`,
      gender: item.gender === 2 ? "Male" : "Female",
      knownForDepartment: item.known_for_department,
      originalName: item.name,
      popularity: item.popularity,
      knownFor: item.known_for, // Mengirimkan knownFor ke halaman ActorDetail
    };

    return (
      <ScrollView>
        <Box p={10}>
          <Link
            href={{
              pathname: "/actor-detail",
              params: actorItem,
            }}
            asChild
          >
            <Pressable>
              <Box p={10}>
                <Box>
                  <ImageBackground
                    alt={item.original_name}
                    style={{ width: 150, height: 230 }}
                    source={{
                      uri:
                        "https://image.tmdb.org/t/p/w500/" + item.profile_path,
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
                    {item.original_name}
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

      <FlatList
        data={actors}
        renderItem={renderActor}
        keyExtractor={(actor) => actor.id.toString()}
        numColumns={2}
        contentContainerStyle={{ padding: 6 }}
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
