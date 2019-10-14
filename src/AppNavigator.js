import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Main from './screems/Main';
import Details from './screems/Details';

const MainNavigator = createStackNavigator({
    Home: { screen: Main },
    Details: { screen: Details },
}, { defaultNavigationOptions: { header: null } });

const App = createAppContainer(MainNavigator);

export default App;