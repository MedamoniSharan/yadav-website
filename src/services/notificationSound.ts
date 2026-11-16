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
 * Unlocks Web Audio (with silent 1-sample buffer for iOS Safari / Android Chrome)
 * and warms up Speech Synthesis inside a user gesture.
 */
export function unlockNotificationAudio(): void {
  const ctx = getAudioContext();
  if (ctx) {
    try {
      if (ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }
      const buffer = ctx.createBuffer(1, 1, 22050);
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(ctx.destination);
      source.start(0);
    } catch {
      // Ignore Web Audio unlock issues
    }
  }

  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.getVoices();
    } catch {
      // Ignore speech synthesis initialization errors
    }
  }
}

function scheduleBellNotes(ctx: AudioContext): void {
  try {
    const now = ctx.currentTime;
    const notes = [
      { freq: 587.33, start: 0, duration: 0.34, gain: 0.12 }, // D5
      { freq: 880.0, start: 0.11, duration: 0.44, gain: 0.1 }, // A5
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

/**
 * Plays a gentle two-note temple bell / bansuri chime via Web Audio API.
 */
function playDevotionalBellChime(): void {
  const ctx = getAudioContext();
  if (!ctx) return;

  if (ctx.state === 'suspended') {
    ctx
      .resume()
      .then(() => scheduleBellNotes(ctx))
      .catch(() => {});
  } else {
    scheduleBellNotes(ctx);
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
 * Plays the "Jai Shri Krishna" notification sound synchronously inside the call stack
 * so iOS Safari and Android Chrome preserve user gesture activation.
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
    if (synth.speaking || synth.pending) {
      synth.cancel();
    }

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
  } catch {
    // Ignore speech synthesis errors in restricted environments
  }
}
