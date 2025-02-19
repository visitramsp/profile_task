import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView
} from '@gorhom/bottom-sheet';
import React, { useCallback, useMemo } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import {
  ApplicationStyles,
  Colors,
  horizontalScale,
  verticalScale,
  Fonts
} from '../../theme';
import { useTranslation } from 'react-i18next';
import { CloseCircle } from '../../assets/icon';
import SelectDropdown from '../selectDropdown/SelectDropdown';
import LinearGradient from 'react-native-linear-gradient';
import { actions } from '../../screens/Vendor/Product/AddVariantState';
import { useSelector } from 'react-redux';
import { showToastError } from '../../utils';
import { APP_LANGUAGE_CONSTANT } from '../../constants';
import TextInputFieldPaper from '../textInputFieldPaper/TextInputFieldPaper';

// eslint-disable-next-line complexity
const AddVariantBottomSheet = ({
  data,
  bottomSheetModalRef,
  state,
  dispatch
}) => {
  const { t } = useTranslation();
  const wareHouseList = useSelector((state) => state.user.userDetail.addresses);
  const snapPoints = useMemo(() => ['75%'], []);

  const getMainVariants = (prev) => {
    const updatedVariants = { ...prev };
    if (!updatedVariants[state.mainVariantCategory]) {
      updatedVariants[state.mainVariantCategory] = [];
    }
    updatedVariants[state.mainVariantCategory].push(state.mainVariantOption);
    return updatedVariants;
  };

  const addMainVariantOption = () => {
    if (!state.mainVariantCategory || !state.mainVariantOption) {
      return;
    }
    let newVariants = getMainVariants(state.mainVariants);
    dispatch({ type: actions.mainVariants, payload: newVariants });
    dispatch({ type: actions.mainVariantOption, payload: '' });
  };

  const getSubVariants = (prev) => {
    const updatedVariants = { ...prev };
    if (!updatedVariants[state.subVariantCategory]) {
      updatedVariants[state.subVariantCategory] = [];
    }
    updatedVariants[state.subVariantCategory].push(state.subVariantOption);
    return updatedVariants;
  };

  const addSubVariantOption = () => {
    if (!state.subVariantCategory || !state.subVariantOption) {
      return;
    }
    let newSubVariants = getSubVariants(state.subVariants);
    dispatch({ type: actions.subVariants, payload: newSubVariants });
    dispatch({ type: actions.subVariantOption, payload: '' });
  };

  const onPressDropdown = (res) => {
    if (state.mainVariantCategory?.length > 0) {
      res?.title === 'Other' &&
        dispatch({ type: actions.isShowVariantCategoryInput, payload: true });
      dispatch({ type: actions.subVariantCategory, payload: res?.title });
    } else {
      res?.title === 'Other'
        ? dispatch({ type: actions.isShowMainCategoryInput, payload: true })
        : dispatch({ type: actions.mainVariantCategory, payload: res?.title });
    }
    dispatch({ type: actions.isShowDropdown, payload: !state.isShowDropdown });
  };

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        opacity={0.5}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    []
  );

  const generateCombinations = () => {
    if (
      state.mainVariantCategory &&
      state.mainVariants[state.mainVariantCategory]?.length === 0
    ) {
      dispatch({ type: actions.resetVariants });
      bottomSheetModalRef?.current?.dismiss();
      return;
    }
    if (!Object.keys(state.mainVariants).length) {
      showToastError(t(APP_LANGUAGE_CONSTANT.VARIANTS_ADD_ERROR));
      return;
    }

    const combineSubVariants = (variants) => {
      const keys = Object.keys(variants);

      const combine = (acc, subArray, key) =>
        acc.flatMap((accItem) =>
          subArray.map((subItem) => ({
            ...accItem,
            [key]: { name: key, value: subItem }
          }))
        );

      return keys.reduce((acc, key) => combine(acc, variants[key], key), [{}]);
    };

    const subVariantCombinations = combineSubVariants(state.subVariants);

    const allCombinations = [];

    Object.entries(state.mainVariants).forEach(([mainKey, mainOptions]) => {
      mainOptions.forEach((mainOption) => {
        const mainVariantCombinations = [];

        subVariantCombinations.forEach((subCombo) => {
          const newCombo = {
            mainVariant: { name: mainKey, value: mainOption },
            warehouseList: wareHouseList,
            warehouse: state.warehouse
          };

          Object.entries(subCombo).forEach(([subKey, subItem], index) => {
            newCombo[`variant${index + 1}`] = subItem;
          });

          mainVariantCombinations.push(newCombo);
        });

        allCombinations.push(mainVariantCombinations);
      });
    });

    dispatch({ type: actions.combinations, payload: allCombinations });
    bottomSheetModalRef?.current?.dismiss();
  };

  const removeMainVariants = async (key, option) => {
    let obj = {
      ...state.mainVariants
    };
    obj[key] = obj[key].filter((item) => item !== option);

    await dispatch({
      type: actions.mainVariants,
      payload: obj
    });
  };

  const removesubVariants = async (key, option) => {
    let obj = {
      ...state.subVariants
    };
    obj[key] = obj[key].filter((item) => item !== option);

    for (const key in obj) {
      if (Array.isArray(obj[key]) && obj[key].length === 0) {
        delete obj[key];
      }
    }

    await dispatch({
      type: actions.subVariants,
      payload: obj
    });
  };

  return (
    <BottomSheetModal
      enableDismissOnClose
      enablePanDownToClose={false}
      backgroundStyle={styles.sheet}
      ref={bottomSheetModalRef}
      index={0}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      handleIndicatorStyle={{ backgroundColor: Colors.grey10 }}
    >
      <BottomSheetScrollView>
        <View style={styles.modalContainer}>
          <SelectDropdown
            data={data}
            style={styles.commonHeight}
            onChange={(item) => onPressDropdown(item)}
          />

          {state.isShowMainCategoryInput ? (
            <View style={styles.variantBoxSpace}>
              <TextInputFieldPaper
                label={'Enter main variant option'}
                keyboardType="default"
                value={state.mainVariantCategory}
                onChangeText={(text) => {
                  dispatch({
                    type: actions.mainVariantCategory,
                    payload: text
                  });
                }}
                Icon={
                  <TouchableOpacity
                    onPress={() => {
                      dispatch({
                        type: actions.isShowMainCategoryInput,
                        payload: false
                      });
                    }}
                  >
                    <Text style={styles.addBtnText}>ADD</Text>
                  </TouchableOpacity>
                }
              />
            </View>
          ) : (
            <View>
              {state.mainVariantCategory && (
                <>
                  <View
                    style={[styles.verticalSpace, { gap: verticalScale(16) }]}
                  >
                    <TextInputFieldPaper
                      label={'Enter main variant option'}
                      keyboardType="default"
                      value={state.mainVariantOption}
                      onChangeText={(text) => {
                        dispatch({
                          type: actions.mainVariantOption,
                          payload: text
                        });
                      }}
                      Icon={
                        <TouchableOpacity
                          onPress={() => addMainVariantOption()}
                        >
                          <Text style={styles.addBtnText}>ADD</Text>
                        </TouchableOpacity>
                      }
                    />

                    <View style={styles.variantContainer}>
                      <Text style={styles.variantText}>
                        {state.mainVariantCategory}
                      </Text>
                      <View style={styles.innerVariantContainer}>
                        {Object.entries(state.mainVariants)?.map(
                          ([key, options]) =>
                            options.map((option, index) => {
                              return (
                                <View key={index} style={styles.varientBtn}>
                                  <Text key={index} style={styles.buttonText}>
                                    {option}
                                  </Text>
                                  <TouchableOpacity
                                    onPress={() =>
                                      removeMainVariants(key, option)
                                    }
                                  >
                                    <CloseCircle />
                                  </TouchableOpacity>
                                </View>
                              );
                            })
                        )}
                      </View>
                    </View>
                  </View>
                </>
              )}
            </View>
          )}

          <View>
            {(state.subVariantCategory || state.isShowVariantCategoryInput) && (
              <>
                <View style={[styles.variantBoxSpace]}>
                  <TextInputFieldPaper
                    label={'Enter sub variant name'}
                    keyboardType="default"
                    value={state.subVariantCategory}
                    editable={state.isShowVariantCategoryInput}
                    onChangeText={(text) => {
                      dispatch({
                        type: actions.subVariantCategory,
                        payload: text
                      });
                    }}
                    Icon={
                      state.isShowVariantCategoryInput && (
                        <TouchableOpacity
                          onPress={() => {
                            dispatch({
                              type: actions.isShowVariantCategoryInput,
                              payload: false
                            });
                          }}
                        >
                          <Text style={styles.addBtnText}>ADD</Text>
                        </TouchableOpacity>
                      )
                    }
                  />

                  {state.isShowVariantCategoryInput === false && (
                    <View style={styles.variantBoxSpace}>
                      <TextInputFieldPaper
                        label={'Enter sub variant name'}
                        keyboardType="default"
                        value={state.subVariantOption}
                        onChangeText={(text) => {
                          dispatch({
                            type: actions.subVariantOption,
                            payload: text
                          });
                        }}
                        Icon={
                          <TouchableOpacity onPress={addSubVariantOption}>
                            <Text style={styles.addBtnText}>ADD</Text>
                          </TouchableOpacity>
                        }
                      />
                    </View>
                  )}
                </View>

                {Object.entries(state.subVariants)?.length > 0 && (
                  <View
                    style={[{ gap: verticalScale(16) }, styles.verticalSpace]}
                  >
                    <View style={styles.variantContainer}>
                      {Object.entries(state.subVariants)?.map(
                        ([key, options], index) => {
                          return (
                            <View
                              key={key + index}
                              style={{ paddingTop: verticalScale(10) }}
                            >
                              <Text style={styles.variantText}>{key}</Text>
                              <View style={styles.innerVariantContainer}>
                                {options.map((option, index) => {
                                  return (
                                    <View key={index} style={styles.varientBtn}>
                                      <Text
                                        key={index}
                                        style={styles.buttonText}
                                      >
                                        {option}
                                      </Text>
                                      <TouchableOpacity
                                        onPress={() =>
                                          removesubVariants(key, option)
                                        }
                                      >
                                        <CloseCircle />
                                      </TouchableOpacity>
                                    </View>
                                  );
                                })}
                              </View>
                            </View>
                          );
                        }
                      )}
                    </View>
                  </View>
                )}
              </>
            )}
          </View>
          <TouchableOpacity
            style={[styles.submitBtnContainer]}
            onPress={generateCombinations}
          >
            <LinearGradient
              colors={[Colors.orange10, Colors.orange30]}
              style={[styles.submitBtn]}
            >
              <Text style={[styles.submitBtnText]}>Submit</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <View style={styles.manageSpace} />
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  variantBoxSpace: { marginTop: verticalScale(15) },
  sheet: {
    backgroundColor: Colors.secondary,
    borderRadius: 30
  },
  modalContainer: {
    flex: 1,
    marginTop: verticalScale(24),
    paddingHorizontal: horizontalScale(20)
  },
  variantContainer: {
    paddingHorizontal: horizontalScale(8),
    paddingVertical: verticalScale(8),
    borderWidth: 1,
    borderColor: Colors.gray10,
    borderRadius: 20,
    gap: verticalScale(8)
  },

  variantText: {
    fontFamily: Fonts.type.robotoBold,
    fontSize: Fonts.size.h20,
    color: Colors.primary,
    textTransform: 'capitalize'
  },
  innerVariantContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  varientBtn: {
    flexDirection: 'row',
    backgroundColor: Colors.lightGray10,
    gap: horizontalScale(4),
    paddingVertical: horizontalScale(6),
    paddingHorizontal: horizontalScale(8),
    borderRadius: horizontalScale(10),
    marginRight: horizontalScale(4),
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: verticalScale(4)
  },
  buttonText: {
    color: Colors.white,
    fontFamily: Fonts.type.robotoRegular,
    fontSize: Fonts.size.medium
  },

  commonHeight: {
    height: verticalScale(52)
  },
  addBtnText: {
    color: Colors.primary,
    fontFamily: Fonts.type.montserrat,
    fontSize: Fonts.size.medium,
    fontWeight: Fonts.Weight.seven
  },
  verticalSpace: {
    marginVertical: verticalScale(16)
  },
  submitBtnContainer: {
    width: '100%',
    marginTop: verticalScale(16)
  },
  submitBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 66,
    borderRadius: 20
  },
  submitBtnText: {
    fontSize: Fonts.size.h20,
    fontFamily: Fonts.type.montserrat,
    fontWeight: Fonts.Weight.bold,
    color: Colors.white
  },
  manageSpace: {
    height: verticalScale(60)
  }
});

export default AddVariantBottomSheet;
