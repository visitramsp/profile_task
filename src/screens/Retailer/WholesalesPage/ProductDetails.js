/* eslint-disable quotes */
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from 'react';
import {
  LayoutAnimation,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import {
  ApplicationStyles,
  Colors,
  height,
  horizontalScale,
  verticalScale
} from '../../../theme';
import Fonts from '../../../theme/Fonts';
import { useTranslation } from 'react-i18next';
import { PAGE_SPACING } from '../../../theme/ApplicationStyles';
import {
  AddIcons,
  AddStart,
  MinusIcon,
  PlusIcon,
  SelectedBookmark,
  Trash
} from '../../../assets/icon';
import ImageSwiper from './ImageSwiper';
import ProductSizes from './ProductSizes';
import { APP_LANGUAGE_CONSTANT, KEYBOARD_TYPE } from '../../../constants';
import RelatedProducts from '../../../components/listContent/RelatedProducts';
import {
  getProductById,
  postWishlist,
  updateCartQuantity
} from '../../../store/retailer/action';
import MaterialArray from './MaterialArray';
import { ButtonComp, CommonModal, ContainerLayout } from '../../../components';
import { useDispatch, useSelector } from 'react-redux';
import { showError, showToastSuccess } from '../../../utils';
import { updateWishlist } from '../../../store/retailer/reducer';
import { useFocusEffect } from '@react-navigation/native';
import { ProductDetailStore } from '../../../staticStore/ProductDetailStore';
import { SkipReloadStore } from '../../../staticStore/SkipReloadStore';
import { deleteProductWithVariant } from '../../../store/vendor/action';
import CountdownTimer from '../components/CountdownTimer';
import LinearGradient from 'react-native-linear-gradient';
import { CartStore } from '../../../staticStore/CartStore';
import CommonLoader from '../../../components/CommonLoader';

// eslint-disable-next-line complexity
export default function ProductDetails({ route, navigation }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const wholesalesData = useSelector(
    (state) => state?.retailer?.wholesalesProductList
  );
  const { userDetail } = useSelector((state) => state.user);
  const initialRender = useRef(true);
  const [activeIndex, setActiveIndex] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [expandedRows, setExpandedRows] = useState([]);
  const [productDetails, setProductDetails] = useState([]);
  const [selectMaterial, setSelectMaterial] = useState('');
  const [selectSize, setSelectSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [filterProductData, setFilterProductData] = useState({});
  const [availableColor, setAvailableColor] = useState([]);
  const [colorArray, setColorArray] = useState([]);
  const [sizeArray, setSizeArray] = useState([]);
  const [materialArray, setMaterialArray] = useState([]);
  const [availableSizes, setAvailableSizes] = useState([]);
  const [availableMaterials, setAvailableMaterials] = useState([]);
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [isWishlist, setIsWishlist] = useState(false);
  const [mainVariantTitle, setMainVariantTitle] = useState('');
  const [variantOneTitle, setVariantOneTitle] = useState('');
  const [variantTwoTitle, setVariantTwoTitle] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [imgCollection, setImgCollection] = useState([]);
  const isRestockRefresh = route?.params?.isRestockRefresh;
  const isPageMount = useRef(true);
  const scrollRef = useRef();
  const [varient, setVarient] = useState([]);
  const [currentDisable, setCurrentDisable] = useState(false);
  const [productId, setProductId] = useState(route.params?.id);
  const isVendorView = route?.params?.isVendorView;
  const isOrderView = route?.params?.isOrderView;
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
          let tempImgCollection = output?.product_images?.map((ele) => ({
            variant_id: null,
            uri: ele
          }));
          let variantImgCollection = imgCollection?.filter(
            (ele) => ele?.variant_id !== null
          );
          setImgCollection([...variantImgCollection, ...tempImgCollection]);
          setProductDetails([output]);
          scrollToTop();
          ProductDetailStore.updateEvent(null);
        }
      }
    }, [productDetails, imgCollection])
  );

  useLayoutEffect(() => {
    SkipReloadStore.vendor_ProductEvent(true);
    SkipReloadStore.retailer_ProductEvent(true);
  }, []);

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true
    });
  };

  useEffect(() => {
    setIsWishlist(productDetails?.[0]?.variants?.[0]?.isInWishlist);
  }, [productDetails]);

  useLayoutEffect(() => {
    getProductsIdByData();
  }, [getProductsIdByData, productId]);

  const deleteProduct = () => {
    deleteProductWithVariant(`/?id=${filterProductData?.product_id}`)
      .then((res) => {
        showToastSuccess(res?.data?.message);
        navigation.goBack();
        setFilterProductData({});
      })
      .catch((err) => {
        showError(err);
      });
  };

  const onPressWishlist = (row, index) => {
    if (!row?.uuid) {
      setIsWishlist(!isWishlist);
    }
    route?.params?.removeWishlist &&
      route?.params?.removeWishlist(data?.variants?.[0]?.uuid);
    const req = {
      productId: row?.uuid ? row?.uuid : data?.product_uuid,
      variant_id: row?.uuid ? row?.variantObj?.uuid : data?.variants?.[0]?.uuid
    };
    postWishlist(req)
      .then((response) => {
        showToastSuccess(response?.data?.message);
        let i = wholesalesData?.findIndex(
          (x) =>
            x?.variantObj?.uuid ===
            (row?.uuid ? row?.variantObj?.uuid : data?.variants?.[0]?.uuid)
        );
        if (i !== -1) {
          dispatch(updateWishlist({ index: i }));
        }

        if (row?.uuid) {
          setRelatedProduct((prevData) =>
            prevData.map((item, i) =>
              i === index
                ? {
                    ...item,
                    WishlistObj: {
                      ...item.WishlistObj,
                      productId:
                        item.WishlistObj.productId !== null
                          ? null
                          : row?.variantObj?.uuid
                    }
                  }
                : item
            )
          );
        }
      })
      .catch((error) => {
        showError(error);
      });
  };

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
  const addToCart = () => {
    setLoading1(true);
    const req = {
      product_id: data?.product_uuid,
      variant_id: filterProductData?.uuid,
      quantity: filterProductData?.minimum_order_quantity
    };
    updateCartQuantity(req)
      .then((response) => {
        setLoading1(false);
        CartStore.storeDataEvent({
          filterProductData,
          productDetails: productDetails[0],
          cart_auto_incrimented_id: response.data?.data?.cart_id
        });
        showToastSuccess(response.data.message);
      })
      .catch((error) => {
        setLoading1(false);
        showError(error);
      });
  };
  const footerBtnEvent = () => {
    if (isVendorView) {
      navigation.navigate('AddProduct', {
        isProductEdit: true,
        productDetails: productDetails[0],
        hasCustomVariant:
          productDetails[0]?.variants[0]?.addVariant === 0 ? true : false
      });
    } else {
      addToCart();
    }
  };

  const extractVariantImgs = (tempProducts, selectedUUID) => {
    return tempProducts[0]?.variants
      .flatMap((item) =>
        item.images.map((uri) => ({
          variant_id: item.uuid,
          uri: uri
        }))
      )
      ?.filter((ele) => ele?.variant_id === selectedUUID);
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
          setVarient(res?.data?.data?.[0]?.variants);
          let tempProducts = [...res?.data?.data];
          let tempImgCollection = tempProducts[0]?.product_images?.map(
            (ele) => ({
              variant_id: null,
              uri: ele
            })
          );
          tempImgCollection = [
            ...extractVariantImgs(
              tempProducts,
              tempProducts[0]?.variants[0]?.uuid
            ),
            ...tempImgCollection
          ];
          let uniqueItems = Array.from(
            new Map(tempImgCollection.map((item) => [item.uri, item])).values()
          );
          let value =
            Number(res?.data.data[0].variants[0].minimum_order_quantity) >
            Number(res?.data.data[0].variants[0].total_available_quantity)
              ? true
              : false;
          setCurrentDisable(value);
          setImgCollection(uniqueItems);
          setProductDetails(tempProducts);
          setSelectMaterial(
            res?.data?.data?.[0]?.variants?.[0]?.variant2?.value
          );
          setSelectSize(res?.data?.data?.[0]?.variants?.[0]?.variant1?.value);
          setSelectedColor(
            res?.data?.data?.[0]?.variants?.[0]?.mainVariant?.value
          );
          setMainVariantTitle(
            res?.data?.data?.[0]?.variants?.[0]?.mainVariant?.name
          );
          setVariantOneTitle(
            res?.data?.data?.[0]?.variants?.[0]?.variant1?.name
          );
          setVariantTwoTitle(
            res?.data?.data?.[0]?.variants?.[0]?.variant2?.name
          );
          setLoading(false);
        })
        .catch((error) => {
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
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      const arr = productDetails?.[0]?.variants?.filter(
        (item) =>
          item?.mainVariant?.value === selectedColor &&
          item?.variant1?.value === selectSize &&
          item?.variant2?.value === selectMaterial
      );
      setFilterProductData(arr?.[0]);

      let mainProductImg =
        imgCollection.length > 0 &&
        imgCollection?.filter((ele) => ele?.variant_id === null);
      let newImgCollection = [
        ...extractVariantImgs(productDetails, arr[0]?.uuid),
        ...mainProductImg
      ];
      let uniqueItems = Array.from(
        new Map(newImgCollection.map((item) => [item.uri, item])).values()
      );
      setImgCollection(uniqueItems);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectMaterial, selectSize, selectedColor]);

  const collapseRow = (index) => {
    setExpandedRows((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  useEffect(() => {
    if (selectedColor) {
      const filteredProducts = productDetails?.[0]?.variants?.filter(
        (p) => p?.mainVariant?.value === selectedColor
      );
      const uniqueVariantValues2 = [
        ...new Set(varient.map((item) => item.mainVariant.value))
      ];
      const filteredData2 = uniqueVariantValues2.map((value) =>
        varient.find((item) => item?.mainVariant.value === value)
      );
      const uniqueVariantValues = [
        ...new Set(filteredProducts.map((item) => item.variant1.value))
      ];
      const filteredData = uniqueVariantValues.map((value) =>
        filteredProducts.find((item) => item.variant1.value === value)
      );
      const uniqueVariantValues1 = [
        ...new Set(filteredProducts.map((item) => item.variant2.value))
      ];
      const filteredData1 = uniqueVariantValues1.map((value) =>
        filteredProducts.find((item) => item.variant2.value === value)
      );
      const sizes = [...new Set(filteredProducts.map((p) => p.variant1.value))];
      const materials = [
        ...new Set(filteredProducts.map((p) => p?.variant2?.value))
      ];
      setAvailableColor(filteredProducts);
      setAvailableSizes(filteredProducts);
      setAvailableMaterials(filteredProducts);
      setSelectSize(uniqueVariantValues?.[0]);
      setSelectMaterial(uniqueVariantValues1?.[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedColor]);

  useEffect(() => {
    if (selectedColor && selectSize) {
      const filteredProducts = productDetails?.[0]?.variants?.filter(
        (p) =>
          p?.mainVariant?.value === selectedColor &&
          p?.variant1?.value === selectSize
      );

      const uniqueVariantValues1 = [
        ...new Set(filteredProducts.map((item) => item.variant2.value))
      ];

      const materials = [
        ...new Set(filteredProducts.map((p) => p?.variant2?.value))
      ];
      setAvailableMaterials(filteredProducts);
      setSelectMaterial(uniqueVariantValues1?.[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const handleQuantityChange = (id, newQuantity) => {
    setFilterProductData((prevQuantities) => {
      return { ...filterProductData, minimum_order_quantity: newQuantity };
    });
  };

  const handleIncrement = (id) => {
    setFilterProductData((prevQuantities) => {
      const newQuantity =
        parseInt(filterProductData?.minimum_order_quantity, 10) + 1;
      return {
        ...filterProductData,
        minimum_order_quantity: String(newQuantity)
      };
    });
  };

  const handleDecrement = (id) => {
    setFilterProductData((prevQuantities) => {
      const newQuantity =
        parseInt(filterProductData?.minimum_order_quantity, 10) - 1;
      return {
        ...filterProductData,
        minimum_order_quantity: String(newQuantity)
      };
    });
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
        <CommonLoader isLoading={loading} loaderStyle={styles.centerLoader} />
      ) : (
        <>
          <ImageSwiper data={imgCollection} />

          <View style={[styles.container, styles.mainContainer]}>
            <View style={ApplicationStyles.pageSpacing}>
              <View style={styles.brandView}>
                <Text style={styles.brandNm}>
                  {data?.brand_id?.toUpperCase()}
                </Text>
                {isRestockRefresh && (
                  <CountdownTimer endTime={route?.params?.productTime} />
                )}
              </View>

              <Text style={styles.productNm}>{data?.product_title}</Text>

              <Text style={styles.minOrder}>
                {t(APP_LANGUAGE_CONSTANT.MINIMUM_ORDER, {
                  value:
                    userDetail.user_type === 'retailer'
                      ? filterProductData?.quantity
                      : filterProductData?.minimum_order_quantity
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
                {/* <Text style={[styles.discount]}>{discount} off</Text> */}

                {userDetail.user_type === 'retailer' &&
                !currentDisable &&
                isOrderView !== false ? (
                  <View style={[styles.counterContainer]}>
                    <TouchableOpacity
                      style={[
                        styles.decrement,
                        filterProductData?.minimum_order_quantity <=
                          filterProductData?.quantity && [styles.disabledButton]
                      ]}
                      disabled={
                        filterProductData?.minimum_order_quantity <=
                        filterProductData?.quantity
                      }
                      onPress={() => handleDecrement(filterProductData?.id)}
                    >
                      <MinusIcon
                        height={Fonts.size.small}
                        width={Fonts.size.small}
                      />
                    </TouchableOpacity>
                    <View style={styles.counterView}>
                      <TextInput
                        editable={false}
                        style={styles.input}
                        maxLength={5}
                        keyboardType={KEYBOARD_TYPE.NUMERIC}
                        value={filterProductData?.minimum_order_quantity}
                        onChangeText={(text) =>
                          handleQuantityChange(filterProductData?.id, text)
                        }
                      />
                    </View>

                    <LinearGradient
                      colors={[Colors.orange10, Colors.orange30]}
                      style={[styles.plusView]}
                    >
                      <TouchableOpacity
                        onPress={() => handleIncrement(filterProductData.id)}
                      >
                        <PlusIcon
                          height={Fonts.size.small}
                          width={Fonts.size.small}
                        />
                      </TouchableOpacity>
                    </LinearGradient>
                  </View>
                ) : null}
              </View>

              {mainVariantTitle && (
                <Text style={styles.colorTxt}>
                  {`${mainVariantTitle[0].toUpperCase()}${mainVariantTitle.slice(
                    1
                  )}`}
                </Text>
              )}
              <View style={styles.row}>
                {colorArray?.[0]?.color_value !== null &&
                  // eslint-disable-next-line complexity
                  colorArray?.map((backgroundColor, index) => {
                    if (backgroundColor?.color_value && varient) {
                      const size = sizeArray.every(
                        (obj) => Object.keys(obj).length === 0
                      );
                      const material = materialArray.every(
                        (obj) => Object.keys(obj).length === 0
                      );
                      const data =
                        !size || !material
                          ? varient.find(
                              (item1, index) =>
                                item1?.mainVariant.value ===
                                backgroundColor?.color_value
                            )
                          : varient.find(
                              (item1, index) =>
                                item1?.mainVariant.value ===
                                backgroundColor?.color_value
                            );
                      const isSelected =
                        selectedColor?.length !== 0
                          ? backgroundColor?.color_value === selectedColor
                          : index === 0;

                      const isDisabled =
                        Number(data?.minimum_order_quantity) >
                        Number(data?.total_available_quantity)
                          ? true
                          : false;
                      return (
                        <TouchableOpacity
                          key={index}
                          style={[
                            styles.colorItem,
                            isSelected && styles.border1,
                            { opacity: currentDisable ? 0.5 : 1 }
                          ]}
                          onPress={() => {
                            setSelectedColor(backgroundColor?.color_value),
                              setCurrentDisable(isDisabled);
                          }}
                        >
                          <View style={[styles.color]}>
                            <Text
                              style={[
                                styles.colorText,
                                { opacity: isDisabled ? 0.5 : 1 }
                              ]}
                            >
                              {backgroundColor.color_value}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      );
                    }
                  })}
              </View>
            </View>

            {sizeArray?.[0]?.size_value &&
              sizeArray?.[0]?.size_value.length > 0 && (
                <ProductSizes
                  variantOneTitle={variantOneTitle}
                  selectSize={selectSize}
                  setSelectSize={setSelectSize}
                  selectedDisable={setCurrentDisable}
                  sizeArray={sizeArray}
                  availableSizes={availableSizes}
                />
              )}
            {materialArray?.[0]?.material_value &&
              materialArray?.[0]?.material_value.length > 0 && (
                <MaterialArray
                  variantTwoTitle={variantTwoTitle}
                  setSelectMaterial={setSelectMaterial}
                  materialArray={materialArray}
                  selectedDisable={setCurrentDisable}
                  availableMaterials={availableMaterials}
                  selectMaterial={selectMaterial}
                />
              )}

            <View style={[ApplicationStyles.pageSpacing]}>
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
              {DESC_ARR.map((res, index) => (
                <View key={index} style={{ marginTop: verticalScale(20) }}>
                  <View style={styles.titleRow}>
                    <Text style={styles.titleText}>{res.title}</Text>
                    <TouchableOpacity
                      onPress={() => {
                        collapseRow(index);
                        setActiveIndex(index === activeIndex ? null : index);
                        LayoutAnimation.configureNext(
                          LayoutAnimation.Presets.easeInEaseOut
                        );
                      }}
                    >
                      {activeIndex === index ? (
                        <MinusIcon
                          height={Fonts.size.small}
                          width={Fonts.size.small}
                          color={Colors.black}
                        />
                      ) : (
                        <AddIcons />
                      )}
                    </TouchableOpacity>
                  </View>
                  {expandedRows.includes(index) && (
                    <Text style={styles.titleDesc}>{res.desc}</Text>
                  )}
                </View>
              ))}
            </View>
            {route?.params?.isDeleted
              ? null
              : isOrderView !== false && (
                  <View
                    style={[
                      styles.titleRow,
                      ApplicationStyles.pageSpacing,
                      { paddingTop: verticalScale(40) }
                    ]}
                  >
                    {!isRestockRefresh && (
                      <TouchableOpacity
                        style={[
                          styles.addCartView,
                          isWishlist && {
                            borderColor: Colors.orange10
                          },
                          isVendorView && {
                            borderColor: Colors.black110
                          }
                        ]}
                        onPress={() => {
                          isVendorView ? setOpenModal(true) : onPressWishlist();
                        }}
                      >
                        {isVendorView ? (
                          <Trash height={30} width={30} />
                        ) : isWishlist ? (
                          <SelectedBookmark height={50} width={50} />
                        ) : (
                          <AddStart />
                        )}
                      </TouchableOpacity>
                    )}

                    <View style={ApplicationStyles.flex1}>
                      <ButtonComp
                        disabled={
                          userDetail.user_type === 'retailer' && currentDisable
                        }
                        // eslint-disable-next-line react-native/no-inline-styles
                        containerStyle={{
                          opacity:
                            userDetail.user_type === 'retailer' &&
                            currentDisable
                              ? 0.5
                              : 1
                        }}
                        isLoading={loading1}
                        btnTitle={t(
                          isVendorView
                            ? APP_LANGUAGE_CONSTANT.EDIT_PRODUCT
                            : APP_LANGUAGE_CONSTANT.ADD_TO_CART
                        )}
                        onPress={footerBtnEvent}
                      />
                    </View>
                  </View>
                )}

            {isVendorView ? null : (
              <View
                style={[
                  styles.titleRow,
                  {
                    marginTop: verticalScale(41),
                    marginLeft: verticalScale(30)
                  }
                ]}
              >
                <Text style={styles.relatedProductText}>
                  {t(APP_LANGUAGE_CONSTANT.RELATED_PRODUCT)}
                </Text>
              </View>
            )}
            {isVendorView ? null : (
              <View>
                <RelatedProducts
                  horizontal
                  data={relatedProduct}
                  columnWrapperStyle={undefined}
                  contentContainerStyle={styles.contentContainerStyle}
                  onPress={filterProductFun}
                  onPressVisibleBookmark={onPressWishlist}
                />
              </View>
            )}
          </View>
        </>
      )}
      <CommonModal
        openModal={openModal}
        closeModal={() => setOpenModal(false)}
        modalHeading={t(APP_LANGUAGE_CONSTANT.ARE_YOU_SURE)}
        modalTitle={t(APP_LANGUAGE_CONSTANT.DELETE_PERMANENTLY)}
        handleSubmit={() => {
          deleteProduct();
          setOpenModal(false);
        }}
      />
    </ContainerLayout>
  );
}

const styles = StyleSheet.create({
  brandView: {
    ...ApplicationStyles.rowAlignCenterJustifyBetween
  },
  centerLoader: {
    alignSelf: 'center',
    justifyContent: 'center',
    padding: 0,
    height: height / 1.4
  },
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
  colorText: { color: Colors.black },
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
    ...ApplicationStyles.rowAlignCenterJustifyBetween
    // justifyContent: 'flex-start'
  },
  discountPrice: {
    ...ApplicationStyles.normalMontserratFont,
    fontSize: Fonts.size.h4,
    color: Colors.orange10
  },
  currency: {
    fontSize: Fonts.size.f25
  },
  discount: {
    ...ApplicationStyles.mediumMontserratFont,
    fontWeight: Fonts.Weight.medium,
    color: Colors.red,
    marginHorizontal: verticalScale(10)
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
    width: 'auto',
    padding: 10,
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
    width: 'auto',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
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
  },
  addCartView: {
    ...ApplicationStyles.centerView,
    height: verticalScale(66),
    width: horizontalScale(66),
    borderWidth: 2,
    borderColor: Colors.gray10,
    borderRadius: 20,
    marginRight: horizontalScale(15)
  },
  counterContainer: {
    flexDirection: 'row',
    gap: horizontalScale(4),
    marginTop: verticalScale(5),
    marginLeft: verticalScale(7)
  },
  decrement: {
    ...ApplicationStyles.centerView,
    borderWidth: 1,
    borderColor: Colors.gray10,
    borderRadius: 5,
    height: 25,
    width: 25
  },
  counterView: {
    ...ApplicationStyles.centerView,
    borderWidth: 1,
    borderColor: Colors.gray10,
    borderRadius: 5,
    height: 25,
    width: horizontalScale(50)
  },
  input: {
    color: Colors.black200,
    fontFamily: Fonts.type.robotoMedium,
    fontWeight: Fonts.Weight.medium,
    fontSize: Fonts.size.small,
    width: horizontalScale(65),
    paddingVertical: 0,
    paddingHorizontal: 10,
    marginVertical: 0,
    textAlign: 'center'
  },
  plusView: {
    ...ApplicationStyles.centerView,
    height: 25,
    width: 25,
    borderRadius: 5
  },
  disabledButton: {
    borderRadius: 5,
    backgroundColor: Colors.white160,
    borderWidth: 0
  }
});
