"use client";

import Link from "next/link";

export default function About() {
  return (
    <>
      <div className="space-y-12 relative">
        <div className="text-xl font-semibold">Hello Travelers!</div>
        <div className="space-y-6">
          <p>
            Welcome to a snippet of my life story — the story of someone who
            started their coding journey in 2020, right at the beginning of my
            university studies. At that time, the first lines of code felt like
            a fun puzzle. Curiosity drove me to keep learning, until I finally
            managed to design my first project for my final university
            assignment — a Python learning platform that I named{" "}
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
            Not only that, but I also have an interest in PC hardware. I have
            always enjoyed assembling PCs, and in 2025, I took the plunge and
            started a small business in the field of <b>custom build PCs</b> —
            assembling devices according to specific needs, whether for office
            use or budget gamers. And if you want to build a PC, you can check
            my website{" "}
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
            system that helps streamline company operations. Every new challenge
            is a learning opportunity, and every line of code is a new story I
            enjoy.
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
