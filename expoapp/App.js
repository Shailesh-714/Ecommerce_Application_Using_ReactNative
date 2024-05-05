import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import StackNavigator from "./app/navigation/StackNavigator";
import { Provider } from "react-redux";
import store from "./app/redux/store";
import { AppProvider } from "./app/components/AppContext";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync().then(() =>
          setAppIsReady(true)
        );
      } catch (error) {
        console.warn(error);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  };

  if (!appIsReady) {
    return null;
  }

  return (
    <Provider store={store}>
      <AppProvider>
        <SafeAreaView
          onLayout={onLayoutRootView}
          style={{
            flex: 1,
          }}
        >
          <StackNavigator />
        </SafeAreaView>
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
