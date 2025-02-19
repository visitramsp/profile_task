import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors, horizontalScale, verticalScale, Fonts } from '../../../theme';

function Varinats({ state, dispatch }) {
  return (
    <View style={styles.container}>
      <View>
        {state.mainVariantCategory && (
          <View style={[styles.verticalSpace, { gap: verticalScale(16) }]}>
            <View style={styles.variantContainer}>
              <Text style={styles.variantText}>
                {state.mainVariantCategory}
              </Text>
              <View style={styles.innerVariantContainer}>
                {Object.entries(state.mainVariants)?.map(([, options]) =>
                  options?.map((option, index) => {
                    return (
                      <View key={index} style={styles.varientBtn}>
                        <Text key={index} style={styles.buttonText}>
                          {option}
                        </Text>
                        {/* <TouchableOpacity
                        // onPress={() => removeMainVariants(key, option)}
                        >
                          <CloseCircle />
                        </TouchableOpacity> */}
                      </View>
                    );
                  })
                )}
              </View>
            </View>
          </View>
        )}
      </View>
      {Object.entries(state.subVariants)?.length > 0 && (
        <View style={[{ gap: verticalScale(16) }]}>
          <View style={styles.variantContainer}>
            {Object.entries(state.subVariants)?.map(([key, options]) => {
              return (
                <View key={key} style={{ paddingTop: verticalScale(10) }}>
                  <Text style={styles.variantText}>{key}</Text>
                  <View style={styles.innerVariantContainer}>
                    {options.map((option, index) => {
                      return (
                        <View key={index} style={styles.varientBtn}>
                          <Text key={index} style={styles.buttonText}>
                            {option}
                          </Text>
                          {/* <TouchableOpacity
                          // onPress={() => removesubVariants(key, option)}
                          >
                            <CloseCircle />
                          </TouchableOpacity> */}
                        </View>
                      );
                    })}
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      )}
    </View>
  );
}

export default Varinats;
const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  verticalSpace: {
    marginVertical: verticalScale(16)
  },
  variantContainer: {
    paddingHorizontal: horizontalScale(8),
    paddingVertical: verticalScale(8),
    borderWidth: 1,
    borderColor: Colors.gray10,
    borderRadius: 20,
    gap: verticalScale(8)
  },

  variantText: {
    fontFamily: Fonts.type.robotoBold,
    fontSize: Fonts.size.h20,
    color: Colors.primary,
    textTransform: 'capitalize'
  },
  innerVariantContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  varientBtn: {
    flexDirection: 'row',
    backgroundColor: Colors.lightGray10,
    gap: horizontalScale(4),
    paddingVertical: horizontalScale(6),
    paddingHorizontal: horizontalScale(8),
    borderRadius: horizontalScale(10),
    marginRight: horizontalScale(4),
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: verticalScale(4)
  },
  buttonText: {
    color: Colors.white,
    fontFamily: Fonts.type.robotoRegular,
    fontSize: Fonts.size.medium
  }
});
