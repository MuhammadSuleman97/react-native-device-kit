# react-native-device-kit

> Comprehensive React Native device toolkit — 7 hooks for camera, clipboard, haptics, biometrics, screen, sharing, and device info. Zero native setup.

```bash
npm install @kryndal/react-native-device-kit
```

---

## Modules

### 📸 `useMedia()` — Camera & Gallery

```tsx
import { useMedia } from '@kryndal/react-native-device-kit';

const { launchCamera, launchGallery, loading } = useMedia();

const photo = await launchCamera({ quality: 0.8 });
const images = await launchGallery({ allowMultiple: true });
```

Optional: `npm install react-native-image-picker`

---

### 📋 `useClipboard()` — Copy & Paste

```tsx
import { useClipboard } from '@kryndal/react-native-device-kit';

const { copy, paste, lastCopied } = useClipboard();
copy('Hello World!');
const text = await paste();
```

---

### 📳 `useHaptics()` — Haptic Feedback

```tsx
import { useHaptics } from '@kryndal/react-native-device-kit';

const { trigger, vibrate } = useHaptics();
trigger('success');  // light | medium | heavy | selection | success | warning | error
vibrate(200);        // ms
```

Optional: `npm install react-native-haptic-feedback` (for rich iOS haptics)

---

### 💡 `useScreen()` — Brightness & Keep-Awake

```tsx
import { useScreen } from '@kryndal/react-native-device-kit';

const { brightness, setBrightness, keepAwake } = useScreen();
setBrightness(0.8);
keepAwake(true);
```

---

### 📤 `useShare()` — Native Share Dialog

```tsx
import { useShare } from '@kryndal/react-native-device-kit';

const { share } = useShare();
await share({ message: 'Check this out!', url: 'https://...' });
```

---

### 🔐 `useBiometrics()` — Face ID / Fingerprint

```tsx
import { useBiometrics } from '@kryndal/react-native-device-kit';

const { authenticate, isAvailable } = useBiometrics();
const ok = await authenticate('Unlock to continue');
```

Optional: `npm install react-native-biometrics`

---

### 📏 `useDeviceInfo()` — Device Info & Sizing

```tsx
import { useDeviceInfo } from '@kryndal/react-native-device-kit';

const { platform, isTablet, scale } = useDeviceInfo();
const fontSize = scale(16); // responsive font size
```

---

## API Reference

| Hook | Returns | Optional Dep |
|------|---------|-------------|
| `useMedia()` | `{ launchCamera, launchGallery, loading }` | `react-native-image-picker` |
| `useClipboard()` | `{ copy, paste, lastCopied }` | none |
| `useHaptics()` | `{ trigger, vibrate }` | `react-native-haptic-feedback` |
| `useScreen()` | `{ brightness, setBrightness, keepAwake }` | none |
| `useShare()` | `{ share, loading }` | none |
| `useBiometrics()` | `{ authenticate, isAvailable, getType }` | `react-native-biometrics` |
| `useDeviceInfo()` | `{ platform, isTablet, scale, ... }` | none |

---

## Features

- ✅ **Zero native setup** — pure JS hooks, no linking
- ✅ **TypeScript-first** — full type coverage
- ✅ **Optional deps** — only install what you need
- ✅ **Graceful fallbacks** — works on web, unsupported platforms
- ✅ **< 5KB gzipped**

---

## License

MIT © [Muhammad Suleman](https://github.com/MuhammadSuleman97)
