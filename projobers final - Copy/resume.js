// resume.js - Logic for Multi-Step AI Resume Builder

let currentStep = 1;
const totalSteps = 8;
let resumeData = {
    name: "Arjun Kumar",
    contact: "johndoe@email.com • 9876543210 • github.com/jdoe • linkedin.com/in/johndoe",
    build_for: "Job",
    target_company: "",
    target_role: "Full Stack Developer",
    education: { college: "", degree: "", year: "", cgpa: "" },
    skills: { languages: [], frameworks: [], soft: [] },
    projects: [],
    experience: [],
    achievements: ""
};

// Elements
const stepPages = document.querySelectorAll('.step-page');
const progressFill = document.getElementById('progressFill');
const stepTitle = document.getElementById('stepTitle');
const btnPrev = document.getElementById('btnPrev');
const btnNext = document.getElementById('btnNext');

const stepTitles = [
    "Step 1: Your Goals",
    "Step 2: Role Selection",
    "Step 3: Education",
    "Step 4: Skills & Tools",
    "Step 5: Projects",
    "Step 6: Experience",
    "Step 7: Achievements",
    "Step 8: Final Review"
];

// --- Navigation ---
function updateStepUI() {
    stepPages.forEach(p => p.classList.remove('active'));
    document.querySelector(`.step-page[data-step="${currentStep}"]`).classList.add('active');
    
    stepTitle.innerText = stepTitles[currentStep - 1];
    progressFill.style.width = `${(currentStep / totalSteps) * 100}%`;
    
    btnPrev.style.visibility = currentStep === 1 ? 'hidden' : 'visible';
    btnNext.innerText = currentStep === totalSteps ? 'Finish ✨' : 'Next Step →';
    
    if (currentStep === totalSteps) {
        btnNext.style.display = 'none';
    } else {
        btnNext.style.display = 'block';
    }
}

btnNext.addEventListener('click', () => {
    if (currentStep < totalSteps) {
        syncDataFromUI();
        currentStep++;
        updateStepUI();
        updatePreview();
    }
});

btnPrev.addEventListener('click', () => {
    if (currentStep > 1) {
        currentStep--;
        updateStepUI();
    }
});

// --- Role Selection ---
document.querySelectorAll('.role-card').forEach(card => {
    card.addEventListener('click', () => {
        document.querySelectorAll('.role-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        resumeData.target_role = card.dataset.role;
        document.getElementById('resRoleDisplay').innerText = resumeData.target_role;
    });
});

// --- Dynamic Lists (Projects & Experience) ---
document.getElementById('btnAddProject').addEventListener('click', () => {
    const list = document.getElementById('projectList');
    const item = document.createElement('div');
    item.className = 'project-item';
    item.innerHTML = `
        <span class="btn-remove" onclick="this.parentElement.remove()">×</span>
        <div class="form-group"><label>Project Name</label><input type="text" class="form-control proj-name"></div>
        <div class="form-group"><label>Description</label><textarea class="form-control proj-desc" rows="2"></textarea></div>
        <div class="form-group"><label>Tech Used</label><input type="text" class="form-control proj-tech"></div>
        <div class="form-group"><label>Your Role</label><input type="text" class="form-control proj-role"></div>
    `;
    list.appendChild(item);
});

document.querySelector('.exp-toggle-yes').addEventListener('click', (e) => {
    e.target.classList.add('active');
    document.querySelector('.exp-toggle-no').classList.remove('active');
    document.getElementById('experienceSection').style.display = 'block';
});

document.querySelector('.exp-toggle-no').addEventListener('click', (e) => {
    e.target.classList.add('active');
    document.querySelector('.exp-toggle-yes').classList.remove('active');
    document.getElementById('experienceSection').style.display = 'none';
});

document.getElementById('btnAddExperience').addEventListener('click', () => {
    const list = document.getElementById('experienceList');
    const item = document.createElement('div');
    item.className = 'exp-item';
    item.innerHTML = `
        <span class="btn-remove" onclick="this.parentElement.remove()">×</span>
        <div class="form-group"><label>Company Name</label><input type="text" class="form-control exp-company"></div>
        <div class="form-group"><label>Role</label><input type="text" class="form-control exp-role"></div>
        <div class="form-group"><label>Duration</label><input type="text" class="form-control exp-duration"></div>
        <div class="form-group"><label>Description</label><textarea class="form-control exp-desc" rows="2"></textarea></div>
    `;
    list.appendChild(item);
});

// --- AI Suggestions ---
document.getElementById('btnSuggestSkills').addEventListener('click', async (e) => {
    const btn = e.target;
    btn.disabled = true;
    btn.innerText = "Analyzing Role...";
    
    try {
        const data = await window.API.suggestSkills(resumeData.target_role);
        document.getElementById('skillsLang').value = data.languages.join(', ');
        document.getElementById('skillsTools').value = data.frameworks.join(', ');
        document.getElementById('skillsSoft').value = data.soft.join(', ');
    } catch (err) {
        console.error("Skill suggestion failed:", err);
    } finally {
        btn.disabled = false;
        btn.innerText = "💡 Suggest AI Skills";
    }

});

// --- Data Syncing ---
function syncDataFromUI() {
    resumeData.name = document.getElementById('resName').innerText;
    resumeData.contact = document.getElementById('resContactDisplay').innerText;
    resumeData.build_for = document.getElementById('buildFor').value;
    resumeData.target_company = document.getElementById('targetCompany').value;
    
    resumeData.education = {
        college: document.getElementById('eduCollege').value,
        degree: document.getElementById('eduDegree').value,
        year: document.getElementById('eduYear').value,
        cgpa: document.getElementById('eduGpa').value
    };
    
    resumeData.skills = {
        languages: document.getElementById('skillsLang').value.split(',').map(s => s.trim()).filter(s => s),
        frameworks: document.getElementById('skillsTools').value.split(',').map(s => s.trim()).filter(s => s),
        soft: document.getElementById('skillsSoft').value.split(',').map(s => s.trim()).filter(s => s)
    };
    
    // Projects
    resumeData.projects = [];
    document.querySelectorAll('.project-item').forEach(p => {
        resumeData.projects.push({
            name: p.querySelector('.proj-name').value,
            description: p.querySelector('.proj-desc').value,
            technologies: p.querySelector('.proj-tech').value,
            role: p.querySelector('.proj-role').value
        });
    });
    
    // Experience
    resumeData.experience = [];
    if (document.getElementById('experienceSection').style.display !== 'none') {
        document.querySelectorAll('.exp-item').forEach(e => {
            resumeData.experience.push({
                company: e.querySelector('.exp-company').value,
                role: e.querySelector('.exp-role').value,
                duration: e.querySelector('.exp-duration').value,
                description: e.querySelector('.exp-desc').value
            });
        });
    }
    
    resumeData.achievements = document.getElementById('achievements').value;
    saveResumeProgress();
}


function updatePreview() {
    // Basic sync to preview
    document.getElementById('resName').innerText = resumeData.name;
    document.getElementById('resContactDisplay').innerText = resumeData.contact;
    document.getElementById('resRoleDisplay').innerText = resumeData.target_role;
    
    // Skills
    let skillsHtml = "";
    if (resumeData.skills.languages.length) skillsHtml += `<strong>Languages:</strong> ${resumeData.skills.languages.join(', ')}<br>`;
    if (resumeData.skills.frameworks.length) skillsHtml += `<strong>Tools:</strong> ${resumeData.skills.frameworks.join(', ')}<br>`;
    if (resumeData.skills.soft.length) skillsHtml += `<strong>Soft Skills:</strong> ${resumeData.skills.soft.join(', ')}<br>`;
    document.getElementById('resSkills').innerHTML = skillsHtml || "<em>Add your skills...</em>";
    
    // Education
    if (resumeData.education.college) {
        document.getElementById('resEducation').innerHTML = `
            <div class="res-item">
                <div class="res-item-header"><strong>${resumeData.education.degree}</strong><span>${resumeData.education.college} • ${resumeData.education.year}</span></div>
                <p>GPA: ${resumeData.education.cgpa || 'N/A'}</p>
            </div>
        `;
    }
}

// --- Persistence ---
function saveResumeProgress() {
    try {
        localStorage.setItem("resume_data", JSON.stringify(resumeData));
    } catch (e) { console.warn("Failed to save resume progress", e); }
}

function loadResumeProgress() {
    try {
        const saved = localStorage.getItem("resume_data");
        if (saved) {
            resumeData = JSON.parse(saved);
            // Update UI fields if they exist
            if (document.getElementById('buildFor')) document.getElementById('buildFor').value = resumeData.build_for;
            if (document.getElementById('targetCompany')) document.getElementById('targetCompany').value = resumeData.target_company;
            if (document.getElementById('eduCollege')) document.getElementById('eduCollege').value = resumeData.education.college;
            if (document.getElementById('eduDegree')) document.getElementById('eduDegree').value = resumeData.education.degree;
            if (document.getElementById('eduYear')) document.getElementById('eduYear').value = resumeData.education.year;
            if (document.getElementById('eduGpa')) document.getElementById('eduGpa').value = resumeData.education.cgpa;
            if (document.getElementById('skillsLang')) document.getElementById('skillsLang').value = resumeData.skills.languages.join(', ');
            if (document.getElementById('skillsTools')) document.getElementById('skillsTools').value = resumeData.skills.frameworks.join(', ');
            if (document.getElementById('skillsSoft')) document.getElementById('skillsSoft').value = resumeData.skills.soft.join(', ');
            
            // Re-render preview
            updatePreview();
        }
    } catch (e) { console.warn("Failed to load resume progress", e); }
}


// --- Final Generation ---
document.getElementById('btnFinalGenerate').addEventListener('click', async (e) => {
    syncDataFromUI();
    const btn = e.target;
    btn.disabled = true;
    btn.innerText = "✨ AI Engineering Content...";
    
    try {
        const data = await window.API.generateResume(resumeData);
        document.getElementById('resSummary').innerText = data.ai_summary;
        document.getElementById('resSkills').innerHTML = data.ai_skills_html;
        document.getElementById('resExperience').innerHTML = data.ai_experience_html;
        document.getElementById('resProjects').innerHTML = data.ai_projects_html;
        document.getElementById('resEducation').innerHTML = data.ai_education_html;
    } catch (err) {
        console.error("Resume generation failed:", err);
    } finally {
        btn.disabled = false;
        btn.innerText = "✨ Generate Professional Resume";
    }

});

// --- Template Selector ---
document.querySelectorAll('.tpl-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tpl-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const paper = document.getElementById('resumePaper');
        paper.className = 'resume-paper ' + 'template-' + btn.dataset.tpl;
    });
});

// --- Scoring ---
document.getElementById('btnAiScore').addEventListener('click', async () => {
    const btn = document.getElementById('btnAiScore');
    const hdr = document.getElementById('hdrScore');
    btn.disabled = true;
    hdr.innerText = "Analyzing...";
    
    try {
        const payload = {
            target_role: resumeData.target_role,
            resume_content: document.getElementById('resumePaper').innerText
        };
        
        const data = await window.API.scoreResume(payload);
        document.getElementById('finalScore').innerText = data.score;
        document.getElementById('scoreVerdict').innerText = data.verdict;
        document.getElementById('scoreRecommendations').innerHTML = data.recommendations.map(r => `<li>${r}</li>`).join('');
        hdr.innerText = `${data.score}/100`;
        
        document.getElementById('scoreModal').classList.add('active');
    } catch (err) {
        console.error("Scoring failed:", err);
    } finally {
        btn.disabled = false;
    }

});

// --- Download PDF ---
document.getElementById('btnDownloadPdf').addEventListener('click', () => {
    const element = document.getElementById('resumePaper');
    const editables = element.querySelectorAll('[contenteditable="true"]');
    editables.forEach(el => el.setAttribute('contenteditable', 'false'));

    const opt = {
      margin:       0,
      filename:     `Projobbers_Resume_${resumeData.target_role.replace(/ /g, '_')}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true },
      jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save().then(() => {
        editables.forEach(el => el.setAttribute('contenteditable', 'true'));
    });
});

// Init
loadResumeProgress();
updateStepUI();

