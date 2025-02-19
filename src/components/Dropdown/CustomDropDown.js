/* eslint-disable complexity */
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView
} from 'react-native';
import { AppIcon } from '../../assets/icon';
import {
  ApplicationStyles,
  Colors,
  Fonts,
  horizontalScale,
  verticalScale
} from '../../theme';

const CustomDropDown = ({
  value,
  data = [],
  isDisable = false,
  label = 'Select Category',
  onSelect = () => {}
}) => {
  const [holdItem, setHoldItem] = useState([]);
  const [currentData, setCurrentData] = useState(data);
  const [history, setHistory] = useState([]);
  const [selectedData, setSelectedData] = useState(value || '');
  const [isOpen, setisOpen] = useState(false);
  const inputRef = useRef(null);

  const handleSelect = (item) => {
    if (item.subcategories) {
      setHoldItem((prev) => [...prev, item?.uuid]);
      setHistory([...history, currentData]);
      setCurrentData(item.subcategories);
    } else {
      setSelectedData(item.title);
      setHoldItem((prev) => [...prev, item?.uuid]);
      setisOpen(false);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setHoldItem([]);
    }
  }, [isOpen]);

  useLayoutEffect(() => {
    setSelectedData(value || '');
  }, [value]);

  const handleGoBack = () => {
    const previousData = history.pop();
    const previousHoldItem = holdItem.pop();
    previousHoldItem && setHoldItem([...previousHoldItem]);
    setCurrentData(previousData);
    setHistory([...history]);
  };

  const _renderItem = (item, index) => {
    const handleSelectBtn = () => {
      setSelectedData(item.title);
      setHoldItem((prev) => [...prev, item?.uuid]);
      onSelect(item, [...holdItem, item?.uuid]);
      setisOpen(false);
      setCurrentData(data);
    };

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        key={index}
        style={[styles.option]}
        onPress={() => {
          if (item?.subcategories?.length !== 0) {
            handleSelect(item);
          }
        }}
      >
        <TouchableOpacity
          onPress={() => {
            handleSelectBtn();
          }}
        >
          <Text style={[styles.dropDownText, styles.itemTextStyle]}>
            {item.title.toUpperCase()}
          </Text>
        </TouchableOpacity>

        {item?.subcategories?.length !== 0 && (
          <TouchableOpacity
            style={styles.itemText}
            onPress={() => handleSelect(item)}
          >
            <Image
              style={styles.RightArrow}
              tintColor={Colors.gray}
              source={AppIcon.RightArrowIcon}
            />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    setCurrentData(data);
  }, [data]);

  const handleFocus = () => {
    inputRef.current.measure((fx, fy, width, height, px, py) => {
      setisOpen(true);
    });
  };
  return (
    <View>
      <TouchableOpacity
        disabled={isDisable}
        style={[
          styles.dropDown,
          isDisable && {
            backgroundColor: `${Colors.gray10}44`,
            ...ApplicationStyles.productFieldDisable
          }
        ]}
        ref={inputRef}
        activeOpacity={0.6}
        onPress={() => handleFocus()}
      >
        {selectedData?.length !== 0 ? (
          <Text style={[styles.selectedText, styles.categorySelectText]}>
            {selectedData}
          </Text>
        ) : (
          <Text style={styles.selectedText}>{label}</Text>
        )}
        <TouchableOpacity
          style={styles.gobackBtn}
          onPress={() => setisOpen(!isOpen)}
        >
          <Image
            style={{
              width: horizontalScale(23),
              height: verticalScale(23),
              transform: [{ rotate: '90deg' }]
            }}
            tintColor={Colors.gray10}
            source={AppIcon.RightArrowIcon}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
      </TouchableOpacity>

      {isOpen && (
        <ScrollView
          nestedScrollEnabled
          style={[
            styles.scrollViewStyle,
            // eslint-disable-next-line react-native/no-inline-styles
            {
              height: currentData?.length >= 4 ? verticalScale(160) : null
            }
          ]}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.backCon}>
            {isOpen && history?.length > 0 && (
              <TouchableOpacity
                disabled={isDisable}
                style={styles.backButton}
                activeOpacity={0.9}
                onPress={handleGoBack}
              >
                <Image
                  style={styles.imgRotate}
                  tintColor={Colors.black}
                  source={AppIcon.RightArrowIcon}
                />
                <Text style={[styles.backText, styles.itemTextStyle]}>
                  Back
                </Text>
              </TouchableOpacity>
            )}
            {currentData.map((item, index) => {
              return _renderItem(item, index);
            })}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  backButton: {
    flexDirection: 'row',
    padding: 10
  },
  backCon: { borderRadius: 20, overflow: 'hidden' },
  scrollViewStyle: {
    borderRadius: 20,
    marginTop: -15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.gray10
  },
  gobackBtn: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignSelf: 'center'
  },
  selectedText: {
    marginHorizontal: 10,
    color: Colors.gray10,
    fontSize: 16,
    alignSelf: 'center',
    fontWeight: Fonts.Weight.medium
  },
  RightArrow: { width: 20, height: 20 },
  itemText: { justifyContent: 'flex-end' },
  dropDownText: { width: '100%', color: Colors.black },
  itemTextStyle: {
    fontSize: Fonts.size.uprSemi,
    fontFamily: Fonts.type.robotoRegular,
    fontWeight: Fonts.Weight.low,
    color: Colors.black
  },
  imgRotate: { width: 20, height: 20, transform: [{ rotate: '180deg' }] },
  dropDown: {
    width: '100%',
    height: verticalScale(50),
    borderWidth: 1,
    alignItems: 'center',
    marginVertical: 20,
    alignSelf: 'center',
    borderColor: Colors.gray10,
    borderRadius: 19,
    flexDirection: 'row',
    padding: 12,
    justifyContent: 'space-between'
  },
  backText: {
    textAlign: 'center',
    color: Colors.gray,
    fontWeight: 'bold'
  },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    flexDirection: 'row',
    backgroundColor: Colors.white,
    // borderBottomColor: '#ddd',
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'space-between'
  },
  categorySelectText: {
    fontWeight: Fonts.Weight.bold,
    color: Colors.black,
    alignSelf: 'center'
  }
});

export default CustomDropDown;
