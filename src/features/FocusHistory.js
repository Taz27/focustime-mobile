import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { spacing, fontSizes } from '../utils/sizes';
import { colors } from '../utils/colors';

export const FocusHistory = ({ history }) => {
  if (!history?.length) {
    return <Text style={styles.title}>We haven't focussed on anything yet!</Text>
  }

  const renderItem = ({ item }) => <Text style={styles.item}>- {item}</Text>

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Things we've focussed on:</Text>
      <FlatList data={history} renderItem={renderItem} keyExtractor={(item, index) => index.toString()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
    flex: 1,
  },
  item: {
    color: colors.white,
    paddingTop: spacing.sm,
    fontSize: fontSizes.md,
  },
  title: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: fontSizes.md,
  },
});