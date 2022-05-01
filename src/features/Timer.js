import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Vibration } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { useKeepAwake } from 'expo-keep-awake';
import { Countdown } from '../components/Countdown';
import { RoundedButton } from '../components/RoundedButton';
import { Timing } from './Timing';
import { spacing } from '../utils/sizes';
import { colors } from '../utils/colors';

const ONE_SECOND_IN_MS = 1000;

const PATTERN = [
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS
];

const minutesToMillis = (min) => min * 1000 * 60;

export const Timer = ({ focusSubject, clearSubject, setHistory }) => {
  useKeepAwake();
  
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);
  const [minutes, setMinutes] = useState(0.1);
  const [millis, setMillis] = useState(null);
  const [hasTimerEnded, setHasTimerEnded] = useState(false);

  const onEnd = () => {
    Vibration.vibrate(PATTERN);
    setMillis(minutesToMillis(minutes));
    setIsStarted(false);
    setProgress(1);
    setHasTimerEnded(true);
  };

  useEffect(() => {
    if (hasTimerEnded) {
      setHistory(prev => [...prev, focusSubject]);
    } 
  }, [hasTimerEnded]);

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown 
          minutes={minutes} 
          isPaused={!isStarted} 
          onEnd={onEnd} 
          onProgress={setProgress} 
          millis={millis}
          setMillis={setMillis}
          minutesToMillis={minutesToMillis}
        />
        <View style={{ paddingTop: spacing.xxl}}>
          <Text style={styles.title}>Focussing On:</Text>
          <Text style={styles.task}>{focusSubject}</Text>
        </View>
      </View>
      <View style={{ paddingTop: spacing.sm }}>
        <ProgressBar 
          progress={progress}
          color={colors.ProgressBar} 
          style={{ height: spacing.sm }} 
        />
      </View>
      <View style={styles.timingWrapper}> 
        <Timing onChangeTime={setMinutes} />
      </View>
      <View style={styles.buttonWrapper}>
        <RoundedButton title={isStarted ? 'pause' : 'start'} onPress={() => setIsStarted(prev => !prev)} />
      </View>
      <View style={styles.clearSubjectWrapper}> 
        <RoundedButton size={50} title='-' onPress={clearSubject} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'green',
  },
  countdown: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'yellow',
  },
  buttonWrapper: {
    flex: 0.3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'purple',
  },
  timingWrapper: {
    flex: 0.1,
    flexDirection: 'row',
    paddingTop: spacing.xxl,
  },
  clearSubjectWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    color: colors.white,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  task: {
    color: colors.white,
    textAlign: 'center',
  }
});