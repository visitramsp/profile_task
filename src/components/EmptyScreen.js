import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  ApplicationStyles,
  Colors,
  Fonts,
  height,
  PAGE_SPACING,
  verticalScale
} from '../theme';

const EmptyScreen = ({ data, ctnStyle = {} }) => {
  return (
    <View style={[styles.container, ctnStyle]}>
      {data?.img && <data.img />}
      <Text style={styles.title}>{data?.title}</Text>
      <Text style={styles.desc}>{data?.desc}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    height: height * 0.7,
    marginHorizontal: PAGE_SPACING,
    marginBottom: verticalScale(90)
  },
  title: {
    ...ApplicationStyles.normalMontserratFont,
    fontWeight: Fonts.Weight.seven,
    color: Colors.black90,
    paddingTop: verticalScale(20)
  },
  desc: {
    ...ApplicationStyles.smallRobotoFont,
    color: Colors.gray120,
    textAlign: 'center',
    paddingTop: verticalScale(10)
  }
});

export default EmptyScreen;
