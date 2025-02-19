import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import React, { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { DummySVG1, RadioFull, RadioBlank } from '../../assets/icon';
import { APP_LANGUAGE_CONSTANT } from '../../constants';
import {
  ApplicationStyles,
  Colors,
  Fonts,
  PAGE_SPACING,
  verticalScale
} from '../../theme';

const drivers = [
  {
    name: 'Darlene Robertson',
    icon: DummySVG1,
    vehicle: 'Mercedes-Benz (Large)',
    status: 'On Delivery',
    driverLicense: '2867-802714',
    phone: '971 585456520'
  },
  {
    name: 'Darlene Robertson',
    icon: DummySVG1,
    vehicle: 'Ford (Medium)',
    status: 'Offline',
    driverLicense: '2867-802714',
    phone: '971 585456520'
  },
  {
    name: 'Darlene Robertson',
    icon: DummySVG1,
    vehicle: 'Mercedes-Benz (Small)',
    status: 'Idle',
    driverLicense: '2867-802714',
    phone: '971 585456520'
  },
  {
    name: 'Darlene Robertson',
    icon: DummySVG1,
    vehicle: 'Nissan (Small)',
    status: 'Idle',
    driverLicense: '2867-802714',
    phone: '971 585456520'
  },
  {
    name: 'Darlene Robertson',
    icon: DummySVG1,
    vehicle: 'Nissan (Large)',
    status: 'Idle',
    driverLicense: '2867-802714',
    phone: '971 585456520'
  }
];

export default function Deliveries({ ref, onClose }) {
  const { t } = useTranslation();

  const [selectedItem, setSelectedItem] = useState(null);

  // Define the snap points
  const snapPoints = useMemo(() => ['87%', '80%'], []);

  const handleSheetChanges = useCallback((index) => {}, []);

  const onSelectItem = (item, index) => {
    setSelectedItem(index);
  };

  const renderItem = ({ item, index }) => {
    const { icon: Icon } = item;
    return (
      <TouchableOpacity
        style={[
          styles.render,
          {
            backgroundColor:
              selectedItem === index ? Colors.orange100 : Colors.white
          }
        ]}
        onPress={() => onSelectItem(item, index)}
      >
        <View style={styles.iconContainer}>
          <Icon height={verticalScale(70)} width={verticalScale(70)} />
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.driverName}>{item?.name}</Text>
          <Text style={styles.vehicleName}>{item?.vehicle}</Text>
          <Text style={styles.licenseContainer} numberOfLines={1}>
            {t(APP_LANGUAGE_CONSTANT.DL)} : {item?.driverLicense}{' '}
            <Text> | </Text>
            <Text style={styles.phoneText}>
              {t(APP_LANGUAGE_CONSTANT.PH)} : {item?.phone}
            </Text>
          </Text>
        </View>
        <View style={styles.statusContainer}>
          <Text
            style={[
              styles.statusText,
              {
                backgroundColor:
                  item?.status === 'Offline'
                    ? Colors.red20
                    : item?.status === 'Idle'
                    ? Colors.blue10
                    : Colors.green70
              }
            ]}
          >
            {item?.status}
          </Text>
          <View style={styles.radioContainer}>
            {selectedItem === index ? <RadioFull /> : <RadioBlank />}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  // eslint-disable-next-line react/no-unstable-nested-components
  const ListFooterComponent = () => {
    return (
      <View style={styles.footerContainer}>
        <TouchableOpacity style={styles.reportButton} onPress={() => onClose()}>
          <Text style={styles.closeButtonText}>
            {t(APP_LANGUAGE_CONSTANT.CLOSE)}
          </Text>
        </TouchableOpacity>
        <LinearGradient
          colors={[Colors.orange10, Colors.orange30]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.gradientButton}
        >
          <TouchableOpacity style={styles.downloadButton}>
            <Text style={styles.assignButtonText}>
              {t(APP_LANGUAGE_CONSTANT.ASSIGN)}
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    );
  };

  return (
    <SafeAreaView style={ApplicationStyles.flex1}>
      <BottomSheet
        enablePanDownToClose
        ref={ref}
        snapPoints={snapPoints}
        handleIndicatorStyle={styles.indicatorStyle}
        backgroundStyle={{
          borderRadius: verticalScale(35)
        }}
        onChange={handleSheetChanges}
      >
        <BottomSheetView style={ApplicationStyles.flex1}>
          <View style={ApplicationStyles.flex1}>
            <Text style={styles.title}>
              {t(APP_LANGUAGE_CONSTANT.SELECT_DRIVER)}{' '}
              <Text style={{ color: Colors.orange10 }}>({drivers.length})</Text>
            </Text>

            <FlatList
              style={styles.list}
              data={drivers}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
              ListFooterComponent={ListFooterComponent}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={{ marginTop: verticalScale(10) }}
            />
          </View>
        </BottomSheetView>
      </BottomSheet>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  },
  list: {
    flexGrow: 0
  },
  render: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: verticalScale(7),
    paddingHorizontal: verticalScale(20)
  },
  detailsContainer: {
    flex: 2.5,
    justifyContent: 'center',
    paddingLeft: verticalScale(6)
  },
  driverName: {
    flex: 1,
    fontFamily: Fonts.type.robotoMedium,
    fontWeight: Fonts.Weight.medium,
    fontSize: Fonts.size.semi,
    color: Colors.black70
  },
  vehicleName: {
    flex: 1,
    fontFamily: Fonts.type.robotoMedium,
    fontWeight: Fonts.Weight.medium,
    fontSize: Fonts.size.semi,
    color: Colors.gray10
  },
  licenseContainer: {
    fontFamily: Fonts.type.robotoMedium,
    fontWeight: Fonts.Weight.medium,
    fontSize: Fonts.size.tiny,
    color: Colors.gray20,
    marginBottom: verticalScale(7)
  },
  phoneText: {
    fontFamily: Fonts.type.robotoMedium,
    fontWeight: Fonts.Weight.medium,
    fontSize: Fonts.size.tiny,
    color: Colors.gray20
  },
  statusContainer: {
    flex: 0.9,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  statusText: {
    fontFamily: Fonts.type.robotoRegular,
    fontWeight: Fonts.Weight.low,
    fontSize: Fonts.size.s10,
    paddingVertical: verticalScale(4),
    paddingHorizontal: verticalScale(10),
    borderRadius: verticalScale(5),
    marginTop: verticalScale(8)
  },
  radioContainer: {
    alignSelf: 'flex-end',
    marginRight: verticalScale(10),
    marginBottom: verticalScale(7)
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: verticalScale(10),
    marginBottom: verticalScale(15),
    paddingHorizontal: verticalScale(20)
  },
  reportButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    borderRadius: verticalScale(15),
    paddingVertical: verticalScale(10),
    borderWidth: 1,
    borderColor: Colors.orange30,
    width: '48%'
  },
  closeButtonText: {
    fontFamily: Fonts.type.montserrat,
    fontWeight: Fonts.Weight.semi,
    fontSize: Fonts.size.f20,
    color: Colors.orange30
  },
  gradientButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.orange20,
    borderRadius: verticalScale(15),
    paddingVertical: verticalScale(10),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  downloadButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: verticalScale(15),
    width: '48%'
  },
  indicatorStyle: {
    backgroundColor: Colors.gray40,
    width: verticalScale(60),
    height: verticalScale(4),
    borderRadius: 3
  },
  assignButtonText: {
    fontFamily: Fonts.type.montserrat,
    fontWeight: Fonts.Weight.semi,
    fontSize: Fonts.size.f20,
    color: Colors.white
  },
  title: {
    fontFamily: Fonts.type.montserrat,
    fontSize: Fonts.size.semi,
    fontWeight: Fonts.Weight.seven,
    color: Colors.black,
    marginTop: verticalScale(10),
    marginLeft: PAGE_SPACING
  }
});
