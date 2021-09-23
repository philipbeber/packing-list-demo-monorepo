import * as React from 'react';
import { StyleSheet } from 'react-native';

import { AppState } from 'packing-list-shared'
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { shared } from 'packing-list-shared';
import { useSelector } from 'react-redux';

export default function TabOneScreen() {

  const selectedCampId = useSelector<AppState>(
    (state) => state.camp.selectedCampId
  );
  
    return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One {shared()} {selectedCampId} asd</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/TabOneScreen.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
