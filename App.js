import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
  FlatList,
  SafeAreaView,
  Dimensions,
} from "react-native";

import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";



export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);

  const [checkedGoals, setCheckedGoals] = useState(0)

  const [goalInputPlaceholder, setGoalInputPlaceholder] = useState(
    "Write your first goal here"
  );
  const addGoalHandler = (goalTitle) => {
    setGoalInputPlaceholder("Write another goal")
    setCourseGoals((currentGoals) => [
      ...currentGoals,
      { id: Math.random().toString(), value: goalTitle },
    ]);
    setListItemColor(colors[Math.floor(Math.random() * 13)])
  };

  const removeGoalHandler = (goalId) => {
    setCourseGoals((currentGoals) => {
      return currentGoals.filter((goal) => goal.id != goalId);
    });
    courseGoals.length == 1 ? setGoalInputPlaceholder("Write another first goal"): null
  };
  const checkedRemoveGoalHandler = (goalId) => {
    setCourseGoals((currentGoals) => {
      return currentGoals.filter((goal) => goal.id != goalId);
    });
    courseGoals.length == 1 ? setGoalInputPlaceholder("Write another first goal"): null
    setCheckedGoals(checkedGoals-1);
  };

  const checkGoalHandler = () => {
    setCheckedGoals(checkedGoals+1);
  }
  const uncheckGoalHandler = () => {
    setCheckedGoals(checkedGoals-1);
  }

  const chartConfig = {
    color: (opacity = 0.1) => `rgba(255, 255, 255, ${opacity})`,
  }

  const chartData = [
    {
      name: "done",
      population: checkedGoals,
      color: "rgba(131, 167, 234, 1)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "undone",
      population: courseGoals.length - checkedGoals,
      color: "#F00",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
  ];

  const colors = ["rgb(10,132,255)","rgb(172,142,104)","rgb(100,210,255)","rgb(48,209,88)","rgb(94,92,230)","rgb(102,212,207)","rgb(255,159,10)","rgb(255,55,95)","rgb(191,90,242)","rgb(255,69,58)","rgb(64,200,224)","rgb(255,214,10)",]

  const [listItemColor, setListItemColor] = useState("grey")

  return (
    <SafeAreaView style={{backgroundColor: "rgb(28,28,30)"}}>
      <View style={styles.screen}>
        <View style={styles.chartView}>
        <PieChart
        data={chartData}
        width={500}
        height={100}
        chartConfig={chartConfig}
        accessor={"population"}
        backgroundColor={"transparent"}
        paddingLeft={"20"}
        center={[10, -10]}
        absolute
        />
        </View>
        <GoalInput onAddGoal={addGoalHandler} placeholder={goalInputPlaceholder} />
        <View style={{ height: "100%" }}>
          <FlatList
            keyExtractor={(item, index) => item.id}
            data={courseGoals}
            ListFooterComponent={<View style={{height: 400}}/>}
            renderItem={(itemData) => (
              <GoalItem
              backgroundColor={"rgb(72,72,74)"}
              id={itemData.item.id}
              title={itemData.item.value}
              onDelete={removeGoalHandler}
              onCheckedDelete={checkedRemoveGoalHandler}
              onCheck={checkGoalHandler}
              onUncheck={uncheckGoalHandler}
              />
              )}
              />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 30,
  },
  chart: {
    height: 70,
    width: 70,
    top: -20,
    borderRadius: 50,
    borderWidth: 2,
    marginBottom: 0
  },
  chartView: {
    alignItems: "center",
  }
});
