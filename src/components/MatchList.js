import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMatches, getUser } from '../actions';
import { Text, ListView, Image, SafeAreaView, TouchableOpacity, TouchableHighlight } from 'react-native';
import SwipeScreenItem from './SwipeScreenItem';
import { CardSection, Button } from './common';
import { Container, View, Header, DeckSwiper, Card, CardItem, Thumbnail, Left, Body } from 'native-base';
import { getProfile, updateLocation } from './Helper.js'
import { Icon } from 'react-native-elements'
import { Actions } from 'react-native-router-flux'
import MatchListItem from './MatchListItem';
import MatchesHeader from './MatchesHeader'

let currentUser = {};
class MatchList extends Component {

  componentWillMount() {
    Actions.refresh({ left: this._renderLeftButton });
    //this.props.fetchMatches();
  }

  _renderLeftButton = () => {
    return(
        <TouchableOpacity style={{paddingLeft: 20, paddingBottom: 10}} onPress={() => this._handleDeckIconTouch() } >
            <Icon name='stack-overflow'type='font-awesome' size={30} color='#a8a8a8' />
        </TouchableOpacity>
    );
  };

  _handleDeckIconTouch = () => {
      console.log('Touched!');
      Actions.pop();
  }

  componentDidMount() {
    // fetch matches here and put them in flat list
  }

  constructor(props) {
    super(props);
    // const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state ={
        dataSource: ds.cloneWithRows([])
    };
    this.props.fetchMatches().then(() => {
      this.setState({
        dataSource: ds.cloneWithRows(this.props.matches),
      })
    });
  }

  renderRow(profile) {
    if (profile.item.usrid != getUser().payload) {
      return <MatchListItem profile={profile} />;
    }
  }

  renderUserRow(profile) {
    if (profile.item.usrid === getUser().payload) {
      return <MatchListItem profile={profile} />;
    }
  }

  render () {
    const usrid = getUser().payload;
    //const data = [];

    //const data = JSON.parse(this.props.profiles);
    //console.log(this.snapshotToArray(this.props.snapshot));
    // console.log(data);
    //console.log(this.props.profiles);
    //console.log(getUser().payload);

    return (
      // 1st flist edits user
      // 2nd displays all other profiles  
      <ListView
          style={styles.listContainer}
          dataSource={this.state.dataSource}
          renderRow={(data) => <MatchListItem {...data} />}
          renderHeader={() => <MatchesHeader />}
      />
    );
  }
}


const styles = {
    container: {
      flex: 1,
    },
    listContainer: {
      flex: 1,
      //marginTop: 30
    },
    listRowContainer: {
      flex: 1,
      padding: 16,
      flexDirection: 'row',
      alignItems: 'center',
    },
    separator: {
      flex: 1,
      height: 1,
      backgroundColor: '#8E8E8E',
    }
}

const mapStateToProps = state => {
    const matches = state.match;
    console.log('matchlist matches: ', matches)
    // const arr = [];
    // //console.log(state.prof);
    // const profiles = _.map(state.prof, (val, uid) => {
    //   arr.push(val);
    //   return { ...val, uid };
    // });
  
    //const jProf = JSON.parse(profiles);
    //console.log(jProf);
    // console.log(snapshot);
    // console.log(profiles);
    // console.log('this is the array!!!!!!!');
    // console.log(arr);
  
    return { matches };
  };
  
  export default connect(mapStateToProps, { fetchMatches, getUser })(MatchList);
