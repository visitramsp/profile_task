/* eslint-disable complexity */
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { AppConstant, APP_LANGUAGE_CONSTANT } from '../../../constants';
import { useDispatch } from 'react-redux';
import RNFetchBlob from 'rn-fetch-blob';
import { ColoredPlusIcon } from '../../../assets/icon';
import { Container, UploadFile } from '../../../components';
import LoadingIndicator from '../../../components/common/LoadingIndicator';
import ImagePickerModal from '../../../components/vender/ImagepickerModal';
import { getAllTypes, postAddProduct } from '../../../store/vendor/action';
import { setAllTypes } from '../../../store/vendor/reducer';
import { Colors, Fonts, verticalScale, horizontalScale } from '../../../theme';
import { showError } from '../../../utils';
import { openCamera, openGallery } from '../../../utils/imagepicker';
import validationRule from '../../../utils/validationRules';
import AddProductDetails from './AddProductDetails';
import { actions, initialState, Reducer } from './AddProductState';
import UploadedFiles from './UploadedFiles';
import { ProductDetailStore } from '../../../staticStore/ProductDetailStore';

const condition = [
  {
    uuid: 1,
    title: 'TOP SALE',
    value: 'top_sale'
  },
  {
    uuid: 2,
    title: 'HOT',
    value: 'hot'
  },
  {
    uuid: 3,
    title: 'POPULAR',
    value: 'popular'
  }
];

const vatOptions = [
  {
    uuid: '5',
    title: '5% VAT',
    value: '5% VAT'
  },
  // {
  //   uuid: 'inclusive_vat',
  //   title: 'Inclusive VAT',
  //   value: 'Inclusive VAT'
  // },
  {
    uuid: 'zero_rates_vat',
    title: 'Zero Rates VAT',
    value: 'Zero Rates VAT'
  },
  {
    uuid: 'vat_exempted',
    title: 'VAT Exempted',
    value: 'VAT Exempted'
  }
];

const AddProduct = ({ route }) => {
  const componentArg = route.params;
  const navigation = useNavigation();
  const storeDispatch = useDispatch();
  const { t } = useTranslation();

  const [state, dispatch] = useReducer(Reducer, initialState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllData();
  }, [getAllData]);

  const getAllData = useCallback(() => {
    setLoading(true);
    getAllTypes()
      .then((res) => {
        dispatch({
          type: actions.productBrandList,
          payload: res?.data?.data?.brand
        });
        dispatch({
          type: actions.productCategoryList,
          payload: res?.data?.data?.category_with_brand_sub_category
        });
        dispatch({
          type: actions.productSubCategoryList,
          payload: res?.data?.data?.sub_category
        });
        dispatch({
          type: actions.productWarehouseList,
          payload: res?.data?.data?.warehouse
        });
        dispatch({
          type: actions.productConditionList,
          payload: condition
        });
        dispatch({
          type: actions.vatOptionsList,
          payload: vatOptions
        });
        storeDispatch(setAllTypes(res?.data?.data));
        componentArg?.isProductEdit && prefillEvent(res?.data?.data?.warehouse);
      })
      .catch((error) => showError(error))
      .finally(() => {
        setLoading(false);
      });
  }, [componentArg?.isProductEdit, prefillEvent, storeDispatch]);

  //Only for edit products
  const prefillEvent = useCallback(
    (paramWareHouseList) => {
      dispatch({
        type: actions.productName,
        payload: componentArg?.productDetails?.product_title
      });
      dispatch({
        type: actions.productBrand,
        payload: {
          value:
            componentArg?.productDetails?.brandObj?.title ||
            componentArg?.productDetails?.brand_id
        }
      });
      dispatch({
        type: actions.productCategory,
        payload: {
          value: componentArg?.productDetails?.categoryObj?.title
        }
      });
      dispatch({
        type: actions.productUSC,
        payload: componentArg?.productDetails?.universal_standard_code
      });
      dispatch({
        type: actions.productDiscription,
        payload: componentArg?.productDetails?.product_description
      });
      dispatch({
        type: actions.productSummary,
        payload: componentArg?.productDetails?.summary
      });
      dispatch({
        type: actions.productQuantity,
        payload: componentArg?.productDetails?.variants[0]?.warehouse_arr
          ?.reduce((acc, curr) => acc + Number(curr.quantity), 0)
          ?.toString()
      });
      dispatch({
        type: actions.minimumOrderQuantity,
        payload:
          componentArg?.productDetails?.variants[0]?.minimum_order_quantity
      });
      dispatch({
        type: actions.productSellingPrice,
        payload: componentArg?.productDetails?.variants[0]?.price_details
      });
      dispatch({
        type: actions.productPrice,
        payload: componentArg?.productDetails?.variants[0]?.manufacture_price
      });
      dispatch({
        type: actions.productSubCategory,
        payload: {
          value: { ...componentArg?.productDetails?.subcategoryObj }
        }
      });
      dispatch({
        type: actions.productCondition,
        payload: condition?.find(
          (ele) => ele.value === componentArg?.productDetails?.condition
        )
      });
      dispatch({
        type: actions.vatOptions,
        payload: vatOptions?.find(
          (ele) => ele.uuid === componentArg?.productDetails?.vat
        )
      });
      dispatch({
        type: actions.productWarehouse,
        payload: componentArg?.productDetails?.variants[0]?.warehouse_arr?.map(
          (ele) => ele?.id
        )
      });
      dispatch({
        type: actions.productExpiryDate,
        payload: new Date(
          componentArg?.productDetails?.variants[0]?.expiry_date
        )
      });
      dispatch({
        type: actions.productMRFDate,
        payload: new Date(
          componentArg?.productDetails?.variants[0]?.packaging_date
        )
      });
      dispatch({
        type: actions.isHaveExpiryDate,
        payload: componentArg?.productDetails?.variants[0]?.expiry_date
          ? true
          : false
      });
      const transformed = paramWareHouseList?.map((id) => {
        const item =
          componentArg?.productDetails?.variants[0]?.warehouse_arr?.find(
            (ele) => ele?.id === id?.uuid
          );
        if (item) {
          return {
            ...id,
            quantity: item?.quantity?.toString()
          };
        }
        return id;
      });
      dispatch({
        type: actions.productWarehouseList,
        payload: transformed
      });
      dispatch({
        type: actions.productImages,
        payload: componentArg?.productDetails?.product_images?.map((ele) => ({
          path: ele
        }))
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      componentArg?.productDetails?.brandObj,
      componentArg?.productDetails?.brand_id,
      componentArg?.productDetails?.categoryObj,
      componentArg?.productDetails?.category_id,
      componentArg?.productDetails?.product_buying_price,
      componentArg?.productDetails?.product_description,
      componentArg?.productDetails?.product_images,
      componentArg?.productDetails?.product_selling_price,
      componentArg?.productDetails?.product_title,
      componentArg?.productDetails?.subcategoryObj,
      componentArg?.productDetails?.variants,
      componentArg?.productDetails?.condition
    ]
  );

  const captureFromCamera = async () => {
    try {
      const mediaItem = await openCamera();
      mediaItem && addImages([mediaItem]);
    } catch (error) {
      showError(error);
    }
  };

  const pickFormGallery = async () => {
    const mediaItem = await openGallery(true);
    mediaItem && addImages(mediaItem);
  };

  const closeImageModal = () => {
    dispatch({ type: actions.isCaptureModal, payload: false });
  };

  const openImageModal = () => {
    dispatch({ type: actions.isCaptureModal, payload: true });
  };

  const addImages = (file) => {
    let productImages = [...file, ...state.productImages];
    dispatch({ type: actions.productImages, payload: productImages });
    dispatch({
      type: actions.productImagesError,
      payload: productImages?.length > 0 ? null : t(AppConstant.REQUIRED)
    });
    closeImageModal();
  };

  const removeImages = (index) => {
    let productImages = [...state.productImages];
    productImages.splice(index, 1);
    dispatch({ type: actions.productImages, payload: productImages });
    dispatch({
      type: actions.productImagesError,
      payload: productImages?.length > 0 ? null : t(AppConstant.REQUIRED)
    });
    closeImageModal();
  };

  const onPressSubmit = async () => {
    const warehouseData = state.productWarehouseList
      ?.filter((item) => item?.quantity)
      .map((item, index) => {
        return {
          id: item?.uuid,
          quantity: item?.quantity
        };
      });

    const filteredLocalImages = state?.productImages?.filter(
      (ele) => !ele?.path?.includes('http')
    );
    const filteredHttpImages = state?.productImages
      ?.filter((ele) => ele?.path?.includes('http'))
      .map((ele) => ele?.path);
    const base64Images = await Promise.all(
      filteredLocalImages?.map(async (res, ind) => {
        const base64 = await RNFetchBlob.fs.readFile(res?.path, 'base64');

        if (base64) {
          return {
            uri: base64,
            type: res?.mime,
            name: res?.filename ? res?.filename : `${ind}product.png`
          };
        }
      })
    );

    let obj = {
      universal_standard_code: state?.productUSC,
      title: state?.productName,
      summary: state?.productSummary,
      condition: state?.productCondition?.value,
      brand_id: state?.productBrand,
      description: state?.productDiscription,
      category_id: state?.productCategoryValList,
      addVariant: true,
      other_value: 'demo',
      warehouse_arr: warehouseData,
      price: String(state.productSellingPrice),
      minimum_order_quantity: String(state.minimumOrderQuantity),
      packaging_type: 'plastic',
      product_images: base64Images,
      vat: state.vatOptions?.uuid,
      db_exist_image: filteredHttpImages || [],
      id: ''
    };

    // Add properties only if `state.isHaveExpiryDate` is true
    if (state.isHaveExpiryDate) {
      obj.packaging_date = String(state.productMRFDate);
      obj.expiry_date = state?.productExpiryDate;
    }

    let tempSumUpQty = obj.warehouse_arr?.reduce(
      (acc, currVal) => Number(acc) + Number(currVal?.quantity),
      0
    );
    if (tempSumUpQty === 0 || tempSumUpQty !== Number(state.productQuantity)) {
      showError(t(APP_LANGUAGE_CONSTANT.WAREHOUSEQTYERROR));
      return;
    }

    if (componentArg?.isProductEdit) {
      delete obj?.universal_standard_code;
      delete obj?.title;
      delete obj?.brand_id;
      delete obj?.category_id;
      delete obj?.sub_category_id;
      delete obj?.addVariant;
      delete obj?.expiry_date;
      delete obj?.other_value;
      delete obj?.warehouse_arr;
      delete obj?.price;
      delete obj?.manufacture_price;
      delete obj?.packaging_date;
      delete obj?.packaging_type;
      delete obj?.is_vat_inclusive;
      delete obj?.minimum_order_quantity;
      obj.id = componentArg?.productDetails?.product_uuid;
    } else {
      delete obj?.id;
      delete obj?.db_exist_image;
    }

    setLoading(true);
    postAddProduct(obj)
      .then((res) => {
        if (componentArg?.isProductEdit) {
          res?.data?.data && ProductDetailStore.updateEvent(res?.data?.data);
          navigation.pop();
        } else {
          state?.isHaveVariant
            ? navigation.navigate('AddVarinats', {
                productId: res?.data?.data?.product_id,
                buyingPrice: state?.productBuyingPrice,
                sellingPrice: state.productSellingPrice,
                volume: state.productQuantity,
                moq: String(state.minimumOrderQuantity),
                isHaveDates: state.isHaveExpiryDate,
                expiryDate: state.productExpiryDate,
                mfgDate: state.productMRFDate,
                warehouse: warehouseData
              })
            : navigation.goBack();
        }
      })
      .catch((err) => {
        showError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // eslint-disable-next-line complexity
  const onClickProcced = async () => {
    const imageError =
      state.productImages?.length > 0 ? null : t(AppConstant.REQUIRED);
    const nameError = validationRule.isRequired(
      state.productName,
      t(AppConstant.REQUIRED)
    ).msg;
    const brandError = validationRule.isRequired(
      state.productBrand,
      t(AppConstant.REQUIRED)
    ).msg;
    const categoryError = validationRule.isRequired(
      state.productCategory,
      t(AppConstant.REQUIRED)
    ).msg;
    const descriptionError = validationRule.isRequired(
      state.productDiscription,
      t(AppConstant.REQUIRED)
    ).msg;
    const miniOrderQtyError = validationRule.isRequired(
      state.minimumOrderQuantity,
      t(AppConstant.REQUIRED)
    ).msg;
    const sellingPriceError = validationRule.isRequired(
      state.productSellingPrice,
      t(AppConstant.REQUIRED)
    ).msg;
    const conditionError = validationRule.isRequired(
      state.productCondition?.uuid,
      t(AppConstant.REQUIRED)
    ).msg;
    const quantityError = validationRule.isRequired(
      state.productQuantity,
      t(AppConstant.REQUIRED)
    ).msg;
    const wareHouseError =
      state.productWarehouse?.length > 0 ? null : t(AppConstant.REQUIRED);
    const summaryError = validationRule.isRequired(
      state.productSummary,
      t(AppConstant.REQUIRED)
    ).msg;
    const expiryDateError = validationRule.isRequired(
      state.productExpiryDate,
      t(AppConstant.REQUIRED)
    ).msg;
    const MRFDateError = validationRule.isRequired(
      state.productMRFDate,
      t(AppConstant.REQUIRED)
    ).msg;
    const VATOPTIONERROR = validationRule.isRequired(
      state.vatOptions?.uuid,
      t(AppConstant.REQUIRED)
    ).msg;

    const conditions = state.isHaveExpiryDate // variable for check whether expiry date is available
      ? imageError ||
        nameError ||
        brandError ||
        categoryError ||
        descriptionError ||
        miniOrderQtyError ||
        sellingPriceError ||
        conditionError ||
        quantityError ||
        wareHouseError ||
        summaryError ||
        expiryDateError ||
        MRFDateError ||
        VATOPTIONERROR
      : imageError ||
        nameError ||
        brandError ||
        categoryError ||
        descriptionError ||
        miniOrderQtyError ||
        sellingPriceError ||
        conditionError ||
        quantityError ||
        wareHouseError ||
        VATOPTIONERROR ||
        summaryError;

    if (!componentArg?.isProductEdit && conditions) {
      dispatch({ type: actions.productImagesError, payload: imageError });
      dispatch({ type: actions.productNameError, payload: nameError });
      dispatch({ type: actions.productBrandError, payload: brandError });
      dispatch({ type: actions.productCategoryError, payload: categoryError });
      dispatch({
        type: actions.productDiscriptionError,
        payload: descriptionError
      });
      dispatch({
        type: actions.minimumOrderQuantityError,
        payload: miniOrderQtyError
      });
      dispatch({
        type: actions.productSellingPriceError,
        payload: sellingPriceError
      });
      dispatch({
        type: actions.vatOptionsError,
        payload: VATOPTIONERROR
      });

      dispatch({
        type: actions.productConditionError,
        payload: conditionError
      });
      dispatch({
        type: actions.productQuantityError,
        payload: quantityError
      });

      dispatch({
        type: actions.productWarehouseError,
        payload: wareHouseError
      });
      dispatch({ type: actions.productSummaryError, payload: summaryError });

      if (state.isHaveExpiryDate) {
        dispatch({
          type: actions.productExpiryDateError,
          payload: expiryDateError
        });
        dispatch({ type: actions.productMRFDateError, payload: MRFDateError });
      }

      return;
    } else {
      if (
        imageError ||
        descriptionError ||
        summaryError ||
        conditionError ||
        VATOPTIONERROR
      ) {
        dispatch({
          type: actions.productDiscriptionError,
          payload: descriptionError
        });
        dispatch({
          type: actions.productConditionError,
          payload: conditionError
        });
        dispatch({
          type: actions.vatOptionsError,
          payload: VATOPTIONERROR
        });
        dispatch({ type: actions.productImagesError, payload: imageError });
        dispatch({ type: actions.productSummaryError, payload: summaryError });
        return;
      }
    }
    dispatch({ type: actions.productImagesError, payload: null });
    dispatch({ type: actions.productUSCError, payload: null });
    dispatch({ type: actions.productNameError, payload: null });
    dispatch({ type: actions.productBrandError, payload: null });
    dispatch({ type: actions.productCategoryError, payload: null });

    dispatch({
      type: actions.vatOptionsError,
      payload: null
    });

    dispatch({
      type: actions.productDiscriptionError,
      payload: null
    });
    dispatch({ type: actions.productConditionError, payload: null });
    dispatch({ type: actions.productQuantityError, payload: null });
    dispatch({
      type: actions.productWarehouseError,
      payload: null
    });
    dispatch({ type: actions.productSummaryError, payload: null });
    dispatch({
      type: actions.productExpiryDateError,
      payload: null
    });
    dispatch({ type: actions.productMRFDateError, payload: null });
    onPressSubmit();
  };

  const onUpdateVariant = () => {
    const data = componentArg?.productDetails?.variants;

    let warehouse = [];
    data.forEach((ele) => {
      warehouse = [...warehouse, ...ele?.warehouse_arr];
    });
    warehouse = warehouse.filter(
      (item, index, self) => index === self.findIndex((t) => t.id === item.id)
    );

    if (!componentArg?.hasCustomVariant) {
      navigation.navigate('AddVarinats', {
        productId: componentArg?.productDetails?.product_uuid,
        buyingPrice: state?.productBuyingPrice,
        sellingPrice: state.productSellingPrice,
        volume: state.productQuantity,
        moq: String(state.minimumOrderQuantity),
        isHaveDates: state.isHaveExpiryDate,
        expiryDate: state.productExpiryDate,
        mfgDate: state.productMRFDate,
        warehouse: warehouse
      });
      return;
    }

    const groupByMainVariant = (
      paramsdata,
      mainVariantField,
      variantField,
      variant2Field
    ) => {
      return paramsdata.reduce((acc, item) => {
        const mainVariantValue = item[mainVariantField]?.value;
        if (!acc[mainVariantValue]) {
          acc[mainVariantValue] = [];
        }

        acc[mainVariantValue].push({
          [mainVariantField]: item[mainVariantField],
          [variantField]: item[variantField],
          [variant2Field]: item[variant2Field],
          warehouseList: state.productWarehouseList?.map((ele) => {
            let findIndex = item?.warehouse_arr?.findIndex(
              (ele2) => ele2.id === ele.uuid
            );
            if (findIndex !== -1) {
              return {
                ...ele,
                quantity: item?.warehouse_arr[findIndex]?.quantity?.toString()
              };
            } else {
              return {
                ...ele
              };
            }
          }),
          warehouse: item?.warehouse_arr?.map((ele) => ele?.id),
          price: item.price,
          packagingType: item.packaging_type,
          image: item.images?.map((ele) => ({ uri: ele })),
          imageError: null,
          quantity: item?.total_available_quantity?.toString() || '',
          quantityError: null,
          moq: item?.quantity?.toString() || '',
          moqError: null,
          id: item?.uuid
        });

        return acc;
      }, {});
    };

    const result = groupByMainVariant(
      data,
      'mainVariant',
      'variant1',
      'variant2'
    );
    const output = Object.values(result);
    const mainVariantName = data[0]?.mainVariant?.name;

    navigation.navigate('AddVarinats', {
      componentArg: output,
      isEditProduct: true,
      productId: componentArg?.productDetails?.product_uuid,
      warehouse: warehouse,
      mainVariantName: mainVariantName || ''
    });
  };

  return (
    <Container
      title={
        componentArg?.isProductEdit
          ? t(APP_LANGUAGE_CONSTANT.EDIT_PRODUCT_TITLE)
          : t(APP_LANGUAGE_CONSTANT.ADD_PRODUCT)
      }
    >
      <LoadingIndicator visible={loading} />
      <Text style={styles.headerTitle}>
        {t(APP_LANGUAGE_CONSTANT.PRODUCT_INFORMATION)}
      </Text>
      <TouchableOpacity style={[styles.btn]}>
        <LinearGradient
          colors={[Colors.orange10, Colors.orange30]}
          style={[styles.btnGradient]}
        >
          <View style={styles.icon}>
            <ColoredPlusIcon width={15} height={15} colors={Colors.primary} />
          </View>
          <Text style={[styles.btnTitle]}>
            {t(APP_LANGUAGE_CONSTANT.ADD_MULTIPLE)}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
      <UploadFile
        UploadTitle={t(APP_LANGUAGE_CONSTANT.UPLOAD_PRODUCT_IMAGES)}
        onPress={openImageModal}
      />
      {state.productImagesError && (
        <Text style={styles.errorText}>{state.productImagesError}</Text>
      )}
      <UploadedFiles files={state.productImages} deleteImages={removeImages} />
      <AddProductDetails
        state={state}
        dispatch={dispatch}
        isProductEdit={componentArg?.isProductEdit}
      />

      {componentArg?.isProductEdit && (
        <TouchableOpacity
          style={[styles.proceedBtnContainer]}
          onPress={onUpdateVariant}
        >
          <LinearGradient
            colors={[Colors.orange10, Colors.orange30]}
            style={[styles.proceedBtn]}
          >
            <Text style={[styles.proceedBtnText]}>
              {componentArg?.hasCustomVariant
                ? t(APP_LANGUAGE_CONSTANT.UPDATE_VARIANTS)
                : t(APP_LANGUAGE_CONSTANT.ADD_VARIANTS)}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={[styles.proceedBtnContainer]}
        onPress={onClickProcced}
      >
        <LinearGradient
          colors={[Colors.orange10, Colors.orange30]}
          style={[styles.proceedBtn]}
        >
          <Text style={[styles.proceedBtnText]}>
            {t(APP_LANGUAGE_CONSTANT.PROCEED)}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
      <View style={styles.manageSpace} />
      <ImagePickerModal
        isVisible={state.isCaptureModal}
        setVisibility={closeImageModal}
        openCamera={captureFromCamera}
        openGallery={pickFormGallery}
      />
    </Container>
  );
};

export default AddProduct;

const styles = StyleSheet.create({
  headerTitle: {
    fontFamily: Fonts.type.montserrat,
    fontSize: Fonts.size.semi,
    fontWeight: Fonts.Weight.seven,
    paddingVertical: verticalScale(8)
  },
  btn: {
    shadowColor: Colors.primary,
    shadowOffset: { height: 1, width: 1 },
    shadowRadius: 1,
    shadowOpacity: 2,
    elevation: 5,
    maxWidth:
      Platform.OS === 'android' ? horizontalScale(155) : horizontalScale(146),
    marginTop: verticalScale(10),
    marginBottom: verticalScale(5)
  },
  btnGradient: {
    paddingVertical: verticalScale(4),
    paddingHorizontal: horizontalScale(4),
    borderRadius: 22.5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: horizontalScale(8),
    paddingRight: horizontalScale(0)
  },
  icon: {
    backgroundColor: Colors.white,
    height: verticalScale(30),
    width: verticalScale(30),
    borderRadius: verticalScale(18),
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnTitle: {
    fontFamily: Fonts.type.montserrat,
    fontWeight: Fonts.Weight.bold,
    fontSize: Fonts.size.semi,
    color: Colors.white
  },
  manageSpace: {
    height: verticalScale(130)
  },
  proceedBtnContainer: {
    width: '100%',
    marginTop: verticalScale(16)
  },
  proceedBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 66,
    borderRadius: 20
  },
  proceedBtnText: {
    fontSize: Fonts.size.h20,
    fontFamily: Fonts.type.montserrat,
    fontWeight: Fonts.Weight.bold,
    color: Colors.white
  },
  errorText: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: Fonts.size.small,
    color: Colors.red
  }
});
