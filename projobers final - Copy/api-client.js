/**
 * PROJOBB API CLIENT
 * Handles all backend interactions with automatic fallback to local mock data.
 */
const API_BASE = "http://127.0.0.1:8000/api";

const API = {
  isOffline: false,

  /**
   * Universal fetch wrapper with timeout and fallback
   */
  async request(endpoint, options = {}, mockFunc = null) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000); // 6s timeout

    try {
      const response = await fetch(`${API_BASE}${endpoint}`, {
        ...options,
        signal: controller.signal
      });
      clearTimeout(timeout);

      if (!response.ok) throw new Error("Server error");
      
      this.setOnline();
      return await response.json();
    } catch (error) {
      clearTimeout(timeout);
      console.warn(`[API] Connection to ${endpoint} failed. Falling back to local AI.`);
      this.setOffline();
      
      if (mockFunc) {
        return mockFunc();
      }
      return { error: true, message: "Service unavailable" };
    }
  },

  setOffline() {
    if (!this.isOffline) {
      this.isOffline = true;
      document.dispatchEvent(new CustomEvent("api-status-change", { detail: { status: "offline" } }));
      // Silently fall back to local AI
    }
  },

  setOnline() {
    if (this.isOffline) {
      this.isOffline = false;
      document.dispatchEvent(new CustomEvent("api-status-change", { detail: { status: "online" } }));
      // Silently reconnect
    }
  },

  showToast(msg) {
    const toast = document.createElement("div");
    toast.className = "api-toast";
    toast.innerText = msg;
    document.body.appendChild(toast);
    
    // Auto-style for toast if not in CSS
    Object.assign(toast.style, {
      position: "fixed",
      bottom: "20px",
      right: "20px",
      padding: "12px 20px",
      background: this.isOffline ? "#facc15" : "#22c55e",
      color: "#000",
      borderRadius: "8px",
      fontWeight: "600",
      boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
      zIndex: "10000",
      animation: "slideUp 0.3s ease-out"
    });

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transition = "opacity 0.5s ease";
      setTimeout(() => toast.remove(), 500);
    }, 3000);
  },

  // --- Endpoints ---

  async chat(message, history = [], userProfile = {}, context = "", language = "en", pageUrl = "") {
    return this.request("/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, history, user_profile: userProfile, context, language, page_url: pageUrl })
    }, () => window.MOCK_RESPONSES.chat(message, language, history, userProfile));
  },

  async getRoadmap(industry, skills, language = "en") {
    return this.request("/roadmap", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ industry, skills, language })
    }, () => window.MOCK_RESPONSES.roadmap(industry, language));
  },

  async analyzeInterview(formData) {
    // Note: formData should contain video, question, transcript
    return this.request("/analyze-interview", {
      method: "POST",
      body: formData
    }, () => window.MOCK_RESPONSES.analyzeInterview(formData.get("question"), formData.get("transcript")));
  },

  async generateResume(data) {
    return this.request("/generate-resume", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }, () => window.MOCK_RESPONSES.generateResume(data));
  },

  async scoreResume(data) {
    return this.request("/score-resume", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }, () => ({ score: 88, verdict: "Great potential (Mock Score)" }));
  },

  async evaluateMission(formData) {
    return this.request("/evaluate-mission", {
      method: "POST",
      body: formData
    }, () => window.MOCK_RESPONSES.evaluateMission(formData.get("title")));
  },

  async suggestSkills(role) {
    return this.request(`/suggest-skills?role=${encodeURIComponent(role)}`, {}, () => window.MOCK_RESPONSES.suggestSkills(role));
  },

  async scheduleSession(data) {
    return this.request("/schedule-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }, () => window.MOCK_RESPONSES.scheduleSession(data));
  }
};

window.API = API;
