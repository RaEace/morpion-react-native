import React from 'react';
import reactDom from 'react-dom';
import { View, Text, ScrollView, StyleSheet, Button, TouchableOpacity } from 'react-native';

const App = () => {
  const [player, setPlayer] = React.useState(1);
  const [grid, setGrid] = React.useState(["1","2","3","4","5","6","7","8","9"]);
  const [turnPlayed, setTurnplayed] = React.useState([]);
  const WinPatterns = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,9],[2,4,6]];
  const [winner, setWinner] = React.useState(false); 

  const displayTitle = (box) => grid[box] === 1 ? "X" : grid[box] === 2 ? "0" : "-";

  React.useEffect(() => {
    setWinner(WinPatterns.map(winCondition => {
      return grid[winCondition[0]] === grid[winCondition[1]] === grid[winCondition[2]]
    }).includes(true));
  },[grid])

  const handleTurn = (box) => {
    if(!turnPlayed.includes(box)) {
      let gridCopy = grid;
      let turnPlayedCopy = turnPlayed; 
      gridcopy = grid.splice(box-1, 1, player); 
      turnPlayed.push(box);
      setGrid(gridCopy);
      setTurnplayed(turnPlayedCopy);
      setPlayer(player === 1 ? 2 : 1);
    } 
  }

  return (
    <ScrollView style={{marginTop: 70}}>
      <Text style={styles.title}>Premier essai du morpion!</Text>
      <View style={styles.container}>
        <View style={styles.row}>
          <TouchableOpacity style={styles.box} onPress={e => handleTurn(1)}>
            <Text>{displayTitle(0)}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.box} onPress={e => handleTurn(2)}>
            <Text>{displayTitle(1)}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.box} onPress={e => handleTurn(3)}>
            <Text>{displayTitle(2)}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.box} onPress={e => handleTurn(4)}>
            <Text>{displayTitle(3)}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.box} onPress={e => handleTurn(5)}>
            <Text>{displayTitle(4)}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.box} onPress={e => handleTurn(6)}>
            <Text>{displayTitle(5)}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.box} onPress={e => handleTurn(7)}>
            <Text>{displayTitle(6)}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.box} onPress={e => handleTurn(8)}>
            <Text>{displayTitle(7)}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.box} onPress={e => handleTurn(9)}>
            <Text>{displayTitle(8)}</Text>
          </TouchableOpacity>
        </View>
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