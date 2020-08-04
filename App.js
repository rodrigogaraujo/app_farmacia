import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import SignIn from './src/views/SignIn';
import SignUp from './src/views/SignUp';
import Home from './src/views/Home';
import ServiceOrder from './src/views/ServiceOrder';
import Weighing from './src/views/Weighing';
import GetWeight from './src/views/GetWeight';
import Report from './src/views/Report';

const navigator = createStackNavigator(
  {
    SignIn: SignIn,
    Home: Home,
    ServiceOrder: ServiceOrder,
    Weighing: Weighing,
    GetWeight: GetWeight,
    Report: Report,
    SignUp: SignUp,
  },
  {
    initialRouteName: 'SignIn',
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  }
);

export default createAppContainer(navigator);
