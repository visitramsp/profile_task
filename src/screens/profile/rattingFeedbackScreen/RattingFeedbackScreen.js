import { Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import Modal from 'react-native-modal';
import { useTranslation } from 'react-i18next';
import { ApplicationStyles, Colors, verticalScale } from '../../../theme';
import styles from './RattingFeedbackScreen.styles';
import { StarNormal } from '../../../assets/icon';
import { TextInputFieldPaper } from '../../../components';
import { APP_LANGUAGE_CONSTANT } from '../../../constants';
import CustSmallButton from '../../../components/CustSmallButton';
import { RattingFeedbackSchema } from '../../../schemas/RattingFeedbackSchema';
import { reviewAndFeedback } from '../../../store/vendor/action';
import { showError, showToastSuccess } from '../../../utils';

const RattingFeedbackScreen = ({
  openPopup = true,
  setOpenPopup,
  navigation
}) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const [ratings, setRatings] = useState(Array(RAT_ARR?.length).fill(0));
  const RATTING_NUM = [1, 2, 3, 4, 5];

  const handleRating = (index, ratingValue) => {
    const updatedRatings = [...ratings];
    updatedRatings[index] = ratingValue;
    setRatings(updatedRatings);
  };

  const RAT_ARR = [
    {
      title: t(APP_LANGUAGE_CONSTANT.ORDER_RATTING),
      desc: t(APP_LANGUAGE_CONSTANT.RATTING_DESCRIPTION)
    },
    {
      title: t(APP_LANGUAGE_CONSTANT.SUPPLIER_RATTING),
      desc: t(APP_LANGUAGE_CONSTANT.RATTING_DESCRIPTION)
    },
    {
      title: t(APP_LANGUAGE_CONSTANT.LOGISTIC_RATTING),
      desc: t(APP_LANGUAGE_CONSTANT.RATTING_DESCRIPTION)
    }
  ];

  const initialValues = {
    feedback: ''
  };
  let formik = useFormik({
    initialValues,
    validationSchema: RattingFeedbackSchema,
    onSubmit: async (values, action) => {
      // setIsLoading(true);

      const reqBody = {
        OI_ID: '1',
        fieldExecutiveId: '',
        vendorId: '1',
        vendorRating: '1',
        logisticRating: '1',
        review: values?.feedback
      };
      reviewAndFeedback(reqBody)
        .then((response) => {
          setIsLoading(false);
          showToastSuccess(response?.data?.message);
          action.resetForm();
          navigation.goBack();
        })
        .catch((error) => {
          setIsLoading(false);
          showError(error);
        });
    }
  });
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    formik;

  return (
    <Modal
      avoidKeyboard
      isVisible={openPopup}
      backdropColor={Colors.black}
      backdropOpacity={0.8}
      animationIn="fadeIn"
      animationOut="fadeOut"
      style={styles.container}
      onBackdropPress={() => setOpenPopup(false)}
    >
      <View style={styles.mainView}>
        {RAT_ARR?.map((item, index) => (
          <View key={index} style={styles.orderView}>
            <Text style={styles.orderTitle}>{item.title}</Text>
            <Text style={styles.orderDescription}>{item.desc}</Text>
            <View style={styles.rattingView}>
              {RATTING_NUM.map((num) => (
                <TouchableOpacity
                  key={num}
                  onPress={() => handleRating(index, num)}
                >
                  {ratings[index] >= num ? (
                    <StarNormal style={{ color: Colors.orange10 }} />
                  ) : (
                    <StarNormal style={{ color: Colors.gray10 }} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        <TextInputFieldPaper
          multiline
          label={t(APP_LANGUAGE_CONSTANT.FEEDBACK)}
          underlineStyle={ApplicationStyles.dNone}
          value={values.feedback}
          errors={errors.feedback}
          touched={touched.feedback}
          numberOfLines={3}
          containerStyle={{ height: verticalScale(0) }}
          onChangeText={handleChange('feedback')}
          onBlur={handleBlur('feedback')}
        />

        <View style={styles.buttonView}>
          <CustSmallButton
            isLoading={isLoading}
            btnTitle={t(APP_LANGUAGE_CONSTANT.SUBMIT_SMALL)}
            gradiantColor={false}
            onPress={handleSubmit}
          />
        </View>
      </View>
    </Modal>
  );
};

export default RattingFeedbackScreen;
