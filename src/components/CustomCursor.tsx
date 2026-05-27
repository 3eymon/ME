"use client";
import React, { useEffect } from "react";
import gsap from "gsap";
import MouseFollower from "mouse-follower";
import "mouse-follower/dist/mouse-follower.min.css";

MouseFollower.registerGSAP(gsap);

export default function CustomCursor() {
  useEffect(() => {
    const cursor = new MouseFollower({
      container: document.body,
      speed: 0.5,
      ease: "expo.out",
      skewing: 2, // کمی زاویه موقع حرکت
      skewingText: 2,
      skewingIcon: 2,
      skewingMedia: 2,
      stateDetection: {
        "-pointer": "a,button",
        "-hidden": "iframe",
        "-magnet": ".magnet", // روی المنت‌هایی که کلاس magnet دارن
      },
    });

    return () => cursor.destroy();
  }, []);

  return null;
}
