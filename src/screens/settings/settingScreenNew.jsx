import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import styles from './settingScreenNew.style'
import { ArrowLeft } from '../../assets/icon'
import Bell from "././../../assets/imageTask/bell.png"
import Document from "././../../assets/imageTask/document.png"
import Profile from "././../../assets/imageTask/profile.png"
import Faq from "././../../assets/imageTask/faq.png"
import Tutorial from "././../../assets/imageTask/tutorials.png"
import Contact from "././../../assets/imageTask/contact.png"
import Report from "././../../assets/imageTask/report.png"
import { useNavigation } from '@react-navigation/native'



const dummyArrOne=[
  {
    image:Profile,
    text:"Your Account"
  },
  {
    image:Bell,
    text:"Notifications"
  },
  {
    image:Document,
    text:"Data Management"
  },
  {
     image:null,
    text:null
  }
  ,
  {
     image:null,
    text:"Help & Support"
  },
    {
    image:Faq,
    text:"FAQs"
  },
    {
    image:Tutorial,
    text:"User Tutorials"
  },
    {
    image:Report,
    text:"Report a Problem"
  },
   {
    image:Contact,
    text:"Contact Support"
  },
]

export default function SettingScreenNew() {
  const navigation=useNavigation()
  return (
    <View style={styles.container}>
        <View style={styles.headerContainer}>
          <ArrowLeft/>
          <Text style={styles.heading}>Settings</Text>
        </View>
        <View style={styles.mainProfileView}>
          <View style={styles.profileView}></View>
          <View>
            <Text style={styles.nameText}>Jo John</Text>
            <Text style={styles.emailText}>Jo@gmail.copm</Text>
          </View>
        </View>
        <View style={styles.accountMainView}>
            {
              dummyArrOne?.map((item,index)=>
              
             (index==0 || index===1 || index===2 || index===5 || index===6 || index===7 || index===8) ?
              <TouchableOpacity onPress={()=> index==0 ? navigation.navigate("yourAccountScreen") : null} key={index} style={styles.rowView}>
                <Image source={item.image} />
                <Text style={styles.rowText}>{item.text}</Text>
              </TouchableOpacity>
              : index===3 ? <View key={index} style={styles.horizontalLine}/> 
              : 
              <Text key={index} style={styles.helpText}>{item.text}</Text> 
              
              )
            }
        </View>


        <TouchableOpacity style={styles.btnView}>
          <Text style={styles.btnText}>Sign out</Text>
        </TouchableOpacity>


    </View>
  )
}
