import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useState, useRef } from "react";
import { workoutPlans, workoutPlanToName } from "@/constants/Workouts";
import logoBlack from "@assets/avihu/avihu-logo-black.png";
import DropDownPicker from "react-native-dropdown-picker";
import { WorkoutPlans } from "@/enums/WorkoutPlans";
import { WorkoutType } from "@/enums/WorkoutTypes";
import { IWorkout } from "@/interfaces/Workout";
import WorkoutTips from "./WorkoutTips";
import Workout from "./Workout";
import useHideTabBarOnScroll from "@/hooks/useHideTabBarOnScroll";

const WorkoutPlan = () => {
  const keys = Object.keys(workoutPlans);
  const itms = keys.map((item) => ({
    label: workoutPlanToName(item),
    value: item,
  }));

  const [open, setOpen] = useState(false);
  const [plans, setPlans] = useState(itms);
  const [value, setValue] = useState(plans[0].value);
  const [openTips, setOpenTips] = useState(false);
  const scrollViewRef = useRef(null);

  const [currentWorkoutPlan, setCurrentWorkoutPlan] = useState<Record<WorkoutType, IWorkout[]>>(
    workoutPlans[Number(keys[0]) as WorkoutPlans]
  );

  const { handleScroll } = useHideTabBarOnScroll();

  return (
    <ScrollView ref={scrollViewRef} onScroll={handleScroll} scrollEventThrottle={16}>
      <ImageBackground source={logoBlack} style={styles.headerImage} />
      <View style={styles.container}>
        <DropDownPicker
          rtl
          open={open}
          value={value}
          items={plans}
          theme="DARK"
          setOpen={setOpen}
          setValue={setValue}
          setItems={setPlans}
          onChangeValue={(val) => {
            if (!val) return;
            const key = Number(val) as WorkoutPlans;
            setCurrentWorkoutPlan(workoutPlans[key]);
          }}
        />
        <TouchableOpacity onPress={() => setOpenTips(true)}>
          <Text style={styles.tipsText}>דגשים</Text>
        </TouchableOpacity>
      </View>

      <View>
        {Object.keys(currentWorkoutPlan).map((item, i) => {
          const workoutType = Number(item) as WorkoutType;
          const workouts = currentWorkoutPlan[workoutType];

          return (
            <View key={i} style={styles.workoutContainer}>
              {workouts.map((workout, index) => {
                return <Workout workout={workout} key={index} />;
              })}
            </View>
          );
        })}
      </View>
      <WorkoutTips openTips={openTips} setOpenTips={setOpenTips} />
    </ScrollView>
  );
};

export default WorkoutPlan;

const styles = StyleSheet.create({
  headerImage: {
    width: "100%",
    height: 150,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "100%",
    padding: 12,
    gap: 20,
  },
  tipsText: {
    color: "emerald",
    fontSize: 18,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  workoutContainer: {
    padding: 4,
    gap: 12,
  },
});
