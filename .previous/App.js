import React from 'react';
import { View, TextInput, Text, ScrollView, StyleSheet } from 'react-native';

const App = () => {
  const [text, setText] = React.useState("");
  const [textToDiplay, setTextToDisplay] = React.useState("");

  const forbidden = ["om", "l'om", "lopez", "payet", "milik", "a jamais les premiers"];

  const checkCensored = (userText) => {
    setText(userText);
    const censored = text.split(/[ -,]/).map(e => forbidden.includes(e.toLowerCase()) ? 'X' : e).join(' ');
    setTextToDisplay(censored);
  }

  return (
    <ScrollView style={{marginTop: 70}}>
      <Text style={styles.title}>Petit exercice de traduction</Text>
      <View style={styles.myInput}>
        <TextInput
          style={{height: 40}}
          placeholder="Type here to translate!"
          onChangeText={newText => checkCensored(newText)}
          defaultValue={text}
        />
      </View>
      <Text style={styles.result}>{textToDiplay}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    padding: 10, 
    textAlign: 'center', 
    fontSize: 20
  },
  myInput: {
    padding: 10, 
    marginTop: 50, 
    marginRight: 10, 
    marginLeft: 10, 
    borderWidth: 1,
  },
  result: {
    padding: 10,
    marginTop: 50,
    marginRight: 10,
    marginLeft: 10,
    borderWidth: 1
  },
});

export default App;