import React from 'react';
import reactDom from 'react-dom';
import { View, Text, ScrollView, StyleSheet, Button, TouchableOpacity } from 'react-native';

const App = () => {
  const [player, setPlayer] = React.useState(1);
  const [grid, setGrid] = React.useState(["1","2","3","4","5","6","7","8","9"]);
  const [turnPlayed, setTurnplayed] = React.useState([]);
  const [winner, setWinner] = React.useState(false); 

  const WinPatterns = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,9],[2,4,6]];
  const checkIfWinner = WinPatterns.map(box =>  grid[box[0]] === grid[box[1]] === grid[box[2]]).includes(true)

  const displayTitle = (box) => grid[box] === 1 ? "X" : grid[box] === 2 ? "0" : "-";

  const handleTurn = (box) => {
    if(!turnPlayed.includes(box)) {
      console.warn("turn")
      let gridCopy = grid;
      let turnPlayedCopy = turnPlayed; 
      let isWinner = checkIfWinner; 

      gridcopy = grid.splice(box-1, 1, player); 
      turnPlayed.push(box);

      setWinner(isWinner);
      setGrid(gridCopy);
      setTurnplayed(turnPlayedCopy);
      setPlayer(player === 1 ? 2 : 1);
    } 
  }

  const initRow = (case1,case2,case3) => {
    return (
      <View style={styles.row}>
        {[case1,case2,case3].map(box => {
          return (
            <TouchableOpacity key={box} style={styles.box} onPress={e => handleTurn(box+1)}>
              <Text>{displayTitle(box)}</Text>
            </TouchableOpacity>
          )})}
    </View>);
  } 

  return (
    <ScrollView style={{marginTop: 70}}>
      <Text style={styles.title}>Premier essai du morpion!</Text>
      <View style={styles.container}>
        {initRow(0,1,2)}
        {initRow(3,4,5)}
        {initRow(6,7,8)}
        <Text style={styles.title}>Fini? ={'>'} {!winner ? "false" : "true"}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    title: {
        padding: 10, 
        textAlign: 'center', 
        fontSize: 20
    },
    grid: {
        padding: 10
    },
    box: {
      width: 140,
      height: 140,
      flexGrow:1,
      flex: 1, 
      border: 1,
      justifyContent: 'center',
      borderWidth: 1,
    },
    container: {
      paddingTop: 50,
      padding: 20,
    },
    row: {
      flex: 1,
      flexDirection: "row"
    }
});

export default App;