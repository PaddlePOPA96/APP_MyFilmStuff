import React, { useState, useEffect } from "react";
import {
  Center,
  Text,
  Box,
  ScrollView,
  Icon,
  Spinner,
} from "@gluestack-ui/themed";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Favorite, Header} from "../components";


const FavoritePage = () => {
  const [completedListLength, setCompletedListLength] = useState(0);
  const [allList, setAllList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isClearDataOpen, setIsClearDataOpen] = useState(false);

  const handleStatusChange = (index) => {
    const newList = [...allList];
    newList[index].isCompleted = !newList[index].isCompleted;
    setAllList(newList);
    try {
      AsyncStorage.setItem("@movie-list", JSON.stringify(newList));
    } catch (e) {
      console.log("Error update status");
      console.error(e.message);
    } finally {
      setCompletedListLength(newList.filter((item) => item.isCompleted).length);
    }
  };

  const getTaskList = async () => {
    try {
      const value = await AsyncStorage.getItem("@movie-list");
      if (value !== null) {
        const allData = JSON.parse(value);
        setAllList(allData);
      } else {
        console.log("No tasks");
      }
    } catch (e) {
      console.log("Error");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const removeItem = async (id) => {
    try {
      const result = await AsyncStorage.getItem("@movie-list");
      if (!result) return; 

      let notes = JSON.parse(result);

      const newNotes = notes.filter((n) => n.id !== id);

      await AsyncStorage.setItem("@movie-list", JSON.stringify(newNotes));

      setAllList(newNotes);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTaskList();
  }, []);

  return (
    <Box flex={1}>
              <Header title={"Favorite Movies"} withBack={true} />

      {isLoading ? (
        <Center flex={1}>
          <Spinner size="lg" />
        </Center>
      ) : (
        <ScrollView>
          {allList.map((item, index) => {
            return (
              <Box key={item.title + index.toString()}>
                <Favorite
                  data={item}
                  onChecked={() => handleStatusChange(index)}
                  onItemPress={() => removeItem(item.id)}
                />
                
              </Box>
            );

            return null;
          })}
        </ScrollView>
      )}
    </Box>
  );
};

export default FavoritePage;
