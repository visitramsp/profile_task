import React from 'react';
import {
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import { Colors, Fonts, horizontalScale, verticalScale } from '../../../theme';
import ApplicationStyles, {
  PAGE_SPACING
} from '../../../theme/ApplicationStyles';
import { useTranslation } from 'react-i18next';

export default function MaterialArray({
  setSelectMaterial,
  materialArray,
  selectedDisable,
  availableMaterials,
  selectMaterial,
  variantTwoTitle = ''
}) {
  const { t } = useTranslation();
  const materialSelect = (item) => {
    setSelectMaterial && setSelectMaterial(item?.material_value);
  };

  const itemSeparatorComponent = () => (
    <View style={{ width: horizontalScale(12) }} />
  );

  const renderItem = ({ item, index }) => {
    const isSelected = item?.material_value === selectMaterial;
    const data = availableMaterials.find(
      (item1) => item1.variant2.value === item?.material_value
    );
    const isDisabled =
      Number(data?.minimum_order_quantity) >
      Number(data?.total_available_quantity)
        ? true
        : false;
    return (
      <TouchableOpacity
        style={[
          styles.btn,
          isSelected && styles.selectedBtn,
          isDisabled && ApplicationStyles.disabled
        ]}
        onPress={() => {
          materialSelect(item), selectedDisable(isDisabled);
        }}
      >
        <Text style={[styles.txt, isSelected && styles.selectedTxt]}>
          {item?.material_value}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      {variantTwoTitle && (
        <Text style={styles.contentTxt}>
          {`${variantTwoTitle?.[0]?.toUpperCase()}${variantTwoTitle?.slice(1)}`}
        </Text>
      )}

      {materialArray?.[0]?.material_value !== null && (
        <FlatList
          horizontal
          data={materialArray}
          bounces={false}
          style={styles.listContainer}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={itemSeparatorComponent}
          contentContainerStyle={styles.contentContainerStyle}
          renderItem={renderItem}
          keyExtractor={(item, index) =>
            item?.id?.toString() || index.toString()
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  contentTxt: {
    ...ApplicationStyles.mediumMontserratFont,
    fontWeight: Fonts.Weight.seven,
    color: Colors.black90,
    marginTop: verticalScale(20),
    marginBottom: verticalScale(10),
    marginLeft: PAGE_SPACING
  },
  txt: {
    fontSize: Fonts.size.sminy,
    fontFamily: Fonts.type.robotoRegular,
    color: Colors.black50
  },
  btn: {
    ...ApplicationStyles.centerView,
    minWidth: horizontalScale(56),
    paddingHorizontal: horizontalScale(5),
    height: verticalScale(40),
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.black50 + 68
  },
  listContainer: {},
  contentContainerStyle: {
    paddingHorizontal: PAGE_SPACING
  },
  selectedBtn: {
    backgroundColor: Colors.orange10,
    borderColor: Colors.orange10
  },
  selectedTxt: {
    color: Colors.white
  }
});
