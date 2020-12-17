import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //paddingTop: Constants.statusBarHeight,
  },
});

const MainView = ({children}) => (
  <View style={styles.container}>{children}</View>
);

MainView.propTypes = {
  children: PropTypes.node,
};

MainView.defaultProps = {
  children: null,
};

export default MainView;
