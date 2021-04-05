import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, StyleSheet, ScrollView } from 'react-native';
import { Avatar, Button, Card, Headline, Title, Surface, DataTable, Divider } from 'react-native-paper';

const DetailedInfoModal = ({id, name, types, moves, image, xp, height, weight}) => {
	return(
	<Surface style={styles.container}>
	<ScrollView>
	<Image style={styles.image} source={{uri: image}} />
		<Title style={styles.title}>{name}</Title>
		<Divider />
		<Text style={styles.label}>Pokedex entry: <Text style={styles.data}>{id}</Text></Text>
		<Divider />
		<Text style={styles.label}>Types: <Text style={styles.data}>{types}</Text></Text>
		<Divider />
		<Text style={styles.label}>Height: <Text style={styles.data}>{height/10}m</Text></Text>
		<Divider />
		<Text style={styles.label}>Weight: <Text style={styles.data}>{weight/10}kg</Text></Text>
		<Divider />
		<Text style={styles.label}>Base experience: <Text style={styles.data}>{xp}</Text></Text>
		<Divider />
		<Text style={styles.label}>Move List: <Text style={styles.data}>{moves}.</Text></Text>
	</ScrollView>
	</Surface>
	)
}


const styles = StyleSheet.create({
	container: {
		display: 'flex',
		margin: 20,
		padding: 20,
		borderRadius: 8,
	},
	title: {
		fontSize: 32,
		overflow: 'visible',
		textAlign: 'center',
		marginBottom: 10,
	},
	label: {
		fontWeight: "bold",
		fontSize: 18,
		marginVertical: 5,
	},
	data: {
		fontWeight: "300",
		fontSize: 16,
	},
	image: {
		height: 300,
		marginBottom: 30,
		backgroundColor: '#a8abff',
		borderRadius: 50,
	}
});

export default DetailedInfoModal;