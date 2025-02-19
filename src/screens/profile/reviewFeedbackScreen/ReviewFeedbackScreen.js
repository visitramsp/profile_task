import React, { useState } from 'react';
import { Container, SearchBar } from '../../../components';
import { APP_LANGUAGE_CONSTANT } from '../../../constants';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './ReviewFeedbackScreen.styles';
import { ApplicationStyles, Colors, verticalScale } from '../../../theme';
import { StarNormal } from '../../../assets/icon';

const data = [
  {
    id: 1,
    orderId: '239752349874',
    BrandName: 'Nike',
    productName: 'Nike Air Jordon',
    qty: 500,
    price: 14674,
    sellerRate: 3,
    logisticRate: 4
  },
  {
    id: 2,
    orderId: '239752349874',
    BrandName: 'Nike',
    productName: 'Air Jordon',
    qty: 500,
    price: 14674,
    sellerRate: 3,
    logisticRate: 4
  },
  {
    id: 3,
    orderId: '239752349874',
    BrandName: 'Nike',
    productName: 'Air Jordon',
    qty: 500,
    price: 14674,
    sellerRate: 3,
    logisticRate: 4
  }
];
const ReviewFeedbackScreen = () => {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const RATTING_NUM = [1, 2, 3, 4, 5];
  return (
    <Container title={t(APP_LANGUAGE_CONSTANT.REVIEWS_AND_FEEDBACK)}>
      <SearchBar value={search} onChangeValue={setSearch} />

      {data?.map((res, index) => (
        <View
          key={index}
          style={[
            styles.mainView,
            index === 0 && { marginTop: verticalScale(20) }
          ]}
        >
          <Text style={styles.orderText}>
            Order Id <Text style={styles.orderIdText}>#{res.orderId}</Text>
          </Text>
          <View style={styles.productView}>
            <Text style={styles.productName}>
              {res.BrandName} - {res.productName}
            </Text>
            <Text style={styles.priceText}>{res.price} AED</Text>
          </View>
          <Text style={styles.qty}>Quantity : {res.qty}</Text>

          <Text style={styles.ratingText}>Ratings : </Text>
          <View style={{ ...ApplicationStyles.rowAlignCenterJustifyBetween }}>
            <Text style={styles.retailerText}>Seller</Text>
            <View style={styles.rattingView}>
              {RATTING_NUM.map((num) => (
                <TouchableOpacity key={num}>
                  {(index === 2 ? 0 : 3) >= num ? (
                    <StarNormal
                      height={20}
                      width={20}
                      style={{ color: Colors.orange10 }}
                    />
                  ) : (
                    <StarNormal
                      height={20}
                      width={20}
                      style={{ color: Colors.gray10 }}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View
            style={{
              ...ApplicationStyles.rowAlignCenterJustifyBetween,
              marginTop: verticalScale(3)
            }}
          >
            <Text style={styles.retailerText}>Logistic</Text>
            <View style={styles.rattingView}>
              {RATTING_NUM.map((num) => (
                <TouchableOpacity key={num}>
                  {(index === 2 ? 0 : 3) >= num ? (
                    <StarNormal
                      height={20}
                      width={20}
                      style={{ color: Colors.orange10 }}
                    />
                  ) : (
                    <StarNormal
                      height={20}
                      width={20}
                      style={{ color: Colors.gray10 }}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
          {index === 2 && (
            <Text style={styles.reqRateText}>
              Please Rate the above order ?
            </Text>
          )}
        </View>
      ))}
    </Container>
  );
};

export default ReviewFeedbackScreen;
