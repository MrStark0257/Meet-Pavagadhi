// High-Tech Stark HUD Audio & Web Speech Voice Utility

// 1. Web Speech API JARVIS Voice Confirmation ("Hello Meet")
export const speakJarvisGreeting = () => {
  try {
    if (!('speechSynthesis' in window)) return;
    
    // Stop any active speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance("Hello Meet. Jarvis online. Welcome to your portfolio.");
    utterance.rate = 0.92; // Sophisticated, steady AI pace
    utterance.pitch = 0.95; // Deeper tone

    const playSpeech = () => {
      const voices = window.speechSynthesis.getVoices();
      // Prefer British Male or Natural English Voice (JARVIS style)
      const jarvisVoice = voices.find(v => 
        v.name.includes('David') || 
        v.name.includes('Google UK English Male') || 
        v.name.includes('British') || 
        v.name.includes('Natural') || 
        v.name.includes('Daniel') ||
        (v.lang && v.lang.startsWith('en'))
      );

      if (jarvisVoice) {
        utterance.voice = jarvisVoice;
      }
      window.speechSynthesis.speak(utterance);
    };

    if (window.speechSynthesis.getVoices().length > 0) {
      playSpeech();
    } else {
      window.speechSynthesis.onvoiceschanged = () => {
        playSpeech();
        window.speechSynthesis.onvoiceschanged = null;
      };
    }
  } catch (e) {
    console.log('Speech synthesis error:', e);
  }
};

let audioCtx = null;

const getAudioContext = () => {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
};

// High-Tech Subtle Click SFX
export const playClickSFX = () => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, now);
    osc.frequency.exponentialRampToValueAtTime(1760, now + 0.08);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.1);
  } catch (e) {
    console.log('SFX error:', e);
  }
};

// Subtle Hover Beep SFX
export const playHoverSFX = () => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1200, now);

    gain.gain.setValueAtTime(0.02, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.04);
  } catch (e) {
    console.log('SFX error:', e);
  }
};
