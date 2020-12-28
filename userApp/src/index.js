import React,{useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {PRIMARY_COLOR,RED} from './styles';

//break your components into as small segments as you can
const App = () => {
    const [movies,setMovies] = useState([]);
    const getMoviesFromApiAsync = async () => {
        try {
          let response = await fetch(
            'https://reactnative.dev/movies.json'
          );
          let json = await response.json();
          return json.movies;
        } catch (error) {
          console.error(error);
        }
      };
    getMoviesFromApiAsync().then((data)=>{
        setMovies(data);
    });
    return (
        <>
        <View style={{backgroundColor:PRIMARY_COLOR,flex:1,alignItems:'center',justifyContent:'space-around'}}>
         {movies.map((item,index)=>{
             return <Text key={index}>{item.title}</Text>
         })}
     </View>
        </>
        )
}

export default App

const styles = StyleSheet.create({})
