import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProfile } from '../actions';
import { View, Text, FlatList } from 'react-native';
import SwipeScreenItem from './SwipeScreenItem';

class SwipeScreen extends Component {
  componentWillMount() {
    this.props.fetchProfile();
  }

  renderRow(profile) {
    return <SwipeScreenItem profile={profile} />;
  }

  render () {
    return (
      <FlatList
        data={this.props.profiles}
        renderItem={this.renderRow}
        keyExtractor={profile => profile.uid}
      />
    );
  }
}

const mapStateToProps = state => {
  const profiles = _.map(state.prof, (val, uid) => {
    return { ...val, uid };
  }); 

  return { profiles };
};

export default connect(mapStateToProps, { fetchProfile })(SwipeScreen);
