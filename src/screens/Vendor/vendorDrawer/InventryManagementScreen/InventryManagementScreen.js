import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  LayoutAnimation,
  RefreshControl
} from 'react-native';
import { DownArrow, OrangeDownload, UpArrow } from '../../../../assets/icon';
import {
  Colors,
  verticalScale,
  Fonts,
  ApplicationStyles,
  width
} from '../../../../theme';
import AddButton from '../../Product/AddButton';
import { APP_LANGUAGE_CONSTANT, AppConstant } from '../../../../constants';
import { useTranslation } from 'react-i18next';
import { ContainerLayout } from '../../../../components';
import { useSelector } from 'react-redux';
import {
  getInventory,
  getInventoryProduct
} from '../../../../store/app/action';
import { showError } from '../../../../utils';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const CustomText = ({ style, title }) => (
  <Text style={style} numberOfLines={3}>
    {title}
  </Text>
);

const API_LIMIT = 25;

const InventryManagementScreen = ({ navigation, route }) => {
  const { t } = useTranslation();
  const data = useSelector((state) => state.app.inventoryData);
  const warehouseId = useSelector((state) => state.app.warehouseId);
  const { bottom } = useSafeAreaInsets();

  const [inventoryData, setInventoryData] = useState([]);
  const [isShowProduct, setIsShowProduct] = useState(null);
  const [isShowVariant, setIsShowVariant] = useState(false);
  const [footerLoader, setFooterLoader] = useState(false);
  const [pageCount, setPageCount] = useState(2);
  const [refreshing, setRefreshing] = useState(false);

  // useEffect(() => {
  //   setInventoryData(data?.data?.data);
  // }, [data?.data]);

  useEffect(() => {
    setInventoryData(data);
  }, [data]);

  useEffect(() => {
    fetchInventoryData();
  }, [fetchInventoryData]);

  const fetchInventoryData = useCallback(() => {
    const queryParams = `?warehouse_id=${warehouseId}`;
    getInventory(queryParams)
      .then((res) => {})
      .catch((err) => {
        showError(err);
      })
      .finally(() => {
        setRefreshing(false);
      });
  }, [warehouseId]);

  const renderItem = ({ item, index }) => {
    const onPressProduct = () => {
      setIsShowVariant(index === isShowVariant ? null : index);
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    };
    return (
      <View key={index}>
        <TouchableOpacity
          activeOpacity={0.5}
          style={{
            paddingLeft: width * 0.1,
            paddingVertical: verticalScale(10)
          }}
          onPress={onPressProduct}
        >
          <Text style={styles.productText}>{item?.title}</Text>
        </TouchableOpacity>
        {isShowVariant === index && (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.table}>
              <View style={styles.row}>
                <CustomText
                  style={[styles.cell, styles.headerCell]}
                  title={AppConstant.COLOR}
                />
                <CustomText
                  style={[styles.cell, styles.headerCell]}
                  title={AppConstant.SIZE}
                />
                <CustomText
                  style={[styles.cell, styles.headerCell]}
                  title={AppConstant.MATERIAL}
                />
                <CustomText
                  style={[styles.cell, styles.headerCell]}
                  title={AppConstant.PRICE}
                />
                <CustomText
                  style={[styles.cell, styles.headerCell]}
                  title={AppConstant.QUANTITY}
                />
                <CustomText
                  style={[styles.cell, styles.headerCell]}
                  title={AppConstant.DESCRIPTION}
                />
              </View>

              {item?.variantObj?.map((variant, key) => {
                return (
                  <View key={key} style={styles.row}>
                    <CustomText
                      style={styles.cell}
                      title={variant?.colorObj?.value}
                    />
                    <CustomText
                      style={styles.cell}
                      title={variant?.sizeObj?.value}
                    />
                    <CustomText
                      style={styles.cell}
                      title={variant?.materialObj?.value}
                    />
                    <CustomText
                      style={styles.cell}
                      title={variant?.price_details}
                    />
                    <CustomText
                      style={styles.cell}
                      title={variant?.warehouse_total_quantity}
                    />
                    <CustomText style={styles.cell} title={item?.description} />
                  </View>
                );
              })}
            </View>
          </ScrollView>
        )}
      </View>
    );
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchInventoryData();
  };

  const renderCategory = (res, i) => {
    const onPressCategory = () => {
      setIsShowProduct(i === isShowProduct ? null : i);
      setIsShowVariant(null);
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    };
    return (
      <View key={i}>
        <TouchableOpacity
          style={styles.categoryItem}
          activeOpacity={0.5}
          onPress={onPressCategory}
        >
          <Text style={styles.categoryText}>{res?.category}</Text>
          {isShowProduct === i ? (
            <UpArrow height={15} width={15} />
          ) : (
            <DownArrow height={15} width={15} />
          )}
        </TouchableOpacity>
        {isShowProduct === i && (
          <FlatList
            bounces
            data={res?.products}
            showsVerticalScrollIndicator={false}
            style={{ marginBottom: bottom }}
            renderItem={renderItem}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
              />
            }
            keyExtractor={(item, index) => index?.toString()}
            onEndReached={onEndReached}
          />
        )}
      </View>
    );
  };

  const onEndReached = () => {
    if (
      inventoryData?.[isShowProduct]?.category_total_count >
        inventoryData?.[isShowProduct]?.products?.length &&
      !footerLoader
    ) {
      setFooterLoader(true);
      const queryParams = `?category_id=${inventoryData?.[isShowProduct]?.categoryKeyId}&warehouse_id=${warehouseId}&page=${pageCount}&limit=${API_LIMIT}`;
      getInventoryProduct(queryParams)
        .then((res) => {
          setPageCount(pageCount + 1);
          setInventoryData((prevCategories) =>
            prevCategories.map((category, i) =>
              i === isShowProduct
                ? {
                    ...category,
                    products: [
                      ...(category.products || []),
                      ...(res?.data?.data[0]?.products || [])
                    ]
                  }
                : category
            )
          );
        })
        .catch((err) => {
          showError(err);
        })
        .finally(() => {
          setFooterLoader(false);
        });
    }
  };

  return (
    <ContainerLayout
      scrollable={false}
      title={t(APP_LANGUAGE_CONSTANT.INVENTORY_MANAGEMENT)}
      customStyle={{
        backgroundColor: Colors.white
      }}
    >
      <View style={styles.container}>
        {inventoryData?.map((res, i) => renderCategory(res, i))}
      </View>
      {/* <AddButton
        title={t(APP_LANGUAGE_CONSTANT.DOWNLOAD_FILE)}
        Icon={OrangeDownload}
        style={{ bottom: verticalScale(50) }}
      /> */}
    </ContainerLayout>
  );
};

export default InventryManagementScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: verticalScale(10)
  },
  categoryItem: {
    ...ApplicationStyles.rowAlignCenterJustifyBetween,
    ...ApplicationStyles.pageSpacing,
    paddingVertical: verticalScale(10)
  },
  categoryText: {
    ...ApplicationStyles.mediumMontserratFont
  },
  productText: {
    ...ApplicationStyles.mediumMontserratFont,
    fontSize: Fonts.size.medium
  },
  table: {
    flexDirection: 'column',
    margin: 10
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  cell: {
    ...ApplicationStyles.smallMontserratFont,
    padding: 10,
    minWidth: 100,
    maxWidth: 100,
    textAlign: 'center'
  },
  headerCell: {
    fontWeight: 'bold',
    backgroundColor: '#f1f1f1'
  }
});
