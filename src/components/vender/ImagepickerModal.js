import React from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Pressable,
  TouchableOpacity
} from 'react-native';
import { Colors, PAGE_SPACING, verticalScale, Fonts } from '../../theme';
import LinearGradient from 'react-native-linear-gradient';
import { useTranslation } from 'react-i18next';
import { APP_LANGUAGE_CONSTANT } from '../../constants';

function ImagePickerModal({
  type = 'Product ',
  isVisible,
  setVisibility,
  openCamera,
  openGallery
}) {
  const { t } = useTranslation();

  return (
    <Modal transparent visible={isVisible}>
      <View style={styles.container}>
        <Pressable style={styles.empty} onPress={() => setVisibility()} />
        <View style={styles.optionContainer}>
          <TouchableOpacity
            style={[styles.btnContainer]}
            onPress={() => openCamera()}
          >
            <LinearGradient
              colors={[Colors.orange10, Colors.orange30]}
              style={[styles.btn]}
            >
              <Text style={[styles.btnText]}>
                {t(APP_LANGUAGE_CONSTANT.CAPTURE_TYPE_IMAGE, {
                  type: type?.trim()
                })}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btnContainer]}
            onPress={() => openGallery()}
          >
            <LinearGradient
              colors={[Colors.orange10, Colors.orange30]}
              style={[styles.btn]}
            >
              <Text style={[styles.btnText]}>
                {t(APP_LANGUAGE_CONSTANT.CAPTURE_FROM_GALLERY)}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btnContainer]}
            onPress={() => setVisibility(false)}
          >
            <LinearGradient
              colors={[Colors.orange10, Colors.orange30]}
              style={[styles.btn]}
            >
              <Text style={[styles.btnText]}>
                {t(APP_LANGUAGE_CONSTANT.CANCEL)}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

export default ImagePickerModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  empty: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.white140
  },
  optionContainer: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingHorizontal: PAGE_SPACING,
    width: '100%',
    paddingVertical: verticalScale(16),
    paddingBottom: 32
  },
  btnContainer: {
    width: '100%',
    marginTop: verticalScale(16)
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 66,
    borderRadius: 20
  },
  btnText: {
    fontSize: Fonts.size.h20,
    fontFamily: Fonts.type.montserrat,
    fontWeight: Fonts.Weight.bold,
    color: Colors.white
  }
});
