import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { CheckBoxIcon, UAEFlag } from '../../../../assets/icon';
import {
  OtpPopup,
  TextInputFieldPaper,
  VerifyButton
} from '../../../../components';
import ItemCountText from '../../../../components/headers/ItemCountText';
import { APP_LANGUAGE_CONSTANT, AppConstant } from '../../../../constants';
import {
  userRegisterRequestOtp,
  userPhoneRequestOtp,
  userPhoneVerifyOtp
} from '../../../../store/auth/action';
import {
  sendEmailOtpToSubUser,
  verifySubUserEmailOtp
} from '../../../../store/vendor/action';
import {
  Colors,
  Fonts,
  horizontalScale,
  verticalScale
} from '../../../../theme';
import {
  showError,
  showToastError,
  toTitleCase,
  validateEmail,
  showToastSuccess
} from '../../../../utils';
import { colors } from 'react-native-swiper-flatlist/src/themes';
import Checkbox from '../../../../components/Checkbox';

const UserForm = ({
  handleSubmit, // Add handleSubmit to props
  permissionData,
  setPermissionData,
  isPhoneVerify,
  isEmailVerify,
  setEmailVerify,
  setPhoneVerify,
  setPassword,
  setDocID,
  selectedPermissions,
  setSelectedPermissions,
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  isUpdate = false,
  setIsActive = () => null,
  isActive = false
}) => {
  const { t } = useTranslation();

  const [openPopup, setOpenPopup] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [isPhoneLoader, setIsPhoneLoader] = useState(false);
  const [toggleBtn, setToggleBtn] = useState(false);
  const [isPhone, setIsPhone] = useState(false);

  const handleEmailVerify = () => {
    if (!values?.email) {
      return showToastError('Please enter your email address');
    }
    if (!validateEmail(values?.email)) {
      return showToastError('Please enter a valid email address');
    }

    setIsLoader(true);
    sendEmailOtpToSubUser(`?email=${values?.email}`)
      .then((res) => {
        setDocID(res?.data?.data?.doc_id);
        setPassword(res?.data?.data?.name);
        setOpenPopup(true);
      })
      .catch((err) => {
        showError(err);
      })
      .finally(() => setIsLoader(false));
  };

  const handleOtpVerify = (otp) => {
    verifySubUserEmailOtp(`?otp=${otp}&email=${values?.email}`)
      .then((res) => {
        setEmailVerify(true);
        setOpenPopup(false);
        setToggleBtn(false);
      })
      .catch((error) => {
        showError(error);
        setToggleBtn(false);
      })
      .finally(() => {
        // setOpenPopup(false)
      });
  };

  const handleCheckBox = useCallback(
    (item, index, ind) => {
      const updatedList = permissionData.map((e, i) =>
        i === index
          ? {
              ...e,
              value: e.value.map((res, indexTow) => {
                if (ind === indexTow) {
                  return { ...res, isSelected: !res?.isSelected };
                }
                return res;
              })
            }
          : e
      );
      setPermissionData(updatedList);

      const updatedPermissions = item.isSelected
        ? selectedPermissions.filter((uuid) => uuid !== item.uuid)
        : [...selectedPermissions, item.uuid];
      setSelectedPermissions(updatedPermissions);
    },
    [
      permissionData,
      selectedPermissions,
      setPermissionData,
      setSelectedPermissions
    ]
  );
  const renderPermissions = useCallback(
    ({ item, index }) => (
      // eslint-disable-next-line react-native/no-inline-styles

      <View>
        {index === 0 && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%'
            }}
          >
            <ItemCountText
              title={t(APP_LANGUAGE_CONSTANT.ROLES)}
              isnumberPresent={false}
            />
            <ItemCountText
              title={t(APP_LANGUAGE_CONSTANT.VIEW)}
              isnumberPresent={false}
            />
            <ItemCountText
              title={t(APP_LANGUAGE_CONSTANT.MANAGE)}
              isnumberPresent={false}
              // customStyle={{ color: 'red' }}
            />
          </View>
        )}
        <View style={[styles.cell, index === 0 && { marginTop: 10 }]}>
          <View style={{ width: horizontalScale(100) }}>
            <Text style={styles.role}>{toTitleCase(item.title)}</Text>
          </View>
          {item?.value?.map((res, ind) => (
            <View
              key={ind}
              style={{
                width: horizontalScale(115),
                justifyContent: 'center',
                alignItems: 'center',
                paddingRight: ind === 0 ? horizontalScale(33) : 0
              }}
            >
              <TouchableOpacity
                style={
                  res.isSelected ? styles.selectedCheckedBox : styles.checkedBox
                }
                onPress={() => handleCheckBox(res, index, ind)}
              >
                <CheckBoxIcon
                  height={verticalScale(12)}
                  width={verticalScale(12)}
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    ),
    [handleCheckBox]
  );

  const onPressSendOtp = async () => {
    if (values?.email) {
      setIsPhone(false);
      const queryParams = `?email=${values?.email}`;
      userRegisterRequestOtp(queryParams)
        .then((res) => {
          setDocID(res?.data?.data?.doc_id);
          setPassword(res?.data?.data?.name);
          setOpenPopup(true);
        })
        .catch((err) => {
          setIsLoader(false);
          showError(err);
        });
    }
  };

  const onPressSendPhoneOtp = async () => {
    if (!values?.email) {
      return showToastError('Please enter your email address');
    }
    if (!validateEmail(values?.email)) {
      return showToastError('Please enter a valid email address');
    }
    if (values?.phoneNo) {
      setIsPhoneLoader(true);
      const queryParams = `?email=${values.email}&phone=971${values?.phoneNo}`;
      userPhoneRequestOtp(queryParams)
        .then((response) => {
          showToastSuccess(response?.data?.message);
          setIsPhone(true);
          if (response?.data?.success) {
            setOpenPopup(true);
          } else {
            setOpenPopup(false);
          }
        })
        .catch((err) => {
          showError(err);
        })
        .finally(() => {
          setIsPhoneLoader(false);
        });
    } else {
      return showToastError('Please enter your phone number');
    }
  };

  const onPressPhoneOtpVerify = (otp) => {
    const queryParams = `?email=${values?.email}&otp=${otp}&phone=971${values?.phone}`;
    userPhoneVerifyOtp(queryParams)
      .then((response) => {
        setOpenPopup(false);
        setPhoneVerify(true);
      })
      .catch((error) => {
        showError(error);
      })
      .finally(() => {
        setToggleBtn(false);
        setIsPhone(false);
      });
  };

  return (
    <View style={styles.container}>
      <TextInputFieldPaper
        label={t(APP_LANGUAGE_CONSTANT.ENTER_USER_FULL_NAME)}
        value={values.fullname}
        errors={errors?.fullname}
        touched={touched.fullname}
        onChangeText={handleChange('fullname')}
        onBlur={handleBlur('fullname')}
      />
      <TextInputFieldPaper
        isDisable={isUpdate}
        label={t(APP_LANGUAGE_CONSTANT.ENTER_USER_EMAIL)}
        value={values?.email}
        errors={errors?.email}
        touched={touched.email}
        Icon={
          <VerifyButton
            verified={isUpdate ? isUpdate : isEmailVerify}
            btnTitle={t(APP_LANGUAGE_CONSTANT.VERIFY_SMALL)}
            isLoading={isLoader}
            onPress={handleEmailVerify}
            size="small"
          />
        }
        onChangeText={handleChange('email')}
        onBlur={handleBlur('email')}
      />
      <View style={styles.mobileContainer}>
        <TouchableOpacity style={styles.countryCode}>
          <UAEFlag />
          <Text style={styles.countryCodeText}>+971</Text>
        </TouchableOpacity>
        <View style={styles.contactContainer}>
          <TextInputFieldPaper
            isDisable={isUpdate}
            label={t(AppConstant.PHONE_FORMAT)}
            value={values?.phoneNo}
            errors={errors?.phoneNo}
            touched={touched.phoneNo}
            style={styles.input}
            Icon={
              <VerifyButton
                verified={values?.phoneNo?.length === 9 ? true : false}
                btnTitle={t(APP_LANGUAGE_CONSTANT.VERIFY_SMALL)}
                isLoading={isPhoneLoader}
                onPress={onPressSendPhoneOtp}
              />
            }
            keyboardType="number-pad"
            maxLength={9}
            onChangeText={handleChange('phoneNo')}
            onBlur={handleBlur('phoneNo')}
          />
        </View>
      </View>

      {isUpdate && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          <Text style={styles.statusText}>User Status : </Text>
          <Checkbox checked={isActive} onPress={() => setIsActive(!isActive)} />
        </View>
      )}

      <FlatList
        data={permissionData}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderPermissions}
        numColumns={1}
        horizontal={false}
        scrollEnabled={false}
      />

      {openPopup && (
        <OtpPopup
          type="email"
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
          email={values?.email}
          toggleBtn={toggleBtn}
          setToggleBtn={setToggleBtn}
          isPhone={isPhone}
          onPressSendOtp={onPressSendOtp}
          onPressOtpVerify={handleOtpVerify}
          onPressSendPhoneOtp={onPressSendPhoneOtp}
          onPressPhoneOtpVerify={onPressPhoneOtpVerify}
        />
      )}
    </View>
  );
};

export default UserForm;

const styles = StyleSheet.create({
  container: {
    gap: verticalScale(16)
  },
  cell: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    paddingVertical: verticalScale(8)
  },
  mobileContainer: {
    flexDirection: 'row'
  },
  selectedCheckedBox: {
    height: verticalScale(20),
    width: verticalScale(20),
    borderRadius: verticalScale(4),
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center'
  },
  checkedBox: {
    height: verticalScale(20),
    width: verticalScale(20),
    borderRadius: verticalScale(4),
    backgroundColor: Colors.white,
    borderWidth: verticalScale(0.5),
    justifyContent: 'center',
    alignItems: 'center'
  },
  role: {
    fontSize: Fonts.size.uprSemi,
    fontFamily: Fonts.type.robotoRegular,
    color: Colors.black70,
    flex: 1, // Take up remaining space to align text properly
    flexWrap: 'wrap' // Allow text to wrap if it’s too long
  },
  columnWrapper: {
    justifyContent: 'space-between' // Distribute columns evenly
  },
  input: {
    fontFamily: Fonts.type.robotoBold,
    fontSize: Fonts.size.h20,
    color: Colors.black70,
    width: '65.5%',
    height: verticalScale(66)
  },
  contactContainer: {
    width: '93%',
    marginLeft: horizontalScale(15),
    marginTop: verticalScale(1)
  },
  countryCode: {
    flexDirection: 'row',
    height: verticalScale(66),
    borderWidth: 1,
    borderColor: Colors.gray10,
    borderRadius: 20,
    padding: verticalScale(12),
    alignItems: 'center',
    maxWidth: 120
  },
  countryCodeText: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: Fonts.size.h20,
    color: Colors.black70
  },
  statusText: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: Fonts.size.uprSemi,
    color: Colors.black70,
    marginTop: 8,
    marginRight: 20
  }
});
