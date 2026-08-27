import confetti from 'canvas-confetti';

export function fireConfetti() {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 }
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio)
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
    colors: ['#ff4d6d', '#ffb703', '#e63946']
  });
  fire(0.2, {
    spread: 60,
    colors: ['#ffd166', '#06d6a0', '#118ab2']
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
    colors: ['#e7c6ff', '#b8c0ff', '#ffc6ff']
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
    colors: ['#ffb703', '#fb8500', '#d4af37']
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
    colors: ['#e63946', '#ff4d6d', '#fff']
  });
}

export function fireFlowerShower() {
  const duration = 2.5 * 1000;
  const animationEnd = Date.now() + duration;
  const skew = 1;

  (function frame() {
    const timeLeft = animationEnd - Date.now();
    const ticks = Math.max(200, 500 * (timeLeft / duration));
    
    confetti({
      particleCount: 2,
      startVelocity: 0,
      ticks: ticks,
      origin: {
        x: Math.random(),
        // since particles fall down, skew y so they start above 0
        y: (Math.random() * skew) - 0.2
      },
      colors: ['#ff4d6d', '#ffb703', '#ffd166', '#d4af37', '#e63946'],
      shapes: ['circle'],
      gravity: 0.6,
      scalar: 1.2,
      drift: Math.random() - 0.5
    });

    if (timeLeft > 0) {
      requestAnimationFrame(frame);
    }
  })();
}
