import React from 'react';
import { Container } from '../../../components';
import { APP_LANGUAGE_CONSTANT } from '../../../constants';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import styles from './CompanyDetailScreen.styles';
import { useSelector } from 'react-redux';

export default function CompanyDetailScreen() {
  const { t } = useTranslation();
  const { userDetail } = useSelector((state) => state.user);

  const COMPANY_ARR = [
    {
      title: t(APP_LANGUAGE_CONSTANT.COMPANY_NAME),
      desc: userDetail.company_name
    },
    {
      title: t(APP_LANGUAGE_CONSTANT.DESIGNATION),
      desc: userDetail.designation
    },

    {
      title: t(APP_LANGUAGE_CONSTANT.TRADE_LICENSE_NUMBER),
      desc: userDetail.trade_license_number
    },
    {
      title: t(APP_LANGUAGE_CONSTANT.COMPANY_ADDRESS),
      desc: userDetail.company_address
    },
    {
      title: t(APP_LANGUAGE_CONSTANT.PO_BOX_TITLE),
      desc: userDetail.po_box
    },
    { title: t(APP_LANGUAGE_CONSTANT.COUNTRY), desc: 'United Arab Emirites' }
  ];
  return (
    <Container title={t(APP_LANGUAGE_CONSTANT.COMPANY_DETAILS)}>
      <Text style={styles.businessText}>
        {t(APP_LANGUAGE_CONSTANT.BUSINESS_INFO)}
      </Text>
      {COMPANY_ARR?.map((res, index) => (
        <View style={styles.mainView} key={index}>
          <Text style={styles.title}>{res.title}</Text>
          <Text style={styles.desc}>{res.desc}</Text>
        </View>
      ))}
    </Container>
  );
}
