import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { checkIfWinner } from "./src/util";
import DisplayIcon from "./src/components/DisplayIcon";

const Game = () => {
  const emptyGrid = ["-", "-", "-", "-", "-", "-", "-", "-", "-"];
  const [playTurn, setplayTurn] = React.useState(1);
  const [grid, setGrid] = React.useState(emptyGrid);
  const [turnPlayed, setTurnplayed] = React.useState([]);
  const [winner, setWinner] = React.useState(false);

  React.useEffect(() => {
    const gridSum = grid.reduce((a, b) => a + b);
    if (gridSum == 13 || gridSum == 14) {
      alert("pas de vainqueur");
      resetGame();
    } else if (winner) {
      alert("le joueur " + playTurn + " a gagné!");
      resetGame();
    } else {
      setWinner(checkIfWinner(grid));
    }
  }, [playTurn, winner]);

  const resetGame = () => {
    setGrid(emptyGrid);
    setWinner(false);
    setTurnplayed([]);
  };

  const handleTurn = (box) => {
    if (!turnPlayed.includes(box)) {
      let gridCopy = grid;
      let turnPlayedCopy = turnPlayed;

      turnPlayed.push(box);
      gridCopy.splice(box - 1, 1, playTurn);

      setGrid(gridCopy);
      setTurnplayed(turnPlayedCopy);
      setplayTurn(playTurn === 1 ? 2 : 1);
    }
  };

  const initRow = (case1, case2, case3) => {
    return (
      <View style={styles.row}>
        {[case1, case2, case3].map((box) => {
          return (
            <TouchableOpacity
              key={box}
              style={styles.box}
              onPress={(e) => handleTurn(box + 1)}
            >
              <DisplayIcon box={grid[box]} />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <ScrollView style={{ marginTop: 150 }}>
      <View style={styles.container}>
        {initRow(0, 1, 2)}
        {initRow(3, 4, 5)}
        {initRow(6, 7, 8)}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  grid: {
    padding: 0,
  },
  box: {
    width: 140,
    height: 140,
    flexGrow: 1,
    flex: 1,
    justifyContent: "center",
    borderWidth: 1,
  },
  container: {
    paddingTop: 50,
    padding: 20,
  },
  row: {
    flex: 1,
    flexDirection: "row",
  },
  circle: {
    alignSelf: "center",
    justifyContent: "center",
    height: 100,
    width: 100,
  },
  cross: {
    alignSelf: "center",
    justifyContent: "center",
    height: 100,
    width: 100,
  },
});

export default Game;
