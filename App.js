import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, Button, Image } from 'react-native';

export default function App() {

  const [ingredient, setIngredient] = useState('');
  const [recipes, setRecipes] = useState([]);

  getRecipe = () => {
    const url = 'http://www.recipepuppy.com/api/?i=' + ingredient;
    fetch(url)
    .then((response) => response.json())
    .then((responseJson) => {
      setRecipes(responseJson.results);
    })
    .catch((error) => {
      Alert.alert('Error', error);
    });
  }


  return (



    <View style={styles.container}>

      <FlatList
        style={{marginLeft : "5%"}}
        keyExtractor={item => item.href}
        renderItem={({item}) =>
        <View style={{
            borderBottomColor: 'gray',
            borderBottomWidth: 1
  }}>
        <Text>{item.title}</Text>
        <Image style={{width:100, height: 100 }} source={{uri:item.thumbnail}} />

        </View>

      } data={recipes}
      />

      <TextInput
        style={{fontSize: 18, width: 200}} value={ingredient}
        placeholder="Ingredient" onChangeText={ ingredient => setIngredient(ingredient)}
      />
      <Button onPress={getRecipe} title="Find" />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
