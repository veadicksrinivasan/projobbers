// internship.js

document.addEventListener('DOMContentLoaded', () => {
  // --- Data ---
  const roles = [
    {
      id: 'frontend',
      title: 'Frontend Developer',
      icon: '💻',
      desc: 'Build user interfaces, implement responsive designs, and integrate APIs.',
      company: 'TechNova Solutions',
      tasks: [
        {
          week: 1,
          title: 'UI Wireframing & Component Structure',
          desc: 'Your first task is to translate the design team\'s Figma file into a component hierarchy document. Outline the React components needed for the new e-commerce product page.',
          requirements: ['Identify at least 5 main components.', 'Describe props for each component.', 'Ensure mobile-first structure is considered.']
        },
        {
          week: 2,
          title: 'Develop Product Gallery Component',
          desc: 'Build the interactive product image gallery. It should allow users to click thumbnails to view the main image and include a zoom feature.',
          requirements: ['Use functional components and hooks.', 'Implement active state for thumbnails.', 'Ensure smooth transitions.']
        },
        {
          week: 3,
          title: 'API Integration for Product Data',
          desc: 'Fetch product details (price, description, variants) from the mock REST API and populate the UI dynamically. Handle loading and error states.',
          requirements: ['Use fetch or axios.', 'Implement a loading skeleton or spinner.', 'Handle 404/500 API errors gracefully.']
        },
        {
          week: 4,
          title: 'Performance Optimization & Accessibility',
          desc: 'Audit the page for accessibility (a11y) and performance. Implement lazy loading for images below the fold and ensure all interactive elements are keyboard accessible.',
          requirements: ['Achieve 90+ Lighthouse score.', 'Add aria-labels to buttons.', 'Implement React.lazy for heavy components.']
        }
      ]
    },
    {
      id: 'data',
      title: 'Data Analyst',
      icon: '📊',
      desc: 'Analyze datasets, build dashboards, and uncover business insights.',
      company: 'DataSync Analytics',
      tasks: [
        {
          week: 1,
          title: 'Data Cleaning & Preparation',
          desc: 'Take the raw Q3 sales dataset (CSV) and clean it using Python (Pandas). Handle missing values and normalize date formats.',
          requirements: ['Remove or impute null values.', 'Convert strings to datetime objects.', 'Output a clean CSV file.']
        },
        {
          week: 2,
          title: 'Exploratory Data Analysis (EDA)',
          desc: 'Perform EDA on the cleaned dataset. Identify the top 3 performing product categories and calculate the month-over-month growth rate.',
          requirements: ['Use groupby operations.', 'Calculate percentage changes.', 'Provide a brief summary of findings.']
        },
        {
          week: 3,
          title: 'Data Visualization',
          desc: 'Create visualizations using Matplotlib or Seaborn. Build a bar chart for category performance and a line chart for daily revenue.',
          requirements: ['Ensure clear labels and titles.', 'Use a cohesive color palette.', 'Save plots as high-res images.']
        },
        {
          week: 4,
          title: 'Dashboard Creation & Presentation',
          desc: 'Compile your findings and visuals into a final PDF report or a Tableau/PowerBI dashboard link to present to the stakeholders.',
          requirements: ['Include an executive summary.', 'Highlight 2 key actionable insights.', 'Ensure professional formatting.']
        }
      ]
    },
    {
      id: 'marketing',
      title: 'Marketing Intern',
      icon: '📱',
      desc: 'Plan campaigns, write copy, and analyze social media metrics.',
      company: 'GrowthGen Agency',
      tasks: [
        {
          week: 1,
          title: 'Competitor Analysis',
          desc: 'Analyze 3 main competitors in the SaaS space. Document their social media posting frequency, tone of voice, and main content themes.',
          requirements: ['Create a comparison matrix.', 'Identify 1 gap in their strategies.', 'Submit as a PDF or spreadsheet.']
        },
        {
          week: 2,
          title: 'Campaign Copywriting',
          desc: 'Write email copy for our upcoming feature launch. Create a subject line, preview text, and a 3-paragraph body with a clear CTA.',
          requirements: ['Subject line under 50 chars.', 'Persuasive, action-oriented tone.', 'Clear Call-to-Action button text.']
        },
        {
          week: 3,
          title: 'Social Media Calendar',
          desc: 'Draft a 1-week social media content calendar for LinkedIn and Twitter. Include text, suggested image descriptions, and hashtags.',
          requirements: ['3 posts for LinkedIn, 5 for Twitter.', 'Include relevant industry hashtags.', 'Vary content types (poll, video idea, article).']
        },
        {
          week: 4,
          title: 'Campaign Analytics Review',
          desc: 'Review the mock metrics from last month\'s ad campaign. Calculate the CTR (Click-Through Rate) and Cost Per Acquisition (CPA) and suggest one improvement.',
          requirements: ['Accurate metric calculations.', 'Identify the underperforming ad set.', 'Suggest a concrete A/B test for next time.']
        }
      ]
    }
  ];

  // --- State ---
  let currentRole = null;
  let currentWeek = 1; // 1 to 4
  const totalWeeks = 4;

  // --- DOM Elements ---
  const rolesContainer = document.getElementById('rolesContainer');
  const btnStartInternship = document.getElementById('btnStartInternship');
  const btnBackToRoles = document.getElementById('btnBackToRoles');
  const btnAcceptOffer = document.getElementById('btnAcceptOffer');
  const btnViewTask = document.getElementById('btnViewTask');
  const btnBackToDashboard = document.getElementById('btnBackToDashboard');
  const btnSubmitTask = document.getElementById('btnSubmitTask');
  const btnNextWeek = document.getElementById('btnNextWeek');

  // --- Initialization ---
  function init() {
    // Populate Roles
    roles.forEach(role => {
      const card = document.createElement('div');
      card.className = 'role-card';
      card.dataset.role = role.id;
      card.innerHTML = `
        <div class="role-icon">${role.icon}</div>
        <div class="role-title">${role.title}</div>
        <div class="role-desc">${role.desc}</div>
      `;
      card.addEventListener('click', () => selectRole(role.id, card));
      rolesContainer.appendChild(card);
    });

    // Event Listeners for Transitions
    btnStartInternship.addEventListener('click', () => switchView('view-onboarding'));
    btnBackToRoles.addEventListener('click', () => switchView('view-role-selection'));
    btnAcceptOffer.addEventListener('click', () => {
      currentWeek = 1; // reset on accept
      renderDashboard();
      switchView('view-dashboard');
    });
    btnViewTask.addEventListener('click', () => {
      renderTaskDetail();
      switchView('view-task-detail');
    });
    btnBackToDashboard.addEventListener('click', () => switchView('view-dashboard'));
    btnSubmitTask.addEventListener('click', simulateSubmission);
    btnNextWeek.addEventListener('click', handleNextWeek);

    // Profile Details
    const dashName = localStorage.getItem('pj_dash_name') || 'Arjun Kumar';
    document.getElementById('offerName').innerText = dashName;
    document.getElementById('certName').innerText = dashName;
    
    const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    document.getElementById('offerDate').innerText = today;
    document.getElementById('certDate').innerText = today;

    // Attach file simulation
    document.getElementById('submissionFile').addEventListener('change', (e) => {
      if(e.target.files.length > 0) {
        document.getElementById('attachedFileName').innerText = e.target.files[0].name;
      }
    });
  }

  // --- Core Logic ---
  function selectRole(roleId, cardElement) {
    document.querySelectorAll('.role-card').forEach(c => c.classList.remove('selected'));
    cardElement.classList.add('selected');
    currentRole = roles.find(r => r.id === roleId);
    btnStartInternship.disabled = false;

    // Pre-fill Onboarding View
    document.getElementById('offerCompany').innerText = currentRole.company;
    document.querySelectorAll('.offerCompanyText').forEach(el => el.innerText = currentRole.company);
    document.getElementById('offerRole').innerText = currentRole.title;
  }

  function switchView(viewId) {
    document.querySelectorAll('.view-section').forEach(v => v.classList.remove('active'));
    document.getElementById(viewId).classList.add('active');
    window.scrollTo(0, 0);
  }

  function renderDashboard() {
    document.getElementById('dashCompanyName').innerText = currentRole.company;
    document.getElementById('dashRoleName').innerText = currentRole.title;

    const timelineContainer = document.getElementById('timelineContainer');
    timelineContainer.innerHTML = '';

    currentRole.tasks.forEach((task, index) => {
      const stepNum = index + 1;
      const stepEl = document.createElement('div');
      stepEl.className = 'timeline-step';
      
      if (stepNum < currentWeek) {
        stepEl.classList.add('completed');
      } else if (stepNum === currentWeek) {
        stepEl.classList.add('active');
      }

      stepEl.innerHTML = `
        <div class="step-indicator">${stepNum < currentWeek ? '✓' : stepNum}</div>
        <div class="step-content">
          <div class="step-title">Week ${stepNum}: ${task.title}</div>
          <div class="step-desc">${stepNum < currentWeek ? 'Completed & Evaluated' : (stepNum === currentWeek ? 'In Progress — Deadline: Friday' : 'Locked')}</div>
        </div>
      `;
      timelineContainer.appendChild(stepEl);
    });

    // Update Task Preview
    const currentTaskData = currentRole.tasks[currentWeek - 1];
    document.getElementById('previewTaskTitle').innerText = `Week ${currentWeek}: ${currentTaskData.title}`;
    document.getElementById('previewTaskDesc').innerText = currentTaskData.desc;
  }

  function renderTaskDetail() {
    const task = currentRole.tasks[currentWeek - 1];
    document.getElementById('taskDetailTitle').innerText = `Week ${currentWeek}: ${task.title}`;
    document.getElementById('taskDetailDesc').innerText = task.desc;
    
    const reqList = document.getElementById('taskRequirements');
    reqList.innerHTML = '';
    task.requirements.forEach(req => {
      const li = document.createElement('li');
      li.innerText = req;
      reqList.appendChild(li);
    });

    // Reset inputs
    document.getElementById('submissionText').value = '';
    document.getElementById('submissionFile').value = '';
    document.getElementById('attachedFileName').innerText = 'No file attached';
  }

  function simulateSubmission() {
    const text = document.getElementById('submissionText').value.trim();
    const file = document.getElementById('submissionFile').files.length > 0;

    if (!text && !file) {
      alert("Please provide a link/text or attach a file to submit.");
      return;
    }

    // Change button state
    btnSubmitTask.innerText = "Evaluating...";
    btnSubmitTask.disabled = true;

    setTimeout(() => {
      btnSubmitTask.innerText = "Submit for Evaluation";
      btnSubmitTask.disabled = false;
      renderFeedback();
      switchView('view-feedback');
    }, 2000); // 2 second mock delay
  }

  function renderFeedback() {
    // Generate mock feedback based on role and week
    const feedbackList = [
      {
        summary: "Excellent work! You've clearly understood the requirements. Your implementation is clean and adheres to industry standards. A few minor tweaks could make it perfect, but overall a very strong submission.",
        pros: ["Great attention to detail.", "Followed all core requirements.", "Delivered on time."],
        cons: ["Could add more comments to the code/document.", "Consider edge cases a bit more deeply."]
      },
      {
        summary: "Good effort. The core functionality is there, but there is room for improvement in optimization and formatting. Review the feedback points to refine your approach.",
        pros: ["Core logic is correct.", "Good use of standard patterns."],
        cons: ["Formatting could be more professional.", "Missed a minor edge case handling."]
      }
    ];

    const fb = feedbackList[Math.floor(Math.random() * feedbackList.length)];
    
    document.getElementById('feedbackSummary').innerText = fb.summary;
    
    const prosList = document.getElementById('feedbackPros');
    prosList.innerHTML = '';
    fb.pros.forEach(p => {
      const li = document.createElement('li');
      li.innerText = p;
      prosList.appendChild(li);
    });

    const consList = document.getElementById('feedbackCons');
    consList.innerHTML = '';
    fb.cons.forEach(c => {
      const li = document.createElement('li');
      li.innerText = c;
      consList.appendChild(li);
    });

    // Change Next button text if it's the last week
    if (currentWeek === totalWeeks) {
      btnNextWeek.innerText = "View Your Certificate 🏆";
      btnNextWeek.style.background = "var(--gradient-green)";
    } else {
      btnNextWeek.innerText = "Proceed to Next Week →";
      btnNextWeek.style.background = "var(--gradient-purple)";
    }
  }

  function handleNextWeek() {
    if (currentWeek < totalWeeks) {
      currentWeek++;
      renderDashboard();
      switchView('view-dashboard');
    } else {
      renderCertificate();
      switchView('view-certificate');
    }
  }

  function renderCertificate() {
    document.getElementById('certRole').innerText = currentRole.title;
    document.getElementById('certCompany').innerText = currentRole.company;
  }

  // --- Run Init ---
  init();
});
