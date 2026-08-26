// High-Tech Stark HUD Power-On Activation Sound Effect

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

// Sleek High-Tech HUD Opening / Power-On Sound Effect (No voice)
export const playOpenHUDSFX = () => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // 1. Futuristic Arc Reactor Charging Sweep
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.exponentialRampToValueAtTime(750, now + 0.4);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.12, now + 0.2);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(400, now);
    filter.frequency.exponentialRampToValueAtTime(2200, now + 0.4);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.5);

    // 2. Crystal Clear High-Tech Interface Startup Ping
    const pingOsc = ctx.createOscillator();
    const pingGain = ctx.createGain();

    pingOsc.type = 'sine';
    pingOsc.frequency.setValueAtTime(987.77, now + 0.35); // B5
    pingOsc.frequency.exponentialRampToValueAtTime(1975.53, now + 0.45); // B6

    pingGain.gain.setValueAtTime(0.001, now + 0.35);
    pingGain.gain.linearRampToValueAtTime(0.15, now + 0.4);
    pingGain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

    pingOsc.connect(pingGain);
    pingGain.connect(ctx.destination);

    pingOsc.start(now + 0.35);
    pingOsc.stop(now + 0.8);

  } catch (e) {
    console.log('SFX error:', e);
  }
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
