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
  Image,
  FlatList,
  StyleSheet
} from 'react-native';

const PokeListCard = ({id, name, type, sprite, moves}) => (
	<View>
		<Image style={styles.sprite} source={{uri: sprite}}></Image>
		<Text>{name}</Text>
		<Text>{id}</Text>
		<Text>{type}</Text>
	</View>
  )


const styles = StyleSheet.create({
	sprite: {
		width: 50,
		height: 50,
	}
});

export default PokeListCard;



