import { useCallback, useState } from 'react';
import { Clipboard, Platform } from 'react-native';

export interface UseClipboardReturn {
  copy: (text: string) => void;
  paste: () => Promise<string>;
  lastCopied: string | null;
}

export function useClipboard(): UseClipboardReturn {
  const [lastCopied, setLastCopied] = useState<string | null>(null);

  const copy = useCallback((text: string) => {
    if (Platform.OS === 'web') { navigator.clipboard.writeText(text); }
    else { Clipboard.setString(text); }
    setLastCopied(text);
  }, []);

  const paste = useCallback(async (): Promise<string> => {
    if (Platform.OS === 'web') return navigator.clipboard.readText();
    return Clipboard.getString();
  }, []);

  return { copy, paste, lastCopied };
}
