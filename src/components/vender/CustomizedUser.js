import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import {
  Fonts,
  Colors,
  verticalScale,
  horizontalScale,
  ApplicationStyles
} from '../../theme';
import { UAELogo } from '../../assets/icon';
import { AppConstant } from '../../constants';
import { VendorRegisterSchema } from '../../schemas/VendorRegisterSchema';
import { useFormik } from 'formik';
import { ButtonComp, Container, TextInputFieldPaper } from '..';
import { postReferUser } from '../../store/vendor/action';
import { showError, showToastSuccess } from '../../utils';

const CustomizedUser = ({ navigation, route }) => {
  const { screenName, header, subHeader, nameLable, emailLable } =
    route?.params;
  const [isLoading, setIsLoading] = useState(false);

  const inputFields = [
    { id: 1, name: nameLable, field: 'name' },
    { id: 2, name: emailLable, field: 'email' },
    { id: 3, name: AppConstant.PHONE_FORMAT, field: 'phone' }
  ];

  const { setFieldValue, values, errors, touched, handleSubmit } = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: ''
    },
    validationSchema: VendorRegisterSchema,
    onSubmit: (values) => {
      const obj = {
        name: values?.name,
        email: values?.email,
        phoneNumber: values?.phone
      };
      setIsLoading(true);
      postReferUser(obj)
        .then((res) => {
          setIsLoading(false);
          showToastSuccess(res?.response?.data?.message || res?.message);
          navigation.goBack();
        })
        .catch((err) => {
          setIsLoading(false);
          showError(err);
        });
    }
  });

  const handleChange = (index, field, value) => {
    setFieldValue(field, value);
  };

  return (
    <Container title={screenName}>
      <View style={styles.container}>
        <Text
          style={[ApplicationStyles.normalMontserratFont, styles.headerText]}
        >
          {header}
        </Text>
        <Text style={styles.subheaderText}>{subHeader}</Text>

        <View style={{}}>
          {inputFields.map((res, index) => (
            <View
              key={res.id}
              style={[index === 2 ? styles.mainViewFirst : styles.inputView]}
            >
              {index === 2 ? (
                <View style={styles.countryInputContainer}>
                  <View style={styles.country}>
                    <UAELogo
                      width={horizontalScale(35)}
                      height={verticalScale(35)}
                    />
                    <Text style={styles.countryText}>
                      {AppConstant.UAE_CODE}
                    </Text>
                  </View>
                  <View style={styles.countryTextInputView}>
                    <TextInput
                      maxLength={9}
                      style={styles.countryTextInput}
                      placeholder={AppConstant.PHONE_FORMAT}
                      onChangeText={(text) =>
                        handleChange(index, res.field, text)
                      }
                    />
                  </View>
                </View>
              ) : (
                <View style={[res.id === 3 ? styles.phoneNumberView : {}]}>
                  <TextInputFieldPaper
                    label={res?.name}
                    underlineStyle={ApplicationStyles.dNone}
                    value={values[res?.field]}
                    errors={errors[res?.field]}
                    touched={touched[res?.field]}
                    onChangeText={(text) =>
                      handleChange(index, res.field, text)
                    }
                  />
                </View>
              )}
            </View>
          ))}
        </View>

        <ButtonComp
          btnTitle="Send Request"
          isLoading={isLoading}
          onPress={handleSubmit}
        />
      </View>
    </Container>
  );
};

export default CustomizedUser;

const styles = StyleSheet.create({
  container: {
    gap: verticalScale(16)
  },
  headerText: {
    fontSize: Fonts.size.f25,
    // fontFamily: Fonts.type.montserrat,
    fontWeight: Fonts.Weight.full,
    color: Colors.black50
  },
  subheaderText: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: Fonts.size.f25,
    color: Colors.gray60,
    lineHeight: verticalScale(29.3)
  },
  countryInputContainer: {
    ...ApplicationStyles.rowAlignCenter,
    alignItems: 'flex-start',
    height: 60,
    flex: 1
  },
  country: {
    ...ApplicationStyles.rowAlignCenter,
    borderWidth: 1,
    borderColor: Colors.custonLightGray,
    borderRadius: verticalScale(20),
    overflow: 'hidden',
    paddingHorizontal: horizontalScale(10),
    height: 57
  },
  countryText: {
    paddingLeft: horizontalScale(10),
    fontFamily: Fonts.type.robotoRegular,
    fontSize: Fonts.size.h20,
    color: Colors.black80
  },
  countryTextInputView: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.custonLightGray,
    borderRadius: verticalScale(20),
    paddingHorizontal: horizontalScale(15),
    height: 57,
    marginLeft: horizontalScale(10),
    flexDirection: 'row',
    alignItems: 'center'
  },
  countryTextInput: {
    ...ApplicationStyles.flex1,
    fontFamily: Fonts.type.robotoRegular,
    fontSize: Fonts.size.h20,
    color: Colors.black80,
    height: 57
  },
  mainViewFirst: {
    marginTop: verticalScale(15),
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputView: {
    marginTop: verticalScale(15)
  },
  phoneNumberView: {
    flex: 1,
    marginLeft: horizontalScale(10)
  }
});
