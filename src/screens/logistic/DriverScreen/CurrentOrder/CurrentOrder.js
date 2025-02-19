import React from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { AppIcon } from '../../../../assets/icon';
import DottedLine from '../../../../components/common/DottedLine';
import { Container } from '../../../../components';
import {
  APP_LANGUAGE_CONSTANT,
  AppConstant
} from '../../../../constants/AppConstant';
import { Colors } from '../../../../theme';
import styles from './CurrentOrder.styles';
import LinearGradient from 'react-native-linear-gradient';

const DummyData = [
  {
    name: 'Fortune Sunlite Refined Sunflower',
    packageType: '50 Crate',
    quantity: 600,
    image: AppIcon.DummyImage1
  },
  {
    name: 'Fortune Sunlite Refined Sunflower',
    packageType: '50 Crate',
    quantity: 600,
    image: AppIcon.DummyImage1
  },
  {
    name: 'Fortune Sunlite Refined Sunflower',
    packageType: '50 Crate',
    quantity: 600,
    image: AppIcon.DummyImage1
  },
  {
    name: 'Fortune Sunlite Refined Sunflower',
    packageType: '50 Crate',
    quantity: 600,
    image: AppIcon.DummyImage1
  },
  {
    name: 'Fortune Sunlite Refined Sunflower',
    packageType: '50 Crate',
    quantity: 600,
    image: AppIcon.DummyImage1
  },
  {
    name: 'Fortune Sunlite Refined Sunflower',
    packageType: '50 Crate',
    quantity: 600,
    image: AppIcon.DummyImage1
  }
];

const DummyData2 = [
  {
    id: 1,
    type: 'Pickup',
    name: 'Cameron Williamson',
    image: AppIcon.DummyImage1
  },
  {
    id: 2,
    type: 'Drop',
    name: 'Cameron Williamson',
    image: AppIcon.DummyImage1
  },
  {
    id: 3,
    type: 'Support',
    name: 'Cameron Williamson',
    image: AppIcon.DummyImage1
  }
];

export default function CurrentOrder() {
  const { t } = useTranslation();

  const renderItem = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.itemImageContainer}>
          <Image source={item?.image} style={styles.itemImage} />
        </View>
        <View style={styles.itemDetailsContainer}>
          <Text style={styles.itemName}>{item?.name}</Text>
          <Text style={styles.itemDetail}>
            {t(APP_LANGUAGE_CONSTANT.PACKAGE_TYPE)} {item?.packageType}
          </Text>
          <Text style={styles.itemDetail}>
            {t(APP_LANGUAGE_CONSTANT.QUANTITY)} : {item?.quantity}
          </Text>
        </View>
        <View style={styles.scannerContainer}>
          <Image source={AppIcon.scanner} style={styles.scannerImage} />
        </View>
      </View>
    );
  };

  const renderContactDetails = ({ item }) => {
    return (
      <View style={styles.contactContainer}>
        <View style={styles.contactImageContainer}>
          <Image source={item?.image} style={styles.contactImage} />
        </View>
        <View style={styles.contactDetailsContainer}>
          <Text style={styles.contactType}>{item?.type}</Text>
          <Text style={styles.contactName}>{item?.name}</Text>
        </View>
        <View style={styles.contactIconContainer}>
          <Image source={AppIcon.Message} style={styles.contactIcon} />
        </View>
        <View style={styles.contactIconContainer}>
          <Image source={AppIcon.Call} style={styles.contactIcon} />
        </View>
      </View>
    );
  };

  // eslint-disable-next-line react/no-unstable-nested-components
  const ListFooterComponent = () => {
    return (
      <View style={styles.footerContainer}>
        <TouchableOpacity style={styles.reportButton}>
          <Image source={AppIcon.Info} style={styles.buttonIcon} />
          <Text style={styles.reportButtonText}>
            {t(APP_LANGUAGE_CONSTANT.REPORT)}
          </Text>
        </TouchableOpacity>
        <View style={styles.footerSpacer} />
        <LinearGradient
          colors={[Colors.orange10, Colors.orange30]} // Dark at top, light at bottom
          start={{ x: 0.5, y: 0 }} // Top-center (dark)
          end={{ x: 0.5, y: 1 }} // Bottom-center (light)
          style={styles.LinearGradient}
        >
          <TouchableOpacity style={styles.downloadButton}>
            <Image source={AppIcon.Download} style={styles.buttonIcon} />
            <Text style={styles.downloadButtonText}>
              {t(APP_LANGUAGE_CONSTANT.DOWNLOAD_INVOICE)}
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    );
  };

  return (
    <Container title={t(APP_LANGUAGE_CONSTANT.CURRENT_ORDER)}>
      <View style={styles.orderHeader}>
        <View>
          <Text style={styles.orderIdText}>
            {t(APP_LANGUAGE_CONSTANT.CURRENT_ORDER_ID)} : #526403
          </Text>
          <Text style={styles.orderTimeText}>
            {t(AppConstant.ORDER_TIME)}: Monday, February 15,2024 at 6:38 pm
          </Text>
        </View>
      </View>
      <View style={styles.addressContainer}>
        <View style={styles.addressIconColumn}>
          <Image source={AppIcon.PickUp} style={styles.addressIcon} />
          <DottedLine />
          <Image source={AppIcon.Location} style={styles.addressIcon} />
        </View>
        <View style={styles.addressTextColumn}>
          <Text style={styles.addressTitle}>
            {t(APP_LANGUAGE_CONSTANT.PICKUP_ADDRESS)}
          </Text>
          <Text style={styles.addressText}>
            Forest Hills South Side, Pasthal, Boisar, 401504
          </Text>
          <View style={styles.addressGap} />
          <Text style={styles.addressTitle}>
            {t(APP_LANGUAGE_CONSTANT.DROP_ADDRESS)}
          </Text>
          <Text style={styles.addressText}>
            Another Address Example, City, Zip Code
          </Text>
        </View>
      </View>
      <View style={styles.announcementContainer}>
        <Image source={AppIcon.Speaker} style={styles.speakerIcon} />
        <Text style={styles.announcementText}>
          Lorem ipsum dolor sit amet consecteur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna
        </Text>
      </View>
      <Text style={styles.productListTitle}>
        {t(APP_LANGUAGE_CONSTANT.PRODUCT_LIST)}{' '}
        <Text style={styles.itemCount}>({DummyData.length})</Text>
      </Text>
      <FlatList
        style={styles.listContainer}
        showsVerticalScrollIndicator={false}
        data={DummyData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={ListFooterComponent}
      />
      <Text style={styles.productListTitle}>
        {t(APP_LANGUAGE_CONSTANT.CONTACT_DETAILS)}{' '}
        <Text style={styles.itemCount}>({DummyData2.length})</Text>
      </Text>
      <FlatList
        style={styles.listContainer}
        data={DummyData2}
        showsVerticalScrollIndicator={false}
        renderItem={renderContactDetails}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.contactListContainer}
      />
      <TouchableOpacity style={styles.arrivedButton}>
        <Text style={styles.arrivedButtonText}>
          {t(APP_LANGUAGE_CONSTANT.READY_FOR_DELIVERY)}
        </Text>
      </TouchableOpacity>
    </Container>
  );
}
