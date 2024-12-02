import { StyleSheet, View } from "react-native";

import TodoScreen from "@/components/TodoScreen";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <TodoScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
});
