import React from 'react';
import PropTypes from 'prop-types';
import {Dimensions} from 'react-native';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';
import {withTheme} from 'react-native-material-ui';
import ListTabContent from '../containers/HomeScreen/ListTabContent';
import FavoritesTabContent from '../containers/HomeScreen/FavoritesTabContent';

class Tabs extends React.Component {
  static propTypes = {
    index: PropTypes.number,
    routes: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        component: PropTypes.func.isRequired,
      }),
    ).isRequired,

    onIndexChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    index: 0,
  };

  getNavigationState() {
    return {
      index: this.props.index,
      routes: this.props.routes.map((r) => ({
        ...r,
        component: undefined,
      })),
    };
  }

  renderScene = ({route, jumpTo}) => {
    if (route.key === 'list') {
      return <ListTabContent navigation={this.props.navigation} />;
    } else if (route.key === 'favorites') {
      return <FavoritesTabContent navigation={this.props.navigation} />;
    }
  };

  render() {
    const {onIndexChange} = this.props;
    const {primaryColor, accentColor} = this.props.theme.palette;
    return (
      <TabView
        navigationState={this.getNavigationState()}
        renderScene={this.renderScene}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            indicatorStyle={{backgroundColor: accentColor}}
            style={{backgroundColor: primaryColor}}
          />
        )}
        onIndexChange={onIndexChange}
        initialLayout={{
          width: Dimensions.get('window').width,
          height: 0,
        }}
      />
    );
  }
}

export default withTheme(Tabs);
