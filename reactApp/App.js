import React from 'react';

import {
  StackNavigator,
} from 'react-navigation';
import Places from './components/Places';
import SinglePlace from './components/SinglePlace';

export default StackNavigator({
  Home: { screen: Places },
  Place: { screen: SinglePlace },
});
