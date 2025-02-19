import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchCartList } from '../store/retailer/action';

const CART_LOCAL_STORE = 'cartLocalStore';

export class CartStore {
  static itemList = [];

  static async fetchFromStorage() {
    try {
      let localData = await AsyncStorage.getItem(CART_LOCAL_STORE);
      localData = JSON.parse(localData) || [];
      return localData;
    } catch (error) {
      return [];
    }
  }

  static async getItemList() {
    try {
      this.itemList = await this.fetchFromStorage();
      return this.itemList;
    } catch (error) {
      return [];
    }
  }

  static async updateItemList(item) {
    try {
      this.itemList = await this.fetchFromStorage();
      let itemIndex = this.itemList?.findIndex((ele) => ele?.id === item?.id);
      if (itemIndex !== -1) {
        this.itemList[itemIndex].quantity =
          Number(this.itemList[itemIndex].quantity) + Number(item.quantity);
      } else {
        this.itemList?.splice(0, 0, item);
      }
      AsyncStorage.setItem(CART_LOCAL_STORE, JSON.stringify(this.itemList));
    } catch (error) {
      console.log(error);
    }
  }

  static async removeAllItem() {
    await AsyncStorage.removeItem(CART_LOCAL_STORE);
  }

  static async removeSpecificItem(item) {
    try {
      let tempData = JSON.parse(JSON.stringify(this.itemList));
      let index = tempData?.findIndex((ele) => ele?.id === item?.id);
      index !== -1 && tempData?.splice(index, 1);
      this.itemList = tempData;
      AsyncStorage.setItem(CART_LOCAL_STORE, JSON.stringify(tempData));
    } catch (error) {
      console.log(error);
    }
  }

  static storeAllData(list) {
    AsyncStorage.setItem(CART_LOCAL_STORE, JSON.stringify(list));
  }
  static async initialSetup() {
    return fetchCartList()
      .then((res) => {
        const cartList = res?.data?.data.map(
          ({ quantity, productObj, variantObj, uuid }) => ({
            quantity: Number(quantity),
            product_id: productObj?.uuid,
            variant_id: variantObj?.uuid,
            price: variantObj?.price_details,
            brandName: productObj?.brand_id,
            mainVariantTitle: variantObj?.mainVariant?.name,
            mainVariantValue: variantObj?.mainVariant?.value,
            productName: productObj?.title,
            moq: variantObj?.minimum_order_quantity,
            perUnit: variantObj?.price_details,
            img: variantObj?.images?.[0],
            id: uuid,
            maxQuantity: variantObj?.warehouse_arr?.reduce((acc, item) => {
              const qty = parseInt(item.quantity, 10);
              return acc + qty;
            }, 0)
          })
        );
        this.storeAllData(cartList);
        return cartList;
      })
      .catch((e) => {
        return e;
      });
  }

  static storeDataEvent({
    filterProductData,
    productDetails,
    cart_auto_incrimented_id
  }) {
    let tempItem = {
      quantity: filterProductData?.minimum_order_quantity,
      product_id: productDetails?.product_uuid,
      variant_id: filterProductData?.uuid,
      price: filterProductData?.price_details,
      brandName: productDetails?.brand_id,
      productName: filterProductData?.variant_title,
      moq: filterProductData?.minimum_order_quantity,
      perUnit: filterProductData?.price_details,
      img: filterProductData?.images[0],
      id: cart_auto_incrimented_id,
      maxQuantity: filterProductData?.warehouse_arr?.reduce(
        (acc, curr) => acc + Number(curr.quantity),
        0
      )
    };
    this.updateItemList(tempItem);
  }
}
