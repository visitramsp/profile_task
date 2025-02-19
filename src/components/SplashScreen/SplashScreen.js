import { addEventListener } from '@react-native-community/netinfo';
import { StackActions, useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { ImageBackground, Platform, View } from 'react-native';
import { useSelector } from 'react-redux';
import { AppIcon } from '../../assets/icon';
import { ASYNC_KEY, SCREEN_NAME } from '../../constants';
import { getUserInfo } from '../../store/auth/action';
import { ApplicationStyles } from '../../theme';
import { authRedirection, isPlatform, showError } from '../../utils';
import { getFromAsync } from '../../services';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SplashScreen = () => {
  const navigation = useNavigation();
  const [isConnected, setIsConnected] = useState();
  const { top } = useSafeAreaInsets();
  const { userDetail, userDraftData } = useSelector((state) => state.user);

  useEffect(() => {
    // Initial check
    const unsubscribe = addEventListener((state) => {
      setIsConnected(state?.isConnected);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (isConnected) {
      // Dispatch actions and navigate after mili seconds
      const timer = setTimeout(() => {
        callOnce();
      }, 1000);

      // Cleanup subscription on unmount
      return () => {
        clearTimeout(timer);
      };
    }
  }, [callOnce, isConnected]);

  const callOnce = useCallback(() => {
    getFromAsync(ASYNC_KEY.ONLY_ONCE).then((res) => {
      if (res !== null) {
        if (res === 'true') {
          checkUserLogin();
        }
      } else {
        navigation.dispatch(StackActions.replace(SCREEN_NAME.WELCOME_SCREEN));
      }
    });
  }, [checkUserLogin, navigation]);

  const navigateToLogin = useCallback(() => {
    if (userDraftData?.screenName) {
      navigation.reset({
        index: 0,
        routes: [
          { name: SCREEN_NAME.UNIVERSAL_STACK },
          {
            name: SCREEN_NAME.AUTH_STACK,
            params: {
              screen: userDraftData?.screenName,
              params: { ...userDraftData?.nextScreenProps, resetGoback: true }
            }
          }
        ]
      });
    } else {
      navigation.replace(SCREEN_NAME.UNIVERSAL_STACK);
    }
  }, [navigation, userDraftData?.nextScreenProps, userDraftData?.screenName]);

  const checkUserLogin = useCallback(() => {
    if (userDetail?.token && userDetail?.token?.length > 0) {
      getUserInfo(true)
        .then((res) => {
          const userData = res?.data?.data;
          if (userData) {
            if (userData?.user_type) {
              authRedirection(userData?.user_type);
            } else {
              navigateToLogin();
            }
          }
        })
        .catch((err) => {
          showError(err);
          navigateToLogin();
        });
    } else {
      navigateToLogin();
    }
  }, [navigateToLogin, userDetail?.token]);

  return (
    <View
      style={[
        ApplicationStyles.container,
        Platform.OS === 'android' && { paddingTop: top / 2 }
      ]}
    >
      <ImageBackground
        source={AppIcon.splash}
        style={ApplicationStyles.flex1}
        resizeMode={isPlatform('cover', 'contain')}
      />
    </View>
  );
};

export default SplashScreen;
