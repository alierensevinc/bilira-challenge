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

const DetailScreen = ({ navigation, route }) => {
  const { symbolData } = route.params;

  const priceChangeColor = useMemo(() => {
    return symbolData.priceChangePercent >= 0
      ? colors.positive
      : colors.negative;
  }, [symbolData.priceChangePercent]);

  const formattedDayClose = parseFloat(symbolData.curDayClose).toFixed(2);
  const formattedPriceChangePercent =
    parseFloat(symbolData.priceChangePercent).toFixed(2) + "%";

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
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Volume</Text>
          <Text style={styles.infoValue}>{symbolData.volume}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Total Trades</Text>
          <Text style={styles.infoValue}>{symbolData.totalTrades}</Text>
        </View>
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
  infoRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginBottom: 16,
  },
  infoLabel: {
    fontWeight: 600,
    fontSize: 14,
    color: "#6C757D",
  },
  infoValue: {
    fontWeight: 600,
    fontSize: 14,
    color: "#343A40",
  },
});

export default DetailScreen;
