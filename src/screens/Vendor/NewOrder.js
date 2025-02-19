/* eslint-disable complexity */
import React, { useMemo, useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Container from '../../components/container/Container';
import DropDownWareHouse from './DropDownWarehouse';
import Summary from './summary';
import {
  verticalScale,
  Colors,
  Fonts,
  ApplicationStyles,
  horizontalScale
} from '../../theme';
import Shipment from './shipment';
import PaymentMethod from './Payment';
import {
  geAllRetailer,
  getFlashProductVar,
  postPlaceOrder
} from '../../store/vendor/action';
import {
  APP_LANGUAGE_CONSTANT,
  PAYMENT_METHOD,
  KEYBOARD_TYPE
} from '../../constants';
import { DELIVERY_METHOD } from '../../constants/Enum';
import { useSelector } from 'react-redux';
import { showError, showToastError, showToastSuccess } from '../../utils';
import { useTranslation } from 'react-i18next';
import DropDownRetailer from './DropDownRetailer';
import { useFormik } from 'formik';
import {
  ColoredLocation,
  LightRedTrash,
  MinusIcon,
  PlusIcon
} from '../../assets/icon';
import * as Yup from 'yup';
import FastImage from 'react-native-fast-image';
import DropdownMultipleProduct from './DropdownMultipleProduct';
import { orderBuyCart } from '../../store/retailer/action';
import { ButtonComp } from '../../components';

const NewOrder = ({ navigation, route }) => {
  const data = route?.params?.data;
  const uuid = route?.params?.uuid;

  const { t } = useTranslation();
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [reqProductData, setReqProductData] = useState([]);
  const [retailerData, setRetailerdata] = useState([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState([]);
  const [productUuid, setProductUuid] = useState('');
  const { userDetail } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const [productDetail, setProductDetail] = useState([]);

  const getRequestProductList = useCallback(() => {
    getFlashProductVar()
      .then((response) => {
        response?.data?.data.map((doc) => {
          var obj = doc;
          obj.quantity =
            doc.variants[0].minimum_order_quantity === ''
              ? 0
              : doc.variants[0].minimum_order_quantity;
        });
        setReqProductData(response?.data?.data);
      })
      .catch((err) => {
        showError(err);
      });
  }, []);

  useEffect(() => {
    getRequestProductList();
  }, [getRequestProductList]);

  useEffect(() => {
    getRetailerList();
  }, []);

  const getRetailerList = () => {
    const queryParams = '?user_type=retailer';
    geAllRetailer(queryParams)
      .then((res) => {
        setRetailerdata(res?.data?.data);
      })
      .catch((err) => {
        showError(err);
      }, []);
  };

  const wareHouseData = useMemo(
    () =>
      userDetail?.addresses?.map((res) => {
        if (res?.address) {
          res.title = res?.address;
          res.value = res?.id;
        }
        return res;
      }),
    [userDetail]
  );

  const onPressPlaceOrder = () => {
    if (orderDetail?.warehouse) {
      const obj = {
        request_product_id: uuid,
        warehouse_id: orderDetail?.warehouse?.uuid,
        payment_method: orderDetail?.delivery,
        delivery_method: DELIVERY_METHOD.ITSELF,
        sub_total: totalPrice1,
        delivery_charges: '0',
        payment_status: 'pending',
        country_code: 'UAE',
        status: 'new'
      };
      postPlaceOrder(obj)
        .then((res) => {
          navigation.navigate('VendorDashboard');
          showToastSuccess(res?.data.message);
        })
        .catch((err) => {
          showError(err);
        });
    } else {
      showToastError(t(APP_LANGUAGE_CONSTANT.SELECT_WAREHOUSE));
    }
  };

  const totalPrice = useMemo(() => {
    const matchingObjects = reqProductData.filter((obj) =>
      productDetail.includes(obj.uuid)
    );
    return matchingObjects?.reduce((acc, item) => {
      const quantity = Number(item?.quantity);
      const price = Number(item.variants[0].price_details);
      return acc + quantity * price;
    }, 0);
  }, [reqProductData, productDetail]);

  const vatCharge = useMemo(() => {
    if (productDetail.length > 0) {
      return reqProductData?.reduce((acc, item) => {
        return (totalPrice * item.vat) / 100;
      }, 0);
    } else {
      return 0;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reqProductData]);

  const discount = 0;

  const totalPrice1 = useMemo(
    () => data?.price * data?.quantity,
    [data?.price, data?.quantity]
  );
  const vatCharge1 = useMemo(
    () => (totalPrice1 * data?.productObj?.vat) / 100,
    [data?.productObj?.vat, totalPrice1]
  );
  const [orderDetail, setOrderDetail] = useState({
    warehouse: wareHouseData[0],
    delivery: PAYMENT_METHOD.ADVANCE_PAY
  });

  const initialValues = {
    retailerName: '',
    warehouseName: '',
    productName: ''
  };

  const validationSchema = Yup.object().shape({
    retailerName: Yup.string().required('Please Select Retailer'),
    warehouseName: Yup.string().required('Please Select Warehouse')
  });

  let formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: (values, action) => {
      // return;
      setIsLoading(true);
      const matchingObjects = reqProductData.filter((obj) =>
        productDetail.includes(obj.uuid)
      );
      const productDataFormate = matchingObjects?.map((item) => ({
        quantity: item.quantity,
        product_id: item?.uuid,
        variant_id: item?.variants[0].uuid
      }));
      if (orderDetail?.warehouse) {
        const obj = {
          outlet_id:
            selectedProduct[0].addresses.length > 0
              ? selectedProduct[0].addresses[0].uuid
              : '',

          order_detail: productDataFormate,
          sub_total: totalPrice,
          delivery_charges: '0', //static
          payment_method: orderDetail?.delivery,
          payment_status: 'complete', //static
          card_details: 'asdadadad', //static
          card_data: [
            {
              id: 'asd', //static
              payment: 'a212' //static
            }
          ],
          txn_id: 'aaaaaaaa23123131sdw3123sdf23ea', //static
          delivery_instructions: 'hello world', //static
          payment_id: '', //static
          country_code: 'UAE', //static
          retailer_id: selectedProduct[0].uuid
        };

        orderBuyCart(obj)
          .then((res) => {
            navigation.navigate('VendorDashboard');
          })
          .catch((err) => {
            showError(err);
          });
      } else {
        showToastError(`${t(APP_LANGUAGE_CONSTANT.SELECT_WAREHOUSE)}`);
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

  const handleQuantityChange = (id, newQuantity) => {
    setReqProductData((prevQuantities) =>
      reqProductData.map((q) =>
        q.id === id ? { ...q, quantity: newQuantity } : q
      )
    );
  };

  const handleEndEditing = (id) => {
    setReqProductData((prevQuantities) =>
      prevQuantities?.map((q) => {
        if (q.id === id) {
          const item = reqProductData.find((item) => item.id === id);
          const min = item.moq || 0;
          const max = item.maxQuantity || Infinity;
          const numericQuantity = parseInt(q.quantity, 10);
          if (!q.quantity || isNaN(numericQuantity)) {
            showToastError(`Minimum quantity order is ${min}.`);
            return { ...q, quantity: String(min) };
          } else if (numericQuantity < min) {
            showToastError(`Minimum quantity order is ${min}.`);
            return { ...q, quantity: String(min) };
          } else if (numericQuantity > max) {
            showToastError(`Maximum quantity order is ${max}.`);
            return { ...q, quantity: String(max) };
          } else {
            return q;
          }
        }
        return q;
      })
    );
  };

  const handleIncrement = (id) => {
    setReqProductData((prevQuantities) =>
      prevQuantities.map((q) => {
        if (q.id === id) {
          const item = reqProductData.find((item) => item.id === id);
          const newQuantity = parseInt(q?.quantity, 10) + 1;
          return { ...q, quantity: String(newQuantity) };
          // }
        }
        return q;
      })
    );
  };

  const handleDecrement = (id) => {
    setReqProductData((prevQuantities) =>
      prevQuantities.map((q) => {
        if (q.id === id) {
          const item = reqProductData.find((item) => item.id === id);
          const min = item.minQuantity || 0;
          const newQuantity = parseInt(q.quantity, 10) - 1;
          if (newQuantity >= min) {
            return { ...q, quantity: String(newQuantity) };
          }
        }
        return q;
      })
    );
  };

  const renderSelected = (item, unSelect) => {
    setProductUuid(item.uuid);
    const quantity = Number(
      item.variants[0].minimum_order_quantity === ''
        ? 0
        : item.variants[0].minimum_order_quantity
    );
    const min = item?.moq || 0;
    const max = item?.maxQuantity || Infinity;
    const price =
      Number(item.quantity) * Number(item?.variants[0]?.price_details);
    return (
      <View style={styles.itemContainer}>
        <View style={styles.card}>
          <FastImage
            source={{ uri: item?.variants[0].images[0] }}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.detail}>
            <View style={styles.brandProView}>
              <View>
                <Text style={styles.brand}>
                  {item.brand_name?.toUpperCase()}
                </Text>
                <Text style={styles.name} numberOfLines={1}>
                  {item.title}
                </Text>
              </View>
            </View>
            <Text style={styles.finance} numberOfLines={1}>
              Available Stock : {item?.colorName} | Per Unit :{' '}
              {item?.variants[0]?.price_details} AED | MOQ :{' '}
              {item?.variants[0]?.minimum_order_quantity}
            </Text>
            <View style={styles.quantityView}>
              <View style={styles.counter}>
                <TextInput
                  style={styles.inputOne}
                  maxLength={5}
                  keyboardType={KEYBOARD_TYPE.NUMERIC}
                  value={price.toString()}
                  onChangeText={(text) => handleQuantityChange(item.id, text)}
                  onEndEditing={() => handleEndEditing(item.id)}
                />
                <Text style={styles.currency}>AED</Text>
              </View>
              <View style={[styles.counterContainer]}>
                <TouchableOpacity
                  style={[
                    styles.decrement,
                    quantity <= min && [styles.disabledButton]
                  ]}
                  disabled={quantity <= min}
                  onPress={() => handleDecrement(item.id)}
                >
                  <MinusIcon
                    height={Fonts.size.small}
                    width={Fonts.size.small}
                  />
                </TouchableOpacity>
                <View style={styles.counterView}>
                  <TextInput
                    style={styles.input}
                    maxLength={5}
                    keyboardType={KEYBOARD_TYPE.NUMERIC}
                    value={item.quantity}
                    onChangeText={(text) => handleQuantityChange(item.id, text)}
                    onEndEditing={() => handleEndEditing(item.id)}
                  />
                </View>

                <LinearGradient
                  colors={
                    quantity >= max
                      ? [Colors.transparent, Colors.transparent]
                      : [Colors.orange10, Colors.orange30]
                  }
                  style={[
                    styles.plusView,
                    quantity >= max && [styles.disabledButton]
                  ]}
                >
                  <TouchableOpacity
                    disabled={quantity >= max}
                    onPress={() => handleIncrement(item.id)}
                  >
                    <PlusIcon
                      height={Fonts.size.small}
                      width={Fonts.size.small}
                    />
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <Container horizontalScace={false} title={'Place New Order'}>
      <View style={ApplicationStyles.pageSpacing}>
        {uuid ? null : (
          <View>
            <DropDownRetailer
              errors={errors?.retailerName}
              touched={touched.retailerName}
              placeholder={t(APP_LANGUAGE_CONSTANT.SELECT_RETAILER)}
              data={retailerData}
              value={selectedProduct[0]}
              onChange={(item) => {
                setSelectedProduct([item]);
                formik.setFieldValue('retailerName', item?.uuid);
              }}
            />
            {selectedProduct?.map((item, index) => {
              return (
                <View style={styles.item}>
                  <ColoredLocation />
                  <View style={styles.info}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.address}>
                      {item.addresses.length > 0
                        ? item.addresses[0].address
                        : ''}
                    </Text>
                  </View>
                  <LightRedTrash />
                </View>
              );
            })}
            <View style={styles.mrTop} />
          </View>
        )}
        <DropDownWareHouse
          errors={errors?.warehouseName}
          touched={touched.warehouseName}
          value={selectedWarehouse[0]}
          placeholder={t(APP_LANGUAGE_CONSTANT.SELECT_WAREHOUSES)}
          data={wareHouseData}
          onChange={(item) => {
            setSelectedWarehouse([item]);
            formik.setFieldValue('warehouseName', item?.uuid);
          }}
        />
        {selectedWarehouse?.map((item, index) => (
          <View style={styles.item}>
            <ColoredLocation />
            <View style={styles.info}>
              <Text style={styles.name}>{item.address}</Text>
            </View>
            <LightRedTrash />
          </View>
        ))}
        <View style={styles.mrTop} />
        {uuid ? null : (
          <View>
            <DropdownMultipleProduct
              data={reqProductData}
              errors={errors?.productName}
              touched={touched.productName}
              uuid={values.productName}
              onchange={(item) => {
                setProductDetail(item);
                formik.setFieldValue('productName', item);
              }}
              searchPlaceholder={t(APP_LANGUAGE_CONSTANT.SEARCH)}
              placeholderText={t(APP_LANGUAGE_CONSTANT.SELECT_PRODUCT)}
              renderSelectedItem={renderSelected}
            />
          </View>
        )}
        <Summary
          data={data}
          totalPrice={uuid ? totalPrice1 : totalPrice}
          vatCharge={uuid ? vatCharge1 : vatCharge}
          discount={discount}
        />
        {uuid ? (
          <Shipment data={data} />
        ) : (
          <Shipment
            userType
            data={data}
            change={() => navigation.navigate('warehouseScreen')}
          />
        )}
      </View>

      <PaymentMethod
        orderDetail={orderDetail}
        setOrderDetail={setOrderDetail}
      />

      {/* <TouchableOpacity
        style={[styles.submitBtnContainer]}
        onPress={uuid ? onPressPlaceOrder : handleSubmit}
      >
        <LinearGradient
          colors={[Colors.orange10, Colors.orange30]}
          style={[styles.submitBtn]}
        >
          <Text style={[styles.submitBtnText]}>Place Order</Text>
        </LinearGradient>
      </TouchableOpacity> */}
      <View style={styles.btnCon}>
        <ButtonComp
          btnTitle="Place Order"
          isLoading={isLoading}
          onPress={uuid ? onPressPlaceOrder : handleSubmit}
        />
      </View>
      <View style={styles.manageSpace} />
    </Container>
  );
};

export default NewOrder;

const styles = StyleSheet.create({
  manageSpace: {
    height: verticalScale(100)
  },
  itemContainer: {
    gap: 12,
    width: '100%',
    backgroundColor: Colors.white,
    marginTop: 10
  },
  btnCon: { width: '85%', alignSelf: 'center', marginTop: verticalScale(16) },
  mrTop: { marginTop: 10 },
  item: {
    flexDirection: 'row',
    gap: horizontalScale(8),
    backgroundColor: Colors.lightOrange2,
    borderRadius: verticalScale(20),
    marginTop: verticalScale(10),
    marginBottom: verticalScale(6),
    padding: verticalScale(16),
    alignItems: 'center'
  },
  info: {
    flexDirection: 'column',
    flex: 1,
    paddingHorizontal: horizontalScale(2),
    gap: verticalScale(2)
  },
  name: {
    fontFamily: Fonts.type.robotoBold,
    fontSize: Fonts.size.semi,
    color: Colors.black50
  },
  address: {
    fontFamily: Fonts.type.robotoMedium,
    fontSize: Fonts.size.semi,
    color: Colors.orange30,
    flexWrap: 'wrap'
  },
  brandProView: {
    ...ApplicationStyles.rowAlignCenterJustifyBetween
  },
  card: {
    width: '100%',
    flexDirection: 'row',
    gap: horizontalScale(12),
    backgroundColor: Colors.white
  },
  image: {
    height: horizontalScale(90),
    width: horizontalScale(90),
    borderRadius: horizontalScale(20)
  },
  detail: {
    flex: 1,
    gap: verticalScale(2)
  },
  brand: {
    fontFamily: Fonts.type.montserrat,
    fontSize: Fonts.size.sminy,
    color: Colors.gray20,
    fontWeight: Fonts.Weight.seven,
    paddingTop: 0
  },
  finance: {
    fontFamily: Fonts.type.robotoMedium,
    fontSize: Fonts.size.s10,
    color: Colors.gray20
  },
  quantityView: {
    ...ApplicationStyles.rowAlignCenterJustifyBetween,
    gap: verticalScale(4)
  },
  currency: {
    ...ApplicationStyles.normalMontserratFont,
    fontWeight: Fonts.Weight.seven,
    color: Colors.gray10,
    fontSize: 12
  },
  counterContainer: {
    flexDirection: 'row',
    gap: horizontalScale(4),
    marginTop: 5
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
  counter: {
    ...ApplicationStyles.centerView,
    borderWidth: 1,
    borderColor: Colors.gray10,
    borderRadius: 5,
    marginTop: 5,
    height: 25,
    width: horizontalScale(80),
    flexDirection: 'row'
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
  inputOne: {
    color: Colors.primary,
    fontFamily: Fonts.type.robotoMedium,
    fontWeight: Fonts.Weight.medium,
    fontSize: Fonts.size.small,
    width: horizontalScale(50),
    paddingVertical: 0,
    paddingHorizontal: 2,
    marginVertical: 0,
    textAlign: 'left'
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
