import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMatches, getUser } from '../actions';
import { Text, ListView, Image, SafeAreaView, TouchableOpacity, TouchableHighlight, View } from 'react-native';
import { getProfile, updateLocation } from './Helper.js';
import { Icon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { GiftedChat, Avatar, Message, Bubble } from 'react-native-gifted-chat';
import firebase from 'firebase';
import { ifIphoneX, isIphoneX } from 'react-native-iphone-x-helper'

class CustomMessage extends Message {
    renderAvatar() {
      return (
        <Avatar {...this.getInnerComponentProps()} />
      );
    }
}

class Thread extends Component {

constructor(props) {
    super(props);
    this.state = {
        messages: []
    };

    //this.user = firebase.auth()
    this.user = this.props.user;
    this.friend = this.props.friend;

    this.chatRef = this.getRef().child('thread/' + this.generateChatId());
    this.chatRefData = this.chatRef.orderByChild('order')
    this.onSend = this.onSend.bind(this);

}

generateChatId() {
    if(this.user.userID > this.friend.userID)
        return `${this.user.userID}-${this.friend.userID}`
    else
        return `${this.friend.userID}-${this.user.userID}`
}

getRef() {
    return firebase.database().ref();
}

listenForItems(chatRef) {
    chatRef.on('value', (snap) => {

        // get children as an array
        var items = [];
        snap.forEach((child) => {
            var name = child.val().userID == this.user.userID? this.user.name: this.friend.name
            items.push({
                _id: child.val().createdAt,
                text: child.val().text,
                createdAt: new Date(child.val().createdAt),
                user: {
                    _id: child.val().userID,
                    avatar: child.val().imageURL
                }
            });
        });

        this.setState({
            loading: false,
            messages: items
        })


    });
}

componentWillMount() {
    Actions.refresh({ title: this.friend.name });
}

componentDidMount() {
    this.listenForItems(this.chatRefData);
}


componentWillUnmount() {
    this.chatRefData.off()
}

onSend(messages = []) {

    // this.setState({
    //     messages: GiftedChat.append(this.state.messages, messages),
    // });
    messages.forEach(message => {
        var now = new Date().getTime()
        this.chatRef.push({
            _id: now,
            text: message.text,
            createdAt: now,
            userID: this.user.userID,
            order: -1 * now,
            imageURL: this.user.imageURL
        })
    })
    
}

renderBubble(props) { return ( <Bubble {...props} 
    wrapperStyle={{
        left: {
          backgroundColor: 'white',
        },
        right: {
          backgroundColor: '#ff7272'
        }
}} />)}

  render () {
    return (
        <GiftedChat
            style={{flex: 1}}
            messages={this.state.messages}
            onSend={this.onSend.bind(this)}
            user={{
                _id: this.user.userID
            }}
            renderMessage={props => <CustomMessage {...props} />} 
            renderBubble={this.renderBubble}
            />
    );
  }
}

export default (Thread);
