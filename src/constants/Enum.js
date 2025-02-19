import { AppConstant } from './AppConstant';

const USER_TYPE = {
  VENDOR: 'vendor',
  RETAILER: 'retailer',
  REFERRAL_USER: 'referral_user',
  HORECA: 'horeca',
  LOGISTIC: 'logistic',
  LOGISTIC_SUB_USER: 'logistic_sub_user'
};

const HEADER_TYPE = {
  ONLY_TITLE: 'ONLY_TITLE',
  TITLE_CENTER: 'TITLE_CENTER'
};

const NAVIGATE_MODE = {
  FADE_BOTTOM: 'fade_from_bottom'
};

const PRODUCT_REQUEST = {
  ACCEPT: 'accept',
  REJECT: 'reject'
};

const PAYMENT_METHOD = {
  ADVANCE_PAY: AppConstant.ADVANCE_PAY,
  PAY_AS_YOU_GO: AppConstant.PAY_AS_YOU_GO,
  AGAINST_DELIVERY: AppConstant.AGAINST_DELIVERY,
  GOODS_ON_CREDIT: AppConstant.GOODS_ON_CREDIT
};

const DELIVERY_METHOD = {
  ITSELF: 'by itself'
};

const KEYBOARD_TYPE = {
  NUMERIC: 'numeric',
  NUMERIC_PAD: 'number-pad'
};

const EVENT_EMITTER_NAME = {
  OPENORDERSUMMARY: 'OpenOrderSummaryModal'
};

export {
  USER_TYPE,
  HEADER_TYPE,
  NAVIGATE_MODE,
  PRODUCT_REQUEST,
  PAYMENT_METHOD,
  DELIVERY_METHOD,
  KEYBOARD_TYPE,
  EVENT_EMITTER_NAME
};
