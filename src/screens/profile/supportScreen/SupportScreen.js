import React from 'react';
import { Container } from '../../../components';
import { APP_LANGUAGE_CONSTANT, SCREEN_NAME } from '../../../constants';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';
import {
  EmailUsIcons,
  FAQsIcons,
  GreaterCircle,
  LiveChatIcons,
  WhatsappIcons
} from '../../../assets/icon';
import styles from './SupportScreen.styles';
export default function SupportScreen({ navigation }) {
  const { t } = useTranslation();
  const BUTTON_ARR = [
    // {
    //   icons: LiveChatIcons,
    //   title: t(APP_LANGUAGE_CONSTANT.LIVE_CHAT),
    //   description:
    //     'In a laoreet purus. Integer turpis quam, laoreet id orci lacinia nunc.'
    // },
    // {
    //   icons: WhatsappIcons,
    //   title: t(APP_LANGUAGE_CONSTANT.WHATSAPP),
    //   description:
    //     'In a laoreet purus. Integer turpis quam, laoreet id orci lacinia nunc.'
    // },
    {
      icons: EmailUsIcons,
      title: t(APP_LANGUAGE_CONSTANT.EMAIL_US),
      description:
        'In a laoreet purus. Integer turpis quam, laoreet id orci lacinia nunc.'
    },
    {
      icons: FAQsIcons,
      title: t(APP_LANGUAGE_CONSTANT.FAQ_S),
      description:
        'In a laoreet purus. Integer turpis quam, laoreet id orci lacinia nunc.'
    }
  ];

  const redictScreen = (index) => {
    if (index === 0) {
      navigation.navigate('emailUsScreen');
    } else if (index === 1) {
      navigation.navigate('faqScreen');
    }
    // else {
    //   navigation.navigate(SCREEN_NAME.COMING_SOON);
    // }
  };

  return (
    <Container title={t(APP_LANGUAGE_CONSTANT.SUPPORT)}>
      {BUTTON_ARR?.map((res, index) => (
        <TouchableOpacity
          style={styles.mainView}
          key={index}
          onPress={() => redictScreen(index)}
        >
          <View style={styles.iconsView}>
            <res.icons />
          </View>
          <View style={styles.centerView}>
            <Text style={styles.title}>{res.title}</Text>
            {/* <Text style={styles.titleDesc}>{res.description}</Text> */}
          </View>
          <View style={styles.greaterView}>
            <GreaterCircle />
          </View>
        </TouchableOpacity>
      ))}
    </Container>
  );
}
