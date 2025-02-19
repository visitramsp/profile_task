import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  LayoutAnimation,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import {
  ApplicationStyles,
  Colors,
  horizontalScale,
  verticalScale
} from '../../../theme';
import Fonts from '../../../theme/Fonts';
import { useTranslation } from 'react-i18next';
import { PAGE_SPACING } from '../../../theme/ApplicationStyles';
import { AddIcons, AddStart } from '../../../assets/icon';
import ImageSwiper from '../../Retailer/WholesalesPage/ImageSwiper';
import ProductSizes from '../../Retailer/WholesalesPage/ProductSizes';
import { APP_LANGUAGE_CONSTANT, SCREEN_NAME } from '../../../constants';
import RelatedProducts from '../../../components/listContent/RelatedProducts';
import { getProductById } from '../../../store/retailer/action';
import MaterialArray from '../../Retailer/WholesalesPage/MaterialArray';
import { ButtonComp, ContainerLayout } from '../../../components';
import { showError } from '../../../utils';
import { useFocusEffect } from '@react-navigation/native';
import { ProductDetailStore } from '../../../staticStore/ProductDetailStore';
import CommonLoader from '../../../components/CommonLoader';

// eslint-disable-next-line complexity
export default function UniversalProductDetail({ route, navigation }) {
  const { t } = useTranslation();
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [expandedRows, setExpandedRows] = useState([]);
  const [productDetails, setProductDetails] = useState([]);
  const [selectMaterial, setSelectMaterial] = useState('');
  const [selectSize, setSelectSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [filterProductData, setFilterProductData] = useState({});
  const [colorArray, setColorArray] = useState([]);
  const [sizeArray, setSizeArray] = useState([]);
  const [materialArray, setMaterialArray] = useState([]);
  const [availableSizes, setAvailableSizes] = useState([]);
  const [availableMaterials, setAvailableMaterials] = useState([]);
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [isWishlist, setIsWishlist] = useState(false);

  const isPageMount = useRef(true);
  const scrollRef = useRef();
  const [productId, setProductId] = useState(route.params?.id);
  const isVendorView = route?.params?.isVendorView;
  const data = productDetails?.[0];

  useFocusEffect(
    useCallback(() => {
      if (isPageMount?.current) {
        isPageMount.current = false;
      } else {
        let tempUpdatedProductObj = ProductDetailStore.updateProductObj;
        if (tempUpdatedProductObj) {
          let tempProductstructure = JSON.parse(JSON.stringify(productDetails));
          let output = {
            ...tempProductstructure[0],
            product_description: tempUpdatedProductObj?.description,
            product_images: tempUpdatedProductObj?.product_images,
            condition: tempUpdatedProductObj?.condition
          };
          setProductDetails([output]);
          scrollToTop();
          ProductDetailStore.updateEvent(null);
        }
      }
    }, [productDetails])
  );

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true
    });
  };

  useEffect(() => {
    setIsWishlist(productDetails?.[0]?.variants?.[0]?.isInWishlist);
  }, [productDetails]);

  useEffect(() => {
    getProductsIdByData();
  }, [getProductsIdByData, productId]);

  const DESC_ARR = [
    // {
    //   title: t(APP_LANGUAGE_CONSTANT.SIZE_GUIDE),
    //   desc: "AQAD's platform ensures timely payments through streamlined invoicing and payment processing,"
    // },
    {
      title: t(APP_LANGUAGE_CONSTANT.FAQ),
      desc: "AQAD's platform ensures timely payments through streamlined invoicing and payment processing,"
    },
    {
      title: t(APP_LANGUAGE_CONSTANT.DELIVERY_RETURN_POLICIES),
      desc: "AQAD's platform ensures timely payments through streamlined invoicing and payment processing,"
    }
  ];

  const footerBtnEvent = () => {
    navigation.navigate(SCREEN_NAME.AUTH_STACK, {
      screen: 'Login'
    });
  };

  const getProductsIdByData = useCallback(async () => {
    try {
      setLoading(true);
      const queryParams = `?product_id=${productId}`;
      getProductById(queryParams)
        .then((res) => {
          setRelatedProduct(res?.data?.relatedProduct);
          setColorArray(res.data?.arr?.color_arr);
          setSizeArray(res.data?.arr?.size_arr);
          setMaterialArray(res.data?.arr?.material_arr);
          setProductDetails(res?.data?.data);
          setSelectMaterial(
            res?.data?.data?.[0]?.variants?.[0]?.materialObj?.material_value
          );
          setSelectSize(
            res?.data?.data?.[0]?.variants?.[0]?.sizeObj?.size_value
          );
          setSelectedColor(
            res?.data?.data?.[0]?.variants?.[0]?.colorObj?.color_value
          );
          setLoading(false);
        })
        .catch((error) => {
          console.log(error.response);
          showError(error);
          setLoading(false);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      setLoading(false);
      showError(error);
    }
  }, [productId]);

  useEffect(() => {
    const arr = productDetails?.[0]?.variants?.filter(
      (item) =>
        item?.colorObj?.color_value === selectedColor &&
        item?.sizeObj?.size_value === selectSize &&
        item?.materialObj?.material_value === selectMaterial
    );
    setFilterProductData(arr?.[0]);
  }, [selectMaterial, selectSize, selectedColor]);

  const collapseRow = (index) => {
    setExpandedRows((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  useEffect(() => {
    if (selectedColor) {
      const filteredProducts = productDetails?.[0]?.variants?.filter(
        (p) => p?.colorObj?.color_value === selectedColor
      );
      const sizes = [
        ...new Set(filteredProducts.map((p) => p?.sizeObj?.size_value))
      ];
      const materials = [
        ...new Set(filteredProducts.map((p) => p?.materialObj?.material_value))
      ];
      setAvailableSizes(sizes);
      setAvailableMaterials(materials);
      setSelectSize(sizes?.[0]);
      setSelectMaterial(materials?.[0]);
    }
  }, [selectedColor]);

  useEffect(() => {
    if (selectedColor && selectSize) {
      const filteredProducts = productDetails?.[0]?.variants?.filter(
        (p) =>
          p?.colorObj?.color_value === selectedColor &&
          p?.sizeObj?.size_value === selectSize
      );

      const materials = [
        ...new Set(filteredProducts.map((p) => p?.materialObj?.material_value))
      ];
      setAvailableMaterials(materials);
      setSelectMaterial(materials?.[0]);
    }
  }, [selectedColor, selectSize]);

  const discount =
    Number(filterProductData?.compare_price_at) -
    Number(filterProductData?.price_details);

  const filterProductFun = (row) => {
    setProductId(row?.uuid);
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      getProductsIdByData();
      setRefreshing(false);
    }, 2000);
  };

  return (
    <ContainerLayout
      scrollRef={scrollRef}
      title={t(APP_LANGUAGE_CONSTANT.PRODUCT_DESCRIPTION)}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {loading ? (
        // <Loader />
        <CommonLoader isLoading={loading} />
      ) : (
        <>
          <ImageSwiper data={filterProductData} />

          <View style={[styles.container, styles.mainContainer]}>
            <View style={ApplicationStyles.pageSpacing}>
              <Text style={styles.brandNm}>
                {data?.brand_id?.toUpperCase()}
              </Text>

              <Text style={styles.productNm}>{data?.product_title}</Text>

              <Text style={styles.minOrder}>
                {t(APP_LANGUAGE_CONSTANT.MINIMUM_ORDER, {
                  value: filterProductData?.minimum_order_quantity
                })}
              </Text>

              <Text style={styles.pricePerUnit}>
                {t(APP_LANGUAGE_CONSTANT.PRICE_PER_UNIT)}
              </Text>
              <View style={styles.priceContainer}>
                <Text style={styles.discountPrice}>
                  {filterProductData?.price_details}{' '}
                  <Text style={styles.currency}>AED</Text>
                </Text>
                <Text style={[styles.price]}>
                  {filterProductData?.compare_price_at} AED
                </Text>
                <Text style={[styles.discount]}>{discount} off</Text>
              </View>

              <Text style={styles.colorTxt}>
                {t(APP_LANGUAGE_CONSTANT.COLOUR)}
              </Text>
              <View style={styles.row}>
                {colorArray?.[0]?.color_value !== null &&
                  colorArray?.map((backgroundColor, index) => {
                    const isSelected =
                      selectedColor?.length !== 0
                        ? backgroundColor?.color_value === selectedColor
                        : index === 0;
                    return (
                      <TouchableOpacity
                        key={index}
                        style={[styles.colorItem, isSelected && styles.border1]}
                        onPress={() =>
                          setSelectedColor(backgroundColor?.color_value)
                        }
                      >
                        <View
                          style={[
                            styles.color,
                            {
                              backgroundColor: backgroundColor.color_value
                            }
                          ]}
                        />
                      </TouchableOpacity>
                    );
                  })}
              </View>
            </View>

            {productDetails?.[0]?.variants &&
              productDetails?.[0]?.variants.length > 0 && (
                <ProductSizes
                  selectSize={selectSize}
                  setSelectSize={setSelectSize}
                  sizeArray={sizeArray}
                  availableSizes={availableSizes}
                />
              )}
            {productDetails?.[0]?.variants &&
              productDetails?.[0]?.variants.length > 0 && (
                <MaterialArray
                  setSelectMaterial={setSelectMaterial}
                  materialArray={materialArray}
                  availableMaterials={availableMaterials}
                  selectMaterial={selectMaterial}
                />
              )}

            <View style={[ApplicationStyles.pageSpacing]}>
              {/* <View style={[styles.titleRow, { marginTop: verticalScale(20) }]}>
                <Text
                  style={[styles.contentTxt, { marginTop: verticalScale(0) }]}
                >
                  {t(APP_LANGUAGE_CONSTANT.PRODUCT_DETAILS)}
                </Text>
                <CloseIcons />
              </View> */}
              {/* <View style={styles.row}>
                <Location />
                <Text style={styles.detailsTxt}>
                  {'Dispatches from a small business in India'}
                </Text>
              </View> */}

              <Text style={styles.contentTxt}>
                {t(APP_LANGUAGE_CONSTANT.DESCRIPTION)}
              </Text>
              <Text style={styles.descriptionTxt}>
                {data?.product_description}
              </Text>

              <Text style={styles.contentTxt}>
                {t(APP_LANGUAGE_CONSTANT.BRAND)}
              </Text>
              <Text style={styles.descriptionTxt}>{data?.brand_id}</Text>
              <Text style={styles.contentTxt}>
                {t(APP_LANGUAGE_CONSTANT.MATERIAL)}
              </Text>
              <Text style={styles.descriptionTxt}>{selectMaterial}</Text>
              {/* <View style={styles.newView}>
                <Text style={styles.newText}>
                  {t(APP_LANGUAGE_CONSTANT.NEW_FROM_MARKET)}
                </Text>
              </View> */}

              {DESC_ARR.map((res, index) => (
                <View key={index} style={{ marginTop: verticalScale(20) }}>
                  <View style={styles.titleRow}>
                    <Text style={styles.titleText}>{res.title}</Text>
                    <TouchableOpacity
                      onPress={() => {
                        collapseRow(index);
                        LayoutAnimation.configureNext(
                          LayoutAnimation.Presets.easeInEaseOut
                        );
                      }}
                    >
                      <AddIcons />
                    </TouchableOpacity>
                  </View>
                  {expandedRows.includes(index) && (
                    <Text style={styles.titleDesc}>{res.desc}</Text>
                  )}
                </View>
              ))}

              {isVendorView ? null : (
                <View
                  style={[styles.titleRow, { marginTop: verticalScale(41) }]}
                >
                  <Text style={styles.relatedProductText}>
                    {t(APP_LANGUAGE_CONSTANT.RELATED_PRODUCT)}
                  </Text>
                  {/* <Text style={styles.seeAllText}>
                    {t(APP_LANGUAGE_CONSTANT.SEE_ALL)}
                  </Text> */}
                </View>
              )}
            </View>
            {isVendorView ? null : (
              <View>
                <RelatedProducts
                  horizontal
                  visibleBookmark
                  data={relatedProduct}
                  columnWrapperStyle={undefined}
                  contentContainerStyle={styles.contentContainerStyle}
                  onPress={filterProductFun}
                  onPressVisibleBookmark={footerBtnEvent}
                />
              </View>
            )}
            <View
              style={[
                styles.titleRow,
                ApplicationStyles.pageSpacing,
                { paddingTop: verticalScale(40) }
              ]}
            >
              <TouchableOpacity
                disabled={loading2}
                style={[styles.addCartView]}
                onPress={footerBtnEvent}
              >
                <AddStart />
              </TouchableOpacity>
              <View style={ApplicationStyles.flex1}>
                <ButtonComp
                  isLoading={loading1}
                  btnTitle={t(APP_LANGUAGE_CONSTANT.ADD_TO_CART)}
                  onPress={footerBtnEvent}
                />
              </View>
            </View>
          </View>
        </>
      )}
    </ContainerLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: Colors.white,
    ...ApplicationStyles.paddingBottom
  },
  mainContainer: {
    marginTop: -verticalScale(30),
    shadowColor: Colors.blackShadow60,
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 5
  },
  brandNm: {
    ...ApplicationStyles.normalMontserratFont,
    fontWeight: Fonts.Weight.semi,
    color: Colors.orange10,
    paddingTop: verticalScale(20)
  },
  productNm: {
    ...ApplicationStyles.normalMontserratFont,
    color: Colors.black,
    paddingVertical: verticalScale(5)
  },
  minOrder: {
    fontSize: Fonts.size.semi,
    fontFamily: Fonts.type.robotoRegular,
    color: Colors.gray50
  },
  pricePerUnit: {
    fontSize: Fonts.size.sminy,
    fontFamily: Fonts.type.robotoRegular,
    color: Colors.gray50,
    paddingTop: verticalScale(10)
  },
  priceContainer: {
    ...ApplicationStyles.rowAlignCenter,
    justifyContent: 'flex-start'
  },
  discountPrice: {
    ...ApplicationStyles.normalMontserratFont,
    fontSize: Fonts.size.s32,
    color: Colors.orange10
  },
  price: {
    ...ApplicationStyles.mediumMontserratFont,
    fontWeight: Fonts.Weight.seven,
    color: Colors.gray20,
    textDecorationLine: 'line-through',
    marginHorizontal: horizontalScale(8),
    top: verticalScale(4)
  },
  currency: {
    fontSize: Fonts.size.f25
  },
  discount: {
    ...ApplicationStyles.mediumMontserratFont,
    fontWeight: Fonts.Weight.medium,
    color: Colors.red
  },
  colorTxt: {
    ...ApplicationStyles.mediumMontserratFont,
    fontWeight: Fonts.Weight.seven,
    color: Colors.black90,
    marginTop: verticalScale(15),
    marginBottom: verticalScale(2)
  },
  contentTxt: {
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.robotoMedium,
    fontWeight: Fonts.Weight.medium,
    color: Colors.black120,
    marginTop: verticalScale(20)
  },
  row: {
    ...ApplicationStyles.rowAlignCenter,
    justifyContent: 'flex-start',
    marginTop: verticalScale(5)
  },
  colorItem: {
    ...ApplicationStyles.centerView,
    width: horizontalScale(41),
    aspectRatio: 1,
    borderRadius: 12,
    borderColor: Colors.orange10,
    marginRight: horizontalScale(5),
    shadowColor: Colors.blackShadow60,
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 5
  },
  color: {
    width: horizontalScale(35),
    aspectRatio: 1,
    borderRadius: 10
  },
  border1: {
    borderWidth: 1
  },
  descriptionTxt: {
    fontSize: Fonts.size.sminy,
    fontFamily: Fonts.type.robotoRegular,
    color: Colors.gray50,
    marginTop: verticalScale(5)
  },
  titleRow: {
    ...ApplicationStyles.rowAlignCenterJustifyBetween
  },
  titleText: {
    color: Colors.black90,
    fontFamily: Fonts.type.robotoMedium,
    fontWeight: Fonts.Weight.medium,
    fontSize: Fonts.size.medium
  },
  titleDesc: {
    fontFamily: Fonts.type.robotoRegular,
    fontWeight: Fonts.Weight.low,
    color: Colors.slate110,
    marginTop: verticalScale(16),
    fontSize: Fonts.size.small
  },
  relatedProductText: {
    ...ApplicationStyles.normalMontserratFont,
    color: Colors.black50,
    fontWeight: Fonts.Weight.full
  },
  contentContainerStyle: {
    paddingHorizontal: PAGE_SPACING
    // marginTop: verticalScale(15)
  },
  addCartView: {
    ...ApplicationStyles.centerView,
    height: verticalScale(66),
    width: horizontalScale(66),
    borderWidth: 2,
    borderColor: Colors.gray10,
    borderRadius: 20,
    marginRight: horizontalScale(15)
  }
});
