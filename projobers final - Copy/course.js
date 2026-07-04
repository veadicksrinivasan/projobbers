// course.js - Handling AI Course Recommendation and Quizzes

const viewSetup = document.getElementById('view-setup');
const viewRoadmap = document.getElementById('view-roadmap');
const courseSelect = document.getElementById('courseSelect');
const levelSelect = document.getElementById('levelSelect');
const btnGenerate = document.getElementById('btnGenerate');
const btnReset = document.getElementById('btnReset');
const roadmapTitle = document.getElementById('roadmapTitle');
const roadmapLevel = document.getElementById('roadmapLevel');
const roadmapContainer = document.getElementById('roadmapContainer');

// Quiz Elements
const quizOverlay = document.getElementById('quizOverlay');
const quizTitle = document.getElementById('quizTitle');
const btnCloseQuiz = document.getElementById('btnCloseQuiz');
const mcqContainer = document.getElementById('mcqContainer');
const descContainer = document.getElementById('descContainer');
const btnSubmitQuiz = document.getElementById('btnSubmitQuiz');
const quizForm = document.getElementById('quizForm');
const quizResult = document.getElementById('quizResult');
const quizScore = document.getElementById('quizScore');
const quizFeedback = document.getElementById('quizFeedback');
const resultEmoji = document.getElementById('resultEmoji');
const btnRewatch = document.getElementById('btnRewatch');
const btnContinueRoadmap = document.getElementById('btnContinueRoadmap');

let currentActiveModuleIndex = 0;
let roadmapNodesData = [];

// Expanded Mock AI Topics based on Selection and Level
const courseBlueprints = {
  "HTML & CSS Basics": {
    "Easy": [
      { title: "HTML5 Structure & Tags", video: "https://www.youtube.com/embed/qz0aGYrrlhU", channel: "Programming with Mosh" },
      { title: "CSS Fundamentals & Selectors", video: "https://www.youtube.com/embed/yfoY53QXEnI", channel: "FreeCodeCamp" },
      { title: "The Box Model & Positioning", video: "https://www.youtube.com/embed/LLZasGPe_xs", channel: "Kevin Powell" }
    ],
    "Medium": [
      { title: "Flexbox Mastery", video: "https://www.youtube.com/embed/fYq5PXgSsbE", channel: "Kevin Powell" },
      { title: "CSS Grid Layouts", video: "https://www.youtube.com/embed/705XCEruZfs", channel: "Traversy Media" },
      { title: "Responsive Media Queries", video: "https://www.youtube.com/embed/srvUrASNj0s", channel: "Web Dev Simplified" }
    ],
    "Hard": [
      { title: "CSS Variables & Themes", video: "https://www.youtube.com/embed/sSNoZ9t_7lM", channel: "Kevin Powell" },
      { title: "CSS Animations & Keyframes", video: "https://www.youtube.com/embed/zHUpx90NerM", channel: "DesignCourse" },
      { title: "Sass/SCSS Preprocessing", video: "https://www.youtube.com/embed/nu5mdN2JIwM", channel: "Traversy Media" }
    ]
  },
  "Python Development": {
    "Easy": [
      { title: "Python Variables & Types", video: "https://www.youtube.com/embed/_uQrJ0TkZlc", channel: "Programming with Mosh" },
      { title: "Control Flow & Loops", video: "https://www.youtube.com/embed/6iF8Xb7Z38E", channel: "Corey Schafer" },
      { title: "Functions & Scope", video: "https://www.youtube.com/embed/9Os0o3wzS_I", channel: "Corey Schafer" }
    ],
    "Medium": [
      { title: "Object Oriented Programming", video: "https://www.youtube.com/embed/ZDa-Z5JzLYM", channel: "Corey Schafer" },
      { title: "Error Handling & Exceptions", video: "https://www.youtube.com/embed/Hiv3gwScmS0", channel: "Sentdex" },
      { title: "Working with Virtual Envs", video: "https://www.youtube.com/embed/Kg1Yvry_Ydk", channel: "Corey Schafer" }
    ],
    "Hard": [
      { title: "Decorators & Generators", video: "https://www.youtube.com/embed/Cc6E_r_fD0E", channel: "Corey Schafer" },
      { title: "Multithreading & Asyncio", video: "https://www.youtube.com/embed/28GZp_7lM-8", channel: "ArjanCodes" },
      { title: "Metaprogramming in Python", video: "https://www.youtube.com/embed/7V6yG_G2M_8", channel: "Sentdex" }
    ]
  },
  "React Frontend": {
    "Easy": [
      { title: "React JSX & Components", video: "https://www.youtube.com/embed/w7ejDZ8SWv8", channel: "React Conf" },
      { title: "Props & State Management", video: "https://www.youtube.com/embed/LlvBzyy-558", channel: "Web Dev Simplified" },
      { title: "Conditional Rendering", video: "https://www.youtube.com/embed/7o5FPaVA9bc", channel: "Codevolution" }
    ],
    "Medium": [
      { title: "useEffect & Data Fetching", video: "https://www.youtube.com/embed/0ZJgIjIuY7U", channel: "Web Dev Simplified" },
      { title: "Custom Hooks & Logic", video: "https://www.youtube.com/embed/j_S20p0kP_Q", channel: "React Playbook" },
      { title: "React Context API", video: "https://www.youtube.com/embed/5LrDIWkK_Bc", channel: "Net Ninja" }
    ],
    "Hard": [
      { title: "Redux Toolkit State", video: "https://www.youtube.com/embed/bbkBuqC1rU4", channel: "Dave Gray" },
      { title: "Next.js 14 App Router", video: "https://www.youtube.com/embed/wm5gMKuwSYk", channel: "JavaScript Mastery" },
      { title: "Performance Optimization", video: "https://www.youtube.com/embed/Qwb-Za6GSp4", channel: "Lydia Hallie" }
    ]
  },
  "Artificial Intelligence": {
    "Easy": [
      { title: "What is AI & Machine Learning?", video: "https://www.youtube.com/embed/JMUxmLtgLYI", channel: "Simplilearn" },
      { title: "Linear Regression Intro", video: "https://www.youtube.com/embed/PaFPbb66DxQ", channel: "StatQuest" },
      { title: "Decision Trees & Forest", video: "https://www.youtube.com/embed/g9c66TUylZ4", channel: "StatQuest" }
    ],
    "Medium": [
      { title: "Neural Networks Explained", video: "https://www.youtube.com/embed/aircAruvnKk", channel: "3Blue1Brown" },
      { title: "Backpropagation Math", video: "https://www.youtube.com/embed/iynzeuCHiCI", channel: "3Blue1Brown" },
      { title: "CNNs for Image Recognition", video: "https://www.youtube.com/embed/m8pOnJxOcqY", channel: "DeepLearning.AI" }
    ],
    "Hard": [
      { title: "Transformer Architecture", video: "https://www.youtube.com/embed/zxQyTK8quyY", channel: "DeepLearning.AI" },
      { title: "Fine-tuning LLMs", video: "https://www.youtube.com/embed/eC6Hd1hFv_c", channel: "Hugging Face" },
      { title: "Reinforcement Learning", video: "https://www.youtube.com/embed/2pWv7GOvuf0", channel: "Lex Fridman" }
    ]
  },
  "Data Science & ML": {
    "Easy": [
      { title: "Pandas for Data Analysis", video: "https://www.youtube.com/embed/vmEHCJofslg", channel: "Keith Galli" },
      { title: "Data Visualization (Seaborn)", video: "https://www.youtube.com/embed/6GUu6qqpM_c", channel: "Derek Banas" },
      { title: "Numpy Foundations", video: "https://www.youtube.com/embed/rkPJC8LSTN8", channel: "Corey Schafer" }
    ],
    "Medium": [
      { title: "Feature Engineering Techniques", video: "https://www.youtube.com/embed/v7vU-6R9n_8", channel: "Krish Naik" },
      { title: "Model Tuning & Hyperparams", video: "https://www.youtube.com/embed/HdlDYng8g9s", channel: "Sentdex" },
      { title: "K-Means Clustering", video: "https://www.youtube.com/embed/4b5d3muPQmA", channel: "StatQuest" }
    ],
    "Hard": [
      { title: "Time Series Forecasting", video: "https://www.youtube.com/embed/vV12dGe_Fho", channel: "Krish Naik" },
      { title: "Deep Learning with PyTorch", video: "https://www.youtube.com/embed/v5WCX39H67A", channel: "FreeCodeCamp" },
      { title: "MLOps & Model Deployment", video: "https://www.youtube.com/embed/W9l5Xf_D_rM", channel: "Dimitri Mistriotis" }
    ]
  },
  "Cybersecurity": {
    "Easy": [
      { title: "Networking Fundamentals", video: "https://www.youtube.com/embed/S7MNX_UD7vY", channel: "NetworkChuck" },
      { title: "Ethical Hacking Basics", video: "https://www.youtube.com/embed/dz7Ntp7KQ8c", channel: "Edureka" },
      { title: "Web Vulnerabilities (XSS/SQLi)", video: "https://www.youtube.com/embed/2m90-HlM8MA", channel: "PwnFunction" }
    ],
    "Medium": [
      { title: "Nmap & Network Scanning", video: "https://www.youtube.com/embed/4tPIyK2pToY", channel: "The Cyber Mentor" },
      { title: "Metasploit Framework", video: "https://www.youtube.com/embed/8lV_j2i9yP8", channel: "HackerSploit" },
      { title: "Active Directory Hacking", video: "https://www.youtube.com/embed/9Bv_O98p9z4", channel: "The Cyber Mentor" }
    ],
    "Hard": [
      { title: "Reverse Engineering Basics", video: "https://www.youtube.com/embed/39fI2Pz95-0", channel: "LiveOverflow" },
      { title: "Binary Exploitation & Buffer Flow", video: "https://www.youtube.com/embed/hOAmAArhVvY", channel: "John Hammond" },
      { title: "Cloud Security Architecture", video: "https://www.youtube.com/embed/6iW76o_G7xI", channel: "Cloud Security Alliance" }
    ]
  },
  "Full-Stack Web Development": {
    "Easy": [
      { title: "HTML & CSS Foundation", video: "https://www.youtube.com/embed/mU6anWqZJcc", channel: "Traversy Media" },
      { title: "JavaScript Survival Guide", video: "https://www.youtube.com/embed/W6NZfCO5SIk", channel: "Programming with Mosh" }
    ],
    "Medium": [
      { title: "React State & Props", video: "https://www.youtube.com/embed/w7ejDZ8SWv8", channel: "Academind" },
      { title: "Node.js API Development", video: "https://www.youtube.com/embed/Oe421EPjeBE", channel: "The Net Ninja" }
    ],
    "Hard": [
      { title: "Microservices Architecture", video: "https://www.youtube.com/embed/1vL26H-R0yA", channel: "Hussein Nasser" },
      { title: "DevOps & Deployment", video: "https://www.youtube.com/embed/bBTPsz9B500", channel: "TechWorld with Nana" }
    ]
  }
};

btnGenerate.addEventListener('click', () => {
  const course = courseSelect.value;
  const level = levelSelect.value; // Maps from Beginner/Intermediate/Advanced
  
  viewSetup.classList.add('coding-view-hidden');
  viewRoadmap.classList.remove('coding-view-hidden');
  
  roadmapTitle.innerText = course;
  roadmapLevel.innerText = level;
  
  // Choose the appropriate roadmap based on Role AND Level
  const selectedRoleData = courseBlueprints[course] || courseBlueprints["Artificial Intelligence"];
  roadmapNodesData = selectedRoleData[level] || selectedRoleData["Beginner"];
  
  currentActiveModuleIndex = 0;
  renderRoadmap();
});

btnReset.addEventListener('click', () => {
  viewRoadmap.classList.add('coding-view-hidden');
  viewSetup.classList.remove('coding-view-hidden');
});

function renderRoadmap() {
  roadmapContainer.innerHTML = '';
  
  roadmapNodesData.forEach((node, index) => {
    let statusClass = "locked";
    let icon = "🔒";
    
    if (index < currentActiveModuleIndex) {
      statusClass = "completed";
      icon = "✅";
    } else if (index === currentActiveModuleIndex) {
      statusClass = "active";
      icon = "▶️";
    }
    
    // Video block (only visible if active or completed)
    let videoHtml = '';
    if (statusClass !== 'locked') {
      videoHtml = `
        <div style="margin-bottom: 12px; display: inline-flex; align-items: center; gap: 8px; background: rgba(255, 0, 0, 0.1); border: 1px solid rgba(255, 0, 0, 0.2); padding: 4px 12px; border-radius: 20px;">
          <span style="color: #ff0000; font-size: 0.9rem;">📺</span>
          <span style="font-size: 0.8rem; font-weight: 600; color: var(--text-secondary);">Recommended Channel: <span class="gradient-text-warm">${node.channel}</span></span>
        </div>
        <div class="video-placeholder" style="padding:0; background:transparent; border:none;">
          <iframe width="100%" height="100%" src="${node.video}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="border-radius:12px; box-shadow:0 10px 30px rgba(0,0,0,0.5);"></iframe>
        </div>
        <div style="margin-top:16px; display:flex; gap:12px; align-items:center;">
           <button class="btn btn-primary btn-sm btn-take-quiz" data-idx="${index}">🧠 Take Module Quiz to Unlock Next</button>
           <span style="font-size:0.85rem; color:var(--text-muted);">Watch carefully to pass the AI-generated quiz!</span>
        </div>
      `;
    }

    const html = `
      <div class="path-node ${statusClass}" id="node-${index}">
        <div class="node-icon-wrap">${icon}</div>
        <div class="node-content">
          <h3 style="font-size:1.3rem; margin-bottom:4px;">Module ${index + 1}: ${node.title}</h3>
          <p style="color:var(--text-secondary); font-size:0.9rem; margin-bottom:12px;">Curated learning resources and interactive video.</p>
          ${videoHtml}
        </div>
      </div>
    `;
    roadmapContainer.insertAdjacentHTML('beforeend', html);
  });
  
  attachQuizListeners();
}

function attachQuizListeners() {
  const takeQuizBtns = document.querySelectorAll('.btn-take-quiz');
  takeQuizBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = parseInt(e.target.getAttribute('data-idx'));
      if (idx > currentActiveModuleIndex) return; // shouldn't happen
      openQuiz(idx);
    });
  });
}

// === QUIZ LOGIC ===
let currentQuizIdx = 0;

function openQuiz(idx) {
  currentQuizIdx = idx;
  const topicTitle = roadmapNodesData[idx].title;
  quizTitle.innerText = topicTitle;
  
  // Reset Form UI
  quizForm.style.display = 'block';
  quizResult.classList.remove('active');
  btnSubmitQuiz.innerText = "Submit for AI Evaluation";
  
  generateMockQuestions(topicTitle);
  
  quizOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

btnCloseQuiz.addEventListener('click', () => {
  quizOverlay.classList.remove('active');
  document.body.style.overflow = 'auto';
});

function generateMockQuestions(topic) {
  mcqContainer.innerHTML = '';
  descContainer.innerHTML = '';
  
  const role = courseSelect.value;
  
  // Specific Technical Terms for Roles
  const techTerms = {
    "HTML & CSS Basics": ["DOM Tree", "Semantic HTML", "Flexbox Axis", "Box Sizing", "Z-Index"],
    "Python Development": ["List Comprehension", "PEP 8", "Duck Typing", "Context Managers", "Global Interpreter Lock"],
    "React Frontend": ["Virtual DOM", "Reconciliation", "Hooks Rules", "State Lifting", "Server Side Rendering"],
    "Artificial Intelligence": ["Backpropagation", "Heuristics", "Supervised Learning", "Gradient Descent", "Weights & Biases"],
    "Data Science & ML": ["DataFrame", "Overfitting", "Normalization", "Correlations", "Imputation"],
    "Cybersecurity": ["XSS Entry Points", "Salting Passwords", "Handshake protocol", "Zero Trust", "Encryption keys"]
  };
  
  const currentTerms = techTerms[role] || ["Structural Protocols", "Efficiency", "Mapping", "Latency", "Compliance"];
  
  // Generate 5 MCQs
  for(let i=1; i<=5; i++) {
    const term = currentTerms[i-1] || currentTerms[0];
    mcqContainer.innerHTML += `
      <div class="quiz-question">
        <h4>${i}. How does <span style="color:var(--accent-cyan)">${term}</span> impact the implementation of ${topic}?</h4>
        <label class="mcq-option"><input type="radio" name="q${i}" value="A"> A. It significantly optimizes the ${role.split(' ')[0]} logic.</label>
        <label class="mcq-option"><input type="radio" name="q${i}" value="B"> B. It increases complexity but ensures stability.</label>
        <label class="mcq-option"><input type="radio" name="q${i}" value="C"> C. It is a deprecated standard in modern ${role}.</label>
        <label class="mcq-option"><input type="radio" name="q${i}" value="D"> D. Both A and B are correct for ${levelSelect.value} level.</label>
      </div>
    `;
  }
  
  // Generate 5 Descriptive
  for(let i=6; i<=10; i++) {
    const term = currentTerms[10-i] || currentTerms[1];
    descContainer.innerHTML += `
      <div class="quiz-question">
        <h4>${i}. Describe a real-world scenario where you would prioritize <span style="color:var(--accent-purple)">${term}</span> in your ${role} workflow?</h4>
        <textarea class="desc-textarea" placeholder="Type your answer here... AI will evaluate based on technical accuracy."></textarea>
      </div>
    `;
  }
}

btnSubmitQuiz.addEventListener('click', () => {
  btnSubmitQuiz.innerText = "Evaluating...";
  btnSubmitQuiz.disabled = true;
  
  // Simulate AI evaluation processing time
  setTimeout(() => {
    btnSubmitQuiz.disabled = false;
    quizForm.style.display = 'none';
    quizResult.classList.add('active');
    
    // Random AI Score heavily biased towards passing, but sometimes failing
    const score = Math.floor(Math.random() * 4) + 6; // Score between 6 and 9
    // For demo, if they fail (let's explicitly test failure logic)
    // score = 4;
    
    quizScore.innerText = score;
    
    if (score >= 5) {
      resultEmoji.innerText = "🎉";
      quizFeedback.innerHTML = `<strong>Great understanding!</strong> Your descriptive answers correctly identified the key mechanisms. AI Assessor noted: <em>"You have a solid grasp on the core concepts, though Q7 lacked specific examples."</em> You have unlocked the next module!`;
      btnRewatch.style.display = 'none';
      btnContinueRoadmap.style.display = 'inline-flex';
      btnContinueRoadmap.innerText = "Unlock Next Module →";
    } else {
      resultEmoji.innerText = "📚";
      quizFeedback.innerHTML = `<strong>Keep trying!</strong> Your score is below 5. The AI Assessor noticed you struggled with describing the fundamental algorithms in Q8 and Q9. We highly recommend reviewing the video content before trying a uniquely generated quiz again.`;
      btnRewatch.style.display = 'inline-flex';
      btnContinueRoadmap.style.display = 'none';
    }
    
  }, 2000);
});

btnContinueRoadmap.addEventListener('click', () => {
  quizOverlay.classList.remove('active');
  document.body.style.overflow = 'auto';
  
  // Unlock next module if it was the current active one
  if (currentQuizIdx === currentActiveModuleIndex && currentActiveModuleIndex < roadmapNodesData.length - 1) {
    currentActiveModuleIndex++;
    renderRoadmap();
  }
});

btnRewatch.addEventListener('click', () => {
  quizOverlay.classList.remove('active');
  document.body.style.overflow = 'auto';
});
