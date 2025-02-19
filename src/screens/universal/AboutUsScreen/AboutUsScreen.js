import React, { useCallback, useEffect, useState } from 'react';
import { Container } from '../../../components';
import { useTranslation } from 'react-i18next';
import { APP_LANGUAGE_CONSTANT } from '../../../constants';
import { Text, View } from 'react-native';
import styles from './AboutUsScreen.styles';
import { API_CONSTANT } from '../../../services/ApiConstant';
import { getWithOutToken } from '../../../services/ApiServices';
import CommonLoader from '../../../components/CommonLoader';
import { useSelector } from 'react-redux';
import { store } from '../../../store/Store';
import { setAboutList } from '../../../store/app/reducer';
import { showError } from '../../../utils';

const AboutUsScreen = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [aboutData, setAboutData] = useState([]);
  const storeAboutData = useSelector((state) => state?.app?.aboutList);

  useEffect(() => {
    if (storeAboutData?.length > 0) {
      setAboutData(storeAboutData);
    } else {
      getAllData();
    }
  }, [getAllData, storeAboutData]);

  const getAllData = useCallback(() => {
    try {
      setLoading(true);
      getWithOutToken(API_CONSTANT.FETCH_ABOUT_US)
        .then((res) => {
          setAboutData(res?.data?.data);

          store.dispatch(setAboutList(res?.data.data));
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          showError(error);
        });
    } catch (error) {
      setLoading(false);
    }
  }, []);
  return (
    <Container title={t(APP_LANGUAGE_CONSTANT.ABOUT_US)}>
      {loading ? (
        <View style={styles.loaderView}>
          <CommonLoader isLoading={loading} />
        </View>
      ) : (
        <View style={styles.mainView}>
          {aboutData?.map((res, index) => (
            <View key={index}>
              {res?.h1 && <Text style={styles.heading}>{res?.h1}</Text>}
              {res?.description && (
                <Text style={styles.title}>{res?.description}</Text>
              )}
              {res?.subHeading?.length > 0 &&
                res?.subHeading?.map((item, index__) => (
                  <View key={index__}>
                    <Text style={styles.title}>{item}</Text>
                  </View>
                ))}
              {res?.arr?.length > 0 &&
                res?.arr?.map((item, ind) => (
                  <View key={ind} style={[styles.defineView]}>
                    <View style={styles.dots} />
                    <Text style={styles.subHeading}>
                      {item.heading}
                      <Text style={[styles.desc]}>{item.desc}</Text>
                    </Text>
                  </View>
                ))}
            </View>
          ))}
        </View>
      )}
    </Container>
  );
};

export default AboutUsScreen;
