/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/jsx-boolean-value */
import React, { useCallback, useEffect, useState } from 'react';
import {
  ColoredLocation,
  LightRedTrash,
  CheckBoxIcon
} from '../../../assets/icon';
import { actions } from './AddProductState';
import validationRule from '../../../utils/validationRules';
import { useTranslation } from 'react-i18next';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import {
  SelectDropdown,
  SelectMultiDropdown,
  TextInputFieldPaper
} from '../../../components';
import DateTimePicker from '../../../components/DateTimePicker/DateTimePicker';
import {
  APP_LANGUAGE_CONSTANT,
  AppConstant,
  KEYBOARD_TYPE,
  SCREEN_NAME
} from '../../../constants';
import {
  ApplicationStyles,
  Colors,
  Fonts,
  horizontalScale,
  verticalScale
} from '../../../theme';
import CustomDropDown from '../../../components/Dropdown/CustomDropDown';
import { getAllCategory } from '../../../store/vendor/action';
import { showError } from '../../../utils';
import { useNavigation } from '@react-navigation/native';

// eslint-disable-next-line complexity
function AddProductDetails({ state, dispatch, isProductEdit }) {
  const navigation = useNavigation();
  const { isRequired } = validationRule;
  const { t } = useTranslation();
  const [isVisibleWasehouse, setisVisibleWasehouse] = useState(false);
  // eslint-disable-next-line complexity
  const handleChange = (type, value) => {
    switch (type) {
      case actions.productUSC:
        dispatch({ type: actions.productUSC, payload: value });
        dispatch({
          type: actions.productUSCError,
          payload: isRequired(value, t(AppConstant.REQUIRED)).msg
        });
        break;
      case actions.productName:
        dispatch({ type: actions.productName, payload: value });
        dispatch({
          type: actions.productNameError,
          payload: isRequired(value, t(AppConstant.REQUIRED)).msg
        });
        break;
      case actions.productDiscription:
        dispatch({ type: actions.productDiscription, payload: value });
        dispatch({
          type: actions.productDiscriptionError,
          payload: isRequired(value, t(AppConstant.REQUIRED)).msg
        });
        break;
      case actions.minimumOrderQuantity:
        dispatch({ type: actions.minimumOrderQuantity, payload: value });
        dispatch({
          type: actions.minimumOrderQuantityError,
          payload: isRequired(value, t(AppConstant.REQUIRED)).msg
        });
        break;
      case actions.productSellingPrice:
        dispatch({ type: actions.productSellingPrice, payload: value });
        dispatch({
          type: actions.productSellingPriceError,
          payload: isRequired(value, t(AppConstant.REQUIRED)).msg
        });
        break;
      case actions.productQuantity:
        dispatch({ type: actions.productQuantity, payload: value });
        dispatch({
          type: actions.productQuantityError,
          payload: isRequired(value, t(AppConstant.REQUIRED)).msg
        });
        break;
      case actions.productSummary:
        dispatch({ type: actions.productSummary, payload: value });
        dispatch({
          type: actions.productSummaryError,
          payload: isRequired(value, t(AppConstant.REQUIRED)).msg
        });
        break;
      default:
        break;
    }
  };

  const haveVarient = () => {
    dispatch({ type: actions.isHaveVariant, payload: !state.isHaveVariant });
  };

  const haveExpiry = () => {
    dispatch({
      type: actions.isHaveExpiryDate,
      payload: !state.isHaveExpiryDate
    });
  };

  useEffect(() => {
    getAllData();
  }, [getAllData]);

  const getAllData = useCallback(() => {
    getAllCategory()
      .then((res) => {
        dispatch({
          type: actions.productAllCategoryList,
          payload: res?.data?.data
        });
      })
      .catch((error) => showError(error));
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <View>
        <CustomDropDown
          isDisable={isProductEdit}
          label={t(AppConstant.SELECT_CATEGORY_PLACEHOLDER)}
          data={state.productAllCategoryList}
          value={state.productCategory?.value}
          onSelect={(item, list) => {
            dispatch({ type: actions.productCategoryValList, payload: list });
            dispatch({ type: actions.productCategory, payload: item });
            dispatch({
              type: actions.productCategoryError,
              payload: validationRule.isRequired(item, t(AppConstant.REQUIRED))
                .msg
            });
          }}
        />

        {state.productCategoryError && (
          <Text
            style={[
              styles.errorText,
              { marginTop: -verticalScale(15), marginBottom: verticalScale(15) }
            ]}
          >
            {state.productCategoryError}
          </Text>
        )}
      </View>
      <View
        style={[ApplicationStyles.flex1, { marginTop: -verticalScale(21) }]}
      >
        <TextInputFieldPaper
          label={t(AppConstant.PRODUCT_NAME)}
          isDisable={isProductEdit}
          style={styles.commonHeight}
          labelStyle={styles.labelStyle}
          valueStyle={styles.valueStyle}
          underlineStyle={ApplicationStyles.dNone}
          value={state.productName}
          onChangeText={(text) => handleChange(actions.productName, text)}
        />
        {state.productNameError && (
          <Text style={styles.errorText}>{state.productNameError}</Text>
        )}
      </View>
      <View>
        <TextInputFieldPaper
          label={t(AppConstant.SELECT_BRAND)}
          isDisable={isProductEdit}
          labelStyle={styles.labelStyle}
          valueStyle={styles.valueStyle}
          style={styles.commonHeight}
          underlineStyle={ApplicationStyles.dNone}
          value={state.productBrand?.value}
          onChangeText={(text) =>
            dispatch({ type: actions.productBrand, payload: text })
          }
        />
        {state.productBrandError && (
          <Text style={styles.errorText}>{state.productBrandError}</Text>
        )}
      </View>
      <View>
        <TextInputFieldPaper
          label={t(AppConstant.UNIVERSAL_STANDARD_CODE)}
          isDisable={isProductEdit}
          labelStyle={styles.labelStyle}
          valueStyle={styles.valueStyle}
          style={styles.commonHeight}
          underlineStyle={ApplicationStyles.dNone}
          value={state.productUSC}
          onChangeText={(text) => handleChange(actions.productUSC, text)}
        />
        {state.productUSCError && (
          <Text style={styles.errorText}>{state.productUSCError}</Text>
        )}
      </View>

      <View>
        <TextInputFieldPaper
          multiline
          containerStyle={[styles.decription]}
          label={t(AppConstant.DESCRIPTION_PLACEHOLDER)}
          labelStyle={styles.labelStyle}
          valueStyle={styles.valueStyle}
          maxLength={200}
          value={state.productDiscription}
          placeholderTextColor={Colors.gray10}
          onChangeText={(text) =>
            handleChange(actions.productDiscription, text)
          }
        />
        {state.productDiscriptionError && (
          <Text style={styles.errorText}>{state.productDiscriptionError}</Text>
        )}
      </View>
      <View
        style={[
          styles.questionContainer,
          isProductEdit && ApplicationStyles.productFieldDisable
        ]}
      >
        {state.isHaveVariant ? (
          <TouchableOpacity
            disabled={isProductEdit}
            style={[
              styles.checkbox,
              isProductEdit && { backgroundColor: `${Colors.gray10}44` }
            ]}
            onPress={haveVarient}
          >
            <CheckBoxIcon height={14} width={14} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            disabled={isProductEdit}
            style={[
              styles.box,
              isProductEdit && { backgroundColor: `${Colors.gray10}44` }
            ]}
            onPress={haveVarient}
          />
        )}
        <Text style={[styles.question, styles.labelStyle]}>
          {t(APP_LANGUAGE_CONSTANT.PRODUCT_VARIANTS_AVAILABLE)}?
        </Text>
      </View>
      <View style={styles.horizontal}>
        <View style={[ApplicationStyles.flex1]}>
          <TextInputFieldPaper
            label={t(APP_LANGUAGE_CONSTANT.MOQ)}
            style={[ApplicationStyles.flex1, styles.commonHeight]}
            labelStyle={styles.labelStyle}
            isDisable={isProductEdit}
            valueStyle={styles.valueStyle}
            value={state.minimumOrderQuantity}
            keyboardType="number-pad"
            onChangeText={(text) =>
              handleChange(actions.minimumOrderQuantity, text)
            }
          />
          {state.minimumOrderQuantityError && (
            <Text style={styles.errorText}>
              {state.minimumOrderQuantityError}
            </Text>
          )}
        </View>
        <View style={[ApplicationStyles.flex1]}>
          <TextInputFieldPaper
            label={t(APP_LANGUAGE_CONSTANT.SELLING_PRICE)}
            style={[ApplicationStyles.flex1, styles.commonHeight]}
            labelStyle={styles.labelStyle}
            isDisable={isProductEdit}
            valueStyle={styles.valueStyle}
            value={state.productSellingPrice}
            keyboardType="number-pad"
            Icon={
              <Text style={styles.aedText}>{t(APP_LANGUAGE_CONSTANT.AED)}</Text>
            }
            onChangeText={(text) =>
              handleChange(actions.productSellingPrice, text)
            }
          />
          {state.productSellingPriceError && (
            <Text style={styles.errorText}>
              {state.productSellingPriceError}
            </Text>
          )}
        </View>
      </View>
      <View>
        <SelectDropdown
          placeholder={t(AppConstant.CONDITION_PLACEHOLDER)}
          style={styles.commonHeight}
          data={state.productConditionList}
          value={state.productCondition}
          onChange={(item) => {
            dispatch({ type: actions.productCondition, payload: item });
            dispatch({
              type: actions.productConditionError,
              payload: validationRule.isRequired(
                item.uuid,
                t(AppConstant.REQUIRED)
              ).msg
            });
          }}
        />

        {state.productConditionError && (
          <Text style={styles.errorText}>{state.productConditionError}</Text>
        )}
      </View>
      <View>
        <TextInputFieldPaper
          label={t(AppConstant.QUANTITY_PLACEHOLDER)}
          labelStyle={styles.labelStyle}
          valueStyle={styles.valueStyle}
          isDisable={isProductEdit}
          style={styles.commonHeight}
          value={state.productQuantity}
          keyboardType={KEYBOARD_TYPE.NUMERIC_PAD}
          onChangeText={(text) => handleChange(actions.productQuantity, text)}
        />
        {state.productQuantityError && (
          <Text style={styles.errorText}>{state.productQuantityError}</Text>
        )}
      </View>
      <View
        style={[
          styles.questionContainer,
          isProductEdit && ApplicationStyles.productFieldDisable
        ]}
      >
        {state.isHaveExpiryDate ? (
          <TouchableOpacity
            disabled={isProductEdit}
            style={[
              styles.checkbox,
              isProductEdit && {
                backgroundColor: `${Colors.gray10}44`,
                borderColor: Colors.gray10
              }
            ]}
            onPress={haveExpiry}
          >
            <CheckBoxIcon height={14} width={14} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            disabled={isProductEdit}
            style={[
              styles.box,
              isProductEdit && { backgroundColor: `${Colors.gray10}44` }
            ]}
            onPress={haveExpiry}
          />
        )}
        <Text style={[styles.question, styles.labelStyle]}>
          {t(APP_LANGUAGE_CONSTANT.DOES_THIS_PRODUCT_HAVE_EXPIRY_DATE)}?
        </Text>
      </View>
      {state.isHaveExpiryDate && (
        <View style={styles.horizontal}>
          <View style={[ApplicationStyles.flex1]}>
            <DateTimePicker
              btnStyle={styles.commonHeight}
              placeholder={'Expiry Date'}
              disabled={isProductEdit}
              labelStyle={styles.labelStyle}
              valueStyle={styles.valueStyle}
              date={state.productExpiryDate}
              isHideLabel={state?.productExpiryDate ? true : false}
              onChange={(date) => {
                dispatch({
                  type: actions.productExpiryDate,
                  payload: new Date(date)
                });
                dispatch({
                  type: actions.productExpiryDateError,
                  payload: validationRule.isRequired(
                    date,
                    t(AppConstant.REQUIRED)
                  ).msg
                });
              }}
            />
            {state.productExpiryDateError && (
              <Text style={styles.errorText}>
                {state.productExpiryDateError}
              </Text>
            )}
          </View>
          <View style={[ApplicationStyles.flex1]}>
            <DateTimePicker
              placeholder={'MFG Date'}
              labelStyle={styles.labelStyle}
              valueStyle={styles.valueStyle}
              disabled={isProductEdit}
              btnStyle={styles.commonHeight}
              date={state.productMRFDate}
              isHideLabel={state?.productMRFDate ? true : false}
              onChange={(date) => {
                dispatch({
                  type: actions.productMRFDate,
                  payload: new Date(date)
                });
                dispatch({
                  type: actions.productMRFDateError,
                  payload: validationRule.isRequired(
                    date,
                    t(AppConstant.REQUIRED)
                  ).msg
                });
              }}
            />
            {state.productMRFDateError && (
              <Text style={styles.errorText}>{state.productMRFDateError}</Text>
            )}
          </View>
        </View>
      )}
      <View>
        <SelectDropdown
          placeholder={t(AppConstant.VAT)}
          style={styles.commonHeight}
          data={state.vatOptionsList}
          value={state.vatOptions}
          onChange={(item) => {
            dispatch({ type: actions.vatOptions, payload: item });
            dispatch({
              type: actions.vatOptionsError,
              payload: validationRule.isRequired(
                item.uuid,
                t(AppConstant.REQUIRED)
              ).msg
            });
          }}
        />

        {state.productConditionError && (
          <Text style={styles.errorText}>{state.productConditionError}</Text>
        )}
      </View>
      <View style={[isProductEdit && { opacity: 0.7 }]}>
        <SelectMultiDropdown
          activeColor={Colors.orange50}
          disable={false}
          style={styles.commonHeight}
          isAddWarehouse={
            state.productWarehouseList.length === 0 ? true : false
          }
          SelectDropdownData={[{ title: t(AppConstant.ADD_WAREHOUSE) }]}
          SelectDropdownOnChange={() => {
            navigation.navigate(SCREEN_NAME.WAREHOUSESCREEN);
          }}
          SelectDropdownValue={t(AppConstant.ADD_WAREHOUSE)}
          SelectDropdownPlaceholder={t(
            AppConstant.SELECTED_WAREHOUSE_PLACEHOLDER
          )}
          data={state.productWarehouseList}
          uuid={state.productWarehouse}
          placeholderText={t(AppConstant.SELECTED_WAREHOUSE_PLACEHOLDER)}
          onchange={(item) => {
            setisVisibleWasehouse(true);
            dispatch({
              type: actions.productWarehouse,
              payload: item
            });
            dispatch({
              type: actions.productWarehouseError,
              payload: item?.length > 0 ? null : t(AppConstant.REQUIRED)
            });
          }}
          isProductEdit={isProductEdit}
          state={state}
          dispatch={dispatch}
          isMultiSelect={true}
          renderSelectedItem={(item, unSelect) => {
            return isVisibleWasehouse ? (
              <View
                key={item?.uuid + item?._index}
                style={[
                  styles.warehouse,
                  { backgroundColor: Colors.lightOrange2 }
                ]}
              >
                <ColoredLocation />
                <Text style={styles.address}>{item?.address}</Text>
                <TextInput
                  style={styles.quantity}
                  maxLength={5}
                  placeholder={'qty'}
                  keyboardType={KEYBOARD_TYPE.NUMERIC_PAD}
                  value={item?.quantity}
                  editable={!isProductEdit}
                  onChangeText={(text) => {
                    const transformed = state?.productWarehouseList?.map(
                      (id) => {
                        if (id?.uuid === item?.uuid) {
                          return {
                            ...id,
                            quantity: text
                          };
                        }
                        return id;
                      }
                    );

                    dispatch({
                      type: actions.productWarehouseList,
                      payload: transformed
                    });
                  }}
                />
                <TouchableOpacity
                  disabled={isProductEdit}
                  onPress={() => unSelect && unSelect(item)}
                >
                  <LightRedTrash />
                </TouchableOpacity>
              </View>
            ) : (
              <></>
            );
          }}
        />
        {state.productWarehouseError && (
          <Text style={styles.errorText}>{state.productWarehouseError}</Text>
        )}
      </View>
      <View>
        <TextInputFieldPaper
          multiline
          containerStyle={[styles.decription]}
          labelStyle={styles.labelStyle}
          valueStyle={styles.valueStyle}
          label={t(AppConstant.SUMMARY_PLACEHOLDER)}
          maxLength={200}
          value={state.productSummary}
          placeholderTextColor={Colors.gray10}
          onChangeText={(text) => handleChange(actions.productSummary, text)}
        />
        {state.productSummaryError && (
          <Text style={styles.errorText}>{state.productSummaryError}</Text>
        )}
      </View>
    </View>
  );
}

export default AddProductDetails;

const styles = StyleSheet.create({
  container: {
    gap: verticalScale(20)
  },
  decription: {
    height: verticalScale(150)
  },
  commonHeight: {
    height: verticalScale(52)
  },
  box: {
    height: horizontalScale(22),
    width: horizontalScale(22),
    borderWidth: 1,
    borderColor: Colors.black110,
    borderRadius: horizontalScale(6)
  },
  checkbox: {
    height: horizontalScale(22),
    width: horizontalScale(22),
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: horizontalScale(6),
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center'
  },
  questionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: horizontalScale(8)
  },
  question: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: Fonts.size.h20,
    color: Colors.black70
  },
  horizontal: {
    flexDirection: 'row',
    gap: horizontalScale(8)
  },
  warehouse: {
    flexDirection: 'row',
    width: '100%',
    gap: horizontalScale(8),
    backgroundColor: Colors.white,
    borderRadius: verticalScale(20),
    marginVertical: verticalScale(6),
    padding: verticalScale(16)
  },
  address: {
    fontFamily: Fonts.type.robotoMedium,
    fontSize: Fonts.size.semi,
    color: Colors.orange30,
    flexWrap: 'wrap',
    flex: 1
  },
  errorText: {
    color: Colors.red,
    paddingLeft: verticalScale(8),
    paddingTop: verticalScale(2),
    fontSize: 12,
    marginTop: verticalScale(4)
  },
  aedText: {
    fontFamily: Fonts.type.robotoBold,
    fontWeight: Fonts.Weight.seven,
    fontSize: Fonts.size.f20,
    color: Colors.gray10
  },
  quantity: {
    backgroundColor: Colors.secondary,
    paddingVertical: 0,
    paddingHorizontal: horizontalScale(10),
    borderRadius: 4,
    color: Colors.orange30,
    fontSize: Fonts.size.uprSemi,
    fontFamily: Fonts.type.robotoMedium
  },
  labelStyle: {
    fontSize: Fonts.size.uprSemi,
    fontFamily: Fonts.type.robotoRegular,
    fontWeight: Fonts.Weight.low
  },
  valueStyle: {
    fontSize: Fonts.size.uprSemi,
    fontFamily: Fonts.type.robotoBold,
    fontWeight: Fonts.Weight.seven
  }
});
