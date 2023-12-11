import { Box, Image, HStack, Heading, Pressable } from "@gluestack-ui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "expo-router";
import { Link } from "expo-router";

const Header = ({ title, withBack = false, withClose = false }) => {
  const trueGray900 = "#0d3353";
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <StatusBar barStyle="light" backgroundColor={trueGray900} />
      <Box bg="$trueGray900" p="$2">
        <HStack justifyContent="space-between" alignItems="center">
          <HStack alignItems="center">
            {!withBack ? (
              <>
                <Image
                  source={require("../assets/cinemskuy.png")}
                  w="$12"
                  h="$12"
                  alt="Cinemskuy Logo"
                  mr={"$3"}
                  role="img"
                />
              </>
            ) : (
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => navigation.goBack()}
              >
                <Box mr={"$3"}>
                  <Ionicons name="arrow-back-outline" size={32} color="white" />
                </Box>
              </TouchableOpacity>
            )}
            <Heading color={"$white"}>{title}</Heading>
          </HStack>
        </HStack>
      </Box>
    </SafeAreaView>
  );
};

export default Header;
