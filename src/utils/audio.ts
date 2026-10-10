// Synthesizes realistic audio cues using the Web Audio API without any external dependencies

// Realistic double chime (Ding-Dong) for workshop queue & table calls
export const playQueueChime = () => {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();

    // First tone (higher pitch: ~659.25 Hz - E5)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(659.25, ctx.currentTime);
    
    gain1.gain.setValueAtTime(0, ctx.currentTime);
    gain1.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.05);
    gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.7);

    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(ctx.currentTime);
    osc1.stop(ctx.currentTime + 0.7);

    // Second tone (lower pitch: ~523.25 Hz - C5)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(523.25, ctx.currentTime + 0.35);

    gain2.gain.setValueAtTime(0, ctx.currentTime + 0.35);
    gain2.gain.linearRampToValueAtTime(0.35, ctx.currentTime + 0.4);
    gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);

    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(ctx.currentTime + 0.35);
    osc2.stop(ctx.currentTime + 1.2);
  } catch {
    // Audio context may be restricted by autoplay policy before user gesture
  }
};

// Realistic POS Laser Barcode Scanner beep (Crisp, sharp high-frequency 1850Hz pulse)
export const playBarcodeBeep = () => {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1850, ctx.currentTime);

    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.35, ctx.currentTime + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.08);
  } catch {
    // Ignore autoplay errors
  }
};

// Order ready ding
export const playKitchenDing = () => {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(880, ctx.currentTime);

    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.5);
  } catch {
    // Ignore
  }
};
