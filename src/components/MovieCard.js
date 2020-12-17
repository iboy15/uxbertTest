import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, ViewPropTypes, Image, Dimensions} from 'react-native';
import FitImage from 'react-native-fit-image';
import {Card, Subheader} from 'react-native-material-ui';
import {SharedElement} from 'react-navigation-shared-element';
import TouchableScale from 'react-native-touchable-scale';
const {width, height} = Dimensions.get('screen');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 15,
    marginBottom: 15,
  },

  moviePoster: {
    margin: 20,
    marginTop: 10,
    marginBottom: 10,
  },

  movieTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
  },
});

class MovieCard extends React.Component {
  static propTypes = {
    movie: PropTypes.object.isRequired,
    style: PropTypes.shape({
      container: ViewPropTypes.style,
    }),

    onPress: PropTypes.func,
  };

  static defaultProps = {
    style: {},

    onPress: () => {},
  };

  handlePress = () => {
    this.props.onPress(this.props.movie);
  };

  render() {
    const {movie, style: propsStyle = {}, ...rest} = this.props;
    return (
      <Card
        {...rest}
        style={{container: [styles.container, propsStyle.container]}}>
        <TouchableScale
          onPress={this.handlePress}
          activeScale={0.9}
          tension={50}
          friction={7}
          useNativeDriver>
          <SharedElement id={`item.${movie.imdbID}.photo`}>
            <FitImage
              resizeMode="cover"
              style={styles.moviePoster}
              source={{uri: movie.Poster}}
            />
          </SharedElement>
        </TouchableScale>
        <SharedElement id={`item.${movie.imdbID}.text`}>
          <Subheader
            lines={2}
            text={`${movie.Title} (${movie.Year})`}
            style={{
              text: styles.movieTitle,
            }}
          />
        </SharedElement>
      </Card>
    );
  }
}

export default MovieCard;
