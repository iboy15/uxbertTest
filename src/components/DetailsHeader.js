import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {withTheme, Icon} from 'react-native-material-ui';
import {SharedElement} from 'react-navigation-shared-element';
import {COLOR} from 'react-native-material-ui';
import Share from 'react-native-share';
import StarRating from 'react-native-star-rating';
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },

  line: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },

  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },

  icon: {
    marginRight: 5,
  },

  text: {
    color: 'white',
    fontSize: 16,
  },
  textGenre: {
    fontSize: 16,
    color: COLOR.deepOrange500,
  },

  titleText: {
    fontSize: 24,
  },

  year: {},

  yearText: {},

  duration: {},

  durationText: {},

  genreText: {},
});

class DetailsHeader extends React.Component {
  static propTypes = {
    result: PropTypes.object.isRequired,
  };

  shareSingleImage = async (url, title) => {
    const shareOptions = {
      title: title,
      url: url,
      failOnCancel: false,
    };

    try {
      const ShareResponse = await Share.open(shareOptions);

      // setResult(JSON.stringify(ShareResponse, null, 2));
    } catch (error) {
      // setResult('error: '.concat(getErrorString(error)));
    }
  };
  render() {
    const {result, theme} = this.props;

    const {primaryColor} = theme.palette;
    return (
      <View style={[styles.container, {backgroundColor: primaryColor}]}>
        <View style={[styles.item, styles.title]}>
          <SharedElement id={`item.${result.imdbID}.text`}>
            <Text style={[styles.text, styles.titleText]}>{result.Title}</Text>
          </SharedElement>
        </View>
        <View style={{height: 15}} />
        <Text style={{color: 'white', fontSize: 20}}>
          Ratings{'  '}
          <Text style={{color: 'white', fontSize: 40}}>
            {result.imdbRating}
          </Text>
        </Text>
        <View style={{width: '60%', marginTop: 5}}>
          <StarRating
            disabled={false}
            fullStarColor={'#FFD700'}
            maxStars={10}
            starSize={20}
            rating={result.imdbRating}
            // selectedStar={(rating) => this.onStarRatingPress(rating)}
          />
        </View>
        <View style={{height: 20}} />
        <View style={styles.line}>
          <View style={[styles.item, styles.year]}>
            <Icon
              style={[styles.icon, styles.yearIcon]}
              name="md-calendar"
              color="white"
            />
            <Text style={[styles.text, styles.yearText]}>{result.Year}</Text>
          </View>
          <View style={[styles.item, styles.duration]}>
            <Icon
              style={[styles.icon, styles.durationIcon]}
              name="md-time"
              color="white"
            />
            <Text style={[styles.text, styles.durationText]}>
              {result.Runtime}
            </Text>
          </View>
          <TouchableOpacity
            style={{marginLeft: 'auto'}}
            onPress={() => this.shareSingleImage(result.Poster, result.Title)}>
            <Icon
              style={styles.icon}
              name="share-social-outline"
              color="white"
            />
          </TouchableOpacity>
        </View>
        <View style={{marginVertical: 10}}>
          <Text style={[styles.text, styles.durationText]}>
            Released : {result.Released}
          </Text>
        </View>
        <View style={styles.line}>
          <View style={[styles.item, styles.genre]}>
            <Text style={[styles.textGenre, styles.genreText]}>
              {result.Genre}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

export default withTheme(DetailsHeader);
