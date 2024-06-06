import { Colors } from "@/constants/Colors";
import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { DayState } from "react-native-calendars/src/types";
import { ExtendedMarking } from "./WeightCalendar";

interface DayComponentProps {
  date: number;
  state: DayState;
  marking?: ExtendedMarking;
  onPress: () => void;
}

const DayComponent: React.FC<DayComponentProps> = ({ date, state, marking, onPress }) => {
  const { weight, selected } = marking || {};

  const selectedTwStyle = selected ? "  bg-primary rounded-2xl ios:overflow-hidden" : "";

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.dayContainer, state == "today" && styles.todayContainer]}
    >
      <Text className={`${selectedTwStyle}  `} style={[styles.dateText]}>
        {date}
      </Text>
      {weight && <Text style={[styles.valueText]}>{weight}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  dayContainer: {
    alignItems: "center",
    padding: 5,
    backgroundColor: Colors.bgSecondary,
    borderRadius: 5,
  },

  dateText: {
    color: Colors.light,
    paddingHorizontal: 10,
    paddingVertical: 3,
    fontWeight: "600",
    fontSize: 14,
  },
  disabledText: {
    color: Colors.dark,
  },
  valueText: {
    color: Colors.primary,
    fontWeight: "400",
    fontSize: 12,
  },
  todayContainer: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.info,
  },
});

export default DayComponent;
