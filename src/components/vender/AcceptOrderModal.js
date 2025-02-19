import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { RadioBlank, RadioFull, RetailerLocation } from '../../assets/icon';
import GradientButton from '../../components/buttons/GradientButton';
import { APP_LANGUAGE_CONSTANT, Toast } from '../../constants';
import {
  getRetailerRequests,
  putRequestVendor
} from '../../store/vendor/action';
import {
  ApplicationStyles,
  Colors,
  Fonts,
  horizontalScale,
  verticalScale
} from '../../theme';
import { showError, showToastSuccess } from '../../utils';
import CommonLoader from '../CommonLoader';

const AcceptOrderModal = ({ visible, setVisible, id }) => {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  useEffect(() => {
    if (visible) {
      fetchRetailerRequests();
    }
  }, [fetchRetailerRequests, visible]);

  const fetchRetailerRequests = useCallback(() => {
    const queryParams = `retailer_id=${id}`;
    setIsLoading(true);
    getRetailerRequests(queryParams)
      .then((res) => {
        const updatedData = res?.data?.data.map((item, index) => ({
          ...item,
          isChecked: index === 0
        }));
        let arr = selectedItems;
        arr.push(updatedData[0]?.uuid);
        setSelectedItems(arr); // push first item uuid because it is selected by default
        setData(updatedData);
        setIsLoading(false);
      })
      .catch((err) => {
        showError(err);
      });
  }, [id, selectedItems]);

  const handleAcceptOrder = () => {
    const body = {
      request_id: selectedItems,
      status: 'accept'
    };
    putRequestVendor(body)
      .then((res) => {
        resetState();
        showToastSuccess(res?.data?.message);
      })
      .catch((err) => {
        showError(err);
      })
      .finally(() => {
        resetState();
      });
  };

  const toggleSelectItem = (selectedItem) => {
    const updatedData = data.map((item) => ({
      ...item,
      isChecked:
        item.uuid === selectedItem.uuid ? !item.isChecked : item.isChecked
    }));

    const updatedSelectedItems = selectedItems.includes(selectedItem.uuid)
      ? selectedItems.filter((uuid) => uuid !== selectedItem.uuid)
      : [...selectedItems, selectedItem.uuid];

    setData(updatedData);
    setSelectedItems(updatedSelectedItems);
  };

  const renderItem = ({ item }) => (
    <View style={styles.renderItemContainer}>
      <TouchableOpacity
        style={styles.radioButtonContainer}
        onPress={() => toggleSelectItem(item)}
      >
        {item?.isChecked ? <RadioFull /> : <RadioBlank />}
      </TouchableOpacity>
      <View style={styles.itemDetails}>
        <FastImage
          source={{ uri: item?.variantObj?.images[0] }}
          style={styles.image}
        />
        <View style={styles.info}>
          <Text style={styles.name} ellipsizeMode="tail">
            {`${item?.productObj?.brand_id}  ${item?.productObj?.title}`}
          </Text>
          <View style={styles.priceContainer}>
            <Text style={styles.priceText}>
              {t(APP_LANGUAGE_CONSTANT.REQ_PRICE)}
              <Text style={styles.currency}>
                {` ${item?.price} ${t(APP_LANGUAGE_CONSTANT.AED)}`}
              </Text>
            </Text>
            <Text>|</Text>
            <Text style={styles.priceText}>Qty: {item?.quantity}</Text>
          </View>
          <View style={styles.locationContainer}>
            <RetailerLocation width={18} height={20} color={Colors.gray10} />
            <Text style={styles.locationText}>{item?.outletObj?.address}</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const resetState = () => {
    setSelectedItems([]);
    setData([]);
    setVisible(false);
  };

  const handleCancel = () => {
    resetState();
    setVisible(false);
  };

  return (
    <Modal transparent visible={visible} onRequestClose={handleCancel}>
      <View style={styles.container}>
        <View style={styles.modalContent}>
          {data.length > 0 ? (
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={styles.flatListContent}
              showsVerticalScrollIndicator={false}
              ListFooterComponent={<View style={styles.footer} />}
            />
          ) : (
            <View
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                height: verticalScale(400),
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {/* <ActivityIndicator animating={isLoading} /> */}
              <CommonLoader isLoading={isLoading} />
            </View>
          )}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleCancel}
            >
              <Text style={styles.cancelText}>
                {t(APP_LANGUAGE_CONSTANT.CANCEL)}
              </Text>
            </TouchableOpacity>
            <GradientButton
              style={styles.acceptButton}
              title={t(APP_LANGUAGE_CONSTANT.ACCEPT_ORDER)}
              onPress={handleAcceptOrder}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AcceptOrderModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.blackShadow50,
    justifyContent: 'flex-end'
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: verticalScale(30),
    borderTopRightRadius: verticalScale(30),
    height: verticalScale(400),
    padding: verticalScale(10),
    paddingTop: verticalScale(10)
  },
  footer: {
    marginBottom: verticalScale(25)
  },
  flatListContent: {
    marginTop: verticalScale(10)
  },
  renderItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: horizontalScale(15),
    marginVertical: verticalScale(5),
    backgroundColor: Colors.white
  },
  radioButtonContainer: {
    height: verticalScale(25),
    width: verticalScale(25),
    alignItems: 'center',
    justifyContent: 'center'
  },
  itemDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: horizontalScale(12)
  },
  image: {
    height: verticalScale(70),
    width: horizontalScale(70),
    borderRadius: verticalScale(10),
    marginLeft: horizontalScale(8)
  },
  info: {
    gap: verticalScale(6)
  },
  name: {
    fontFamily: Fonts.type.robotoMedium,
    fontSize: Fonts.size.semi,
    color: Colors.black70,
    flexWrap: 'wrap'
  },
  priceContainer: {
    flexDirection: 'row',
    gap: horizontalScale(6)
  },
  priceText: {
    fontFamily: Fonts.type.robotoMedium,
    fontSize: Fonts.size.small,
    color: Colors.black70
  },
  currency: {
    color: Colors.green10
  },
  locationContainer: {
    flexDirection: 'row',
    gap: horizontalScale(4)
  },
  locationText: {
    fontSize: Fonts.size.semi,
    color: Colors.gray10
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: horizontalScale(20),
    marginBottom: verticalScale(10)
  },
  cancelButton: {
    width: '43%',
    borderWidth: verticalScale(1),
    borderColor: Colors.orange10,
    alignItems: 'center',
    justifyContent: 'center',
    height: verticalScale(45),
    borderRadius: 10,
    shadowColor: Colors.primary10 + '30',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 5
  },
  cancelText: {
    ...ApplicationStyles.mediumMontserratFont,
    color: Colors.orange30
  },
  acceptButton: {
    width: '43%'
  }
});
