// script.js (corrected)
document.addEventListener('DOMContentLoaded', () => {
  // ---------------------------
  // Typewriter effect
  // ---------------------------
  const message = "On your special day, I just want you to know how inspiring you are. Your smile always brightens the room, your laughter is contagious, and your presence makes things feel lighter and more positive.";

  function typeWriter() {
    const el = document.getElementById("typewriter");
    if (!el) return;
    el.textContent = ""; // reset
    let idx = 0;

    function typing() {
      if (idx < message.length) {
        el.textContent += message.charAt(idx);
        idx++;
        setTimeout(typing, 50);
      }
    }
    typing();
  }

  // ---------------------------
  // Step navigation
  // ---------------------------
  let currentStep = 1;
  const totalSteps = 5;

  function showStep(step) {
    // ensure step is inside bounds
    step = Math.max(1, Math.min(totalSteps, step));

    document.querySelectorAll(".step").forEach(s => s.classList.add("hidden"));
    const target = document.getElementById(`step${step}`);
    if (target) target.classList.remove("hidden");

    currentStep = step;
    const progressBar = document.getElementById("progress-bar");
    if (progressBar) {
      progressBar.style.width = `${((step - 1) / (totalSteps - 1)) * 100}%`;
    }

    if (step === 2) typeWriter();
  }

  // wire Start button (plays music AND moves to step 2)
  const bgMusic = document.getElementById('bg-music');
  const startBtn = document.getElementById('start-btn');
  if (startBtn) {
    startBtn.addEventListener('click', () => {
      // show step 2
      showStep(2);
      // play music (user interaction ensures play allowed)
      if (bgMusic) {
        bgMusic.play().catch(e => console.log("Audio play prevented:", e));
      }
    });
  }

  // Next buttons using .next-btn
  document.querySelectorAll(".next-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      showStep(currentStep + 1);
    });
  });

  // Back buttons using .back-btn
  document.querySelectorAll(".back-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      showStep(currentStep - 1);
    });
  });

  // ---------------------------
  // Confetti celebration
  // ---------------------------
  const confettiBtn = document.getElementById("confetti-btn");
  if (confettiBtn) {
    confettiBtn.addEventListener("click", () => {
      // big burst
      confetti({
        particleCount: 200,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#ff0000", "#ff69b4", "#ff1493", "#ffc0cb"],
      });
      // a few smaller bursts
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          confetti({
            particleCount: 40,
            spread: 100,
            startVelocity: 30,
            scalar: 1.2,
            origin: { x: Math.random(), y: Math.random() - 0.2 },
            colors: ["#ff69b4", "#ff1493", "#ffc0cb"],
          });
        }, i * 300);
      }
    });
  }

  // ---------------------------
  // Love quotes (rotating)
  // ---------------------------
  const quotes = [
    "People like you make the world brighter 🌟",
    "Your positivity spreads like sunshine ☀️",
    "Every interaction with you is a gift 🎁",
    "Wishing you joy as wonderful as the energy you bring 💕",
    "I fall in love with you more and more every single day ❤️",
  ];

  const quoteBtn = document.getElementById("quote-btn");
  const quoteEl = document.getElementById("love-quote");
  let quoteIndex = 0;
  let quoteInterval = null;

  if (quoteBtn && quoteEl) {
    quoteBtn.addEventListener("click", () => {
      quoteBtn.disabled = true;
      quoteEl.classList.remove("hidden");

      function showNextQuote() {
        quoteEl.classList.add("opacity-0", "transition", "duration-500");
        setTimeout(() => {
          quoteEl.textContent = quotes[quoteIndex];
          quoteEl.classList.remove("opacity-0");
          quoteIndex = (quoteIndex + 1) % quotes.length;
        }, 500);
      }

      showNextQuote();
      // store interval in case you want to clear it later
      quoteInterval = setInterval(showNextQuote, 4000);
    });
  }

  // ---------------------------
  // Three.js floating hearts background
  // ---------------------------
  const container = document.getElementById("canvas-container");
  if (container && window.THREE) {
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0); // transparent
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 80;

    // create a simple heart shape
    const heartShape = new THREE.Shape();
    heartShape.moveTo(25, 25);
    heartShape.bezierCurveTo(25, 25, 20, 0, 0, 0);
    heartShape.bezierCurveTo(-30, 0, -30, 35, -30, 35);
    heartShape.bezierCurveTo(-30, 55, -10, 77, 25, 95);
    heartShape.bezierCurveTo(60, 77, 80, 55, 80, 35);
    heartShape.bezierCurveTo(80, 35, 80, 0, 50, 0);
    heartShape.bezierCurveTo(35, 0, 25, 25, 25, 25);

    const geometry = new THREE.ExtrudeGeometry(heartShape, {
      depth: 2,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 2,
      bevelSize: 1,
      bevelThickness: 1,
    });

    const hearts = [];
    const HEART_COUNT = 12; // keep it reasonable for perf
    for (let j = 0; j < HEART_COUNT; j++) {
      const mat = new THREE.MeshPhongMaterial({ color: 0xff69b4, transparent: true, opacity: 0.85 });
      const heart = new THREE.Mesh(geometry, mat);
      heart.position.set(
        (Math.random() - 0.5) * 140,
        (Math.random() - 0.5) * 140,
        (Math.random() - 0.5) * 140
      );
      const scale = Math.random() * 0.25 + 0.08;
      heart.scale.set(scale, scale, scale);
      heart.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      scene.add(heart);
      hearts.push(heart);
    }

    scene.add(new THREE.AmbientLight(0xffffff, 0.8));
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
    dirLight.position.set(1, 1, 1);
    scene.add(dirLight);

    function animate() {
      requestAnimationFrame(animate);
      hearts.forEach((h, idx) => {
        h.rotation.x += 0.006 + 0.001 * idx;
        h.rotation.y += 0.008 + 0.001 * idx;
        h.position.y += Math.sin(Date.now() * 0.001 + idx) * 0.002; // gentle float
      });
      renderer.render(scene, camera);
    }
    animate();

    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    });
  }

  // initialize first view
  showStep(1);
});
