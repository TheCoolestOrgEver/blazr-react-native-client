import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Body, Text } from 'native-base'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  text: {
    marginLeft: 12,
    fontSize: 16,
  },
  photo: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
});

const MatchListItem = (props) => (
  <View style={styles.container}>
    <Image source={{ uri: props.imageURL}} style={styles.photo} />
    <Text style={styles.text}>
      {`${props.name}`}{"\n"}
      <Text note>
      Tap to start a conversation
      </Text>
    </Text>
  </View>
);
export default MatchListItem;