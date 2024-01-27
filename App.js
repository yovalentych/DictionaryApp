// App.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const DictionaryScreen = ({ navigation }) => {
  const [foreignWord, setForeignWord] = useState('');
  const [translation, setTranslation] = useState('');
  const [dictionary, setDictionary] = useState([]);

  const addWord = () => {
    if (foreignWord.trim() !== '' && translation.trim() !== '') {
      const newWord = {
        foreignWord: foreignWord.trim(),
        translation: translation.trim(),
      };

      setDictionary(
        [...dictionary, newWord].sort((a, b) =>
          a.foreignWord.localeCompare(b.foreignWord)
        )
      );
      setDictionary((prevDictionary) =>
        prevDictionary.sort((a, b) =>
          a.translation.localeCompare(b.translation)
        )
      );

      setForeignWord('');
      setTranslation('');
    }
  };

  const removeWord = (item) => {
    const updatedDictionary = dictionary.filter((w) => w !== item);
    setDictionary(updatedDictionary);
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>
        {item.foreignWord} - {item.translation}
      </Text>
      <TouchableOpacity onPress={() => removeWord(item)}>
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Wpisz słowo po poslku"
        value={foreignWord}
        onChangeText={(text) => setForeignWord(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Напиши переклад"
        value={translation}
        onChangeText={(text) => setTranslation(text)}
      />
      <Button title="Dodać słowo" onPress={addWord} />
      <FlatList
        data={dictionary}
        renderItem={renderItem}
        keyExtractor={(item) => item.foreignWord}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 5,
  },
  itemText: {
    fontSize: 16,
  },
  deleteText: {
    color: 'red',
  },
  list: {
    marginTop: 20,
  },
});

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Dictionary" component={DictionaryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
