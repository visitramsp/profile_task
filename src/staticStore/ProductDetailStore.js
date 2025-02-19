export class ProductDetailStore {
  static updateProductObj = null;

  static updateEvent(params) {
    if (params) {
      this.updateProductObj = {
        ...this.updateProductObj,
        ...params
      };
    } else {
      this.updateProductObj = null;
    }
  }
}
