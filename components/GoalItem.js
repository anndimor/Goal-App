import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import { EvilIcons, Feather } from "@expo/vector-icons";

const GoalItem = (props) => {

  

  const [checkButton, setCheckButton] = useState(false);
  const onCheckPress = () => {
    console.log("pressed");
    setCheckButton(!checkButton);
    !checkButton ? props.onCheck() : props.onUncheck();
  };
  return (
    <View style={[styles.listItem, {backgroundColor: props.backgroundColor}]}>
      {checkButton ? (
        <TouchableOpacity
          onPress={onCheckPress}
          activeOpacity={0.6}
          style={styles.checkButton}
        >
          <Feather name="check" size={28} color="whitesmoke" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={onCheckPress}
          activeOpacity={0.6}
          style={styles.checkButton}
        ></TouchableOpacity>
      )}
      <Text style={{ maxWidth: "72%", color: "whitesmoke" }}>{props.title}</Text>
      <TouchableOpacity onPress={!checkButton ? props.onDelete.bind(this, props.id): props.onCheckedDelete.bind(this, props.id)}>
        <EvilIcons name="trash" size={35} color="#de4b4b" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: "  rgb(72,72,74)",
    borderColor: "black",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1
  },
  deleteButton: {
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    padding: 10,
    color: "white",
    width: "18%",
  },
  checkButton: {
    borderWidth: 1,
    width: "10%",
    height: 30,
    borderRadius: 10,
    borderColor: "#9e9e9e",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default GoalItem;
