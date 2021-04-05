import React from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import {
  	SafeAreaView,
} from 'react-native';
import { Appbar } from 'react-native-paper';

import axios from 'axios';

import PokeList from 'components/PokeList';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#DE3737',
    accent: '#e5c872',
  },
};

const App = () => (
    <PaperProvider theme={theme}>
	    <SafeAreaView >
	        <Appbar.Header>
	    		<Appbar.Content title="Pokedex Franq" subtitle={'Teste para Dev Frontend'} />
	    	</Appbar.Header>  
        <PokeList/>
    	</SafeAreaView>    
    </PaperProvider>
)

export default App;

