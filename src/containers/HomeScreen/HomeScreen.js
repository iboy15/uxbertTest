import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Toolbar} from 'react-native-material-ui';
import LinearGradient from 'react-native-linear-gradient';
import MainView from '../../components/MainView';
import Tabs from '../../components/Tabs';
import ListTabContent from './ListTabContent';
import FavoritesTabContent from './FavoritesTabContent';
import * as libraryActions from '../../actions/library';
import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('screen');
const routes = [
  {
    key: 'list',
    title: 'My List',
    component: ListTabContent,
    // navigation: this.props.navigation,
  },
  {
    key: 'favorites',
    title: 'Favorites',
    component: FavoritesTabContent,
    // navigation: this.props.navigation,
  },
];

class HomeScreen extends React.Component {
  static propTypes = {
    tabIndex: PropTypes.number.isRequired,

    libraryActions: PropTypes.object.isRequired,
  };

  handleMenuIconPress = () => {
    this.props.navigation.toggleDrawer();
  };

  handleSearchIconPress = () => {
    this.props.navigation.navigate('Search');
  };

  handleGridIconPress = () => {
    this.props.libraryActions.rowLengthsChange();
  };

  handleRightIconPress = (info) => {
    if (info.index === 0) {
      this.handleGridIconPress();
    } else {
      this.handleSearchIconPress();
    }
  };

  handleTabIndexChange = (index) => {
    const route = routes[index];
    this.props.libraryActions.navChange(route.key);
  };

  render() {
    const {tabIndex, navigation} = this.props;
    return (
      <MainView>
        <LinearGradient
          colors={['#000000', '#434343']}
          style={{position: 'absolute', bottom: 0, left: 0, height, width}}
          start={{x: 0, y: 1}}
          end={{x: 1, y: 1}}
        />
        <Toolbar
          rightElement={['md-grid', 'md-search']}
          onRightElementPress={this.handleRightIconPress}
        />
        <Tabs
          navigation={navigation}
          routes={routes}
          index={tabIndex}
          onIndexChange={this.handleTabIndexChange}
        />
      </MainView>
    );
  }
}

const stateToProps = ({library}) => ({
  tabIndex: routes.findIndex((r) => r.key === library.nav),
});

const dispatchToProps = (dispatch) => ({
  libraryActions: bindActionCreators(libraryActions, dispatch),
});

export default connect(stateToProps, dispatchToProps)(HomeScreen);
