/**
 * @format
 */

import {AppRegistry} from 'react-native';
// import App from './App';
// import Main from './src/screems/Main';
import App from './src/AppNavigator';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
