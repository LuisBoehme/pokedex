import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { ActivityIndicator, Modal, Portal, Provider, Button } from 'react-native-paper';

import axios from 'axios';

import PokeListCard from 'components/PokeListCard';
import DetailedInfoModal from 'components/DetailedInfoModal';

class PokeList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      pokeList: [],
      currentlyLoaded: 0,
      modalActive: false,
      currentPokemon: {}
    }
    this.selectPokemon = this.selectPokemon.bind(this)
    this.hideModal = this.hideModal.bind(this)
    this.fetchNextPage = this.fetchNextPage.bind(this)
  }

  componentDidMount() {       
    this.fetchNextPage()
  }

  selectPokemon(selectedPokemon) {
    this.setState({
              modalActive: true,
              currentPokemon: selectedPokemon
            })
  }

  hideModal() {
    this.setState({
              modalActive: false
            })
  }


  async fetchNextPage() {
      this.setState({loading: true})
      const currentlyLoaded = this.state.currentlyLoaded
      let newList = this.state.pokeList
      await axios
        .get(`https://pokeapi.co/api/v2/pokemon/?limit=${currentlyLoaded}&offset=${currentlyLoaded}`)
        .then(async (response) => {
          //As each Group Endpoint returns a paginated list containing only 20 items with only name and url we must fetch individually for more data
          for (let i = 0; i < response.data.results.length; i++) {
           await axios.get(response.data.results[i].url)
            .then(response => {
              newList.push({
                  id: response.data.id,
                  name: response.data.name,
                  sprite: response.data.sprites.front_default,
                  image: response.data.sprites.other['official-artwork'].front_default,
                  moves: response.data.moves.map(slot => slot.move.name).join(", "),
                  types: response.data.types.map(slot => slot.type.name).join("/"),
                  xp: response.data.base_experience,
                  height: response.data.height,
                  weight: response.data.weight,
                })
              //sort the list by pokemon id as it fetches

            })
            .catch(error => {
              console.log(error.message); 
            })
          }
        })  
        .catch(error => {
          console.log(error.message); 
        })
        console.log(newList); 
        newList.sort((a, b) => a.id - b.id)
        this.setState({
          loading: false,
          pokeList: newList,
          currentlyLoaded: currentlyLoaded + 20,
        })
    }

  render() {
    return(
      <View style={styles.container}>
      <Portal>
        <Modal visible={this.state.modalActive} onDismiss={this.hideModal}>
          <DetailedInfoModal 
            name={this.state.currentPokemon.name} 
            image={this.state.currentPokemon.image} 
            id={this.state.currentPokemon.id} 
            types={this.state.currentPokemon.types} 
            moves={this.state.currentPokemon.moves} 
            xp={this.state.currentPokemon.xp} 
            height={this.state.currentPokemon.height} 
            weight={this.state.currentPokemon.weight} 
          />
        </Modal>
      </Portal>
      <FlatList
      data={this.state.pokeList}
      renderItem={({item, index, separator}) => (<PokeListCard onPress={() => this.selectPokemon(item)} name={item.name} id={item.id} sprite={item.sprite} moves={item.moves} types={item.types}/>)}
      ListFooterComponent={this.state.loading ? <ActivityIndicator style={styles.margin} animating={this.state.loading}/> : <Button style={styles.margin} visible={this.state.loading} mode="outlined" onPress={this.fetchNextPage}>Load More</Button>}
      refreshing={this.state.loading}
      />
        </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    paddingBottom: 40,
    marginBottom: 80,
  },
  margin: {
    margin: 20,
  },
});

export default PokeList;



