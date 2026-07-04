/**
 * MOCK RESPONSES FOR PROJOBB AI
 * Realistic fallback data for when the backend is offline.
 */
const MOCK_RESPONSES = {
  chat: async (msg, lang, history = [], userProfile = {}) => {
    const m = msg.toLowerCase();
    const role = userProfile.role || "Professional";
    
    // Knowledge Base Check
    if (m.includes("who are you") || m.includes("your name")) {
      return { response: `I am **Projobb AI**, your career-focused assistant. I help people find jobs, build resumes, and prepare for interviews using advanced AI analysis.`, suggestions: ["How can you help?"] };
    }
    if (m.includes("salary") || m.includes("earning")) {
      return { response: `Based on your profile as a **${role}**, salary ranges can vary. For example:\n• **Junior Support:** ₹4L - ₹8L\n• **Mid-Level:** ₹10L - ₹18L\n• **Senior/Lead:** ₹25L - ₹45L+\n*Note: These are industry averages for urban tech hubs.*`, suggestions: ["How to earn more?", "Interview tips"] };
    }
    if (m.includes("career") || m.includes("growth")) {
      return { response: `To grow as a **${role}**, focus on these key pillars:\n• **Technical Mastery:** Deep dive into high-demand stacks.\n• **Soft Skills:** Communication and leadership.\n• **Networking:** Connect with industry mentors in our **Mentor Hub**.`, suggestions: ["Go to Mentor Hub", "Analyze my skills"] };
    }
    if (m.includes("what is ai") || m.includes("artificial intelligence")) {
      return { response: `**Artificial Intelligence (AI)** is the simulation of human intelligence by machines. In the context of Projobbers, I use AI to:\n• Analyze your skills and generate a customized **Learning Roadmap**.\n• Match you with the best **job opportunities** based on your resume.\n• Provide real-time feedback during **mock interviews**.`, suggestions: ["Learning roadmap", "Start interview"] };
    }
    if (m.includes("help") || m.includes("skills")) {
      return { response: `I can assist you with your **${role}** journey by:\n• **Resume Optimization:** Scoring your resume for ATS.\n• **Interview Training:** Realistic AI-led mock interviews.\n• **Learning Path:** Generating a daily roadmap for your goals.`, suggestions: ["Analyze my resume", "Start interview"] };
    }
    
    // Dynamic ChatGPT-Style Generative Mock
    const techKeywords = ['python', 'javascript', 'react', 'java', 'c++', 'sql', 'node', 'aws', 'docker', 'machine learning', 'frontend', 'backend', 'full stack', 'html', 'css'];
    const careerKeywords = ['interview', 'resume', 'system design', 'salary', 'job', 'portfolio', 'networking', 'cover letter'];
    
    let foundTech = techKeywords.find(k => m.includes(k));
    let foundCareer = careerKeywords.find(k => m.includes(k));

    if (foundTech) {
      const CapitalizedTech = foundTech.charAt(0).toUpperCase() + foundTech.slice(1);
      return { 
        response: `**${CapitalizedTech}** is a critical skill for many modern engineering roles. Here is a quick guide on how to approach it:\n\n**1. Fundamentals**\nFocus on understanding the core concepts and syntax before jumping into frameworks. Build small CLI or web tools to solidify your knowledge.\n\n**2. Top Applications & Frameworks**\nDepending on your role, you'll want to learn the ecosystem. For example, if you're a web developer using this, learn the most popular routing and state-management libraries.\n\n**3. Interview Focus**\nRecruiters look for scalable problem solving. Be prepared to answer questions on performance optimization, common design patterns, and debugging within ${CapitalizedTech}.\n\n*Would you like me to generate a complete learning roadmap for ${CapitalizedTech}?*`, 
        suggestions: [`${CapitalizedTech} Roadmap`, `Interview questions for ${CapitalizedTech}`] 
      };
    }

    if (foundCareer) {
      const CapitalizedCareer = foundCareer.charAt(0).toUpperCase() + foundCareer.slice(1);
      return {
        response: `When it comes to **${CapitalizedCareer}**, preparation is everything. Here are standard industry best practices:\n\n• **Relevance:** Always tailor your approach to the specific company and role. Generic applications or answers rarely stand out.\n• **The STAR Method:** When discussing past experiences, use the Situation, Task, Action, Result framework.\n• **Continuous Iteration:** Treat your career assets (like your resume and portfolio) as living documents. Update them after every major project.\n\n*I can help you analyze your specific ${CapitalizedCareer} needs using our platform tools. Let me know if you want to proceed.*`,
        suggestions: ["Analyze my profile", "Start mock interview"]
      };
    }

    // Study Plan / Timetable Detection
    if (m.includes("study plan") || m.includes("timetable") || m.includes("schedule")) {
      return {
        response: `I've generated a highly focused **Study Plan** for your ${role} track. This timetable blocks out specific chunks of time to maximize learning and retention.`,
        timetable: {
          title: "Weekly Immersion Study Plan",
          schedule: [
            { day_or_time: "Monday", focus: "Core Concepts & Syntax", notes: "Read official docs, 2 hours" },
            { day_or_time: "Tuesday", focus: "Practical Application", notes: "Build a tiny project, 2 hours" },
            { day_or_time: "Wednesday", focus: "DSA & Problem Solving", notes: "Solve 3 logical problems, 1 hour" },
            { day_or_time: "Thursday", focus: "Advanced Architectures", notes: "Study design patterns, 1.5 hours" },
            { day_or_time: "Friday", focus: "Mock Interview Review", notes: "Practice speaking answers, 1 hour" },
            { day_or_time: "Saturday", focus: "Capstone Project", notes: "Deep focus coding, 4 hours" },
            { day_or_time: "Sunday", focus: "Rest & Active Recall", notes: "Review flashcards, 30 mins" }
          ]
        },
        suggestions: ["Generate roadmap", "Give me a coding question"]
      };
    }

    // Code & Error Detection
    const codePatterns = [/\bcaught error\b/i, /\bexception\b/i, /\btraceback\b/i, /\btypeerror\b/i, /\breferenceerror\b/i, /\bsyntaxerror\b/i, /=>/, /\{[\s\S]*\}/, /function\s*\(/i, /def\s+\w+\(/, /import\s+\w+/];
    if (codePatterns.some(regex => regex.test(msg))) {
      return {
        response: `It looks like you're dealing with a **Code Error** or have pasted a snippet of code.\n\n### 🔍 Initial Analysis\nWhen debugging code or errors, here is a professional checklist:\n\n**1. Read the Stack Trace:** The error message usually points to the exact file and line number where the execution failed.\n**2. Check Variable Types:** Ensure you aren't trying to call a method on \`undefined\`, \`null\`, or an incompatible type.\n**3. Syntax Issues:** Look out for missing brackets \`}\`, unclosed strings, or typoes in variable names.\n\n*Since I'm in offline career-assistant mode, I can't fully execute this code block. However, identifying the line number mentioned in your error is the fastest way to trace the bug!*`,
        suggestions: ["Explain basic debugging", "What is an Exception?"]
      };
    }

    // General Q&A Fallback for unknown questions
    if (m.split(' ').length >= 2 && !m.includes("hello") && !m.includes("hi") && !m.includes("hey")) {
       try {
         // Attempt to answer "any question" using Wikipedia API (Free, no CORS)
         const query = encodeURIComponent(msg);
         const wikiUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${query}&utf8=&format=json&origin=*`;
         
         const response = await fetch(wikiUrl);
         if (response.ok) {
            const data = await response.json();
            if (data.query && data.query.search && data.query.search.length > 0) {
              const topResult = data.query.search[0];
              // Strip HTML tags from the snippet
              let summary = topResult.snippet.replace(/<\/?[^>]+(>|$)/g, "");
              summary = summary.replace(/&quot;/g, '"').replace(/&amp;/g, '&');
              
              return { 
                response: `Based on general knowledge:\n\n**${topResult.title}**\n${summary}...\n\n*Note: I am a career assistant, but I can pull general facts when needed. Are there any coding or career topics you'd like to discuss?*`,
                suggestions: ["Ask a coding question", "Analyze my resume"] 
              };
            }
         }
       } catch (err) {
         console.warn("[AI] Wikipedia fallback failed", err);
       }
       
       // Absolute fallback if Wiki fails or finds nothing
       return { 
         response: `That's a very interesting question! I am primarily a specialized **Career & Coding AI Assistant**. I'm currently focused on helping you build your resume, prepare for technical interviews, and navigate your **${role}** career path.\n\nWould you like me to analyze your skills or give you a learning roadmap instead?`, 
         suggestions: ["Learning roadmap", "Interview tips", "Analyze my resume"] 
       }
    }

    // Default Responses
    const greetings = {
      en: `👋 I see you're interested in **${role}** roles. I can help with:\n• Building a professional resume\n• Practicing interviews\n• Finding matching jobs\nWhat's on your mind?`,
      ta: `👋 வணக்கம்! உங்கள் **${role}** பணிக்கு உதவ நான் தயார். உங்களுக்கு இன்று என்ன வேண்டும்?`,
      te: `👋 నమస్కారం! మీ **${role}** కెరీర్‌కు సహాయపడటానికి నేను ఇక్కడ ఉన్నాను.`
    };

    return {
      response: greetings[lang] || greetings.en,
      suggestions: ["Which course is best?", "Analyze this page", "Learning roadmap"]
    };
  },

  roadmap: (industry, lang) => {
    return {
      error: false,
      industry: industry || "Web Development",
      title: `🌐 ${industry || "General"} Roadmap`,
      phases: [
        { phase: "Phase 1: Foundations", duration: "4 Weeks", topics: ["HTML", "CSS", "Basic Logic"] },
        { phase: "Phase 2: Core Concepts", duration: "6 Weeks", topics: ["JavaScript", "Problem Solving"] },
        { phase: "Phase 3: Specialization", duration: "8 Weeks", topics: ["Frameworks", "Projects"] }
      ],
      skill_note: "⭐ I've prepared a standard roadmap based on industry best practices for you.",
      suggestions: ["Start Phase 1", "Save this roadmap"]
    };
  },

  analyzeInterview: (question, transcript) => {
    if (!transcript || transcript.trim().length < 5) {
      return {
        score: 0,
        strengths: ["None detected (No speech or too short)"],
        areas_for_improvement: ["You did not provide a detailed verbal answer.", "Make sure your microphone is on and speak clearly."],
        tone_analysis: "No voice or concise answer detected.",
        suggested_answer: `You were asked: '${question}'. Ensure you speak confidently and elaborately to get a proper evaluation.`
      };
    }

    return {
      score: 85,
      strengths: ["Clear communication", "Structured thinking", "Confidence"],
      areas_for_improvement: ["Elaborate more on technical details", "Slow down your speech slightly"],
      tone_analysis: "You sounded confident and well-prepared. Keep practicing!",
      suggested_answer: `For the question: '${question}', emphasize your impact and specific contributions using the STAR method.`
    };
  },

  generateResume: (data) => {
    return {
      status: "success",
      ai_summary: `Results-driven candidate focused on ${data.target_role}. Expertise in modern tech stacks and problem-solving.`,
      ai_skills_html: "<strong>Skills:</strong> Python, JavaScript, React, Node.js, SQL (Mock Data)",
      ai_experience_html: `<div class="res-item">
          <strong>${data.target_role} Intern</strong><br>
          <em>Tech Firm • 2023 - Present</em><br>
          <ul><li>Delivered impactful solutions using modern frameworks.</li></ul>
        </div>`,
      ai_projects_html: "<strong>Portfolio Project:</strong> Full Stack Web App using React and Node.",
      ai_education_html: "<strong>Degree:</strong> B.E / B.Tech (Computer Science)"
    };
  },

  evaluateMission: (title) => {
    return {
      score: 9,
      feedback: [
        "Excellent logic implementation.",
        "Code structure is clean and readable.",
        "Minor UI improvement suggested for better mobile responsiveness."
      ]
    };
  },

  suggestSkills: (role) => {
    return {
      languages: ["JavaScript", "Python", "SQL"],
      frameworks: ["React", "FastAPI", "Docker"],
      soft: ["Communication", "Critical Thinking"]
    };
  },

  scheduleSession: (data) => {
    return {
      status: "success",
      message: "Session scheduled successfully",
      phone: "9876543210" // Mock phone for WhatsApp
    };
  }
};

window.MOCK_RESPONSES = MOCK_RESPONSES;
