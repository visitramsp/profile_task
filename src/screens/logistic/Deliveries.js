import React, { useRef, useState } from 'react';
import { Button, SafeAreaView } from 'react-native';
import OrderDetailBottomSheet from '../../components/bottomSheets/OrderDetailBottomSheet';
import SelectDriverBottomSheet from '../../components/bottomSheets/SelectDriverBottomSheet';
import { ApplicationStyles } from '../../theme';

export default function Deliveries() {
  const orderDetailRef = useRef(null);
  const selectDriverRef = useRef(null);

  const [isOrderDetailSheet, setOrderDetailSheet] = useState(false);

  const [isDriverSheet, setDriverSheet] = useState(false);

  const onOpenSheet = () => {
    if (isDriverSheet) {
      return;
    } else {
      setOrderDetailSheet(!isOrderDetailSheet);
    }
  };

  return (
    <SafeAreaView style={ApplicationStyles.flex1}>
      <Button title="Press Me" onPress={onOpenSheet} />
      {isOrderDetailSheet && (
        <OrderDetailBottomSheet
          ref={orderDetailRef}
          onClose={() => {
            setOrderDetailSheet(false);
            orderDetailRef.current?.close();
            setDriverSheet(true);
          }}
        />
      )}
      {isDriverSheet && (
        <SelectDriverBottomSheet
          ref={selectDriverRef}
          onClose={() => {
            setDriverSheet(false);
            selectDriverRef.current?.close();
          }}
        />
      )}
    </SafeAreaView>
  );
}
