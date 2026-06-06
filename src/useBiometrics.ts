import { useCallback, useState } from 'react';
import { Alert, Platform } from 'react-native';

export type BiometricType = 'fingerprint' | 'face' | 'iris' | 'none';

export interface UseBiometricsReturn {
  isAvailable: () => Promise<boolean>;
  getType: () => Promise<BiometricType>;
  authenticate: (reason?: string) => Promise<boolean>;
  loading: boolean;
}

export function useBiometrics(): UseBiometricsReturn {
  const [loading, setLoading] = useState(false);

  const isAvailable = useCallback(async (): Promise<boolean> => {
    if (Platform.OS === 'web') return false;
    try {
      const { default: RNAuth } = require('react-native-biometrics');
      const r = await RNAuth.isSensorAvailable();
      return r.available;
    } catch { return false; }
  }, []);

  const getType = useCallback(async (): Promise<BiometricType> => {
    if (Platform.OS === 'web') return 'none';
    try {
      const { default: RNAuth } = require('react-native-biometrics');
      const r = await RNAuth.isSensorAvailable();
      return r.biometryType ?? 'none';
    } catch { return 'none'; }
  }, []);

  const authenticate = useCallback(async (reason = 'Authenticate'): Promise<boolean> => {
    setLoading(true);
    try {
      const { default: RNAuth } = require('react-native-biometrics');
      const r = await RNAuth.simplePrompt({ promptMessage: reason });
      return r.success;
    } catch {
      Alert.alert('Missing', 'Install react-native-biometrics');
      return false;
    } finally { setLoading(false); }
  }, []);

  return { isAvailable, getType, authenticate, loading };
}
