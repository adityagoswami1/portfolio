/* ===================================================
   ADITYA GOSWAMI — PORTFOLIO
   main.js — Interactions & Animations
   =================================================== */

'use strict';

/* ── Typewriter Animation ── */
const roles = [
  'ML Engineer 🤖',
  'Cybersecurity Enthusiast 🔒',
  'CSE Student 🎓',
  'Graph Neural Network Dev 🕸️',
  'Problem Solver ⚡'
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeDelay = 100;

function typeWriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;

  const currentRole = roles[roleIndex];

  if (isDeleting) {
    el.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
    typeDelay = 50;
  } else {
    el.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
    typeDelay = 110;
  }

  if (!isDeleting && charIndex === currentRole.length) {
    // Pause at full word
    typeDelay = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    typeDelay = 400;
  }

  setTimeout(typeWriter, typeDelay);
}

/* ── Scroll Reveal (Intersection Observer) ── */
function initReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Don't unobserve — let it stay visible
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
}

/* ── Active Navbar Link ── */
function initNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  function setActive() {
    const scrollY = window.scrollY + 120;
    let current = '';

    sections.forEach((sec) => {
      if (scrollY >= sec.offsetTop) current = sec.getAttribute('id');
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', setActive, { passive: true });
  setActive();
}

/* ── Back-to-top Button ── */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });
}

/* ── Hamburger Mobile Menu ── */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');

    // Animate hamburger icon
    const spans = hamburger.querySelectorAll('span');
    if (navLinks.classList.contains('open')) {
      spans[0].style.transform = 'translateY(6.5px) rotate(45deg)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'translateY(-6.5px) rotate(-45deg)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });

  // Close on nav link click
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      const spans = hamburger.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    });
  });
}

/* ── Smooth Scroll for all internal links ── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navH = document.getElementById('navbar')?.offsetHeight || 80;
        const pos = target.getBoundingClientRect().top + window.scrollY - navH - 20;
        window.scrollTo({ top: pos, behavior: 'smooth' });
      }
    });
  });
}

/* ── Contact Form Handler ── */
function handleSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  // Compose mailto link
  const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
  window.open(`mailto:iamadityagoswami@gmail.com?subject=${subject}&body=${body}`);
}

/* ── Skill tag hover stagger ── */
function initSkillStagger() {
  document.querySelectorAll('.skill-tags').forEach((container) => {
    const tags = container.querySelectorAll('.skill-tag');
    tags.forEach((tag, i) => {
      tag.style.transitionDelay = `${i * 30}ms`;
    });
  });
}

/* ── Animated stat bars on scroll ── */
function initStatBars() {
  const bars = document.querySelectorAll('.hero-stat-bar-fill');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = entry.target.style.width;
        entry.target.style.width = '0%';
        setTimeout(() => { entry.target.style.width = target; }, 100);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  bars.forEach((bar) => obs.observe(bar));
}

/* ── Cursor sparkle on click ── */
function initClickSpark() {
  document.addEventListener('click', (e) => {
    const spark = document.createElement('div');
    spark.style.cssText = `
      position: fixed;
      left: ${e.clientX - 6}px;
      top: ${e.clientY - 6}px;
      width: 12px; height: 12px;
      border-radius: 50%;
      background: var(--blue-mid);
      pointer-events: none;
      z-index: 9999;
      animation: spark 0.5s ease forwards;
    `;
    document.body.appendChild(spark);
    setTimeout(() => spark.remove(), 600);
  });

  // Inject keyframes
  const style = document.createElement('style');
  style.textContent = `
    @keyframes spark {
      0%   { transform: scale(1); opacity: 1; }
      100% { transform: scale(3); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
}

/* ── Stagger reveal for grid items ── */
function initGridStagger() {
  document.querySelectorAll('.projects-grid, .achievements-grid, .skills-grid, .about-stats-grid').forEach((grid) => {
    const children = grid.querySelectorAll('.reveal');
    children.forEach((child, i) => {
      child.style.transitionDelay = `${i * 80}ms`;
    });
  });
}

/* ── Navbar scroll shadow ── */
function initNavScroll() {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      nav.style.boxShadow = '6px 6px 0 #1A1A1A';
    } else {
      nav.style.boxShadow = '4px 4px 0 #1A1A1A';
    }
  }, { passive: true });
}

/* ── Init all ── */
document.addEventListener('DOMContentLoaded', () => {
  typeWriter();
  initReveal();
  initNavHighlight();
  initBackToTop();
  initMobileMenu();
  initSmoothScroll();
  initSkillStagger();
  initStatBars();
  initClickSpark();
  initGridStagger();
  initNavScroll();
  initChatbot();
});

/* ═══════════════════════════════════════════════════
   CHATBOT — Aditya's AI Assistant
   ═══════════════════════════════════════════════════ */

const CHATBOT_QA = [
  {
    keywords: ['who', 'about', 'yourself', 'introduction', 'introduce', 'hi', 'hello', 'hey'],
    answer: "Hi there! 👋 I'm Aditya Goswami, a final-year B.Tech CSE student at Rajkiya Engineering College, Kannauj. I'm passionate about Machine Learning, Cybersecurity, and building cool things with code!"
  },
  {
    keywords: ['project', 'built', 'made', 'created', 'work'],
    answer: "I've built three main projects:\n\n🚗 <b>Traffic Accident Alert System</b> — VANET simulation using Python & SUMO\n\n🕸️ <b>Suspicious Object Classification (GNN)</b> — Graph Neural Networks for image classification\n\n💬 <b>Sentiment Analysis (VADER)</b> — NLP tool for social media sentiment"
  },
  {
    keywords: ['skill', 'technology', 'tech', 'language', 'know', 'experience with', 'expertise'],
    answer: "My core skills include:\n\n💻 <b>Languages:</b> Python, Java, C, C++, HTML, CSS\n🤖 <b>ML/AI:</b> TensorFlow, OpenCV, NumPy, Pandas, Scikit-learn, YOLOv8\n🔒 <b>Cybersecurity:</b> WINAPI hooking, DLL injection, SOC operations\n🗄️ <b>Databases:</b> MySQL, SQL"
  },
  {
    keywords: ['intern', 'internship', 'cdot', 'c-dot', 'company', 'job', 'work experience', 'oasis'],
    answer: "I've had two internships!\n\n🏛️ <b>C-DOT, New Delhi</b> (Jul–Aug 2025) — Cybersecurity Intern. Built a \"Cross Platform Anti Screen Capture Utility for Data Leak Prevention\" using WINAPI hooking and DLL injection.\n\n🌐 <b>Oasis Infobyte</b> (May–Jun 2025) — Data Science Intern. Shipped Sales Prediction, IRIS Classification, and Unemployment Analysis projects. Earned the ⭐ Star Performer tag!"
  },
  {
    keywords: ['education', 'college', 'study', 'university', 'degree', 'btech', 'b.tech'],
    answer: "🎓 I'm pursuing <b>B.Tech in CSE</b> from Rajkiya Engineering College, Kannauj (2022–2026) with a 7.56 SGPA.\n\nMy XII was from GD Goenka Public School, Agra with <b>93%</b>, and X with <b>96%</b>!"
  },
  {
    keywords: ['certificate', 'certification', 'nptel', 'infosys', 'course', 'online', 'ibm'],
    answer: "I've completed 12 certifications! 📜\n\n<b>NPTEL:</b> Data Analytics with Python (🥈Silver), Design & Analysis of Algorithms, Intro to Programming in C, Psychology of Learning (🥈Silver), Emotional Intelligence (🥈Silver), Cloud Computing\n\n<b>Infosys Springboard:</b> Computer Vision 101, Deep Learning, Intro to AI\n\n<b>Others:</b> Build Ludo Game, Cybersecurity Essentials (IBM), Data Science Star Performer (Oasis)"
  },
  {
    keywords: ['achievement', 'award', 'win', 'won', 'competition', 'debate'],
    answer: "I've won several competitions! 🏆\n\n🥇 <b>Winner</b> – Debate Competition (IEI Event)\n🥈 <b>2nd Position</b> – Debate Competition (IEEE Event)\n🏆 <b>Runner-up</b> – Group Discussion (College Event)\n\nDebating has sharpened my critical thinking and communication skills!"
  },
  {
    keywords: ['contact', 'reach', 'email', 'phone', 'linkedin', 'github', 'connect'],
    answer: "You can reach me at:\n\n✉️ <b>Email:</b> iamadityagoswami@gmail.com\n📞 <b>Phone:</b> +91 6396765210\n💼 <b>LinkedIn:</b> linkedin.com/in/aditya-goswami\n🐙 <b>GitHub:</b> github.com/adityagoswami1\n\nI'm always open to new opportunities! 🚀"
  },
  {
    keywords: ['location', 'where', 'city', 'from', 'live'],
    answer: "I'm currently based in <b>Kannauj, Uttar Pradesh, India</b> 📍 while pursuing my B.Tech. Originally from Agra, UP!"
  },
  {
    keywords: ['ml', 'machine learning', 'ai', 'artificial intelligence', 'deep learning', 'neural'],
    answer: "Machine Learning is one of my core passions! 🤖\n\nI've worked with GNNs (Graph Neural Networks), TensorFlow, and built multimodal classification systems. I also certified in Deep Learning from Infosys Springboard and Data Analytics in Python from NPTEL!"
  },
  {
    keywords: ['cybersecurity', 'security', 'hacking', 'ctf', 'vulnerability'],
    answer: "Cybersecurity is a major interest of mine! 🔒\n\nAt C-DOT, I worked in their ESOC (Enterprise Security Operation Center), building tools to prevent data exfiltration using low-level WINAPI hooking. I also have an NPTEL background in related topics!"
  },
  {
    keywords: ['gpa', 'sgpa', 'grade', 'marks', 'score', 'cgpa'],
    answer: "My current SGPA is <b>7.56</b> at REC Kannauj 📚\n\nPreviously scored <b>93%</b> in Class XII and <b>96%</b> in Class X at GD Goenka Public School, Agra!"
  },
  {
    keywords: ['resume', 'cv', 'download'],
    answer: "You can download my resume directly from the hero section of this page — just click the <b>\"Download Resume\"</b> button! 📄"
  },
  {
    keywords: ['hobby', 'hobbies', 'interest', 'free time', 'outside'],
    answer: "Outside of coding, I love 🗣️ <b>competitive debating</b> — I've won at IEI and placed 2nd at IEEE events.\n\nI also enjoy reading about AI research, exploring new technologies, and problem-solving challenges!"
  }
];

const FALLBACK_RESPONSES = [
  "Hmm, I'm not sure about that! 🤔 Try asking about my projects, skills, education, internship, or how to contact me!",
  "Great question! But I don't have a specific answer for that. 😅 Try: 'What projects have you built?' or 'What are your skills?'",
  "I didn't quite catch that! 👋 Try asking about my experience, certifications, or contact info!"
];

const QUICK_QUESTIONS = [
  "Who are you?",
  "What projects did you build?",
  "What are your skills?",
  "Tell me about your internship",
  "How can I contact you?",
  "What certifications do you have?"
];

let chatbotOpen = false;
let fallbackIdx = 0;

function initChatbot() {
  const pills = document.getElementById('chatbot-pills');
  if (!pills) return;

  QUICK_QUESTIONS.forEach(q => {
    const btn = document.createElement('button');
    btn.className = 'chat-pill';
    btn.textContent = q;
    btn.addEventListener('click', () => {
      addUserMessage(q);
      getBotReply(q);
    });
    pills.appendChild(btn);
  });

  // Show welcome message after a short delay when opened
}

function toggleChatbot() {
  const win = document.getElementById('chatbot-window');
  if (!win) return;

  chatbotOpen = !chatbotOpen;
  win.classList.toggle('chatbot-hidden', !chatbotOpen);
  win.classList.toggle('chatbot-visible', chatbotOpen);

  if (chatbotOpen) {
    const msgs = document.getElementById('chatbot-messages');
    if (msgs && msgs.children.length === 0) {
      setTimeout(() => {
        addBotMessage("Hey! 👋 I'm Aditya's virtual assistant. Ask me anything about Aditya — his projects, skills, experience, or how to get in touch!");
      }, 300);
    }
    setTimeout(() => document.getElementById('chatbot-input')?.focus(), 400);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('chatbot-toggle');
  if (btn) btn.addEventListener('click', toggleChatbot);
});

function addUserMessage(text) {
  const msgs = document.getElementById('chatbot-messages');
  if (!msgs) return;

  const div = document.createElement('div');
  div.className = 'chat-msg user';
  div.innerHTML = `<div class="chat-bubble">${escapeHTML(text)}</div>`;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

function addBotMessage(html) {
  const msgs = document.getElementById('chatbot-messages');
  if (!msgs) return;

  const div = document.createElement('div');
  div.className = 'chat-msg bot';
  div.innerHTML = `
    <div class="chat-msg-avatar">
      <img src="1743087105578.jpg" alt="Aditya" />
    </div>
    <div class="chat-bubble">${html}</div>
  `;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

function showTyping() {
  const msgs = document.getElementById('chatbot-messages');
  if (!msgs) return null;

  const div = document.createElement('div');
  div.className = 'chat-msg bot chat-typing';
  div.id = 'typing-indicator';
  div.innerHTML = `
    <div class="chat-msg-avatar">
      <img src="1743087105578.jpg" alt="Aditya" />
    </div>
    <div class="chat-bubble">
      <span class="typing-dot"></span>
      <span class="typing-dot"></span>
      <span class="typing-dot"></span>
    </div>
  `;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
  return div;
}

function getBotReply(userText) {
  const lower = userText.toLowerCase();

  // Find matching Q&A
  let matched = null;
  let bestScore = 0;

  for (const qa of CHATBOT_QA) {
    const score = qa.keywords.filter(k => lower.includes(k)).length;
    if (score > bestScore) {
      bestScore = score;
      matched = qa;
    }
  }

  const typing = showTyping();
  const delay = 800 + Math.random() * 600;

  setTimeout(() => {
    typing && typing.remove();
    if (matched && bestScore > 0) {
      // Convert newlines to <br>
      const html = matched.answer.replace(/\n/g, '<br>');
      addBotMessage(html);
    } else {
      addBotMessage(FALLBACK_RESPONSES[fallbackIdx % FALLBACK_RESPONSES.length]);
      fallbackIdx++;
    }
  }, delay);
}

function sendChatMessage() {
  const input = document.getElementById('chatbot-input');
  if (!input) return;

  const text = input.value.trim();
  if (!text) return;

  input.value = '';
  addUserMessage(text);
  getBotReply(text);
}

function escapeHTML(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

