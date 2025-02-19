import React from 'react';
import { Container } from '../../components';
import EmptyScreen from '../../components/EmptyScreen';
import { ProductEmpty } from '../../assets/icon';
import AddButton from './Product/AddButton';
import { useTranslation } from 'react-i18next';
import { APP_LANGUAGE_CONSTANT } from '../../constants';

const emptyData = {
  img: ProductEmpty,
  title: 'Your Inventory is Empty',
  desc: 'It seems like you haven’t added any item in your inventory list yet.'
};

const InventorySync = ({ navigation }) => {
  const { t } = useTranslation();

  const addProduct = () => {
    navigation.navigate('AddProduct');
  };

  return (
    <>
      <Container title={'Inventory'}>
        <EmptyScreen data={emptyData} />
      </Container>
      <AddButton
        title={t(APP_LANGUAGE_CONSTANT.ADD_PRODUCT)}
        onPress={addProduct}
      />
    </>
  );
};

export default InventorySync;
