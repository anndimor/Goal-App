import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Keyboard } from "react-native";

const GoalInput = (props) => {
  const [enteredGoal, setEnteredGoal] = useState("");


  const goalInputHandler = (enteredText) => {
    setEnteredGoal(enteredText);
  };

  const addGoalHandler = () => {
    props.onAddGoal(enteredGoal);
    Keyboard.dismiss();
    setEnteredGoal("");
  };


  return (
    <View style={styles.inputContainer}>
      <TextInput
        placeholder={props.placeholder}
        placeholderTextColor={"darkgrey"}
        style={styles.input}
        onChangeText={goalInputHandler}
        value={enteredGoal}
      />
      <Button title="ADD" onPress={addGoalHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    width: "80%",
    color: "white",
    borderColor: "grey",
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
  },
});

export default GoalInput;
