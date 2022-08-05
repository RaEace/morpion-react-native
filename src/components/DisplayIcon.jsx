import React from "react";
import {View, Image} from "react-native";

const DisplayIcon = (box) => {
    return grid[box] === 1 ? (
      <View>
        <Image style={styles.cross} source={require("../../assets/cross2.png")} />
      </View>
    ) : grid[box] === 2 ? (
      <View>
        <Image style={styles.circle} source={require("../../assets/circle2.png")} />
      </View>
    ) : null;
  };

export default DisplayIcon;