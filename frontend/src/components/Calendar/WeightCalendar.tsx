import { View } from "react-native";
import { Calendar, CalendarProvider } from "react-native-calendars";
import { darkTheme } from "./calendarTheme";
import DayComponent from "./Day";
import { useMemo, useState } from "react";
import DateUtils from "@/utils/dateUtils";
import { Colors } from "@/constants/Colors";
import { myWeighIns } from "@/constants/MyWeight";
import { MarkingProps } from "react-native-calendars/src/calendar/day/marking";

export interface ExtendedMarking extends MarkingProps {
  weight?: number;
  customStyles?: any;
}
interface MarkedDays {
  [key: string]: ExtendedMarking;
}

const WeightCalendar = () => {
  const [selected, setSelected] = useState(DateUtils.getCurrentDate("YYYY-MM-DD"));
  const marked: MarkedDays = useMemo(() => {
    const marks: MarkedDays = {};

    myWeighIns.forEach((weighIn) => {
      const dateString = weighIn.date.toISOString().split("T")[0];

      marks[dateString] = {
        selected: selected === dateString,
        selectedColor: Colors.primary,
        dotColor: Colors.warning,
        marked: true,
        selectedTextColor: Colors.danger,
        dots: [
          { color: Colors.primaryDark, key: dateString, selectedDotColor: Colors.primaryLight },
        ],
        weight: weighIn.weight,
      };
    });

    return marks;
  }, [selected]);

  return (
    <View className="flex-1 ">
      <CalendarProvider date={selected}>
        <Calendar
          markedDates={marked}
          enableSwipeMonths
          onDayPress={(day) => {
            setSelected(day.dateString);
          }}
          dayComponent={({ date, state, marking }) => {
            return (
              <DayComponent
                date={date?.day || 0}
                state={state || ""}
                marking={marking}
                key={1}
                onPress={() => {
                  if (!date) return;
                  setSelected(date.dateString);
                }}
              />
            );
          }}
          hideExtraDays
          style={{ borderRadius: 4 }}
          theme={darkTheme}
        />
      </CalendarProvider>
    </View>
  );
};

export default WeightCalendar;
