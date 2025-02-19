/**
 * @format
 */
import 'react-native-get-random-values';
import 'react-native-gesture-handler';
import { AppRegistry, LogBox, TextInput, Text } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
LogBox.ignoreAllLogs();

if (Text.defaultProps) {
  Text.defaultProps.allowFontScaling = false;
} else {
  Text.defaultProps = {};
  Text.defaultProps.allowFontScaling = false;
}

// Override Text scaling in input fields
if (TextInput.defaultProps) {
  TextInput.defaultProps.allowFontScaling = false;
} else {
  TextInput.defaultProps = {};
  TextInput.defaultProps.allowFontScaling = false;
}
AppRegistry.registerComponent(appName, () => App);
