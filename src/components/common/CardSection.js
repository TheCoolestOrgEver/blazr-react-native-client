import React from 'react';
import { View } from 'react-native';

const CardSection = (props) => {
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
    borderColor: '#fff',
    position: 'relative',
    borderRadius: 20,
    borderWidth: 1,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5
  }
};

export { CardSection };
