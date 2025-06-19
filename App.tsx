import { StyleSheet, View } from 'react-native';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProjectScreen from './front/screens/ProjectScreen';
import Header from './front/shared/header';
import ExampleFormScreen from './front/components/Form/ExampleForm';

const Stack = createStackNavigator();

export default function App() {
  return (
    <View style={{ flex: 1, backgroundColor: '#f7f8fa' }}>
      <Header />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Projects" component={ProjectScreen} />
          
          {/* <Stack.Screen name="Other" component={OtherScreen} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
//<Stack.Screen name="Projects" component={ExampleFormScreen} />
//<Stack.Screen name="ProjectDetail" component={ProjectDetail} />

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
