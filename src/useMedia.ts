import { useCallback, useState } from 'react';
import { Alert, type ImagePickerResponse, Platform } from 'react-native';

export interface MediaOptions {
  mediaType?: 'photo' | 'video' | 'mixed';
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  allowMultiple?: boolean;
  cameraType?: 'front' | 'back';
}

export interface MediaAsset {
  uri: string;
  width: number;
  height: number;
  type?: string;
  fileName?: string;
  fileSize?: number;
}

export interface UseMediaReturn {
  launchCamera: (opts?: MediaOptions) => Promise<MediaAsset | null>;
  launchGallery: (opts?: MediaOptions) => Promise<MediaAsset[] | null>;
  loading: boolean;
  error: string | null;
}

function mapResponse(r: ImagePickerResponse): MediaAsset | null {
  if (r.didCancel || r.errorCode || !r.assets?.[0]) return null;
  const a = r.assets[0];
  return { uri: a.uri!, width: a.width!, height: a.height!, type: a.type, fileName: a.fileName, fileSize: a.fileSize };
}

function mapMultiResponse(r: ImagePickerResponse): MediaAsset[] | null {
  if (r.didCancel || r.errorCode || !r.assets) return null;
  return r.assets.map((a) => ({ uri: a.uri!, width: a.width!, height: a.height!, type: a.type, fileName: a.fileName, fileSize: a.fileSize }));
}

async function requestPermission(): Promise<boolean> {
  if (Platform.OS === 'web') return true;
  try {
    require('react-native-image-picker');
    return true;
  } catch {
    Alert.alert('Missing Dependency', 'Install react-native-image-picker to use media features.');
    return false;
  }
}

export function useMedia(): UseMediaReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const launchCamera = useCallback(async (opts: MediaOptions = {}): Promise<MediaAsset | null> => {
    setLoading(true); setError(null);
    try {
      if (!(await requestPermission())) return null;
      const { launchCamera: lc } = require('react-native-image-picker');
      const r: ImagePickerResponse = await lc({ mediaType: opts.mediaType ?? 'photo', maxWidth: opts.maxWidth, maxHeight: opts.maxHeight, quality: opts.quality ?? 0.8, cameraType: opts.cameraType ?? 'back' });
      return mapResponse(r);
    } catch (e: unknown) { setError((e as Error).message); return null; }
    finally { setLoading(false); }
  }, []);

  const launchGallery = useCallback(async (opts: MediaOptions = {}): Promise<MediaAsset[] | null> => {
    setLoading(true); setError(null);
    try {
      if (!(await requestPermission())) return null;
      const { launchImageLibrary } = require('react-native-image-picker');
      const r: ImagePickerResponse = await launchImageLibrary({ mediaType: opts.mediaType ?? 'photo', maxWidth: opts.maxWidth, maxHeight: opts.maxHeight, quality: opts.quality ?? 0.8, selectionLimit: opts.allowMultiple ? 0 : 1 });
      return mapMultiResponse(r);
    } catch (e: unknown) { setError((e as Error).message); return null; }
    finally { setLoading(false); }
  }, []);

  return { launchCamera, launchGallery, loading, error };
}
