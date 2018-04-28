import React from 'react';
import { View } from 'react-native';

const ButtonSection = (props) => {
  return (
    <View style={styles.containerStyle}>
      {props.children}
    </View>
  );
};

const styles = {
  containerStyle: {
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#ddd',
    position: 'relative',
    // borderRadius: 20,
    // borderWidth: 1,
    // elevation: 1,
    // marginLeft: 10,
    // marginRight: 10
  }
};

export { ButtonSection };
