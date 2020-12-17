import React from 'react';
import {View, Text, Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const {width, height} = Dimensions.get('screen');
class SplashScreen extends React.Component {
  async componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate('HomeScreen');
    }, 1000);
  }

  render() {
    return (
      <View style={styles.viewStyles}>
        <LinearGradient
          colors={['#434343', '#000000']}
          style={{position: 'absolute', bottom: 0, left: 0, height, width}}
          start={{x: 0, y: 1}}
          end={{x: 1, y: 1}}
        />
        <Text style={styles.textStyles}>
          UXBERT Usability Lab,{'\n'} Project ISHAK
        </Text>
      </View>
    );
  }
}

const styles = {
  viewStyles: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'orange',
  },
  textStyles: {
    textAlign: 'center',
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
};

export default SplashScreen;
