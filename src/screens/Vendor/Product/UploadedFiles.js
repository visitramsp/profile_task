import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View
} from 'react-native';
import { horizontalScale, Colors, verticalScale } from '../../../theme';
import { CloseCircle } from '../../../assets/icon';

const UploadedFiles = ({
  files,
  deleteImages,
  imgStyle = {},
  onPress = () => {}
}) => {
  return (
    <ScrollView
      horizontal
      style={styles.container}
      showsHorizontalScrollIndicator={false}
    >
      {files?.map((item, index) => (
        <TouchableOpacity
          key={index}
          activeOpacity={1}
          style={styles.imageView}
          onPress={onPress}
        >
          <ImageBackground
            key={index}
            source={{
              uri: item?.uri?.includes('http') ? item?.uri : item?.path
            }}
            style={[styles.image, imgStyle]}
            imageStyle={styles.imgStyle}
          >
            <TouchableOpacity
              style={styles.close}
              onPress={() => deleteImages(index)}
            >
              <CloseCircle
                width={horizontalScale(20)}
                height={horizontalScale(20)}
              />
            </TouchableOpacity>
          </ImageBackground>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default UploadedFiles;

const styles = StyleSheet.create({
  container: {
    paddingTop: verticalScale(8),
    paddingHorizontal: verticalScale(0)
  },
  image: {
    height: horizontalScale(82),
    width: horizontalScale(82),
    borderRadius: horizontalScale(10)
  },
  imageView: { padding: 10 },
  imgStyle: {
    width: '100%',
    height: '100%',
    borderRadius: horizontalScale(10)
  },
  close: {
    position: 'absolute',
    right: -horizontalScale(8),
    top: -horizontalScale(8),
    height: horizontalScale(22),
    width: horizontalScale(22),
    backgroundColor: Colors.gray10,
    borderRadius: horizontalScale(14),
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 99999
  }
});
