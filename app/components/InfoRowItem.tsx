import { View, Text, StyleSheet } from "react-native";

const InfoRowItem = ({ label, value }) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
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

export default InfoRowItem;
