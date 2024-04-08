import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import StackNavigator from "./app/navigation/StackNavigator";
import { Provider } from "react-redux";
import store from "./app/redux/store";
import { AppProvider } from "./app/components/AppContext";

export default function App() {
  return (
    <Provider store={store}>
      <AppProvider>
        <StackNavigator />
      </AppProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020121",
    alignItems: "center",
    justifyContent: "center",
  },
});
