/* eslint-disable complexity */
import React, {
  useReducer,
  useRef,
  useMemo,
  useLayoutEffect,
  useEffect,
  useState
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { AddVariantBottomSheet, ContainerLayout } from '../../../components';
import Varinats from './Varinats';
import WareHouse from './Warehouses';
import ProductVariation from './ProductVariation';
import {
  verticalScale,
  Colors,
  Fonts,
  horizontalScale,
  ApplicationStyles
} from '../../../theme';
import { initialState, Reducer, actions } from './AddVariantState';
import { useSelector } from 'react-redux';
import {
  deleteProductVariant,
  postAddProductWithVariant,
  postEditProductVariant
} from '../../../store/vendor/action';
import { showError, showToastError } from '../../../utils';
import { ColoredPlusIcon } from '../../../assets/icon';
import { APP_LANGUAGE_CONSTANT, AppConstant } from '../../../constants';
import { useTranslation } from 'react-i18next';
import RNFetchBlob from 'rn-fetch-blob';
import validationRule from '../../../utils/validationRules';

function AddVarinats({ route, navigation }) {
  const { t } = useTranslation();
  const addVariantsModalRef = useRef(null);
  const [state, dispatch] = useReducer(Reducer, initialState);
  const [deleteVariantIds, setDeleteVariantIds] = useState([]);

  const productId = route?.params?.productId;
  const {
    buyingPrice,
    sellingPrice,
    volume,
    expiryDate,
    mfgDate,
    warehouse,
    moq,
    isHaveDates,
    componentArg,
    mainVariantName = '',
    isEditProduct = false
  } = route?.params;

  const { getAll } = useSelector((vendorState) => vendorState.vendor);

  const formattedData = useMemo(() => {
    return [
      {
        title: 'color',
        arr: getAll?.color?.map(({ uuid, value }) => ({ uuid, value }))
      },
      {
        title: 'material',
        arr: getAll?.material?.map(({ uuid, value }) => ({ uuid, value }))
      },
      {
        title: 'size',
        arr: getAll?.size?.map(({ uuid, value }) => ({ uuid, value }))
      },
      { title: 'Other' }
    ];
  }, [getAll.color, getAll.material, getAll.size]);

  useLayoutEffect(() => {
    dispatch({
      type: actions.warehouse,
      payload: warehouse?.map((ele) => ele.id)
    });
    dispatch({
      type: 'UPDATE_WAREHOUSE_FOR_ALL',
      payload: warehouse?.map((ele) => ele.id)
    });
  }, []);

  useEffect(() => {
    if (isEditProduct) {
      dispatch({
        type: actions.combinations,
        payload: componentArg
      });
      dispatch({
        type: actions.mainVariantCategory,
        payload: mainVariantName
      });
    }
  }, []);

  const transformData = async (input) => {
    const transformed = await Promise.all(
      input?.map(async (group) => {
        return Promise.all(
          group?.map(async (item) => {
            const warehouseData = item?.warehouseList
              ?.filter((item) => item.quantity)
              .map((item) => {
                return {
                  id: item?.uuid,
                  quantity: item?.quantity
                };
              });

            let images = await Promise.all(
              item?.image
                ?.filter((ele) => !ele?.uri?.includes('http'))
                ?.map(async (ele, index) => {
                  const base64 = await RNFetchBlob.fs.readFile(
                    ele?.uri,
                    'base64'
                  );
                  return {
                    ...ele,
                    uri: base64,
                    name: `arr-${index}-${ele?.name}`
                  };
                }) || []
            );

            const filteredHttpImages = item?.image
              ?.filter((ele) => ele?.uri?.includes('http'))
              .map((ele) => ele?.uri);

            const payload = {
              id: item?.id || null,
              product_id: productId,
              mainVariant: {
                name: item?.mainVariant?.name,
                value: item?.mainVariant?.value
              },
              variant1: {
                name: item?.variant1?.name,
                value: item?.variant1?.value
              },
              variant2: {
                name: item?.variant2?.name,
                value: item?.variant2?.value
              },
              warehouse: warehouseData,
              price: item?.price || '',
              quantity: item?.quantity || '',
              images: images,
              db_exist_image: filteredHttpImages,
              packagingType: item?.packagingType || '',
              minimum_order_quantity: item?.moq || '',
              packaging_date: item?.packagingDate || '',
              expiry_date: item?.expiryDate || '',
              size_id: '',
              material_id: '',
              color_id: ''
            };

            !payload.id && delete payload.id;
            !isEditProduct && delete payload.db_exist_image;
            images.length === 0 && delete payload.images;

            return payload;
          })
        );
      })
    );

    return transformed.flat();
  };

  const onSubmitAddProduct = async () => {
    const result = await transformData(state?.combinations);

    let hasErrors = false;
    state?.combinations?.filter((item, index) => {
      // eslint-disable-next-line complexity
      item?.filter((obj, i) => {
        let variantDetails = {
          groupIndex: index,
          itemIndex: i,
          price: '20',
          priceError: validationRule.isRequired(
            obj?.price,
            t(AppConstant.REQUIRED)
          ).msg,
          quantity: obj?.quantity,
          quantityError: validationRule.isRequired(
            obj?.quantity,
            t(AppConstant.REQUIRED)
          ).msg,
          image: obj?.image,
          imageError: validationRule.isRequired(
            obj?.image,
            t(AppConstant.REQUIRED)
          ).msg,
          warehouse: obj?.warehouse,
          warehouseError: validationRule.isRequired(
            obj?.warehouse?.length === 0 ? '' : 'true',
            t(AppConstant.REQUIRED)
          ).msg,
          packagingType: obj?.packagingType,
          packageError: validationRule.isRequired(
            obj?.packagingType,
            t(AppConstant.REQUIRED)
          ).msg,
          moq: obj?.moq,
          moqError: validationRule.isRequired(obj?.moq, t(AppConstant.REQUIRED))
            .msg,
          expiryDate: obj?.expiryDate,
          packagingDate: obj?.packagingDate,
          warehouseList: obj?.warehouseList,
          warehouseListError: validationRule.isRequired(
            obj?.warehouseList?.length === 0 ? '' : 'true',
            t(AppConstant.REQUIRED)
          ).msg,
          expiryDateError: validationRule.isRequired(
            obj?.expiryDate,
            t(AppConstant.REQUIRED)
          ).msg,
          packagingDateError: validationRule.isRequired(
            obj?.packagingDate,
            t(AppConstant.REQUIRED)
          ).msg
        };

        if (
          variantDetails?.priceError ||
          variantDetails?.quantityError ||
          variantDetails?.imageError ||
          variantDetails?.warehouseError ||
          variantDetails?.packageError ||
          variantDetails?.moqError ||
          variantDetails?.warehouseListError ||
          (isHaveDates &&
            (variantDetails?.expiryDateError ||
              variantDetails?.packagingDateError)) ||
          state?.warehouse?.length === 0 ||
          !Number?.isInteger(
            Number(
              variantDetails?.warehouseList?.find((x) => x?.quantity)?.quantity
            )
          ) ||
          Number(
            variantDetails?.warehouseList?.find((x) => x?.quantity)?.quantity
          ) <= 0
        ) {
          hasErrors = true;
        }

        dispatch({
          type: 'UPDATE_VARIANT_DETAILS',
          payload: variantDetails
        });
      });
    });

    const keyName = isEditProduct ? 'variants' : 'arr';
    const obj = {
      product_id: productId,
      [keyName]: result
    };

    let isQtyMatchUp = true;
    obj?.arr?.forEach((ele) => {
      let tempSumUpQty = ele.warehouse?.reduce(
        (acc, currVal) => Number(acc) + Number(currVal?.quantity),
        0
      );
      if (tempSumUpQty === 0 || tempSumUpQty !== Number(ele.quantity)) {
        isQtyMatchUp = false;
        return;
      }
    });

    if (!isQtyMatchUp) {
      showError(t(APP_LANGUAGE_CONSTANT.WAREHOUSEQTYERROR));
      return;
    }
    hasErrors
      ? showToastError(t(APP_LANGUAGE_CONSTANT.FILL_DETAIL))
      : !isEditProduct
      ? postAddProductWithVariant(obj)
          .then((res) => {
            navigation.navigate('Product');
          })
          .catch((err) => {
            showError(err);
          })
      : postEditProductVariant(obj)
          .then((res) => {
            navigation.navigate('Product');
          })
          .catch((e) => {
            showError(e);
          });
  };

  const validateVariants = () => {
    if (isEditProduct && deleteVariantIds?.length > 0) {
      deleteProductVariant({ id: deleteVariantIds })
        .then((res) => {
          onSubmitAddProduct();
        })
        .catch((e) => {});
    } else {
      onSubmitAddProduct();
    }
  };

  const onPressAddVariants = () => {
    addVariantsModalRef?.current?.present();
  };

  return (
    <ContainerLayout
      scrollable={false}
      title={t(APP_LANGUAGE_CONSTANT.ADD_VARIANTS)}
      customStyle={{ backgroundColor: Colors.white }}
      chidernContainerStyle={ApplicationStyles.pageSpacing}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {!isEditProduct && (
          <TouchableOpacity style={[styles.btn]} onPress={onPressAddVariants}>
            <LinearGradient
              colors={[Colors.orange10, Colors.orange30]}
              style={[styles.btnGradient]}
            >
              <View style={styles.icon}>
                <ColoredPlusIcon
                  width={15}
                  height={15}
                  colors={Colors.primary}
                />
              </View>
              <Text style={[styles.btnTitle]}>
                {t(APP_LANGUAGE_CONSTANT.ADD_VARIANTS)}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        )}

        <Varinats state={state} dispatch={dispatch} />
        {state.combinations.length >= 1 && (
          <>
            <WareHouse state={state} dispatch={dispatch} />

            <ProductVariation
              state={state}
              setDeleteVariantIds={setDeleteVariantIds}
              dispatch={dispatch}
              buyingPrice={buyingPrice}
              sellingPrice={sellingPrice}
              volume={volume}
              expiryDate={expiryDate}
              mfgDate={mfgDate}
              moq={moq}
              actions={actions}
              isEditProduct={isEditProduct}
              isHaveDates={isHaveDates}
            />
            <TouchableOpacity
              style={[styles.proceedBtnContainer]}
              onPress={validateVariants}
            >
              <LinearGradient
                colors={[Colors.orange10, Colors.orange30]}
                style={[styles.proceedBtn]}
              >
                <Text style={[styles.proceedBtnText]}>Submit</Text>
              </LinearGradient>
            </TouchableOpacity>
          </>
        )}
        <View style={styles.manageSpace} />
      </ScrollView>
      <AddVariantBottomSheet
        data={formattedData}
        bottomSheetModalRef={addVariantsModalRef}
        state={state}
        dispatch={dispatch}
      />
    </ContainerLayout>
  );
}

export default AddVarinats;

const styles = StyleSheet.create({
  proceedBtnContainer: {
    paddingTop: verticalScale(30),
    paddingBottom: verticalScale(80)
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
  btnGradient: {
    paddingVertical: verticalScale(4),
    paddingHorizontal: horizontalScale(4),
    borderRadius: 22.5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: horizontalScale(12),
    paddingRight: horizontalScale(12)
  },
  icon: {
    backgroundColor: Colors.white,
    height: 35,
    width: 35,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnTitle: {
    fontFamily: Fonts.type.montserrat,
    fontWeight: Fonts.Weight.bold,
    fontSize: Fonts.size.semi,
    color: Colors.white
  },
  btn: {
    shadowColor: Colors.primary,
    shadowOffset: { height: 1, width: 1 },
    shadowRadius: 1,
    shadowOpacity: 2,
    elevation: 5,
    alignSelf: 'flex-start',
    marginTop: verticalScale(30)
  },
  manageSpace: {
    height: verticalScale(80)
  }
});
