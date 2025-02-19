import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  RefreshControl
} from 'react-native';
import { Container } from '../../components';
import {
  verticalScale,
  Fonts,
  Colors,
  PAGE_SPACING,
  horizontalScale
} from '../../theme';
import {
  DocumentUpload,
  NotificationBell,
  OrangeForwardArrow,
  TruckIcon,
  EmptyTruck,
  RemoveTruck,
  NotificationEmpty
} from '../../assets/icon';
import EmptyScreen from '../../components/EmptyScreen';

const notificationToday = [
  {
    id: '1',
    title: 'Edward Curr',
    message:
      'Lorem Ipsum is simply dummy text of the printing and Loren apsum loren apsum loren apsum loren apsum deep',
    type: 'action',
    timestamp: '17 min ago',
    viewed: true,
    avatar: <DocumentUpload /> // Replace with actual profile images
  },
  {
    id: '2',
    title:
      'We’ve just reached our 30k goal raised for charity! We’re so proud of the team!',
    message: null,
    type: 'simple',
    timestamp: '8 min ago',
    viewed: false,
    avatar: <NotificationBell />
  },
  {
    id: '3',
    title: 'Edward Curr',
    message:
      'Lorem Ipsum is simply dummy text of the printing and Loren apsum loren apsum loren apsum loren apsum deep',
    type: 'details',
    timestamp: '17 min ago',
    viewed: false,
    avatar: <NotificationBell />
  }
];

const notificationWeek = [
  {
    id: '1',
    title:
      'We’ve just reached our 30k goal raised for charity! We’re so proud of the team!',
    message: null,
    type: 'simple',
    timestamp: '8 min ago',
    viewed: true,
    avatar: <EmptyTruck />
  },
  {
    id: '2',
    title:
      'We’ve just reached our 30k goal raised for charity! We’re so proud of the team!',
    message: null,
    type: 'simple',
    timestamp: '8 min ago',
    viewed: true,
    avatar: <TruckIcon />
  },
  {
    id: '3',
    title:
      'We’ve just reached our 30k goal raised for charity! We’re so proud of the team!',
    message: null,
    type: 'simple',
    timestamp: '8 min ago',
    viewed: true,
    avatar: <RemoveTruck />
  }
];

const emptyData = {
  img: NotificationEmpty,
  title: 'No Notifications Yet',
  desc: 'When you get notifications, they’ll show up here'
};

const NotificationScreen = () => {
  const [data, setData] = useState([1, 5]);
  const [refreshing, setRefreshing] = useState(false);

  const _renderNotification = ({ item }) => {
    return (
      <View style={[styles.cell, !item.viewed && styles.viewedCell]}>
        <View style={styles.avtar}>{item.avatar}</View>
        <View style={styles.info}>
          <Text style={styles.title}>{item.title}</Text>
          {item.message && <Text style={styles.message}>{item.message}</Text>}
          {item.type === 'action' && (
            <View style={styles.action}>
              <TouchableOpacity style={styles.acceptBtn}>
                <Text style={styles.acceptBtnText}>Accept</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.denyBtn}>
                <Text style={styles.denyBtnText}>Deny</Text>
              </TouchableOpacity>
            </View>
          )}
          {item.type === 'details' && (
            <TouchableOpacity style={styles.detailsBtn}>
              <Text style={styles.denyBtnText}>See Details</Text>
              <OrangeForwardArrow />
            </TouchableOpacity>
          )}
          <Text style={styles.timestamp}>{item.timestamp}</Text>
        </View>
      </View>
    );
  };

  const Divider = () => <View style={styles.divider} />;

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  return (
    <Container title="Notification" style={styles.container}>
      {data?.length > 0 ? (
        <EmptyScreen data={emptyData} />
      ) : (
        <>
          <View style={styles.section}>
            <View style={styles.header}>
              <Text style={styles.headerText}>Today</Text>
              <TouchableOpacity>
                <Text style={styles.clear}>Clear All</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              scrollEnabled={false}
              data={notificationToday}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={handleRefresh}
                />
              }
              keyExtractor={(item, index) => `notficationToday${index}`}
              renderItem={_renderNotification}
              ItemSeparatorComponent={<Divider />}
            />
          </View>
          <View style={styles.section}>
            <View style={styles.header}>
              <Text style={styles.headerText}>This Week</Text>
            </View>
            <FlatList
              scrollEnabled={false}
              data={notificationWeek}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={handleRefresh}
                />
              }
              keyExtractor={(item, index) => `notficationWeek${index}`}
              renderItem={_renderNotification}
              ItemSeparatorComponent={<Divider />}
            />
          </View>
        </>
      )}
    </Container>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    paddingLeft: 0,
    paddingRight: 0
  },
  section: {
    marginVertical: verticalScale(6)
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: verticalScale(6),
    paddingLeft: PAGE_SPACING,
    paddingRight: PAGE_SPACING,
    justifyContent: 'space-between'
  },
  headerText: {
    fontFamily: Fonts.type.montserrat,
    fontSize: Fonts.size.semi,
    fontWeight: Fonts.Weight.seven,
    color: Colors.darkBlue
  },
  clear: {
    fontFamily: Fonts.type.montserrat,
    fontSize: Fonts.size.semi,
    fontWeight: Fonts.Weight.medium,
    color: Colors.primary
  },
  divider: {
    height: 1,
    backgroundColor: Colors.white
  },
  cell: {
    flexDirection: 'row',
    flex: 1,
    paddingVertical: verticalScale(16),
    gap: horizontalScale(8),
    paddingLeft: PAGE_SPACING,
    paddingRight: PAGE_SPACING
  },
  viewedCell: {
    backgroundColor: Colors.lightOrange2
  },
  avtar: {
    height: 48,
    width: 48,
    borderRadius: 24,
    backgroundColor: Colors.lightOrange1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  info: {
    gap: horizontalScale(4),
    flex: 1
  },
  title: {
    fontFamily: Fonts.type.montserrat,
    fontWeight: Fonts.Weight.medium,
    fontSize: Fonts.size.small,
    color: Colors.black120,
    flexWrap: 'wrap'
  },
  message: {
    flexWrap: 'wrap',
    flex: 1,
    fontFamily: Fonts.type.robotoRegular,
    fontSize: Fonts.size.sminy,
    color: Colors.gray20,
    paddingRight: PAGE_SPACING
  },
  action: {
    flexDirection: 'row',
    gap: horizontalScale(16)
  },
  acceptBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.primary,
    paddingHorizontal: horizontalScale(12),
    paddingVertical: horizontalScale(4),
    justifyContent: 'center',
    alignItems: 'center'
  },
  acceptBtnText: {
    fontFamily: Fonts.type.montserrat,
    fontSize: Fonts.size.medium,
    color: Colors.white
  },
  denyBtn: {
    borderRadius: 8,
    paddingHorizontal: horizontalScale(12),
    paddingVertical: horizontalScale(4),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.primary
  },
  denyBtnText: {
    fontFamily: Fonts.type.montserrat,
    fontSize: Fonts.size.medium,
    color: Colors.primary
  },
  timestamp: {
    fontFamily: Fonts.type.robotoRegular,
    fontSize: Fonts.size.sminy,
    color: Colors.gray20
  },
  detailsBtn: {
    flexDirection: 'row',
    gap: horizontalScale(16)
  }
});
