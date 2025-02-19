import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger
} from 'react-native-popup-menu';
import {
  Colors,
  horizontalScale,
  moderateScale,
  verticalScale
} from '../../theme';
import { MenuDot } from '../../assets/icon';

const HeaderMenu = (props) => {
  const { data, menuIconColor = '#cbcbcb', onPress1, onPress2 } = props;

  const onPressMenuItem = (index) => {
    if (index === 0) {
      return onPress1();
    } else {
      return onPress2();
    }
  };

  return (
    <Menu>
      <MenuTrigger onPress={() => {}}>
        <View style={{ padding: moderateScale(5) }}>
          <MenuDot />
        </View>
      </MenuTrigger>
      <MenuOptions optionsContainerStyle={styles.widthAuto}>
        {data &&
          data?.map((res, index) => (
            <MenuOption
              key={index}
              style={{
                paddingHorizontal: horizontalScale(10),
                paddingVertical: verticalScale(10)
              }}
              onSelect={() => onPressMenuItem(index)}
            >
              <Text style={styles.resultText}> {res}</Text>
            </MenuOption>
          ))}
      </MenuOptions>
    </Menu>
  );
};

const styles = StyleSheet.create({
  widthAuto: {
    width: 'auto'
  },
  resultText: {
    color: Colors.black
  }
});

export default HeaderMenu;
