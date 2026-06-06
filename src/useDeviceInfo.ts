import { useMemo } from 'react';
import { Dimensions, Platform, type PlatformIOSStatic } from 'react-native';

export interface DeviceInfo {
  platform: string;
  version: string;
  isTablet: boolean;
  isPhone: boolean;
  screen: { width: number; height: number };
  guideline: { baseWidth: number; baseHeight: number };
  scale: (size: number) => number;
  verticalScale: (size: number) => number;
  moderateScale: (size: number, factor?: number) => number;
}

export function useDeviceInfo(): DeviceInfo {
  return useMemo(() => {
    const dim = Dimensions.get('window');
    const ios = Platform as PlatformIOSStatic;
    const isTablet = Platform.OS === 'ios' ? ios.isPad : dim.width >= 600;
    const base = { width: 375, height: 812 };
    const ws = dim.width / base.width;
    const hs = dim.height / base.height;

    return {
      platform: Platform.OS,
      version: String(Platform.Version),
      isTablet,
      isPhone: !isTablet,
      screen: { width: dim.width, height: dim.height },
      guideline: { baseWidth: base.width, baseHeight: base.height },
      scale: (s: number) => s * ws,
      verticalScale: (s: number) => s * hs,
      moderateScale: (s: number, f = 0.5) => s + (s * ws - s) * f,
    };
  }, []);
}
