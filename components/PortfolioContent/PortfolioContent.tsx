"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./PortfolioContent.module.css";

const highlights = [
  { value: "2.2", label: "Years of experience" },
  { value: "3", label: "Professional roles" },
  { value: "3", label: "AI projects" },
  { value: "3", label: "Backend frameworks" },
  { value: "3", label: "Database systems" },
];

const capabilities = [
  {
    number: "01",
    title: "Backend Engineering",
    description:
      "Scalable Python services, secure REST APIs, authentication, integrations, and maintainable application architecture.",
    tags: ["Python", "FastAPI", "Django", "Flask"],
  },
  {
    number: "02",
    title: "Frontend Development",
    description:
      "Responsive React interfaces that connect cleanly with backend services and support practical user workflows.",
    tags: ["React.js", "TypeScript", "Tailwind CSS"],
  },
  {
    number: "03",
    title: "Applied AI",
    description:
      "Business-focused AI workflows for healthcare summaries, claim analysis, and concise decision support.",
    tags: ["AWS Bedrock", "Ollama", "NLP"],
  },
  {
    number: "04",
    title: "Automation & Data",
    description:
      "Scraping pipelines, structured data processing, database design, and reliable third-party data integration.",
    tags: ["Playwright", "Selenium", "SQL"],
  },
];

const experience = [
  {
    period: "Mar 2026 - Present",
    role: "Python Full Stack Developer",
    company: "Vpearl Solutions Pvt Ltd",
    location: "Chennai, India",
    points: [
      "Developing and maintaining full-stack web applications with Python, React.js, and modern frameworks.",
      "Building and integrating RESTful APIs for frontend and third-party service requirements.",
      "Collaborating with cross-functional teams to deliver scalable, high-quality software.",
      "Contributing to code reviews, testing, and continuous improvement of development workflows.",
    ],
  },
  {
    period: "Mar 2025 - Feb 2026",
    role: "Python Backend Developer",
    company: "Access Healthcare Services Pvt Ltd",
    location: "Chennai, India",
    points: [
      "Developed Flask and Django backend systems for real-time, data-driven applications.",
      "Created secure REST APIs with JWT authentication and role-based access control.",
      "Built Selenium scraping pipelines for dynamic content and CAPTCHA scenarios.",
      "Improved reliability with logging, exception handling, and monitoring.",
      "Supported React integrations, code reviews, and CI/CD workflows.",
    ],
  },
  {
    period: "Apr 2024 - Mar 2025",
    role: "Python Developer",
    company: "Azista Industries Pvt Ltd",
    location: "Bangalore, India",
    points: [
      "Designed, developed, and deployed web applications using Django and FastAPI.",
      "Built REST APIs for authentication, data processing, and external integrations.",
      "Developed responsive interfaces with React, TypeScript, HTML5, and Tailwind CSS.",
      "Designed PostgreSQL and MySQL schemas and managed MongoDB data.",
      "Produced reusable, modular, and documented code using established design patterns.",
    ],
  },
];

const projects = [
  {
    index: "01",
    title: "AI Claim Pathway",
    category: "Healthcare AI",
    summary:
      "A full-stack claim processing tool that parses healthcare claim JSON and supports guided analysis through AI-generated prompts.",
    stack: ["React", "Flask", "AWS Bedrock", "Excel / CSV"],
    contributions: [
      "Built the React and Flask application flow for claim analysis.",
      "Integrated Excel and CSV pipelines with APIs for claim details and prompts.",
      "Enabled real-time decision support for healthcare workflows.",
    ],
  },
  {
    index: "02",
    title: "Appeal Notes",
    category: "AI Medical Summary",
    summary:
      "An AI-powered service that converts claim data and practice notes into professional medical insurance appeal summaries.",
    stack: ["FastAPI", "AWS Bedrock", "Ollama", "NLP"],
    contributions: [
      "Combined structured claim information with unstructured practice notes.",
      "Used AWS Bedrock and Ollama for natural-language generation and automation.",
      "Designed the workflow around clear, professional appeal output.",
    ],
  },
  {
    index: "03",
    title: "Pre Call Summary",
    category: "AI Productivity",
    summary:
      "An automated briefing workflow that produces concise pre-call summaries for business meetings.",
    stack: ["Python", "Bedrock Sonnet", "Ollama", "Automation"],
    contributions: [
      "Developed the Python workflow for preparing meeting context.",
      "Integrated Bedrock Sonnet and Ollama for summarization.",
      "Focused output on concise information that supports call preparation.",
    ],
  },
];

const skillGroups = [
  {
    title: "Languages",
    skills: ["Python", "JavaScript", "TypeScript"],
  },
  {
    title: "Backend",
    skills: ["Django", "Flask", "FastAPI", "RESTful APIs", "JWT", "RBAC"],
  },
  {
    title: "Frontend",
    skills: ["React.js", "HTML5", "CSS3", "Tailwind CSS", "Responsive UI"],
  },
  {
    title: "AI & Automation",
    skills: ["AWS Bedrock", "Ollama", "Playwright", "Selenium"],
  },
  {
    title: "Databases & Tools",
    skills: ["MySQL", "PostgreSQL", "MongoDB", "Git", "GitHub", "CI/CD"],
  },
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
    let removeInteractions: () => void = () => {};

    const context = gsap.context(() => {
      const revealElements = gsap.utils.toArray<HTMLElement>(
        "[data-reveal]:not([data-card]):not([data-heading])",
      );
      const headingElements =
        gsap.utils.toArray<HTMLElement>("[data-heading]");
      const cardElements = gsap.utils.toArray<HTMLElement>("[data-card]");
      const cardGroups =
        gsap.utils.toArray<HTMLElement>("[data-card-group]");
      const headingWords =
        gsap.utils.toArray<HTMLElement>("[data-heading-word]");
      const progress = root.querySelector<HTMLElement>(
        "[data-scroll-progress]",
      );

      if (reducedMotion) {
        gsap.set(
          [
            ...revealElements,
            ...headingElements,
            ...headingWords,
            ...cardElements,
          ],
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            filter: "blur(0px)",
            clipPath: "inset(0 0 0% 0)",
          },
        );
        gsap.set(progress, { scaleY: 1 });
        return;
      }

      if (progress) {
        gsap.fromTo(
          progress,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top bottom",
              end: "bottom bottom",
              scrub: 0.35,
            },
          },
        );
      }

      revealElements.forEach((element) => {
        gsap.fromTo(
          element,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 90%",
              once: true,
            },
          },
        );
      });

      headingElements.forEach((heading) => {
        const meta = heading.querySelector<HTMLElement>("[data-heading-meta]");
        const words = heading.querySelectorAll<HTMLElement>(
          "[data-heading-word]",
        );
        const description = heading.querySelector<HTMLElement>(
          "[data-heading-description]",
        );

        const headingTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: heading,
            start: "top 86%",
            once: true,
          },
        });

        headingTimeline
          .fromTo(
            meta,
            { opacity: 0, x: -24 },
            {
              opacity: 1,
              x: 0,
              duration: 0.7,
              ease: "power3.out",
            },
          )
          .fromTo(
            words,
            {
              opacity: 0,
              yPercent: 115,
              rotate: 2,
              filter: "blur(8px)",
            },
            {
              opacity: 1,
              yPercent: 0,
              rotate: 0,
              filter: "blur(0px)",
              duration: 0.85,
              stagger: 0.055,
              ease: "expo.out",
            },
            "-=0.45",
          )
          .fromTo(
            description,
            { opacity: 0, y: 18 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power3.out",
            },
            "-=0.5",
          );
      });

      cardGroups.forEach((group) => {
        const cards = Array.from(
          group.querySelectorAll<HTMLElement>("[data-card]"),
        );
        if (!cards.length) return;

        gsap.set(cards, {
          opacity: 0,
          y: 52,
          scale: 0.965,
          rotateX: 6,
          transformPerspective: 1000,
        });

        gsap.to(cards, {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          duration: 1,
          stagger: 0.105,
          ease: "power3.out",
          clearProps: "transform",
          scrollTrigger: {
            trigger: group,
            start: "top 88%",
            once: true,
          },
        });

        const chips = group.querySelectorAll<HTMLElement>("[data-chip]");
        if (chips.length) {
          gsap.fromTo(
            chips,
            { opacity: 0, y: 10, scale: 0.92 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.55,
              stagger: 0.025,
              ease: "power2.out",
              scrollTrigger: {
                trigger: group,
                start: "top 82%",
                once: true,
              },
            },
          );
        }
      });

      cardElements
        .filter((card) => !card.closest("[data-card-group]"))
        .forEach((card) => {
          gsap.fromTo(
            card,
            {
              opacity: 0,
              y: 44,
              scale: 0.97,
              rotateX: 5,
              transformPerspective: 900,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              rotateX: 0,
              duration: 0.9,
              ease: "power3.out",
              clearProps: "transform",
              scrollTrigger: {
                trigger: card,
                start: "top 90%",
                once: true,
              },
            },
          );
        });

      root.querySelectorAll<HTMLElement>("[data-count]").forEach((counter) => {
        const target = Number(counter.dataset.count ?? 0);
        const decimals = Number.isInteger(target) ? 0 : 1;
        const state = { value: 0 };

        gsap.to(state, {
          value: target,
          duration: 1.45,
          ease: "power2.out",
          scrollTrigger: {
            trigger: counter,
            start: "top 90%",
            once: true,
          },
          onUpdate: () => {
            counter.textContent = state.value.toFixed(decimals);
          },
        });
      });

      root.querySelectorAll<HTMLElement>("[data-project-card]").forEach(
        (project) => {
          const content = project.querySelector<HTMLElement>(
            "[data-project-content]",
          );
          const points = project.querySelector<HTMLElement>(
            "[data-project-points]",
          );

          gsap.to(content, {
            y: -18,
            ease: "none",
            scrollTrigger: {
              trigger: project,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.8,
            },
          });
          gsap.to(points, {
            y: 18,
            ease: "none",
            scrollTrigger: {
              trigger: project,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.8,
            },
          });
        },
      );

      if (window.matchMedia("(pointer: fine)").matches) {
        const cleanups: Array<() => void> = [];

        root.querySelectorAll<HTMLElement>("[data-tilt]").forEach((card) => {
          const rotateX = gsap.quickTo(card, "rotationX", {
            duration: 0.55,
            ease: "power3.out",
          });
          const rotateY = gsap.quickTo(card, "rotationY", {
            duration: 0.55,
            ease: "power3.out",
          });
          const lift = gsap.quickTo(card, "y", {
            duration: 0.45,
            ease: "power3.out",
          });

          const handleMove = (event: PointerEvent) => {
            const bounds = card.getBoundingClientRect();
            const x = (event.clientX - bounds.left) / bounds.width;
            const y = (event.clientY - bounds.top) / bounds.height;

            card.style.setProperty("--spot-x", `${x * 100}%`);
            card.style.setProperty("--spot-y", `${y * 100}%`);
            rotateX((0.5 - y) * 3.5);
            rotateY((x - 0.5) * 4.5);
            lift(-6);
          };

          const handleLeave = () => {
            rotateX(0);
            rotateY(0);
            lift(0);
          };

          card.addEventListener("pointermove", handleMove);
          card.addEventListener("pointerleave", handleLeave);
          cleanups.push(() => {
            card.removeEventListener("pointermove", handleMove);
            card.removeEventListener("pointerleave", handleLeave);
          });
        });

        root
          .querySelectorAll<HTMLElement>("[data-magnetic]")
          .forEach((button) => {
            const moveX = gsap.quickTo(button, "x", {
              duration: 0.35,
              ease: "power3.out",
            });
            const moveY = gsap.quickTo(button, "y", {
              duration: 0.35,
              ease: "power3.out",
            });

            const handleMove = (event: PointerEvent) => {
              const bounds = button.getBoundingClientRect();
              moveX((event.clientX - bounds.left - bounds.width / 2) * 0.12);
              moveY((event.clientY - bounds.top - bounds.height / 2) * 0.18);
            };
            const handleLeave = () => {
              moveX(0);
              moveY(0);
            };

            button.addEventListener("pointermove", handleMove);
            button.addEventListener("pointerleave", handleLeave);
            cleanups.push(() => {
              button.removeEventListener("pointermove", handleMove);
              button.removeEventListener("pointerleave", handleLeave);
            });
          });

        removeInteractions = () => cleanups.forEach((cleanup) => cleanup());
      }
    }, root);

    return () => {
      removeInteractions();
      context.revert();
    };
  }, []);

  return (
    <main ref={rootRef} id="work" className={styles.main}>
      <div className={styles.scrollRail} aria-hidden="true">
        <span>Scroll</span>
        <i>
          <b data-scroll-progress />
        </i>
      </div>
      <section id="about" className={styles.about}>
        <SectionHeading
          number="01"
          label="Profile"
          title="Full-stack developer focused on reliable products and practical AI."
          description="I work across backend services, responsive interfaces, data workflows, and AI integrations."
        />

        <div className={styles.profileGrid} data-card-group>
          <article className={styles.profileCard} data-card data-tilt>
            <p className={styles.kicker}>Professional summary</p>
            <p className={styles.profileLead}>
              I&apos;m Aravindkumar R, a Full Stack Developer with 2.2 years
              of experience building scalable and user-friendly web
              applications.
            </p>
            <p>
              My core stack includes Python, SQL, React.js, JavaScript,
              TypeScript, and FastAPI. I enjoy connecting dependable backend
              systems with responsive frontend experiences and applying AI
              where it creates useful business value.
            </p>
            <div className={styles.profileActions}>
              <a
                className={styles.primaryAction}
                href="/resume/Aravindkumar_Resume.pdf"
                target="_blank"
                rel="noreferrer"
                data-magnetic
              >
                View resume <span aria-hidden="true">↗</span>
              </a>
              <a
                href="https://www.linkedin.com/in/aravindkumar-r-036a70340"
                target="_blank"
                rel="noreferrer"
                data-magnetic
              >
                LinkedIn <span aria-hidden="true">↗</span>
              </a>
            </div>
          </article>

          <aside className={styles.profileDetails} data-card data-tilt>
            <DetailRow label="Current role" value="Python Full Stack Developer" />
            <DetailRow label="Company" value="Vpearl Solutions Pvt Ltd" />
            <DetailRow label="Based in" value="Chennai, India" />
            <DetailRow label="Email" value="akaravind110@gmail.com" />
            <DetailRow label="Phone" value="+91 93612 31747" />
          </aside>
        </div>

        <div className={styles.highlights} data-card-group>
          {highlights.map((item) => (
            <article key={item.label} data-card data-tilt>
              <strong data-count={item.value}>{item.value}</strong>
              <span>{item.label}</span>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.capabilities}>
        <SectionHeading
          number="02"
          label="Expertise"
          title="What I bring to a product team"
          description="End-to-end development across APIs, interfaces, databases, AI services, and automation."
        />
        <div className={styles.capabilityGrid} data-card-group>
          {capabilities.map((item) => (
            <article key={item.number} data-card data-tilt>
              <span className={styles.cardNumber}>{item.number}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <ul>
                {item.tags.map((tag) => (
                  <li key={tag} data-chip>{tag}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section id="experience" className={styles.experience}>
        <SectionHeading
          number="03"
          label="Experience"
          title="Professional experience"
          description="Progressive responsibility across Python development, backend engineering, and full-stack delivery."
        />
        <div className={styles.timeline} data-card-group>
          {experience.map((job, index) => (
            <article key={job.company} data-card data-tilt>
              <div className={styles.timelineNumber}>0{index + 1}</div>
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
        <SectionHeading
          number="04"
          label="Projects"
          title="Selected AI and full-stack work"
          description="Projects from my resume that combine Python services, modern interfaces, automation, and language models."
        />
        <div className={styles.projectList} data-card-group>
          {projects.map((project) => (
            <article
              className={styles.project}
              key={project.index}
              data-card
              data-tilt
              data-project-card
            >
              <div className={styles.projectMeta}>
                <span>{project.index}</span>
                <p>{project.category}</p>
              </div>
              <div className={styles.projectContent} data-project-content>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
                <div className={styles.stack}>
                  {project.stack.map((item) => (
                    <span key={item} data-chip>{item}</span>
                  ))}
                </div>
              </div>
              <ul className={styles.projectPoints} data-project-points>
                {project.contributions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.toolkit}>
        <SectionHeading
          number="05"
          label="Technical skills"
          title="Tools I use"
          description="A practical stack for building, integrating, automating, and maintaining modern web applications."
        />
        <div className={styles.skillGroups} data-card-group>
          {skillGroups.map((group) => (
            <article
              className={styles.skillGroup}
              key={group.title}
              data-card
              data-tilt
            >
              <h3>{group.title}</h3>
              <div>
                {group.skills.map((skill) => (
                  <span key={skill} data-chip>{skill}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className={styles.contact}>
        <div data-reveal>
          <p className={styles.contactLabel}>Contact</p>
          <h2>Let&apos;s discuss your next web or AI product.</h2>
          <p className={styles.contactCopy}>
            Reach me directly for full-stack development, Python backend,
            automation, or applied AI opportunities.
          </p>
        </div>
        <div className={styles.contactActions} data-reveal>
          <a
            className={styles.primaryAction}
            href="mailto:akaravind110@gmail.com?subject=Portfolio enquiry"
            data-magnetic
          >
            Email me
          </a>
          <a
            href="https://www.linkedin.com/in/aravindkumar-r-036a70340"
            target="_blank"
            rel="noreferrer"
            data-magnetic
          >
            LinkedIn
          </a>
          <a
            href="https://wa.me/919361231747"
            target="_blank"
            rel="noreferrer"
            data-magnetic
          >
            WhatsApp
          </a>
          <a href="tel:+919361231747" data-magnetic>+91 93612 31747</a>
        </div>
        <footer>
          <p>Aravindkumar R</p>
          <span>Full Stack Developer</span>
          <span>Chennai, India · 2026</span>
        </footer>
      </section>
    </main>
  );
}

function SectionHeading({
  number,
  label,
  title,
  description,
}: {
  number: string;
  label: string;
  title: string;
  description: string;
}) {
  return (
    <div className={styles.sectionHeading} data-heading>
      <div className={styles.sectionMeta} data-heading-meta>
        <span>{number}</span>
        <p>{label}</p>
      </div>
      <h2 aria-label={title}>
        {title.split(" ").map((word, index) => (
          <span className={styles.headingWord} key={`${word}-${index}`}>
            <span data-heading-word aria-hidden="true">{word}</span>
          </span>
        ))}
      </h2>
      <p data-heading-description>{description}</p>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span>{label}</span>
      <p>{value}</p>
    </div>
  );
}
