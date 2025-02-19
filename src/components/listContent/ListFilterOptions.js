import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import { Colors, horizontalScale, verticalScale } from '../../theme';
import ApplicationStyles from '../../theme/ApplicationStyles';
import Fonts from '../../theme/Fonts';

const ListFilterOptions = ({
  data,
  itemStyle,
  style,
  selectedName,
  contentContainerStyle,
  onSelectOption,
  mainViewStyle = true,
  styleExt
}) => {
  const renderItem = ({ item }) => {
    const isSelected = selectedName === item?.name;
    return (
      <TouchableOpacity
        key={item?.id}
        activeOpacity={0.5}
        style={[styles.itemContainer, isSelected && styles.selected, itemStyle]}
        onPress={() => onSelectOption(item)}
      >
        <Text style={[styles.itemText, isSelected && styles.selectedTxt]}>
          {item?.name}
        </Text>
        {item?.num && (
          <View style={styles.numberView}>
            <Text style={styles.numberText}>{item?.num}</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const itemSeparator = () => <View style={styles.spaceW} />;

  return (
    <View style={[ApplicationStyles.flex1, styleExt, mainViewStyle]}>
      <FlatList
        horizontal
        bounces={false}
        key={'filter_options'}
        data={data}
        renderItem={renderItem}
        style={[style, {}]}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={contentContainerStyle}
        ItemSeparatorComponent={itemSeparator}
        ListEmptyComponent={
          <View style={styles.emptyItemContainer}>
            <Text style={styles.noItemText}>Not found Options</Text>
          </View>
        }
        keyExtractor={(item, index) => item.uuid + index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    paddingHorizontal: horizontalScale(16),
    height: verticalScale(38),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.gray30,
    backgroundColor: Colors.gray30
  },
  selected: {
    borderColor: Colors.orange10,
    backgroundColor: Colors.orange10,
    shadowColor: Colors.orange10 + 20,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    elevation: 5,
    shadowRadius: 10
  },
  itemText: {
    fontFamily: Fonts.type.robotoMedium,
    fontWeight: Fonts.Weight.medium,
    fontSize: Fonts.size.small,
    color: Colors.black70,
    textAlign: 'center'
  },
  spaceW: {
    width: horizontalScale(15)
  },
  selectedTxt: {
    color: Colors.white
  },
  numberView: {
    position: 'absolute',
    right: 4,
    top: 5,
    backgroundColor: Colors.red90,
    height: verticalScale(13),
    width: horizontalScale(13),
    borderRadius: 6.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.white,
    flex: 1,
    shadowColor: Colors.red80,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5
  },
  numberText: {
    fontSize: Fonts.size.s8,
    color: Colors.white,
    fontFamily: Fonts.type.robotoMedium,
    fontWeight: Fonts.Weight.medium
  }
});

export default ListFilterOptions;
