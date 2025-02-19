/* eslint-disable react/jsx-boolean-value */
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, verticalScale, Fonts, horizontalScale } from '../../../theme';
import { ColoredLocation, LightRedTrash } from '../../../assets/icon';
import ItemCountText from '../../../components/headers/ItemCountText';
import { actions } from './AddVariantState';
import { SelectMultiDropdown } from '../../../components';
import { AppConstant } from '../../../constants';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const WareHouse = ({ state, dispatch }) => {
  const { t } = useTranslation();
  const wareHouseList = useSelector((state) => state.user.userDetail.addresses);

  return (
    <View>
      <ItemCountText title={'Warehouse'} number={state.warehouse.length} />
      <SelectMultiDropdown
        style={styles.commonHeight}
        disable={state.combinations?.length > 0 ? false : true}
        data={wareHouseList}
        uuid={state.warehouse}
        placeholderText={t(AppConstant.SELECTED_RETAILER_PLACEHOLDER)}
        isProductEdit={false}
        state={state}
        dispatch={dispatch}
        isMultiSelect={true}
        onchange={(item) => {
          dispatch({
            type: actions.warehouse,
            payload: item
          });
          dispatch({
            type: 'UPDATE_WAREHOUSE_FOR_ALL',
            payload: item
          });
        }}
        renderSelectedItem={(item, unSelect) => (
          <View
            key={item?.id}
            style={[styles.warehouse, { backgroundColor: Colors.lightOrange2 }]}
          >
            <ColoredLocation />
            <Text style={styles.address} numberOfLines={2}>
              {item?.address}
            </Text>
            <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
              <LightRedTrash />
            </TouchableOpacity>
          </View>
        )}
      />

      {state?.warehouse?.length === 0 && (
        <Text style={styles.errorText}>{'Field is required'}</Text>
      )}
    </View>
  );
};

export default WareHouse;

const styles = StyleSheet.create({
  address: {
    fontFamily: Fonts.type.robotoMedium,
    fontSize: Fonts.size.semi,
    color: Colors.orange30,
    flex: 1,
    flexWrap: 'wrap'
  },
  commonHeight: {
    height: verticalScale(52)
  },
  errorText: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: Fonts.size.small,
    color: Colors.red,
    paddingTop: verticalScale(5)
  },
  warehouse: {
    flexDirection: 'row',
    width: '100%',
    gap: horizontalScale(8),
    backgroundColor: Colors.white,
    borderRadius: verticalScale(20),
    marginVertical: verticalScale(6),
    padding: verticalScale(16)
  }
});
