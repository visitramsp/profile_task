/* eslint-disable react/jsx-boolean-value */
import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import {
  ButtonComp,
  Container,
  SelectDropdown,
  TextInputFieldPaper
} from '../../../components';
import { useTranslation } from 'react-i18next';
import {
  APP_LANGUAGE_CONSTANT,
  KEYBOARD_TYPE,
  PAYMENT_METHOD
} from '../../../constants';
import { Location, TrashIcons } from '../../../assets/icon';
import styles from './AddRequestScreen.styles';
import { useFormik } from 'formik';
import { ApplicationStyles, horizontalScale } from '../../../theme';
import PaymentMethodInput from '../../../components/paymentMethodInput/PaymentMethodInput';
import {
  getRequestProduct,
  postRequestProduct,
  putRequestProduct
} from '../../../store/retailer/action';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { showError, showToastSuccess } from '../../../utils';
import DropDownOutlet from '../DropDownOutlet';
import { Reducer, initialState } from '../../Vendor/Product/AddProductState';

const PAYMENT_METHOD_ARR = [
  { label: PAYMENT_METHOD.ADVANCE_PAY, value: '1' },
  { label: PAYMENT_METHOD.PAY_AS_YOU_GO, value: '2' },
  { label: PAYMENT_METHOD.AGAINST_DELIVERY, value: '3' },
  { label: PAYMENT_METHOD.GOODS_ON_CREDIT, value: '4' }
];

// eslint-disable-next-line complexity
const AddRequestScreen = ({ navigation, route }) => {
  const { t } = useTranslation();
  const [state, dispatch] = useReducer(Reducer, initialState);
  const outletData = useSelector((state) => state.user?.userDetail?.addresses);
  const [isLoading, setIsLoading] = useState(false);
  const [reqProductData, setReqProductData] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [selectedVariants, setSelectedVariants] = useState([]);
  const [selectedRequestProduct, setSelectedRequestProduct] = useState([]);
  const minValue = selectedProduct?.[0]?.variants?.[0]?.minimum_order_quantity;
  const maxValue = selectedProduct?.[0]?.variants?.[0]?.total_quantity;
  const isProductEdit = route?.params?.isProductEdit;
  const validationSchema = Yup.object().shape({
    productName: Yup.string().required('Please Select Product'),
    outletAddress: Yup.string().required('Please Select Outlet Address'),
    // .of(Yup.string())
    // .min(1, 'Please Select at least one Outlet Address')
    // .required('Please Select Outlet Address'),
    requestPrice: Yup.string().required('Please Enter Price'),
    qty: Yup.number()
      .typeError('Please Enter a valid number')
      .min(minValue && minValue, `Minimum Value must be at least ${minValue}`)
      .max(maxValue && maxValue, `Maximum Value must not exceed ${maxValue}`)
      .required('Please Enter Quantity'),
    paymentMethod: Yup.string().required('Please Enter Payment Method')
  });
  const getRequestProductList = useCallback(() => {
    getRequestProduct()
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
    productName: isProductEdit ? route?.params?.productDetails?.product_id : '',
    outletAddress: isProductEdit
      ? route?.params?.productDetails?.outlet_id
      : [],
    requestPrice: isProductEdit ? route.params?.productDetails?.price : '',
    qty: isProductEdit ? String(route.params?.productDetails?.quantity) : '',
    paymentMethod: isProductEdit
      ? route.params?.productDetails.payment_method
      : '',
    productVariants: ''
  };

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
          price: values.requestPrice,
          id: route.params?.productDetails.uuid,
          outlet_id: values.outletAddress,
          payment_method: values.paymentMethod
        };
        putRequestProduct(reqBody)
          .then((response) => {
            setIsLoading(false);
            showToastSuccess(response.data.message);
            action.resetForm();
            navigation.goBack();
          })
          .catch((error) => {
            setIsLoading(false);
            showError(error);
          });
      } else {
        const reqBody = {
          product_id: values.productName,
          variant_id: selectedProduct?.[0]?.variants?.[0]?.uuid,
          category_id: selectedProduct?.[0]?.category_id,
          outlet_id: values.outletAddress,
          payment_method: values.paymentMethod,
          quantity: values.qty,
          price: values.requestPrice
        };
        postRequestProduct(reqBody)
          .then((response) => {
            setIsLoading(false);
            showToastSuccess(response.data.message);
            action.resetForm();
            navigation.goBack();
          })
          .catch((error) => {
            setIsLoading(false);
            showError(error);
          });
      }
    }
  });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    formik;
  useEffect(() => {
    const productSelectArr = reqProductData?.filter((res) => {
      return res.uuid === values?.productName;
    });
    setSelectedProduct(productSelectArr);
  }, [reqProductData, values?.productName]);

  useEffect(() => {
    const productSelectArr = outletData?.filter((res) => {
      return res.uuid === route?.params?.productDetails?.outlet_id;
    });
    setSelectedRequestProduct(productSelectArr);
  }, [outletData, isProductEdit]);

  return (
    <Container
      title={
        isProductEdit
          ? t(APP_LANGUAGE_CONSTANT.EDIT_REQUEST)
          : t(APP_LANGUAGE_CONSTANT.ADD_REQUEST)
      }
    >
      <SelectDropdown
        isDisable={isProductEdit ? true : false}
        errors={errors?.productName}
        touched={touched.productName}
        placeholder={t(APP_LANGUAGE_CONSTANT.SELECT_PRODUCT)}
        data={reqProductData}
        onChange={(item) => formik.setFieldValue('productName', item?.uuid)}
      />
      <View>
        {selectedProduct?.map((res, index) => (
          <View style={styles.cartView}>
            <View style={styles.imageView}>
              <Image
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
      </View>
      {isProductEdit ? null : (
        <>
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
        </>
      )}
      <View style={styles.outletView}>
        <DropDownOutlet
          data={outletData}
          errors={errors?.outletAddress}
          touched={touched.outletAddress}
          uuid={values.outletAddress}
          placeholder={t(APP_LANGUAGE_CONSTANT.SELECT_OUTLET)}
          value={selectedRequestProduct[0]}
          onchange={(item) => {
            formik.setFieldValue('outletAddress', item);
          }}
          isProductEdit={false}
          state={state}
          dispatch={dispatch}
          isMultiSelect={true}
          searchPlaceholder={t(APP_LANGUAGE_CONSTANT.SEARCH)}
          placeholderText={t(APP_LANGUAGE_CONSTANT.SELECT_OUTLET)}
          renderSelectedItem={(item, unSelect) => (
            <>
              <View style={styles.outletListView}>
                <View style={styles.leftView}>
                  <Location />
                  <Text style={styles.addressText}>{item.address}</Text>
                </View>
                <TouchableOpacity
                  style={{
                    marginRight: horizontalScale(10)
                  }}
                  onPress={() => unSelect && unSelect(item)}
                >
                  <TrashIcons />
                </TouchableOpacity>
              </View>
            </>
          )}
          onChange={(item) => {
            setSelectedRequestProduct([item]);
            formik.setFieldValue('outletAddress', item.uuid);
          }}
        />
        {selectedRequestProduct?.map((item, index) => (
          <View style={styles.outletListView}>
            <View style={styles.leftView}>
              <Location />
              <Text style={styles.addressText}>{item.address}</Text>
            </View>
            <TouchableOpacity
              style={{
                marginRight: horizontalScale(10)
              }}
              // onPress={() => unSelect && unSelect(item)}
            >
              <TrashIcons />
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <View style={styles.inputView}>
        <View style={{ width: horizontalScale(150) }}>
          <TextInputFieldPaper
            label={APP_LANGUAGE_CONSTANT.REQUEST_PRICE}
            underlineStyle={ApplicationStyles.dNone}
            value={values?.requestPrice}
            errors={errors?.requestPrice}
            touched={touched.requestPrice}
            keyboardType={KEYBOARD_TYPE.NUMERIC}
            Icon={
              <Text style={styles.aedText}>{t(APP_LANGUAGE_CONSTANT.AED)}</Text>
            }
            onChangeText={handleChange('requestPrice')}
            onBlur={handleBlur('requestPrice')}
          />
        </View>
        <View style={{ width: horizontalScale(150) }}>
          <TextInputFieldPaper
            label={APP_LANGUAGE_CONSTANT.QUANTITY_REQUIRED}
            underlineStyle={ApplicationStyles.dNone}
            value={values?.qty}
            errors={errors?.qty}
            keyboardType={KEYBOARD_TYPE.NUMERIC}
            touched={touched.qty}
            onChangeText={handleChange('qty')}
            onBlur={handleBlur('qty')}
          />
        </View>
      </View>

      <PaymentMethodInput
        value={values.paymentMethod}
        errors={errors.paymentMethod}
        touched={touched.paymentMethod}
        placeholder={t(APP_LANGUAGE_CONSTANT.PAYMENT_METHOD)}
        data={PAYMENT_METHOD_ARR}
        onBlur={handleBlur('paymentMethod')}
        onChange={(item) => formik.setFieldValue('paymentMethod', item?.label)}
      />

      <View style={styles.buttonView}>
        <ButtonComp
          isLoading={isLoading}
          btnTitle={
            isProductEdit
              ? t(APP_LANGUAGE_CONSTANT.UPDATE)
              : t(APP_LANGUAGE_CONSTANT.SUBMIT_SMALL)
          }
          onPress={handleSubmit}
        />
      </View>
    </Container>
  );
};

export default AddRequestScreen;
