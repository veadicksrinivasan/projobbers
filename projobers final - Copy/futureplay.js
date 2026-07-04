/* =============================================
   FUTUREPLAY.JS — Real Interactive Learning
   ============================================= */
const FP_KEY = 'futureplay_state';
const DEFAULT_STATE = { xp:3240, level:6, xpToNext:5000, streak:7, streakLastDate:new Date().toDateString(), completedQuests:[], earnedBadges:['b1','b2'], activePath:'fullstack', jobReadiness:74 };
function loadState(){try{const s=JSON.parse(localStorage.getItem(FP_KEY));return s?{...DEFAULT_STATE,...s}:{...DEFAULT_STATE};}catch{return{...DEFAULT_STATE};}}
function saveState(s){localStorage.setItem(FP_KEY,JSON.stringify(s));}
let STATE=loadState();

// ── Quest Content Database (real videos, reading, quizzes) ──
const QUEST_CONTENT={
  q1:{// HTML & CSS Foundations
    steps:[
      {type:'video',title:'📺 Watch: HTML & CSS Crash Course',videoId:'UB1O30fR-EE',desc:'Watch this complete HTML & CSS tutorial by Traversy Media. Take notes on semantic tags, flexbox, and grid.'},
      {type:'reading',title:'📖 Key Concepts Review',content:`<h4>HTML & CSS Essentials</h4>
<p>After watching, make sure you understand these concepts:</p>
<ul style="color:var(--text-secondary);line-height:2;font-size:0.88rem;">
<li><strong>Semantic HTML:</strong> &lt;header&gt;, &lt;nav&gt;, &lt;main&gt;, &lt;section&gt;, &lt;article&gt;, &lt;footer&gt;</li>
<li><strong>CSS Box Model:</strong> content → padding → border → margin</li>
<li><strong>Flexbox:</strong> display:flex, justify-content, align-items, flex-wrap</li>
<li><strong>Grid:</strong> grid-template-columns, grid-gap, grid-area</li>
<li><strong>Responsive Design:</strong> media queries, relative units (rem, %, vw/vh)</li>
<li><strong>CSS Variables:</strong> :root { --color: #fff; } and var(--color)</li>
</ul>
<div style="background:rgba(6,214,214,0.08);border:1px solid rgba(6,214,214,0.25);border-radius:8px;padding:14px;margin-top:16px;">
<strong style="color:var(--accent-cyan);">💡 Pro Tip:</strong> Always use semantic HTML — it improves SEO, accessibility, and code readability.
</div>`},
      {type:'quiz',title:'📝 Knowledge Check',questions:[
        {q:'Which HTML element is used for the main content of a page?',opts:['<div>','<main>','<body>','<content>'],correct:1},
        {q:'What does "display: flex" do?',opts:['Makes element invisible','Creates a flex container','Adds animation','Changes font'],correct:1},
        {q:'Which CSS property adds space INSIDE an element?',opts:['margin','border','padding','gap'],correct:2},
        {q:'What unit is relative to the root font size?',opts:['px','em','rem','vw'],correct:2},
        {q:'How do you declare a CSS variable?',opts:['$var: value','@var: value','--var: value','var = value'],correct:2}
      ]}
    ]
  },
  q2:{// JavaScript ES6+
    steps:[
      {type:'video',title:'📺 Watch: JavaScript ES6+ Features',videoId:'NCwa_xi0Uuc',desc:'Learn modern JavaScript — arrow functions, destructuring, promises, async/await, and modules.'},
      {type:'reading',title:'📖 ES6+ Cheat Sheet',content:`<h4>Modern JavaScript Essentials</h4>
<pre style="background:rgba(255,255,255,0.04);padding:16px;border-radius:8px;overflow-x:auto;font-size:0.82rem;color:var(--accent-cyan);line-height:1.7;">
// Arrow Functions
const add = (a, b) => a + b;

// Destructuring
const { name, age } = user;
const [first, ...rest] = array;

// Template Literals
const msg = \`Hello \${name}, you are \${age}\`;

// Promises & Async/Await
async function fetchData() {
  const res = await fetch('/api/data');
  const data = await res.json();
  return data;
}

// Spread & Rest
const merged = { ...obj1, ...obj2 };
const sum = (...nums) => nums.reduce((a,b) => a+b, 0);

// Optional Chaining & Nullish Coalescing
const city = user?.address?.city ?? 'Unknown';
</pre>`},
      {type:'quiz',title:'📝 JavaScript Quiz',questions:[
        {q:'What is the output of: const [a,,b] = [1,2,3]?',opts:['a=1, b=2','a=1, b=3','a=1, b=undefined','Error'],correct:1},
        {q:'Which keyword declares a block-scoped variable?',opts:['var','let','both var and let','function'],correct:1},
        {q:'What does async/await replace?',opts:['Callbacks only','.then() promise chains','for loops','if statements'],correct:1},
        {q:'What does the spread operator (...) do?',opts:['Compares values','Expands iterables','Deletes properties','Creates errors'],correct:1},
        {q:'What does optional chaining (?.) return if property is missing?',opts:['Error','null','undefined','false'],correct:2}
      ]}
    ]
  },
  q3:{// React Component Design
    steps:[
      {type:'video',title:'📺 Watch: React in 100 Seconds + Tutorial',videoId:'Tn6-PIqc4UM',desc:'Learn React fundamentals — components, JSX, state, props, hooks, and the virtual DOM.'},
      {type:'code',title:'💻 Code Challenge: Build a Counter',desc:'Create a React counter component with increment, decrement, and reset buttons.',starterCode:`// Build a Counter Component
function Counter() {
  // TODO: Use useState to track count
  // TODO: Create increment, decrement, reset functions
  // TODO: Return JSX with count display and buttons
  
  return (
    <div>
      {/* Your code here */}
    </div>
  );
}`,solutionHint:'Use const [count, setCount] = useState(0) and onClick handlers for each button.'},
      {type:'quiz',title:'📝 React Quiz',questions:[
        {q:'What hook is used to manage state in functional components?',opts:['useEffect','useState','useContext','useRef'],correct:1},
        {q:'What is JSX?',opts:['A new language','JavaScript XML syntax extension','A CSS framework','A database query'],correct:1},
        {q:'When does useEffect with empty deps [] run?',opts:['Every render','Only on mount','On unmount','Never'],correct:1},
        {q:'What is the virtual DOM?',opts:['A browser API','Lightweight copy of real DOM','A CSS tool','Server-side HTML'],correct:1},
        {q:'How do you pass data from parent to child?',opts:['state','context','props','refs'],correct:2}
      ]}
    ]
  },
  q4:{// Node.js REST API
    steps:[
      {type:'video',title:'📺 Watch: Node.js & Express REST API',videoId:'fgTGADljAMg',desc:'Build a complete REST API with Node.js, Express, and MongoDB. Learn routing, middleware, and CRUD operations.'},
      {type:'reading',title:'📖 REST API Design Principles',content:`<h4>REST API Best Practices</h4>
<ul style="color:var(--text-secondary);line-height:2;font-size:0.88rem;">
<li><strong>GET /api/users</strong> — List all users</li>
<li><strong>GET /api/users/:id</strong> — Get single user</li>
<li><strong>POST /api/users</strong> — Create user</li>
<li><strong>PUT /api/users/:id</strong> — Update user</li>
<li><strong>DELETE /api/users/:id</strong> — Delete user</li>
</ul>
<pre style="background:rgba(255,255,255,0.04);padding:16px;border-radius:8px;overflow-x:auto;font-size:0.82rem;color:var(--accent-green);line-height:1.7;">
const express = require('express');
const app = express();
app.use(express.json());

app.get('/api/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.post('/api/users', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.status(201).json(user);
});

app.listen(3000);
</pre>`},
      {type:'quiz',title:'📝 Node.js API Quiz',questions:[
        {q:'Which HTTP method is used to create a new resource?',opts:['GET','POST','PUT','PATCH'],correct:1},
        {q:'What status code means "Created"?',opts:['200','201','204','301'],correct:1},
        {q:'What does middleware in Express do?',opts:['Runs between request and response','Creates database','Compiles code','Sends emails'],correct:0},
        {q:'Which method parses JSON request bodies in Express?',opts:['express.static()','express.json()','express.urlencoded()','express.raw()'],correct:1},
        {q:'What is the correct way to handle errors in async Express routes?',opts:['Ignore them','try/catch blocks','alert()','console.log()'],correct:1}
      ]}
    ]
  },
  q5:{steps:[{type:'video',title:'📺 Database Design Fundamentals',videoId:'ztHopE5Wnpc',desc:'Learn SQL and NoSQL database design patterns.'},{type:'quiz',title:'📝 Database Quiz',questions:[{q:'What does SQL stand for?',opts:['Structured Query Language','Simple Query Logic','System Query Language','Standard Query Logic'],correct:0},{q:'Which is a NoSQL database?',opts:['PostgreSQL','MySQL','MongoDB','SQLite'],correct:2},{q:'What is a primary key?',opts:['Any column','Unique identifier for rows','Foreign reference','Index name'],correct:1},{q:'What does JOIN do in SQL?',opts:['Deletes data','Combines rows from tables','Creates indexes','Backs up data'],correct:1}]}]},
  q6:{steps:[{type:'video',title:'📺 Git & GitHub Tutorial',videoId:'RGOj5yH7evk',desc:'Master Git version control and GitHub collaboration workflows.'},{type:'quiz',title:'📝 Git Quiz',questions:[{q:'What command creates a new branch?',opts:['git branch new-branch','git new branch','git create branch','git add branch'],correct:0},{q:'What does git merge do?',opts:['Deletes branch','Combines branches','Creates commit','Pushes code'],correct:1},{q:'What is a pull request?',opts:['Downloading code','Requesting code review before merge','Pulling from server','Deleting branch'],correct:1}]}]},
  q7:{steps:[{type:'video',title:'📺 Docker for Beginners',videoId:'fqMOX6JJhGo',desc:'Learn Docker containers, images, Dockerfile, and Docker Compose.'},{type:'reading',title:'📖 Docker Essentials',content:'<h4>Docker Key Concepts</h4><ul style="color:var(--text-secondary);line-height:2;"><li><strong>Image:</strong> Blueprint for creating containers</li><li><strong>Container:</strong> Running instance of an image</li><li><strong>Dockerfile:</strong> Instructions to build an image</li><li><strong>Docker Compose:</strong> Multi-container orchestration</li></ul>'},{type:'quiz',title:'📝 Docker Quiz',questions:[{q:'What is a Docker container?',opts:['A virtual machine','A lightweight isolated process','A programming language','A database'],correct:1},{q:'What file defines how to build a Docker image?',opts:['docker.yml','Dockerfile','docker-compose.yml','package.json'],correct:1},{q:'What command runs a container?',opts:['docker build','docker run','docker start','docker exec'],correct:1}]}]},
  q8:{steps:[{type:'reading',title:'📖 Capstone Project Brief',content:'<h4>🏆 Full-Stack Capstone Project</h4><p style="color:var(--text-secondary);line-height:1.8;">Build a complete full-stack application with:</p><ul style="color:var(--text-secondary);line-height:2;"><li>React frontend with routing and state management</li><li>Node.js/Express REST API backend</li><li>Database integration (MongoDB or PostgreSQL)</li><li>User authentication (JWT)</li><li>Deployment to a cloud platform</li></ul><div style="background:rgba(249,115,22,0.1);border:1px solid rgba(249,115,22,0.3);padding:14px;border-radius:8px;margin-top:16px;"><strong style="color:var(--accent-orange);">⏰ Timeline:</strong> 2 weeks recommended</div>'},{type:'quiz',title:'📝 Architecture Planning Quiz',questions:[{q:'What does JWT stand for?',opts:['JavaScript Web Token','JSON Web Token','Java Web Technology','JSON Web Transfer'],correct:1},{q:'Which is NOT a common authentication strategy?',opts:['JWT','OAuth','Session cookies','CSS tokens'],correct:3},{q:'What is CORS?',opts:['A CSS framework','Cross-Origin Resource Sharing','A database type','A testing tool'],correct:1}]}]}
};

// Default content for paths without specific content
function getDefaultContent(quest){
  return {steps:[
    {type:'video',title:'📺 Watch Tutorial',videoId:'dQw4w9WgXcQ',desc:`Watch a tutorial on ${quest.name}. Take notes on key concepts.`},
    {type:'quiz',title:'📝 Knowledge Check',questions:[
      {q:`What is the main purpose of ${quest.name}?`,opts:['Building UIs','Data processing','All of the above','None of the above'],correct:2},
      {q:'Which best describes your understanding after watching?',opts:['No understanding','Basic understanding','Good understanding','Expert level'],correct:2}
    ]}
  ]};
}

const CAREER_PATHS={
  fullstack:{label:'🌐 Full-Stack Dev',icon:'🌐',color:'rgba(79,142,247,0.15)',quests:[
    {id:'q1',name:'HTML & CSS Foundations',type:'Tutorial',xp:150,time:'45 min',icon:'📐'},
    {id:'q2',name:'JavaScript ES6+ Mastery',type:'Challenge',xp:200,time:'1.5 hrs',icon:'⚡'},
    {id:'q3',name:'React Component Design',type:'Project',xp:350,time:'3 hrs',icon:'⚛️'},
    {id:'q4',name:'Node.js REST API Build',type:'Project',xp:400,time:'4 hrs',icon:'🔧',reqQuests:['q3']},
    {id:'q5',name:'Database Design',type:'Assessment',xp:300,time:'2 hrs',icon:'🗃️',reqQuests:['q4']},
    {id:'q6',name:'Git & Collaboration',type:'Tutorial',xp:120,time:'30 min',icon:'🐙'},
    {id:'q7',name:'Docker & CI/CD',type:'Challenge',xp:450,time:'5 hrs',icon:'🐳',reqQuests:['q4','q5']},
    {id:'q8',name:'Full-Stack Capstone',type:'Capstone',xp:800,time:'2 weeks',icon:'🏆',reqQuests:['q7']}
  ]},
  datascience:{label:'📊 Data Science',icon:'📊',color:'rgba(16,212,142,0.15)',quests:[
    {id:'dq1',name:'Python for Data Analysis',type:'Tutorial',xp:180,time:'2 hrs',icon:'🐍'},
    {id:'dq2',name:'Pandas & NumPy',type:'Challenge',xp:220,time:'2.5 hrs',icon:'📈'},
    {id:'dq3',name:'Exploratory Data Analysis',type:'Project',xp:320,time:'4 hrs',icon:'🔍'},
    {id:'dq4',name:'Machine Learning Basics',type:'Assessment',xp:400,time:'4 hrs',icon:'🧠',reqQuests:['dq3']},
    {id:'dq5',name:'Deep Learning with PyTorch',type:'Project',xp:550,time:'1 week',icon:'🔥',reqQuests:['dq4']}
  ]},
  cloud:{label:'☁️ Cloud & DevOps',icon:'☁️',color:'rgba(6,214,214,0.15)',quests:[
    {id:'cq1',name:'Linux & Bash Scripting',type:'Tutorial',xp:160,time:'1.5 hrs',icon:'🐧'},
    {id:'cq2',name:'AWS Core Services',type:'Tutorial',xp:200,time:'2 hrs',icon:'☁️'},
    {id:'cq3',name:'Docker Containers',type:'Challenge',xp:300,time:'3 hrs',icon:'🐳'},
    {id:'cq4',name:'Kubernetes Orchestration',type:'Project',xp:450,time:'6 hrs',icon:'⚙️',reqQuests:['cq3']},
    {id:'cq5',name:'Infrastructure as Code',type:'Project',xp:400,time:'5 hrs',icon:'🏗️',reqQuests:['cq2']}
  ]},
  mobile:{label:'📱 Mobile Dev',icon:'📱',color:'rgba(139,92,246,0.15)',quests:[
    {id:'mq1',name:'React Native Basics',type:'Tutorial',xp:150,time:'2 hrs',icon:'⚛️'},
    {id:'mq2',name:'Navigation & State',type:'Challenge',xp:200,time:'2 hrs',icon:'🧭'},
    {id:'mq3',name:'Native Modules & APIs',type:'Project',xp:350,time:'4 hrs',icon:'🔌',reqQuests:['mq2']},
    {id:'mq4',name:'App Store Deployment',type:'Project',xp:300,time:'3 hrs',icon:'🚀',reqQuests:['mq3']}
  ]}
};

const BADGES=[
  {id:'b1',icon:'⚡',name:'Speed Coder',xp:50,desc:'Complete 3 challenges'},{id:'b2',icon:'🔥',name:'Streak Master',xp:100,desc:'7-day streak'},
  {id:'b3',icon:'🌟',name:'First Project',xp:200,desc:'Complete first project'},{id:'b4',icon:'🧠',name:'Problem Solver',xp:150,desc:'Pass 10 quizzes'},
  {id:'b5',icon:'🤝',name:'Community Hero',xp:75,desc:'Help 5 peers'},{id:'b6',icon:'💎',name:'Diamond Coder',xp:500,desc:'Reach Level 10'},
  {id:'b7',icon:'🎯',name:'Goal Crusher',xp:120,desc:'Complete a career path'},{id:'b8',icon:'🚀',name:'Fast Learner',xp:80,desc:'Finish quest quickly'},
  {id:'b9',icon:'🏆',name:'Champion',xp:300,desc:'Top 10 leaderboard'},{id:'b10',icon:'🌍',name:'Global Learner',xp:90,desc:'5 country connections'},
  {id:'b11',icon:'💻',name:'Code Warrior',xp:160,desc:'10,000 lines of code'},{id:'b12',icon:'📚',name:'Knowledge Seeker',xp:60,desc:'Complete 20 tutorials'}
];

const LEADERBOARD=[
  {name:'Priya Sharma',initials:'PS',xp:9840,level:15,color:'#8b5cf6',me:false},
  {name:'Rahul Patel',initials:'RP',xp:8620,level:14,color:'#4f8ef7',me:false},
  {name:'Aisha Lin',initials:'AL',xp:7910,level:13,color:'#06d6d6',me:false},
  {name:'You (Arjun)',initials:'AK',xp:STATE.xp,level:STATE.level,color:'#10d48e',me:true},
  {name:'Kiran Rao',initials:'KR',xp:2900,level:5,color:'#f97316',me:false},
  {name:'Sneha Iyer',initials:'SI',xp:2100,level:4,color:'#ec4899',me:false},
  {name:'Dev Anand',initials:'DA',xp:1650,level:3,color:'#f59e0b',me:false}
];

const DAILY_CHALLENGES=[
  {id:'dc1',icon:'⚡',title:'Speed Round: 3 Quick Questions',desc:'Answer 3 algorithm questions',xp:'+150 XP',done:STATE.completedQuests.includes('dc1'),
   quiz:[{q:'What is the time complexity of binary search?',opts:['O(n)','O(log n)','O(n²)','O(1)'],correct:1},{q:'What data structure uses FIFO?',opts:['Stack','Queue','Tree','Graph'],correct:1},{q:'What does API stand for?',opts:['Application Programming Interface','App Program Integration','Auto Program Interface','Application Process Integrator'],correct:0}]},
  {id:'dc2',icon:'📖',title:'Read: System Design Patterns',desc:'Article · 5 min read',xp:'+50 XP',done:STATE.completedQuests.includes('dc2'),
   reading:'<h4>🏗️ System Design Patterns</h4><ul style="color:var(--text-secondary);line-height:2.2;font-size:0.88rem;"><li><strong>Load Balancer:</strong> Distributes traffic across multiple servers</li><li><strong>Cache:</strong> Store frequent data in memory (Redis/Memcached)</li><li><strong>Message Queue:</strong> Async communication between services (RabbitMQ/Kafka)</li><li><strong>CDN:</strong> Serve static assets from edge servers near users</li><li><strong>Database Sharding:</strong> Split data across multiple databases</li></ul><p style="color:var(--text-muted);font-size:0.82rem;margin-top:12px;">✅ Scroll to the bottom and click "Mark as Read" to complete.</p>'},
  {id:'dc3',icon:'🎯',title:'Mini-Quiz: Web Security Basics',desc:'5 quick questions',xp:'+200 XP',done:STATE.completedQuests.includes('dc3'),
   quiz:[{q:'What does HTTPS encrypt?',opts:['Only passwords','All data in transit','Only cookies','Nothing'],correct:1},{q:'What is XSS?',opts:['Cross-Site Scripting','Cross-Server Security','eXternal Script Share','Cross-System Sync'],correct:0},{q:'What is CSRF?',opts:['Client Side Rendering Framework','Cross-Site Request Forgery','Cached Server Response Filter','Central Security Review Function'],correct:1},{q:'What does CORS stand for?',opts:['Cross-Origin Resource Sharing','Client-Origin Request System','Cross-Object Resource Service','Central Origin Response Server'],correct:0},{q:'Which header prevents clickjacking?',opts:['Content-Type','X-Frame-Options','Authorization','Accept'],correct:1}]}
];

/* ═══════════ QUEST MODAL SYSTEM ═══════════ */
let currentQuest=null, currentPath=null, currentStepIdx=0, currentContent=null, questTimerInterval=null, questStartTime=null;

function openQuestModal(quest,path,alreadyDone=false){
  if(alreadyDone){showToast('✅ Already Completed',quest.name,'Done');return;}
  currentQuest=quest; currentPath=path; currentStepIdx=0;
  currentContent=QUEST_CONTENT[quest.id]||getDefaultContent(quest);
  questStartTime=Date.now();

  document.getElementById('fp-modal-icon').textContent=quest.icon;
  document.getElementById('fp-modal-title').textContent=quest.name;
  document.getElementById('fp-modal-type').textContent=quest.type+' · '+quest.time;
  document.getElementById('fp-modal-xp').textContent='+'+quest.xp+' XP';

  // Build step tabs
  const tabsEl=document.getElementById('fp-quest-step-tabs');
  tabsEl.innerHTML='';
  currentContent.steps.forEach((s,i)=>{
    const t=document.createElement('button');
    t.className='fp-tab'+(i===0?' active':'');
    t.textContent=(i+1)+'. '+s.title.split(':')[0].replace('📺 ','').replace('📖 ','').replace('📝 ','').replace('💻 ','');
    t.onclick=()=>{if(i<=currentStepIdx)renderQuestStep(i);};
    tabsEl.appendChild(t);
  });

  renderQuestStep(0);
  document.getElementById('fp-quest-modal').classList.add('active');
  document.body.style.overflow='hidden';

  // Timer
  clearInterval(questTimerInterval);
  questTimerInterval=setInterval(()=>{
    const elapsed=Math.floor((Date.now()-questStartTime)/1000);
    const m=Math.floor(elapsed/60), s=elapsed%60;
    const el=document.getElementById('fp-quest-timer');
    if(el) el.textContent='⏱ '+m+':'+(s<10?'0':'')+s;
  },1000);
}

function renderQuestStep(idx){
  currentStepIdx=idx;
  const step=currentContent.steps[idx];
  const total=currentContent.steps.length;
  const contentEl=document.getElementById('fp-quest-content');
  const feedbackEl=document.getElementById('fp-quest-feedback');
  feedbackEl.style.display='none';

  // Update progress
  document.getElementById('fp-quest-step-label').textContent=`Step ${idx+1} of ${total}`;
  document.getElementById('fp-quest-progress-bar').style.width=((idx+1)/total*100)+'%';

  // Update tabs
  document.querySelectorAll('#fp-quest-step-tabs .fp-tab').forEach((t,i)=>{
    t.classList.toggle('active',i===idx);
  });

  // Prev button
  document.getElementById('fp-quest-prev-btn').style.display=idx>0?'':'none';

  // Next button text
  const nextBtn=document.getElementById('fp-quest-next-btn');
  if(idx===total-1){
    if(step.type==='quiz') nextBtn.textContent='📝 Submit Answers';
    else nextBtn.textContent='✅ Complete Quest';
  } else {
    nextBtn.textContent='Next Step →';
  }
  nextBtn.onclick=()=>questNextStep();

  // Render content based on type
  if(step.type==='video'){
    contentEl.innerHTML=`
      <h4 style="margin-bottom:8px;">${step.title}</h4>
      <p style="font-size:0.85rem;color:var(--text-secondary);margin-bottom:16px;">${step.desc}</p>
      <div style="position:relative;padding-bottom:56.25%;height:0;border-radius:12px;overflow:hidden;border:1px solid var(--border);">
        <iframe src="https://www.youtube.com/embed/${step.videoId}?rel=0" style="position:absolute;top:0;left:0;width:100%;height:100%;border:none;" allowfullscreen></iframe>
      </div>
      <div style="margin-top:12px;padding:10px;background:rgba(79,142,247,0.08);border:1px solid rgba(79,142,247,0.2);border-radius:8px;font-size:0.8rem;color:var(--text-secondary);">
        💡 Watch the full video before proceeding. The quiz in the next step will test your understanding.
      </div>`;
  } else if(step.type==='reading'){
    contentEl.innerHTML=`
      <h4 style="margin-bottom:12px;">${step.title}</h4>
      <div style="background:rgba(255,255,255,0.03);border:1px solid var(--border);border-radius:12px;padding:20px;max-height:400px;overflow-y:auto;line-height:1.7;">
        ${step.content}
      </div>`;
  } else if(step.type==='quiz'){
    let html=`<h4 style="margin-bottom:4px;">${step.title}</h4>
      <p style="font-size:0.82rem;color:var(--text-muted);margin-bottom:16px;">Select the correct answer for each question. You need at least ${Math.ceil(step.questions.length*0.6)}/${step.questions.length} correct to pass.</p>`;
    step.questions.forEach((q,qi)=>{
      html+=`<div style="margin-bottom:16px;padding:16px;background:rgba(255,255,255,0.03);border:1px solid var(--border);border-radius:10px;" id="quiz-q-${qi}">
        <div style="font-size:0.88rem;font-weight:600;margin-bottom:10px;color:var(--text-primary);">${qi+1}. ${q.q}</div>
        <div style="display:flex;flex-direction:column;gap:6px;">`;
      q.opts.forEach((o,oi)=>{
        html+=`<label style="display:flex;align-items:center;gap:10px;padding:10px 12px;border:1.5px solid var(--border);border-radius:8px;cursor:pointer;font-size:0.84rem;color:var(--text-secondary);transition:all 0.2s;" 
          onmouseover="this.style.borderColor='rgba(79,142,247,0.4)'" onmouseout="if(!this.querySelector('input').checked)this.style.borderColor='var(--border)'"
          onclick="this.style.borderColor='var(--accent-blue)';this.style.background='rgba(79,142,247,0.08)'">
          <input type="radio" name="qq${qi}" value="${oi}" style="accent-color:var(--accent-blue);"> ${o}
        </label>`;
      });
      html+=`</div></div>`;
    });
    contentEl.innerHTML=html;
    nextBtn.textContent=idx===total-1?'📝 Submit & Complete':'📝 Submit Answers';
    nextBtn.onclick=()=>submitQuiz(step,idx);
  } else if(step.type==='code'){
    contentEl.innerHTML=`
      <h4 style="margin-bottom:8px;">${step.title}</h4>
      <p style="font-size:0.85rem;color:var(--text-secondary);margin-bottom:12px;">${step.desc}</p>
      <textarea id="fp-code-editor" style="width:100%;height:200px;background:rgba(0,0,0,0.3);color:var(--accent-cyan);border:1px solid var(--border);border-radius:10px;padding:16px;font-family:'Courier New',monospace;font-size:0.85rem;resize:vertical;outline:none;line-height:1.6;" spellcheck="false">${step.starterCode}</textarea>
      <div style="margin-top:10px;padding:10px;background:rgba(16,212,142,0.08);border:1px solid rgba(16,212,142,0.2);border-radius:8px;font-size:0.8rem;color:var(--text-secondary);">
        💡 <strong>Hint:</strong> ${step.solutionHint}
      </div>`;
    nextBtn.textContent=idx===total-1?'✅ Submit & Complete':'Submit Code →';
    nextBtn.onclick=()=>submitCode(step,idx);
  }
}

function submitQuiz(step,stepIdx){
  const questions=step.questions;
  let correct=0;
  questions.forEach((q,qi)=>{
    const selected=document.querySelector(`input[name="qq${qi}"]:checked`);
    const container=document.getElementById(`quiz-q-${qi}`);
    if(selected&&parseInt(selected.value)===q.correct){
      correct++;
      container.style.borderColor='rgba(16,212,142,0.5)';
      container.style.background='rgba(16,212,142,0.05)';
    } else {
      container.style.borderColor='rgba(236,72,153,0.5)';
      container.style.background='rgba(236,72,153,0.05)';
    }
  });
  const needed=Math.ceil(questions.length*0.6);
  const passed=correct>=needed;
  const feedbackEl=document.getElementById('fp-quest-feedback');
  feedbackEl.style.display='block';

  if(passed){
    feedbackEl.style.background='rgba(16,212,142,0.1)';
    feedbackEl.style.border='1px solid rgba(16,212,142,0.3)';
    feedbackEl.innerHTML=`<div style="font-weight:700;color:var(--accent-green);margin-bottom:4px;">✅ Passed! ${correct}/${questions.length} correct</div>
      <div style="font-size:0.82rem;color:var(--text-secondary);">Great job! You've demonstrated solid understanding.</div>`;
    const isLast=stepIdx===currentContent.steps.length-1;
    const nextBtn=document.getElementById('fp-quest-next-btn');
    if(isLast){
      nextBtn.textContent='🎉 Claim XP & Complete';
      nextBtn.style.background='var(--gradient-green)';
      nextBtn.onclick=()=>finishQuest();
    } else {
      nextBtn.textContent='Next Step →';
      nextBtn.onclick=()=>questNextStep();
    }
  } else {
    feedbackEl.style.background='rgba(236,72,153,0.1)';
    feedbackEl.style.border='1px solid rgba(236,72,153,0.3)';
    feedbackEl.innerHTML=`<div style="font-weight:700;color:var(--accent-pink);margin-bottom:4px;">❌ Not passed. ${correct}/${questions.length} correct (need ${needed})</div>
      <div style="font-size:0.82rem;color:var(--text-secondary);">Review the material and try again. You can do this!</div>`;
    const nextBtn=document.getElementById('fp-quest-next-btn');
    nextBtn.textContent='🔄 Retry Quiz';
    nextBtn.onclick=()=>renderQuestStep(stepIdx);
  }
}

function submitCode(step,stepIdx){
  const code=document.getElementById('fp-code-editor').value;
  if(code.trim().length<30||code===step.starterCode){
    const feedbackEl=document.getElementById('fp-quest-feedback');
    feedbackEl.style.display='block';
    feedbackEl.style.background='rgba(249,115,22,0.1)';
    feedbackEl.style.border='1px solid rgba(249,115,22,0.3)';
    feedbackEl.innerHTML=`<div style="font-weight:700;color:var(--accent-orange);">⚠️ Please write your solution</div><div style="font-size:0.82rem;color:var(--text-secondary);">Modify the starter code with your implementation before submitting.</div>`;
    return;
  }
  const feedbackEl=document.getElementById('fp-quest-feedback');
  feedbackEl.style.display='block';
  feedbackEl.style.background='rgba(16,212,142,0.1)';
  feedbackEl.style.border='1px solid rgba(16,212,142,0.3)';
  feedbackEl.innerHTML=`<div style="font-weight:700;color:var(--accent-green);">✅ Code Submitted Successfully!</div><div style="font-size:0.82rem;color:var(--text-secondary);">Your solution has been recorded. Well done!</div>`;
  const isLast=stepIdx===currentContent.steps.length-1;
  const nextBtn=document.getElementById('fp-quest-next-btn');
  if(isLast){nextBtn.textContent='🎉 Claim XP & Complete';nextBtn.style.background='var(--gradient-green)';nextBtn.onclick=()=>finishQuest();}
  else{nextBtn.textContent='Next Step →';nextBtn.onclick=()=>questNextStep();}
}

function questNextStep(){
  const total=currentContent.steps.length;
  if(currentStepIdx<total-1){renderQuestStep(currentStepIdx+1);}
  else finishQuest();
}
function questPrevStep(){if(currentStepIdx>0)renderQuestStep(currentStepIdx-1);}

function finishQuest(){
  if(!currentQuest||STATE.completedQuests.includes(currentQuest.id))return;
  STATE.completedQuests.push(currentQuest.id);
  gainXP(currentQuest.xp);
  closeQuestModal();
  setTimeout(()=>{renderPaths(STATE.activePath);renderLeaderboard();showToast('🎯 Quest Complete!',currentQuest.name,'+'+currentQuest.xp+' XP');spawnXPParticle(currentQuest.xp);checkBadges();},200);
}

function closeQuestModal(){
  document.getElementById('fp-quest-modal').classList.remove('active');
  document.body.style.overflow='';
  clearInterval(questTimerInterval);
}

/* ═══════════ DAILY CHALLENGE MODAL ═══════════ */
function openDailyChallenge(challenge){
  if(challenge.done)return;
  currentQuest={id:challenge.id,name:challenge.title,xp:parseInt(challenge.xp.replace(/\D/g,''))};
  if(challenge.quiz){
    currentContent={steps:[{type:'quiz',title:'📝 '+challenge.title,questions:challenge.quiz}]};
  } else if(challenge.reading){
    currentContent={steps:[
      {type:'reading',title:'📖 '+challenge.title,content:challenge.reading},
      {type:'quiz',title:'📝 Comprehension Check',questions:[{q:'Did you read and understand the material?',opts:['Yes, I understood all concepts','I need to review again'],correct:0}]}
    ]};
  }
  currentStepIdx=0;questStartTime=Date.now();
  document.getElementById('fp-modal-icon').textContent=challenge.icon;
  document.getElementById('fp-modal-title').textContent=challenge.title;
  document.getElementById('fp-modal-type').textContent='Daily Challenge';
  document.getElementById('fp-modal-xp').textContent=challenge.xp;
  const tabsEl=document.getElementById('fp-quest-step-tabs');
  tabsEl.innerHTML='';
  currentContent.steps.forEach((s,i)=>{const t=document.createElement('button');t.className='fp-tab'+(i===0?' active':'');t.textContent=(i+1)+'. '+(s.type==='quiz'?'Quiz':'Read');tabsEl.appendChild(t);});
  renderQuestStep(0);
  document.getElementById('fp-quest-modal').classList.add('active');
  document.body.style.overflow='hidden';
  clearInterval(questTimerInterval);
  questTimerInterval=setInterval(()=>{const e=Math.floor((Date.now()-questStartTime)/1000);const el=document.getElementById('fp-quest-timer');if(el)el.textContent='⏱ '+Math.floor(e/60)+':'+(e%60<10?'0':'')+(e%60);},1000);
}

/* ═══════════ RENDER FUNCTIONS ═══════════ */
function getLevelTitle(l){return l>=15?'Grandmaster':l>=12?'Expert Developer':l>=9?'Senior Developer':l>=6?'Mid-Level Developer':l>=3?'Junior Developer':'Beginner';}

function renderHero(){
  const pct=Math.round((STATE.xp/STATE.xpToNext)*100);
  document.getElementById('fp-level-num').textContent=STATE.level;
  document.getElementById('fp-xp-current').textContent=STATE.xp.toLocaleString();
  document.getElementById('fp-xp-next').textContent=STATE.xpToNext.toLocaleString();
  document.getElementById('fp-xp-pct').textContent=pct+'%';
  setTimeout(()=>{const b=document.getElementById('fp-xp-fill');if(b)b.style.width=pct+'%';},300);
  document.getElementById('fp-stat-badges').textContent=STATE.earnedBadges.length;
  document.getElementById('fp-stat-streak').textContent=STATE.streak+' days';
  const total=Object.values(CAREER_PATHS).reduce((a,p)=>a+p.quests.length,0);
  document.getElementById('fp-stat-quests').textContent=STATE.completedQuests.filter(id=>!id.startsWith('dc')).length+'/'+total;
  document.getElementById('fp-user-level-label').textContent=getLevelTitle(STATE.level);
}

function renderStreak(){
  const days=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  const today=new Date().getDay();const todayIdx=today===0?6:today-1;
  const c=document.getElementById('fp-streak-days');if(!c)return;c.innerHTML='';
  days.forEach((d,i)=>{const div=document.createElement('div');div.className='streak-day';div.textContent=d[0];if(i<todayIdx)div.classList.add('done');else if(i===todayIdx)div.classList.add('today');c.appendChild(div);});
  document.getElementById('fp-streak-count').textContent=STATE.streak;
}

function renderPaths(pathKey){
  STATE.activePath=pathKey;saveState(STATE);
  document.querySelectorAll('.fp-tab[data-path]').forEach(t=>t.classList.toggle('active',t.dataset.path===pathKey));
  const path=CAREER_PATHS[pathKey];const c=document.getElementById('fp-quest-list');if(!c)return;c.innerHTML='';
  path.quests.forEach(q=>{
    const done=STATE.completedQuests.includes(q.id);
    const locked=q.reqQuests&&q.reqQuests.some(r=>!STATE.completedQuests.includes(r));
    const div=document.createElement('div');
    div.className='fp-quest'+(done?' completed':'')+(locked?' locked':!done?' active-quest':'');
    div.innerHTML=`<div class="fp-quest-check">${done?'✓':''}</div><div class="fp-quest-icon" style="background:${path.color}">${q.icon}</div><div style="flex:1;min-width:0;"><div class="fp-quest-name">${q.name}</div><div class="fp-quest-meta">${q.type} · ${q.time}${locked?' · 🔒 Complete prerequisites first':''}</div></div><div class="fp-quest-xp">${done?'✓':'+'} ${q.xp} XP</div>`;
    if(!locked)div.addEventListener('click',()=>openQuestModal(q,path,done));
    c.appendChild(div);
  });
  const tot=path.quests.length,dn=path.quests.filter(q=>STATE.completedQuests.includes(q.id)).length,pp=Math.round(dn/tot*100);
  const pe=document.getElementById('fp-path-progress'),pb=document.getElementById('fp-path-progress-bar');
  if(pe)pe.textContent=`${dn}/${tot} Completed · ${pp}%`;
  setTimeout(()=>{if(pb)pb.style.width=pp+'%';},200);
}

function renderBadges(){const c=document.getElementById('fp-badges-grid');if(!c)return;c.innerHTML='';BADGES.forEach(b=>{const earned=STATE.earnedBadges.includes(b.id);const d=document.createElement('div');d.className='fp-badge-card'+(earned?' earned':' locked-badge');d.title=b.desc;d.innerHTML=`${earned?'<span class="fp-badge-earned-star">★</span>':''}<div class="fp-badge-icon">${b.icon}</div><div class="fp-badge-name">${b.name}</div><div class="fp-badge-xp">+${b.xp} XP</div>`;c.appendChild(d);});}

function renderLeaderboard(){LEADERBOARD.find(l=>l.me)&&(LEADERBOARD.find(l=>l.me).xp=STATE.xp);LEADERBOARD.sort((a,b)=>b.xp-a.xp);const c=document.getElementById('fp-leaderboard');if(!c)return;c.innerHTML='';LEADERBOARD.forEach((u,i)=>{const r=i+1;const d=document.createElement('div');d.className='fp-lb-item'+(u.me?' me':'');const rc=r===1?'gold':r===2?'silver':r===3?'bronze':'';const re=r===1?'🥇':r===2?'🥈':r===3?'🥉':'#'+r;d.innerHTML=`<div class="fp-lb-rank ${rc}">${re}</div><div class="fp-lb-avatar" style="background:${u.color}">${u.initials}</div><div style="flex:1;min-width:0;"><div class="fp-lb-name">${u.name}${u.me?' <span style="font-size:0.65rem;color:var(--accent-green);">(You)</span>':''}</div><div class="fp-lb-level">Level ${u.level}</div></div><div class="fp-lb-xp">${u.xp.toLocaleString()} XP</div>`;c.appendChild(d);});}

function renderReadiness(){const ring=document.getElementById('fp-readiness-ring');if(ring){const s=STATE.jobReadiness;ring.innerHTML=`<svg width="110" height="110" viewBox="0 0 110 110"><defs><linearGradient id="fg-grad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#10d48e"/><stop offset="100%" stop-color="#06d6d6"/></linearGradient></defs><circle cx="55" cy="55" r="47" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="8"/><circle cx="55" cy="55" r="47" fill="none" stroke="url(#fg-grad)" stroke-width="8" stroke-linecap="round" stroke-dasharray="${2*Math.PI*47}" stroke-dashoffset="${2*Math.PI*47-(s/100)*2*Math.PI*47}" transform="rotate(-90 55 55)"/></svg><div class="score-ring-value"><span class="score-num">${s}%</span><span class="score-label">Job Ready</span></div>`;}
  const breakdown=[{label:'Technical Skills',pct:88,color:'#4f8ef7'},{label:'Soft Skills',pct:72,color:'#8b5cf6'},{label:'Projects',pct:65,color:'#10d48e'},{label:'Communication',pct:79,color:'#06d6d6'},{label:'Problem Solving',pct:82,color:'#f97316'}];
  const c=document.getElementById('fp-readiness-breakdown');if(!c)return;c.innerHTML='';
  breakdown.forEach(it=>{const d=document.createElement('div');d.className='fp-rb-item';d.innerHTML=`<div class="fp-rb-label"><span>${it.label}</span><span>${it.pct}%</span></div><div class="fp-rb-bar"><div class="fp-rb-fill" style="width:0%;background:${it.color};" data-pct="${it.pct}"></div></div>`;c.appendChild(d);});
  setTimeout(()=>{document.querySelectorAll('.fp-rb-fill').forEach(el=>{el.style.width=el.dataset.pct+'%';});},400);
}

function renderSkillMastery(){const skills=[{name:'React',pct:88,color:'#4f8ef7'},{name:'Node.js',pct:75,color:'#10d48e'},{name:'Python',pct:62,color:'#8b5cf6'},{name:'AWS',pct:48,color:'#06d6d6'},{name:'System Design',pct:70,color:'#f97316'},{name:'TypeScript',pct:83,color:'#ec4899'}];const c=document.getElementById('fp-skill-mastery');if(!c)return;c.innerHTML='';skills.forEach(s=>{const d=document.createElement('div');d.className='fp-skill-item';d.innerHTML=`<div class="fp-skill-label"><span class="fp-skill-name">${s.name}</span><span class="fp-skill-pct">${s.pct}%</span></div><div class="fp-skill-track"><div class="fp-skill-fill" style="width:0%;background:${s.color};" data-pct="${s.pct}"></div></div>`;c.appendChild(d);});setTimeout(()=>{document.querySelectorAll('.fp-skill-fill').forEach(el=>{el.style.width=el.dataset.pct+'%';});},400);}

function renderDailyChallenges(){const c=document.getElementById('fp-daily-challenges');if(!c)return;c.innerHTML='';DAILY_CHALLENGES.forEach(ch=>{ch.done=STATE.completedQuests.includes(ch.id);const d=document.createElement('div');d.className='fp-challenge-card'+(ch.done?' done':'');d.innerHTML=`<div class="fp-challenge-icon">${ch.icon}</div><div style="flex:1;min-width:0;"><div class="fp-challenge-title">${ch.done?'✅ ':''}${ch.title}</div><div class="fp-challenge-meta">${ch.desc}</div></div><div class="fp-challenge-reward"><span class="fp-quest-xp" style="margin-left:0;">${ch.xp}</span></div>`;if(!ch.done)d.addEventListener('click',()=>openDailyChallenge(ch));c.appendChild(d);});}

/* ═══════════ XP & BADGES ═══════════ */
function gainXP(amount){STATE.xp+=amount;while(STATE.xp>=STATE.xpToNext){STATE.xp-=STATE.xpToNext;STATE.level++;STATE.xpToNext=Math.round(STATE.xpToNext*1.4);setTimeout(()=>showToast('🎉 LEVEL UP!',`Level ${STATE.level} — ${getLevelTitle(STATE.level)}`,''),1200);}saveState(STATE);renderHero();renderLeaderboard();}
function checkBadges(){const g=[];if(STATE.completedQuests.length>=1&&!STATE.earnedBadges.includes('b3'))g.push('b3');if(STATE.streak>=7&&!STATE.earnedBadges.includes('b2'))g.push('b2');if(STATE.completedQuests.length>=5&&!STATE.earnedBadges.includes('b4'))g.push('b4');g.forEach(bId=>{STATE.earnedBadges.push(bId);const badge=BADGES.find(b=>b.id===bId);if(badge){setTimeout(()=>showToast('🏅 Badge Earned!',badge.name,'+'+badge.xp+' XP'),1800);gainXP(badge.xp);}});if(g.length){saveState(STATE);renderBadges();}}
function showToast(title,sub,xp){const t=document.getElementById('fp-toast');if(!t)return;t.querySelector('.fp-toast-title').textContent=title;t.querySelector('.fp-toast-sub').textContent=sub;t.querySelector('.fp-toast-xp').textContent=xp;t.classList.add('show');clearTimeout(t._timer);t._timer=setTimeout(()=>t.classList.remove('show'),4000);}
function spawnXPParticle(amount){const el=document.createElement('div');el.className='fp-xp-particle';el.textContent='+'+amount+' XP';el.style.left=(Math.random()*60+20)+'%';el.style.top='40%';document.body.appendChild(el);setTimeout(()=>el.remove(),1700);}

/* ═══════════ INIT ═══════════ */
document.addEventListener('DOMContentLoaded',()=>{
  renderHero();renderStreak();renderPaths(STATE.activePath);renderBadges();renderLeaderboard();renderReadiness();renderSkillMastery();renderDailyChallenges();
  document.querySelectorAll('.fp-tab[data-path]').forEach(tab=>{tab.addEventListener('click',()=>renderPaths(tab.dataset.path));});
  document.getElementById('fp-quest-modal')?.addEventListener('click',e=>{if(e.target===e.currentTarget)closeQuestModal();});
  document.getElementById('fp-toast')?.addEventListener('click',()=>{document.getElementById('fp-toast').classList.remove('show');});
});
