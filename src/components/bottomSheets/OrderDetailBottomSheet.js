import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { APP_LANGUAGE_CONSTANT } from '../../constants';
import {
  ApplicationStyles,
  cardRadius,
  Colors,
  Fonts,
  PAGE_SPACING,
  verticalScale
} from '../../theme';

export default function Deliveries({ ref, onClose }) {
  const { t } = useTranslation();

  // Define the snap points
  const snapPoints = useMemo(() => ['60%', '75%'], []);

  const handleSheetChanges = useCallback((index) => {}, []);

  const onAssignOrder = () => {
    onClose();
  };

  return (
    <SafeAreaView style={ApplicationStyles.flex1}>
      <BottomSheet
        enablePanDownToClose
        snapPoints={snapPoints}
        handleIndicatorStyle={styles.sheetHandleIndicator}
        backgroundStyle={styles.sheetBackground}
        ref={ref}
        // index={-1}
        onChange={handleSheetChanges}
      >
        <BottomSheetView style={styles.bottomSheetView}>
          <View style={styles.contentContainer}>
            <Text style={styles.orderDetailsText}>
              {t(APP_LANGUAGE_CONSTANT.ORDER_DETAILS)}
            </Text>

            <View style={styles.orderHeader}>
              <Text style={styles.orderIdText}>
                {t(APP_LANGUAGE_CONSTANT.ORDER_ID)} #2564712
              </Text>
              <TouchableOpacity style={styles.statusButton}>
                <Text style={styles.statusButtonText}>Pending</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>
                {t(APP_LANGUAGE_CONSTANT.PACKAGE_TYPE)}
              </Text>
              <Text style={styles.detailValue}>
                50 {t(APP_LANGUAGE_CONSTANT.CRATE)}
              </Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>
                {t(APP_LANGUAGE_CONSTANT.QUANTITY)}
              </Text>
              <Text style={styles.detailValue}>600</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>
                {t(APP_LANGUAGE_CONSTANT.DISTANCE)}
              </Text>
              <Text style={styles.detailValue}>
                15 {t(APP_LANGUAGE_CONSTANT.KM)}
              </Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>
                {t(APP_LANGUAGE_CONSTANT.ORDER_DATE)}
              </Text>
              <Text style={styles.detailValue}>16 September 2024</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>
                {t(APP_LANGUAGE_CONSTANT.ELAPSED_TIME)}
              </Text>
              <Text style={styles.detailValue}>
                {t(APP_LANGUAGE_CONSTANT.NA)}
              </Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>
                {t(APP_LANGUAGE_CONSTANT.DELIVERY_DATE)}
              </Text>
              <Text style={styles.detailValue}>8th July 2024</Text>
            </View>

            <View style={styles.divider} />

            <LinearGradient
              colors={[Colors.orange10, Colors.orange30]}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              style={styles.gradientButton}
            >
              <TouchableOpacity
                style={styles.assignOrderButton}
                onPress={onAssignOrder}
              >
                <Text style={styles.assignOrderText}>
                  {t(APP_LANGUAGE_CONSTANT.ASSIGN_ORDER)}
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sheetHandleIndicator: {
    backgroundColor: Colors.gray40,
    width: verticalScale(60),
    height: verticalScale(4),
    borderRadius: 3
  },
  sheetBackground: {
    borderRadius: verticalScale(35)
  },
  bottomSheetView: {
    flex: 1,
    paddingHorizontal: PAGE_SPACING
  },
  contentContainer: {
    flex: 1
  },
  orderDetailsText: {
    fontFamily: Fonts.type.montserrat,
    fontSize: Fonts.size.semi,
    fontWeight: Fonts.Weight.seven,
    color: Colors.black,
    marginTop: verticalScale(10)
  },
  orderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: verticalScale(10)
  },
  orderIdText: {
    fontFamily: Fonts.type.robotoMedium,
    fontWeight: Fonts.Weight.medium,
    fontSize: Fonts.size.uprSemi,
    color: Colors.orange10
  },
  statusButton: {
    backgroundColor: Colors.yellow20,
    paddingHorizontal: verticalScale(10),
    paddingVertical: verticalScale(4.5),
    borderRadius: verticalScale(8)
  },
  statusButtonText: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: Fonts.size.sminy,
    fontWeight: Fonts.Weight.low,
    color: Colors.white
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: verticalScale(15)
  },
  detailLabel: {
    fontFamily: Fonts.type.robotoRegular,
    fontWeight: Fonts.Weight.medium,
    fontSize: Fonts.size.small,
    color: Colors.gray20
  },
  detailValue: {
    fontFamily: Fonts.type.robotoRegular,
    fontWeight: Fonts.Weight.medium,
    fontSize: Fonts.size.small,
    color: Colors.gray20
  },
  divider: {
    borderBottomWidth: 1,
    marginTop: verticalScale(15),
    borderColor: Colors.gray40
  },
  gradientButton: {
    marginBottom: verticalScale(25),
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: cardRadius,
    marginTop: verticalScale(20)
  },
  assignOrderButton: {
    width: verticalScale(370),
    height: verticalScale(60),
    alignSelf: 'center',
    borderRadius: verticalScale(20),
    alignItems: 'center',
    justifyContent: 'center'
  },
  assignOrderText: {
    fontFamily: Fonts.type.montserrat,
    fontWeight: Fonts.Weight.semi,
    fontSize: Fonts.size.regular,
    color: Colors.white
  }
});
