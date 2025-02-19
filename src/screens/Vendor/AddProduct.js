import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  Colors,
  verticalScale,
  Fonts,
  horizontalScale,
  ApplicationStyles,
  height
} from '../../theme';
import FastImage from 'react-native-fast-image';

import {
  ButtonComp,
  Container,
  PaymentMethodInput,
  SelectDropdown,
  TextInputFieldPaper
} from '../../components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import {
  APP_LANGUAGE_CONSTANT,
  KEYBOARD_TYPE,
  PAYMENT_METHOD
} from '../../constants';
import { showError, showToastSuccess } from '../../utils';
import {
  getFlashProductVar,
  postFlashProduct,
  putFlashSaleProduct
} from '../../store/vendor/action';
import DateTimePicker from '../../components/DateTimePicker';

// const PAYMENT_METHOD_ARR = [{ label: 'Pay As You Go', value: '1' }];
const PAYMENT_METHOD_ARR = [
  { label: PAYMENT_METHOD.ADVANCE_PAY, value: '1' },
  { label: PAYMENT_METHOD.PAY_AS_YOU_GO, value: '2' },
  { label: PAYMENT_METHOD.AGAINST_DELIVERY, value: '3' },
  { label: PAYMENT_METHOD.GOODS_ON_CREDIT, value: '4' }
];
const AddProduct = ({ route, navigation }) => {
  const { t } = useTranslation();
  const [reqProductData, setReqProductData] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [selectedVariants, setSelectedVariants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const minValue = selectedProduct?.[0]?.variants?.[0]?.minimum_order_quantity;
  const maxValue = selectedProduct?.[0]?.variants?.[0]?.total_quantity;
  const isProductEdit = route?.params?.isProductEdit;
  const getRequestProductList = useCallback(() => {
    getFlashProductVar()
      .then((response) => {
        setReqProductData(response?.data?.data);
      })
      .catch((err) => {
        showError(err);
      });
  }, []);

  useEffect(() => {
    getRequestProductList();
  }, [getRequestProductList]);

  const initialValues = {
    startDate: isProductEdit ? route?.params?.productDetails?.start_date : '',
    endDate: isProductEdit ? route?.params?.productDetails?.end_date : '',
    productName: isProductEdit ? route?.params?.productDetails?.product_id : '',
    requestPrice: isProductEdit
      ? route.params?.productDetails?.offer_price
      : '',
    qty: isProductEdit ? String(route.params?.productDetails?.quantity) : '',
    paymentMethod: isProductEdit
      ? route.params?.productDetails.payment_method
      : '',
    productVariants: ''
  };
  useEffect(() => {
    const productSelectArr = reqProductData?.filter((res) => {
      return res.uuid === values?.productName;
    });
    setSelectedProduct(productSelectArr);
  }, [reqProductData, values?.productName]);

  const validationSchema = Yup.object().shape({
    productName: Yup.string().required('Please Select Product'),
    requestPrice: Yup.string().required('Please Enter Price'),
    qty: Yup.number()
      .typeError('Please Enter a valid number')
      .min(minValue && minValue, `Minimum Value must be at least ${minValue}`)
      .max(maxValue && maxValue, `Maximum Value must not exceed ${maxValue}`)
      .required('Please Enter Quantity'),
    // paymentMethod: Yup.string().required('Please Enter Payment Method'),
    startDate: Yup.string().required('Please Enter Start Date & Time'),
    endDate: Yup.string().required('Please Enter End Date & Time')
  });

  let formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: (values, action) => {
      setIsLoading(true);
      if (isProductEdit) {
        const reqBody = {
          status: '1',
          quantity: values.qty,
          price: route?.params?.productDetails.price,
          id: route.params?.productDetails.uuid,
          offer_price: values.requestPrice,
          start_date: values.startDate,
          end_date: values?.endDate,
          aqad_price: route?.params?.productDetails.aqad_price
        };
        putFlashSaleProduct(reqBody)
          .then((response) => {
            setIsLoading(false);
            showToastSuccess(response.data.message);
            action.resetForm();
            navigation.replace('FlashSales');
          })
          .catch((error) => {
            setIsLoading(false);
            showError(error);
          });
      } else {
        const reqBody = {
          product_id: values?.productName,
          variant_id: selectedProduct?.[0]?.variants?.[0]?.uuid,
          price: selectedProduct[0]?.variants?.[0]?.price_details,
          status: '1',
          variantObj: selectedVariants[0],
          quantity: values?.qty,
          offer_price: values?.requestPrice,
          startDate: values?.startDate,
          endDate: values?.endDate
        };

        postFlashProduct(reqBody)
          .then((response) => {
            setIsLoading(false);
            showToastSuccess(response?.data?.message);
            action.resetForm();
            navigation.replace('FlashSales');
          })
          .catch((error) => {
            setIsLoading(false);
            showError(error);
          });
      }
    }
  });

  const {
    values,
    errors,
    setFieldValue,
    touched,
    handleBlur,
    handleChange,
    handleSubmit
  } = formik;

  return (
    <>
      <Container
        title={
          isProductEdit
            ? t(APP_LANGUAGE_CONSTANT.EDIT_PRODUCT_TITLE)
            : t(APP_LANGUAGE_CONSTANT.ADD_PRODUCT)
        }
      >
        <SelectDropdown
          isDisable={isProductEdit ? true : false}
          errors={errors?.productName}
          touched={touched.productName}
          placeholder={t(APP_LANGUAGE_CONSTANT.SELECT_PRODUCT)}
          data={reqProductData}
          onChange={(item) => {
            setSelectedProduct([item]);
            formik.setFieldValue('productName', item?.uuid);
          }}
        />

        {selectedProduct?.map((res, index) => (
          <View style={styles.cartView} key={index}>
            <View style={styles.imageView}>
              <FastImage
                source={{ uri: res?.variants?.[0]?.images?.[0] }}
                style={styles.img}
              />
            </View>
            <View style={styles.contentView}>
              <Text style={styles.brandText}>
                {res?.brand_name?.toUpperCase()}
              </Text>
              <Text style={styles.productText}>{res?.title}</Text>
              <View style={styles.variantView}>
                <Text style={styles.colorText}>
                  {t(APP_LANGUAGE_CONSTANT.COLOUR)} :{' '}
                  {res?.variants?.[0]?.color}
                </Text>
                <Text style={styles.colorText}>|</Text>
                <Text style={styles.colorText}>
                  {t(APP_LANGUAGE_CONSTANT.SIZE)} : {res?.variants?.[0]?.size}
                </Text>
                <Text style={styles.colorText}>|</Text>
                <Text style={styles.colorText}>
                  {t(APP_LANGUAGE_CONSTANT.MOD)} :{' '}
                  {res?.variants?.[0]?.minimum_order_quantity}
                </Text>
              </View>
              <View style={styles.priceView}>
                <Text style={styles.priceText}>
                  {res?.variants?.[0]?.price_details}{' '}
                  {t(APP_LANGUAGE_CONSTANT.AED)}
                </Text>
                <Text style={[styles.colorText, styles.unitText]}>
                  {t(APP_LANGUAGE_CONSTANT.PER_UNIT)}
                </Text>
              </View>
            </View>
          </View>
        ))}
        {selectedProduct[0]?.variants?.length > 1 && (
          <View style={styles.marginVer}>
            <SelectDropdown
              errors={errors?.productName}
              touched={touched.productName}
              placeholder={t(APP_LANGUAGE_CONSTANT.SELECT_VARIANTS)}
              data={selectedProduct[0]?.variants}
              onChange={(item) => {
                setSelectedVariants([item]);
                formik.setFieldValue('productVariants', item?.uuid);
              }}
            />
          </View>
        )}

        <View style={styles.inputView}>
          <View style={{ width: horizontalScale(150) }}>
            <TextInputFieldPaper
              label={'Offered Price'}
              keyboardType={KEYBOARD_TYPE.NUMERIC}
              underlineStyle={ApplicationStyles.dNone}
              value={values?.requestPrice}
              errors={errors?.requestPrice}
              touched={touched.requestPrice}
              Icon={
                <Text style={styles.aedText}>
                  {t(APP_LANGUAGE_CONSTANT.AED)}
                </Text>
              }
              onChangeText={handleChange('requestPrice')}
              onBlur={handleBlur('requestPrice')}
            />
          </View>
          <View style={{ width: horizontalScale(150) }}>
            <TextInputFieldPaper
              label={'Minimum Order Qty'}
              keyboardType={KEYBOARD_TYPE.NUMERIC_PAD}
              underlineStyle={ApplicationStyles.dNone}
              value={values?.qty}
              errors={errors?.qty}
              touched={touched.qty}
              onChangeText={handleChange('qty')}
              onBlur={handleBlur('qty')}
            />
          </View>
        </View>

        <View style={ApplicationStyles.rowJustifyBetween}>
          <View style={styles.w47}>
            <DateTimePicker
              title="Start Date & Time"
              value={values.startDate}
              setFieldValue={setFieldValue}
              name={'startDate'}
              errors={errors?.startDate}
              touched={touched.startDate}
            />
          </View>
          <View style={styles.w47}>
            <DateTimePicker
              title="End Date & Time"
              value={values.endDate}
              setFieldValue={setFieldValue}
              name={'endDate'}
              errors={errors?.endDate}
              touched={touched.endDate}
            />
          </View>
        </View>

        <View style={styles.manageSpace} />
      </Container>
      <View style={ApplicationStyles.pageSpacing}>
        <ButtonComp
          isLoading={isLoading}
          btnTitle={t(APP_LANGUAGE_CONSTANT.SUBMIT_SMALL)}
          containerStyle={styles.btn}
          onPress={handleSubmit}
        />
      </View>
    </>
  );
};

export default AddProduct;

const styles = StyleSheet.create({
  cartView: {
    height: verticalScale(90),
    flexDirection: 'row',
    marginTop: verticalScale(10)
  },
  marginVer: { marginTop: verticalScale(8) },
  imageView: {
    height: verticalScale(90),
    width: horizontalScale(90),
    borderRadius: 20
  },
  img: {
    width: horizontalScale(90),
    height: verticalScale(90),
    borderRadius: 20
  },
  contentView: {
    paddingLeft: horizontalScale(8),
    marginTop: verticalScale(6)
  },
  brandText: {
    ...ApplicationStyles.normalMontserratFont,
    fontSize: Fonts.size.sminy,
    color: Colors.white120
  },
  productText: {
    fontFamily: Fonts.type.robotoMedium,
    fontWeight: Fonts.Weight.medium,
    fontSize: Fonts.size.semi,
    color: Colors.black70
  },
  variantView: {
    flexDirection: 'row',
    gap: 5
  },
  colorText: {
    fontFamily: Fonts.type.robotoMedium,
    fontWeight: Fonts.Weight.medium,
    fontSize: Fonts.size.s10,
    color: Colors.gray20
  },
  priceText: {
    ...ApplicationStyles.normalMontserratFont,
    fontWeight: Fonts.Weight.seven,
    color: Colors.orange10
  },
  priceView: {
    ...ApplicationStyles.rowAlignCenter
  },
  unitText: {
    marginLeft: verticalScale(5)
  },
  inputView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(20),
    marginTop: verticalScale(20)
  },
  aedText: {
    fontFamily: Fonts.type.robotoBold,
    fontWeight: Fonts.Weight.seven,
    fontSize: Fonts.size.f20,
    color: Colors.gray10
  },
  btn: {
    position: 'absolute',
    width: '100%',
    bottom: height * 0.18,
    alignSelf: 'center'
  },
  w47: {
    width: '47%'
  }
});
