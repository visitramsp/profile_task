import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import { TERM_ARR } from './CustomData';
import styles from './TermConditionModal.styles';
import { Colors, horizontalScale, verticalScale } from '../../theme';
import LinearGradient from 'react-native-linear-gradient';
import { useTranslation } from 'react-i18next';
import { APP_LANGUAGE_CONSTANT } from '../../constants';

const TermConditionModal = ({
  termAndCondition,
  setTermAndCondition,
  handleCheck
}) => {
  const { t } = useTranslation();
  return (
    <Modal
      isVisible={termAndCondition}
      // animationIn={'slideInUp'}
      // animationOut={'slideOutDown'}
      //   deviceHeight={300}
      // swipeDirection={['up', 'left', 'right', 'down']}
      // onBackdropPress={() => {
      //     setIsVisible(!isVisible)
      // }}
      // onBackButtonPress={() => {
      //     setIsVisible(!isVisible)
      // }}
      animationType="slide"
      style={styles.modalView}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.termConditionText}>
          {t(APP_LANGUAGE_CONSTANT.TERMS_AND_CONDITIONS)}
        </Text>

        <View style={{ paddingHorizontal: horizontalScale(24) }}>
          <Text style={styles.aqadMobileText}>
            AQAD Mobile Application Terms and Conditions:
          </Text>

          {TERM_ARR?.map((res, index) => {
            return (
              <View key={index}>
                {res?.id === 1 || res?.id === 13 || res?.id === 15 ? (
                  <View key={index}>
                    <Text style={styles.heading}>
                      {index + 1}. {res.title}{' '}
                    </Text>
                    <Text
                      style={[styles.desc, { marginTop: verticalScale(5) }]}
                    >
                      {res?.description}
                    </Text>
                  </View>
                ) : res?.id === 3 ? (
                  <View>
                    <Text style={styles.heading}>
                      {index + 1}. {res.title}
                    </Text>
                    <Text style={[styles.subHeading, styles.aqadMustText]}>
                      {res.description}
                    </Text>
                    {res?.arr?.map((item, ind) => (
                      <View key={ind} style={styles.termView}>
                        <View style={styles.dots} />
                        <Text
                          style={[
                            styles.desc,
                            { marginLeft: horizontalScale(10) }
                          ]}
                        >
                          {item}
                        </Text>
                      </View>
                    ))}
                  </View>
                ) : (
                  <>
                    <Text style={[styles.heading]}>
                      {index + 1}. {res?.title}
                    </Text>
                    <View style={{ marginTop: verticalScale(10) }}>
                      {res?.arr?.map((item, ind) => (
                        <View
                          key={ind}
                          style={[
                            styles.defineView,
                            ind > 0 && { marginTop: verticalScale(5) }
                          ]}
                        >
                          <View style={styles.dots} />
                          <Text style={styles.subHeading}>
                            {item.heading}
                            <Text style={[styles.desc]}>{item.desc}</Text>
                          </Text>
                        </View>
                      ))}
                    </View>
                  </>
                )}
              </View>
            );
          })}

          <View>
            <Text style={styles.heading}>17. Contact Information</Text>
            <Text style={[styles.desc, { marginTop: verticalScale(10) }]}>
              For any questions or concerns about these Terms, please contact
              AQAD support at{' '}
              <Text style={{ color: Colors.primary }}>info@aqad.ae</Text>.
            </Text>
            <Text style={[styles.desc, { marginVertical: verticalScale(15) }]}>
              By using AQAD, you acknowledge that you have read, understood, and
              agree to be bound by these Terms and Conditions.
            </Text>
          </View>

          <View style={styles.buttonView}>
            <TouchableOpacity
              onPress={() => {
                handleCheck(true);
                setTermAndCondition(false);
              }}
            >
              <LinearGradient
                style={[styles.buttonAddCart, styles.acceptButton]}
                colors={[Colors.orange10, Colors.orange30]}
              >
                <Text style={[styles.buttonText, { color: Colors.white }]}>
                  {t(APP_LANGUAGE_CONSTANT.ACCEPT_SMALL)}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setTermAndCondition(false)}>
              <LinearGradient
                style={styles.buttonAddCart}
                colors={[Colors.orange10, Colors.orange30]}
              >
                <View style={styles.addButton}>
                  <Text style={styles.buttonText}>
                    {t(APP_LANGUAGE_CONSTANT.DENY_SMALL)}
                  </Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
};
export default TermConditionModal;
