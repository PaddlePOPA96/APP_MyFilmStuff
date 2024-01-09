import React, { useState, useEffect } from "react";
import {
  Text,
  Box,
  Pressable,
  Image,
  ScrollView,
  SafeAreaView,
  Alert,
} from "@gluestack-ui/themed";

import { TextInput, StatusBar } from "react-native";

import { Icon } from "react-native-elements";
import { useNavigation } from "expo-router";

export default function SearchScreen1() {
  const [searchText, setSearchText] = useState("");
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const [isFetching, setIsFetching] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    StatusBar.setBarStyle("dark-content", false);
    const fetchSearchData = async () => {
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
      Promise.all([
        data.results,
        data2.results,
        data3.results,
        data4.results,
      ]).then((responses) => {
        const combinedData = responses.reduce(
          (acc, data) => acc.concat(data),
          []
        );
        setUsers(combinedData);
        setIsFetching(false); // Set loading state to false after data is fetched
      });
    };

    fetchSearchData();
  }, []);

  return (
    <Box flex={1} pt={40}>
      <Box flex={1} paddingHorizontal={12} pt={10}>
        <Box display="flex" flexDirection="row">
          <Box
            flex={1}
            h={40}
            bg="#dfe4ea"
            paddingHorizontal={10}
            borderRadius={6}
            display="flex"
            flexDirection="row"
            alignItems="center"
          >
            <TextInput
              defaultValue={searchText}
              flex={1}
              h={40}
              fontSize={18}
              placeholder="Search"
              textContentType="name"
              onChangeText={(text) => {
                setSearchText(text);
                if (text === "") {
                  return setFilteredUsers([]);
                }
                const filtered_users = users.filter((user) =>
                  user.original_title
                    .toLowerCase()
                    .startsWith(text.toLowerCase())
                );
                setFilteredUsers(filtered_users);
              }}
              returnKeyType="search"
            />
            {searchText.length === 0 ? (
              <Pressable>
                <Icon name="search" size={24} color="#333" />
              </Pressable>
            ) : (
              <Pressable
                onPress={() => {
                  setSearchText("");
                  setFilteredUsers([]);
                }}
              >
                <Icon name="cancel" size={24} color="#333" />
              </Pressable>
            )}
          </Box>
        </Box>
        {filteredUsers.length > 0 ? (
          <ScrollView>
            {filteredUsers.map((user) => (
              <Pressable
                bg="#fafafa"
                paddingVertical={6}
                paddingHorizontal={6}
                borderRadius={10}
                mt={10}
                display="flex"
                flexDirection="row"
                alignItems="center"
                onPress={() => {
                  navigation.navigate("movies-detail", {
                    data: user.id,
                    title: user.original_title,
                    image:
                      "https://image.tmdb.org/t/p/w500/" + user.poster_path,
                    synopsis: user.overview,
                    genre: user.genre,
                    year: user.release_date,
                    duration: user.duration,
                  });
                }}
              >
                <Image
                  alt={user.original_title}
                  style={{ width: 150, height: 230 }}
                  source={{
                    uri: "https://image.tmdb.org/t/p/w500/" + user.poster_path,
                  }}
                  resizeMode="cover"
                  imageStyle={{ borderRadius: 10 }}
                />

                <Box paddingHorizontal={10}>
                  <Text
                    fontSize={18}
                    fontWeight="500"
                  >{`${user.original_title}`}</Text>
                </Box>
              </Pressable>
            ))}
            <Box h={50}></Box>
          </ScrollView>
        ) : searchText.length > 0 ? (
          <Box flex={1} alignItems="center" justifyContent="center">
            <Text fontSize={20} fontWeight="500">
              No Film found
            </Text>
          </Box>
        ) : (
          <Box flex={1} alignItems="center" justifyContent="center">
            <Text fontSize={20} fontWeight="500">
              Search for Film
            </Text>
          </Box>
        )}
      </Box>
    </Box>
  );
}
