import { Tabs } from "expo-router/tabs";
import { Text } from "@gluestack-ui/themed";
import Ionicons from "@expo/vector-icons/Ionicons";

const noHead = { headerShown: false };

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName;
          switch (route.name) {
            case "home":
              iconName = "home-outline";
              break;
            case "actor":
              iconName = "people-outline";
              break;
            case "profile":
              iconName = "person-circle-outline";
              break;
          }
          return (
            <Ionicons
              name={iconName}
              size={21}
              color={focused ? "#fde047" : color}
            />
          );
        },
        tabBarIconStyle: { marginTop: 5 },
        tabBarStyle: {
          height: 60,
          backgroundColor: "#171717",
        },
        tabBarLabel: ({ children, color, focused }) => {
          return (
            <Text
              mb="$2"
              color={focused ? "$white" : color}
              fontSize="$sm"
              fontWeight="bold"
            >
              {children}
            </Text>
          );
        },
      })}
    >
      <Tabs.Screen name="home" options={{ title: "Home", ...noHead }} />
      <Tabs.Screen name="actor" options={{ title: "Actor", ...noHead }} />

      <Tabs.Screen name="profile" options={{ title: "Profile", ...noHead }} />
    </Tabs>
  );
};

export default TabsLayout;
