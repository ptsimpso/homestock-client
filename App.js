import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

import { AppNavigator } from './navigation.component';
import { default as theme } from './src/config/theme.json';
import reducers from './src/redux/reducers';

const store = createStore(reducers);

export default () => (
  <Provider store={store}>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
      <AppNavigator />
    </ApplicationProvider>
  </Provider>
);
