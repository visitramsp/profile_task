import React, { Fragment } from 'react';
import { StyleSheet, Text, View, Modal } from 'react-native';
import CustSmallButton from '../../components/CustSmallButton';
import {
  ApplicationStyles,
  Colors,
  Fonts,
  horizontalScale,
  verticalScale
} from '../../theme';
import { DeleteModal } from '../../assets/icon';
import { useTranslation } from 'react-i18next';
import { APP_LANGUAGE_CONSTANT } from '../../constants';

export default function CommonModal({
  isLoading = false,
  handleSubmit,
  modalHeading = '',
  modalTitle = '',
  openModal = false,
  closeModal
}) {
  const { t } = useTranslation();

  const BUTTON_ARR = [
    {
      btnName: t(APP_LANGUAGE_CONSTANT.CANCEL),
      gradiantColor: true,
      loading: false
    },
    {
      btnName: t(APP_LANGUAGE_CONSTANT.DELETE),
      gradiantColor: false,
      loading: isLoading
    }
  ];
  return (
    <Fragment>
      <Modal
        transparent
        animationType="fade"
        visible={openModal}
        onRequestClose={openModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <View style={styles.delete}>
              <DeleteModal />
            </View>
            <View style={styles.heading}>
              <Text style={styles.title}>{modalHeading}</Text>
              <Text style={styles.title}>{modalTitle}</Text>
            </View>
            <View style={styles.buttonView}>
              {BUTTON_ARR?.map((item, index) => (
                <View key={index} style={styles.btnView}>
                  <CustSmallButton
                    containerStyle={styles.btn}
                    isLoading={item.loading}
                    btnTitle={item.btnName}
                    gradiantColor={item.gradiantColor}
                    onPress={() =>
                      index === 1 ? handleSubmit() : closeModal()
                    }
                  />
                </View>
              ))}
            </View>
          </View>
        </View>
      </Modal>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  btn: {
    width: '90%',
    alignSelf: 'center'
  },
  buttonView: {
    marginTop: verticalScale(20),
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  btnView: {
    width: horizontalScale(164)
  },
  delete: {
    marginTop: verticalScale(-10),
    shadowColor: Colors.red30,
    shadowOffset: {
      width: horizontalScale(0),
      height: verticalScale(12)
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24
  },
  heading: {
    marginTop: verticalScale(-15)
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: Colors.blackShadow
  },
  modalView: {
    width: '100%',
    height: verticalScale(250),
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: 'center'
  },
  title: {
    ...ApplicationStyles.mediumMontserratFont,
    fontSize: Fonts.size.medium,
    color: Colors.blue30,
    marginTop: verticalScale(0),
    textAlign: 'center',
    lineHeight: verticalScale(25)
  }
});
