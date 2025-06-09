import { StyleSheet, View, Text } from "react-native";
import React from "react";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { Image } from "expo-image";
import { ThemedText } from "@/components/ThemedText";
import { queryClient, trpc as trpcClient } from "@/utils/trpc";
import { QueryClientProvider, useQuery } from "@tanstack/react-query";

const Tasks = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ParallaxScrollView
        headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
        headerImage={
          <Image
            source={require("@/assets/images/partial-react-logo.png")}
            style={styles.reactLogo}
          />
        }
      >
        <ThemedText type="title">Tasks</ThemedText>
        <Greeting />
      </ParallaxScrollView>
     </QueryClientProvider>
  );
};

export default Tasks;

const styles = StyleSheet.create({
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});

const Greeting = () => {
  const trpc = trpcClient;
  const { data } = useQuery(trpc.tasks.getTasks.queryOptions());

  return (
    <View>
      {data?.map((task) => (
        <View key={task.id}>
          <Text>{task.title}</Text>
          <Text>{task.description}</Text>
        </View>
      ))}
    </View>
  );
};
