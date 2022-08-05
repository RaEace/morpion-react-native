import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { checkIfWinner } from './src/util';


const App = () => {
  const emptyGrid = ["-","-","-","-","-","-","-","-","-"];
  const [player, setPlayer] = React.useState(1);
  const [grid, setGrid] = React.useState(emptyGrid);
  const [turnPlayed, setTurnplayed] = React.useState([]);
  const [winner, setWinner] = React.useState(false); 
  
  const displayTitle = (box) => grid[box] === 1 ? "X" : grid[box] === 2 ? "0" : "-";

  const resetGame = () => {
    setGrid(emptyGrid);
    setWinner(false);
    setTurnplayed([]);
  }

  React.useEffect(() => {
    const gridSum = grid.reduce((a,b) => a+b);
    if(gridSum == 13 || gridSum == 14) {
      alert("pas de vainqueur");
      resetGame();
    }
    else if(winner) {
      alert("le joueur " + player + " a gagné!");
      resetGame();
    }
    else {
      setWinner(checkIfWinner(grid));
    }
  },[player, winner])


  const handleTurn = (box) => {
    if(!turnPlayed.includes(box)) {
      let gridCopy = grid;
      let turnPlayedCopy = turnPlayed; 

      turnPlayed.push(box);
      gridCopy.splice(box-1, 1, player)

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
        )
      })}
    </View>
    );
  } 

  return (
    <ScrollView style={{marginTop: 70}}>
      <Text style={styles.title}>Premier essai du morpion!</Text>
      <View style={styles.container}>
        {initRow(0,1,2)}
        {initRow(3,4,5)}
        {initRow(6,7,8)}
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