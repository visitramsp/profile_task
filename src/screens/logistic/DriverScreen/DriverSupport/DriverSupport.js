import React from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { AppIcon } from '../../../../assets/icon';
import { Container } from '../../../../components';
import { APP_LANGUAGE_CONSTANT, AppConstant } from '../../../../constants';
import styles from './DriverSupport.styles';

const contactOptions = [
  {
    id: 1,
    title: 'Call Support',
    image: AppIcon.callSupport,
    description:
      'In a laoreet purus. Integer turpis quam, laoreet id orci nec, ultrices lacinia nunc.',
    action: 'callSupport'
  },
  {
    id: 2,
    title: 'Live Chat',
    image: AppIcon.liveChat,
    description:
      'In a laoreet purus. Integer turpis quam, laoreet id orci nec, ultrices lacinia nunc.',
    action: 'startLiveChat'
  },
  {
    id: 3,
    title: 'WhatsApp',
    image: AppIcon.whatsApp,
    description:
      'In a laoreet purus. Integer turpis quam, laoreet id orci nec, ultrices lacinia nunc.',
    action: 'openWhatsApp'
  },
  {
    id: 4,
    title: APP_LANGUAGE_CONSTANT.EMAIL_US,
    image: AppIcon.emailUs,
    description:
      'In a laoreet purus. Integer turpis quam, laoreet id orci nec, ultrices lacinia nunc.',
    action: 'sendEmail'
  },
  {
    id: 5,
    title: APP_LANGUAGE_CONSTANT.FAQS,
    image: AppIcon.FAQ,
    description:
      'In a laoreet purus. Integer turpis quam, laoreet id orci nec, ultrices lacinia nunc.',
    action: 'openFAQ'
  }
];

const DriverSupport = ({ navigation }) => {
  const { t } = useTranslation();
  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity style={styles.itemContainer}>
        <View style={styles.imageContainer}>
          <Image source={item?.image} style={styles.iconStyle} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.titleText}>{item?.title}</Text>
          <Text style={styles.descriptionText}>{item?.description}</Text>
        </View>
        <View style={styles.arrowContainer}>
          <Image
            source={AppIcon.RightArrow}
            style={styles.arrowIcon}
            resizeMode="contain"
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Container title={t(AppConstant.SUPPORT)}>
      <FlatList
        data={contactOptions}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContentContainer}
      />
    </Container>
  );
};

export default DriverSupport;
