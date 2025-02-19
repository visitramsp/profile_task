import React from 'react';
import { ImageBackground, StyleSheet, View, ScrollView } from 'react-native';
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
import { useDispatch } from 'react-redux';
import { deleteDraftData } from '../../store/user/reducer';

const Container = (props) => {
  const {
    children,
    title,
    horizontalScace = true,
    isShowLeftIcon = true,
    containerStyle,
    style,
    chidernContainerStyle,
    scrollable = true,
    resetGoback = false,
    refreshControl = null,
    onPressLeft
  } = props;
  const dispatch = useDispatch();
  const { top } = useSafeAreaInsets();

  return (
    <ImageBackground
      source={AppIcon.universalUI}
      style={[ApplicationStyles.flex1, { paddingTop: top }]}
    >
      {/* <Header
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
        onPressLeft={() => {
          onPressLeft
            ? onPressLeft()
            : resetGoback && dispatch(deleteDraftData());
          navigationRef.goBack();
        }}
      /> */}
      <SafeAreaView edges={['bottom']} style={[containerStyle]}>
        <View style={[styles.childContainer, chidernContainerStyle]}>
          {children}
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.secondary,
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: Colors.customOrange,
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 5,
    marginTop: verticalScale(10),
    overflow: 'hidden'
  },
  subContainer: {
    borderRadius: 30,
    marginTop: verticalScale(5)
  },
  childContainer: {
    flex: 1,
    marginTop: verticalScale(5)
  }
});

export default Container;
