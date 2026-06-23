import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

import Productos from "./Productos";


export default function Navegacion() {
    const Tab = createBottomTabNavigator();

    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen
                    name="Productos" component={Productos}/>
            </Tab.Navigator>
        </NavigationContainer>
    );
}