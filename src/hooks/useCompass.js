"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export default function useCompass() {
  const [heading, setHeading] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | active | denied | unsupported
  const prev = useRef(null);
  const evtName = useRef(null);

  const handle = useCallback((e) => {
    let h = null;
    if (typeof e.webkitCompassHeading === "number") {
      h = e.webkitCompassHeading; // iOS Safari
    } else if (e.absolute === true && typeof e.alpha === "number") {
      h = 360 - e.alpha; // Android Chrome
    }
    if (h === null || Number.isNaN(h)) return;

    h = (h + 360) % 360;
    // কাঁপুনি কমাতে মসৃণ করা (কোণের হিসাবে)
    if (prev.current === null) {
      prev.current = h;
    } else {
      const diff = ((h - prev.current + 540) % 360) - 180;
      prev.current = (prev.current + diff * 0.25 + 360) % 360;
    }
    setHeading(prev.current);
  }, []);

  const start = useCallback(async () => {
    if (typeof window === "undefined" || !("DeviceOrientationEvent" in window)) {
      setStatus("unsupported");
      return;
    }

    try {
      if (typeof DeviceOrientationEvent.requestPermission === "function") {
        const res = await DeviceOrientationEvent.requestPermission();
        if (res !== "granted") {
          setStatus("denied");
          return;
        }
      }
    } catch {
      setStatus("denied");
      return;
    }

    const name =
      "ondeviceorientationabsolute" in window
        ? "deviceorientationabsolute"
        : "deviceorientation";
    evtName.current = name;
    window.addEventListener(name, handle, true);
    setStatus("active");
  }, [handle]);

  // ২.৫ সেকেন্ডেও ডাটা না এলে সেন্সর নেই ধরে নিই (যেমন ডেস্কটপ)
  useEffect(() => {
    if (status !== "active") return;
    const t = setTimeout(() => {
      if (prev.current === null) setStatus("unsupported");
    }, 2500);
    return () => clearTimeout(t);
  }, [status]);

  useEffect(
    () => () => {
      if (evtName.current) {
        window.removeEventListener(evtName.current, handle, true);
      }
    },
    [handle]
  );

  return { heading, status, start };
}