"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./PortfolioContent.module.css";

const capabilities = [
  {
    number: "01",
    title: "AI Applications",
    description:
      "LLM-powered tools, intelligent assistants, and practical automation built around real business workflows.",
    tags: ["AWS Bedrock", "Ollama", "Prompt systems"],
  },
  {
    number: "02",
    title: "Full Stack Products",
    description:
      "Responsive React interfaces connected to reliable Python services, data models, and third-party integrations.",
    tags: ["React", "FastAPI", "Django"],
  },
  {
    number: "03",
    title: "RAG Systems",
    description:
      "Grounded document intelligence using retrieval, embeddings, structured context, and controlled generation.",
    tags: ["Vector search", "Embeddings", "Document Q&A"],
  },
  {
    number: "04",
    title: "Automation",
    description:
      "Resilient scraping and data pipelines for repetitive, dynamic, and operationally expensive processes.",
    tags: ["Playwright", "Selenium", "Data pipelines"],
  },
];

const skillGroups = [
  {
    title: "Languages",
    skills: ["Python", "JavaScript", "TypeScript", "SQL", "HTML5", "CSS3"],
  },
  {
    title: "Frontend",
    skills: ["React.js", "Next.js", "Tailwind CSS", "Responsive UI"],
  },
  {
    title: "Backend",
    skills: ["FastAPI", "Django", "Flask", "REST APIs", "JWT", "RBAC"],
  },
  {
    title: "Data & AI",
    skills: [
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "AWS Bedrock",
      "Ollama",
      "RAG",
    ],
  },
  {
    title: "Automation & Tools",
    skills: ["Playwright", "Selenium", "Git", "GitHub", "CI/CD"],
  },
];

const experience = [
  {
    period: "Mar 2026 - Present",
    role: "Python Full Stack Developer",
    company: "Vpearl Solutions Pvt Ltd",
    location: "Chennai, India",
    points: [
      "Developing full-stack applications with Python, React.js, and modern frameworks.",
      "Building and integrating REST APIs for frontend and third-party requirements.",
      "Collaborating across product, testing, and engineering to deliver scalable software.",
      "Contributing to code reviews and continuous improvement of development workflows.",
    ],
  },
  {
    period: "Mar 2025 - Feb 2026",
    role: "Python Backend Developer",
    company: "Access Healthcare Services Pvt Ltd",
    location: "Chennai, India",
    points: [
      "Developed Flask and Django services for real-time, data-driven applications.",
      "Created secure REST APIs with JWT authentication and role-based access control.",
      "Built Selenium scraping pipelines for dynamic content and CAPTCHA workflows.",
      "Improved reliability through logging, exception handling, monitoring, and CI/CD.",
    ],
  },
  {
    period: "Apr 2024 - Mar 2025",
    role: "Python Developer",
    company: "Azista Industries Pvt Ltd",
    location: "Bangalore, India",
    points: [
      "Designed and deployed scalable applications using Django and FastAPI.",
      "Built APIs for authentication, data processing, and third-party integrations.",
      "Created React and TypeScript interfaces with responsive frontend patterns.",
      "Designed PostgreSQL and MySQL schemas and managed MongoDB data.",
    ],
  },
];

const projects = [
  {
    index: "01",
    title: "Appeal Notes",
    category: "GenAI Medical",
    summary:
      "A medical summarization pipeline that turns structured claims and practice notes into professional insurance appeal drafts.",
    stack: ["FastAPI", "AWS Bedrock", "Ollama", "NLP"],
    problem:
      "Appeal letters were inconsistent, often missed clinical context, and required more than 30 minutes per case.",
    approach:
      "Combined structured claim data with free-text practice notes in a guarded FastAPI pipeline, using Bedrock as the primary model and local Ollama inference as a resilient fallback.",
    architecture: [
      "FastAPI service",
      "Bedrock primary with Ollama fallback",
      "Structured and unstructured input merger",
      "Tone and length guardrails",
    ],
    challenges: [
      "Handling sensitive information carefully",
      "Hybrid local and cloud inference",
      "Avoiding generic appeal language",
    ],
    results: [
      "Draft time reduced from 30 minutes to about three",
      "Higher first-pass approval performance",
      "Resilient operation during Bedrock rate limits",
    ],
    learnings: [
      "Local models are useful operational fallbacks",
      "Professional tone depends heavily on prompt design",
    ],
    future: [
      "RAG over successful historical appeals",
      "Per-payer style tuning",
    ],
  },
  {
    index: "02",
    title: "Pre Call Summary",
    category: "LLM Productivity",
    summary:
      "An automated briefing service that consolidates CRM, email, and note context into concise pre-call intelligence.",
    stack: ["Python", "Bedrock Sonnet", "Ollama", "Automation"],
    problem:
      "Account managers entered calls with important context scattered across several disconnected systems.",
    approach:
      "Created a scheduled Python service that gathers account context, removes duplicates, summarizes the highest-value information, and delivers a five-point brief before each meeting.",
    architecture: [
      "Python scheduler",
      "Multi-source context fetcher",
      "Bedrock Sonnet summarizer",
      "Email and Slack delivery",
    ],
    challenges: [
      "Scoring what matters in noisy context",
      "Deduplicating repeated information",
      "Controlling cost for long prompts",
    ],
    results: [
      "About 15 minutes saved per call",
      "Improved meeting preparation quality",
      "Cost kept below $0.02 per brief",
    ],
    learnings: [
      "Brevity is a product feature",
      "Simple scheduled LLM workflows can create strong value",
    ],
    future: [
      "Live transcript follow-up notes",
      "Automatic CRM updates after calls",
    ],
  },
];

const metrics = [
  ["2.2+", "Years building"],
  ["10+", "Projects shipped"],
  ["12", "AI models explored"],
  ["4", "Hackathons"],
  ["8", "Certificates"],
  ["600+", "GitHub commits"],
];

export default function PortfolioContent() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    gsap.registerPlugin(ScrollTrigger);
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const context = gsap.context(() => {
      const revealElements = gsap.utils.toArray<HTMLElement>("[data-reveal]");

      if (reducedMotion) {
        gsap.set(revealElements, { opacity: 1, y: 0 });
        return;
      }

      revealElements.forEach((element) => {
        gsap.fromTo(
          element,
          { opacity: 0, y: 42 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 88%",
              once: true,
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-project]").forEach((card) => {
        gsap.fromTo(
          card,
          { clipPath: "inset(0 0 18% 0)", opacity: 0.55 },
          {
            clipPath: "inset(0 0 0% 0)",
            opacity: 1,
            duration: 1.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 86%",
              once: true,
            },
          },
        );
      });
    }, root);

    return () => context.revert();
  }, []);

  return (
    <main ref={rootRef} id="work" className={styles.main}>
      <section id="about" className={styles.about}>
        <div className={styles.sectionMeta} data-reveal>
          <span>01</span>
          <p>Profile</p>
        </div>
        <div className={styles.aboutGrid}>
          <div className={styles.aboutCopy} data-reveal>
            <p className={styles.kicker}>Full Stack &amp; AI Engineer</p>
            <p>
              I am Aravindkumar R, a developer from Dharmapuri building
              scalable products with Python, React, FastAPI, and applied AI.
              I treat code as a craft: dependable underneath, thoughtful on
              the surface, and designed around the people using it.
            </p>
            <p>
              My work spans healthcare platforms, secure APIs, RAG systems,
              LLM pipelines, data automation, and responsive frontend
              experiences.
            </p>
            <div className={styles.inlineLinks}>
              <a
                href="/resume/Aravindkumar_Resume.pdf"
                target="_blank"
                rel="noreferrer"
              >
                View resume <span aria-hidden="true">↗</span>
              </a>
              <a
                href="https://www.linkedin.com/in/aravindkumar-r-036a70340"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>
        <div className={styles.metrics}>
          {metrics.map(([value, label]) => (
            <div key={label} data-reveal>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.capabilities}>
        <div className={styles.sectionHeading} data-reveal>
          <div className={styles.sectionMeta}>
            <span>02</span>
            <p>Capabilities</p>
          </div>
          <h2>What I build</h2>
          <p>
            Focused engineering for products that need intelligence,
            reliability, and a polished user experience.
          </p>
        </div>
        <div className={styles.capabilityGrid}>
          {capabilities.map((item) => (
            <article key={item.number} data-reveal>
              <span>{item.number}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <ul>
                {item.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.toolkit}>
        <div className={styles.toolkitIntro} data-reveal>
          <div className={styles.sectionMeta}>
            <span>03</span>
            <p>Toolkit</p>
          </div>
        </div>
        <div className={styles.skillGroups}>
          {skillGroups.map((group) => (
            <div className={styles.skillGroup} key={group.title} data-reveal>
              <h3>{group.title}</h3>
              <div>
                {group.skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="experience" className={styles.experience}>
        <div className={styles.sectionHeading} data-reveal>
          <div className={styles.sectionMeta}>
            <span>04</span>
            <p>Experience</p>
          </div>
        </div>
        <div className={styles.timeline}>
          {experience.map((job, index) => (
            <article key={job.company} data-reveal>
              <div className={styles.timelineIndex}>
                <span>0{index + 1}</span>
                <i aria-hidden="true" />
              </div>
              <div className={styles.jobMeta}>
                <p>{job.period}</p>
                <span>{job.location}</span>
              </div>
              <div className={styles.jobBody}>
                <p>{job.company}</p>
                <h3>{job.role}</h3>
                <ul>
                  {job.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="projects" className={styles.projects}>
        <div className={styles.projectHeading} data-reveal>
          <div className={styles.sectionMeta}>
            <span>05</span>
            <p>Selected case studies</p>
          </div>
        </div>
        <div className={styles.projectList}>
          {projects.map((project) => (
            <article
              className={styles.project}
              key={project.index}
              data-project
            >
              <div className={styles.projectTop}>
                <div>
                  <span>{project.index}</span>
                  <p>{project.category}</p>
                </div>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
              </div>
              <div className={styles.stack}>
                {project.stack.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
              <details className={styles.caseStudy}>
                <summary>
                  Explore case study
                  <span aria-hidden="true">+</span>
                </summary>
                <div className={styles.caseStudyBody}>
                  <div>
                    <h4>Problem</h4>
                    <p>{project.problem}</p>
                  </div>
                  <div>
                    <h4>Approach</h4>
                    <p>{project.approach}</p>
                  </div>
                  <CaseList title="Architecture" items={project.architecture} />
                  <CaseList title="Challenges" items={project.challenges} />
                  <CaseList title="Results" items={project.results} />
                  <CaseList title="Learnings" items={project.learnings} />
                  <CaseList title="Next" items={project.future} />
                </div>
              </details>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.journey}>
        <div className={styles.journeyLead} data-reveal>
          <div className={styles.sectionMeta}>
            <span>06</span>
            <p>Journey</p>
          </div>
          <p>
            From a CSE foundation at Anna University to full-stack product
            delivery and applied AI systems.
          </p>
        </div>
        <div className={styles.journeySteps}>
          <article data-reveal>
            <span>2020</span>
            <h3>The beginning</h3>
            <p>Started Computer Science Engineering and wrote the first lines of code.</p>
          </article>
          <article data-reveal>
            <span>2022</span>
            <h3>Learning the craft</h3>
            <p>Deepened Python, web, and database skills while earning an 8.1 CGPA.</p>
          </article>
          <article data-reveal>
            <span>2024</span>
            <h3>Shipping for real</h3>
            <p>Moved into production APIs, scraping, databases, and full-stack delivery.</p>
          </article>
          <article data-reveal>
            <span>2025 - Now</span>
            <h3>The AI era</h3>
            <p>Building RAG, LLM, and Bedrock workflows that solve measurable product problems.</p>
          </article>
        </div>
      </section>

      <section id="contact" className={styles.contact}>
        <p className={styles.contactLabel} data-reveal>
          Have a product problem worth solving?
        </p>
        <div className={styles.contactActions} data-reveal>
          <a href="mailto:akaravind110@gmail.com?subject=Portfolio enquiry">
            Start a conversation
          </a>
          <a
            href="https://wa.me/919361231747"
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp
          </a>
          <a href="tel:+919361231747">+91 93612 31747</a>
        </div>
        <footer>
          <p>Aravindkumar R</p>
          <span>Dharmapuri / Chennai, India</span>
          <span>Full Stack &amp; AI Engineer · 2026</span>
        </footer>
      </section>
    </main>
  );
}

function CaseList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4>{title}</h4>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
