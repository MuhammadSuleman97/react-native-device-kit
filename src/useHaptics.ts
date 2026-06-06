import { useCallback } from 'react';
import { Platform, Vibration } from 'react-native';

export type HapticType = 'light' | 'medium' | 'heavy' | 'selection' | 'success' | 'warning' | 'error';

const HAPTIC_MAP: Record<HapticType, string> = {
  light: 'impactLight', medium: 'impactMedium', heavy: 'impactHeavy',
  selection: 'selection', success: 'notificationSuccess',
  warning: 'notificationWarning', error: 'notificationError',
};

export interface UseHapticsReturn {
  trigger: (type?: HapticType) => void;
  vibrate: (duration?: number) => void;
}

export function useHaptics(): UseHapticsReturn {
  const trigger = useCallback((type: HapticType = 'light') => {
    if (Platform.OS === 'web') return;
    try {
      const Haptic = require('react-native-haptic-feedback');
      Haptic.trigger(HAPTIC_MAP[type], { enableVibrateFallback: true, ignoreAndroidSystemSettings: false });
    } catch {
      Vibration.vibrate({ light: 10, medium: 20, heavy: 30, selection: 5, success: 15, warning: 25, error: 40 }[type] ?? 15);
    }
  }, []);

  const vibrate = useCallback((duration = 100) => {
    if (Platform.OS !== 'web') Vibration.vibrate(duration);
  }, []);

  return { trigger, vibrate };
}
