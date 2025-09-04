import { ArrowUpRight } from "lucide-react";

export default function Hero() {
  return (
    <>
      <div className="space-y-12">
        {/* Experience Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-6 border-b border-neutral-700 pb-2">
            Experience
          </h2>
          <div className="space-y-10">
            <div className="border-l-2 border-neutral-600 pl-4">
              <h3 className="text-lg font-medium">Fullstack Developer</h3>
              <p className="text-neutral-400 text-sm">
                Antar Mitra Persada • Sep 2024 - Present
              </p>
              <p className="text-sm mt-2">
                Leading the fullstack development of an internal company web
                system using Next.js and Supabase. Working closely with
                end-users to identify needs and translate them into tailored,
                scalable features that improve operational efficiency across
                departments.
              </p>
            </div>
            <div className="border-l-2 border-neutral-600 pl-4">
              <h3 className="text-lg font-medium">
                Custom PC Build Specialist
              </h3>
              <p className="text-neutral-400 text-sm">
                Self-Employed • Aug 2025 - Present
              </p>
              <p className="text-sm mt-2">
                Providing tailored PC building services for clients ranging from
                casual users to performance-focused gamers and professionals.
                Offering consultation, hardware selection, and assembly with
                attention to performance, aesthetics, and budget optimization.
              </p>
            </div>
            <div className="border-l-2 border-neutral-600 pl-4">
              <h3 className="text-lg font-medium">Software Tester</h3>
              <p className="text-neutral-400 text-sm">
                Tiga Serangkai Inti Corpora • Jan 2023 - Apr 2023
              </p>
              <p className="text-sm mt-2">
                Collaborated closely with developers to identify bugs and
                recommend improvements, contributing to faster issue resolution
                and enhanced product quality. Conducted performance testing that
                significantly reduced load times and improved system
                responsiveness. Designed and executed comprehensive test
                scenarios, increasing coverage while reducing redundant testing
                efforts.
              </p>
            </div>
            <div className="border-l-2 border-neutral-600 pl-4">
              <h3 className="text-lg font-medium">
                Intern Front-end Developer
              </h3>
              <p className="text-neutral-400 text-sm">
                Indonesia Direct • Nov 2021 - Jan 2022
              </p>
              <p className="text-sm mt-2">
                Developed responsive web layouts to ensure optimal performance
                across various devices. Contributed to building dynamic and
                interactive UI components using React. Worked alongside UI/UX
                designers to translate Figma mockups into fully functional web
                interfaces.
              </p>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-6 border-b border-neutral-700 pb-2">
            Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-3">Frontend</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "React",
                  "Next.js",
                  "TypeScript",
                  "Tailwind CSS",
                  "Vue.js",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-neutral-800 border border-neutral-600 rounded-md text-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-3">Backend</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "Node.js",
                  "Python",
                  "PostgreSQL",
                  "Prisma ORM",
                  "Supabase",
                  "Docker",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-neutral-800 border border-neutral-600 rounded-md text-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Project Showcase Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-6 border-b border-neutral-700 pb-2">
            Project Showcase
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-neutral-700 rounded-lg p-4 hover:border-neutral-500 transition-colors">
              <div className="w-full h-32 bg-neutral-800 rounded mb-4 overflow-hidden">
                <img
                  src="/pintarpy-screenshot.png"
                  alt="PintarPy Screenshot"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-medium mb-2">PintarPy</h3>
              <p className="text-sm text-neutral-400 mb-3">
                Python learning platform with Integrated Development
                Environtment (IDE) inside the browser.
              </p>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="px-2 py-1 bg-neutral-800 text-xs rounded">
                  React
                </span>
                <span className="px-2 py-1 bg-neutral-800 text-xs rounded">
                  Node.js
                </span>
                <span className="px-2 py-1 bg-neutral-800 text-xs rounded">
                  Pyscript
                </span>
                <span className="px-2 py-1 bg-neutral-800 text-xs rounded">
                  Postgresql
                </span>
                <span className="px-2 py-1 bg-neutral-800 text-xs rounded">
                  Prisma ORM
                </span>
              </div>
              <div className="flex gap-2">
                <a
                  href="https://pintarpy.zenio.id"
                  target="_blank"
                  className="text-xs border border-neutral-600 px-3 py-1 rounded hover:bg-white hover:text-black transition-colors"
                >
                  Live Demo <ArrowUpRight className="w-3 h-3 inline ml-1" />
                </a>
                <a
                  href="https://github.com/deardosatria7"
                  target="_blank"
                  className="text-xs border border-neutral-600 px-3 py-1 rounded hover:bg-white hover:text-black transition-colors"
                  title="This is a private repository"
                >
                  GitHub <ArrowUpRight className="w-3 h-3 inline ml-1" />
                </a>
              </div>
            </div>

            <div className="border border-neutral-700 rounded-lg p-4 hover:border-neutral-500 transition-colors">
              <div className="w-full h-32 bg-neutral-800 rounded mb-4 overflow-hidden">
                <img
                  src="/pc-mall-screenshot.png"
                  alt="PintarPy Screenshot"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-medium mb-2">PC Mall Zenio</h3>
              <p className="text-sm text-neutral-400 mb-3">
                PC building website platform with options for custom builds, AI
                assistant chatbots, and WhatsApp API for notifications.
              </p>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="px-2 py-1 bg-neutral-800 text-xs rounded">
                  Next.js
                </span>
                <span className="px-2 py-1 bg-neutral-800 text-xs rounded">
                  PostgreSQL
                </span>
                <span className="px-2 py-1 bg-neutral-800 text-xs rounded">
                  Openai API
                </span>
                <span className="px-2 py-1 bg-neutral-800 text-xs rounded">
                  Whatsapp API
                </span>
              </div>
              <div className="flex gap-2">
                <a
                  href="https://pc-mall.zenio.id"
                  target="_blank"
                  className="text-xs border border-neutral-600 px-3 py-1 rounded hover:bg-white hover:text-black transition-colors"
                >
                  Live Demo <ArrowUpRight className="w-3 h-3 inline ml-1" />
                </a>
                <a
                  href="https://github.com/deardosatria7"
                  target="_blank"
                  className="text-xs border border-neutral-600 px-3 py-1 rounded hover:bg-white hover:text-black transition-colors"
                  title="This is a private repository"
                >
                  GitHub <ArrowUpRight className="w-3 h-3 inline ml-1" />
                </a>
              </div>
            </div>
          </div>
          <p className="mt-6 text-sm text-neutral-500 italic text-center">
            ...and many more.
          </p>
        </div>
      </div>
    </>
  );
}
