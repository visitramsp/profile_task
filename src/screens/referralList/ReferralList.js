import React, { useEffect, useState } from 'react';
import { ButtonComp, Container } from '../../components';
import { APP_LANGUAGE_CONSTANT, SCREEN_NAME } from '../../constants';
import { useTranslation } from 'react-i18next';
import { View, Text } from 'react-native';
import { navigationRef } from '../../navigation/stackNavigation';
import { StackActions } from '@react-navigation/native';

export default function ReferralList({ navigation, route }) {
  const { t } = useTranslation();

  return (
    <Container
      onPressLeft={() => {
        navigationRef.dispatch(
          StackActions.replace(SCREEN_NAME.UNIVERSAL_STACK)
        );
      }}
      title={t(APP_LANGUAGE_CONSTANT.REFERRAL)}
    ></Container>
  );
}
