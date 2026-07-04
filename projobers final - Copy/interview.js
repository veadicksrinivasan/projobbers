let currentSessionQuestions = [];
let currentSessionIndex = 0;

let mediaRecorder;
let recordedChunks = [];
let stream;
let timerInterval;
let startTime;

let recognition;
let transcriptText = "";

const videoPreview = document.getElementById('videoPreview');
const questionText = document.getElementById('questionText');
const btnNextQuestion = document.getElementById('btnNextQuestion');
const btnStartRecord = document.getElementById('btnStartRecord');
const btnStopRecord = document.getElementById('btnStopRecord');
const btnPlay = document.getElementById('btnPlay');
const btnRetake = document.getElementById('btnRetake');
const btnAnalyze = document.getElementById('btnAnalyze');
const recordingIndicator = document.getElementById('recordingIndicator');
const timerDisplay = document.getElementById('timerDisplay');
const loadingOverlay = document.getElementById('loadingOverlay');
const analysisContainer = document.getElementById('analysisContainer');

const btnSpeakQuestion = document.getElementById('btnSpeakQuestion');
const btnSpeakSuggestion = document.getElementById('btnSpeakSuggestion');

// New Configuration Elements
const fieldSelect = document.getElementById('fieldSelect');
const levelSelect = document.getElementById('levelSelect');
const btnStartInterviewSession = document.getElementById('btnStartInterviewSession');
const interviewHeader = document.getElementById('interviewHeader');
const interviewWorkspace = document.getElementById('interviewWorkspace');
const setupCard = document.getElementById('setupCard');

// Stats Elements
const scoreNum = document.getElementById('scoreNum');
const strengthsList = document.getElementById('strengthsList');
const weaknessList = document.getElementById('weaknessList');
const toneText = document.getElementById('toneText');
const suggestedText = document.getElementById('suggestedText');

function init() {
  setupCamera();

  if (btnStartInterviewSession) {
    btnStartInterviewSession.addEventListener('click', startInterviewSession);
  }
  btnNextQuestion.addEventListener('click', nextSessionQuestion);
  btnStartRecord.addEventListener('click', startRecording);
  btnStopRecord.addEventListener('click', stopRecording);
  btnPlay.addEventListener('click', playRecording);
  btnRetake.addEventListener('click', retakeRecording);
  btnAnalyze.addEventListener('click', analyzeRecording);
  
  if (btnSpeakQuestion) {
    btnSpeakQuestion.addEventListener('click', () => speakText('questionText', btnSpeakQuestion));
  }
  if (btnSpeakSuggestion) {
    btnSpeakSuggestion.addEventListener('click', () => speakText('suggestedText', btnSpeakSuggestion));
  }
}

function generateInterviewQuestions(field, level) {
  let questions = [];
  
  const fieldTopics = {
    "HTML & CSS Learning": ["semantic HTML structure", "CSS specificity", "flexbox alignment", "CSS grid systems", "responsive media queries", "browser rendering", "box model properties", "CSS preprocessors like Sass", "web accessibility standards"],
    "Python Development": ["list comprehensions", "decorators and generators", "multithreading vs multiprocessing", "dictionary performance", "context managers", "PEP 8 standards", "error handling patterns", "testing with pytest", "API development with FastAPI"],
    "React Frontend": ["hooks lifecycle (useEffect/useMemo)", "virtual DOM reconciliation", "state management (Context/Redux)", "higher-order components", "conditional rendering", "React performance optimization", "server-side rendering basics", "routing patterns", "custom hook design"],
    "Artificial Intelligence": ["backpropagation algorithms", "convolutional neural networks", "natural language processing", "reinforcement learning", "supervised vs unsupervised learning", "gradient descent optimization", "overfitting and regularization", "model evaluation metrics", "feature selection"],
    "Full-Stack Web Development": ["database normalized design", "REST vs GraphQL APIs", "frontend-backend state sync", "OAuth 2.0 implementation", "serverless functions", "containerization with Docker", "CI/CD pipelines", "caching with Redis", "web security (CORS/XSS)"],
    "Data Science & ML": ["statistical hypothesis testing", "exploratory data analysis", "random forest algorithms", "logistic vs linear regression", "data imputation techniques", "ROC curves and AUC", "clustering methods (K-Means)", "time series forecasting", "big data processing"],
    "Cybersecurity": ["SQL injection prevention", "cross-site scripting (XSS) mitigation", "penetration testing methodology", "encryption at rest and transit", "zero-trust architecture", "identity and access management", "incident response planning", "network traffic analysis", "OWASP Top 10 vulnerabilities"]
  };
  
  const workTopics = ["dealing with a difficult team member", "managing tight deadlines", "adapting to a new tech stack", "handling codebase legacy issues", "communicating with non-technical stakeholders", "mentoring junior developers", "handling production incidents", "receiving critical feedback", "conflict resolution"];

  const generateQ = (type, complexity) => {
    const topics = type === "field" ? (fieldTopics[field] || fieldTopics["Full Stack Development"]) : workTopics;
    const topic = topics[Math.floor(Math.random() * topics.length)];
    if (type === "work") {
      return `When joining a new company, how would you handle ${topic} at a ${complexity} scale?`;
    } else {
      return `Can you explain your experience with ${topic} and how you would tackle a ${complexity} problem related to it?`;
    }
  };

  const levelStr = level === "Easy" ? "basic" : level === "Medium" ? "moderately complex" : "highly advanced";

  if (level === "Easy") {
    // Special case for HTML & CSS Learning - use specific user requested questions
    if (field === "HTML & CSS Learning") {
      questions = [
        "What is the difference between HTML and CSS?",
        "What are HTML tags?",
        "What is the difference between class and id in CSS?",
        "What is the box model in CSS?",
        "What is the difference between inline, internal, and external CSS?"
      ];
      // Still add a few work topics for variety
      for(let i=0; i<3; i++) questions.push(generateQ("work", levelStr));
    } else {
      // 15 field, 5 work
      for(let i=0; i<15; i++) questions.push(generateQ("field", levelStr));
      for(let i=0; i<5; i++) questions.push(generateQ("work", levelStr));
    }
  } else if (level === "Medium") {
    // Let's do 12 field, 8 work
    for(let i=0; i<12; i++) questions.push(generateQ("field", levelStr));
    for(let i=0; i<8; i++) questions.push(generateQ("work", levelStr));
  } else {
    // Difficult: 10 field, 10 work
    for(let i=0; i<10; i++) questions.push(generateQ("field", levelStr));
    for(let i=0; i<10; i++) questions.push(generateQ("work", levelStr));
  }
  
  // Shuffle randomly
  return questions.sort(() => Math.random() - 0.5);
}

function startInterviewSession() {
  const field = fieldSelect.value;
  const level = levelSelect.value;
  
  currentSessionQuestions = generateInterviewQuestions(field, level);
  currentSessionIndex = 0;
  
  if (setupCard) setupCard.style.display = 'none';
  if (interviewHeader) interviewHeader.style.display = 'block';
  if (interviewWorkspace) interviewWorkspace.style.display = 'block';
  
  displayCurrentSessionQuestion();
}

function nextSessionQuestion() {
  if (currentSessionIndex < currentSessionQuestions.length - 1) {
    currentSessionIndex++;
    displayCurrentSessionQuestion();
    
    // Reset video area for new recording
    resetForNewQuestion();
  } else {
    questionText.innerText = "Interview Complete! Great job.";
    btnNextQuestion.style.display = 'none';
  }
}

function displayCurrentSessionQuestion() {
  questionText.innerText = `Q${currentSessionIndex + 1}/${currentSessionQuestions.length}: ${currentSessionQuestions[currentSessionIndex]}`;
}

function resetForNewQuestion() {
  if (mediaRecorder && mediaRecorder.state !== 'inactive') {
    mediaRecorder.stop();
  }
  clearInterval(timerInterval);
  recordingIndicator.classList.remove('active');
  timerDisplay.innerText = "00:00";
  
  videoPreview.pause();
  videoPreview.removeAttribute('src');
  videoPreview.srcObject = stream;
  videoPreview.controls = false;
  videoPreview.muted = true;
  videoPreview.play();

  analysisContainer.classList.remove('active');

  btnPlay.style.display = 'none';
  btnRetake.style.display = 'none';
  btnAnalyze.style.display = 'none';
  btnStartRecord.style.display = 'inline-flex';
  btnStopRecord.style.display = 'none';
}

async function setupCamera() {
  try {
    stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    videoPreview.srcObject = stream;
    videoPreview.muted = true; // Mute live preview
  } catch (err) {
    console.error("Error accessing media devices.", err);
    alert("Could not access camera/microphone. Please ensure permissions are granted.");
  }
}

function startRecording() {
  recordedChunks = [];
  try {
    mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
  } catch (e) {
    mediaRecorder = new MediaRecorder(stream);
  }

  mediaRecorder.ondataavailable = event => {
    if (event.data.size > 0) {
      recordedChunks.push(event.data);
    }
  };

  mediaRecorder.onstop = () => {
    const blob = new Blob(recordedChunks, { type: 'video/webm' });
    const videoURL = URL.createObjectURL(blob);
    videoPreview.srcObject = null;
    videoPreview.src = videoURL;
    videoPreview.controls = true;
    
    btnPlay.style.display = 'inline-flex';
    btnRetake.style.display = 'inline-flex';
    btnAnalyze.style.display = 'inline-flex';
    btnStartRecord.style.display = 'none';
    btnStopRecord.style.display = 'none';
  };

  mediaRecorder.start();
  
  btnStartRecord.style.display = 'none';
  btnStopRecord.style.display = 'inline-flex';
  recordingIndicator.classList.add('active');
  
  // Start Speech Recognition
  transcriptText = "";
  if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRec();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.onresult = function(event) {
      let currentInterim = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          transcriptText += event.results[i][0].transcript + " ";
        } else {
          currentInterim += event.results[i][0].transcript;
        }
      }
    };
    try {
      recognition.start();
    } catch (e) {
      console.warn("Speech recognition failed to start", e);
    }
  }

  startTime = Date.now();
  timerInterval = setInterval(() => {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const mins = String(Math.floor(elapsed / 60)).padStart(2, '0');
    const secs = String(elapsed % 60).padStart(2, '0');
    timerDisplay.innerText = `${mins}:${secs}`;
  }, 1000);
}

function stopRecording() {
  if (mediaRecorder.state !== 'inactive') {
    mediaRecorder.stop();
  }
  if (recognition) {
    try {
      recognition.stop();
    } catch (e) {}
  }
  recordingIndicator.classList.remove('active');
  clearInterval(timerInterval);
}

function playRecording() {
  videoPreview.play();
}

function retakeRecording() {
  resetForNewQuestion();
}

async function analyzeRecording() {
  if (recordedChunks.length === 0) {
    alert("No recording found. Please record your answer first.");
    return;
  }
  
  if (window.location.protocol === 'file:') {
    alert("Warning: You are accessing this page directly via a file path. Please open it via http://localhost:8000/interview.html for the AI analysis to work.");
  }
  
  loadingOverlay.classList.add('active');
  
  const blob = new Blob(recordedChunks, { type: 'video/webm' });
  const formData = new FormData();
  formData.append('video', blob, 'interview.webm');
  
  // Get current question from array if exists, else generic fallback
  const currentQ = currentSessionQuestions[currentSessionIndex] || "Unknown question";
  formData.append('question', currentQ);
  formData.append('transcript', transcriptText.trim());

  try {
    const data = await window.API.analyzeInterview(formData);
    displayAnalysis(data);
  } catch (error) {
    console.error("Interview mapping error:", error);
  } finally {
    loadingOverlay.classList.remove('active');
  }

}

function displayAnalysis(data) {
  analysisContainer.classList.add('active');
  
  setTimeout(() => {
    analysisContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);

  scoreNum.innerText = data.score;
  
  strengthsList.innerHTML = '';
  data.strengths.forEach(str => {
    const li = document.createElement('li');
    li.innerText = str;
    strengthsList.appendChild(li);
  });

  weaknessList.innerHTML = '';
  data.areas_for_improvement.forEach(weak => {
    const li = document.createElement('li');
    li.innerText = weak;
    weaknessList.appendChild(li);
  });

  toneText.innerText = data.tone_analysis || "No tone detected.";
  suggestedText.innerText = data.suggested_answer || "No suggestions available.";
}

function speakText(elementId, btnElement) {
  const element = document.getElementById(elementId);
  if (!element) return;
  
  let text = element.innerText;
  if (!text || text.includes("Loading")) return;

  // If already speaking, stop it
  if (window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
    // If the same button was clicked, just stop and return
    if (btnElement.classList.contains('speaking')) {
      btnElement.classList.remove('speaking');
      return;
    }
  }

  // Clear 'speaking' class from all speaker buttons first
  document.querySelectorAll('.btn-speaker').forEach(btn => btn.classList.remove('speaking'));

  const utterance = new SpeechSynthesisUtterance(text);
  
  utterance.onstart = () => {
    btnElement.classList.add('speaking');
  };
  
  utterance.onend = () => {
    btnElement.classList.remove('speaking');
  };
  
  utterance.onerror = () => {
    btnElement.classList.remove('speaking');
  };

  window.speechSynthesis.speak(utterance);
}

document.addEventListener('DOMContentLoaded', init);
