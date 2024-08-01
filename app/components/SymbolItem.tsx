import React, { useMemo } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LineChart } from "react-native-svg-charts";
import colors from "../utils/colors";
import format from "../utils/format";

const SymbolItem = ({ symbolData, onPressItem }) => {
  const priceChangeColor = useMemo(() => {
    return symbolData.priceChangePercent >= 0
      ? colors.positive
      : colors.negative;
  }, [symbolData.priceChangePercent]);

  const formattedDayClose = format(symbolData.curDayClose);
  const formattedPriceChangePercent = format(
    symbolData.priceChangePercent
  ).concat("%");

  return (
    <TouchableOpacity onPress={onPressItem}>
      <View style={styles.container}>
        <Text style={styles.symbol}>{symbolData.symbol}</Text>
        <View style={styles.rightContainer}>
          <LineChart
            style={styles.chart}
            data={[
              symbolData.prevDayClose * 10000,
              symbolData.open * 10000,
              symbolData.curDayClose * 10000,
            ]}
            svg={{ stroke: priceChangeColor }}
            contentInset={{ top: 24, bottom: 24 }}
          />
          <View style={styles.infoContainer}>
            <Text style={styles.priceInfo}>{formattedDayClose}</Text>
            <Text style={[styles.changeInfo, { color: priceChangeColor }]}>
              {formattedPriceChangePercent}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    marginBottom: 8,
    marginHorizontal: 16,
    borderRadius: 12,
    height: 72,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  symbol: {
    fontWeight: 600,
    fontSize: 12,
    color: "#6C757D",
    flex: 1,
  },
  rightContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
  chart: {
    height: 72,
    width: 48,
  },
  infoContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  priceInfo: {
    fontWeight: 600,
    fontSize: 14,
    color: "#343A40",
  },
  changeInfo: {
    fontWeight: 500,
    fontSize: 10,
  },
});

export default SymbolItem;
