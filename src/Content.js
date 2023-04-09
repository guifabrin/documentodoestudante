import {LogBox} from 'react-native';
import {useStorage} from "./hooks/useStorage";
import LoginPage from "./pages/LoginPage";
import {NavigationContainer} from "@react-navigation/native";
import CardPage from "./pages/CardPage";
import Ionicons from "react-native-vector-icons/Ionicons";
import ProfilePage from "./pages/ProfilePage";
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {COLORS} from "./config/variables";

LogBox.ignoreAllLogs();
const Tab = createMaterialTopTabNavigator();

export default function Content() {
    const [card, setCard] = useStorage('@card')
    const [cardType, setCardType] = useStorage('@cardType')
    const [photo, setPhoto] = useStorage('@photo')
    const [profile, setProfile] = useStorage('@profile')
    const [qrCode, setQrCode] = useStorage('@qrcode')
    if (!card || !qrCode || !profile || !cardType) {
        return <LoginPage setCard={setCard} setQrCode={setQrCode} setProfile={setProfile} setCardType={setCardType}
                          setPhoto={setPhoto}/>
    }
    const handleLogout = () => {
        setQrCode('');
        setProfile('');
        setCard('');
        setPhoto('');
        setCardType('');
    }

    const CardTab = props => (
        <CardPage {...props} card={card} cardType={cardType} photo={photo}/>
    )
    const ProfileTab = props => (
        <ProfilePage
            {...props}
            photo={photo}
            qrCode={qrCode}
            cardType={cardType}
            handleLogout={handleLogout}
            profile={JSON.parse(profile)}
        />
    )

    return (
        <NavigationContainer independent={true}>
            <Tab.Navigator tabBarPosition='bottom' tabBarOptions={{
                inactiveTintColor: 'black',
                activeTintColor: COLORS.PRIMARY,
                indicatorStyle: {backgroundColor: COLORS.PRIMARY},
            }}>
                <Tab.Screen name="Profile" component={ProfileTab} options={{
                    title: 'Profile',
                    tabBarIcon: ({focused, color}) => <Ionicons name='person' color={color} size={25}/>
                }}/>
                <Tab.Screen name="Card" component={CardTab} options={{
                    title: 'Cartão',
                    tabBarIcon: ({focused, color}) => <Ionicons name='card' color={color} size={25}/>
                }}/>
            </Tab.Navigator>
        </NavigationContainer>
    )
}

