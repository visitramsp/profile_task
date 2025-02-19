/* eslint-disable no-restricted-syntax */
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { useSelector } from 'react-redux';

const WebSocketComponent = () => {
  const [message, setMessage] = useState('');
  const [location, setLocation] = useState(null);
  const userData = useSelector((state) => state.user);
  const userId = userData?.userDetail?.id; // Extract the user ID

  console.log(userId, 'userID');

  useEffect(() => {
    // Request location permission and get the current position
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
      },
      (error) => {
        console.error('Error getting location: ', error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );

    // Create a new WebSocket connection
    const socket = new WebSocket('ws://192.168.106.249:2001');

    // Connection opened
    socket.onopen = () => {
      console.log('WebSocket connection established');
      if (location && userId) {
        const locationData = {
          userID: userId,
          latitude: location.latitude,
          longitude: location.longitude
        };
        socket.send(JSON.stringify(locationData));
        console.log('Sent initial location:', locationData);
      } else {
        console.error('User ID or location is not defined.');
      }
    };

    // Listen for messages
    socket.onmessage = (event) => {
      console.log('Message from server:', event.data);
      setMessage(event.data);
    };

    // Handle errors
    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    // Connection closed
    socket.onclose = (event) => {
      console.log('WebSocket connection closed:', event.reason);
    };

    // Send location data every second
    const intervalId = setInterval(() => {
      if (socket.readyState === WebSocket.OPEN && location && userId) {
        const locationData = [
          {
            userID: userId,
            latitude: location.latitude,
            longitude: location.longitude
          }
        ];
        socket.send(JSON.stringify(locationData));
        console.log('Sent location:', locationData);
      }
    }, 1000);

    // Cleanup on component unmount
    return () => {
      clearInterval(intervalId);
      socket.close();
    };
  }, [location, userId]);

  return (
    <View style={styles.container}>
      <Text>WebSocket Example</Text>
      <Text>Message from server: {message}</Text>
      {location && (
        <Text>
          Current Location: Latitude {location.latitude}, Longitude{' '}
          {location.longitude}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16
  }
});

export default WebSocketComponent;
