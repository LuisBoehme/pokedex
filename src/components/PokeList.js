import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { ActivityIndicator, Modal, Portal, Provider } from 'react-native-paper';

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


  fetchNextPage() {
      this.setState({loading: true})
      const currentlyLoaded = this.state.currentlyLoaded
       axios
        .get(`https://pokeapi.co/api/v2/pokemon/?limit=${currentlyLoaded}&offset=${currentlyLoaded}`)
        .then(response => {
          //As each Group Endpoint returns a paginated list containing only 20 items with only name and url we must fetch individually for more data
          response.data.results.forEach(item =>{
            axios.get(item.url)
            .then(response => {
              let newList = this.state.pokeList
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
              newList.sort((a, b) => a.id - b.id)
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
        this.setState({
          loading: false,
          currentlyLoaded: currentlyLoaded + 20,
        })
    }

  render() {
    return(
      <View style={styles.container}>
      <Portal>
        <Modal visible={this.state.loading} onDismiss={this.hideModal}>
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
      onEndReached={this.fetchNextPage}
      onEndReachedThreshold={1}
      refreshing={this.state.loading}
      />
        </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    paddingBottom: 120,
  },
});

export default PokeList;



