// coding.js - AI Coding Assessment Logic

// Generate mock 3000 problems
const topics = ["Arrays", "Strings", "Dynamic Programming", "Graph Theory", "Tree Structures"];
const difficulties = ["Easy", "Medium", "Hard"];
const statuses = ["", "solved", "attempted"]; // empty means unattempted

function generateMockDatabase(count) {
  const db = [];
  
  // Specific real-sounding problems for the first few
  const realProblems = [
    { title: "Two Sum", topic: "Arrays", difficulty: "Easy", acceptance: 52 },
    { title: "Longest Substring Without Repeating Characters", topic: "Strings", difficulty: "Medium", acceptance: 34 },
    { title: "Maximum Depth of Binary Tree", topic: "Tree Structures", difficulty: "Easy", acceptance: 74 },
    { title: "Dijkstra's Shortest Path", topic: "Graph Theory", difficulty: "Hard", acceptance: 21 },
    { title: "Climbing Stairs", topic: "Dynamic Programming", difficulty: "Easy", acceptance: 68 },
    { title: "Merge k Sorted Lists", topic: "Tree Structures", difficulty: "Hard", acceptance: 28 },
    { title: "Valid Palindrome", topic: "Strings", difficulty: "Easy", acceptance: 44 },
    { title: "Alien Dictionary", topic: "Graph Theory", difficulty: "Hard", acceptance: 19 },
    { title: "Coin Change", topic: "Dynamic Programming", difficulty: "Medium", acceptance: 41 },
    { title: "Container With Most Water", topic: "Arrays", difficulty: "Medium", acceptance: 54 }
  ];

  for(let i=0; i<count; i++) {
    if (i < realProblems.length) {
      db.push({
        id: i + 1,
        title: realProblems[i].title,
        topic: realProblems[i].topic,
        difficulty: realProblems[i].difficulty,
        acceptance: realProblems[i].acceptance,
        status: i < 2 ? "solved" : "" // first two solved
      });
    } else {
      const topic = topics[Math.floor(Math.random() * topics.length)];
      const diff = difficulties[Math.floor(Math.random() * difficulties.length)];
      const acc = Math.floor(Math.random() * 60) + 15; // 15% to 75%
      const stat = Math.random() > 0.8 ? "solved" : (Math.random() > 0.9 ? "attempted" : "");
      
      db.push({
        id: i + 1,
        title: `Algorithm Challenge #${i+1}: ${topic} Operation`,
        topic: topic,
        difficulty: diff,
        acceptance: acc,
        status: stat
      });
    }
  }
  return db;
}

const allQuestions = generateMockDatabase(3042);
let filteredQuestions = [...allQuestions];
let currentPage = 1;
const ITEMS_PER_PAGE = 20;

// Elements
const tbody = document.getElementById('questionsBody');
const searchInput = document.getElementById('searchInput');
const diffFilter = document.getElementById('diffFilter');
const topicFilter = document.getElementById('topicFilter');
const pageInfo = document.getElementById('pageInfo');
const btnPrev = document.getElementById('btnPrevPage');
const btnNext = document.getElementById('btnNextPage');

// View Containers
const viewLibrary = document.getElementById('view-library');
const viewEditor = document.getElementById('view-editor');
const btnBackToLibrary = document.getElementById('btnBackToLibrary');

// Editor Elements
const pTitle = document.getElementById('pTitle');
const pDiff = document.getElementById('pDiff');
const pTopic = document.getElementById('pTopic');
const btnRunCode = document.getElementById('btnRunCode');
const btnSubmitCode = document.getElementById('btnSubmitCode');
const outputConsole = document.getElementById('outputConsole');

// Initialization
document.addEventListener('DOMContentLoaded', () => {
  applyFilters();

  // Filter Listeners
  searchInput.addEventListener('input', applyFilters);
  diffFilter.addEventListener('change', applyFilters);
  topicFilter.addEventListener('change', applyFilters);

  // Pagination Listeners
  btnPrev.addEventListener('click', () => { if(currentPage > 1) { currentPage--; renderTable(); } });
  btnNext.addEventListener('click', () => { if(currentPage * ITEMS_PER_PAGE < filteredQuestions.length) { currentPage++; renderTable(); } });
  
  // Editor View Listeners
  btnBackToLibrary.addEventListener('click', () => {
    viewEditor.classList.add('coding-view-hidden');
    viewLibrary.classList.remove('coding-view-hidden');
  });

  btnRunCode.addEventListener('click', () => simulateRun());
  btnSubmitCode.addEventListener('click', () => simulateAnalyze());
});

// ... existing filter and table logic ...
function applyFilters() {
  const searchTerm = searchInput.value.toLowerCase();
  const diff = diffFilter.value;
  const topic = topicFilter.value;

  filteredQuestions = allQuestions.filter(q => {
    const matchSearch = q.title.toLowerCase().includes(searchTerm) || q.id.toString() === searchTerm;
    const matchDiff = diff === 'All' || q.difficulty === diff;
    const matchTopic = topic === 'All' || q.topic === topic;
    return matchSearch && matchDiff && matchTopic;
  });

  currentPage = 1;
  renderTable();
}

function renderTable() {
  tbody.innerHTML = '';
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const end = Math.min(start + ITEMS_PER_PAGE, filteredQuestions.length);
  const pageData = filteredQuestions.slice(start, end);

  if (pageData.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding: 40px; color:var(--text-muted)">No problems found matching filters.</td></tr>`;
  } else {
    pageData.forEach(q => {
      const tr = document.createElement('tr');
      
      let statusIcon = '➖';
      if (q.status === 'solved') statusIcon = '<span style="color:var(--accent-green)">✔</span>';
      if (q.status === 'attempted') statusIcon = '<span style="color:var(--accent-orange)">⌛</span>';

      const diffClass = `diff-${q.difficulty.toLowerCase()}`;

      tr.innerHTML = `
        <td style="text-align:center;">${statusIcon}</td>
        <td><div class="q-title" data-id="${q.id}">${q.id}. ${q.title}</div></td>
        <td><span class="${diffClass}">${q.difficulty}</span></td>
        <td><span class="tag">${q.topic}</span></td>
        <td style="color:var(--text-muted);">${q.acceptance}%</td>
        <td style="text-align:right;"><button class="btn btn-outline btn-sm q-solve-btn" data-id="${q.id}">Solve</button></td>
      `;
      tbody.appendChild(tr);
    });

    // Attach click events for solving
    document.querySelectorAll('.q-title, .q-solve-btn').forEach(el => {
      el.addEventListener('click', (e) => {
        const id = parseInt(e.currentTarget.getAttribute('data-id'));
        openEditor(id);
      });
    });
  }

  // Update Page Info
  pageInfo.innerText = `Showing ${start + 1}-${end} of ${filteredQuestions.length} problems`;
  btnPrev.disabled = currentPage === 1;
  btnNext.disabled = end === filteredQuestions.length;
}

// ... existing openEditor logic ...
function openEditor(id) {
  const q = allQuestions.find(x => x.id === id);
  if(!q) return;

  pTitle.innerText = `${q.id}. ${q.title}`;
  pDiff.className = `diff-${q.difficulty.toLowerCase()}`;
  pDiff.innerText = q.difficulty.toUpperCase();
  pTopic.innerText = q.topic;
  
  // Hide Library, Show Editor
  viewLibrary.classList.add('coding-view-hidden');
  viewEditor.classList.remove('coding-view-hidden');
  
  // Reset output
  outputConsole.style.display = 'none';
  outputConsole.classList.remove('error');
}

function simulateRun() {
  outputConsole.style.display = 'block';
  outputConsole.classList.remove('error');
  outputConsole.innerHTML = `Evaluating test cases... <span class="spinner" style="display:inline-block;width:12px;height:12px;border-width:2px;vertical-align:middle;margin-left:5px;"></span>`;
  
  setTimeout(() => {
    outputConsole.innerHTML = `✅ All 15/15 test cases passed successfully.\nRuntime: 42ms (Beats 85%)\nMemory: 14.2 MB`;
    outputConsole.style.color = "var(--accent-green)";
  }, 1200);
}

function simulateAnalyze() {
  outputConsole.style.display = 'block';
  outputConsole.classList.remove('error');
  outputConsole.innerHTML = `Submitting code to AI Assessor... <span class="spinner" style="display:inline-block;width:12px;height:12px;border-width:2px;vertical-align:middle;margin-left:5px;"></span>`;
  
  setTimeout(() => {
    outputConsole.innerHTML = `
<div style="color:var(--text-primary); margin-top: 10px; font-family: 'Outfit', sans-serif;">
  <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border); padding-bottom:10px; margin-bottom:10px;">
    <span style="font-size:1.1rem; font-weight:700;"><span style="color:var(--accent-blue)">AI Evaluation Result</span></span>
    <span class="badge badge-green" style="font-size:1rem;">Score: 92/100</span>
  </div>
  <div style="margin-bottom: 12px;">
    <strong style="color:var(--accent-green)">✅ Correctness:</strong> Your logic flawlessly handles edge cases like empty arrays and negative inputs. Time complexity achieves the optimal O(N).
  </div>
  <div style="margin-bottom: 12px;">
    <strong style="color:var(--accent-orange)">⚠️ Code Improvement Advice:</strong>
    <ul style="margin-top:4px; margin-left: 20px; color:var(--text-secondary);">
      <li>Your variable naming is slightly vague. Instead of <code>let map = new Map()</code>, consider using a more semantic name like <code>let seenNumbers = new Map()</code> to instantly clarify intent.</li>
      <li>Instead of a standard <code>for</code> loop, for modern ES6 code readability, consider using a <code>for...of</code> loop with <code>entries()</code> when you need the index.</li>
    </ul>
  </div>
  <div>
    <strong style="color:var(--accent-purple)">💡 Next Step Recommendation:</strong> Since you mastered <em>${document.getElementById('pTopic').innerText}</em> efficiently, try a hard difficulty problem next to test your boundary conditions!
  </div>
</div>`;
  }, 2000);
}
