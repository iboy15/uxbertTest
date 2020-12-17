import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {StyleSheet, TextInput} from 'react-native';
import {Toolbar, withTheme} from 'react-native-material-ui';
import LinearGradient from 'react-native-linear-gradient';
import * as searchActions from '../actions/search';
import MainView from '../components/MainView';
import {normalizeSearchTerm} from '../utils/search';
import SearchResults from '../components/SearchResults';
import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('screen');
const styles = StyleSheet.create({
  titleText: {
    marginLeft: 0,
    color: 'white',
  },
});

class SearchScreen extends React.Component {
  static propTypes = {
    searchTerm: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    results: PropTypes.array.isRequired,

    searchActions: PropTypes.objectOf(PropTypes.func).isRequired,
  };

  handleSearchTermChange = (searchTerm) => {
    this.props.searchActions.searchTermChange(searchTerm);
  };

  handleSearchSubmit = () => {
    const searchTerm = normalizeSearchTerm(this.props.searchTerm);
    this.props.searchActions.search(searchTerm);
  };

  handleBackIconPress = () => {
    this.props.navigation.goBack();
  };

  handleClearIconPress = () => {
    this.handleSearchTermChange('');
  };

  handleDetailRequest = (movie) => {
    this.props.navigation.navigate('Details', {
      movie,
    });
  };

  render() {
    const {searchTerm, loading, results, theme} = this.props;

    return (
      <MainView>
        <LinearGradient
          colors={['#000000', '#434343']}
          style={{position: 'absolute', bottom: 0, left: 0, height, width}}
          start={{x: 0, y: 1}}
          end={{x: 1, y: 1}}
        />
        <Toolbar
          leftElement="md-arrow-back"
          onLeftElementPress={this.handleBackIconPress}
          centerElement={
            <TextInput
              autoFocus
              value={searchTerm}
              onChangeText={this.handleSearchTermChange}
              onSubmitEditing={this.handleSearchSubmit}
              placeholder="Search movies..."
              placeholderTextColor="rgba(244, 244, 244, 0.6)"
              style={[
                theme.toolbar.titleText,
                theme.toolbarSearchActive.titleText,
                styles.titleText,
              ]}
              underlineColorAndroid="transparent"
            />
          }
          rightElement={searchTerm.length > 0 ? 'md-close' : undefined}
          onRightElementPress={this.handleClearIconPress}
        />
        <SearchResults
          loading={loading}
          results={results}
          onDetailRequest={this.handleDetailRequest}
        />
      </MainView>
    );
  }
}

const stateToProps = ({search}) => ({
  searchTerm: search.term,
  loading: search.loading,
  results: search.results,
});

const dispatchToProps = (dispatch) => ({
  searchActions: bindActionCreators(searchActions, dispatch),
});

export default connect(stateToProps, dispatchToProps)(withTheme(SearchScreen));
