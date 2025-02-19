import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import React, { useState, useCallback, useEffect } from 'react';
import { Container, SearchBar } from '../../../components';
import { APP_LANGUAGE_CONSTANT, SCREEN_NAME } from '../../../constants';
import { useTranslation } from 'react-i18next';
import {
  ApplicationStyles,
  Colors,
  Fonts,
  horizontalScale,
  verticalScale,
  width
} from '../../../theme';
import ItemCountText from '../../../components/headers/ItemCountText';
import CategoriesListContent from '../../../components/listContent/Categories';
import { useDispatch } from 'react-redux';
import { actions } from '../../Vendor/Product/AddProductState';
import { showError } from '../../../utils';
import EmptyScreen from '../../../components/EmptyScreen';
import { CartEmpty } from '../../../assets/icon';
import { API_CONSTANT } from '../../../services/ApiConstant';
import { getWithOutToken } from '../../../services/ApiServices';
import CommonLoader from '../../../components/CommonLoader';

const UniversalCategoryScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const PARAM_EVENT = route?.params?.event;
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const [categoryListData, setcategoryListData] = useState([]);

  const emptyData = {
    img: CartEmpty,
    title: 'Not available categories',
    desc: ''
  };
  useEffect(() => {
    getAllData();
  }, [getAllData]);

  const getAllData = useCallback(() => {
    try {
      setLoading(true);
      getWithOutToken(API_CONSTANT.FETCH_CATEGORY)
        .then((res) => {
          setcategoryListData(res?.data?.data);
          setLoading(false);
          dispatch({
            type: actions.productAllCategoryList,
            payload: res?.data?.data
          });
        })
        .catch((error) => {
          setLoading(false);
          showError(error);
        });
    } catch (error) {
      setLoading(false);
    }
  }, [dispatch]);

  const navigateProductListEvent = ({ subItem = null, keyword = '' }) => {
    if (PARAM_EVENT) {
      PARAM_EVENT({ subItem, keyword });
    } else {
      navigation.navigate(SCREEN_NAME.UNIVERSAL_PRODUCTLIST, {
        categoryData: subItem,
        keyword: keyword
      });
    }
  };

  const renderItem = ({ item, index }) => {
    return (
      item.subcategories?.length > 0 && (
        <>
          <View
            style={[
              ApplicationStyles.rowAlignCenterJustifyBetween,
              ApplicationStyles.pageSpacing
            ]}
          >
            <ItemCountText title={t(item.title)} isnumberPresent={false} />
            <TouchableOpacity
              style={{ marginTop: verticalScale(20) }}
              onPress={() => navigateProductListEvent({ subItem: item })}
            >
              <Text style={styles.seeAll}>
                {t(APP_LANGUAGE_CONSTANT.SEE_ALL)}
              </Text>
            </TouchableOpacity>
          </View>
          <CategoriesListContent
            data={item.subcategories}
            itemStyle={styles.itemStyle}
            imgStyle={styles.imgStyle}
            fastImageStyle={styles.fastImageStyle}
            onPress={(subItem) => navigateProductListEvent({ subItem })}
          />
        </>
      )
    );
  };
  return (
    <>
      <Container
        title={t(APP_LANGUAGE_CONSTANT.CATEGORIES)}
        scrollable={false}
        style={styles.container}
      >
        <View style={styles.viewContainer}>
          <SearchBar
            value={searchText}
            onChangeValue={setSearchText}
            onSubmitEditing={() =>
              searchText?.trim()?.length > 0 &&
              navigateProductListEvent({ keyword: searchText?.trim() })
            }
          />
        </View>
        {loading ? (
          // <ActivityIndicator size={'large'} color={Colors.orange10} />
          <CommonLoader isLoading={loading} />
        ) : categoryListData?.length === 0 ? (
          <EmptyScreen data={emptyData} />
        ) : (
          <FlatList
            data={categoryListData}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: verticalScale(100) }}
            keyExtractor={(item, index) => item.uuid + index.toString()}
            ListEmptyComponent={
              <View style={styles.emptyItemContainer}>
                <Text style={styles.noItemText}>Not available categories</Text>
              </View>
            }
          />
        )}
      </Container>
    </>
  );
};

export default UniversalCategoryScreen;

const styles = StyleSheet.create({
  container: {
    paddingLeft: verticalScale(0),
    paddingRight: verticalScale(0)
  },
  viewContainer: {
    width: width * 0.88,
    alignSelf: 'center',
    paddingTop: verticalScale(22)
  },
  imgStyle: {
    borderRadius: 16,
    shadowOpacity: verticalScale(0),
    width: horizontalScale(80)
  },
  itemStyle: {
    width: horizontalScale(86),
    alignItems: 'center',
    backgroundColor: Colors.white
  },
  fastImageStyle: {
    borderRadius: 16
  },
  seeAll: {
    ...ApplicationStyles.mediumMontserratFont,
    fontWeight: Fonts.Weight.secondlast,
    color: Colors.orange30,
    backgroundColor: 'transparent'
  }
});
