import { useCallback, useEffect, useState } from 'react';
import { Platform } from 'react-native';

const NativeModules = Platform.OS !== 'web' ? require('react-native').NativeModules : null;

export interface UseScreenReturn {
  brightness: number;
  setBrightness: (value: number) => void;
  keepAwake: (awake: boolean) => void;
}

export function useScreen(): UseScreenReturn {
  const [brightness, setBrightnessState] = useState(0.5);

  useEffect(() => {
    if (Platform.OS === 'web' || !NativeModules) return;
    try {
      NativeModules.ScreenBrightness?.getBrightness?.().then((v: number) => setBrightnessState(v));
    } catch {}
  }, []);

  const setBrightness = useCallback((value: number) => {
    const c = Math.max(0, Math.min(1, value));
    setBrightnessState(c);
    if (Platform.OS !== 'web' && NativeModules) {
      try { NativeModules.ScreenBrightness?.setBrightness?.(c); } catch {}
    }
  }, []);

  const keepAwake = useCallback((awake: boolean) => {
    if (Platform.OS === 'web' || !NativeModules) return;
    try {
      awake ? NativeModules.KeepAwake?.activate?.() : NativeModules.KeepAwake?.deactivate?.();
    } catch {}
  }, []);

  return { brightness, setBrightness, keepAwake };
}
