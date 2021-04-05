import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph, TouchableRipple } from 'react-native-paper';

const PokeListCard = ({onPress, id, name, types, sprite, moves}) => {
	const LeftContent = () => <Avatar.Text size={42} label={id} />
	const RightContent = () => <Avatar.Image style={styles.sprite} size={140} backgroundColor='#a8abff' source={{uri: sprite}} />

	return(
	<TouchableRipple onPress={onPress}>
		<Card style={styles.card}>
			<Card.Title style={styles.title} title={name} subtitle={types} left={LeftContent} right={RightContent} />
		</Card>
	</TouchableRipple>
	)
}


const styles = StyleSheet.create({
	card: {
		margin: 5,
		paddingLeft: 0,
		position: 'relative',
		overflow: 'hidden',
	},
	sprite: {
		position: 'absolute',
		right: 0,
		top: -70,
		borderRadius: 200,
	}
});

export default PokeListCard;



