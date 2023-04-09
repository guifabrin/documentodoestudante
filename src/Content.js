import {LogBox} from 'react-native';
import {useStorage} from './hooks/useStorage';
import LoginPage from './pages/LoginPage';
import {NavigationContainer} from '@react-navigation/native';
import CardPage from './pages/CardPage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProfilePage from './pages/ProfilePage';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {COLORS} from './config/variables';

LogBox.ignoreAllLogs();
const Tab = createMaterialTopTabNavigator();

export default function Content() {
  const [data, setData, deleteData] = useStorage('data');
  if (!data) return <LoginPage setData={setData} />;
  const CardTab = props => <CardPage {...props} {...data} />;
  const ProfileTab = props => (
    <ProfilePage {...props} {...data} handleLogout={deleteData} />
  );

  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        tabBarPosition="bottom"
        screenOptions={{
          tabBarActiveTintColor: COLORS.PRIMARY,
          tabBarInactiveTintColor: 'black',
          tabBarIndicatorStyle: {
            backgroundColor: COLORS.PRIMARY,
          },
        }}
      >
        <Tab.Screen
          name="Profile"
          component={ProfileTab}
          options={{
            title: 'Perfil',
            tabBarIcon: ({focused, color}) => (
              <Ionicons name="person" color={color} size={25} />
            ),
          }}
        />
        <Tab.Screen
          name="Card"
          component={CardTab}
          options={{
            title: 'Cartão',
            tabBarIcon: ({focused, color}) => (
              <Ionicons name="card" color={color} size={25} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
