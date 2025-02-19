import React from 'react';
import { View, StyleSheet, FlatList, Platform } from 'react-native';
import { ApplicationStyles, verticalScale } from '../../theme';

const DottedLine = () => {
  const dots = Array.from({ length: 5 }); // You can change the number of dots as needed

  return (
    <FlatList
      style={ApplicationStyles.flexGrow0}
      data={dots}
      showsVerticalScrollIndicator={false}
      renderItem={() => <View style={styles.dot} />}
      keyExtractor={(item, index) => index.toString()}
      scrollEnabled={false}
    />
  );
};

const styles = StyleSheet.create({
  dot: {
    height: Platform.OS === 'android' ? verticalScale(2.5) : verticalScale(1),
    width: verticalScale(2),
    borderRadius: verticalScale(1), // Makes the dots circular
    backgroundColor: 'black', // Color of the dots
    marginVertical: verticalScale(3), // Adjusts the spacing between dots,
    marginLeft:
      Platform.OS === 'android' ? verticalScale(3) : verticalScale(4.5)
  }
});

export default DottedLine;
