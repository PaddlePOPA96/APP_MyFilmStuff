import{ useState, useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import YoutubePlayer from 'react-native-youtube-iframe';
import { Header } from "../components";
import { SafeAreaView } from 'react-native';

import {
  Text,
  ScrollView,
} from "@gluestack-ui/themed";
const Web = () => {
  const params = useLocalSearchParams();
  return (
  <SafeAreaView style={{ flex: 1 }}>
      <Header title={"Watch Trailer"} withBack={true} />
      <YoutubePlayer
        height={300}
        play={true}
        videoId={params.videoUrl}
      />

      <Text>{params.title}</Text>
    </SafeAreaView>
);
};

export default Web;




