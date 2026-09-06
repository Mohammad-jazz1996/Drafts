import draftsLogo from "./assets/drafts-logo.png";
import blueRose from "./assets/blue-rose.png";
import AdminDashboard from "./AdminDashboard";
import rosesBg from "./assets/roses-bg.png";
import React, { useState } from "react";
import { Search, Presentation, FileText, PenLine, Palette, BarChart3, Megaphone, Timer, Upload, MessageCircleMore, Sparkles, Quote, GraduationCap, Video, NotebookTabs, BriefcaseBusiness, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "./supabase";
const floatingRoses = [
  { left: "3%", top: "8%", size: 90, duration: 8, delay: 0 },
  { left: "14%", top: "22%", size: 60, duration: 10, delay: 1 },
  { left: "27%", top: "5%", size: 75, duration: 9, delay: 2 },
  { left: "40%", top: "18%", size: 55, duration: 11, delay: 0.5 },
  { left: "54%", top: "7%", size: 85, duration: 8, delay: 1.5 },
  { left: "68%", top: "20%", size: 65, duration: 12, delay: 2.5 },
  { left: "82%", top: "6%", size: 95, duration: 9, delay: 1 },
  { left: "91%", top: "28%", size: 55, duration: 10, delay: 3 },

  { left: "7%", top: "45%", size: 70, duration: 11, delay: 2 },
  { left: "20%", top: "58%", size: 100, duration: 9, delay: 0 },
  { left: "34%", top: "42%", size: 60, duration: 8, delay: 1 },
  { left: "48%", top: "62%", size: 80, duration: 12, delay: 2 },
  { left: "61%", top: "48%", size: 55, duration: 10, delay: 0.5 },
  { left: "74%", top: "66%", size: 95, duration: 9, delay: 1.5 },
  { left: "88%", top: "50%", size: 65, duration: 11, delay: 2.5 },

  { left: "12%", top: "82%", size: 85, duration: 10, delay: 1 },
  { left: "47%", top: "84%", size: 70, duration: 8, delay: 2 },
  { left: "79%", top: "86%", size: 90, duration: 12, delay: 0 },
];
export default function DraftsWebsite() {
const [adminOpen, setAdminOpen] = useState(false);
  const [page, setPage] = useState("home");
  const [selectedType, setSelectedType] = useState("");
  const [urgency, setUrgency] = useState("Normal");
  const [formData, setFormData] = useState({
    full_name: "",
    university_school: "",
    course_subject: "",
    deadline: "",
    details: "",
    contact: "",
  });
  const [files, setFiles] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.full_name.trim()) {
      setSubmitMessage("Please enter your full name.");
      return;
    }

    if (!selectedType) {
      setSubmitMessage("Please select a project type.");
      return;
    }

    if (!formData.contact.trim()) {
      setSubmitMessage("Please enter your WhatsApp or contact number.");
      return;
    }

    setSubmitting(true);
    setSubmitMessage("");

    try {
      const uploadedPaths = [];

      for (const file of files) {
        const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
        const uniqueName = `${Date.now()}-${crypto.randomUUID()}-${safeName}`;

        const { error: uploadError } = await supabase.storage
          .from("request-files")
          .upload(uniqueName, file, {
            cacheControl: "3600",
            upsert: false,
          });

        if (uploadError) {
          throw uploadError;
        }

        uploadedPaths.push(uniqueName);
      }

      const { error: requestError } = await supabase.from("requests").insert({
        full_name: formData.full_name.trim(),
        university_school: formData.university_school.trim(),
        course_subject: formData.course_subject.trim(),
        project_type: selectedType,
        details: formData.details.trim(),
        contact: formData.contact.trim(),
        deadline: formData.deadline.trim(),
        urgency,
        status: "pending",
        file_paths: uploadedPaths,
      });

      if (requestError) {
        throw requestError;
      }

      setSubmitMessage("Request sent successfully. We will contact you on WhatsApp.");
      setFormData({
        full_name: "",
        university_school: "",
        course_subject: "",
        deadline: "",
        details: "",
        contact: "",
      });
      setSelectedType("");
      setUrgency("Normal");
      setFiles([]);
    } catch (error) {
      console.error("Request submission failed:", error);
      setSubmitMessage(`Could not send request: ${error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

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
if (adminOpen) {
  return <AdminDashboard onBack={() => setAdminOpen(false)} />;
}

  return (
  <div
  className="min-h-screen bg-cover bg-center bg-fixed"
  style={{
    backgroundImage: `linear-gradient(rgba(5, 24, 55, 0.50), rgba(5, 24, 55, 0.50)), url(${rosesBg})`,
  }}
>
<div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
  {floatingRoses.map((rose, index) => (
    <motion.img
      key={index}
      src={blueRose}
      alt=""
      className="absolute opacity-30 drop-shadow-[0_0_12px_rgba(96,165,250,0.55)]"
      style={{
        left: rose.left,
        top: rose.top,
        width: rose.size,
        height: rose.size,
      }}
    animate={{
  x:
    index % 2 === 0
      ? ["-20vw", "110vw"]
      : ["110vw", "-20vw"],
  y: [0, -25, 15, -15, 0],
  rotate:
    index % 2 === 0
      ? [0, 15, -8, 10, 0]
      : [0, -15, 8, -10, 0],
}}
     transition={{
  x: {
   duration: 35 + (index % 6) * 4,
    repeat: Infinity,
    ease: "linear",
    delay: rose.delay,
  },
  y: {
    duration: 5 + (index % 4),
    repeat: Infinity,
    ease: "easeInOut",
  },
  rotate: {
    duration: 7 + (index % 5),
    repeat: Infinity,
    ease: "easeInOut",
  },
}}
    />
  ))}
</div>
<header
  className="sticky top-0 z-50 mx-auto flex max-w-7xl items-center justify-between
  rounded-2xl border border-white/20
  bg-[#06142E]/70 px-6 py-5
  backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.35)]"
>   <div className="flex items-center gap-3">
        <img
  src={draftsLogo}
  alt="Drafts"
  className="h-12 w-12 object-contain
             drop-shadow-[0_0_6px_rgba(255,255,255,1)]
             drop-shadow-[0_0_14px_rgba(255,255,255,0.9)]
             drop-shadow-[0_0_25px_rgba(255,255,255,0.7)]"
/>
          <div>
            <div>
             <h1
  className="text-lg font-bold tracking-[0.22em] text-white"
  style={{
    textShadow:
      "0 0 6px rgba(255,255,255,0.95), 0 0 14px rgba(255,255,255,0.75), 0 0 28px rgba(255,255,255,0.45)"
  }}
>
  DRAFTS
</h1>
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
<button
  type="button"
  onClick={() => setAdminOpen(true)}
  className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold text-blue-100 transition hover:bg-white/10 hover:text-white"
>
  ...
</button>
        
      </header>

      <main>
        {page === "home" && (
          <section className="relative z-20 overflow-hidden px-6 py-16">
<div className="absolute left-1/2 top-[-180px] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-blue-500/20 blur-3xl" />

            <div className="relative mx-auto max-w-6xl rounded-[3rem] border border-white/10 bg-white/5 p-6 backdrop-blur-none md:p-10">
              <div className="mb-10 text-center">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-300/20 bg-white/10 px-4 py-2 text-sm text-blue-100">
                  <Sparkles size={15} /> <Sparkles size={15} /> Built by UAE university students for all students across the UAE
                </div>

<h2 className="mx-auto max-w-4xl text-3xl font-black leading-[1.15] tracking-tight text-white sm:text-4xl md:text-7xl">  {"Build Drafts You’re Proud to Submit.".split(" ").map((word, index) => (
    <motion.span
      key={index}
     className={`inline-block mr-[0.25em] ${
  word === "Submit."
    ? "text-transparent [-webkit-text-stroke:2px_white]"
    : "text-white"
}`}
      animate={{ y: [0, -12, 0, 12, 0] }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        delay: index * 0.12,
        ease: "easeInOut",
      }}
    >
      {word}
    </motion.span>
  ))}
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

                <form className="grid gap-4" onSubmit={handleSubmit}>
                  <div className="grid gap-4 md:grid-cols-2">
                    <input name="full_name" value={formData.full_name} onChange={handleInputChange} required className="rounded-2xl border-2 border-blue-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-200/50" placeholder="Full Name" />
                  <select
  name="university_school"
  value={formData.university_school}
  onChange={handleInputChange}
  className="w-full rounded-2xl border-2 border-blue-200 bg-white px-5 py-4 text-slate-700 outline-none"
>
  <option value="">Select University / College</option>
  <option value="United Arab Emirates University">United Arab Emirates University</option>
  <option value="Zayed University">Zayed University</option>
  <option value="Higher Colleges of Technology">Higher Colleges of Technology</option>
  <option value="Khalifa University">Khalifa University</option>
  <option value="Abu Dhabi University">Abu Dhabi University</option>
  <option value="Al Ain University">Al Ain University</option>
  <option value="Ajman University">Ajman University</option>
  <option value="University of Sharjah">University of Sharjah</option>
  <option value="American University of Sharjah">American University of Sharjah</option>
  <option value="American University in Dubai">American University in Dubai</option>
  <option value="American University of Ras Al Khaimah">American University of Ras Al Khaimah</option>
  <option value="Canadian University Dubai">Canadian University Dubai</option>
  <option value="University of Dubai">University of Dubai</option>
  <option value="University of Birmingham Dubai">University of Birmingham Dubai</option>
  <option value="University of Wollongong in Dubai">University of Wollongong in Dubai</option>
  <option value="British University in Dubai">British University in Dubai</option>
  <option value="Sorbonne University Abu Dhabi">Sorbonne University Abu Dhabi</option>
  <option value="Mohammed Bin Rashid University of Medicine and Health Sciences">
    Mohammed Bin Rashid University of Medicine and Health Sciences
  </option>
  <option value="Mohammed Bin Zayed University of Humanities">
    Mohammed Bin Zayed University of Humanities
  </option>
  <option value="Abu Dhabi Polytechnic">Abu Dhabi Polytechnic</option>
  <option value="Fatima College of Health Sciences">Fatima College of Health Sciences</option>
  <option value="Other">Other</option>
</select>
                  </div>
                  <input name="course_subject" value={formData.course_subject} onChange={handleInputChange} className="rounded-2xl border-2 border-blue-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-200/50" placeholder="Course / Subject" />
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
               <input
  type="date"
  name="deadline"
  value={formData.deadline}
  onChange={handleInputChange}
  className="w-full rounded-2xl border-2 border-blue-200 bg-white px-5 py-4 text-slate-700 outline-none"
/>

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
                  <textarea name="details" value={formData.details} onChange={handleInputChange} className="min-h-36 rounded-2xl border-2 border-blue-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-200/50" placeholder="Project Details" />
                  <label className="flex cursor-pointer items-center justify-center gap-3 rounded-2xl border border-dashed border-blue-300 bg-blue-50 px-4 py-6 font-semibold text-blue-800 transition hover:bg-blue-100">
                    <Upload size={20} />
                    <span>
                      {files.length > 0
                        ? `${files.length} file${files.length === 1 ? "" : "s"} selected`
                        : "Upload Files / Screenshots / Instructions"}
                    </span>
                    <input
                      type="file"
                      multiple
                      className="hidden"
                      accept=".pdf,.ppt,.pptx,.doc,.docx,.zip,.png,.jpg,.jpeg"
                      onChange={(event) => setFiles(Array.from(event.target.files || []))}
                    />
                  </label>
                  <p className="-mt-2 text-center text-xs font-semibold text-slate-500">Supported files: PDF, PPTX, DOCX, ZIP, PNG, JPG</p>
                  <input
                    name="contact"
                    value={formData.contact}
                    onChange={handleInputChange}
                    required
                    className="rounded-2xl border-2 border-blue-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-200/50"
                    placeholder="Contact Number / WhatsApp"
                  />

                  {submitMessage && (
                    <div
                      className={`rounded-2xl px-4 py-3 text-sm font-semibold ${
                        submitMessage.startsWith("Request sent")
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-red-50 text-red-700"
                      }`}
                    >
                      {submitMessage}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="rounded-2xl bg-blue-700 px-6 py-4 font-bold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {submitting ? "Sending..." : "Send Request"}
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
  aria-label="WhatsApp"
  className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl shadow-black/30 transition hover:scale-110 hover:bg-[#20bd5a]"
>
  <svg
    viewBox="0 0 32 32"
    className="h-8 w-8 fill-current"
    aria-hidden="true"
  >
    <path d="M16.03 3C8.84 3 3 8.77 3 15.9c0 2.29.61 4.53 1.77 6.49L3 29l6.81-1.75a13.11 13.11 0 0 0 6.22 1.57h.01C23.22 28.82 29 23.05 29 15.92 29 8.78 23.22 3 16.03 3Zm7.58 18.18c-.32.9-1.87 1.73-2.6 1.84-.67.1-1.51.14-2.44-.15-.56-.18-1.29-.42-2.22-.82-3.91-1.69-6.46-5.63-6.66-5.89-.2-.26-1.59-2.11-1.59-4.03 0-1.92 1-2.86 1.36-3.25.36-.39.78-.49 1.04-.49.26 0 .52 0 .75.01.24.01.56-.09.88.67.32.77 1.1 2.67 1.2 2.86.1.2.16.43.03.69-.13.26-.2.42-.39.65-.2.23-.41.51-.59.69-.2.2-.4.41-.17.8.23.39 1.02 1.68 2.19 2.72 1.51 1.34 2.78 1.76 3.18 1.96.39.2.62.16.85-.1.23-.26.98-1.14 1.24-1.53.26-.39.52-.33.88-.2.36.13 2.28 1.07 2.67 1.27.39.2.65.29.75.46.1.16.1.94-.22 1.84Z" />
  </svg>
</a>
      )}
    </div>
  );
}
