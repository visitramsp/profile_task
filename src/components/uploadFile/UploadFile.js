import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  LayoutAnimation
} from 'react-native';
import {
  ApplicationStyles,
  Colors,
  Fonts,
  horizontalScale,
  verticalScale
} from '../../theme';
import { Doc, Document, Trash } from '../../assets/icon';
import { useTranslation } from 'react-i18next';
import { APP_LANGUAGE_CONSTANT } from '../../constants';
import { IMG_UPLOAD_SIZE_LIMIT } from '../../constants/AppConstant';

// eslint-disable-next-line complexity
const UploadFile = ({ onPress, value, UploadTitle, rightPress, errors }) => {
  const { t } = useTranslation();
  const [isUploaded, setIsUploaded] = useState(false);

  useEffect(() => {
    value?.name?.length > 0 &&
      (setIsUploaded(true),
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut));
  }, [value]);

  return (
    <View>
      {value ? (
        <View style={styles.documentContainer}>
          <View style={[styles.titleContainer]}>
            <View style={[ApplicationStyles.rowAlignCenter, styles.fileName]}>
              <Doc />
              <View
                style={[
                  ApplicationStyles.flex1,
                  { paddingLeft: horizontalScale(10) }
                ]}
              >
                <Text numberOfLines={1} style={styles.fileNameText}>
                  {value?.name}
                </Text>
                <Text style={styles.fileSize}>{`${(
                  value?.size / 1000000
                )?.toFixed(1)} MB`}</Text>
              </View>
            </View>

            <TouchableOpacity
              activeOpacity={0.5}
              style={{ paddingLeft: horizontalScale(20) }}
              onPress={rightPress}
            >
              {isUploaded && <Trash />}
            </TouchableOpacity>
          </View>
          {isUploaded && (
            <View style={ApplicationStyles.rowAlignCenter}>
              <Text style={styles.viewText}>
                {t(APP_LANGUAGE_CONSTANT.CLICK_TO_VIEW)}
              </Text>
            </View>
          )}
        </View>
      ) : (
        <TouchableOpacity
          style={[styles.documentContainer, ApplicationStyles.centerView]}
          activeOpacity={0.5}
          onPress={onPress}
        >
          <Document />
          <Text style={styles.documentTitle}>{t(UploadTitle)}</Text>
        </TouchableOpacity>
      )}

      {value ? null : (
        <View>
          <Text style={styles.documentCaution}>
            {t(APP_LANGUAGE_CONSTANT.MAXFILE_SIZE_LABEL, {
              size: IMG_UPLOAD_SIZE_LIMIT
            })}
          </Text>
          {errors && <Text style={styles.error}>{errors}</Text>}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  error: {
    color: Colors.red,
    paddingLeft: verticalScale(8),
    paddingTop: verticalScale(2),
    fontSize: 12,
    marginTop: verticalScale(4)
  },
  documentContainer: {
    borderWidth: 1,
    borderColor: Colors.primary40,
    borderStyle: 'dashed',
    marginTop: verticalScale(15),
    height: verticalScale(99),
    borderRadius: 20,
    paddingHorizontal: horizontalScale(20),
    paddingVertical: verticalScale(13.5)
  },
  documentTitle: {
    paddingTop: verticalScale(10),
    fontFamily: Fonts.type.robotoRegular,
    fontSize: Fonts.size.semi,
    fontWeight: Fonts.Weight.low,
    color: Colors.blue30
  },
  documentCaution: {
    paddingTop: verticalScale(10),
    fontFamily: Fonts.type.robotoRegular,
    fontSize: Fonts.size.small,
    fontWeight: Fonts.Weight.low,
    color: Colors.grey
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  fileName: {
    flex: 1,
    alignItems: 'flex-start'
  },
  fileNameText: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: Fonts.size.medium,
    fontWeight: Fonts.Weight.medium,
    color: Colors.black90
  },
  fileSize: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: Fonts.size.sminy,
    fontWeight: Fonts.Weight.lower,
    color: Colors.grey10,
    paddingTop: verticalScale(3)
  },
  viewText: {
    color: Colors.primary40,
    fontFamily: Fonts.type.robotoRegular,
    fontSize: Fonts.size.medium,
    fontWeight: Fonts.Weight.semi,
    paddingLeft: horizontalScale(28)
  }
});

export default UploadFile;
