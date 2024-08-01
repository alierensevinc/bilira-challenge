import { useEffect, useState } from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { FlashList } from "@shopify/flash-list";
import SymbolItem from "../components/SymbolItem";

const Binance = require("binance-api-react-native").default;
const client = Binance();

SplashScreen.preventAutoHideAsync();

const HomeScreen = ({ navigation }) => {
  const [tickerData, setTickerData] = useState([]);

  useEffect(() => {
    client.ping().then((resp) => {
      if (resp) {
        SplashScreen.hideAsync();
      }
    });

    const updateTickerData = (newTicker) => {
      setTickerData((prevData) => {
        const existingTicker = prevData.find(
          (item) => item.symbol === newTicker.symbol
        );

        if (existingTicker) {
          return prevData.map((item) =>
            item.symbol === newTicker.symbol ? newTicker : item
          );
        } else {
          return [...prevData, newTicker];
        }
      });
    };

    const ws = client.ws.ticker(["BTCUSDT", "ETHBTC"], updateTickerData);

    return () => ws();
  }, []);

  const navigateTo = (screen, data) => {
    navigation.navigate(screen, { symbolData: data });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Trending Coins</Text>
      <FlashList
        data={tickerData}
        renderItem={({ item }) => (
          <SymbolItem
            symbolData={item}
            onPressItem={() => navigateTo("Detail", item)}
          />
        )}
        keyExtractor={(item) => item.symbol}
        estimatedItemSize={5}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  header: {
    fontWeight: 700,
    fontSize: 20,
    color: "#212529",
    marginLeft: 16,
    marginTop: 12,
    marginBottom: 16,
  },
});

export default HomeScreen;
