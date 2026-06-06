import { useCallback, useState } from 'react';
import { Share, type ShareContent } from 'react-native';

export interface UseShareReturn {
  share: (content: ShareContent) => Promise<boolean>;
  loading: boolean;
  lastResult: boolean | null;
}

export function useShare(): UseShareReturn {
  const [loading, setLoading] = useState(false);
  const [lastResult, setLastResult] = useState<boolean | null>(null);

  const shareFn = useCallback(async (content: ShareContent): Promise<boolean> => {
    setLoading(true);
    try {
      const result = await Share.share(content);
      const ok = result.action === Share.sharedAction;
      setLastResult(ok);
      return ok;
    } catch {
      setLastResult(false);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { share: shareFn, loading, lastResult };
}
