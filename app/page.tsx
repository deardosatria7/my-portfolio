"use client";

import About from "@/components/About";
import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
  const [show, setShow] = useState<string>("experience");

  return (
    <div className="grid grid-cols-1 p-4 md:p-6 bg-black text-white">
      <section className="min-h-[250px] w-full flex justify-between mt-4 md:mt-0">
        <div className="grid grid-rows-2 h-fit">
          <span className="text-2xl font-semibold">Deardo Satria,</span>
          <span className="text-xl text-neutral-400">Fullstack Developer</span>
        </div>
        <div className="h-fit">
          {show == "experience" ? (
            <Button
              variant="secondary"
              className="hover:cursor-pointer"
              onClick={() => setShow("about")}
            >
              About
            </Button>
          ) : (
            <Button
              variant="secondary"
              className="hover:cursor-pointer"
              onClick={() => setShow("experience")}
            >
              Back
            </Button>
          )}
        </div>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-7 md:gap-4">
        <div className="col-span-2">
          <div className="md:sticky md:top-0 border-t-1 border-neutral-700">
            <div className="py-8 px-4 mb-8 text-sm">
              Experienced Fullstack Developer with 3+ years crafting dynamic web
              apps. Passionate about solving complex problems, writing clean
              code, and collaborating across teams.
            </div>

            <a
              href="mailto:deardosatria1@gmail.com"
              className="w-full hover:cursor-pointer hover:bg-white hover:text-black px-4 py-2 border-y-1 border-neutral-700 flex items-center gap-2 text-xs"
            >
              deardosatria1@gmail.com <ArrowUpRight className="w-3 h-3" />
            </a>
            <a
              href="https://wa.me/6281216680537"
              className="w-full hover:cursor-pointer hover:bg-white hover:text-black px-4 py-2 border-b-1 border-neutral-700 flex items-center gap-2 text-xs"
            >
              Whatsapp Me <ArrowUpRight className="w-3 h-3" />
            </a>
            <a
              href="https://www.linkedin.com/in/deardo-satria-5a8b69278?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              className="w-full hover:cursor-pointer hover:bg-white hover:text-black px-4 py-2 border-neutral-700 flex items-center gap-2 text-xs"
            >
              Linkedin <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>
        <div className="col-span-5 min-h-screen border-t-1 border-neutral-700 p-6 space-y-12">
          <AnimatePresence mode="wait">
            {show === "experience" ? (
              <motion.div
                key="hero"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Hero />
              </motion.div>
            ) : (
              <motion.div
                key="about"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <About />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
