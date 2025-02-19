import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { AppIcon, LessArrowIcons } from '../../assets/icon';
import { ApplicationStyles, Colors, verticalScale } from '../../theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Header from '../Header';
import { HEADER_TYPE } from '../../constants';
import { navigationRef } from '../../navigation/stackNavigation';
import KeyboardAvoidingViewWrapper from '../KeyboardAvoidingViewWrapper';

const Container = (props) => {
  const {
    children,
    title,
    horizontalScace = true,
    isShowLeftIcon = true,
    style,
    chidernContainerStyle,
    scrollable = true
  } = props;
  const { top } = useSafeAreaInsets();

  return (
    <ImageBackground source={AppIcon.universalUI} style={{ paddingTop: top }}>
      <Header
        isLeft={isShowLeftIcon}
        leftIcon={
          <LessArrowIcons color={Colors.white70} width={24} height={24} />
        }
        headerTitle={title}
        headerType={HEADER_TYPE.ONLY_TITLE}
        customContainer={[
          ApplicationStyles.shadow0,
          { backgroundColor: Colors.transparent }
        ]}
        onPressLeft={() => navigationRef.goBack()}
      />
      {scrollable ? (
        <KeyboardAvoidingViewWrapper>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={[
              horizontalScace ? ApplicationStyles.pageSpacing : {},
              styles.subContainer,
              style
            ]}
          >
            <View style={[styles.childContainer, chidernContainerStyle]}>
              {children}
            </View>
          </ScrollView>
        </KeyboardAvoidingViewWrapper>
      ) : (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
          {children}
        </KeyboardAvoidingView>
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Platform.OS === 'android' ? '93%' : '93.5%',
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30
  },
  subContainer: {
    borderRadius: 30,
    marginTop: verticalScale(5)
  },
  childContainer: {
    flex: 1
  }
});

export default Container;
