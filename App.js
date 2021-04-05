/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
} from 'react-native';
import axios from 'axios';

import PokeList from 'components/PokeList';

const App = () => (

    <SafeAreaView >
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        >
        <PokeList/>
      </ScrollView>
    </SafeAreaView>
)

export default App;

