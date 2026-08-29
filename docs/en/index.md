---
layout: home

hero:
  name: 'AI Engineering & Agents'
  text: 'LangGraph · FastAPI · AWS · Agent · LLM'
  tagline: Seventeen systematic tutorials from zero to production — every chapter ships quizzes and hands-on exercises
  actions:
    - theme: brand
      text: Start Learning →
      link: /en/http/
    - theme: alt
      text: ☁️ Cloudflare Mirror
      link: https://agentic-tutorial.pages.dev
    - theme: alt
      text: ▲ Vercel Mirror
      link: https://agentic-tutorial.vercel.app
---

## Why These Tutorials

<div class="features-grid">

<div class="feature-card">
  <div class="feature-icon">📐</div>
  <div class="feature-title">From Zero to Production</div>
  <p class="feature-desc">Every course starts from environment setup and progresses through four stages — beginner → intermediate → advanced → production. Total beginners can keep up.</p>
</div>

<div class="feature-card">
  <div class="feature-icon">🎯</div>
  <div class="feature-title">Learn-and-Practice Loop</div>
  <p class="feature-desc">Every chapter includes runnable example code, 4 interactive quiz questions (wrong answers reveal the correct choice plus an explanation), and 3 hands-on exercises.</p>
</div>

<div class="feature-card">
  <div class="feature-icon">✅</div>
  <div class="feature-title">Faithful to Official Docs</div>
  <p class="feature-desc">Content is written strictly against each project's latest official documentation; see the per-course version baseline on the [About page](/en/about/).</p>
</div>

<div class="feature-card">
  <div class="feature-icon">🏗️</div>
  <div class="feature-title">Production-Oriented</div>
  <p class="feature-desc">Every course ends with real production scenarios — CI integration, containerized deployment, observability, and launch checklists. Learn exactly what you'll use.</p>
</div>

<div class="feature-card">
  <div class="feature-icon">🛠️</div>
  <div class="feature-title">Capstones Throughout</div>
  <p class="feature-desc">Thirteen courses include complete portfolio-ready projects covering RAG, multi-agent collaboration, full-stack services, and cloud deployment.</p>
</div>

</div>

### Featured Capstone Projects

<div class="project-grid">

<div class="project-card">
  <span class="project-tag web">🌐 Web & Testing</span>
  <div class="project-name">HTTP Requests</div>
  <p class="project-desc">GitHub API client: full-stack requests/httpx wrapper with auth, rate limiting, caching, and a CLI tool</p>
</div>

<div class="project-card">
  <span class="project-tag test">✅ Test Engineering</span>
  <div class="project-name">pytest</div>
  <p class="project-desc">CI test governance: fixture factories, parametrization matrix, coverage gates, and parallel runs with pytest-xdist</p>
</div>

<div class="project-card">
  <span class="project-tag test">✅ Test Engineering</span>
  <div class="project-name">Playwright</div>
  <p class="project-desc">E2E strategy & reporting: Page Object architecture, multi-browser parallelism, trace viewer, and CI integration</p>
</div>

<div class="project-card">
  <span class="project-tag web">🌐 Web & Testing</span>
  <div class="project-name">Locust</div>
  <p class="project-desc">Full-chain load testing: distributed HttpUser scripts, live Web UI monitoring, Docker/K8s cluster stress tests</p>
</div>

<div class="project-card">
  <span class="project-tag web">🌐 Web & Testing</span>
  <div class="project-name">FastAPI</div>
  <p class="project-desc">Production deployment: Docker image optimization, Uvicorn multi-worker, health checks, and rolling restarts</p>
</div>

<div class="project-card">
  <span class="project-tag agent">🤖 Agent Frameworks</span>
  <div class="project-name">Agno</div>
  <p class="project-desc">Three capstones: data analysis assistant (tools → charts → Workflow) · multi-source research team · customer-service KB agent on AgentOS</p>
</div>

<div class="project-card">
  <span class="project-tag agent">🤖 Agent Frameworks</span>
  <div class="project-name">CrewAI</div>
  <p class="project-desc">Three capstones: content marketing pipeline · data analysis pipeline · competitor intelligence Crew (hierarchical + Flow)</p>
</div>

<div class="project-card">
  <span class="project-tag agent">🤖 Agent Frameworks</span>
  <div class="project-name">Mastra</div>
  <p class="project-desc">Three capstones: production support agent · full-stack AI app (Workflow + RAG + Memory) · BI data Q&A agent</p>
</div>

<div class="project-card">
  <span class="project-tag agent">🤖 Agent Frameworks</span>
  <div class="project-name">Flue</div>
  <p class="project-desc">Three capstones: GitHub auto-triage agent · Slack on-call assistant (Sandboxes isolation + multi-cloud deploy) · code review agent</p>
</div>

<div class="project-card">
  <span class="project-tag agent">🤖 Agent Frameworks</span>
  <div class="project-name">FirstMate</div>
  <p class="project-desc">Three capstones: personal dev fleet · multi-project parallel delivery pipeline · Secondmate remote fleet at scale</p>
</div>

<div class="project-card">
  <span class="project-tag agent">🤖 Agent Frameworks</span>
  <div class="project-name">Pi Agent Development</div>
  <p class="project-desc">Three capstones: test agent end-to-end (requirements → cases → automation) · execution & reporting · CI integration with scheduled regression</p>
</div>

<div class="project-card">
  <span class="project-tag prod">🧠 AI Production</span>
  <div class="project-name">Vercel AI SDK</div>
  <p class="project-desc">Three capstones: semantic search KB Q&A (RAG) · multi-agent support ticketing · full-stack streaming chat (multi-gateway compatible)</p>
</div>

<div class="project-card">
  <span class="project-tag prod">🧠 AI Production</span>
  <div class="project-name">Agent Engineering in Production</div>
  <p class="project-desc">Three capstones: RAG knowledge base agent · multi-agent ticketing system · full-stack agent service (end-to-end on AWS ECS/SQS)</p>
</div>

</div>

<style scoped>
.features-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
  margin: 1.5rem 0 2.5rem;
}
.feature-card {
  background: var(--gh-canvas-subtle);
  border: 1px solid var(--gh-border);
  border-radius: 8px;
  padding: 1.25rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.feature-card:hover {
  border-color: var(--gh-accent);
  box-shadow: 0 4px 14px rgba(9, 105, 218, 0.10);
}
.feature-icon {
  font-size: 2em;
  margin-bottom: 0.5rem;
}
.feature-title {
  font-weight: 700;
  font-size: 1em;
  color: var(--gh-fg);
  margin-bottom: 0.4rem;
}
.feature-desc {
  font-size: 0.85em;
  color: var(--gh-muted);
  line-height: 1.55;
  margin: 0;
}

/* Capstone project cards */
.project-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
  margin: 1rem 0 2.5rem;
}
.project-card {
  background: var(--gh-canvas-subtle);
  border: 1px solid var(--gh-border);
  border-radius: 8px;
  padding: 1rem 1.1rem;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.project-card:hover {
  border-color: var(--gh-accent);
  box-shadow: 0 4px 14px rgba(9, 105, 218, 0.10);
}
.project-tag {
  display: inline-block;
  font-size: 0.72em;
  font-weight: 600;
  border-radius: 4px;
  padding: 0.08em 0.4em;
  margin-bottom: 0.4rem;
  border: 1px solid;
}
.project-tag.web { color: #0550ae; border-color: rgba(5,80,174,0.3); background: rgba(5,80,174,0.07); }
.project-tag.test { color: #8250df; border-color: rgba(130,80,223,0.3); background: rgba(130,80,223,0.07); }
.project-tag.agent { color: #1f883d; border-color: rgba(31,136,61,0.3); background: rgba(31,136,61,0.07); }
.project-tag.prod { color: #9e6a03; border-color: rgba(158,106,3,0.3); background: rgba(158,106,3,0.07); }
.project-name {
  font-weight: 700;
  font-size: 0.95em;
  color: var(--gh-fg);
  margin: 0 0 0.3rem;
}
.project-desc {
  font-size: 0.83em;
  color: var(--gh-muted);
  line-height: 1.5;
  margin: 0;
}

@media (max-width: 1100px) {
  .features-grid { grid-template-columns: repeat(3, 1fr); }
  .project-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 640px) {
  .features-grid { grid-template-columns: repeat(2, 1fr); }
  .project-grid { grid-template-columns: 1fr; }
}
</style>
