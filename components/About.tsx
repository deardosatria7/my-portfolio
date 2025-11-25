"use client";

import Link from "next/link";

export default function About() {
  return (
    <>
      <div className="space-y-12">
        <div className="text-xl font-semibold">Hello Travelers!</div>
        <div className="space-y-6">
          <p>
            Welcome to a snippet of my life story — I started my programming
            journey in 2020, right at the beginning of my university studies.
            Creating a website, building a new feature, turning an idea into a
            functional website is like playing an adventure game to me. It feels
            like solving a puzzle or defeating a boss in a game. Things like
            this challenge me to complete the game. Curiosity drove me to keep
            learning, until I finally managed to design my first project for my
            final university assignment — a Python learning web platform,
            complete with a Python IDE directly inside the website called{" "}
            <Link
              href="https://pintarpy.zenio.id"
              target="_blank"
              className="hover:text-blue-500 font-bold"
            >
              PintarPy
            </Link>
            .
          </p>
          <p>
            In addition, I am also interested in building PCs. It feels like
            playing with Lego, but a more expensive version. In 2025, I took the
            plunge and started a small local business in the field of{" "}
            <b>custom build PCs</b> — assembling devices according to specific
            needs, whether for office use or budget gamers.
          </p>
          <p>
            I am currently working in the IT department of a pharmaceutical
            distribution company. My job is to develop the company's internal
            website-based system. Every new challenge is a learning opportunity,
            and every line of code is a new story I enjoy.
          </p>
          <p>
            Thank you for visiting this page. Feel free to explore further — who
            knows, we might connect or even collaborate!
          </p>
        </div>
      </div>
    </>
  );
}
