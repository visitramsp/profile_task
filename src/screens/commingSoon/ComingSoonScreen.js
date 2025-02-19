import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  ApplicationStyles,
  Colors,
  Fonts,
  height,
  PAGE_SPACING,
  verticalScale
} from '../../theme';
import { ComingSoon } from '../../assets/icon';
import { Container } from '../../components';

const ComingSoonScreen = () => {
  return (
    <Container title={'Coming Soon'}>
      <View style={styles.container}>
        <ComingSoon />
        <Text style={styles.title}>Feature Coming Soon!</Text>
        <Text style={styles.desc}>
          We’re working on bringing this feature to you soon. Stay tuned for
          exciting updates
        </Text>
      </View>
    </Container>
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

export default ComingSoonScreen;
