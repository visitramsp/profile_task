import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { ApplicationStyles, Colors, Fonts, verticalScale } from '../../theme';
import { ListView, TileView } from '../../assets/icon';

export default function ItemCountText({
  title,
  number,
  style,
  displayToggle,
  isOneColumn,
  switchListLayout,
  isnumberPresent = true,
  isRestockRefresh = false
}) {
  return (
    <View style={[style, styles.container]}>
      <Text style={[styles.requestTxt]}>
        {title + ' '}
        {!isRestockRefresh && isnumberPresent && (
          <Text style={styles.numReq}>({number})</Text>
        )}
      </Text>
      {displayToggle && (
        <TouchableOpacity activeOpacity={0.5} onPress={switchListLayout}>
          {isOneColumn ? <TileView color={Colors} /> : <ListView />}
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: verticalScale(20)
  },
  requestTxt: {
    ...ApplicationStyles.mediumMontserratFont,
    fontWeight: Fonts.Weight.seven,
    color: Colors.black50
  },
  numReq: {
    color: Colors.orange10
  }
});
