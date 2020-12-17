import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {COLOR} from 'react-native-material-ui';

import MovieCard from './MovieCard';

const styles = StyleSheet.create({
  searchResults: {
    flex: 1,
  },

  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  scrollView: {},
  movieCard: {
    borderRadius: 11,
    backgroundColor: 'transparent',
  },
});

class SearchResults extends React.Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    results: PropTypes.array.isRequired,

    onDetailRequest: PropTypes.func.isRequired,
  };

  render() {
    const {loading, results, onDetailRequest} = this.props;
    return (
      <View style={styles.searchResults}>
        {loading ? (
          <View style={styles.loading}>
            <Text>Loading</Text>
          </View>
        ) : (
          <ScrollView style={styles.scrollView}>
            {results.map((movie) => (
              <MovieCard
                style={{container: styles.movieCard}}
                key={movie.imdbID}
                movie={movie}
                onPress={onDetailRequest}
              />
            ))}
          </ScrollView>
        )}
      </View>
    );
  }
}

export default SearchResults;
