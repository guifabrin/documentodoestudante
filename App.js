// In App.js in a new project

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Content from './src/Content';
import {COLORS} from './src/config/variables';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerStyle: {
              backgroundColor: COLORS.PRIMARY,
            },
          }}
          name="Documento do Estudante"
          component={Content}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
