import React from 'react';
import { ImageBackground, ScrollView, StyleSheet, View } from 'react-native';
import { AppIcon, LessArrowIcons } from '../../assets/icon';
import { ApplicationStyles, Colors, verticalScale } from '../../theme';
import {
  SafeAreaView,
  useSafeAreaInsets
} from 'react-native-safe-area-context';
import Header from '../Header';
import { HEADER_TYPE } from '../../constants';
import { navigationRef } from '../../navigation/stackNavigation';
import KeyboardAvoidingViewWrapper from '../KeyboardAvoidingViewWrapper';

// eslint-disable-next-line complexity
const ContainerLayout = (props) => {
  const {
    children,
    title,
    customStyle,
    scrollable = true,
    scrollRef,
    style,
    chidernContainerStyle,
    isShowLeftIcon = true,
    refreshControl = null
  } = props;
  const { top } = useSafeAreaInsets();

  return (
    <ImageBackground
      source={AppIcon.universalUI}
      style={[ApplicationStyles.flex1, { paddingTop: top > 0 && top }]}
    >
      <Header
        isLeft={isShowLeftIcon}
        leftIcon={
          <LessArrowIcons color={Colors.white70} width={24} height={24} />
        }
        headerTitle={title}
        headerType={HEADER_TYPE.ONLY_TITLE}
        customContainer={[
          ApplicationStyles.shadow0,
          {
            backgroundColor: Colors.transparent
          }
        ]}
        onPressLeft={() => navigationRef.goBack()}
      />
      <SafeAreaView edges={['bottom']} style={[styles.container, customStyle]}>
        <KeyboardAvoidingViewWrapper>
          {scrollable ? (
            <ScrollView
              {...(scrollRef ? { ref: scrollRef } : {})}
              bounces={refreshControl ? true : false}
              showsVerticalScrollIndicator={false}
              style={[styles.subContainer, style]}
              contentContainerStyle={{}}
              refreshControl={refreshControl || null}
            >
              {children}
            </ScrollView>
          ) : (
            <View style={[styles.childContainer, chidernContainerStyle]}>
              {children}
            </View>
          )}
        </KeyboardAvoidingViewWrapper>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowOffset: { width: 0, height: -5 },
    overflow: 'hidden',
    marginTop: verticalScale(10)
  },
  subContainer: {
    borderRadius: 30
  },
  childContainer: {
    flex: 1
  }
});

export default ContainerLayout;
