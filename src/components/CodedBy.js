import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { fontSizes, spacing } from '../utils/sizes';
import { colors } from '../utils/colors';

export const CodedBy = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Coded with ❤️ using{' '}
        <Text style={{ fontStyle: 'italic', fontWeight: 'bold' }}>
          React Native
        </Text>{' '}
        by <Text style={{ fontWeight: 'bold' }}>TARAN MAND</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: spacing.md,
    paddingTop: spacing.lg,
  },
  text: {
    color: colors.white,
    fontSize: fontSizes.md,
  },
});
