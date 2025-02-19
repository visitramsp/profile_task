/* eslint-disable complexity */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RefreshControl, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { AddButton, Delete, Edit, HorizontalLine } from '../../../assets/icon';
import { CommonModal, Container } from '../../../components';
import { APP_LANGUAGE_CONSTANT, USER_TYPE } from '../../../constants';
import {
  deleteWarehouseAddress,
  toggleDefaultAddress
} from '../../../store/user/reducer';
import { Colors, horizontalScale, verticalScale } from '../../../theme';
import {
  getWarehouseOutlet,
  showError,
  showToastSuccess
} from '../../../utils';
import styles from './WarehouseScreen.styles';
import {
  deleteWarehouse,
  putRequestSetAsDefault
} from '../../../store/vendor/action';

export default function WarehouseScreen({ navigation, route }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { userDetail } = useSelector((state) => state.user);
  const customData = getWarehouseOutlet();

  const [openModal, setOpenModal] = useState(false);
  const [warehouseDetail, setWarehouseDetail] = useState({});
  const [refreshing, setRefreshing] = useState(false);
  const screen = route?.params?.screen;
  const warehouseDelete = async (item) => {
    try {
      const data = {
        id: item?.uuid
      };
      let id = item.id;
      deleteWarehouse(data)
        .then((res) => {
          showToastSuccess(res?.data?.message);
          dispatch(deleteWarehouseAddress({ id }));
        })
        .catch((error) => {
          showError(error);
        });
    } catch (error) {
      showError(error);
    }
  };

  const setAsDefault = async (item) => {
    try {
      const data = {
        id: item?.uuid,
        is_default: true
      };
      let id = item.id;
      putRequestSetAsDefault(data)
        .then((res) => {
          showToastSuccess(res?.data?.message);
          dispatch(toggleDefaultAddress({ id }));
          if (screen === 'cart') {
            navigation.navigate('Cart');
          }
        })
        .catch((error) => {
          showError(error);
        });
    } catch (error) {
      showError(error);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  return (
    <>
      <Container
        title={customData?.title}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text style={styles.profileText}>
          {t(APP_LANGUAGE_CONSTANT.OUTLET_LIST)}
        </Text>
        <View style={styles.mainView}>
          {userDetail.addresses?.map((res, index) => (
            <View
              key={index}
              style={[
                styles.container,
                index === 0 && { marginTop: horizontalScale(0) },
                index >= 1 && { paddingTop: verticalScale(12) }
              ]}
            >
              <View style={styles.nameView}>
                <Text style={styles.nameText}>{res?.name}</Text>
                <TouchableOpacity
                  style={res.status ? styles.buttonView : {}}
                  onPress={() => setAsDefault(res)}
                >
                  <Text
                    style={[
                      res.is_default === 1
                        ? styles.defaultText
                        : styles.setAsDefaultText
                    ]}
                  >
                    {res.is_default === 1
                      ? t(APP_LANGUAGE_CONSTANT.DEFAULT)
                      : t(APP_LANGUAGE_CONSTANT.SET_AS_DEFAULT)}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.addressView}>
                <Text style={styles.addressText}>{res.address}</Text>
              </View>

              <View style={{ marginTop: verticalScale(5) }}>
                <Text style={styles.phoneNumberText}>
                  {' '}
                  {t(APP_LANGUAGE_CONSTANT.PO_BOX)} {' ' + res.po_box}
                </Text>
              </View>
              <View
                style={{
                  marginTop: verticalScale(14),
                  marginBottom: verticalScale(15)
                }}
              >
                <HorizontalLine />
              </View>
              <View style={styles.actionView}>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => {
                    setOpenModal(true);
                    setWarehouseDetail(res);
                  }}
                >
                  <Delete
                    width={horizontalScale(16)}
                    height={verticalScale(16)}
                  />
                  <Text style={styles.deleteText}>
                    {t(APP_LANGUAGE_CONSTANT.DELETE)}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.deleteButton,
                    { marginLeft: horizontalScale(12) }
                  ]}
                  onPress={() =>
                    navigation.navigate('addOutlet', {
                      item: res,
                      from: 'editOutlet'
                    })
                  }
                >
                  <Edit
                    width={horizontalScale(20)}
                    height={verticalScale(20)}
                  />
                  <Text style={[styles.deleteText, { color: Colors.orange10 }]}>
                    {t(APP_LANGUAGE_CONSTANT.EDIT)}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
        <CommonModal
          openModal={openModal}
          closeModal={() => setOpenModal(false)}
          modalHeading={t(APP_LANGUAGE_CONSTANT.ARE_YOU_SURE)}
          modalTitle={t(APP_LANGUAGE_CONSTANT.DELETE_PERMANENTLY)}
          handleSubmit={() => {
            warehouseDelete(warehouseDetail);
            setOpenModal(false);
          }}
        />
      </Container>
      <View style={styles.rightButton}>
        <TouchableOpacity
          style={[
            styles.addContainer,
            userDetail?.user_type === USER_TYPE?.VENDOR && {
              width: horizontalScale(190)
            }
          ]}
          activeOpacity={0.5}
          onPress={() =>
            navigation.navigate('addOutlet', {
              item: null,
              from: 'addOutlet'
            })
          }
        >
          <LinearGradient
            colors={[Colors.primary40, Colors.primary60]}
            style={[
              styles.addButton,
              { backgroundColor: Colors.primary10 },
              userDetail?.user_type === USER_TYPE?.VENDOR && {
                width: horizontalScale(190)
              }
            ]}
          >
            <View style={styles.innerButtom}>
              <Text style={styles.title}>{customData?.addButtonName}</Text>
              <View style={styles.addPlus}>
                <AddButton />
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </>
  );
}
