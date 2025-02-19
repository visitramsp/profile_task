import React, { useState, useRef, useEffect } from 'react';
import { ChatContainer } from '../../../components';
import { APP_LANGUAGE_CONSTANT } from '../../../constants';
import { useTranslation } from 'react-i18next';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  ScrollView,
  Image,
  FlatList
} from 'react-native';
import {
  AppIcon,
  AttachmentChat,
  DocumentChat,
  Gallery,
  SendChat,
  Worning
} from '../../../assets/icon';
import moment from 'moment/moment';
import styles from './LiveChatScreen.styles';
import * as ImagePicker from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import { setAdjustResize, setAdjustNothing } from 'rn-android-keyboard-adjust';
export default function LiveChatScreen({ navigation }) {
  const { t } = useTranslation();
  const [inputMessage, setInputMessage] = useState('');
  const scrollRef = useRef(null);
  const [messages, setMessages] = useState([
    {
      id: '1',
      type: 'text',
      name: 'Hello!',
      sender: 'user',
      time: moment().format('LT')
    },
    {
      id: '2',
      type: 'text',
      name: 'Hi! How are you?',
      sender: 'receiver',
      time: moment().format('LT')
    }
  ]);

  useEffect(() => {
    setAdjustResize();
    return () => {
      setAdjustNothing();
    };
  }, []);
  const pickImage = () => {
    const options = {
      mediaType: 'photo',
      quality: 1
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
      } else if (response.errorMessage) {
      } else {
        const photoMessage = {
          id: Math.random().toString(),
          type: 'image',
          name: response.assets[0]?.uri, // Image URI
          sender: 'user',
          time: moment().format('LT')
        };
        setMessages((prevMessages) => [...prevMessages, photoMessage]);
      }
    });
  };

  const pickDocument = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles]
      });
      const documentMessage = {
        id: Math.random().toString(),
        type: 'document',
        name: res[0]?.uri, // Image URI
        sender: 'user',
        time: moment().format('LT')
      };
      setMessages((prevMessages) => [...prevMessages, documentMessage]);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
      }
    }
  };

  const sendMessage = () => {
    if (inputMessage.trim() === '') {
      return;
    }
    const newMessage = {
      id: Math.random().toString(),
      type: 'text',
      name: inputMessage,
      sender: 'user',
      time: moment().format('LT')
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputMessage('');
  };

  // eslint-disable-next-line complexity
  const viewChat = ({ item, index }) => {
    return (
      <View style={styles.viewChat}>
        {item.sender === 'user' ? (
          <View>
            {item.type === 'image' ? (
              <View style={styles.userImage}>
                <Image style={styles.imageUser} source={{ uri: item.name }} />
                <Text style={styles.imageTime}>{item.time}</Text>
              </View>
            ) : item.type === 'document' ? (
              <View style={styles.doc}>
                <View style={styles.documentView}>
                  <DocumentChat />
                  <Text style={styles.pdf}>{'New_Document.PDF'}</Text>
                </View>
                <Text style={styles.docTime}>{item.time}</Text>
              </View>
            ) : (
              <TouchableOpacity style={styles.rightBubble} activeOpacity={0.2}>
                <Text multiline style={styles.bubbleRightText}>
                  {item.name}
                </Text>
                <Text multiline style={styles.rightTimeStyle}>
                  {item.time}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <View>
            {item.type === 'text' ? (
              <TouchableOpacity style={styles.leftBubble} activeOpacity={0.2}>
                <Text style={styles.bubbleLeftText}>{item.name}</Text>
                <Text multiline style={styles.leftTimeStyle}>
                  {item.time}
                </Text>
              </TouchableOpacity>
            ) : item.type === 'image' ? (
              <View style={styles.leftImage}>
                <Image style={styles.imgLeft} source={{ uri: item.name }} />
                <Text style={styles.leftTime}>{item.time}</Text>
              </View>
            ) : item.type === 'document' ? (
              <View style={styles.leftDocument}>
                <View style={styles.docLeft}>
                  <DocumentChat />
                  <Text style={styles.pdf}>{'New_Document.PDF'}</Text>
                </View>
                <Text style={styles.time}>{item.time}</Text>
              </View>
            ) : null}
          </View>
        )}
      </View>
    );
  };

  return (
    <ChatContainer
      liveChat
      chidernContainerStyle={styles.childrenContainer}
      scrollable={false}
      // horizontalScace={false}
      title={t(APP_LANGUAGE_CONSTANT.LIVE_CHAT)}
    >
      <ImageBackground
        source={AppIcon.ChatBackground}
        style={styles.imgBackground}
        resizeMode="cover"
      >
        <View style={styles.headingContainer}>
          <Worning />
          <Text style={styles.headingText}>
            {t(APP_LANGUAGE_CONSTANT.ACCOUNT_DESC)}
          </Text>
        </View>

        <FlatList
          nestedScrollEnabled={true}
          ref={scrollRef}
          style={styles.flat}
          data={messages.sort((a, b) => new Date(a.time) - new Date(b.time))} // Sort in ascending order
          showsVerticalScrollIndicator={false}
          renderItem={viewChat}
          keyExtractor={(item, index) => index.toString()}
        />

        <View style={styles.inputView}>
          <View style={styles.composer}>
            <TextInput
              multiline
              placeholder="Type a message..."
              placeholderTextColor={'black'}
              textAlign={'left'}
              style={styles.textinputStyle}
              value={inputMessage}
              onChangeText={(text) => {
                setInputMessage(text);
              }}
            />
          </View>
          <View style={styles.imagePic}>
            <TouchableOpacity
              style={styles.pickImage}
              onPress={() => pickImage()}
            >
              <Gallery />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.pickDocument}
              onPress={() => pickDocument()}
            >
              <AttachmentChat />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.send]}
              onPress={() => {
                sendMessage();
              }}
            >
              <SendChat />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </ChatContainer>
  );
}
