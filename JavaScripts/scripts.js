/*
  =========================================================================
    MASTER SYSTEM ENGINE SCRIPT — ANNOTATED FOR MR. HARDMAN
  =========================================================================
  Name: Cruz Plamondon
  Course: Web Development 10S
  Teacher: Mr. Hardman
  School: PTEC
  File: JavaScripts/scripts.js
  =========================================================================
*/

document.addEventListener("DOMContentLoaded", () => {
  /* =====================================================================
     01. ACCESSIBLE TYPOGRAPHIC TEXT FRAGMENTATION ENGINE
     ---------------------------------------------------------------------
     GRADE 9 EXPLANATION: This takes our main landing titles and slices 
     the words into single, isolated letter boxes. This lets us use CSS 
     animation delays to stagger their entry (like a typewriter). 
     We also duplicate the text into an 'aria-label' so that screen 
     readers for blind users don't stutter reading broken letters!
  ===================================================================== */
  const typewriterTargets = document.querySelectorAll(".hero-display");

  typewriterTargets.forEach((target) => {
    const fullText = target.textContent.trim();
    target.setAttribute("aria-label", fullText);
    target.innerHTML = "";
    target.classList.add("type-ready");

    const visualMask = document.createElement("span");
    visualMask.setAttribute("aria-hidden", "true");

    Array.from(fullText).forEach((char) => {
      const charSpan = document.createElement("span");
      charSpan.textContent = char;
      if (char === ".") charSpan.className = "accent-dot";
      visualMask.appendChild(charSpan);
    });

    target.appendChild(visualMask);
  });

  void document.documentElement.offsetWidth;

  const introScreenActive = document.getElementById("intro-screen");
  if (introScreenActive) {
    setTimeout(() => {
      document.documentElement.classList.add("is-booted");
    }, 1300);
  } else {
    document.documentElement.classList.add("is-booted");
  }

  const htmlRoot = document.documentElement;

  /* =====================================================================
     04. ACCESSIBLE SCROLL PROGRESS OVERRIDE
     ---------------------------------------------------------------------
     GRADE 9 EXPLANATION: Calculates how far down the screen a user has 
     scrolled, mapping that percentage to the width of the top neon bar.
  ===================================================================== */
  const progressBar = document.getElementById("progress-bar");
  if (progressBar) {
    let ticking = false;
    const dynamicStyle = document.createElement("style");
    dynamicStyle.id = "dynamic-scroll-engine";
    document.head.appendChild(dynamicStyle);

    window.addEventListener("scroll", () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollTop = document.documentElement.scrollTop;
          const scrollHeight =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;
          const scrollPercentage =
            scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
          dynamicStyle.textContent = `#progress-bar { width: ${scrollPercentage}%; }`;
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  /* =====================================================================
     05. PARENT-CENTRIC SEQUENCE OBSERVER MATRIX
  ===================================================================== */
  const parentSequences = document.querySelectorAll(
    ".bento-grid, .editorial-split-row, .track-grid, .grid-split, .mag-spread",
  );
  parentSequences.forEach((parent) => parent.classList.add("parent-sequence"));

  const scrollObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-assembled");
        } else {
          entry.target.classList.remove("is-assembled");
        }
      });
    },
    { root: null, rootMargin: "0px", threshold: 0.1 },
  );

  parentSequences.forEach((parent) => scrollObserver.observe(parent));

  /* =====================================================================
     06. DECOUPLED DATA ARRAY & SEARCH MODAL ENGINE 
     ---------------------------------------------------------------------
     GRADE 9 EXPLANATION: Runs the search overlay. It scans keystrokes 
     instantly against the searchData.js file array without reloading the page.
  ===================================================================== */
  const drawerPanel = document.querySelector(".drawer-panel");
  const drawerOverlay = document.querySelector(".drawer-overlay");
  const searchInput = document.getElementById("drawer-search-input");
  const resultsContainer = document.querySelector(".drawer-results");
  const drawerHeader = document.querySelector(".drawer-header");

  if (drawerHeader && !document.getElementById("closeSearchBtn")) {
    const closeBtn = document.createElement("button");
    closeBtn.id = "closeSearchBtn";
    closeBtn.className = "close-search-btn";
    closeBtn.setAttribute("aria-label", "Close Search");
    closeBtn.innerHTML = "&#10005;";
    drawerHeader.appendChild(closeBtn);
  }

  const closeSearchBtn = document.getElementById("closeSearchBtn");
  const searchTriggers = Array.from(
    document.querySelectorAll(".interactive-button-action"),
  ).filter((btn) => btn.textContent.trim() === "SEARCH PLATFORM");

  let drawerLastFocused = null;

  function trapDrawerFocus(e) {
    if (e.key !== "Tab" || !drawerPanel) return;
    const focusable = drawerPanel.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  function toggleDrawer(forceOpen = false) {
    if (!drawerPanel) return;
    const isClosed = !drawerPanel.classList.contains("is-active");
    if (isClosed || forceOpen) {
      drawerLastFocused = document.activeElement;
      drawerPanel.classList.add("is-active");
      drawerPanel.setAttribute("aria-hidden", "false");
      document.body.classList.add("is-locked");
      if (drawerOverlay) drawerOverlay.classList.add("is-active");
      document.addEventListener("keydown", trapDrawerFocus);
      if (searchInput) {
        searchInput.disabled = false;
        setTimeout(() => searchInput.focus(), 200);
        renderSearchResults("");
      }
    } else {
      drawerPanel.classList.remove("is-active");
      drawerPanel.setAttribute("aria-hidden", "true");
      document.body.classList.remove("is-locked");
      if (drawerOverlay) drawerOverlay.classList.remove("is-active");
      if (searchInput) searchInput.value = "";
      document.removeEventListener("keydown", trapDrawerFocus);
      if (drawerLastFocused) drawerLastFocused.focus();
    }
  }

  searchTriggers.forEach((btn) =>
    btn.addEventListener("click", () => toggleDrawer(true)),
  );
  if (closeSearchBtn)
    closeSearchBtn.addEventListener("click", () => toggleDrawer(false));
  if (drawerOverlay)
    drawerOverlay.addEventListener("click", () => toggleDrawer(false));

  document.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      toggleDrawer(true);
    }
    if (
      e.key === "Escape" &&
      drawerPanel &&
      drawerPanel.classList.contains("is-active")
    ) {
      toggleDrawer(false);
    }
  });

  if (searchInput) {
    searchInput.addEventListener("input", (e) =>
      renderSearchResults(e.target.value),
    );
    const searchForm = document.querySelector(".drawer-form");
    if (searchForm)
      searchForm.addEventListener("submit", (e) => e.preventDefault());
  }

  function renderSearchResults(query) {
    if (!resultsContainer || typeof searchData === "undefined") return;
    resultsContainer.innerHTML = "";
    const cleanQuery = query.toLowerCase().trim();

    const matches =
      cleanQuery === ""
        ? searchData
        : searchData.filter((item) => {
            const matchesTitle = item.title.toLowerCase().includes(cleanQuery);
            const matchesKeyword =
              item.keywords &&
              item.keywords.some((k) => k.toLowerCase().includes(cleanQuery));
            return matchesTitle || matchesKeyword;
          });

    if (matches.length === 0) {
      const li = document.createElement("li");
      li.innerHTML = `<span class="body-large" style="color: var(--text-primary); display: block; padding: 1.5rem 2rem;">[ NO SYSTEM LOGS MATCHED ]</span>`;
      resultsContainer.appendChild(li);
      return;
    }

    matches.forEach((item, index) => {
      const li = document.createElement("li");
      li.style.animationDelay = `${index * 0.04}s`;
      const isToggle = item.url === "#";
      const link = document.createElement(isToggle ? "button" : "a");

      if (isToggle) {
        link.type = "button";
        link.addEventListener("click", () =>
          document.getElementById("theme-switch").click(),
        );
      } else {
        link.href = item.url;
      }

      let titleHTML = item.title;
      if (cleanQuery) {
        const escapedQuery = cleanQuery.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const regex = new RegExp(`(${escapedQuery})`, "gi");
        titleHTML = item.title.replace(
          regex,
          `<span class="accent-dot">$1</span>`,
        );
      }

      link.innerHTML = `<span>${titleHTML}</span> <span class="result-category">${item.category || ""}</span>`;
      link.addEventListener("click", () => toggleDrawer(false));
      li.appendChild(link);
      resultsContainer.appendChild(li);
    });
  }

  /* =====================================================================
     07. KINETIC PAGE-TO-PAGE HANDSHAKE
  ===================================================================== */
  document.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetUrl = link.href;
      const isExternal = link.hostname !== window.location.hostname;
      const isAnchor =
        link.hash.length > 0 && link.pathname === window.location.pathname;
      const isTargetBlank = link.target === "_blank";
      const isJustHash = link.getAttribute("href") === "#";
      const isBackToTop = link.classList.contains("back-to-top");

      const isFirstMobileTap =
        link.classList.contains("nav-icon") &&
        (window.innerWidth <= 900 ||
          "ontouchstart" in window ||
          navigator.maxTouchPoints > 0) &&
        link.closest(".nav-item") &&
        link.closest(".nav-item").querySelector(".glass-flyout") &&
        !link.closest(".nav-item").classList.contains("is-open");

      if (
        isExternal ||
        isAnchor ||
        isTargetBlank ||
        isJustHash ||
        isBackToTop ||
        isFirstMobileTap
      )
        return;

      e.preventDefault();
      document.body.classList.add("is-exiting");
      setTimeout(() => (window.location.href = targetUrl), 400);
    });
  });

  /* =====================================================================
     08. INTERACTIVE PLAYGROUND COHESION (work.html)
  ===================================================================== */
  const shakeBtn = document.getElementById("live-shake-btn");
  if (shakeBtn) {
    shakeBtn.addEventListener("click", () => {
      shakeBtn.classList.add("is-error-shake");
      shakeBtn.textContent = "[ ERROR DETECTED: INVALID OPERATION ]";
      setTimeout(() => {
        shakeBtn.classList.remove("is-error-shake");
        shakeBtn.textContent = "TRIGGER ACTIVE ERROR SHAKE \u2192";
      }, 1500);
    });
  }

  const logicBtn = document.getElementById("live-logic-btn");
  const logicForm = document.getElementById("live-logic-form");
  const logicResult = document.getElementById("live-logic-result");

  if (logicBtn && logicForm && logicResult) {
    logicBtn.addEventListener("click", () => {
      const selection = logicForm.querySelector('input[name="q1"]:checked');
      if (!selection) {
        logicResult.textContent = "[ FATAL: NO DATA INPUT DETECTED ]";
        logicResult.classList.add("accent-dot");
      } else if (selection.value === "yes") {
        logicResult.textContent =
          "[ FALSE: HTML IS A STRUCTURAL MARKUP LANGUAGE ]";
        logicResult.classList.add("accent-dot");
      } else {
        logicResult.textContent = "[ TRUE: SYSTEM ARRAY VALIDATED ]";
        logicResult.classList.remove("accent-dot");
      }
    });
  }

  /* =====================================================================
     09. OPERATOR RIG CORE TERMINAL TIME TRACKER
  ===================================================================== */
  const terminalClock = document.getElementById("terminal-clock-static");
  if (terminalClock) {
    setInterval(() => {
      const now = new Date();
      terminalClock.textContent = now.toLocaleTimeString("en-US", {
        hour12: false,
        timeZone: "America/Winnipeg",
      });
    }, 1000);
  }

  /* =====================================================================
     10. SLIDING GLASS LENS PHYSICS & DYNAMIC ROUTER
  ===================================================================== */
  const navListElement = document.getElementById("nav-pill-list");
  const lensElement = document.getElementById("nav-lens");
  const navItemsList = document.querySelectorAll(".nav-item");

  function translateLens(targetNode) {
    if (!targetNode || !lensElement || !navListElement) return;
    const iconElement = targetNode.querySelector(".nav-icon") || targetNode;
    const targetRect = iconElement.getBoundingClientRect();
    const listRect = navListElement.getBoundingClientRect();

    const translateX = targetRect.left - listRect.left;
    const translateY = targetRect.top - listRect.top;

    lensElement.style.opacity = "1";
    lensElement.style.width = `${targetRect.width}px`;
    lensElement.style.height = `${targetRect.height}px`;
    lensElement.style.transform = `translate(${translateX}px, ${translateY}px)`;
  }

  if (navListElement && lensElement) {
    const currentPath =
      window.location.pathname.split("/").pop() || "index.html";
    navItemsList.forEach((item) => {
      const link = item.querySelector(".nav-icon");
      if (!link) return;
      item.classList.remove("is-active");
      link.removeAttribute("aria-current");
      if (link.getAttribute("href") === currentPath) {
        item.classList.add("is-active");
        link.setAttribute("aria-current", "page");
      }
    });

    let activeNode =
      document.querySelector(".nav-item.is-active") || navItemsList[0];
    const navObserver = new ResizeObserver(() => translateLens(activeNode));
    navObserver.observe(navListElement);

    navItemsList.forEach((item) => {
      item.addEventListener("mouseenter", () => translateLens(item));
    });

    navListElement.addEventListener("mouseleave", () =>
      translateLens(activeNode),
    );
  }

  /* =====================================================================
     14. TACTILE MOBILE DOUBLE-TAP INTERCEPTOR
  ===================================================================== */
  navItemsList.forEach((item) => {
    const flyout = item.querySelector(".glass-flyout");

    // THE FIX: Attach the event listener to the whole 'item' (the icon AND the text)
    // instead of just the icon. This makes the hit-box massive and bulletproof.
    item.addEventListener("click", (e) => {
      if (
        window.innerWidth <= 900 ||
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0
      ) {
        if (flyout) {
          if (!item.classList.contains("is-open")) {
            e.preventDefault();
            navItemsList.forEach((otherItem) => {
              if (otherItem !== item) otherItem.classList.remove("is-open");
            });
            item.classList.add("is-open");
            translateLens(item);
          }
        } else {
          translateLens(item);
        }
      }
    });
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".nav-item")) {
      navItemsList.forEach((item) => item.classList.remove("is-open"));
    }
  });

  /* =====================================================================
     11. 3D SKEUOMORPHIC THEME TOGGLE HOOK
  ===================================================================== */
  const themeSwitchInput = document.getElementById("theme-switch");
  if (themeSwitchInput) {
    themeSwitchInput.checked = htmlRoot.classList.contains("dark-mode");
    themeSwitchInput.addEventListener("change", (e) => {
      htmlRoot.classList.toggle("dark-mode", e.target.checked);
      localStorage.setItem("system-theme", e.target.checked ? "dark" : "light");
    });
  }

  /* =====================================================================
     12. STEALTH MODE TOGGLE (Dynamic Island)
  ===================================================================== */
  const stealthToggleBtn = document.getElementById("stealth-toggle-btn");
  const mainNavPill = document.getElementById("main-nav-pill");
  const iconEyeOff = document.querySelector(".icon-eye-off");
  const iconEye = document.querySelector(".icon-eye");

  if (stealthToggleBtn && mainNavPill) {
    stealthToggleBtn.addEventListener("click", () => {
      const isStealth = mainNavPill.classList.toggle("is-stealth");
      if (isStealth) {
        if (iconEyeOff) iconEyeOff.style.display = "none";
        if (iconEye) iconEye.style.display = "block";
      } else {
        if (iconEyeOff) iconEyeOff.style.display = "block";
        if (iconEye) iconEye.style.display = "none";
        setTimeout(() => {
          let currentActive = document.querySelector(".nav-item.is-active");
          if (currentActive) translateLens(currentActive);
        }, 500);
      }
    });
  }

  console.log(
    "%c ENGINE SYSTEM ONLINE // ZERO DEFECTS DETECTED ",
    "background: #d93829; color: #ffffff; padding: 6px; font-weight: bold;",
  );
});

/* =====================================================================
   16. NATIVE FLUID GRADIENT ENGINE (ZERO DEPENDENCIES)
   ---------------------------------------------------------------------
   GRADE 9 EXPLANATION: This powers the liquid background effects.
   Instead of loading a heavy video, this uses JavaScript Math (Sine/Cosine) 
   to constantly redraw a glowing circle tracking your mouse coordinates 
   on an invisible HTML <canvas> element 60 times a second!
===================================================================== */
class LiquidGradient {
  constructor(canvasId, isAggressive = false) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext("2d");
    this.isAggressive = isAggressive;

    this.width = 0;
    this.height = 0;
    this.baseRadius = 0;
    this.time = 0;

    this.mouse = { x: 0, y: 0, tx: 0, ty: 0 };

    this.init();
    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
  }

  init() {
    this.resize();
    window.addEventListener("resize", () => this.resize());

    window.addEventListener("mousemove", (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.tx = e.clientX - rect.left;
      this.mouse.ty = e.clientY - rect.top;
    });

    this.mouse.x = this.width / 2;
    this.mouse.y = this.height / 2;
    this.mouse.tx = this.width / 2;
    this.mouse.ty = this.height / 2;
  }

  resize() {
    this.width = this.canvas.offsetWidth;
    this.height = this.canvas.offsetHeight;
    this.canvas.width = this.width * window.devicePixelRatio;
    this.canvas.height = this.height * window.devicePixelRatio;
    this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    this.baseRadius = Math.max(this.width, this.height) * 0.8;
  }

  animate() {
    this.time += 0.05;
    const ease = this.isAggressive ? 0.15 : 0.05;
    this.mouse.x += (this.mouse.tx - this.mouse.x) * ease;
    this.mouse.y += (this.mouse.ty - this.mouse.y) * ease;

    let radius = this.baseRadius;
    let offsetX = 0;
    let offsetY = 0;

    if (this.isAggressive) {
      radius += Math.sin(this.time) * 150;
      offsetX = Math.cos(this.time * 1.2) * 80;
      offsetY = Math.sin(this.time * 0.8) * 80;
    }

    if (this.isAggressive) {
      this.ctx.fillStyle = "#141414";
      this.ctx.fillRect(0, 0, this.width, this.height);
    } else {
      this.ctx.clearRect(0, 0, this.width, this.height);
    }

    const x = this.mouse.x + offsetX;
    const y = this.mouse.y + offsetY;
    const gradient = this.ctx.createRadialGradient(x, y, 0, x, y, radius);
    const accent =
      getComputedStyle(document.documentElement)
        .getPropertyValue("--accent-color")
        .trim() || "#d93829";

    gradient.addColorStop(0, accent);
    gradient.addColorStop(1, "transparent");

    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.width, this.height);

    requestAnimationFrame(this.animate);
  }
}

new LiquidGradient("fluid-hero", false);
new LiquidGradient("fluid-lab-canvas", false);
new LiquidGradient("fluid-404", true);
new LiquidGradient("fluid-fullscreen", true);

/* =====================================================================
   13. KINETIC INTRO SCREEN KILL SWITCH
===================================================================== */
const introScreen = document.getElementById("intro-screen");
if (introScreen) {
  introScreen.addEventListener("animationend", (e) => {
    if (e.animationName === "intro-snap-up") {
      introScreen.remove();
    }
  });
}

/* =====================================================================
   15. BACK TO TOP OBSERVER
===================================================================== */
const backToTopBtn = document.querySelector(".back-to-top");
if (backToTopBtn) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      backToTopBtn.classList.add("is-visible");
    } else {
      backToTopBtn.classList.remove("is-visible");
    }
  });

  backToTopBtn.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* =====================================================================
   18. SYNTHETIC AUDIO ENGINE & MUTE CONTROLS
   ---------------------------------------------------------------------
   GRADE 9 EXPLANATION: This generates the low hum and the button "clicks".
   We use the Web Audio API to create a sound synthesizer completely from 
   scratch using JavaScript—no external MP3 files needed!
===================================================================== */
const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioCtx;
let ambientGain;
let isAudioInitialized = false;

let isSystemMuted = localStorage.getItem("system-audio-muted") === "true";

const audioSwitchInputs = document.querySelectorAll(".audio-switch-input");
audioSwitchInputs.forEach((input) => {
  input.checked = isSystemMuted;

  input.addEventListener("change", (e) => {
    isSystemMuted = e.target.checked;
    localStorage.setItem("system-audio-muted", isSystemMuted);

    if (isSystemMuted) {
      if (audioCtx && audioCtx.state === "running") audioCtx.suspend();
    } else {
      if (!isAudioInitialized) {
        initAudioEngine();
      } else if (audioCtx && audioCtx.state === "suspended") {
        audioCtx.resume();
      }
      playHapticTick();
    }
  });
});

function initAudioEngine() {
  if (isAudioInitialized || isSystemMuted) return;
  audioCtx = new AudioContext();
  if (audioCtx.state === "suspended") audioCtx.resume();
  startAmbientDrone();
  isAudioInitialized = true;
}

function startAmbientDrone() {
  if (!audioCtx) return;
  const bufferSize = audioCtx.sampleRate * 2;
  const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  const data = buffer.getChannelData(0);

  let lastOut = 0;
  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;
    data[i] = (lastOut + 0.02 * white) / 1.02;
    lastOut = data[i];
    data[i] *= 3.5;
  }

  const noiseSource = audioCtx.createBufferSource();
  noiseSource.buffer = buffer;
  noiseSource.loop = true;

  const filter = audioCtx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 400;

  ambientGain = audioCtx.createGain();
  ambientGain.gain.setValueAtTime(0, audioCtx.currentTime);
  ambientGain.gain.linearRampToValueAtTime(0.05, audioCtx.currentTime + 3);

  noiseSource.connect(filter);
  filter.connect(ambientGain);
  ambientGain.connect(audioCtx.destination);
  noiseSource.start();
}

function playHapticTick() {
  if (!audioCtx || isSystemMuted) return;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.type = "sine";
  osc.frequency.setValueAtTime(250, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(40, audioCtx.currentTime + 0.05);

  gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);

  osc.connect(gain);
  gain.connect(audioCtx.destination);

  osc.start();
  osc.stop(audioCtx.currentTime + 0.05);
}

const interactiveElements = document.querySelectorAll(
  "a, button, input, .interactive-button-action",
);

interactiveElements.forEach((element) => {
  element.addEventListener("mousedown", () => {
    if (!isSystemMuted) {
      initAudioEngine();
      playHapticTick();
    }
  });

  element.addEventListener(
    "touchstart",
    () => {
      if (!isSystemMuted) {
        initAudioEngine();
        playHapticTick();
      }
    },
    { passive: true },
  );
});

document.body.addEventListener(
  "click",
  () => {
    if (!isSystemMuted) initAudioEngine();
  },
  { once: true },
);

/* =====================================================================
   19. PROGRESSIVE DISCLOSURE (CONTACT FORM OVERRIDE)
   ---------------------------------------------------------------------
   GRADE 9 EXPLANATION: Hides advanced form fields by default so users 
   don't get overwhelmed. When they click the button, this script flips 
   the 'is-revealed' class on to show the full worksheet!
===================================================================== */
const advancedTriggerBtn = document.getElementById("advanced-form-trigger");
const advancedSections = document.querySelectorAll(".advanced-form-section");

if (advancedTriggerBtn && advancedSections.length > 0) {
  let isRevealed = false;

  advancedTriggerBtn.addEventListener("click", (e) => {
    e.preventDefault();
    isRevealed = !isRevealed;

    if (isRevealed) {
      advancedSections.forEach((section) => {
        section.classList.add("is-revealed");
      });
      advancedTriggerBtn.innerHTML = "HIDE PROJECT DETAILS &uarr;";
      advancedTriggerBtn.classList.remove("badge-inverse");
      advancedTriggerBtn.classList.add("badge-accent");
      document.getElementById("client-message").removeAttribute("required");
    } else {
      advancedSections.forEach((section) => {
        section.classList.remove("is-revealed");
      });
      advancedTriggerBtn.innerHTML = "ADD PROJECT DETAILS &darr;";
      advancedTriggerBtn.classList.add("badge-inverse");
      advancedTriggerBtn.classList.remove("badge-accent");
      document
        .getElementById("client-message")
        .setAttribute("required", "true");
    }
  });
}

/* =====================================================================
   20. CONTACT FORM SUBMISSION (WEB3FORMS)
===================================================================== */
const contactForm = document.getElementById("contact-form");

if (contactForm) {
  const statusEl = document.getElementById("contact-form-status");
  const submitBtn = contactForm.querySelector("button[type='submit']");

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    submitBtn.disabled = true;
    submitBtn.textContent = "TRANSMITTING...";
    statusEl.textContent = "";

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(contactForm),
      });
      const result = await response.json();

      if (result.success) {
        statusEl.textContent =
          "TRANSMISSION RECEIVED — I'll respond within 1-2 business days.";
        contactForm.reset();
      } else {
        statusEl.textContent =
          "TRANSMISSION FAILED — please try again or email me directly.";
      }
    } catch {
      statusEl.textContent =
        "TRANSMISSION FAILED — please try again or email me directly.";
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = "TRANSMIT DIRECTIVE &rarr;";
    }
  });
}
