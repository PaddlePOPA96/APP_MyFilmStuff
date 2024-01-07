import { Stack } from "expo-router";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";

const noHead = { headerShown: false };

const StackLayout = () => {
  return (
    <GluestackUIProvider config={config}>
      <Stack>
        <Stack.Screen name="(tabs)" options={noHead} />
        <Stack.Screen name="index" options={noHead} />
        <Stack.Screen name="web" options={noHead} />
        <Stack.Screen name="movies-detail" options={noHead} />
        <Stack.Screen name="favorite-page" options={noHead} />
        <Stack.Screen name="login" options={noHead} />
        <Stack.Screen name="signup" options={noHead} />

      </Stack>
    </GluestackUIProvider>
  );
};

export default StackLayout;
