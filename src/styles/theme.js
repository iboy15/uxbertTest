import {COLOR} from 'react-native-material-ui';
import {getStatusBarHeight} from 'react-native-status-bar-height';

// you can set your style right here, it'll be propagated to application
export const uiTheme = {
  palette: {
    primaryColor: 'transparent',
    accentColor: COLOR.deepOrange500,
  },
  toolbar: {
    container: {
      paddingTop: getStatusBarHeight(),
      height: 50 + getStatusBarHeight(),
    },
  },
  iconSet: 'Ionicons',
};
