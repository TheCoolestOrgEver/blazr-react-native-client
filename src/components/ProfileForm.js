import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { updateProfile, imageChanged, displayImageChanged } from '../actions';
import { Card, CardSection, Input } from './common';
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-picker';

class ProfileForm extends Component {

  constructor(props) {
    super(props);
    this.state = { imagePath: 'https://facebook.github.io/react-native/docs/assets/favicon.png' };
  }

  // Open Image Library:
  onSelectImageButtonPress() {
    ImagePicker.launchImageLibrary(options, (response)  => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else {
        let source = response.origURL;
        console.log('profile form source', source);
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
    
        // this.setState({
        //   imagePath: response.uri
        // });
        this.props.displayImageChanged(response.uri);
        this.props.imageChanged(source);
      }    
    });
  }

  render () {
    return (
     <View style={styles.viewStyle}>
       <LinearGradient colors={['#2E23F3', '#F52668']} 
        style={styles.backgroundStyle}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}>
          <TouchableOpacity onPress={() => this.onSelectImageButtonPress()}>
          <Image
          style={ styles.imageStyle }
          source={{ uri: this.props.displayImage }}
          />
          </TouchableOpacity>
          <Card>
            <CardSection>
              <Input
                label='Name'
                placeholder='First Last'
                value={this.props.name}
                onChangeText={value => this.props.updateProfile({ prop: 'name', value})}
              />
            </CardSection>
            <View style={{height: 1, backgroundColor: '#c7c7cd'}}>
            </View>
            <CardSection>
              <Input
                label='Age'
                placeholder='102'
                value={this.props.age}
                onChangeText={value => this.props.updateProfile({ prop: 'age', value})}
              />
            </CardSection>
            <View style={{height: 1, backgroundColor: '#c7c7cd'}}>
            </View>
            <CardSection>
              <Input
                label='Bio'
                placeholder='tell us about yourself'
                value={this.props.bio}
                onChangeText={value => this.props.updateProfile({ prop: 'bio', value})}
              />
            </CardSection>
          </Card>
        </LinearGradient>
      </View>
    )
  }
}

const options = {
  title: 'Select Profile Pic'
};

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  },
  backgroundStyle: {
    flex: 1,
    justifyContent: 'center',
  },
  viewStyle: {
    flex: 1,
  },
  headerStyle: {
    margin: 10,
    color: 'white',
    fontSize: 30,
    backgroundColor: 'transparent'
  },
  imageStyle: {
    width: 200, 
    height: 200, 
    alignSelf: 'center'
  }
};

const mapStateToProps = (state) => {
  const { name, age, bio, imageUri, displayImage } = state.profForm;

  return { name, age, bio, imageUri, displayImage };
};

export default connect(mapStateToProps, {
  updateProfile, imageChanged, displayImageChanged
})(ProfileForm);