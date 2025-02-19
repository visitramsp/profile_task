import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ButtonComp, Container } from '../../../components';
import {
  ApplicationStyles,
  Colors,
  Fonts,
  verticalScale
} from '../../../theme';
import { APP_LANGUAGE_CONSTANT, SCREEN_NAME } from '../../../constants';
import { useTranslation } from 'react-i18next';
import { navigationRef } from '../../../navigation/stackNavigation';

const UniversalKeyInfoScreen = ({ route }) => {
  const { item } = route?.params;
  const { t } = useTranslation();
  const pointsArray = item?.key_description?.split(/(?=\d\.)/);
  const footerArray = item?.footer?.split(/(?=\d\.)/);
  const [label, content] = item?.description?.split(/:(.*)/);
  return (
    <Container title={item?.h1}>
      <View style={{ marginBottom: verticalScale(80) }}>
        {item?.description && (
          <View>
            <Text style={styles.title}>{content}</Text>
          </View>
        )}
        {pointsArray?.length > 0 && (
          <Text style={styles.keyDescription}>
            {t(APP_LANGUAGE_CONSTANT.KEY_DESCRIPTION)}
          </Text>
        )}
        {pointsArray?.map((point, index) => {
          const [title, description] = point?.split(/:(.*)/);

          return (
            <View key={index} style={styles.pointContainer}>
              <Text style={styles.pointsArray}>
                {title?.trim()} :{' '}
                <Text style={styles.arrayDis}>{description?.trim()}</Text>
              </Text>
            </View>
          );
        })}
        {footerArray?.length > 0 && (
          <Text style={styles.keyDescription}>
            {t(APP_LANGUAGE_CONSTANT.FOOTER)}
          </Text>
        )}
        {footerArray?.map((point, index) => {
          const [title, description] = point?.split(/:(.*)/);

          return (
            <View key={index} style={styles.pointContainer}>
              <Text style={styles.pointsArray}>
                {title?.trim()} :{' '}
                <Text style={styles.arrayDis}>{description?.trim()}</Text>
              </Text>
            </View>
          );
        })}
        <View style={styles.btnContainer}>
          <ButtonComp
            btnTitle={t(APP_LANGUAGE_CONSTANT?.LEST_GO)}
            onPress={() =>
              navigationRef.navigate(SCREEN_NAME.AUTH_STACK, {
                screen: SCREEN_NAME.LOGIN
              })
            }
          />
        </View>
      </View>
    </Container>
  );
};

export default UniversalKeyInfoScreen;

const styles = StyleSheet.create({
  title: {
    ...ApplicationStyles.smallRobotoFont,
    fontWeight: Fonts.Weight.low,
    color: Colors.black110,
    textAlign: 'justify',
    fontSize: Fonts.size.small,
    lineHeight: 19,
    marginVertical: verticalScale(5)
  },
  btnContainer: { marginVertical: verticalScale(20) },
  pointsArray: {
    ...ApplicationStyles.smallRobotoFont,
    fontWeight: Fonts.Weight.low,
    color: Colors.black110,
    textAlign: 'justify',
    fontSize: Fonts.size.small,
    lineHeight: 19,
    marginVertical: verticalScale(2)
  },
  arrayDis: {
    ...ApplicationStyles.smallRobotoFont,
    fontWeight: Fonts.Weight.low,
    color: Colors.gray100,
    textAlign: 'justify',
    fontSize: Fonts.size.small,
    lineHeight: 19,
    marginVertical: verticalScale(2)
  },
  keyDescription: {
    marginTop: verticalScale(15),
    marginBottom: verticalScale(5),
    fontFamily: Fonts.type.poppinsSemiBold,
    fontWeight: Fonts.Weight.semi,
    color: Colors.primary,
    fontSize: Fonts.size.uprSemi,
    textAlign: 'center'
  }
});
