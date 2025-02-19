import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import ItemCountText from '../../../components/headers/ItemCountText';
import { verticalScale } from '../../../theme';

import VarientList from './VarientList';

const ProductVariation = ({
  state,
  dispatch,
  buyingPrice,
  sellingPrice,
  volume,
  expiryDate,
  setDeleteVariantIds,
  isEditProduct,
  mfgDate,
  moq,
  actions,
  isHaveDates
}) => {
  const handleRemoveEvent = ({ item, index, itemIndex }) => {
    let newCombinationData = JSON.parse(JSON.stringify(state.combinations));
    newCombinationData[itemIndex]?.splice(index, 1);
    if (newCombinationData[itemIndex]?.length === 0) {
      newCombinationData?.splice(itemIndex, 1);
    }
    isEditProduct && setDeleteVariantIds((prev) => [...prev, item?.id]);
    dispatch({
      type: actions.combinations,
      payload: newCombinationData
    });
  };

  const _rednderVariation = ({ item, index }) => {
    return (
      <VarientList
        data={item}
        itemIndex={index}
        state={state}
        dispatch={dispatch}
        buyingPrice={buyingPrice}
        sellingPrice={sellingPrice}
        volume={volume}
        expiryDate={expiryDate}
        mfgDate={mfgDate}
        moq={moq}
        handleRemoveEvent={handleRemoveEvent}
        isHaveDates={isHaveDates}
      />
    );
  };

  return (
    <View style={styles.main}>
      <ItemCountText title={'Variations'} number={state.combinations?.length} />
      <FlatList
        data={state.combinations}
        keyExtractor={(item, index) => `variations${index}`}
        renderItem={_rednderVariation}
        contentContainerStyle={{
          gap: verticalScale(16)
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ProductVariation;

const styles = StyleSheet.create({
  main: {
    gap: verticalScale(16)
  }
});
