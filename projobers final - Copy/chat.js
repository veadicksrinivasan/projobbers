/**
 * PROJOBB AI — Floating Chat Assistant Link
 * Replaced the popup widget with a direct link to the full-screen AI chat experience.
 */

class ProjobbAILink {
    constructor() {
        this.init();
    }

    /* ─── Boot ────────────────────────────────────────────────────── */
    init() {
        this.render();
    }

    /* ─── Build DOM ────────────────────────────────────────────────── */
    render() {
        const chatRoot = document.createElement('div');
        chatRoot.id = 'projobb-ai-root';
        // Now it's just a floating button that links to ai-chat.html
        chatRoot.innerHTML = `
            <a href="ai-chat.html" id="projobb-chat-trigger" class="pulse" title="Open Projobb AI Full Screen">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
            </a>
            
            <!-- Hide the old window if it was somehow in HTML -->
            <style>
                #projobb-chat-window { display: none !important; }
            </style>
        `;
        document.body.appendChild(chatRoot);
    }
}

/* ─── Initialization ────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
    window.projobbAILink = new ProjobbAILink();
});
