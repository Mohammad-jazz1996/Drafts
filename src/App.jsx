import React, { useState } from "react";
import { Search, Presentation, FileText, PenLine, Palette, BarChart3, Megaphone, Timer, Upload, MessageCircleMore, Sparkles, Quote, GraduationCap, Video, NotebookTabs, BriefcaseBusiness, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function DraftsWebsite() {
  const [page, setPage] = useState("home");
  const [selectedType, setSelectedType] = useState("");
  const [urgency, setUrgency] = useState("Normal");

  const navItems = ["home", "about", "services"];
  const serviceIcons = [Search, Presentation, FileText, PenLine, Palette, BarChart3, BriefcaseBusiness, Megaphone, Timer, Sparkles, Quote, GraduationCap, Video, NotebookTabs, ShieldCheck];
  const serviceCards = [
  {
    title: "Research & Academic Support",
    description: "Research assistance, source organization, topic refinement, and structured academic preparation.",
    style: "Professional research workflow with critical thinking and organized academic support.",
  },
  {
    title: "Presentation Design",
    description: "Professional PowerPoint, Canva, and visual presentation design with modern layouts and storytelling.",
    style: "Premium creative studio aesthetic with polished visual presentation systems.",
  },
  {
    title: "Report Writing Support",
    description: "Formatting, editing, structure improvement, APA/MLA referencing, and academic polishing.",
    style: "Clean, reliable, and precision-focused academic workflow.",
  },
  {
    title: "Essay Development",
    description: "Brainstorming, outlining, draft refinement, editing, and academic writing guidance.",
    style: "Calm modern university aesthetic with structured writing support.",
  },
  {
    title: "Poster & Visual Design",
    description: "Academic posters, infographics, diagrams, timelines, and presentation visuals.",
    style: "Creative modern layout system with premium visual presentation energy.",
  },
  {
    title: "Data Collection & Organization",
    description: "Spreadsheet organization, charts, dashboards, tables, and structured academic data support.",
    style: "Minimal tech-inspired workflow focused on organization and clarity.",
  },
  {
    title: "Branding for Student Projects",
    description: "Logo concepts, typography systems, startup-style branding, and project identity design.",
    style: "Luxury branding studio atmosphere with dark modern visuals.",
  },
  {
    title: "Speech & Presentation Preparation",
    description: "Presentation coaching, speaking structure, rehearsal preparation, and confidence support.",
    style: "Cinematic communication-focused presentation atmosphere.",
  },
  {
    title: "Urgent Deadline Support",
    description: "Fast academic assistance for high-pressure submissions and short deadlines.",
    style: "Premium fast-paced workflow with organized urgency and support.",
  },
  {
    title: "AI & Digital Academic Assistance",
    description: "AI-supported workflows, idea structuring, digital organization, and productivity guidance.",
    style: "Modern AI-enhanced academic productivity environment.",
  },
  {
    title: "Academic Formatting & Referencing",
    description: "APA, MLA, Harvard formatting, citation correction, and reference organization.",
    style: "Professional formatting workflow with clean academic precision.",
  },
  {
    title: "University Project Consultation",
    description: "Guidance for capstones, business ideas, entrepreneurship projects, and university competitions.",
    style: "Startup-inspired academic consultation atmosphere.",
  },
  {
    title: "Creative & Media Support",
    description: "Video presentation support, script structure, visual storytelling, and content organization.",
    style: "Creative media studio aesthetic with modern storytelling visuals.",
  },
  {
    title: "Study Materials & Notes Organization",
    description: "Clean notes, summaries, revision sheets, and structured study material preparation.",
    style: "Organized and student-friendly productivity workflow.",
  },
  {
    title: "Academic Portfolio Support",
    description: "Professional student portfolios, project showcases, and personal academic branding.",
    style: "Premium personal branding presentation with modern academic visuals.",
  },
];

const projectTypes = [
    "Report",
    "Presentation",
    "Poster",
    "Research",
    "AI Detection",
    "Data Organization",
    "Academic Support",
    "Branding / Design",
    "Others",
  ];

  return (
    <div className="min-h-screen bg-[#06142E] text-white">
      <header className="relative z-50 mx-auto flex max-w-7xl items-center justify-between px-6 py-7">
        <div className="flex items-center gap-3">
         <img
  src={draftsLogo}
  alt="Drafts"
  className="h-12 w-12 object-contain"
/>
          <div>
            <div>
              <h1 className="text-lg font-bold tracking-[0.22em]">DRAFTS</h1>
              <p className="mt-1 text-[8px] uppercase tracking-[0.28em] text-white/60">Academic Partner</p>
            </div>
            
          </div>
        </div>

        <nav className="hidden items-center gap-6 text-sm text-blue-100 md:flex">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => setPage(item)}
              className={`capitalize transition ${page === item ? "text-white underline underline-offset-8 decoration-blue-400" : "hover:text-white"}`}
            >
              {item}
            </button>
          ))}
        </nav>

        
      </header>

      <main>
        {page === "home" && (
          <section className="relative overflow-hidden px-6 py-16">
            <div className="absolute left-1/2 top-[-180px] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-blue-500/20 blur-3xl" />

            <div className="relative mx-auto max-w-6xl rounded-[3rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl md:p-10">
              <div className="mb-10 text-center">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-300/20 bg-white/10 px-4 py-2 text-sm text-blue-100">
                  <Sparkles size={15} /> <Sparkles size={15} /> Built by UAE university students for all students across the UAE
                </div>

                <h2 className="mx-auto max-w-4xl text-5xl font-black leading-tight tracking-tight md:text-7xl">
                  Structure your work and ideas better.
                </h2>

                <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-blue-100">
                  Your academic partner for cleaner, smarter student work.
                </p>
              </div>

              <div id="submit" className="mx-auto grid max-w-5xl gap-12 rounded-[2.5rem] bg-white p-8 text-slate-950 shadow-2xl shadow-black/20 md:grid-cols-[0.75fr_1.25fr]">
                <div>
                  <p className="font-bold uppercase tracking-[0.25em] text-blue-700">Submit</p>
                  <h2 className="mt-4 text-4xl font-black tracking-tight">Send your request</h2>
                  <p className="mt-6 leading-8 text-slate-600">
                    Upload your instructions, screenshots, rubric, or project details. The team will contact you on WhatsApp to confirm everything.
                  </p>

                  <div className="mt-8 space-y-4">
                    {["Fast response", "Student-focused support", "Clean academic formatting", "Deadline-friendly workflow"].map((item) => (
                      <div key={item} className="flex items-center gap-3 rounded-2xl bg-blue-50 p-4 text-blue-900">
                        <div className="h-2.5 w-2.5 rounded-full bg-blue-600" />
                        <span className="font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <form className="grid gap-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <input className="rounded-2xl border-2 border-blue-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-200/50" placeholder="Full Name" />
                    <input className="rounded-2xl border-2 border-blue-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-200/50" placeholder="University / School" />
                  </div>
                  <input className="rounded-2xl border-2 border-blue-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-200/50" placeholder="Course / Subject" />
                  <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                    {projectTypes.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setSelectedType(type)}
                        className={`rounded-2xl border px-4 py-3 text-sm font-black shadow-sm transition ${selectedType === type ? "border-blue-700 bg-blue-700 text-white" : "border-blue-100 bg-gradient-to-br from-blue-50 to-cyan-50 text-blue-900 hover:border-blue-300 hover:from-blue-100 hover:to-cyan-100 hover:text-blue-700"}`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                  <input className="rounded-2xl border-2 border-blue-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-200/50" placeholder="Deadline" />

                  <div>
                    <p className="mb-3 text-sm font-black text-blue-900">Deadline Urgency</p>
                    <div className="grid grid-cols-3 gap-3">
                      {["Normal", "Urgent", "Emergency"].map((level) => (
                        <button
                          key={level}
                          type="button"
                          onClick={() => setUrgency(level)}
                          className={`rounded-2xl border px-4 py-3 text-sm font-black transition ${urgency === level ? "border-blue-700 bg-blue-700 text-white" : "border-blue-100 bg-blue-50 text-blue-900 hover:bg-blue-100"}`}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  </div>
                  <textarea className="min-h-36 rounded-2xl border-2 border-blue-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-200/50" placeholder="Project Details" />
                  <label className="flex cursor-pointer items-center justify-center gap-3 rounded-2xl border border-dashed border-blue-300 bg-blue-50 px-4 py-6 font-semibold text-blue-800 transition hover:bg-blue-100">
                    <Upload size={20} /> Upload Files / Screenshots / Instructions
                  </label>
                  <p className="-mt-2 text-center text-xs font-semibold text-slate-500">Supported files: PDF, PPTX, DOCX, ZIP, PNG, JPG</p>
                  <input className="rounded-2xl border-2 border-blue-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-200/50" placeholder="Contact Number / WhatsApp" />
                  <button type="button" className="rounded-2xl bg-blue-700 px-6 py-4 font-bold text-white transition hover:bg-blue-800">
                    Send My Request
                  </button>
                </form>
              </div>
            </div>
          </section>
        )}

        {page === "services" && (
          <section className="px-6 py-16">
            <div className="mx-auto max-w-6xl rounded-[3rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl md:p-12">
              <div className="mb-12 text-center">
                <p className="font-bold uppercase tracking-[0.25em] text-blue-200">Services</p>
                <h2 className="mt-4 text-4xl font-black tracking-tight md:text-6xl">Premium academic support services.</h2>
                <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-blue-100">
                  Cleaner presentations, stronger structure, smarter organization, and professional project support.
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {serviceCards.map((service, index) => {
                  const Icon = serviceIcons[index] || FileText;
                  return (
                  <motion.div whileHover={{ y: -6 }} key={service.title} className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#0B1E45] to-[#112B63] p-7 shadow-2xl shadow-black/20">
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-blue-200">
                      <Icon size={26} />
                    </div>
                    <h3 className="text-2xl font-black text-white">{service.title}</h3>
                    <p className="mt-5 leading-7 text-blue-100">{service.description}</p>
                    <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-blue-200">{service.style}</div>
                  </motion.div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {page === "about" && (
          <section className="px-6 py-16">
            <div className="mx-auto max-w-5xl rounded-[3rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl md:p-12">
              <p className="font-bold uppercase tracking-[0.25em] text-blue-200">About Drafts</p>

              <p className="mt-6 max-w-3xl text-lg leading-8 text-blue-100">
                Drafts helps university students organize academic work, submit clearer projects, and manage deadlines with a cleaner, smarter workflow.
              </p>

              <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/5 p-7 backdrop-blur">
                <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-200">Team</p>

                <h3 className="mt-4 text-xl font-black leading-tight text-white md:text-3xl xl:text-4xl max-w-4xl"><Sparkles size={15} /> Built by UAE university students for all students across the UAE.</h3>

                <p className="mt-5 max-w-4xl leading-8 text-blue-100">
                  The Drafts team is made up of university students and creative collaborators who understand deadlines, academic expectations, project pressure, and the need for cleaner organization.
                </p>

                <p className="mt-4 max-w-4xl leading-8 text-blue-100">
                  Our goal is to help students produce more professional work through smarter structure, stronger visuals, organized workflows, and cleaner academic presentation.
                </p>

                <div className="mt-8 grid gap-4 md:grid-cols-3">
                  {[
                    "Creative Design",
                    "Academic Support",
                    "Student Workflow",
                  ].map((item) => (
                    <div key={item} className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#0B1E45] to-[#112B63] p-5 text-center shadow-xl shadow-black/20">
                      <p className="text-lg font-black text-white">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-12 grid gap-6 md:grid-cols-2">
                <div className="rounded-[2rem] border border-white/10 bg-white/5 p-7 backdrop-blur">
                  <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-200">Mission</p>
                  <h3 className="mt-4 text-2xl font-black text-white">Simplify academic support.</h3>
                  <p className="mt-4 leading-7 text-blue-100">
                    Our mission is to help students manage projects, deadlines, and academic tasks with cleaner organization, better structure, and more professional presentation quality.
                  </p>
                </div>

                <div className="rounded-[2rem] border border-white/10 bg-white/5 p-7 backdrop-blur">
                  <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-200">Vision</p>
                  <h3 className="mt-4 text-2xl font-black text-white">Build a smarter student workflow.</h3>
                  <p className="mt-4 leading-7 text-blue-100">
                    Drafts aims to become a trusted academic partner for students across the UAE by combining creativity, organization, and modern academic support.
                  </p>
                </div>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {[
                  "Usually replies within 10–20 minutes",
                  "Supporting students across UAE universities",
                  "PDF • PPTX • DOCX • ZIP • Images",
                ].map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-[#0B1E45]/80 p-4 text-center text-sm font-semibold text-blue-100 shadow-lg shadow-black/20">
                    {item}
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-[2rem] border border-blue-400/20 bg-gradient-to-br from-[#0B1E45] to-[#112B63] p-6 shadow-xl shadow-black/20">
                <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-200">Privacy</p>
                <p className="mt-4 max-w-4xl leading-8 text-blue-100">
                  All project submissions, uploaded files, and academic materials remain private and student-focused.
                </p>
              </div>

              <div className="mt-6 grid gap-6 md:grid-cols-2">
                <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#0B1E45] to-[#112B63] p-7 shadow-xl shadow-black/20">
                  <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-200">Values & Culture</p>
                  <div className="mt-5 space-y-4 text-blue-100">
                    <div className="flex items-start gap-3">
                      <div className="mt-2 h-2.5 w-2.5 rounded-full bg-blue-400" />
                      <p>Professional quality with modern presentation standards.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-2 h-2.5 w-2.5 rounded-full bg-blue-400" />
                      <p>Student-focused communication and deadline support.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-2 h-2.5 w-2.5 rounded-full bg-blue-400" />
                      <p>Clean organization, creativity, and reliable workflow.</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#0B1E45] to-[#112B63] p-7 shadow-xl shadow-black/20">
                  <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-200">Why Drafts</p>
                  <div className="mt-5 space-y-4 text-blue-100">
                    <div className="flex items-start gap-3">
                      <div className="mt-2 h-2.5 w-2.5 rounded-full bg-blue-400" />
                      <p>Built by UAE university students, for students across the UAE who understand university pressure.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-2 h-2.5 w-2.5 rounded-full bg-blue-400" />
                      <p>Focused on cleaner structure, smarter organization, and premium visuals.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-2 h-2.5 w-2.5 rounded-full bg-blue-400" />
                      <p>Fast support designed around deadlines and academic workflow.</p>
                    </div>
                  </div>
                </div>
              </div>

              </div>
          </section>
        )}
      </main>

      <footer className="mx-auto max-w-7xl px-6 pb-10 pt-4 text-center text-sm text-blue-200/80">
        <p className="font-semibold">Drafts © 2026 · Built by UAE university students, for students across the UAE · WhatsApp support available daily</p>
      </footer>

      {page === "home" && (
        <a
          href="https://wa.me/971545257574"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full bg-[#25D366] px-5 py-4 font-bold text-white shadow-2xl shadow-black/30 transition hover:scale-105 hover:bg-[#20bd5a]"
        >
          <MessageCircleMore size={22} />
          WhatsApp
        </a>
      )}
    </div>
  );
}
