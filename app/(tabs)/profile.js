import React from 'react';
import { FlatList, Box, Image, Text, Pressable } from "@gluestack-ui/themed";

const Actor = () => {
  const actors = [
    {
      id: 1,
      title: "Angelina Jolie",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm91ttrInqVYkGddA4AnTNfJc-o4SbmDZL8Vv_NH0qnUgkqRmY",
      cast: "Angelina Jolie, Brenton Thwaites, Sharlto Copley, Elle Fanning, Sam Riley, Imelda Staunton, Juno Temple, Lesley Manville",
    },
    {
      id: 2,
      title: "Nikolaj Coster-Waldau",
      image: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSeQFu_-FhhM_8SoIA-r5gemnpW8LcpfZ_aJPTkT8EBjNHGCXNj",
      cast: "Nikolaj Coster-Waldau, Gerard Butler, Brenton Thwaites, Chadwick Boseman, Élodie Yung, Courtney Eaton, Rufus Sewell, Geoffrey Rush",
    },
    // Add other actors as needed
  ];

  const renderItem = ({ item }) => (
    <Pressable>
      <Box p={10}>
        <Image alt={item.title} source={{ uri: item.image }} w={170} h={200} />
        <Text textAlign="center" fontWeight="bold" mt={10}>
          {item.title}
        </Text>
        <Text textAlign="center" mt={5}>
          {item.cast}
        </Text>
      </Box>
    </Pressable>
  );

  return (
    <FlatList
      data={actors}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      numColumns={2}
    />
  );
};

export default Actor;
