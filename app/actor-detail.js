import {
  Box,
  Heading,
  Text,
  Image,
  Divider,
  ScrollView,
  Button,
  ButtonText,
  Pressable,
  FlatList,
} from "@gluestack-ui/themed";
import { Header } from "../components";
import { Link, useLocalSearchParams } from "expo-router";
import { ImageBackground } from "react-native";
import { useState, useEffect } from "react";
import FavoriteButton from "../components/favorite-button";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const API_KEY = "376b068b6931955f89047ad9e1c7b03b";

const ActorDetail = () => {
  const navigation = useNavigation();

  const params = useLocalSearchParams();
  const [similar, setSimilar] = useState([]);
  const [cast, setCast] = useState([]);
  const [actor, setActorInfo] = useState(null); // Tambahkan state untuk info aktor

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/person/popular?api_key=${API_KEY}`
      );

      const data = await response.json();

      setSimilar(data.results);

      // Ambil data film yang dia bintangi dari "knownFor" dalam params
      const castData = params.knownFor || [];
      setCast(castData);

      // Ambil informasi lengkap aktor dari API
      const actorResponse = await fetch(
        `https://api.themoviedb.org/3/person/${params.id}?api_key=${API_KEY}`
      );

      const actorData = await actorResponse.json();
      setActorInfo(actorData);
    };

    fetchData();
  }, []);

  const renderitem = ({ item }) => {
    const actorItem = {
      id: item.id,
      title: item.original_name,
      image: `https://image.tmdb.org/t/p/w500${item.profile_path}`,
      gender: item.gender === 2 ? "Male" : "Female",
      knownForDepartment: item.known_for_department,
      originalName: item.name,
      duration: item.duration,
      popularity: item.popularity,
      knownFor: item.known_for,
    };

    return (
      <>
        <ScrollView>
          <ImageBackground source={{ uri: params.image }} alt="Actor image" role="img">
            <Box bg={"rgba(0,0,0, 0.60)"}>
              <Box flexDirection="row" mt={50} ml={20} mr={20} justifyContent="space-between">
                {/* Tambahkan elemen yang dibutuhkan di sini */}
                {actor && ( // Check if actor is not null before accessing its properties
                  <Box>
                    <Text color={"$white"} fontSize={"$sm"}>
                      Name: {actor.name}
                    </Text>
                    <Text color={"$white"} fontSize={"$sm"}>
                      Gender: {actor.gender === 2 ? "Male" : "Female"}
                    </Text>
                    <Text color={"$white"} fontSize={"$sm"}>
                      Known For Department: {actor.known_for_department}
                    </Text>
                  </Box>
                )}
              </Box>
              <Box p={"$4"} mt={159} mb={40}>
                <Heading lineHeight={"$2xl"} fontSize={"$3xl"} color={"$white"} mb={20} textAlign="center">
                  {params.name}
                </Heading>
                <Text color={"$white"} textAlign="center" lineHeight={"$2xs"} fontSize={"$sm"}>
                  Released at {params.gender}
                </Text>
              </Box>
              <Link
                href={{
                  pathname: "/web",
                  params: {
                    id: params.id,
                    title: params.name,
                    synopsis: params.synopsis,
                  },
                }}
                asChild
              >
                <Pressable backgroundColor="$yellow300" justifyContent="center" borderRadius={100} p={20} bottom={-30} right={160} position="absolute" onPress={() => fetchVideoUrl()}>
                  <MaterialCommunityIcons name={"play"} size={30} color={"black"} />
                </Pressable>
              </Link>
            </Box>
          </ImageBackground>
  
          {/* ... (kode lainnya) */}
        </ScrollView>
      </>
    );
  };
  

  const renderitem2 = ({ item }) => {
    return (
      <Box>
        <Link
          href={{
            pathname: "/actor-detail",
            params: item, 
          }}
          asChild
        >
          <Pressable>
            <Box p={10}>
              <Box>
                <ImageBackground
                  alt={item.title}
                  style={{ width: 150, height: 150 }}
                  source={{
                    uri: item.image,
                  }}
                  resizeMode="cover"
                  imageStyle={{ borderRadius: 100 }}
                />
              </Box>

              <Box style={{ width: 150 }}>
                <Text textAlign="center" fontWeight="bold" fontSize={15} mt={10}>
                  {item.title}
                </Text>
              </Box>
            </Box>
          </Pressable>
        </Link>
      </Box>
    );
  };

  const fetchVideoUrl = async () => {
    // Tambahkan logika fetch video URL sesuai kebutuhan
  };

  return (
    <>
      <ScrollView>

        <ImageBackground source={{ uri: params.image }} alt="Actor image" role="img" bg={"rgba(0,0,0, 0.60)"}>
            <Box p={"$4"} mt={300} mb={0}>
             
          </Box>
        </ImageBackground>

        <Box  bg="$yellow500"py={50} >
      
              <Heading color={"$black"} textAlign="center" fontSize={"$3xl"} mt={10}>
               {params.title}
              </Heading>
              
              <Text color={"$black"} marginLeft={30} textAlign="left" lineHeight={"$2xs"} fontSize={"$2xl"} pt={25}>
               Gender : {params.gender}
              </Text>
              <Text color={"$black"} marginLeft={30} textAlign="left" fontSize={"$2xl"}>
               Known For : {params.knownForDepartment}
              </Text>
              <Text color={"$black"} marginLeft={30} textAlign="left" fontSize={"$2xl"}>
               Popularity Rating : {params.popularity}
              </Text>
            
            </Box>

      
       
      </ScrollView>
    </>
  );
};

export default ActorDetail;
