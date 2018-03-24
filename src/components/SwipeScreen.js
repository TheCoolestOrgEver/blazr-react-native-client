import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';

class SwipeScreen extends Component {
  render () {
    return (
      <View>
        <Text>TESTING SWIPE SCREEN</Text>
        <Text>TESTING</Text>
      </View>
    )
  }
}

export default connect()(SwipeScreen);
