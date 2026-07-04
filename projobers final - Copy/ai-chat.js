/**
 * Projobb AI - Full Screen ChatGPT Style Interface
 */

class AIChatApp {
    constructor() {
        this.api = window.API;
        this.history = [];
        this.savedChats = JSON.parse(localStorage.getItem('projobb_chat_history') || '[]');
        this.userProfile = this.loadUserProfile();
        this.language = 'en';
        this.isTyping = false;
        this.isMuted = false;
        this.currentAudio = null;
        
        // DOM Elements
        this.elements = {
            input: document.getElementById('chat-user-input'),
            sendBtn: document.getElementById('chat-send-btn'),
            voiceBtn: document.getElementById('chat-voice-btn'),
            messages: document.getElementById('messages-container'),
            scrollArea: document.getElementById('chat-scroll-area'),
            emptyState: document.getElementById('empty-state'),
            suggestions: document.getElementById('suggestion-cards'),
            langSelect: document.getElementById('chat-lang-select'),
            muteBtn: document.getElementById('chat-mute-btn'),
            sidebar: document.getElementById('chat-sidebar'),
            toggleSidebarBtn: document.getElementById('toggle-sidebar-btn'),
            closeSidebarBtn: document.getElementById('close-sidebar-btn'),
            newChatBtn: document.getElementById('new-chat-btn'),
            historyList: document.getElementById('chat-history-list')
        };
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.renderHistoryList();
        this.renderSuggestions([
            { title: "Review my skills", desc: "Analyze my profile and find gaps" },
            { title: "Generate roadmap", desc: "Create a learning path for my role" },
            { title: "Find jobs", desc: "Match me with open positions" },
            { title: "Interview prep", desc: "Practice common interview questions" }
        ]);
        
        // Focus input
        setTimeout(() => this.elements.input.focus(), 500);
    }

    loadUserProfile() {
        try {
            const siState = JSON.parse(localStorage.getItem('si_state') || '{}');
            const resumeData = JSON.parse(localStorage.getItem('resume_data') || '{}');
            return {
                role: siState.role || resumeData.target_role || "Professional",
                skills: siState.tags || [],
                target_company: resumeData.target_company || ""
            };
        } catch (e) {
            return { role: "Professional" };
        }
    }

    bindEvents() {
        // Input autosize and submit
        this.elements.input.addEventListener('input', () => {
            this.elements.input.style.height = 'auto';
            this.elements.input.style.height = Math.min(this.elements.input.scrollHeight, 200) + 'px';
            
            const hasText = this.elements.input.value.trim().length > 0;
            this.elements.sendBtn.disabled = !hasText;
            this.elements.sendBtn.style.background = hasText ? 'white' : 'var(--chat-border)';
            this.elements.sendBtn.querySelector('svg').style.fill = hasText ? 'black' : 'var(--chat-text-muted)';
        });
        
        this.elements.input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                if (!this.elements.sendBtn.disabled) {
                    this.handleSend();
                }
            }
        });

        // Buttons
        this.elements.sendBtn.addEventListener('click', () => this.handleSend());
        this.elements.voiceBtn.addEventListener('click', () => this.handleVoiceInput());
        this.elements.muteBtn.addEventListener('click', () => this.toggleMute());
        this.elements.langSelect.addEventListener('change', (e) => { this.language = e.target.value; });
        this.elements.newChatBtn.addEventListener('click', () => this.startNewChat());
        this.elements.toggleSidebarBtn.addEventListener('click', () => this.elements.sidebar.classList.toggle('collapsed'));
        this.elements.closeSidebarBtn.addEventListener('click', () => this.elements.sidebar.classList.add('collapsed'));
    }

    renderSuggestions(suggestions) {
        this.elements.suggestions.innerHTML = '';
        suggestions.forEach(s => {
            const btn = document.createElement('button');
            btn.className = 'suggestion-card';
            btn.innerHTML = `<div class="suggestion-title">${s.title}</div><div class="suggestion-desc">${s.desc}</div>`;
            btn.onclick = () => {
                this.elements.input.value = s.title;
                this.elements.sendBtn.disabled = false;
                this.handleSend();
            };
            this.elements.suggestions.appendChild(btn);
        });
    }

    startNewChat() {
        if (this.history.length > 0) {
            this.saveCurrentChat();
        }
        this.history = [];
        this.elements.messages.innerHTML = '';
        this.elements.messages.appendChild(this.elements.emptyState);
        this.elements.emptyState.style.display = 'flex';
        
        // Remove active class from history
        document.querySelectorAll('.history-item').forEach(el => el.classList.remove('active'));
    }

    saveCurrentChat() {
        if (this.history.length === 0) return;
        const title = this.history[0].content.substring(0, 30) + "...";
        this.savedChats.unshift({ id: Date.now(), title, history: [...this.history] });
        if (this.savedChats.length > 15) this.savedChats.pop();
        localStorage.setItem('projobb_chat_history', JSON.stringify(this.savedChats));
        this.renderHistoryList();
    }

    renderHistoryList() {
        this.elements.historyList.innerHTML = '<div class="history-label">Previous 7 Days</div>';
        this.savedChats.forEach(chat => {
            const btn = document.createElement('button');
            btn.className = 'history-item';
            btn.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
                <span class="history-title">${chat.title}</span>
            `;
            btn.onclick = () => this.loadChat(chat);
            this.elements.historyList.appendChild(btn);
        });
    }

    loadChat(chat) {
        this.history = chat.history;
        this.elements.emptyState.style.display = 'none';
        
        // Keep empty state in DOM but clear other messages
        const emptyState = this.elements.emptyState;
        this.elements.messages.innerHTML = '';
        this.elements.messages.appendChild(emptyState);
        
        this.history.forEach(msg => {
            const sender = msg.role === 'assistant' ? 'ai' : 'user';
            this.appendMessageElement(msg.content, sender, false);
        });
        
        this.scrollToBottom();
        
        // Mobile auto close sidebar
        if (window.innerWidth <= 768) {
            this.elements.sidebar.classList.add('collapsed');
        }
    }

    async handleSend() {
        const text = this.elements.input.value.trim();
        if (!text) return;

        // Reset input immediately
        this.elements.input.value = '';
        this.elements.input.style.height = 'auto';
        this.elements.sendBtn.disabled = true;
        this.elements.emptyState.style.display = 'none';

        // Add user message to UI
        this.appendMessageElement(text, 'user');
        this.history.push({ role: 'user', content: text });

        // Add loading placeholder
        const loaderId = 'loader-' + Date.now();
        this.appendLoadingElement(loaderId);

        try {
            const response = await this.api.chat(text, this.history, this.userProfile, "", this.language, window.location.href);
            
            // Artificial delay for realism if offline mock is used
            const delay = this.api.isOffline ? 600 : 0;
            
            setTimeout(() => {
                this.removeLoadingElement(loaderId);
                
                if (response.timetable) {
                    this.appendMessageElement(response.response || "Here is your study schedule:", 'ai');
                    this.appendTimetableElement(response.timetable);
                } else if (response.roadmap) {
                    this.appendMessageElement(response.response || "Here is a dedicated plan for you:", 'ai');
                    this.appendRoadmapElement(response.roadmap);
                } else {
                    this.appendMessageElement(response.response, 'ai');
                }
                
                this.history.push({ role: 'assistant', content: response.response });
                this.speak(response.response, this.language);
                
            }, delay);
            
        } catch (error) {
            this.removeLoadingElement(loaderId);
            const fallbackMsg = "I'm having trouble connecting right now, but I'm ready to assist you offline based on your professional profile.";
            this.appendMessageElement(fallbackMsg, 'ai');
            this.history.push({ role: 'assistant', content: fallbackMsg });
            this.speak(fallbackMsg, this.language);
        }
    }

    appendMessageElement(text, sender, animate = true) {
        const row = document.createElement('div');
        row.className = `message-row ${sender === 'user' ? 'user-row' : 'ai-row'}`;
        
        let avatarHTML = '';
        if (sender === 'user') {
            avatarHTML = `<div class="avatar user">U</div>`;
        } else {
            avatarHTML = `<div class="avatar ai"><img src="logo.jpg" alt="AI"></div>`;
        }
        
        const contentHTML = sender === 'ai' ? this.renderMarkdown(text) : `<p>${this.escapeHTML(text)}</p>`;
        
        let actionsHTML = '';
        if (sender === 'ai') {
            actionsHTML = `
                <div class="msg-actions">
                    <button class="icon-btn" title="Copy" onclick="navigator.clipboard.writeText('${text.replace(/'/g, "\\'")}')">
                       <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                    </button>
                    <button class="icon-btn" title="Read Aloud" onclick="document.querySelector('.ai-chat-body').__projobbSpeak('${text.replace(/'/g, "\\'")}')">
                       <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
                    </button>
                    <button class="icon-btn" title="Helpful" onclick="this.style.color='#3b82f6'">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
                    </button>
                </div>
            `;
        }

        row.innerHTML = `
            ${sender === 'ai' ? avatarHTML : ''}
            <div class="message-content">
                ${contentHTML}
                ${actionsHTML}
            </div>
            ${sender === 'user' ? avatarHTML : ''}
        `;

        this.elements.messages.appendChild(row);
        this.scrollToBottom();
    }

    appendRoadmapElement(data) {
        const row = document.createElement('div');
        row.className = `message-row ai-row`;
        
        let phasesHtml = data.phases.map((phase, i) => `
            <div class="roadmap-phase">
                <div class="roadmap-phase-header">
                    <div class="roadmap-phase-num">${i + 1}</div>
                    <div>
                        <strong>${phase.phase}</strong>
                        <span class="roadmap-duration">⏱ ${phase.duration}</span>
                    </div>
                </div>
                <ul>
                    ${phase.topics.map(t => `<li>${t}</li>`).join('')}
                </ul>
            </div>
        `).join('');

        row.innerHTML = `
            <div class="avatar ai"><img src="logo.jpg" alt="AI"></div>
            <div class="message-content">
                <div class="roadmap-card">
                    <div class="roadmap-title">${data.title}</div>
                    ${phasesHtml}
                </div>
            </div>
        `;
        
        this.elements.messages.appendChild(row);
        this.scrollToBottom();
    }

    appendTimetableElement(data) {
        const row = document.createElement('div');
        row.className = `message-row ai-row`;
        
        let scheduleHtml = data.schedule.map(item => `
            <div class="timetable-row">
                <div class="timetable-time">${item.day_or_time}</div>
                <div><strong>${item.focus}</strong></div>
                <div style="color:var(--chat-text-muted)">${item.notes}</div>
            </div>
        `).join('');

        row.innerHTML = `
            <div class="avatar ai"><img src="logo.jpg" alt="AI"></div>
            <div class="message-content">
                <div class="timetable-card">
                    <div class="timetable-title">🗓️ ${data.title}</div>
                    <div class="timetable-grid">
                        <div class="timetable-header-row">
                            <div>Time/Day</div>
                            <div>Focus Area</div>
                            <div>Notes</div>
                        </div>
                        ${scheduleHtml}
                    </div>
                </div>
            </div>
        `;
        
        this.elements.messages.appendChild(row);
        this.scrollToBottom();
    }

    appendLoadingElement(id) {
        const row = document.createElement('div');
        row.className = `message-row ai-row`;
        row.id = id;
        row.innerHTML = `
            <div class="avatar ai"><img src="logo.jpg" alt="AI"></div>
            <div class="message-content">
                <div class="typing-dots">
                    <div class="dot"></div><div class="dot"></div><div class="dot"></div>
                </div>
            </div>
        `;
        this.elements.messages.appendChild(row);
        this.scrollToBottom();
    }

    removeLoadingElement(id) {
        const el = document.getElementById(id);
        if (el) el.remove();
    }

    scrollToBottom() {
        requestAnimationFrame(() => {
            this.elements.scrollArea.scrollTop = this.elements.scrollArea.scrollHeight;
        });
    }

    renderMarkdown(text) {
        let html = this.escapeHTML(text);
        html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        html = html.replace(/`(.*?)`/g, '<code>$1</code>');
        html = html.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
        html = html.replace(/^[•\-\*]\s+(.*)$/gm, '<li>$1</li>');
        html = html.replace(/(<li>(?:.|\n)*?<\/li>)/g, '<ul>$1</ul>');
        html = html.replace(/<\/ul>\s*<ul>/g, '');
        // Replace newlines not inside ul/pre with br
        html = html.replace(/(?!\s*<(?:ul|pre|li).*?>)\n(?!\s*<\/(?:ul|pre|li)>)/g, '<br>');
        return html;
    }

    escapeHTML(text) {
        return text.replace(/[&<>"']/g, function(m) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m];
        });
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        document.getElementById('mute-icon-on').style.display  = this.isMuted ? 'none' : '';
        document.getElementById('mute-icon-off').style.display = this.isMuted ? '' : 'none';
        if (this.isMuted && this.currentAudio) this.currentAudio.pause();
    }

    handleVoiceInput() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) return alert('Speech recognition not supported.');
        const rec = new SpeechRecognition();
        rec.lang = { en: 'en-US', ta: 'ta-IN', te: 'te-IN' }[this.language] || 'en-US';
        
        rec.onstart = () => { 
            this.elements.voiceBtn.style.color = '#e74c3c'; 
            this.elements.input.placeholder = "Listening...";
        };
        rec.onresult = e => { 
            this.elements.input.value = e.results[0][0].transcript; 
            this.elements.sendBtn.disabled = false;
            this.handleSend(); 
        };
        rec.onend = () => { 
            this.elements.voiceBtn.style.color = ''; 
            this.elements.input.placeholder = "Message Projobb AI...";
        };
        rec.start();
    }

    speak(text, lang = 'en', force = false) {
        if (this.isMuted && !force) return;
        const clean = text.replace(/\*\*(.*?)\*\*/g, '$1').replace(/[#`•\-]/g, '').replace(/\n+/g, '. ').trim();
        if (this.currentAudio) this.currentAudio.pause();
        const url = `${this.api.ttsEndpoint || 'http://localhost:8000/api/tts'}?text=${encodeURIComponent(clean)}&lang=${lang}`;
        this.currentAudio = new Audio(url);
        this.currentAudio.onerror = () => this.browserSpeak(clean, lang);
        this.currentAudio.play().catch(() => this.browserSpeak(clean, lang));
    }

    browserSpeak(text, lang) {
        if (!window.speechSynthesis) return;
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        
        const langMap = { en: 'en-US', ta: 'ta-IN', te: 'te-IN' };
        utterance.lang = langMap[lang] || 'en-US';
        
        const voices = window.speechSynthesis.getVoices();
        const voice = voices.find(v => v.lang.startsWith(lang)) || voices[0];
        if(voice) utterance.voice = voice;
        
        window.speechSynthesis.speak(utterance);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // We bind a global helper for the generic onClick events in message actions
    const app = new AIChatApp();
    document.querySelector('.ai-chat-body').__projobbSpeak = (text) => app.speak(text, app.language, true);
});
