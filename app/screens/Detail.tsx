import { useMemo } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { LineChart } from "react-native-svg-charts";
import Icon from "react-native-vector-icons/Ionicons";
import colors from "../utils/colors";
import format from "../utils/format";
import InfoRowItem from "../components/InfoRowItem";

const DetailScreen = ({ navigation, route }) => {
  const { symbolData } = route.params;

  const priceChangeColor = useMemo(() => {
    return symbolData.priceChangePercent >= 0
      ? colors.positive
      : colors.negative;
  }, [symbolData.priceChangePercent]);

  const formattedDayClose = format(symbolData.curDayClose);
  const formattedVolume = format(symbolData.volume);
  const formattedPriceChangePercent = format(
    symbolData.priceChangePercent
  ).concat("%");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.pop();
          }}
        >
          <Icon
            style={styles.icon}
            name={"chevron-back"}
            size={16}
            color={"##212529"}
          />
        </TouchableOpacity>
        <Text style={styles.header}>{symbolData.symbol}</Text>
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.price}>{formattedDayClose}</Text>
        <Text style={[styles.priceChange, { color: priceChangeColor }]}>
          {formattedPriceChangePercent}
        </Text>
      </View>
      <LineChart
        style={styles.chart}
        data={[
          symbolData.prevDayClose * 10000,
          symbolData.open * 10000,
          symbolData.curDayClose * 10000,
        ]}
        svg={{ stroke: priceChangeColor }}
        contentInset={{ top: 24, bottom: 24 }}
      ></LineChart>
      <View style={styles.infoContainer}>
        <Text style={styles.infoHeader}>Market Stats</Text>
        <InfoRowItem label={"Volume"} value={formattedVolume} />
        <InfoRowItem label={"Total Trades"} value={symbolData.totalTrades} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    alignContent: "center",
    marginLeft: 12,
  },
  icon: {
    height: 24,
  },
  header: {
    fontWeight: 700,
    fontSize: 16,
    color: "#212529",
    height: 24,
    marginLeft: 16,
    marginTop: 12,
    marginBottom: 16,
  },
  priceContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    alignContent: "flex-end",
    marginLeft: 16,
    marginBottom: 16,
  },
  price: {
    fontWeight: 500,
    fontSize: 24,
  },
  priceChange: {
    fontWeight: 600,
    fontSize: 12,
    marginLeft: 4,
  },
  chart: {
    height: 240,
    width: "100%",
  },
  infoContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  infoHeader: {
    fontWeight: 500,
    fontSize: 20,
    color: "#212529",
    marginLeft: 16,
    marginTop: 12,
    marginBottom: 24,
  },
});

export default DetailScreen;
