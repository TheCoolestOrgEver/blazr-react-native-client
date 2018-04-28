import React, { Component } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Body, Text } from 'native-base'
import { Actions } from 'react-native-router-flux'

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

class MatchListItem extends Component {

  render() {
    return(
      <TouchableOpacity  onPress={() => { 
        console.log('matchlist profile ', this.props.profile)
        console.log('matchlist currentUser ', this.props.currentUser)
          Actions.thread({friend: this.props.profile, user: this.props.currentUser}) 
          //Actions.main();
        }} style={styles.container}>
        <Image source={{ uri: this.props.profile.imageURL}} style={styles.photo} />
        <Text style={styles.text}>
          {`${this.props.profile.name}`}{"\n"}
          <Text note>
          Tap to start a conversation
          </Text>
        </Text>
      </TouchableOpacity>
    )
  };
}
export default MatchListItem;