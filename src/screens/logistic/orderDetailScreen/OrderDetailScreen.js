import React from 'react';
import { ButtonComp, Container } from '../../../components';
import { useTranslation } from 'react-i18next';
import { APP_LANGUAGE_CONSTANT } from '../../../constants';
import { Image, Text, View } from 'react-native';
import styles from './OrderDetailScreen.styles';
import { AppIcon } from '../../../assets/icon';

const PRODUCT_ARR = [
  {
    img: '',
    productName: 'Fortune Sunlite Refined Sunflower',
    packageType: '50 Crate',
    qty: 400
  },
  {
    img: '',
    productName: 'Fortune Sunlite Refined Sunflower',
    packageType: '50 Crate',
    qty: 400
  },
  {
    img: '',
    productName: 'Fortune Sunlite Refined Sunflower',
    packageType: '50 Crate',
    qty: 400
  },
  {
    img: '',
    productName: 'Fortune Sunlite Refined Sunflower',
    packageType: '50 Crate',
    qty: 400
  },
  {
    img: '',
    productName: 'Fortune Sunlite Refined Sunflower',
    packageType: '50 Crate',
    qty: 400
  },
  {
    img: '',
    productName: 'Fortune Sunlite Refined Sunflower',
    packageType: '50 Crate',
    qty: 400
  }
];
const OrderDetailScreen = () => {
  const { t } = useTranslation();

  //   ORDER_ID
  // PACKAGE_TYPE
  // ORDER_DATE
  // ELAPSED_TIME
  // DELIVERY_DATE
  const ORDER_DETAIL_ARR = [
    {
      title: APP_LANGUAGE_CONSTANT.ORDER_ID,
      orderId: '#324564',
      status: 'Pending'
    },
    {
      title: APP_LANGUAGE_CONSTANT.PACKAGE_TYPE,
      description: '50 Create'
    },
    {
      title: APP_LANGUAGE_CONSTANT.QUANTITY,
      description: '500'
    },
    {
      title: APP_LANGUAGE_CONSTANT.DISTANCE_TRAVELLED,
      description: '15 km'
    },
    {
      title: APP_LANGUAGE_CONSTANT.ORDER_DATE,
      description: '16th September 2024'
    },
    {
      title: APP_LANGUAGE_CONSTANT.ELAPSED_TIME,
      description: '4hr, 30 mins'
    },
    {
      title: APP_LANGUAGE_CONSTANT.DELIVERY_DATE,
      description: '8th July 2024'
    }
  ];
  return (
    <Container title={t(APP_LANGUAGE_CONSTANT.ORDER_DETAILS)}>
      {ORDER_DETAIL_ARR?.map((res, index) => (
        <>
          {index === 0 ? (
            <View style={styles.mainView}>
              <Text style={[styles.titleText, styles.OrderTxt]}>
                {t(res.title)} {res?.orderId}
              </Text>
              <View style={styles.statusView}>
                <Text style={styles.statusTxt}>{res?.status}</Text>
              </View>
            </View>
          ) : (
            <View style={styles.mainView}>
              <Text style={styles.titleText}>{t(res.title)}</Text>
              <Text style={styles.titleText}>{res?.description}</Text>
            </View>
          )}
        </>
      ))}
      <Text style={styles.productTxt}>
        {t(APP_LANGUAGE_CONSTANT.PRODUCT_DETAILS)}{' '}
        <Text style={styles.totalText}>(4)</Text>
      </Text>
      {PRODUCT_ARR?.map((res) => (
        <View style={styles.productView}>
          <View style={styles.imgView}>
            <Image source={AppIcon.driverProfile} style={styles.imgSelf} />
          </View>
          <View style={styles.productDetailView}>
            <Text style={styles.nameTxt}>{res.productName}</Text>
            <Text style={styles.packageTxt}>
              {' '}
              {t(APP_LANGUAGE_CONSTANT.PACKAGE_TYPE)} : {res.packageType}
            </Text>
            <Text style={styles.packageTxt}>
              {' '}
              {t(APP_LANGUAGE_CONSTANT.QUANTITY)} : {res.qty}
            </Text>
          </View>
        </View>
      ))}
      <View style={styles.buttonView}>
        <ButtonComp btnTitle={t(APP_LANGUAGE_CONSTANT.ASSIGN_ORDER)} />
      </View>
    </Container>
  );
};

export default OrderDetailScreen;
