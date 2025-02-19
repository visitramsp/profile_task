export class SkipReloadStore {
  static vendor_ProductList = false;
  static retailer_ProductList = false;
  static vendor_OrderList = false;

  static vendor_ProductEvent(params) {
    this.vendor_ProductList = params;
  }

  static retailer_ProductEvent(params) {
    this.retailer_ProductList = params;
  }

  static vendor_OrderEvent(params) {
    this.vendor_OrderList = params;
  }
}
