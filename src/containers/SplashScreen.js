import React from 'react';
import {View, Text, Dimensions, Animated} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {COLOR} from 'react-native-material-ui';
const {width, height} = Dimensions.get('screen');
class SplashScreen extends React.Component {
  state = {
    fadeAnim: new Animated.Value(0),
  };
  async componentDidMount() {
    this.fadeIn();
    setTimeout(() => {
      this.props.navigation.navigate('HomeScreen');
    }, 2000);
  }
  fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(this.state.fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };
  render() {
    return (
      <View style={styles.viewStyles}>
        <LinearGradient
          colors={['#434343', '#000000']}
          style={{position: 'absolute', bottom: 0, left: 0, height, width}}
          start={{x: 0, y: 1}}
          end={{x: 1, y: 1}}
        />
        <Animated.View
          style={[
            styles.fadingContainer,
            {
              opacity: this.state.fadeAnim, // Bind opacity to animated value
            },
          ]}>
          <Text style={styles.textStyles}>UXBERT{'\n'} Usability Lab</Text>
        </Animated.View>
        <Text style={styles.credit}>Project ISHAK</Text>
      </View>
    );
  }
}

const styles = {
  credit: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
    color: 'white',
    fontSize: 18,
  },
  viewStyles: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyles: {
    textAlign: 'center',
    color: COLOR.deepOrange500,
    fontSize: 30,
    fontWeight: 'bold',
  },
};

export default SplashScreen;
