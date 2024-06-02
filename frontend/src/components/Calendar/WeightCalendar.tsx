import { View } from "react-native";
import { Calendar, CalendarProvider } from "react-native-calendars";
import { darkTheme } from "./calendarTheme";
import DayComponent from "./Day";
import { useMemo, useState } from "react";
import DateUtils from "@/utils/dateUtils";
import { Colors } from "@/constants/Colors";
import { MarkedDates } from "react-native-calendars/src/types";

const WeightCalendar = () => {
  const [selected, setSelected] = useState(DateUtils.getCurrentDate("YYYY-MM-DD"));

  const marked: MarkedDates = useMemo(() => {
    return {
      [selected]: {
        selected: true,
        selectedColor: Colors.primary,
        dotColor: Colors.warning,
        marked: true,
        periods: [{ startingDay: true, endingDay: false, color: Colors.danger }],

        selectedTextColor: Colors.dark,
        dots: [{ color: Colors.primaryDark, key: selected, selectedDotColor: Colors.primaryLight }],
      },
    };
  }, [selected]);

  console.log("marked", marked);
  console.log("selected", selected);

  return (
    <View className="flex-1">
      <CalendarProvider date="">
        <Calendar
          markedDates={marked}
          enableSwipeMonths
          onDayPress={(day) => {
            setSelected(day.dateString);
          }}
          hideExtraDays
          // dayComponent={({ date, state, marking }) => {
          //   console.log(`day (${date?.day})states :${state}`);

          //   return (
          //     <DayComponent
          //       date={date?.day || 0}
          //       state={state || ""}
          //       marking={marking?.customStyles || { weight: "88kg" }}
          //       key={1}
          //       onPress={() => {
          //         console.log("setting selected", date?.day);
          //         setSelected(date.dateString);
          //       }}
          //     />
          //   );
          // }}
          style={{ borderRadius: 4 }}
          theme={darkTheme}
        />
      </CalendarProvider>
    </View>
  );
};

export default WeightCalendar;
