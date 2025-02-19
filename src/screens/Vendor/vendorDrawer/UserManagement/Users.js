import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ColoredPlusIcon, ProductEmpty } from '../../../../assets/icon';
import { Container } from '../../../../components';
import ItemCountText from '../../../../components/headers/ItemCountText';
import ListFilterOptions from '../../../../components/listContent/ListFilterOptions';
import SearchBar from '../../../../components/SearchBar';
import { APP_LANGUAGE_CONSTANT, AppConstant } from '../../../../constants';
import { getAllSubUsers } from '../../../../store/vendor/action';
import {
  ApplicationStyles,
  Colors,
  Fonts,
  horizontalScale,
  PAGE_SPACING,
  verticalScale
} from '../../../../theme';
import UserList from './UserList';
import { useDebounce } from '../../../../hooks';
import { API_CONSTANT } from '../../../../services/ApiConstant';
import { showError } from '../../../../utils';
import EmptyScreen from '../../../../components/EmptyScreen';
import CommonLoader from '../../../../components/CommonLoader';

const filterOptions = [
  { name: 'All Users', value: '' },
  { name: 'Active', value: 'activated' },
  { name: 'Inactive', value: 'deactivated' }
];
const emptyData = {
  img: ProductEmpty,
  title: 'No Users Available',
  desc: 'It seems like you haven’t added any item in your users list yet.'
};

function Users() {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [selectedFilterName, setSelectedFilterName] = useState('All Users');
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  const [totalNoOfProduct, setTotalNoOfProduct] = useState(0);
  const [currentTab, setCurrentTab] = useState('');
  const [initialLoader, setInitialLoader] = useState(true);
  const [firstLoader, setFirstLoader] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const debounce = useDebounce(search, 500);

  useEffect(() => {
    if (search?.trim()?.length >= 3) {
      getUsers(1, currentTab, true);
    } else if (search?.trim()?.length === 0) {
      getUsers(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounce]);

  const getUsers = useCallback(
    (page = 1, filter = currentTab, isSearch = false) => {
      if (page === 1 && isSearch) {
        setInitialLoader(false);
      }
      try {
        const queryParams = `?filter_by_name=${debounce}&limit=${API_CONSTANT.LIMIT}&page=${page}&filter_by_status=${filter}`;
        getAllSubUsers(queryParams)
          .then((res) => {
            if (page === 1) {
              setData(res?.data?.data || []);
            } else {
              setData((prevData) => [...prevData, ...(res?.data?.data || [])]);
            }
            setPage(page + 1);
            setTotalNoOfProduct(res?.data?.pagination?.totalCount);
            setFirstLoader(false);
          })
          .catch((err) => {
            showError(err);
            setFirstLoader(false);
          })
          .finally(() => {
            setIsFetching(false);
            setRefreshing(false);
          });
      } catch (error) {
        setIsFetching(false);
        setFirstLoader(false);
        showError(error);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [debounce]
  );

  const loadMoreData = () => {
    if (totalNoOfProduct > data?.length && !isFetching) {
      setIsFetching(true);
      getUsers(page, currentTab);
    }
  };

  const handleAddUser = () => {
    navigation.navigate('AddUser');
  };

  const handleFilterChange = (item) => {
    setSelectedFilterName(item.name);
    setCurrentTab(item?.value);
    getUsers(1, item?.value, true);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    getUsers(1, currentTab, true);
  };

  return (
    <Container
      scrollable={false}
      title={t(AppConstant.USER_MANAGEMENT)}
      style={[styles.container]}
    >
      {firstLoader ? (
        // <ActivityIndicator
        //   size={'large'}
        //   color={Colors.orange10}
        //   style={styles.activeView}
        // />
        <CommonLoader loaderStyle={styles.activeView} isLoading={firstLoader} />
      ) : data?.length === 0 && initialLoader ? (
        <EmptyScreen data={emptyData} />
      ) : (
        <>
          <View style={styles.activeView}>
            <SearchBar
              value={search}
              containerStyle={styles.searchContainer}
              onChangeValue={setSearch}
            />
            <ItemCountText
              title={t(APP_LANGUAGE_CONSTANT.USER_LIST)}
              number={totalNoOfProduct}
              style={ApplicationStyles.pageSpacing}
            />
            <ListFilterOptions
              // eslint-disable-next-line react-native/no-inline-styles
              styleExt={{ flex: 0 }}
              data={filterOptions}
              selectedName={selectedFilterName}
              style={styles.listFilter}
              contentContainerStyle={styles.contentContainerStyle}
              onSelectOption={handleFilterChange}
            />
          </View>

          <UserList
            totalNoOfProduct={totalNoOfProduct}
            setTotalNoOfProduct={setTotalNoOfProduct}
            data={data}
            setData={setData}
            refreshing={refreshing}
            handleRefresh={handleRefresh}
            // eslint-disable-next-line react/no-unstable-nested-components
            ListFooterComponent={() => {
              return (
                // <ActivityIndicator
                //   size={30}
                //   animating={isFetching}
                //   color={Colors.primary20}
                // />
                <CommonLoader
                  size={30}
                  isLoading={isFetching}
                  color={Colors.primary20}
                />
              );
            }}
            onEndReachedThreshold={0.5}
            onEndReached={loadMoreData}
          />
        </>
      )}

      <TouchableOpacity style={styles.addButton} onPress={handleAddUser}>
        <LinearGradient
          colors={[Colors.orange10, Colors.orange30]}
          style={styles.addButtonGradient}
        >
          <Text style={styles.addButtonText}>
            {t(APP_LANGUAGE_CONSTANT.ADD_USER)}
          </Text>
          <View style={styles.addButtonIcon}>
            <ColoredPlusIcon width={15} height={15} colors={Colors.primary} />
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Container>
  );
}

export default Users;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  searchContainer: {
    marginHorizontal: PAGE_SPACING
  },
  contentContainerStyle: {
    paddingHorizontal: 0
  },
  listFilter: {
    paddingVertical: verticalScale(15),
    paddingLeft: PAGE_SPACING
  },
  addButton: {
    position: 'absolute',
    bottom: verticalScale(40),
    right: horizontalScale(16),
    shadowColor: Colors.primary,
    shadowOffset: { height: 1, width: 1 },
    shadowRadius: 4,
    shadowOpacity: 2,
    elevation: 5
  },
  addButtonGradient: {
    paddingVertical: verticalScale(4),
    paddingHorizontal: horizontalScale(4),
    borderRadius: 22.5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: horizontalScale(8),
    paddingLeft: horizontalScale(16)
  },
  addButtonIcon: {
    padding: horizontalScale(8),
    backgroundColor: Colors.white,
    height: verticalScale(30),
    width: verticalScale(30),
    borderRadius: verticalScale(30) / 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  addButtonText: {
    fontFamily: Fonts.type.montserrat,
    fontWeight: Fonts.Weight.bold,
    fontSize: Fonts.size.semi,
    color: Colors.white
  },
  activeView: {
    marginTop: verticalScale(30)
  }
});
