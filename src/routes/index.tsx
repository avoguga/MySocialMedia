import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import Login from '../screens/Login';


export type NavigationParams = {
    login: undefined,
    home: {user:string},

}

const Stack = createStackNavigator<NavigationParams>();

export const NavegacaoPrincipal = () => (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="login" component={Login}/>
            <Stack.Screen name="home" component={Home} />
        </Stack.Navigator>
    </NavigationContainer>
)