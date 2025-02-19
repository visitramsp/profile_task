import { FlatList, Platform, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { ButtonComp, Container, SelectDropdown } from '../../../components';
import { useTranslation } from 'react-i18next';
import { APP_LANGUAGE_CONSTANT, SCREEN_NAME } from '../../../constants';
import {
  POLICY_ARR,
  POLICY_DROPDOWN_ARR,
  POLICY_OBJ
} from '../../termConditionModal/CustomData';
import {
  ApplicationStyles,
  Colors,
  Fonts,
  height,
  horizontalScale,
  verticalScale,
  width
} from '../../../theme';
import Checkbox from '../../../components/Checkbox';
import LoadingIndicator from '../../../components/common/LoadingIndicator';
import { deleteOwnAccount } from '../../../store/vendor/action';
import { showError, showToastSuccess, STORAGE_KEY } from '../../../utils';
import { StackActions, useNavigation } from '@react-navigation/native';
import { navigationRef } from '../../../navigation/stackNavigation';
import { removeFromAsync } from '../../../services';
import { store } from '../../../store/Store';
import { setUserDetail } from '../../../store/user/reducer';
const isPlatform = Platform.OS === 'android';
const DeleteAccountScreen = () => {
  const { t } = useTranslation();

  const [checked, setChecked] = useState(false);
  const [reason, setreason] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const _renderItem = ({ item, index }) => {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          {item?.id}.{item?.title + ' : '}
          <Text style={styles.description}>{item?.description}</Text>
        </Text>
        {item?.subTitle &&
          item?.subTitle?.map((j, i) => {
            return (
              <View key={i} style={styles.subTitle}>
                <View style={styles.dotView} />
                <Text style={styles.titleText}>{j}</Text>
              </View>
            );
          })}
      </View>
    );
  };

  const deleteAccount = () => {
    try {
      setLoading(true);
      let obj = {
        reason: reason
      };
      deleteOwnAccount(obj)
        .then((response) => {
          setLoading(false);
          showToastSuccess(response?.data?.message);
          removeFromAsync(STORAGE_KEY);
          store.dispatch(setUserDetail({}));
          navigationRef.dispatch(
            StackActions.replace(SCREEN_NAME.UNIVERSAL_STACK)
          );
        })
        .catch((error) => {
          setLoading(false);
          showError(error?.response?.data?.message);
        });
    } catch (error) {
      setLoading(false);
      showError(error?.response?.data?.message);
    }
  };

  return (
    <Container title={t(APP_LANGUAGE_CONSTANT.DELETE_ACCOUNT)}>
      <LoadingIndicator visible={loading} />
      <View style={styles.deleteCon}>
        <Text style={styles.deleteAccount}>{POLICY_OBJ?.deleteAccount}</Text>
        <Text style={styles.deleteMyAccount}>
          {POLICY_OBJ?.deleteMyAccount}
        </Text>
      </View>
      <SelectDropdown
        placeholder={t(APP_LANGUAGE_CONSTANT.SELECT_REASON)}
        data={POLICY_DROPDOWN_ARR}
        onChange={(item) => {
          setreason(item.title);
        }}
      />
      <View>
        <Text style={styles.pleaseReadTerm}>{POLICY_OBJ?.pleaseReadTerm}</Text>
        <Text style={styles.termAndConditions}>
          {POLICY_OBJ?.termAndConditions}
        </Text>
        <FlatList
          data={POLICY_ARR}
          renderItem={_renderItem}
          keyExtractor={(item, index) => index?.toString()}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
        />
      </View>
      <View style={styles.termsView}>
        <Checkbox checked={checked} onPress={() => setChecked(!checked)} />
        <Text style={[styles.aqadText, { marginTop: verticalScale(15) }]}>
          {POLICY_OBJ?.readTermCondition}
        </Text>
        {/* */}
      </View>
      <View>
        <Text style={[styles.termsText, { marginTop: verticalScale(15) }]}>
          {POLICY_OBJ?.takeMinutes}
        </Text>
      </View>
      <View
        style={[
          styles.button,
          !(checked && reason?.length > 0) && ApplicationStyles.disabled
        ]}
      >
        <ButtonComp
          disabled={!(checked && reason?.length > 0)}
          isLoading={loading}
          btnTitle={t(APP_LANGUAGE_CONSTANT.DELETE_YOUR_ACCOUNT)}
          onPress={deleteAccount}
        />
      </View>
    </Container>
  );
};

export default DeleteAccountScreen;

const styles = StyleSheet.create({
  container: {
    marginVertical: verticalScale(3)
  },
  button: {
    marginTop: verticalScale(10),
    marginBottom: verticalScale(100)
  },
  deleteCon: { marginVertical: verticalScale(8) },
  aqadText: {
    color: Colors.black5,
    fontFamily: Fonts.type.robotoRegular,
    fontWeight: Fonts.Weight.low,
    fontSize: Fonts.size.ten,
    paddingLeft: horizontalScale(6),
    marginTop: verticalScale(15)
  },
  termsText: {
    color: Colors.black5,
    fontFamily: Fonts.type.robotoRegular,
    fontWeight: Fonts.Weight.bold,
    fontSize: Fonts.size.ten,
    marginTop: verticalScale(15)
  },
  termsView: {
    marginTop: verticalScale(20),
    flexDirection: 'row',
    alignItems: 'center'
  },
  // eslint-disable-next-line react-native/no-unused-styles
  btn: {
    position: 'absolute',
    width: width,
    bottom: height * 0.18,
    alignSelf: 'center'
  },
  subTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    fontFamily: Fonts.type.robotoMedium
  },
  // eslint-disable-next-line react-native/no-unused-styles
  buttomPadding: { paddingBottom: verticalScale(250) },
  titleText: {
    fontSize: isPlatform ? Fonts.size.tiny : Fonts.size.tiny,
    fontWeight: Fonts.Weight.low,
    fontFamily: Fonts.type.robotoMedium,
    lineHeight: Platform.OS === 'android' ? Fonts.size.f22 : Fonts.size.f26
  },
  dotView: {
    backgroundColor: Colors.black,
    height: verticalScale(5),
    width: verticalScale(5),
    borderRadius: 20,
    marginHorizontal: horizontalScale(5)
  },
  description: {
    fontSize: isPlatform ? Fonts.size.sminy : Fonts.size.medium,
    fontWeight: Fonts.Weight.low,
    color: Colors.gray100,
    fontFamily: Fonts.type.robotoMedium,
    lineHeight: isPlatform ? Fonts.size.f22 : Fonts.size.f26
  },
  title: {
    fontSize: isPlatform ? Fonts.size.sminy : Fonts.size.medium,
    fontWeight: Fonts.Weight.bold,
    color: Colors.black,
    fontFamily: Fonts.type.robotoMedium,
    lineHeight: Fonts.size.f26
  },
  termAndConditions: {
    fontSize: isPlatform ? Fonts.size.sminy : Fonts.size.medium,
    marginVertical: verticalScale(3),
    lineHeight: isPlatform ? Fonts.size.f22 : Fonts.size.f26,
    fontFamily: Fonts.type.robotoMedium,
    color: Colors.gray100
  },
  pleaseReadTerm: {
    fontSize: Fonts.size.medium,
    marginVertical: verticalScale(3),
    marginTop: verticalScale(10),
    color: Colors?.black,
    fontFamily: Fonts.type.robotoMedium
  },
  deleteAccount: {
    fontSize: Fonts.size.uprSemi,
    fontFamily: Fonts.type.robotoMedium
  },
  deleteMyAccount: {
    fontSize: Fonts.size.medium,
    marginVertical: verticalScale(5),
    fontFamily: Fonts.type.robotoMedium
  }
});
