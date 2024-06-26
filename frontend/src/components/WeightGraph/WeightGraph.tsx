import { View, StyleSheet, useWindowDimensions } from "react-native";
import { useEffect, useState } from "react";
import { LineChart } from "react-native-chart-kit";
import { myWeighIns } from "@/constants/MyWeight";
import { IWeighIn } from "@/interfaces/User";
import { ItemsInDateRangeParams, DateRanges } from "@/types/dateTypes";
import DateUtils from "@/utils/dateUtils";
import { Colors } from "@/constants/Colors";
import WeightCard from "./WeightCard";
import WeeklyScoreCard from "./WeeklyScoreCard";
import AddWeight from "./AddWeight";
import ChangeRangeBtns from "./ChangeRangeBtns";
import { useWeighInApi } from "@/hooks/useWeighInApi";
import { useUserStore } from "@/store/userStore";

const rangeParams: ItemsInDateRangeParams<IWeighIn> = {
  items: myWeighIns,
  dateKey: "date",
  n: 1,
  range: "weeks",
};

export const WeightGraph = () => {
  const { width } = useWindowDimensions();
  const { getWeighInsByUserId, addWeighIn } = useWeighInApi();

  const currentUser = useUserStore((state) => state.currentUser);

  const [selectedWeight, setSelectedWeight] = useState<number | null>(null);
  const [currentRange, setCurrentRange] = useState<DateRanges>("weeks");
  const [weighIns, setWeighIns] = useState<IWeighIn[]>(DateUtils.getItemsInRange(rangeParams));
  const [weights, setWeights] = useState(extractWeights(weighIns));

  const hidePointsAtIndex = () => {
    if (weights.length < 100) return;

    const indices = weights
      .map((w, index) => {
        if (index % 2 !== 0) {
          return index;
        }
      })
      .filter((item) => item);

    return indices as number[];
  };

  const handleRangeChange = (range: DateRanges) => {
    const newWeighIns = DateUtils.getItemsInRange({
      ...rangeParams,
      items: weighIns,
      range: range,
    });
    const weights = extractWeights(weighIns);

    setWeights(weights);
    setWeighIns(newWeighIns);
    setCurrentRange(range);
  };

  const handleSaveNewWeighIn = async (newWeighIn: IWeighIn) => {
    await addWeighIn("665f0b0b00b1a04e8f1c4478", newWeighIn)
      .then((res) => {
        const updatedWeighIns = res.weighIns;
        const weights = extractWeights(updatedWeighIns);

        setWeighIns(updatedWeighIns);
        setWeights(weights);
      })
      .catch((err) => console.log("err", err));
  };

  const getUserWeightIns = async () => {
    if (!currentUser) return;

    // await getWeighInsByUserId(currentUser.id)
    //   .then((weighIns) => setWeighIns(weighIns))
    //   .catch((err) => console.log(err));
  };

  function extractWeights(items: IWeighIn[]) {
    return items.map((item) => item.weight);
  }

  useEffect(() => {
    getUserWeightIns();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.weightContainer}>
        <LineChart
          data={{
            labels: DateUtils.extractLabels({
              ...rangeParams,
              items: weighIns,
              range: currentRange,
            }),

            datasets: [
              {
                data: weights,
                strokeWidth: 2,
              },
            ],
            legend: ["מעקב שקילה"],
          }}
          hidePointsAtIndex={hidePointsAtIndex()}
          width={width}
          height={220}
          onDataPointClick={({ value }) => {
            setSelectedWeight(value);
          }}
          chartConfig={{
            backgroundColor: Colors.bgSecondary,
            backgroundGradientFrom: Colors.bgSecondary,
            backgroundGradientTo: Colors.bgSecondary,

            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(16, 185, 129, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(256, 256, 256, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForLabels: {
              fontSize: 12,
              fontWeight: "bold",
              fontFamily: "sans-serif-light",
            },

            propsForDots: {
              r: weights.length > 35 ? "2" : "4",
              strokeWidth: weights.length > 35 ? "0.5" : "1",
              stroke: "#fff",
            },
          }}
          withInnerLines={false}
          withOuterLines={false}
          style={{
            borderRadius: 12,
            padding: 4,
          }}
        />
        <ChangeRangeBtns onRangeChange={handleRangeChange} />
        <View
          style={{ height: 120 }}
          className="flex-row items-center justify-between w-screen gap-4"
        >
          <WeightCard currentWeight={selectedWeight || weights[weights.length - 1]} />
          <WeeklyScoreCard weights={weights} range={currentRange} />
        </View>
      </View>
      <AddWeight onSave={handleSaveNewWeighIn} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    gap: 20,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  weightContainer: {
    flex: 1,
    gap: 12,
  },
});
