import React, { useState, useRef, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ApplicationStyles, Colors } from '../../../theme';
import Fonts from '../../../theme/Fonts';
import { useFocusEffect } from '@react-navigation/native';

const CountdownTimer = ({ endTime = '' }) => {
  const endDate = new Date(endTime); // Parse the backend time
  const [timeLeft, setTimeLeft] = useState(
    Math.floor((endDate - new Date()) / 1000)
  ); // Initial time difference in seconds
  const intervalRef = useRef(null);

  useFocusEffect(
    useCallback(() => {
      intervalRef.current = setInterval(() => {
        setTimeLeft(Math.floor((endDate - new Date()) / 1000)); // Calculate remaining time dynamically
      }, 1000); // Update every second

      return () => {
        clearInterval(intervalRef.current); // Cleanup interval on unfocus/unmount
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [endTime])
  );

  const formatTime = (time) => {
    const days = Math.floor(time / (3600 * 24));
    const hours = Math.floor((time % (3600 * 24)) / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return `${days > 0 ? `${days}:` : '00:'}${hours < 10 ? '0' : ''}${hours}:${
      minutes < 10 ? '0' : ''
    }${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  const newTime = formatTime(timeLeft);

  // Separate functions to display each part of the timer
  const formatDays = () => (
    <View style={styles.txtContainer}>
      <Text style={styles.timerTxt}>{newTime?.split(':')[0]}</Text>
    </View>
  );

  const formatHours = () => (
    <View style={styles.txtContainer}>
      <Text style={styles.timerTxt}>{newTime?.split(':')[1]}</Text>
    </View>
  );

  const formatMinutes = () => (
    <View style={styles.txtContainer}>
      <Text style={styles.timerTxt}>{newTime?.split(':')[2]}</Text>
    </View>
  );

  const formatSeconds = () => (
    <View style={styles.txtContainer}>
      <Text style={styles.timerTxt}>{newTime?.split(':')[3]}</Text>
    </View>
  );

  return (
    timeLeft > 0 && (
      <View style={styles.container}>
        {newTime?.split(':')[0] > 0 && (
          <>
            {formatDays()}
            <Text style={styles.timerText}>{' : '}</Text>
          </>
        )}
        {formatHours()}
        <Text style={styles.timerText}>{' : '}</Text>
        {formatMinutes()}
        <Text style={styles.timerText}>{' : '}</Text>
        {formatSeconds()}
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 5
  },
  timerText: {
    ...ApplicationStyles.mediumMontserratFont,
    fontWeight: Fonts.Weight.seven,
    color: Colors.red
  },
  txtContainer: {
    height: 22,
    minWidth: 22,
    paddingHorizontal: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.red,
    borderRadius: 5
  },
  timerTxt: {
    ...ApplicationStyles.mediumMontserratFont,
    fontSize: Fonts.size.sminy,
    color: Colors.secondary
  }
});

export default CountdownTimer;
