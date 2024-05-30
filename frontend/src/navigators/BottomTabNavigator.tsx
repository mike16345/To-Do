import MyWorkoutPlanPage from "../screens/MyWorkoutPlanPage";
import VideoGallery from "../screens/VideoGallery";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import MyProgressScreen from "../screens/MyProgressScreen";
import NativeIcon from "../components/Icon/NativeIcon";
import { RootStackParamList } from "../types/navigatorTypes";
import MyDietPlanScreen from "../screens/MyDietPlanScreen";
import WorkoutVideoPopup from "@/components/WorkoutPlan/WorkoutVideoPopup";

const Tab = createMaterialBottomTabNavigator<RootStackParamList>();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      barStyle={{ backgroundColor: "#1F2937" }}
      initialRouteName="MyProgressScreen"
      inactiveColor="white"
      activeColor="#10B981"
    >
      <Tab.Screen
        name="MyWorkoutPlanPage"
        component={MyWorkoutPlanPage}
        options={{
          tabBarLabel: "Workout",
          tabBarAccessibilityLabel: "Workout Tab",

          tabBarIcon: ({ color }: { color: string }) => (
            <NativeIcon
              library="MaterialCommunityIcons"
              color={color}
              name="weight-lifter"
              size={28}
            />
          ),
        }}
      />

      <Tab.Screen
        name="MyDietPlanPage"
        component={MyDietPlanScreen}
        options={{
          tabBarLabel: "Diet",
          tabBarIcon: ({ color }: { color: string }) => (
            <NativeIcon library="FontAwesome6" color={color} name="bowl-food" size={28} />
          ),
        }}
      />
      <Tab.Screen
        name="MyProgressScreen"
        component={MyProgressScreen}
        options={{
          tabBarLabel: "Weight ",

          tabBarIcon: ({ color }: { color: string }) => (
            <NativeIcon library="MaterialIcons" name="monitor-weight" color={color} size={28} />
          ),
        }}
      />
      <Tab.Screen
        name="VideoGallery"
        component={WorkoutVideoPopup}
        options={{
          tabBarLabel: "Weight ",

          tabBarIcon: ({ color }: { color: string }) => (
            <NativeIcon library="MaterialIcons" name="camera" color={color} size={28} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;