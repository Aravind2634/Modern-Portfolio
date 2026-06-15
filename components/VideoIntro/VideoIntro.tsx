"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import CinematicLayer from "@/components/CinematicLayer/CinematicLayer";
import styles from "./VideoIntro.module.css";

const VIDEO_SOURCE = "/video/aravind-intro.mp4";

function PlayIcon({ playing }: { playing: boolean }) {
  return playing ? (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 6.5v11M16 6.5v11" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m9 7 8 5-8 5V7Z" />
    </svg>
  );
}

function SoundIcon({ muted }: { muted: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5.5 10v4h3l4 3.5v-11l-4 3.5h-3Z" />
      {muted ? (
        <path d="m16 9 4 6m0-6-4 6" />
      ) : (
        <>
          <path d="M16 9.2c1.4 1.5 1.4 4.1 0 5.6" />
          <path d="M18.4 7c2.7 2.8 2.7 7.2 0 10" />
        </>
      )}
    </svg>
  );
}

export default function VideoIntro() {
  const shellRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const primaryVideoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showSoundHint, setShowSoundHint] = useState(true);
  const [isBuffering, setIsBuffering] = useState(true);
  const [videoError, setVideoError] = useState(false);

  useLayoutEffect(() => {
    const hero = heroRef.current;
    const shell = shellRef.current;
    if (!hero || !shell) return;

    gsap.registerPlugin(ScrollTrigger);
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const context = gsap.context(() => {
      const animatedElements = gsap.utils.toArray<HTMLElement>(
        "[data-hero-animate]",
      );

      if (reducedMotion) {
        gsap.set(animatedElements, { opacity: 1, y: 0 });
        gsap.set("[data-video-stage]", { opacity: 1, scale: 1 });
        return;
      }

      const intro = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      intro
        .fromTo(
          "[data-video-stage]",
          { opacity: 0, scale: 1.035 },
          { opacity: 1, scale: 1, duration: 1.65, ease: "power2.out" },
        )
        .fromTo(
          animatedElements,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1.05,
            stagger: 0.09,
          },
          "-=1.05",
        );

      gsap.to(stageRef.current, {
        scale: 1.04,
        filter: "brightness(0.58)",
        ease: "none",
        scrollTrigger: {
          trigger: shell,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });

      gsap.to(contentRef.current, {
        y: -42,
        opacity: 0.12,
        ease: "none",
        scrollTrigger: {
          trigger: shell,
          start: "top top",
          end: "80% top",
          scrub: 0.5,
        },
      });
    }, hero);

    return () => context.revert();
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => setShowSoundHint(false), 5200);
    return () => window.clearTimeout(timer);
  }, []);

  const togglePlayback = async () => {
    const video = primaryVideoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
      return;
    }

    if (video.ended || video.currentTime >= video.duration - 0.1) {
      video.currentTime = 0;
    }

    await video.play().catch(() => setVideoError(true));
  };

  const toggleSound = async () => {
    const primaryVideo = primaryVideoRef.current;
    if (!primaryVideo) return;

    const nextMutedState = !isMuted;
    primaryVideo.muted = nextMutedState;
    setIsMuted(nextMutedState);
    setShowSoundHint(false);

    if (primaryVideo.paused && !primaryVideo.ended) {
      await primaryVideo.play().catch(() => undefined);
      setIsPlaying(true);
    }
  };

  const scrollToWork = () => {
    document.getElementById("work")?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "start",
    });
  };

  return (
    <section
      ref={shellRef}
      className={styles.heroShell}
      aria-label="Introduction"
    >
      <div ref={heroRef} className={styles.hero}>
        <div className={styles.ambient} data-video-stage>
          <Image
            className={styles.ambientImage}
            src="/video/aravind-poster.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
          />
        </div>

        <div className={styles.ambientWash} aria-hidden="true" />

        <div
          ref={stageRef}
          className={styles.videoStage}
          data-video-stage
          aria-hidden="true"
        >
          <video
            ref={primaryVideoRef}
            className={styles.primaryVideo}
            src={VIDEO_SOURCE}
            poster="/video/aravind-poster.jpg"
            autoPlay
            muted={isMuted}
            playsInline
            preload="auto"
            disablePictureInPicture
            onCanPlay={() => {
              setIsBuffering(false);
              setVideoError(false);
            }}
            onPlaying={() => {
              setIsPlaying(true);
              setIsBuffering(false);
            }}
            onPause={() => setIsPlaying(false)}
            onEnded={() => {
              setIsPlaying(false);
              setIsBuffering(false);
              setShowSoundHint(false);
            }}
            onWaiting={() => setIsBuffering(true)}
            onStalled={() => setIsBuffering(true)}
            onError={() => {
              setVideoError(true);
              setIsBuffering(false);
            }}
          />
          <div className={styles.stageGradient} />
          <div className={styles.frameLine} />
          <div
            className={`${styles.videoStatus} ${
              isBuffering || videoError ? styles.videoStatusVisible : ""
            }`}
            role="status"
          >
            <span aria-hidden="true" />
            {videoError ? "Video unavailable" : "Loading film"}
          </div>
        </div>

        <CinematicLayer />
        <div className={styles.grain} aria-hidden="true" />

        <header className={styles.header} data-hero-animate>
          <a className={styles.monogram} href="#" aria-label="Back to top">
            ARAVIND<span>.</span>
          </a>
          <nav className={styles.navigation} aria-label="Primary navigation">
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            <a href="#experience">Experience</a>
            <a href="#contact">Contact</a>
          </nav>
          <p>Portfolio · 2026</p>
        </header>

        <div ref={contentRef} className={styles.content}>
          <p className={styles.eyebrow} data-hero-animate>
            Hello, I&apos;m
          </p>
          <h1 aria-label="Aravind Kumar">
            <span data-hero-animate>Aravind</span>
            <span className={styles.lastName} data-hero-animate>
              Kumar
            </span>
          </h1>
          <div className={styles.roleBlock} data-hero-animate>
            <p>
              I build intelligent products that feel fast, clear, and human.
            </p>
            <span>
              React · Python · FastAPI
              <br />
              RAG · LLM · Automation
            </span>
          </div>
        </div>

        <div className={styles.impactBadge} data-hero-animate>
          <span aria-hidden="true">+</span>
          <strong>10+</strong>
          <p>Projects shipped</p>
        </div>

        <div className={styles.mediaControls} data-hero-animate>
          <div
            className={`${styles.soundHint} ${
              showSoundHint ? styles.soundHintVisible : ""
            }`}
            role="status"
          >
            <span aria-hidden="true" />
            Tap for sound
          </div>
          <button
            className={styles.controlButton}
            type="button"
            onClick={togglePlayback}
            aria-label={isPlaying ? "Pause introduction" : "Play introduction"}
          >
            <PlayIcon playing={isPlaying} />
          </button>
          <button
            className={styles.controlButton}
            type="button"
            onClick={toggleSound}
            aria-label={isMuted ? "Unmute introduction" : "Mute introduction"}
          >
            <SoundIcon muted={isMuted} />
          </button>
        </div>

        <button
          className={styles.scrollCue}
          type="button"
          onClick={scrollToWork}
          data-hero-animate
          aria-label="Scroll to selected work"
        >
          <span>Explore work</span>
          <i aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
