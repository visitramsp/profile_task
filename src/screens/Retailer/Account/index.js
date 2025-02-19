import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import MyAccount from './MyAccount';
import PersonalInformation from './PersonalInformation';
import CompanyDetail from '../../../Shared/MyAccoount/CompanyDetail';
import OutletList from './Outlets/OutletList';
import RetailerIntegrationSettings from './IntegrationSettings';

const stack = createNativeStackNavigator();

export default function AccountIndex() {
  return (
    <stack.Navigator>
      <stack.Screen
        name="myAccount"
        component={MyAccount}
        options={{
          headerShown: false,
          title: 'MY ACCOUNT',
          headerStyle: {
            backgroundColor: '#f4511e',
            borderRadius: 20
          },
          headerTitleAlign: 'center',
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            color: 'white'
          }
        }}
      />
      <stack.Screen
        name="personalInfo"
        component={PersonalInformation}
        options={{
          headerShown: true,
          title: 'PERSONAL INFO',
          headerStyle: {
            backgroundColor: '#f4511e',
            borderRadius: 20
          },
          headerTitleAlign: 'center',
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            color: 'white'
          }
        }}
      />

      {/* <stack.Screen
        name="outlet"
        component={PersonalInfo}
        options={{
          headerShown: true,
          title: 'Outlet Details',
          headerStyle: {
            backgroundColor: '#f4511e',
            borderRadius: 20,
          },
          headerTitleAlign: 'center',
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            color: 'white',
          },
        }}
      /> */}
      <stack.Screen
        name="company"
        component={CompanyDetail}
        options={{
          headerShown: true,
          title: 'Company Details',
          headerStyle: {
            backgroundColor: '#f4511e',
            borderRadius: 20
          },
          headerTitleAlign: 'center',
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            color: 'white'
          }
        }}
      />
      <stack.Screen
        name="outlet"
        component={OutletList}
        options={{
          headerShown: false,
          title: 'Outlet Details',
          headerStyle: {
            backgroundColor: '#f4511e',
            borderRadius: 20
          },
          headerTitleAlign: 'center',
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            color: 'white'
          }
        }}
      />

      <stack.Screen
        name="retailerIntegrationSettings"
        component={RetailerIntegrationSettings}
        options={{
          headerShown: false,
          title: 'Integration Settings',
          headerStyle: {
            backgroundColor: '#f4511e',
            borderRadius: 20
          },
          headerTitleAlign: 'center',
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            color: 'white'
          }
        }}
      />
    </stack.Navigator>
  );
}

// PersonalInformation
