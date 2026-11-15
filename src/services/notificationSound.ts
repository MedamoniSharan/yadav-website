const SOUND_PREF_KEY = 'yadav_notif_sound_enabled';

let sharedAudioCtx: AudioContext | null = null;
let lastPlayedAt = 0;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  const AudioCtx =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioCtx) return null;
  if (!sharedAudioCtx) {
    try {
      sharedAudioCtx = new AudioCtx();
    } catch {
      return null;
    }
  }
  if (sharedAudioCtx.state === 'suspended') {
    sharedAudioCtx.resume().catch(() => {});
  }
  return sharedAudioCtx;
}

export function isNotificationSoundEnabled(): boolean {
  try {
    return localStorage.getItem(SOUND_PREF_KEY) !== 'false';
  } catch {
    return true;
  }
}

export function setNotificationSoundEnabled(enabled: boolean): void {
  try {
    localStorage.setItem(SOUND_PREF_KEY, enabled ? 'true' : 'false');
  } catch {
    // Ignore storage issues
  }
}

/**
 * Unlocks Web Audio & Speech Synthesis on first user gesture so notifications play smoothly.
 */
export function unlockNotificationAudio(): void {
  getAudioContext();
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.getVoices();
    } catch {
      // Ignore speech synthesis initialization errors
    }
  }
}

/**
 * Plays a gentle two-note temple bell / bansuri chime via Web Audio API.
 */
function playDevotionalBellChime(): void {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const notes = [
      { freq: 587.33, start: 0, duration: 0.34, gain: 0.11 }, // D5
      { freq: 880.0, start: 0.11, duration: 0.44, gain: 0.09 }, // A5
    ];

    notes.forEach(({ freq, start, duration, gain }) => {
      const osc = ctx.createOscillator();
      const harm = ctx.createOscillator();
      const env = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + start);

      harm.type = 'triangle';
      harm.frequency.setValueAtTime(freq * 2, now + start);

      const harmGain = ctx.createGain();
      harmGain.gain.setValueAtTime(0.18, now + start);

      env.gain.setValueAtTime(0.0001, now + start);
      env.gain.exponentialRampToValueAtTime(gain, now + start + 0.025);
      env.gain.exponentialRampToValueAtTime(0.0001, now + start + duration);

      osc.connect(env);
      harm.connect(harmGain);
      harmGain.connect(env);
      env.connect(ctx.destination);

      osc.start(now + start);
      harm.start(now + start);
      osc.stop(now + start + duration + 0.02);
      harm.stop(now + start + duration + 0.02);
    });
  } catch {
    // Ignore audio synthesis errors
  }
}

function selectDevotionalVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  if (!voices.length) return null;
  const preferred =
    voices.find((v) => v.lang.toLowerCase() === 'en-in') ||
    voices.find((v) => v.lang.toLowerCase() === 'hi-in') ||
    voices.find((v) => v.lang.toLowerCase().startsWith('en-in')) ||
    voices.find((v) => v.lang.toLowerCase().startsWith('hi')) ||
    voices.find((v) => v.lang.toLowerCase().startsWith('en') && v.localService) ||
    voices.find((v) => v.lang.toLowerCase().startsWith('en'));
  return preferred || voices[0];
}

/**
 * Plays the "Jai Shri Krishna" notification sound (temple bell chime + spoken voice).
 */
export function playJaiShriKrishna(force = false): void {
  if (typeof window === 'undefined') return;
  if (!force && !isNotificationSoundEnabled()) return;

  const nowMs = Date.now();
  if (!force && nowMs - lastPlayedAt < 350) return;
  lastPlayedAt = nowMs;

  playDevotionalBellChime();

  if (!('speechSynthesis' in window)) return;
  try {
    const synth = window.speechSynthesis;
    synth.cancel();

    const speakNow = () => {
      const utterance = new SpeechSynthesisUtterance('Jai Shri Krishna');
      const voices = synth.getVoices();
      const chosen = selectDevotionalVoice(voices);
      if (chosen) {
        utterance.voice = chosen;
        utterance.lang = chosen.lang;
      } else {
        utterance.lang = 'en-IN';
      }
      utterance.rate = 0.92;
      utterance.pitch = 1.05;
      utterance.volume = 1.0;
      synth.speak(utterance);
    };

    // Short delay so the gentle bell chime leads cleanly into the spoken greeting
    window.setTimeout(speakNow, 160);
  } catch {
    // Ignore speech synthesis errors in restricted environments
  }
}
