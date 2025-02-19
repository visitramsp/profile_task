/* eslint-disable react/jsx-sort-props */
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DownArrow, UpArrow } from '../../assets/icon';
import {
  ApplicationStyles,
  Colors,
  Fonts,
  horizontalScale,
  verticalScale
} from '../../theme';
import { useNavigation } from '@react-navigation/native';

const DrawerDropdownItem = (props) => {
  const { Icon, title, screenName, isRight = true, data } = props;
  const { navigate } = useNavigation();
  const [isExpanded, setIsExpanded] = useState(false);

  const onToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <TouchableOpacity
        style={styles.drawerItem}
        onPress={screenName ? () => navigate(screenName) : onToggle}
      >
        <View style={ApplicationStyles.rowAlignCenter}>
          <Icon width={horizontalScale(24)} height={verticalScale(24)} />
          <Text style={styles.drawerLabel}>{title}</Text>
        </View>

        {isRight && (isExpanded ? <UpArrow /> : <DownArrow />)}
      </TouchableOpacity>
      <View style={[styles.border, { marginTop: verticalScale(0) }]} />
      {isExpanded && (
        <>
          <View style={styles.subItemContainer}>
            {data?.map((res, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => navigate(res?.screen)}
                  style={styles.subDrawerItem}
                >
                  <Text style={styles.drawerLabel2}>{res?.title}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <View style={styles.border} />
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  drawerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: verticalScale(18)
  },
  border: {
    height: verticalScale(1),
    backgroundColor: Colors.blue20,
    opacity: 0.1,
    marginTop: verticalScale(18),
    marginLeft: horizontalScale(45)
  },
  subDrawerItem: {
    paddingTop: horizontalScale(15),
    paddingLeft: horizontalScale(5)
  },
  drawerLabel: {
    fontSize: 15,
    paddingLeft: horizontalScale(22),
    fontFamily: Fonts.type.poppinsRegular,
    color: Colors.blue10
  },
  drawerLabel2: {
    fontSize: 13,
    paddingLeft: horizontalScale(41),
    fontFamily: Fonts.type.poppinsRegular,
    color: Colors.blue10
  }
});

export default DrawerDropdownItem;
