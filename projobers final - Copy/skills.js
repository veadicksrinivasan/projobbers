/* ================================================
   skills.js — Skill Intelligence System Engine
   ================================================ */

// ─── JOB PROFILE DATA ───────────────────────────
const JOB_PROFILES = {
  frontend: {
    label: "Frontend Developer",
    required: ["HTML", "CSS", "JavaScript", "React", "TypeScript", "Git", "REST APIs", "Responsive Design", "Webpack", "Testing"],
    nice: ["Vue", "Next.js", "GraphQL", "Accessibility", "Performance Optimization"]
  },
  backend: {
    label: "Backend Developer",
    required: ["Node.js", "Python", "SQL", "REST APIs", "Git", "Docker", "Authentication", "Databases", "System Design", "Linux"],
    nice: ["Redis", "Kafka", "Microservices", "AWS", "GraphQL"]
  },
  fullstack: {
    label: "Full-Stack Developer",
    required: ["HTML", "CSS", "JavaScript", "React", "Node.js", "SQL", "REST APIs", "Git", "Docker", "TypeScript"],
    nice: ["System Design", "Redis", "GraphQL", "Testing", "AWS"]
  },
  datascience: {
    label: "Data Scientist",
    required: ["Python", "SQL", "Statistics", "Machine Learning", "NumPy", "Pandas", "Data Visualization", "Scikit-learn", "Git", "Jupyter"],
    nice: ["Deep Learning", "TensorFlow", "Spark", "A/B Testing", "NLP"]
  },
  devops: {
    label: "DevOps Engineer",
    required: ["Docker", "Kubernetes", "Linux", "CI/CD", "AWS", "Git", "Bash", "Monitoring", "Networking", "Terraform"],
    nice: ["Ansible", "Prometheus", "Grafana", "Azure", "Security"]
  },
  mobile: {
    label: "Mobile Developer",
    required: ["React Native", "JavaScript", "TypeScript", "iOS", "Android", "REST APIs", "Git", "State Management", "UI/UX", "Testing"],
    nice: ["Firebase", "Push Notifications", "App Store Optimization", "Swift", "Kotlin"]
  },
  ml: {
    label: "ML Engineer",
    required: ["Python", "Machine Learning", "Deep Learning", "TensorFlow", "PyTorch", "SQL", "Docker", "Git", "Statistics", "System Design"],
    nice: ["Kubernetes", "MLflow", "Spark", "NLP", "Computer Vision"]
  },
  qa: {
    label: "QA Engineer",
    required: ["Testing", "Selenium", "JavaScript", "SQL", "Git", "CI/CD", "Postman", "Agile", "Bug Tracking", "REST APIs"],
    nice: ["Cypress", "Performance Testing", "Security Testing", "Mobile Testing", "Python"]
  }
};

// ─── QUIZ BANK ───────────────────────────────────
const SKILL_QUIZZES = {
  "React": [
    { q: "What hook is used to manage side effects in React?", opts: ["useState", "useEffect", "useContext", "useReducer"], ans: 1 },
    { q: "What does the virtual DOM do in React?", opts: ["Renders HTML directly", "Minimizes real DOM updates for performance", "Stores component state", "Handles routing"], ans: 1 },
    { q: "Which of these is the correct way to pass data from parent to child?", opts: ["State lifting", "Props", "Context API only", "Redux"], ans: 1 },
    { q: "What does React.memo do?", opts: ["Memoizes state", "Prevents re-renders of a component when props haven't changed", "Caches API calls", "Stores a value across renders"], ans: 1 },
    { q: "What is the purpose of 'key' prop in lists?", opts: ["Styling list items", "Tracking DOM node identity for efficient diffing", "Required HTML attribute", "Setting component priority"], ans: 1 }
  ],
  "JavaScript": [
    { q: "What does '===' check in JavaScript?", opts: ["Value only", "Type only", "Value and type", "Neither"], ans: 2 },
    { q: "What is a closure?", opts: ["A function inside a class", "A function that remembers its lexical scope", "An arrow function", "A callback function"], ans: 1 },
    { q: "What does 'async/await' handle?", opts: ["Synchronous tasks", "Error handling only", "Asynchronous Promises", "DOM manipulation"], ans: 2 },
    { q: "Which method creates a new array from an existing one without modifying it?", opts: ["splice()", "forEach()", "map()", "push()"], ans: 2 },
    { q: "What is event bubbling?", opts: ["Events fire from parent to child", "Events fire from child up to parent", "Events that repeat infinitely", "A type of event loop"], ans: 1 }
  ],
  "Python": [
    { q: "What is a Python list comprehension?", opts: ["A way to import modules", "A concise way to create lists using a for loop in one line", "A function that returns multiple values", "A type of dictionary"], ans: 1 },
    { q: "What does 'self' refer to in a Python class?", opts: ["The class itself", "The parent class", "The instance of the class", "A built-in keyword"], ans: 2 },
    { q: "Which is the correct way to open a file safely in Python?", opts: ["open('f.txt')", "with open('f.txt') as f:", "file.open('f.txt')", "read('f.txt')"], ans: 1 },
    { q: "What is the output of: print(type([]))?", opts: ["<class 'tuple'>", "<class 'dict'>", "<class 'list'>", "<class 'array'>"], ans: 2 },
    { q: "What does the 'yield' keyword do?", opts: ["Terminates a function", "Returns a value and pauses, making the function a generator", "Imports a module", "Raises an exception"], ans: 1 }
  ],
  "SQL": [
    { q: "What SQL keyword is used to filter grouped results?", opts: ["WHERE", "FILTER", "HAVING", "GROUP BY"], ans: 2 },
    { q: "What is a PRIMARY KEY?", opts: ["A key used to encrypt data", "A column that uniquely identifies each row", "A foreign reference to another table", "An indexed column"], ans: 1 },
    { q: "What does a LEFT JOIN return?", opts: ["Only matching rows from both tables", "All rows from the left table and matching from the right", "All rows from the right table", "The union of both tables"], ans: 1 },
    { q: "What does SELECT DISTINCT do?", opts: ["Selects random rows", "Removes duplicate rows from results", "Sorts rows alphabetically", "Selects null values"], ans: 1 },
    { q: "Which statement is used to add a new row?", opts: ["UPDATE", "ADD", "INSERT INTO", "CREATE ROW"], ans: 2 }
  ],
  "Node.js": [
    { q: "What is the event loop in Node.js?", opts: ["A UI rendering loop", "A mechanism that handles asynchronous callbacks", "A database query loop", "A test runner"], ans: 1 },
    { q: "What does 'require()' do?", opts: ["Runs a JavaScript file", "Imports a module", "Creates a new process", "Exports a module"], ans: 1 },
    { q: "Which Node.js module is used to create an HTTP server?", opts: ["fs", "path", "http", "net"], ans: 2 },
    { q: "What is npm?", opts: ["Node Performance Monitor", "A JavaScript runtime", "Node Package Manager", "A testing library"], ans: 2 },
    { q: "What is middleware in Express.js?", opts: ["A database connector", "A function that runs between request and response", "An HTML template engine", "A file system handler"], ans: 1 }
  ],
  "Docker": [
    { q: "What is a Docker image?", opts: ["A running container", "A read-only template for creating containers", "A virtual machine", "A network configuration"], ans: 1 },
    { q: "What command builds a Docker image from a Dockerfile?", opts: ["docker run", "docker start", "docker build", "docker create"], ans: 2 },
    { q: "What is docker-compose used for?", opts: ["Packaging images", "Managing multi-container applications", "Creating Docker networks only", "Monitoring containers"], ans: 1 },
    { q: "What does EXPOSE in a Dockerfile do?", opts: ["Publicly opens a port to the internet", "Documents which port the container listens on", "Blocks external traffic", "Maps ports to the host"], ans: 1 },
    { q: "What is the difference between CMD and ENTRYPOINT?", opts: ["They are identical", "CMD sets defaults; ENTRYPOINT defines the main command", "ENTRYPOINT is deprecated", "CMD sets environment variables"], ans: 1 }
  ],
  "TypeScript": [
    { q: "TypeScript is a superset of which language?", opts: ["Java", "Python", "JavaScript", "C#"], ans: 2 },
    { q: "What does 'interface' define in TypeScript?", opts: ["A class implementation", "The shape/structure of an object", "A runtime type check", "A generic function"], ans: 1 },
    { q: "What does the '?' operator mean in a TypeScript type?", opts: ["Nullable type", "Optional property", "Type assertion", "Default value"], ans: 1 },
    { q: "What is 'any' type in TypeScript?", opts: ["A strict type", "A type that disables type checking", "An array type", "A number or string"], ans: 1 },
    { q: "What does 'tsc' command do?", opts: ["Tests TypeScript files", "Compiles TypeScript to JavaScript", "Runs a TypeScript server", "Lints TypeScript code"], ans: 1 }
  ],
  "Machine Learning": [
    { q: "What is overfitting in a machine learning model?", opts: ["Model performs well on training data but poorly on new data", "Model performs poorly on all data", "Model is too simple", "Model has too few parameters"], ans: 0 },
    { q: "What does 'training data' mean?", opts: ["Data used to evaluate a model", "Data used to teach the model", "Data that is unlabeled", "Data used for deployment"], ans: 1 },
    { q: "Which algorithm is best for classification problems?", opts: ["Linear Regression", "Logistic Regression", "K-Means Clustering", "PCA"], ans: 1 },
    { q: "What is a confusion matrix used for?", opts: ["Evaluating clustering accuracy", "Evaluating classification model performance", "Visualizing feature importance", "Regularizing a model"], ans: 1 },
    { q: "What does cross-validation help with?", opts: ["Speeding up training", "Assessing model generalization by testing on multiple data splits", "Reducing dataset size", "Increasing prediction speed"], ans: 1 }
  ],
  "AWS": [
    { q: "What does S3 stand for in AWS?", opts: ["Simple Server System", "Scalable Storage Solution", "Simple Storage Service", "Secure Sync Service"], ans: 2 },
    { q: "What is an EC2 instance?", opts: ["A database service", "A content delivery network", "A virtual server in AWS", "A serverless function"], ans: 2 },
    { q: "What is AWS Lambda?", opts: ["A database service", "A serverless compute service", "A load balancer", "A container registry"], ans: 1 },
    { q: "What does IAM stand for?", opts: ["Internet Access Manager", "Identity and Access Management", "Integrated Application Monitor", "Instance Access Module"], ans: 1 },
    { q: "What is a VPC in AWS?", opts: ["Virtual Private Cloud — an isolated network", "Virtual Public Cloud", "Video Processing Center", "Variable Port Configuration"], ans: 0 }
  ],
  "Git": [
    { q: "What does 'git rebase' do?", opts: ["Deletes commits", "Reapplies commits on top of another branch", "Merges two branches with a merge commit", "Resets to a previous commit"], ans: 1 },
    { q: "What is a Pull Request?", opts: ["Pulling code from server", "Requesting to merge changes into a branch", "A type of git commit", "Downloading a repository"], ans: 1 },
    { q: "What does 'git stash' do?", opts: ["Permanently deletes changes", "Saves uncommitted changes temporarily", "Creates a new branch", "Stages all changes"], ans: 1 },
    { q: "What is the HEAD in git?", opts: ["The first commit", "A pointer to the current branch's latest commit", "The main branch", "A remote reference"], ans: 1 },
    { q: "What does 'git cherry-pick' do?", opts: ["Selects files to commit", "Applies a specific commit from another branch", "Creates a patch file", "Merges selected branches"], ans: 1 }
  ],
  "Testing": [
    { q: "What is unit testing?", opts: ["Testing the whole application", "Testing individual functions/components in isolation", "Testing user flow end-to-end", "Testing API endpoints"], ans: 1 },
    { q: "What does TDD stand for?", opts: ["Total Development Deployment", "Test Driven Development", "Type Definition Design", "Test Data Distribution"], ans: 1 },
    { q: "What is a mock in testing?", opts: ["A fake user account", "A simulated object that mimics real behaviour for testing", "A type of assertion", "A performance benchmark"], ans: 1 },
    { q: "What is the purpose of integration testing?", opts: ["Testing each unit alone", "Testing how multiple components work together", "Testing UI visuals", "Load testing the server"], ans: 1 },
    { q: "Which assertion library is popular with Jest?", opts: ["Chai", "Mocha", "Built-in Jest expect()", "Sinon"], ans: 2 }
  ],
  "REST APIs": [
    { q: "What HTTP method is used to create a resource?", opts: ["GET", "DELETE", "PUT", "POST"], ans: 3 },
    { q: "What does HTTP status 404 mean?", opts: ["Server error", "Unauthorized", "Not Found", "Request timeout"], ans: 2 },
    { q: "What is CORS?", opts: ["A type of encryption", "Cross-Origin Resource Sharing — controls cross-domain requests", "A REST framework", "A database protocol"], ans: 1 },
    { q: "What is the purpose of an API key?", opts: ["To encrypt responses", "To authenticate and identify the caller", "To speed up requests", "To format JSON responses"], ans: 1 },
    { q: "What does a RESTful API use to represent data?", opts: ["XML only", "Binary data", "JSON (commonly)", "HTML templates"], ans: 2 }
  ]
};

// ─── LEARNING RESOURCES ─────────────────────────
const LEARNING_RESOURCES = {
  "React": { hours: "8–12", desc: "Master component architecture, hooks, and state management.", resources: [
    { name: "React Docs (Official)", type: "📖 Docs", url: "https://react.dev" },
    { name: "Full React Tutorial – Traversy Media", type: "🎥 YouTube", url: "https://youtube.com" },
    { name: "React – Scrimba Interactive", type: "💻 Interactive", url: "https://scrimba.com/learn/learnreact" }
  ]},
  "JavaScript": { hours: "10–15", desc: "Deep dive into closures, async/await, prototypes and the event loop.", resources: [
    { name: "javascript.info – The Modern JS Tutorial", type: "📖 Docs", url: "https://javascript.info" },
    { name: "Fireship – JS in 100 Seconds", type: "🎥 YouTube", url: "https://youtube.com" },
    { name: "freeCodeCamp JS Algorithms", type: "💻 Interactive", url: "https://freecodecamp.org" }
  ]},
  "Python": { hours: "8–12", desc: "Learn Python fundamentals, OOP, and key libraries.", resources: [
    { name: "Python Docs – Official Tutorial", type: "📖 Docs", url: "https://docs.python.org/3/tutorial" },
    { name: "Corey Schafer – Python Beginner to Advanced", type: "🎥 YouTube", url: "https://youtube.com" },
    { name: "Codecademy Python Course", type: "💻 Interactive", url: "https://codecademy.com" }
  ]},
  "SQL": { hours: "6–8", desc: "Learn queries, joins, aggregations, and database design.", resources: [
    { name: "SQLZoo — Interactive SQL", type: "💻 Interactive", url: "https://sqlzoo.net" },
    { name: "Mode Analytics SQL Tutorial", type: "📖 Docs", url: "https://mode.com/sql-tutorial" },
    { name: "Alex The Analyst – SQL for Beginners", type: "🎥 YouTube", url: "https://youtube.com" }
  ]},
  "Node.js": { hours: "8–12", desc: "Build servers with Node, Express and understand the async model.", resources: [
    { name: "Node.js Official Docs", type: "📖 Docs", url: "https://nodejs.org/en/docs" },
    { name: "Academind – Node.js Complete Course", type: "🎥 YouTube", url: "https://youtube.com" },
    { name: "The Odin Project – Node.js Path", type: "💻 Interactive", url: "https://theodinproject.com" }
  ]},
  "Docker": { hours: "5–8", desc: "Containerize apps, write Dockerfiles, and use docker-compose.", resources: [
    { name: "Docker Get Started Guide", type: "📖 Docs", url: "https://docs.docker.com/get-started" },
    { name: "TechWorld with Nana – Docker Complete Course", type: "🎥 YouTube", url: "https://youtube.com" },
    { name: "Play with Docker — Hands-on Labs", type: "💻 Interactive", url: "https://labs.play-with-docker.com" }
  ]},
  "TypeScript": { hours: "6–10", desc: "Add types to JavaScript — interfaces, generics, and strict types.", resources: [
    { name: "TypeScript Official Handbook", type: "📖 Docs", url: "https://typescriptlang.org/docs/handbook" },
    { name: "Matt Pocock – Total TypeScript", type: "🎥 YouTube", url: "https://youtube.com" },
    { name: "Execute Program – TypeScript Basics", type: "💻 Interactive", url: "https://executeprogram.com" }
  ]},
  "Machine Learning": { hours: "20–30", desc: "Understand supervised/unsupervised learning, model evaluation, and sklearn.", resources: [
    { name: "Andrew Ng – Machine Learning Specialization", type: "🎥 Course", url: "https://coursera.org/specializations/machine-learning-introduction" },
    { name: "Scikit-learn Docs", type: "📖 Docs", url: "https://scikit-learn.org/stable/user_guide.html" },
    { name: "Kaggle Learn – ML", type: "💻 Interactive", url: "https://kaggle.com/learn/intro-to-machine-learning" }
  ]},
  "AWS": { hours: "12–20", desc: "Learn EC2, S3, Lambda, IAM and cloud architecture basics.", resources: [
    { name: "AWS Free Tier + Getting Started", type: "📖 Docs", url: "https://aws.amazon.com/getting-started" },
    { name: "TechWorld with Nana – AWS Full Course", type: "🎥 YouTube", url: "https://youtube.com" },
    { name: "A Cloud Guru – AWS Essentials", type: "💻 Interactive", url: "https://acloudguru.com" }
  ]},
  "Git": { hours: "3–5", desc: "Master branching, rebasing, pull requests, and team workflows.", resources: [
    { name: "Pro Git Book (Free)", type: "📖 Docs", url: "https://git-scm.com/book/en/v2" },
    { name: "Fireship – Git Explained in 100 Seconds", type: "🎥 YouTube", url: "https://youtube.com" },
    { name: "Learn Git Branching (Interactive)", type: "💻 Interactive", url: "https://learngitbranching.js.org" }
  ]},
  "Testing": { hours: "5–8", desc: "Write unit, integration, and E2E tests with Jest and Cypress.", resources: [
    { name: "Jest Official Docs", type: "📖 Docs", url: "https://jestjs.io/docs/getting-started" },
    { name: "Fireship – Testing for Beginners", type: "🎥 YouTube", url: "https://youtube.com" },
    { name: "Cypress Real World App", type: "💻 Interactive", url: "https://github.com/cypress-io/cypress-realworld-app" }
  ]},
  "REST APIs": { hours: "4–6", desc: "Design and consume REST APIs, understand HTTP methods and status codes.", resources: [
    { name: "MDN – HTTP Guide", type: "📖 Docs", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP" },
    { name: "Traversy Media – REST API Crash Course", type: "🎥 YouTube", url: "https://youtube.com" },
    { name: "Postman Learning Center", type: "💻 Interactive", url: "https://learning.postman.com" }
  ]},
  "System Design": { hours: "15–25", desc: "Learn to design scalable distributed systems, caching, and load balancing.", resources: [
    { name: "System Design Primer (GitHub)", type: "📖 Docs", url: "https://github.com/donnemartin/system-design-primer" },
    { name: "Gaurav Sen – System Design Playlist", type: "🎥 YouTube", url: "https://youtube.com" },
    { name: "ByteByteGo Newsletter", type: "📖 Docs", url: "https://blog.bytebytego.com" }
  ]},
  "Kubernetes": { hours: "10–16", desc: "Orchestrate containers, deployments, services, and scaling with K8s.", resources: [
    { name: "Kubernetes Docs – Getting Started", type: "📖 Docs", url: "https://kubernetes.io/docs/tutorials/kubernetes-basics" },
    { name: "TechWorld with Nana – Kubernetes for Beginners", type: "🎥 YouTube", url: "https://youtube.com" },
    { name: "Killer.sh – Kubernetes Practice", type: "💻 Interactive", url: "https://killer.sh" }
  ]},
  "Deep Learning": { hours: "20–30", desc: "Neural networks, CNNs, RNNs, and transformers with PyTorch or TensorFlow.", resources: [
    { name: "fast.ai – Practical Deep Learning for Coders", type: "🎥 Course", url: "https://course.fast.ai" },
    { name: "PyTorch Official Tutorials", type: "📖 Docs", url: "https://pytorch.org/tutorials" },
    { name: "3Blue1Brown – Neural Networks Playlist", type: "🎥 YouTube", url: "https://youtube.com" }
  ]}
};

// Fallback resource for skills not in the detailed map
function getResource(skill) {
  return LEARNING_RESOURCES[skill] || {
    hours: "4–8",
    desc: `Build proficiency in ${skill} through targeted practice and documentation.`,
    resources: [
      { name: `${skill} Official Documentation`, type: "📖 Docs", url: "https://google.com/search?q=" + encodeURIComponent(skill + " documentation") },
      { name: `${skill} Tutorial – YouTube`, type: "🎥 YouTube", url: "https://youtube.com/results?search_query=" + encodeURIComponent(skill + " tutorial") },
      { name: `${skill} on freeCodeCamp`, type: "💻 Free Course", url: "https://freecodecamp.org/news/search/?query=" + encodeURIComponent(skill) }
    ]
  };
}

// ─── STATE ────────────────────────────────────────
let state = {
  tags: [],
  role: "",
  matched: [],
  missing: [],
  verified: {}, // skill -> { passed: bool, score: int }
  completed: {} // skill -> bool
};

// ─── LOAD FROM LOCALSTORAGE ───────────────────────
function loadProgress() {
  try {
    const saved = localStorage.getItem("si_state");
    if (saved) {
      const parsed = JSON.parse(saved);
      state = { ...state, ...parsed };
      // Restore tags
      state.tags.forEach(t => addTagDOM(t));
      // Restore role
      if (state.role) {
        document.getElementById("targetRole").value = state.role;
      }
      // Restore resume text
      const rt = localStorage.getItem("si_resume");
      if (rt) document.getElementById("resumeText").value = rt;
      // Re-run analysis silently if we have a role and tags
      if (state.role && state.tags.length > 0) {
        analyzeProfile(true);
      }
    }
  } catch(e) { /* ignore */ }
}

function saveProgress() {
  try {
    localStorage.setItem("si_state", JSON.stringify({
      tags: state.tags,
      role: state.role,
      matched: state.matched,
      missing: state.missing,
      verified: state.verified,
      completed: state.completed
    }));
    const rt = document.getElementById("resumeText")?.value;
    if (rt) localStorage.setItem("si_resume", rt);
  } catch(e) { /* ignore */ }
}

// ─── TAG INPUT ────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("skillTagInput");
  const wrap  = document.getElementById("tagWrap");

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const val = input.value.trim().replace(/,$/, "");
      if (val) addTag(val);
      input.value = "";
    } else if (e.key === "Backspace" && input.value === "" && state.tags.length) {
      removeTag(state.tags[state.tags.length - 1]);
    }
  });

  wrap.addEventListener("click", () => input.focus());

  loadProgress();
});

function addTag(name) {
  const normalized = name.trim();
  if (!normalized || state.tags.includes(normalized)) return;
  state.tags.push(normalized);
  addTagDOM(normalized);
}

function addTagDOM(name) {
  const container = document.getElementById("skillTagContainer");
  const tag = document.createElement("span");
  tag.className = "skill-tag";
  tag.dataset.tag = name;
  tag.innerHTML = `${name} <button class="skill-tag-remove" onclick="removeTag('${name.replace(/'/g,"\\'")}')">✕</button>`;
  container.appendChild(tag);
}

function removeTag(name) {
  state.tags = state.tags.filter(t => t !== name);
  const el = document.querySelector(`.skill-tag[data-tag="${name}"]`);
  if (el) el.remove();
}

// ─── ANALYZE PROFILE ─────────────────────────────
async function analyzeProfile(silent = false) {
  const role = document.getElementById("targetRole").value;
  if (!role) { if (!silent) alert("Please select a target job role first."); return; }
  if (state.tags.length === 0) { if (!silent) alert("Please add at least one skill."); return; }

  state.role = role;

  if (!silent) {
    // Show progress animation
    const btn  = document.getElementById("analyzeBtn");
    const prog = document.getElementById("analyzeProgress");
    const bar  = document.getElementById("analyzeBar");
    const lbl  = document.getElementById("analyzeLabel");
    btn.disabled = true;
    btn.textContent = "Analyzing…";
    prog.style.display = "block";

    const steps = [
      [20, "Parsing skill profile…"],
      [45, "Comparing with job requirements…"],
      [65, "Identifying skill gaps…"],
      [85, "Generating roadmap…"],
      [100, "Done!"]
    ];
    for (const [pct, msg] of steps) {
      bar.style.width = pct + "%";
      lbl.textContent = msg;
      await delay(350);
    }
    await delay(200);
    btn.disabled = false;
    btn.textContent = "⚡ Analyze My Profile";
    prog.style.display = "none";
    bar.style.width = "0%";
  }

  const profile = JOB_PROFILES[role];
  const userSkillsNorm = state.tags.map(t => t.toLowerCase());

  state.matched = profile.required.filter(r => userSkillsNorm.some(u => u.includes(r.toLowerCase()) || r.toLowerCase().includes(u)));
  state.missing  = profile.required.filter(r => !state.matched.includes(r));

  document.getElementById("siEmpty").style.display  = "none";
  document.getElementById("siStats").style.display  = "grid";
  document.getElementById("siScore").style.display  = "block";
  document.getElementById("siGap").style.display    = "block";
  document.getElementById("siVerify").style.display = "block";
  document.getElementById("siRoadmap").style.display = "block";

  renderStats();
  renderScore();
  renderGap(profile);
  renderVerifyGrid();
  renderRoadmap();
  animateFadeIn();
  saveProgress();
}

function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

// ─── STATS ───────────────────────────────────────
function renderStats() {
  document.getElementById("statTracked").textContent = state.tags.length;
  document.getElementById("statGaps").textContent    = state.missing.length;
  document.getElementById("statVerified").textContent = Object.values(state.verified).filter(v => v.passed).length;
  document.getElementById("statSteps").textContent   = state.missing.length;
}

// ─── READINESS SCORE ─────────────────────────────
function renderScore() {
  const profile = JOB_PROFILES[state.role];
  if (!profile) return;

  const total    = profile.required.length;
  const matched  = state.matched.length;
  const verCount = Object.values(state.verified).filter(v => v.passed).length;
  const compCount= Object.values(state.completed).filter(Boolean).length;

  // Score = weighted: 50% skill match, 30% verifications, 20% roadmap progress
  const matchPct  = total ? (matched / total) * 100 : 0;
  const verPct    = (matched + state.missing.length) > 0 ? (verCount / (matched + state.missing.length)) * 100 : 0;
  const roadPct   = state.missing.length > 0 ? (compCount / state.missing.length) * 100 : 100;

  const score = Math.round(matchPct * 0.5 + verPct * 0.3 + roadPct * 0.2);

  // Animate ring (circumference = 2π * 66 ≈ 414.69)
  const circ = 415;
  const offset = circ - (circ * score / 100);
  document.getElementById("ringFill").style.strokeDashoffset = offset;
  animateCounter("ringScore", score, 1200);

  // Badge
  const badge = document.getElementById("readinessBadge");
  if (score >= 80) { badge.textContent = "🏆 Job Ready"; badge.style.background = "rgba(16,212,142,0.15)"; badge.style.color = "var(--accent-green)"; badge.style.borderColor = "rgba(16,212,142,0.3)"; }
  else if (score >= 60) { badge.textContent = "📈 Good Progress"; badge.style.background = "rgba(249,115,22,0.15)"; badge.style.color = "var(--accent-orange)"; badge.style.borderColor = "rgba(249,115,22,0.3)"; }
  else { badge.textContent = "🚀 Just Starting"; badge.style.background = "rgba(236,72,153,0.15)"; badge.style.color = "var(--accent-pink)"; badge.style.borderColor = "rgba(236,72,153,0.3)"; }

  // Breakdown bars
  const bd = document.getElementById("readinessBreakdown");
  bd.innerHTML = [
    { label: "Skill Match",    pct: Math.round(matchPct), color: "var(--gradient-primary)" },
    { label: "Verified",       pct: Math.round(verPct),   color: "var(--gradient-green)" },
    { label: "Roadmap Done",   pct: Math.round(roadPct),  color: "var(--gradient-warm)" }
  ].map(row => `
    <div class="breakdown-row">
      <span class="breakdown-label">${row.label}</span>
      <div class="breakdown-bar-wrap"><div class="breakdown-bar" style="width:${row.pct}%;background:${row.color}" /></div>
      <span class="breakdown-pct">${row.pct}%</span>
    </div>`).join("");
}

function animateCounter(id, target, duration) {
  const el = document.getElementById(id);
  if (!el) return;
  let start = null;
  const from = parseInt(el.textContent) || 0;
  requestAnimationFrame(function step(ts) {
    if (!start) start = ts;
    const p = Math.min((ts - start) / duration, 1);
    el.textContent = Math.round(from + (target - from) * easeOut(p));
    if (p < 1) requestAnimationFrame(step);
  });
}
function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

// ─── GAP ANALYSIS ────────────────────────────────
function renderGap(profile) {
  document.getElementById("gapRoleTag").textContent = profile.label;

  const mt = document.getElementById("matchedTags");
  const ms = document.getElementById("missingTags");
  mt.innerHTML = state.matched.map((s, i) =>
    `<span class="gap-pill match" style="animation-delay:${i*40}ms">${s}</span>`).join("") || `<span style="color:var(--text-muted);font-size:0.82rem;">None matched</span>`;
  ms.innerHTML = state.missing.map((s, i) =>
    `<span class="gap-pill miss" style="animation-delay:${i*40}ms">${s}</span>`).join("") || `<span style="color:var(--accent-green);font-size:0.82rem;">🎉 All skills present!</span>`;
}

// ─── VERIFICATION GRID ───────────────────────────
function renderVerifyGrid() {
  const all = [...state.matched, ...state.missing];
  const grid = document.getElementById("verifyGrid");
  grid.innerHTML = all.map(skill => {
    const vd      = state.verified[skill];
    const hasQuiz = !!SKILL_QUIZZES[skill];
    const isPassed = vd && vd.passed;
    return `
      <div class="verify-card ${isPassed ? 'passed' : ''}" id="vc-${sanitizeId(skill)}">
        <div class="verify-card-name">${skill}</div>
        <div class="verify-card-status">${
          isPassed  ? `✅ Verified — ${vd.score}%` :
          vd        ? `❌ Score: ${vd.score}% (retry below)` :
          hasQuiz   ? "Not yet verified" : "No test available"
        }</div>
        ${hasQuiz ? `<button class="verify-btn" onclick="startQuiz('${skill.replace(/'/g,"\\'")}')">
          ${isPassed ? "✓ Passed" : "▶ Take Test"}
        </button>` : `<button class="verify-btn" disabled>No Test</button>`}
      </div>`;
  }).join("");
}

// ─── ROADMAP ─────────────────────────────────────
function renderRoadmap() {
  const list = document.getElementById("roadmapList");
  if (state.missing.length === 0) {
    list.innerHTML = `<div style="text-align:center;padding:40px;color:var(--accent-green);font-weight:700;">🎉 No skill gaps! Your profile matches all requirements for this role.</div>`;
    return;
  }
  list.innerHTML = state.missing.map((skill, i) => {
    const res   = getResource(skill);
    const done  = !!state.completed[skill];
    return `
      <div class="roadmap-item ${done ? 'done' : ''}" id="ri-${sanitizeId(skill)}">
        <div class="roadmap-item-head" onclick="toggleRoadmapItem('${sanitizeId(skill)}')">
          <div class="roadmap-step-num">${done ? "✓" : (i + 1)}</div>
          <div class="roadmap-skill-name">${skill}</div>
          <div class="roadmap-meta">⏱ ${res.hours}h</div>
          <span class="roadmap-chevron">▼</span>
        </div>
        <div class="roadmap-body">
          <p class="roadmap-desc">${res.desc}</p>
          <div class="roadmap-resources">
            ${res.resources.map(r => `
              <a class="roadmap-resource" href="${r.url}" target="_blank" rel="noopener">
                <span class="roadmap-resource-icon">${r.type.split(" ")[0]}</span>
                <span class="roadmap-resource-name">${r.name}</span>
                <span class="roadmap-resource-type">${r.type}</span>
              </a>`).join("")}
          </div>
          <button class="roadmap-complete-btn" onclick="markComplete('${skill.replace(/'/g,"\\'")}')">
            ${done ? "✅ Completed" : "✔ Mark as Complete"}
          </button>
        </div>
      </div>`;
  }).join("");
}

function toggleRoadmapItem(id) {
  const el = document.getElementById("ri-" + id);
  if (el) el.classList.toggle("open");
}

function markComplete(skill) {
  state.completed[skill] = !state.completed[skill];
  saveProgress();
  renderRoadmap();
  renderScore();
  renderStats();
}

function resetProgress() {
  if (!confirm("Reset all roadmap progress?")) return;
  state.completed = {};
  saveProgress();
  renderRoadmap();
  renderScore();
}

// ─── QUIZ ENGINE ─────────────────────────────────
let quiz = { skill: "", questions: [], current: 0, correct: 0, answered: false };

function startQuiz(skill) {
  const qs = SKILL_QUIZZES[skill];
  if (!qs) return;

  quiz = { skill, questions: shuffleArray([...qs]).slice(0, 5), current: 0, correct: 0, answered: false };
  document.getElementById("quizSkillName").textContent = skill + " Verification Test";
  document.getElementById("quizOverlay").classList.add("active");
  renderQuizQuestion();
}

function renderQuizQuestion() {
  const q   = quiz.questions[quiz.current];
  const num = quiz.current + 1;
  const tot = quiz.questions.length;

  document.getElementById("quizProgressText").textContent = `Question ${num} of ${tot}`;
  document.getElementById("quizProgressFill").style.width = (num / tot * 100) + "%";
  document.getElementById("quizQuestion").textContent   = q.q;
  document.getElementById("quizFooter").innerHTML       = "";
  quiz.answered = false;

  document.getElementById("quizOptions").innerHTML = q.opts.map((opt, i) =>
    `<button class="quiz-option" onclick="answerQuiz(${i})">${opt}</button>`
  ).join("");
}

function answerQuiz(chosen) {
  if (quiz.answered) return;
  quiz.answered = true;
  const q    = quiz.questions[quiz.current];
  const opts = document.querySelectorAll(".quiz-option");

  opts.forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.ans)  btn.classList.add("correct");
    if (i === chosen && chosen !== q.ans) btn.classList.add("wrong");
  });

  if (chosen === q.ans) quiz.correct++;

  const footer = document.getElementById("quizFooter");
  const last   = quiz.current === quiz.questions.length - 1;
  footer.innerHTML = `<button class="btn btn-primary btn-sm" onclick="${last ? 'finishQuiz()' : 'nextQuestion()'}">${last ? "Finish Quiz ✓" : "Next →"}</button>`;
}

function nextQuestion() {
  quiz.current++;
  if (quiz.current < quiz.questions.length) renderQuizQuestion();
  else finishQuiz();
}

function finishQuiz() {
  const score = Math.round((quiz.correct / quiz.questions.length) * 100);
  const passed = score >= 70;

  state.verified[quiz.skill] = { passed, score };
  saveProgress();

  document.getElementById("quizProgressFill").style.width = "100%";
  document.querySelector(".quiz-box").innerHTML = `
    <div class="quiz-result-wrap">
      <div class="quiz-skill-name" style="margin-bottom:8px;padding:24px 24px 0;">${quiz.skill}</div>
      <div class="quiz-result-score">${score}%</div>
      <div class="quiz-result-badge ${passed ? 'passed' : 'failed'}">
        ${passed ? "✅ Skill Verified!" : "❌ Not Verified"}
      </div>
      <div class="quiz-result-msg">${passed
        ? `Great work! You scored ${quiz.correct}/${quiz.questions.length} — this skill is now verified on your profile.`
        : `You scored ${quiz.correct}/${quiz.questions.length}. A score of 70%+ is needed to earn verification. Review the learning resources and try again.`
      }</div>
      <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">
        <button class="btn btn-outline" onclick="closeQuiz()">Close</button>
        ${!passed ? `<button class="btn btn-primary" onclick="retryQuiz()">↺ Retry</button>` : ""}
      </div>
    </div>`;

  // Update UI
  renderVerifyGrid();
  renderScore();
  renderStats();
}

function retryQuiz() {
  const skill = quiz.skill;
  document.getElementById("quizOverlay").classList.remove("active");
  setTimeout(() => startQuiz(skill), 200);
}

function closeQuiz() {
  document.getElementById("quizOverlay").classList.remove("active");
}

// ─── UTILS ───────────────────────────────────────
function sanitizeId(s) { return s.replace(/[^a-zA-Z0-9]/g, "_"); }

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function animateFadeIn() {
  document.querySelectorAll(".fade-in:not(.visible)").forEach(el => {
    setTimeout(() => el.classList.add("visible"), 50);
  });
}
