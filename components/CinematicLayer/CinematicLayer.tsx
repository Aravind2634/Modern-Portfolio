"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import styles from "./CinematicLayer.module.css";

const vertexShader = `
  uniform float uTime;
  uniform float uPixelRatio;

  attribute float aSize;
  attribute float aPhase;
  attribute float aSpeed;
  attribute float aAmplitude;

  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vec3 animated = position;
    animated.y += sin(uTime * aSpeed + aPhase) * aAmplitude;
    animated.x += cos(uTime * aSpeed * 0.72 + aPhase) * aAmplitude * 0.42;

    vec4 modelPosition = modelMatrix * vec4(animated, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;
    gl_PointSize = aSize * uPixelRatio * (7.0 / max(1.0, -viewPosition.z));

    vColor = color;
    vAlpha = smoothstep(-6.0, 2.0, position.z);
  }
`;

const fragmentShader = `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vec2 center = gl_PointCoord - vec2(0.5);
    float distanceToCenter = dot(center, center);
    float glow = exp(-distanceToCenter * 11.0);
    float edge = 1.0 - smoothstep(0.08, 0.25, distanceToCenter);
    float alpha = glow * edge * vAlpha * 0.78;

    if (alpha < 0.01) discard;
    gl_FragColor = vec4(vColor, alpha);
  }
`;

export default function CinematicLayer() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const particleCount = window.innerWidth < 720 ? 34 : 62;
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: "high-performance",
    });

    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.setAttribute("aria-hidden", "true");
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 40);
    camera.position.z = 8;

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const phases = new Float32Array(particleCount);
    const speeds = new Float32Array(particleCount);
    const amplitudes = new Float32Array(particleCount);
    const palette = [
      new THREE.Color("#7c5cff"),
      new THREE.Color("#20d7ff"),
      new THREE.Color("#a855f7"),
      new THREE.Color("#ff3d81"),
      new THREE.Color("#4c7dff"),
      new THREE.Color("#f4f2ff"),
    ];

    for (let index = 0; index < particleCount; index += 1) {
      const i3 = index * 3;
      const edgeBias = Math.random();
      const color = palette[Math.floor(Math.random() * palette.length)];

      positions[i3] =
        (Math.random() - 0.5) * 15 +
        (edgeBias > 0.52 ? (Math.random() > 0.5 ? 3 : -3) : 0);
      positions[i3 + 1] = (Math.random() - 0.5) * 8.5;
      positions[i3 + 2] = Math.random() * 8 - 6;

      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;

      sizes[index] = 9 + Math.random() * 34;
      phases[index] = Math.random() * Math.PI * 2;
      speeds[index] = 0.16 + Math.random() * 0.24;
      amplitudes[index] = 0.08 + Math.random() * 0.27;
    }

    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3),
    );
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1));
    geometry.setAttribute("aSpeed", new THREE.BufferAttribute(speeds, 1));
    geometry.setAttribute(
      "aAmplitude",
      new THREE.BufferAttribute(amplitudes, 1),
    );

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 1.5) },
      },
      vertexColors: true,
      transparent: true,
      depthWrite: false,
      depthTest: false,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    const pointer = new THREE.Vector2();
    let frameId = 0;
    let isVisible = !document.hidden;
    const clock = new THREE.Clock();

    const resize = () => {
      const { clientWidth, clientHeight } = host;
      if (!clientWidth || !clientHeight) return;

      renderer.setSize(clientWidth, clientHeight, false);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      material.uniforms.uPixelRatio.value = Math.min(
        window.devicePixelRatio,
        1.5,
      );
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
    };

    const onPointerMove = (event: PointerEvent) => {
      pointer.x = (event.clientX / window.innerWidth - 0.5) * 0.75;
      pointer.y = (event.clientY / window.innerHeight - 0.5) * 0.55;
    };

    const render = () => {
      if (!isVisible) return;

      const elapsed = clock.getElapsedTime();
      material.uniforms.uTime.value = reducedMotion ? 0 : elapsed;

      if (!reducedMotion) {
        camera.position.x += (pointer.x - camera.position.x) * 0.018;
        camera.position.y += (-pointer.y - camera.position.y) * 0.018;
        particles.rotation.z = Math.sin(elapsed * 0.08) * 0.018;
      }

      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(render);
    };

    const onVisibilityChange = () => {
      isVisible = !document.hidden;
      if (isVisible) {
        clock.getDelta();
        window.cancelAnimationFrame(frameId);
        render();
      } else {
        window.cancelAnimationFrame(frameId);
      }
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);
    resize();
    render();

    return () => {
      window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={hostRef} className={styles.layer} aria-hidden="true" />;
}
