import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProfile } from '../actions';
import { View, Text } from 'react-native';

class SwipeScreen extends Component {
  componentWillMount() {
    this.props.fetchProfile();
  }

  render () {
    return (
      <View>
        <Text>TESTING SWIPE SCREEN</Text>
        <Text>TESTING</Text>
      </View>
    )
  }
}

const mapStateToProps = state => {
  const prof = _.map(state.prof, (val, uid) => {
    return { ...val, uid };
  }); 

  console.log(prof);
  return { prof };
};

export default connect(mapStateToProps, { fetchProfile })(SwipeScreen);
