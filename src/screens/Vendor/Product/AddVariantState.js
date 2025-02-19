const initialState = {
  warehouseList: [],
  warehouse: [],
  mainVariantCategory: '',
  isShowMainCategoryInput: false,
  mainVariantOption: '',
  mainVariants: {},
  subVariantCategory: '',
  isShowVariantCategoryInput: false,
  subVariantOption: '',
  subVariants: {},
  isShowDropdown: false,
  combinations: [],
  //Error
  warehouseError: null
};

const actions = {
  warehouseList: 'warehouseList',
  warehouse: 'warehouse',
  mainVariantCategory: 'mainVariantCategory',
  isShowMainCategoryInput: 'isShowMainCategoryInput',
  mainVariantOption: 'mainVariantOption',
  mainVariants: 'mainVariants',
  subVariantCategory: 'subVariantCategory',
  isShowVariantCategoryInput: 'isShowVariantCategoryInput',
  subVariantOption: 'subVariantOption',
  subVariants: 'subVariants',
  isShowDropdown: 'isShowDropdown',
  combinations: 'combinations',
  //Error
  warehouseError: 'warehouseError',
  resetVariants: 'resetVariants'
};

// eslint-disable-next-line complexity
function Reducer(state, action) {
  switch (action.type) {
    case actions.resetVariants:
      return {
        ...state,
        mainVariantCategory: '',
        isShowMainCategoryInput: false,
        mainVariantOption: '',
        mainVariants: {},
        subVariantCategory: '',
        isShowVariantCategoryInput: false,
        subVariantOption: '',
        subVariants: {},
        isShowDropdown: false,
        combinations: []
      };
    case actions.warehouseList:
      return {
        ...state,
        warehouseList: action.payload
      };
    case actions.warehouse:
      return {
        ...state,
        warehouse: action.payload
      };
    case actions.mainVariantCategory:
      return {
        ...state,
        mainVariantCategory: action.payload
      };
    case actions.isShowMainCategoryInput:
      return {
        ...state,
        isShowMainCategoryInput: action.payload
      };
    case actions.mainVariantOption:
      return {
        ...state,
        mainVariantOption: action.payload
      };
    case actions.mainVariants:
      return {
        ...state,
        mainVariants: action.payload
      };
    case actions.subVariantCategory:
      return {
        ...state,
        subVariantCategory: action.payload
      };
    case actions.isShowVariantCategoryInput:
      return {
        ...state,
        isShowVariantCategoryInput: action.payload
      };
    case actions.subVariantOption:
      return {
        ...state,
        subVariantOption: action.payload
      };
    case actions.subVariants:
      return {
        ...state,
        subVariants: action.payload
      };
    case actions.isShowDropdown:
      return {
        ...state,
        isShowDropdown: action.payload
      };
    case actions.combinations:
      return {
        ...state,
        combinations: action.payload
      };

    case actions.warehouseError:
      return {
        ...state,
        warehouseError: action.payload
      };
    case 'UPDATE_VARIANT_DETAILS': {
      const {
        groupIndex,
        itemIndex,
        price,
        quantity,
        image,
        packagingType,
        warehouse,
        priceError,
        quantityError,
        imageError,
        packageError,
        warehouseError,
        moq,
        moqError,
        expiryDate,
        packagingDate,
        warehouseList,
        expiryDateError,
        packagingDateError,
        warehouseListError
      } = action.payload;
      return {
        ...state,
        combinations: state.combinations.map((group, gIndex) => {
          return gIndex === groupIndex
            ? group.map((item, iIndex) =>
                iIndex === itemIndex
                  ? {
                      ...item,
                      price,
                      quantity,
                      image,
                      packagingType,
                      warehouse,
                      priceError,
                      quantityError,
                      imageError,
                      packageError,
                      warehouseError,
                      moq,
                      moqError,
                      expiryDate,
                      packagingDate,
                      expiryDateError,
                      packagingDateError,
                      warehouseList,
                      warehouseListError
                    }
                  : item
              )
            : group;
        })
      };
    }
    case 'UPDATE_WAREHOUSE_FOR_ALL': {
      const warehouse = action.payload;
      return {
        ...state,
        combinations: state.combinations.map((group) =>
          group.map((item) => ({
            ...item,
            warehouse
          }))
        )
      };
    }

    default:
      return {
        ...state
      };
  }
}

export { initialState, actions, Reducer };
