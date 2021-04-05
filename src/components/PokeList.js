/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

import axios from 'axios';

import PokeListCard from 'components/PokeListCard';

class PokeList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      pokeList: [],
      currentUrl: ""
    }
    this.setState = this.setState.bind(this)
  }

  componentDidMount() {
      axios
        .get(`https://pokeapi.co/api/v2/pokemon/`)
        .then(response => {
          response.data.results.forEach(item =>{
            axios.get(item.url)
            .then(response => {
              let newList = this.state.pokeList
              newList.push({
                  id: response.data.id,
                  name: response.data.name,
                  sprite: response.data.sprites.front_default,
                  moves: response.data.moves
                })
              this.setState({
                pokeList: newList
              })
            })
            .catch(error => {
              console.log(error.message); 
              alert(error.message);
            })
          })
        })
        .catch(error => {
          console.log(error.message); 
          alert(error.message);
        })
    }

  render() {
    console.log(this.state)
    return (
          <View>
          {this.state.pokeList.map(poke => (
            <PokeListCard name={poke.name} id={poke.id} sprite={poke.sprite}/>
            ))} 
          </View>
    )
  }
}


const styles = StyleSheet.create({
});

export default PokeList;



