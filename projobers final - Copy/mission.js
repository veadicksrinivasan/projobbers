// mission.js

document.addEventListener('DOMContentLoaded', () => {
  const roleCards = document.querySelectorAll('#roleGrid .selection-card');
  const diffCards = document.querySelectorAll('#difficultyGrid .selection-card');
  const diffWrapper = document.getElementById('difficultyWrapper');
  const btnGenerateMissions = document.getElementById('btnGenerateMissions');
  
  const configSection = document.getElementById('config-section');
  const listSection = document.getElementById('mission-list-section');
  const activeSection = document.getElementById('active-mission-section');
  const resultsSection = document.getElementById('results-section');
  
  const missionListGrid = document.getElementById('missionListGrid');
  
  let selectedRole = null;
  let selectedDiff = null;
  let activeMissionData = null;
  
  // 1. ROLE AND DIFFICULTY SELECTION
  roleCards.forEach(card => {
    card.addEventListener('click', () => {
      roleCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      selectedRole = card.getAttribute('data-role');
      
      diffWrapper.style.opacity = '1';
      diffWrapper.style.pointerEvents = 'auto';
      checkGenerateReady();
    });
  });

  diffCards.forEach(card => {
    card.addEventListener('click', () => {
      diffCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      selectedDiff = card.getAttribute('data-diff');
      checkGenerateReady();
    });
  });

  function checkGenerateReady() {
    if (selectedRole && selectedDiff) {
      btnGenerateMissions.removeAttribute('disabled');
    } else {
      btnGenerateMissions.setAttribute('disabled', 'true');
    }
  }

  // 2. GENERATE MISSIONS
  btnGenerateMissions.addEventListener('click', () => {
    generateMissions(selectedRole, selectedDiff);
    configSection.classList.add('hidden');
    listSection.classList.remove('hidden');
  });

  function generateMissions(role, diff) {
    document.getElementById('missionListCounts').innerText = `(${role} - ${diff})`;
    missionListGrid.innerHTML = '';
    
    // Generate 10 mock projects dynamically based on selection
    for (let i = 1; i <= 10; i++) {
      const project = createProjectData(role, diff, i);
      const card = document.createElement('div');
      card.className = 'mission-item-card';
      card.innerHTML = `
        <div class="mission-item-title">${project.title}</div>
        <div class="mission-item-desc">${project.description}</div>
        <button class="btn btn-outline btn-sm" style="margin-top:auto;">View Mission</button>
      `;
      card.addEventListener('click', () => openActiveMission(project));
      missionListGrid.appendChild(card);
    }
  }

  function createProjectData(role, diff, index) {
      let titleBase = "";
      if (role === "HTML/CSS") titleBase = "Web Page";
      if (role === "React") titleBase = "SPA Component";
      if (role === "Python") titleBase = "Backend Logic";
      if (role === "Java") titleBase = "Enterprise Service";

      const diffAdjectives = {
          "Easy": ["Basic", "Simple", "Introductory", "Beginner's"],
          "Medium": ["Interactive", "Advanced", "Dynamic", "Data-driven"],
          "Hard": ["Complex", "Full-scale", "Scalable", "High-performance"]
      };

      const templates = [
          "Personal Portfolio Page",
          "Weather Dashboard App",
          "E-commerce Shopping Cart",
          "Authentication Flow system",
          "Task Management System",
          "Real-time Chat Interface",
          "Data Visualization Tool",
          "API Integration Wrapper",
          "Inventory Management script",
          "Blog Platform MVP"
      ];

      const template = templates[(index-1) % templates.length];
      const adj = diffAdjectives[diff][index % 4];

      return {
          title: `Project ${index}: ${adj} ${template} using ${role}`,
          role: role,
          difficulty: diff,
          description: `You are tasked to build a ${adj.toLowerCase()} ${template.toLowerCase()}. Focus on writing clean code and ensuring all main requirements are met. This mission is designed to test your ${diff.toLowerCase()} level ${role} skills.`,
          objectives: [
              `Set up the initial environment for a ${role} project.`,
              `Implement the core UI/logic for the ${template}.`,
              `Ensure the code handles basic edge cases.`,
              `Document the process using standard comments.`
          ],
          tips: [
              `Break down the tasks into smaller logical components.`,
              `Use descriptive variable names for clarity.`,
              `If you get stuck, remember to verify your imports/linking first.`,
              `Test each component independently.`
          ]
      };
  }

  // 3. OPEN ACTIVE MISSION
  function openActiveMission(project) {
    activeMissionData = project;
    listSection.classList.add('hidden');
    activeSection.classList.remove('hidden');
    
    document.getElementById('am-title').innerText = project.title;
    document.getElementById('am-role-tag').innerText = project.role;
    document.getElementById('am-diff-tag').innerText = project.difficulty;
    document.getElementById('am-desc').innerText = project.description;
    
    document.getElementById('am-objectives').innerHTML = project.objectives.map(o => `<li>${o}</li>`).join('');
    document.getElementById('am-tips').innerHTML = project.tips.map(t => `<li>${t}</li>`).join('');

    // reset proof state
    proofBlob = null;
    proofFile = null;
    document.getElementById('proofPreview').classList.add('hidden');
    document.getElementById('videoPreview').classList.add('hidden');
    document.getElementById('filePreview').classList.add('hidden');
  }

  document.getElementById('btnSelectAnother').addEventListener('click', () => {
    activeSection.classList.add('hidden');
    listSection.classList.remove('hidden');
  });

  // 4. PROOF COLLECTION (Screen Record / Flow)
  let mediaRecorder;
  let recordedChunks = [];
  let stream;
  let proofBlob = null;
  let proofFile = null;

  const btnStartRecord = document.getElementById('btnStartRecord');
  const btnStopRecord = document.getElementById('btnStopRecord');
  const fileUpload = document.getElementById('fileUpload');
  const proofPreview = document.getElementById('proofPreview');
  const videoPreview = document.getElementById('videoPreview');
  const filePreview = document.getElementById('filePreview');
  const fileNameDisplay = document.getElementById('fileName');

  btnStartRecord.addEventListener('click', async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia) {
        throw new Error("Display Media API not supported (likely due to file:// protocol).");
      }
      stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      mediaRecorder = new MediaRecorder(stream);
      recordedChunks = [];
      
      mediaRecorder.ondataavailable = function(e) {
        if (e.data.size > 0) {
          recordedChunks.push(e.data);
        }
      };
      
      mediaRecorder.onstop = function() {
        proofBlob = new Blob(recordedChunks, { type: 'video/webm' });
        const videoURL = URL.createObjectURL(proofBlob);
        
        proofPreview.classList.remove('hidden');
        videoPreview.classList.remove('hidden');
        filePreview.classList.add('hidden');
        videoPreview.src = videoURL;
        proofFile = null; // Clear file context
        
        // Stop stream tracks
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }
        
        btnStartRecord.style.display = 'inline-flex';
        btnStopRecord.style.display = 'none';
      };
      
      mediaRecorder.start();
      btnStartRecord.style.display = 'none';
      btnStopRecord.style.display = 'inline-flex';
    } catch(err) {
      console.warn("Screen recording fallback engaged:", err.message);
      alert("Screen recording is not fully supported in this environment (likely due to local file access). We will simulate a recorded submission for you.");
      
      // Fallback: Simulate a recording process
      btnStartRecord.style.display = 'none';
      btnStopRecord.style.display = 'inline-flex';
      
      mediaRecorder = {
        state: 'recording',
        stop: function() {
          this.state = 'inactive';
          proofBlob = new Blob(["mock video data"], { type: 'video/webm' });
          
          proofPreview.classList.remove('hidden');
          videoPreview.classList.add('hidden'); // hide video since it's just dummy data
          filePreview.classList.remove('hidden');
          document.getElementById('fileName').innerText = "mock-screen-recording.webm";
          proofFile = null;
          
          btnStartRecord.style.display = 'inline-flex';
          btnStopRecord.style.display = 'none';
        }
      };
    }
  });

  btnStopRecord.addEventListener('click', () => {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
    }
  });

  fileUpload.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
        proofFile = e.target.files[0];
        proofBlob = null; // Clear video context
        
        proofPreview.classList.remove('hidden');
        filePreview.classList.remove('hidden');
        videoPreview.classList.add('hidden');
        fileNameDisplay.innerText = proofFile.name;
    }
  });

  // 5. SUBMIT MISSION
  document.getElementById('btnSubmitMission').addEventListener('click', async () => {
    if (!proofBlob && !proofFile) {
        alert("Please provide proof of your work (Record Screen or Upload File).");
        return;
    }
    
    // Show loading state
    const btn = document.getElementById('btnSubmitMission');
    const originalText = btn.innerHTML;
    btn.innerHTML = 'Evaluating with AI... ⏳';
    btn.setAttribute('disabled', 'true');
    
    try {
      const formData = new FormData();
      formData.append('title', activeMissionData.title);
      formData.append('role', activeMissionData.role);
      formData.append('difficulty', activeMissionData.difficulty);
      formData.append('description', activeMissionData.description);

      // Use Centralized API Client
      const data = await window.API.evaluateMission(formData);
      
      const score = data.score;
      const feedbackItems = Array.isArray(data.feedback) ? data.feedback : [data.feedback];

      // Display Results
      document.getElementById('resultScore').innerText = `${score}/10`;
      const ul = document.getElementById('resultFeedback');
      ul.innerHTML = '';
      feedbackItems.forEach(item => {
        const li = document.createElement('li');
        li.innerText = item;
        ul.appendChild(li);
      });

      activeSection.classList.add('hidden');
      resultsSection.classList.remove('hidden');
      window.scrollTo(0, 0);

    } catch (error) {
      console.error("Evaluation error:", error);
      alert("Failed to evaluate mission. Please try again.");
    } finally {
      btn.innerHTML = originalText;
      btn.removeAttribute('disabled');
    }

  });

  // 6. RESTART
  document.getElementById('btnRestartMission').addEventListener('click', () => {
    resultsSection.classList.add('hidden');
    listSection.classList.remove('hidden');
    // Or go back to config
    // listSection.classList.add('hidden');
    // configSection.classList.remove('hidden');
  });

});
