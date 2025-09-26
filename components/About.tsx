"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Ballpit from "./Ballpit";

export default function About() {
  const [showBalls, setShowBalls] = useState(false);

  useEffect(() => {
    if (showBalls) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [showBalls]);

  return (
    <>
      {showBalls ? (
        <div className="fixed inset-0 z-50">
          {/* Ballpit background */}
          <div className="absolute inset-0">
            <Ballpit
              displayCursor={false}
              count={150}
              gravity={0.5}
              friction={1}
              wallBounce={0.95}
              followCursor={true}
              colors={[0x000000, 0x0000ff, 0x800080, 0xff0000, 0xffffff]}
              lightIntensity={500}
            />
          </div>

          <button
            aria-label="Tutup playground"
            className="fixed top-4 right-4 z-50 inline-flex h-9 items-center justify-center rounded-md bg-destructive text-destructive-foreground px-3 font-medium shadow transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
            onClick={() => setShowBalls(false)}
            title="Tutup"
          >
            ✖
          </button>
        </div>
      ) : (
        <>
          <div className="space-y-12 relative">
            <div className="text-xl font-semibold">Hello Travelers!</div>
            <div className="space-y-6">
              <p>
                Welcome to a snippet of my life story — the story of someone who
                started their coding journey in 2020, right at the beginning of
                my university studies. At that time, the first lines of code
                felt like a fun puzzle. Curiosity drove me to keep learning,
                until I finally managed to design my first project for my final
                university assignment — a Python learning platform that I named{" "}
                <Link
                  href="https://pintarpy.zenio.id"
                  target="_blank"
                  className="hover:text-blue-500 font-bold"
                >
                  PintarPy
                </Link>
                , complete with a Python IDE directly on its website.
              </p>
              <p>
                Not only that, but I also have an interest in PC hardware. I
                have always enjoyed assembling PCs, and in 2025, I took the
                plunge and started a small business in the field of{" "}
                <b>custom build PCs</b> — assembling devices according to
                specific needs, whether for office use or budget gamers. And if
                you want to build a PC, you can check my website{" "}
                <Link
                  href="https://pc-mall.zenio.id"
                  target="_blank"
                  className="hover:text-blue-500 font-bold"
                >
                  here
                </Link>
                . The prices are definitely pocket-friendly 👌
              </p>
              <p>
                Currently, I am working at a company developing an internal web
                system that helps streamline company operations. Every new
                challenge is a learning opportunity, and every line of code is a
                new story I enjoy.
              </p>
              <p>
                Thank you for visiting this page. Feel free to explore further —
                who knows, we might connect or even collaborate!
              </p>
            </div>

            {/* Hidden Easter Egg button */}
            <button
              onClick={() => setShowBalls(true)}
              className="fixed bottom-3 right-3 z-40 opacity-60 hover:opacity-90 focus:opacity-90 transition-opacity text-lg"
              title="Hmm... What's this?"
            >
              ⚽
            </button>
          </div>
        </>
      )}
    </>
  );
}
