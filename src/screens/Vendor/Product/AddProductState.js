const initialState = {
  isCaptureModal: false,
  isHaveVariant: false,
  productImages: [],
  productUSC: null,
  productName: null,
  productBrandList: [],
  productBrand: null,
  productCategoryList: [],
  productAllCategoryList: [],
  productCategory: null,
  productCategoryValList: [],
  productDiscription: null,
  productPrice: null,
  productBuyingPrice: null,
  productSellingPrice: null,
  productSubCategoryList: [],
  productSubCategory: null,
  productConditionList: [],
  productCondition: null,
  productQuantity: null,
  productWarehouseList: [],
  selectedProductWarehouseList: [],
  productWarehouse: null,
  productSummary: null,
  productExpiryDate: null,
  productMRFDate: null,
  isHaveExpiryDate: false,
  minimumOrderQuantity: null,
  vatOptionsList: [],
  vatOptions: null,

  //   Error States
  productImagesError: null,
  isHaveExpiryDateError: null,
  productUSCError: null,
  productNameError: null,
  productBrandError: null,
  productCategoryError: null,
  productDiscriptionError: null,
  productPriceError: null,
  productBuyingPriceError: null,
  productSellingPriceError: null,
  productSubCategoryError: null,
  productConditionError: null,
  productQuantityError: null,
  productWarehouseError: null,
  productSummaryError: null,
  productExpiryDateError: null,
  productMRFDateError: null,
  minimumOrderQuantityError: null,
  vatOptionsError: null
};

const actions = {
  isCaptureModal: 'isCaptureModal',
  isHaveVariant: 'isHaveVariant',
  isHaveExpiryDate: 'isHaveExpiryDate',
  productImages: 'productImages',
  productUSC: 'productUSC',
  productName: 'productName',
  productAllCategoryList: 'productAllCategoryList',
  productBrandList: 'productBrandList',
  productBrand: 'productBrand',
  productCategoryList: 'productCategoryList',
  productCategoryValList: 'productCategoryValList',
  productCategory: 'productCategory',
  productDiscription: 'productDiscription',
  productPrice: 'productPrice',
  productBuyingPrice: 'productBuyingPrice',
  productSellingPrice: 'productSellingPrice',
  productSubCategoryList: 'productSubCategoryList',
  productSubCategory: 'productSubCategory',
  productConditionList: 'productConditionList',
  selectedProductWarehouseList: 'selectedProductWarehouseList',
  productCondition: 'productCondition',
  productQuantity: 'productQuantity',
  productWarehouseList: 'productWarehouseList',
  productWarehouse: 'productWarehouse',
  productSummary: 'productSummary',
  productExpiryDate: 'productExpiryDate',
  productMRFDate: 'productMRFDate',
  minimumOrderQuantity: 'minimumOrderQuantity',
  vatOptionsList: 'vatOptionsList',
  vatOptions: 'vatOptions',
  // Error Actions

  productImagesError: 'productImagesError',
  doesExpiryDateError: 'doesExpiryDateError',
  productUSCError: 'productUSCError',
  productNameError: 'productNameError',
  productBrandError: 'productBrandError',
  productCategoryError: 'productCategoryError',
  productDiscriptionError: 'productDiscriptionError',
  productBuyingPriceError: 'productBuyingPriceError',
  productSellingPriceError: 'productSellingPriceError',
  productPriceError: 'productPriceError',
  productSubCategoryError: 'productSubCategoryError',
  productConditionError: 'productConditionError',
  productQuantityError: 'productQuantityError',
  productWarehouseError: 'productWarehouseError',
  productSummaryError: 'productSummaryError',
  productExpiryDateError: 'productExpiryDateError',
  productMRFDateError: 'productMRFDateError',
  minimumOrderQuantityError: 'minimumOrderQuantityError',
  vatOptionsError: 'vatOptionsError'
};

// eslint-disable-next-line complexity
function Reducer(state, action) {
  switch (action.type) {
    case actions.isCaptureModal:
      return {
        ...state,
        isCaptureModal: action.payload
      };
    case actions.isHaveVariant:
      return {
        ...state,
        isHaveVariant: action.payload
      };
    case actions.isHaveExpiryDate:
      return {
        ...state,
        isHaveExpiryDate: action.payload
      };
    case actions.productImages:
      return {
        ...state,
        productImages: action.payload
      };
    case actions.productUSC:
      return {
        ...state,
        productUSC: action.payload
      };
    case actions.productName:
      return {
        ...state,
        productName: action.payload
      };
    case actions.productBrandList:
      return {
        ...state,
        productBrandList: action.payload
      };
    case actions.productBrand:
      return {
        ...state,
        productBrand: action.payload
      };
    case actions.productCategoryList:
      return {
        ...state,
        productCategoryList: action.payload
      };
    case actions.productCategoryValList:
      return {
        ...state,
        productCategoryValList: action.payload
      };
    case actions.productAllCategoryList:
      return {
        ...state,
        productAllCategoryList: action.payload
      };
    case actions.productCategory:
      return {
        ...state,
        productCategory: action.payload
      };
    case actions.productDiscription:
      return {
        ...state,
        productDiscription: action.payload
      };
    case actions.productPrice:
      return {
        ...state,
        productPrice: action.payload
      };
    case actions.productBuyingPrice:
      return {
        ...state,
        productBuyingPrice: action.payload
      };
    case actions.productSellingPrice:
      return {
        ...state,
        productSellingPrice: action.payload
      };
    case actions.productSubCategoryList:
      return {
        ...state,
        productSubCategoryList: action.payload
      };
    case actions.productSubCategory:
      return {
        ...state,
        productSubCategory: action.payload
      };
    case actions.productConditionList:
      return {
        ...state,
        productConditionList: action.payload
      };
    case actions.productCondition:
      return {
        ...state,
        productCondition: action.payload
      };
    case actions.productQuantity:
      return {
        ...state,
        productQuantity: action.payload
      };
    case actions.productWarehouseList:
      return {
        ...state,
        productWarehouseList: action.payload
      };
    case actions.productWarehouse:
      return {
        ...state,
        productWarehouse: action.payload
      };
    case actions.productSummary:
      return {
        ...state,
        productSummary: action.payload
      };
    case actions.productExpiryDate:
      return {
        ...state,
        productExpiryDate: action.payload
      };
    case actions.productMRFDate:
      return {
        ...state,
        productMRFDate: action.payload
      };
    case actions.minimumOrderQuantity:
      return {
        ...state,
        minimumOrderQuantity: action.payload
      };
    case actions.productImagesError:
      return {
        ...state,
        productImagesError: action.payload
      };
    case actions.productUSCError:
      return {
        ...state,
        productUSCError: action.payload
      };
    case actions.productNameError:
      return {
        ...state,
        productNameError: action.payload
      };
    case actions.productBrandError:
      return {
        ...state,
        productBrandError: action.payload
      };
    case actions.productCategoryError:
      return {
        ...state,
        productCategoryError: action.payload
      };
    case actions.productDiscriptionError:
      return {
        ...state,
        productDiscriptionError: action.payload
      };
    case actions.productBuyingPriceError:
      return {
        ...state,
        productBuyingPriceError: action.payload
      };
    case actions.productSellingPriceError:
      return {
        ...state,
        productSellingPriceError: action.payload
      };
    case actions.productPriceError:
      return {
        ...state,
        productPriceError: action.payload
      };
    case actions.productSubCategoryError:
      return {
        ...state,
        productSubCategoryError: action.payload
      };
    case actions.productConditionError:
      return {
        ...state,
        productConditionError: action.payload
      };
    case actions.productQuantityError:
      return {
        ...state,
        productQuantityError: action.payload
      };
    case actions.productWarehouseError:
      return {
        ...state,
        productWarehouseError: action.payload
      };
    case actions.productSummaryError:
      return {
        ...state,
        productSummaryError: action.payload
      };
    case actions.productExpiryDateError:
      return {
        ...state,
        productExpiryDateError: action.payload
      };
    case actions.productMRFDateError:
      return {
        ...state,
        productMRFDateError: action.payload
      };
    case actions.minimumOrderQuantityError:
      return {
        ...state,
        minimumOrderQuantityError: action.payload
      };
    case actions.vatOptionsList:
      return {
        ...state,
        vatOptionsList: action.payload
      };
    case actions.vatOptions:
      return {
        ...state,
        vatOptions: action.payload
      };
    case actions.vatOptionsError:
      return {
        ...state,
        vatOptionsError: action.payload
      };
    default:
      return {
        ...state
      };
  }
}

export { initialState, actions, Reducer };
