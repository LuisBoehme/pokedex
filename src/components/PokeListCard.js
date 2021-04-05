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

const PokeListCard = ({sprite, name, id, type}) => (
	<View>
	<Text>{sprite}</Text>
	<Text>{name}</Text>
	<Text>{id}</Text>
	<Text>{type}</Text>
	</View>
  )


const styles = StyleSheet.create({
});

export default PokeListCard;



