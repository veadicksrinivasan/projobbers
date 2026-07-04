// community.js - Interactive Hub for Interview Experiences

const mockExperiences = [
  {
    id: 1,
    userName: "Siddharth Verma",
    company: "Google",
    role: "L3 Software Engineer",
    date: "2 days ago",
    difficulty: "Hard",
    rounds: 5,
    likes: 124,
    comments: 18,
    questions: ["LCA of Binary Tree", "System Design for TinyURL", "Culture Fit Round"],
    content: "The technical rounds were quite intense but the interviewers were helpful. Focus heavily on DSA and your understanding of distributed systems.",
    videoUrl: "https://www.youtube.com/embed/6iAAbXn1kU4"
  },
  {
    id: 2,
    userName: "Ananya Roy",
    company: "Amazon",
    role: "SDE-1",
    date: "5 days ago",
    difficulty: "Medium",
    rounds: 4,
    likes: 89,
    comments: 9,
    questions: ["LRU Cache Implementation", "Leadership Principle Questions", "Object Oriented Design"],
    content: "Prepare your STAR method examples very well. Amazon cares as much about Leadership Principles as they do about coding.",
    videoUrl: "https://www.youtube.com/embed/0_R3vIn7-fM"
  },
  {
    id: 3,
    userName: "Rohan Das",
    company: "Atlassian",
    role: "Frontend Developer",
    date: "1 week ago",
    difficulty: "Hard",
    rounds: 4,
    likes: 215,
    comments: 32,
    questions: ["Implement a custom Promise", "Web Performance Optimization Round", "Value Fit Round"],
    content: "Very deep dive into JavaScript internals. Don't just know how to use React, know how the DOM and Event Loop work.",
    videoUrl: "https://www.youtube.com/embed/uH-87f54sDk"
  }
];

function init() {
  renderFeed(mockExperiences);
  renderQuestionBank(mockExperiences);
  
  // Search filtering
  document.getElementById('companySearch').addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = mockExperiences.filter(exp => 
      exp.company.toLowerCase().includes(searchTerm) || 
      exp.role.toLowerCase().includes(searchTerm)
    );
    renderFeed(filtered);
  });
}

function renderFeed(data) {
  const feed = document.getElementById('experienceFeed');
  if (!feed) return;
  
  feed.innerHTML = data.map(exp => `
    <div class="experience-card fade-in">
      <div class="card-header">
        <div class="user-meta">
          <div class="user-avatar-sm" style="background:var(--gradient-purple)">${exp.userName.split(' ').map(n => n[0]).join('')}</div>
          <div>
            <div style="font-weight:600; font-size:0.95rem;">${exp.userName}</div>
            <div style="font-size:0.75rem; color:var(--text-muted);">${exp.date}</div>
          </div>
        </div>
        <div class="company-badge">${exp.company}</div>
      </div>

      <div class="experience-content">
        <h3>Shared experience for ${exp.role}</h3>
        <div class="experience-details">
          <span>📊 ${exp.difficulty}</span>
          <span>🔄 ${exp.rounds} Rounds</span>
          <span>💎 ${exp.questions.length} Questions</span>
        </div>
        <p class="experience-text">${exp.content}</p>
        
        ${exp.videoUrl ? `
          <div class="video-embed-container">
            <iframe width="100%" height="100%" src="${exp.videoUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
        ` : ''}
      </div>

      <div class="interaction-bar">
        <button class="interaction-btn" onclick="toggleLike(this, ${exp.likes})">👍 ${exp.likes}</button>
        <button class="interaction-btn">💬 ${exp.comments}</button>
        <button class="interaction-btn">🔖 Save</button>
      </div>
    </div>
  `).join('');
}

function renderQuestionBank(data) {
  const bank = document.getElementById('questionBankList');
  if (!bank) return;
  
  // Extract all questions across experiences
  const allQs = [];
  data.forEach(exp => {
    exp.questions.forEach(q => {
      allQs.push({ q, company: exp.company });
    });
  });

  // Render top 5
  bank.innerHTML = allQs.slice(0, 5).map(item => `
    <div class="qbank-item">
      <span class="q-text">${item.q}</span>
      <span class="q-meta">${item.company}</span>
    </div>
  `).join('');
}

function openShareModal() {
  document.getElementById('shareModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeShareModal() {
  document.getElementById('shareModal').classList.remove('active');
  document.body.style.overflow = 'auto';
}

function submitExperience() {
  const company = document.getElementById('postCompany').value;
  const role = document.getElementById('postRole').value;
  const content = document.getElementById('postExperience').value;
  const questionsInput = document.getElementById('postQuestions').value;
  const video = document.getElementById('postVideo').value;

  if (!company || !role || !content) {
    alert("Please fill in company, role and experience details.");
    return;
  }

  // Convert YouTube link to embed link
  let embedUrl = "";
  if (video.includes('youtube.com/watch?v=')) {
    embedUrl = video.replace('watch?v=', 'embed/');
  } else if (video.includes('youtu.be/')) {
    embedUrl = video.replace('youtu.be/', 'youtube.com/embed/');
  }

  const newPost = {
    id: mockExperiences.length + 1,
    userName: "Arjun Kumar", // Current logged in user
    company: company,
    role: role,
    date: "Just now",
    difficulty: document.getElementById('postDifficulty').value,
    rounds: document.getElementById('postRounds').value,
    likes: 0,
    comments: 0,
    questions: questionsInput.split(',').map(q => q.trim()).filter(q => q),
    content: content,
    videoUrl: embedUrl
  };

  mockExperiences.unshift(newPost);
  renderFeed(mockExperiences);
  renderQuestionBank(mockExperiences);
  closeShareModal();
  
  // Scroll to new post
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleLike(btn, count) {
  btn.classList.toggle('liked');
  if (btn.classList.contains('liked')) {
    btn.innerHTML = `👍 ${count + 1}`;
  } else {
    btn.innerHTML = `👍 ${count}`;
  }
}

document.addEventListener('DOMContentLoaded', init);
