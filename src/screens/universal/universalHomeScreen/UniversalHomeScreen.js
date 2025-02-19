/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { AnimatedHeader, HomeFmcgLoader } from '../../../components';
import MainLayout from '../../../components/layout/Layout';
import { APP_LANGUAGE_CONSTANT } from '../../../constants/AppConstant';
import CarouselHome from '../../../components/Carousel';
import {
  getUniversalData,
  getUniversalFeaturesData
} from '../../../store/app/action';
import {
  ApplicationStyles,
  horizontalScale,
  verticalScale
} from '../../../theme';
import { showError } from '../../../utils';
import { styles } from './UniversalHomeScreen.styles';
import {
  AutomatePurchase,
  CreditCard,
  Pos,
  Refer,
  RobotHand,
  Shipping,
  VastConsumer
} from '../../../assets/icon';
import { SCREEN_NAME } from '../../../constants';

const UniversalHomeScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const [isShowHistory, setIsShowHistory] = useState(false);
  const [supplierList, setSupplierList] = useState([]);
  const [retailerList, setRetailerList] = useState([]);
  const [uSData, setUSData] = useState({});
  const [fmcgLoader, setFmcgLoader] = useState(true);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    fetchUSdata();
    getFeaturesData();
  }, [fetchUSdata, getFeaturesData]);

  const fetchUSdata = useCallback(() => {
    getUniversalData()
      .then((res) => {
        setUSData(res?.data?.data);
      })
      .catch((err) => {
        showError(err);
      })
      .finally(() => {
        setFmcgLoader(false);
      });
  }, []);
  const retailerIcons = [RobotHand, VastConsumer, Pos, RobotHand];
  const supplierIcons = [Shipping, CreditCard, AutomatePurchase, Shipping];
  const getFeaturesData = useCallback(() => {
    getUniversalFeaturesData()
      .then((res) => {
        let suppliers = res?.data?.data
          .filter((item) => item.title === 'Supplier')
          .map((item, index) => {
            return {
              ...item,
              icon: supplierIcons[index % supplierIcons?.length]
            };
          });
        setSupplierList([...suppliers]);
        let retailers = res?.data?.data
          .filter((item) => item.title === 'Retailer')
          .map((item, index) => {
            return {
              ...item,
              icon: retailerIcons[index % retailerIcons?.length]
            };
          });
        setRetailerList([...retailers]);
      })
      .catch((err) => {
        showError(err);
      })
      .finally(() => {
        setFmcgLoader(false);
      });
  }, []);

  const onPressRight = () => {
    if (isShowHistory) {
      setIsShowHistory(false);
    } else {
      setIsShowHistory(true);
    }
  };

  const navigateCategoryListEvent = (item = null) => {
    if (item) {
      navigateProductListEvent({ subItem: item });
    } else {
      navigation.navigate('UniversalCategoryScreen');
    }
  };

  const navigateProductListEvent = ({ subItem = null, keyword = '' }) => {
    navigation.navigate(SCREEN_NAME.UNIVERSAL_PRODUCTLIST, {
      categoryData: subItem,
      keyword: keyword
    });
  };

  return (
    <MainLayout scrollable={false}>
      <View style={styles.safeareaStyle}>
        <AnimatedHeader
          centerIconSize={170}
          left={false}
          isShowHistory={isShowHistory}
          setIsShowHistory={setIsShowHistory}
          value={searchText}
          searchLength={searchText.length}
          onPressRight={onPressRight}
          onChangeText={(text) => {
            setSearchText(text);
          }}
          onSubmitEditing={() => {
            searchText?.trim()?.length > 0 &&
              navigateProductListEvent({ keyword: searchText?.trim() });
          }}
        />

        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View
            style={[
              ApplicationStyles.pageSpacing,
              { paddingTop: verticalScale(10) }
            ]}
          >
            <View style={ApplicationStyles.rowAlignCenterJustifyBetween}>
              <Text style={[styles.userTitle, styles.userTitleSpac]}>
                {t(APP_LANGUAGE_CONSTANT.SUPPLIER)}
              </Text>
              <Text style={[styles.userTitle, styles.userTitleSpac]}>
                {t(APP_LANGUAGE_CONSTANT.RETAILER)}
              </Text>
            </View>
            <View style={styles.userTypeContainer}>
              <View
                style={[styles.userType, { paddingRight: horizontalScale(8) }]}
              >
                {supplierList.map((res, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      style={styles.keyPointCard}
                      onPress={() =>
                        navigation.navigate('UniversalKeyInfoScreen', {
                          item: res
                        })
                      }
                    >
                      <res.icon
                        width={horizontalScale(30)}
                        height={verticalScale(30)}
                      />
                      <Text style={styles.keyPointText}>{t(res?.h1)}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
              <View
                style={[styles.userType, { paddingLeft: horizontalScale(8) }]}
              >
                {retailerList.map((res, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      style={styles.keyPointCard}
                      onPress={() =>
                        navigation.navigate('UniversalKeyInfoScreen', {
                          item: res
                        })
                      }
                    >
                      <res.icon
                        width={horizontalScale(30)}
                        height={verticalScale(30)}
                      />
                      <Text style={styles.keyPointText}>{t(res?.h1)}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </View>

          <View style={styles.fmcgContainer}>
            <Text style={styles.userTitle}>
              {t(APP_LANGUAGE_CONSTANT.FMCG_CATE)}
            </Text>
            <TouchableOpacity onPress={() => navigateCategoryListEvent(null)}>
              <Text style={styles.seeAll}>
                {t(APP_LANGUAGE_CONSTANT.SEE_ALL)}
              </Text>
            </TouchableOpacity>
          </View>
          {fmcgLoader ? (
            <HomeFmcgLoader />
          ) : (
            <>
              <ScrollView
                horizontal
                style={{
                  paddingTop: verticalScale(20)
                }}
                showsHorizontalScrollIndicator={false}
              >
                {uSData?.category_arr?.map((item, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      activeOpacity={0.5}
                      style={[
                        styles.fmcgImgContainer,
                        {
                          marginRight: horizontalScale(
                            index === uSData?.category_arr?.length - 1 ? 10 : 0
                          )
                        }
                      ]}
                      onPress={() => navigateCategoryListEvent(item)}
                    >
                      <View style={styles.fmcgImgView}>
                        <FastImage
                          source={{ uri: item?.image }}
                          style={styles.fmcgImg}
                        />
                      </View>
                      <Text style={styles.fmcgText}>{item?.title}</Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
              <View style={styles.referralContainer}>
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={styles.refer}
                  onPress={() => navigation.navigate('ReferAndEarnScreen')}
                >
                  <View style={styles.earn}>
                    <Text style={styles.referText}>
                      {t(APP_LANGUAGE_CONSTANT.REFER_AND_EARN)}
                    </Text>
                    <Refer />
                  </View>
                </TouchableOpacity>
                <Text style={styles.referralText}>
                  {t(APP_LANGUAGE_CONSTANT.REFERRAL1)}{' '}
                  <Text style={styles.earnText}>
                    {t(APP_LANGUAGE_CONSTANT.AED5000)}
                  </Text>
                </Text>
              </View>
              <View style={styles.CarouselView}>
                <CarouselHome data={uSData?.promotional_event_arr} />
              </View>
            </>
          )}
          <View style={styles.manageSpace} />
        </ScrollView>
      </View>
    </MainLayout>
  );
};

export default UniversalHomeScreen;
