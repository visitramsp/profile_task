import React, { useCallback, useEffect, useState } from 'react';
import { Container } from '../../../components';
import { APP_LANGUAGE_CONSTANT } from '../../../constants';
import { useTranslation } from 'react-i18next';
import { Text, View, TouchableOpacity, LayoutAnimation } from 'react-native';
import styles from './FaqScreen.styles';
import { SquareAdd, SquareMinus } from '../../../assets/icon';
import SearchBar from '../../../components/SearchBar';
import { Colors, verticalScale } from '../../../theme';
import { getFaqDetails } from '../../../store/vendor/action';
import { useDispatch, useSelector } from 'react-redux';
import { faqDataSuccess } from '../../../store/app/reducer';
import { showError } from '../../../utils';

export default function FaqScreen({ navigation }) {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchText, setSearchText] = useState('');
  const dispatch = useDispatch();
  const faqData = useSelector((state) => state.app.faqData);
  useEffect(() => {
    if (faqData?.length === 0) {
      fetchData();
    }
  }, [faqData?.length, fetchData]);

  const fetchData = useCallback(() => {
    try {
      getFaqDetails()
        .then((res) => {
          dispatch(faqDataSuccess(res?.data?.data));
        })
        .catch((error) => {
          showError(error);
        })
        .finally(() => {});
    } catch (error) {
      showError(error);
    }
  }, [dispatch]);

  const onFocus = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  };

  const handleSearchChange = (text) => {
    setSearchText(text);
  };

  return (
    <Container title={t(APP_LANGUAGE_CONSTANT.FAQ_S)}>
      <View>
        <SearchBar value={searchText} onChangeValue={handleSearchChange} />
      </View>
      <View style={{ paddingBottom: verticalScale(15) }}>
        <Text style={styles.title}>{t(APP_LANGUAGE_CONSTANT.FAQ_REQUEST)}</Text>
        <Text style={styles.desc}>
          {t(APP_LANGUAGE_CONSTANT.FAQ_REQUEST_DETAILS)}
        </Text>
      </View>

      {faqData?.map((item, index) => (
        <View key={index}>
          {index !== 0 && <View style={styles.border} />}
          <View key={item.id} style={styles.faqItem}>
            <TouchableOpacity
              activeOpacity={0.6}
              style={styles.faqHeader}
              onPress={() => onFocus(index)}
            >
              <Text style={styles.question}>{item.title}</Text>
              <View style={styles.toggleIcon}>
                {activeIndex === index ? (
                  <SquareMinus color={Colors.white120} />
                ) : (
                  <SquareAdd color={Colors.white120} />
                )}
              </View>
            </TouchableOpacity>
            {activeIndex === index ? (
              <View style={[styles.answerContainer]}>
                <Text style={styles.answer}>{item.answer}</Text>
              </View>
            ) : null}
          </View>
        </View>
      ))}
    </Container>
  );
}
