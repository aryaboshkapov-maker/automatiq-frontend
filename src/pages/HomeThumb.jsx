"use client"
import { useState } from "react"
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useReducedMotion } from "framer-motion"
import {
  Search, Star, ChevronRight, Check, MessageCircle, Calendar, BarChart3,
  Bot, Zap, Shield, Clock, Users, TrendingUp, ArrowRight, MapPin, Menu, X,
} from "lucide-react"

// ── palette ──────────────────────────────────────────────────────────────────
const T = {
  teal:   "#009FD4",
  tealDk: "#007FA8",
  tealLt: "#E6F7FC",
  orange: "#FF6B35",
  navy:   "#1A2B4A",
  gray50: "#F8F9FA",
  gray100:"#F0F2F5",
  gray200:"#E2E6EB",
  gray400:"#94A3B8",
  gray600:"#64748B",
  gray800:"#1E293B",
}

// ── data ─────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  { icon: MessageCircle, label: "WhatsApp Bot",      color: "#25D366", bg: "#E8F8EF" },
  { icon: Calendar,      label: "Auto-Booking",       color: "#007AFF", bg: "#EBF4FF" },
  { icon: Star,          label: "Review Replies",     color: "#FF9500", bg: "#FFF4E5" },
  { icon: Bot,           label: "Lead Qualifier",     color: "#AF52DE", bg: "#F5EEFF" },
  { icon: BarChart3,     label: "CRM Integration",    color: "#FF3B30", bg: "#FFF0EF" },
  { icon: Zap,           label: "Email Sequences",    color: "#009FD4", bg: "#E6F7FC" },
  { icon: Clock,         label: "Reminder System",    color: "#34C759", bg: "#EDFBF0" },
  { icon: TrendingUp,    label: "Analytics Reports",  color: "#FF6B35", bg: "#FFF2EC" },
]

const REVIEWS = [
  {
    name: "Natalia R.",
    role: "Accounting Firm · Torrevieja",
    avatar: "N",
    rating: 5,
    text: "Before AutomatIQ we spent 3–4 hours a day on manual messaging. Now the bot handles everything. Saved €800 in staff time the first month.",
    service: "WhatsApp Bot",
  },
  {
    name: "Carlos M.",
    role: "Dental Clinic · Alicante",
    avatar: "C",
    rating: 5,
    text: "No-shows dropped from 20% to 6% after the reminder automation went live. The system paid for itself in the first week.",
    service: "Reminder System",
  },
  {
    name: "Maria L.",
    role: "Real Estate Agency · Alicante",
    avatar: "M",
    rating: 5,
    text: "The multilingual lead bot qualifies foreign buyers 24/7. Our conversion rate is up 35% and we haven't hired an extra person.",
    service: "Lead Qualifier",
  },
]

const STEPS = [
  {
    n: "1",
    icon: Search,
    title: "Tell us about your business",
    text: "Answer 5 quick questions. We identify which repetitive tasks are costing you the most time and money.",
  },
  {
    n: "2",
    icon: Zap,
    title: "Get your automation plan",
    text: "We design a tailored automation setup — WhatsApp bots, booking flows, reminders — specific to your business.",
  },
  {
    n: "3",
    icon: Check,
    title: "Live in 5 days, runs itself",
    text: "We build and launch everything. You get a working system and step-by-step guide. No tech skills needed.",
  },
]

const STATS = [
  { value: "50+",    label: "automations launched" },
  { value: "5 days", label: "avg. launch time" },
  { value: "2× ROI", label: "first-month return" },
  { value: "3 lang", label: "RU · EN · ES" },
]

// ── animation variants ────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

const staggerList = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}

const staggerItem = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
}

// ── sub-components ────────────────────────────────────────────────────────────

function StarRow({ count = 5 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
      ))}
    </div>
  )
}

function Avatar({ letter, color }) {
  return (
    <div
      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
      style={{ background: color }}
    >
      {letter}
    </div>
  )
}

const AVATAR_COLORS = ["#009FD4", "#FF6B35", "#AF52DE"]

// ── page ──────────────────────────────────────────────────────────────────────

export default function HomeThumb() {
  const [navHidden, setNavHidden] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchVal, setSearchVal] = useState("")
  const shouldReduce = useReducedMotion()
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0
    setNavHidden(latest > prev && latest > 80)
  })

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">

      {/* ── NAV ──────────────────────────────────────────────────────────── */}
      <motion.nav
        animate={{ y: navHidden ? "-100%" : "0%" }}
        transition={{ duration: 0.28, ease: "easeInOut" }}
        className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 shadow-sm"
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 h-16">
          {/* Logo */}
          <a href="/" className="font-extrabold text-xl tracking-tight" style={{ color: T.navy }}>
            Automat<span style={{ color: T.teal }}>IQ</span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-7">
            {["How it works", "Services", "Pricing", "Reviews"].map((l) => (
              <a key={l} href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                {l}
              </a>
            ))}
          </div>

          {/* CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <a href="#" className="text-sm font-semibold text-gray-700 hover:text-gray-900 transition-colors px-2">
              Sign in
            </a>
            <a
              href="#"
              className="text-sm font-bold text-white px-4 py-2 rounded-full transition-all hover:opacity-90 active:scale-95"
              style={{ background: T.teal }}
            >
              Get started free
            </a>
          </div>

          {/* Mobile burger */}
          <button
            className="md:hidden p-2 text-gray-600"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden border-t border-gray-100 bg-white"
            >
              <div className="px-4 py-4 flex flex-col gap-4">
                {["How it works", "Services", "Pricing", "Reviews"].map((l) => (
                  <a key={l} href="#" className="text-sm font-medium text-gray-700">
                    {l}
                  </a>
                ))}
                <a
                  href="#"
                  className="text-sm font-bold text-white text-center px-4 py-2.5 rounded-full"
                  style={{ background: T.teal }}
                >
                  Get started free
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-28 pb-20 sm:pt-36 sm:pb-28 overflow-hidden">
        {/* Soft gradient bg */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(135deg, #E6F7FC 0%, #F8F9FA 50%, #FFF4E5 100%)" }}
        />
        {/* Decorative blobs */}
        <motion.div
          className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-30 pointer-events-none"
          style={{ background: T.teal, filter: "blur(80px)" }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 -left-20 w-72 h-72 rounded-full opacity-20 pointer-events-none"
          style={{ background: T.orange, filter: "blur(80px)" }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />

        <div className="relative max-w-3xl mx-auto px-4 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduce ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold mb-6"
            style={{ background: T.tealLt, color: T.teal }}
          >
            <MapPin className="w-3.5 h-3.5" />
            AI Automation · Alicante, España
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: shouldReduce ? 0 : 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="text-4xl sm:text-6xl font-extrabold leading-tight tracking-tight mb-5"
            style={{ color: T.navy }}
          >
            Automate your business.<br />
            <span style={{ color: T.teal }}>Get your time back.</span>
          </motion.h1>

          {/* Subline */}
          <motion.p
            initial={{ opacity: 0, y: shouldReduce ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.25 }}
            className="text-lg text-gray-500 mb-10 max-w-xl mx-auto leading-relaxed"
          >
            WhatsApp bots, booking systems, and automated replies — live in 5 days, no tech skills needed.
          </motion.p>

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduce ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.38 }}
            className="flex items-center bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden max-w-xl mx-auto"
            style={{ boxShadow: "0 8px 32px rgba(0,159,212,0.12), 0 2px 8px rgba(0,0,0,0.06)" }}
          >
            <Search className="w-5 h-5 ml-4 flex-shrink-0" style={{ color: T.teal }} />
            <input
              type="text"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              placeholder="What do you need to automate?"
              className="flex-1 px-3 py-4 text-sm text-gray-700 placeholder-gray-400 outline-none bg-transparent"
            />
            <button
              className="m-1.5 px-5 py-3 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90 active:scale-95"
              style={{ background: T.teal }}
            >
              Search
            </button>
          </motion.div>

          {/* Popular searches */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap justify-center gap-2 mt-4"
          >
            <span className="text-xs text-gray-400 self-center">Popular:</span>
            {["WhatsApp bot", "booking reminders", "review automation"].map((tag) => (
              <button
                key={tag}
                onClick={() => setSearchVal(tag)}
                className="text-xs px-3 py-1.5 rounded-full border border-gray-200 text-gray-600 hover:border-teal-300 hover:text-teal-600 transition-colors bg-white"
              >
                {tag}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── STATS STRIP ──────────────────────────────────────────────────── */}
      <section style={{ background: T.navy }}>
        <motion.div
          variants={staggerList}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto px-4 py-8 grid grid-cols-2 sm:grid-cols-4 gap-6"
        >
          {STATS.map((s, i) => (
            <motion.div key={i} variants={staggerItem} className="text-center">
              <div className="text-2xl font-black text-white mb-1">{s.value}</div>
              <div className="text-xs text-blue-200">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── CATEGORIES ───────────────────────────────────────────────────── */}
      <section className="py-16 px-4" style={{ background: T.gray50 }}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="mb-10"
          >
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-2" style={{ color: T.navy }}>
              Browse automations
            </h2>
            <p className="text-gray-500 text-sm">Pick the category that fits your biggest time drain.</p>
          </motion.div>

          <motion.div
            variants={staggerList}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4"
          >
            {CATEGORIES.map(({ icon: Icon, label, color, bg }, i) => (
              <motion.button
                key={i}
                variants={staggerItem}
                whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(0,0,0,0.10)" }}
                transition={{ duration: 0.18 }}
                className="flex flex-col items-center gap-3 bg-white rounded-2xl p-6 border border-gray-100 cursor-pointer group"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110"
                  style={{ background: bg }}
                >
                  <Icon className="w-7 h-7" style={{ color }} />
                </div>
                <span className="text-sm font-semibold text-gray-700 text-center leading-tight">{label}</span>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="text-center mb-14"
          >
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-3" style={{ color: T.navy }}>
              How AutomatIQ works
            </h2>
            <p className="text-gray-500 max-w-md mx-auto text-sm">
              From diagnosis to live automation in three simple steps.
            </p>
          </motion.div>

          <motion.div
            variants={staggerList}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid sm:grid-cols-3 gap-8 relative"
          >
            {/* connecting line (desktop) */}
            <div
              className="hidden sm:block absolute top-10 left-1/6 right-1/6 h-px"
              style={{ background: `linear-gradient(90deg, ${T.tealLt}, ${T.teal}40, ${T.tealLt})` }}
            />

            {STEPS.map(({ n, icon: Icon, title, text }, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                className="flex flex-col items-center text-center relative"
              >
                {/* Number + icon combo */}
                <div className="relative mb-6">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center"
                    style={{ background: T.tealLt }}
                  >
                    <Icon className="w-9 h-9" style={{ color: T.teal }} />
                  </div>
                  <div
                    className="absolute -top-1.5 -right-1.5 w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-black"
                    style={{ background: T.teal }}
                  >
                    {n}
                  </div>
                </div>
                <h3 className="text-base font-bold mb-2" style={{ color: T.navy }}>{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{text}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <a
              href="#"
              className="inline-flex items-center gap-2 text-sm font-bold text-white px-7 py-3.5 rounded-full transition-all hover:opacity-90 active:scale-95"
              style={{ background: T.teal, boxShadow: `0 4px 20px ${T.teal}40` }}
            >
              Get free diagnosis <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── REVIEWS ──────────────────────────────────────────────────────── */}
      <section className="py-20 px-4" style={{ background: T.gray50 }}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="mb-10"
          >
            <div className="flex items-center gap-3 mb-2">
              <StarRow />
              <span className="text-sm font-bold text-gray-700">5.0 · 50+ clients</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold" style={{ color: T.navy }}>
              What businesses say
            </h2>
          </motion.div>

          <motion.div
            variants={staggerList}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid sm:grid-cols-3 gap-5"
          >
            {REVIEWS.map((r, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                whileHover={{ y: -4, boxShadow: "0 16px 40px rgba(0,0,0,0.09)" }}
                transition={{ duration: 0.18 }}
                className="bg-white rounded-2xl p-6 border border-gray-100 flex flex-col gap-4"
              >
                <StarRow count={r.rating} />
                <p className="text-sm text-gray-600 leading-relaxed flex-1">"{r.text}"</p>
                <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
                  <Avatar letter={r.avatar} color={AVATAR_COLORS[i]} />
                  <div>
                    <div className="text-sm font-bold text-gray-800">{r.name}</div>
                    <div className="text-xs text-gray-400">{r.role}</div>
                  </div>
                </div>
                <div
                  className="inline-flex self-start items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full"
                  style={{ background: T.tealLt, color: T.teal }}
                >
                  <Check className="w-3 h-3" /> {r.service}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── TRUST BAR ────────────────────────────────────────────────────── */}
      <section className="py-12 px-4 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={staggerList}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-3 gap-6"
          >
            {[
              { icon: Shield,  title: "Background verified",      text: "Every automation is tested end-to-end before handover. No surprises." },
              { icon: Clock,   title: "Live in 5 days",           text: "We set a hard deadline and stick to it. You'll see results fast." },
              { icon: Users,   title: "Bilingual support",        text: "Work with us in Russian, English or Spanish — whichever you prefer." },
            ].map(({ icon: Icon, title, text }, i) => (
              <motion.div key={i} variants={staggerItem} className="flex gap-4">
                <div
                  className="w-11 h-11 rounded-xl flex-shrink-0 flex items-center justify-center"
                  style={{ background: T.tealLt }}
                >
                  <Icon className="w-5 h-5" style={{ color: T.teal }} />
                </div>
                <div>
                  <div className="text-sm font-bold mb-1" style={{ color: T.navy }}>{title}</div>
                  <div className="text-xs text-gray-500 leading-relaxed">{text}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────────────────── */}
      <section className="py-20 px-4" style={{ background: `linear-gradient(135deg, ${T.navy} 0%, #0F2A4A 100%)` }}>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 leading-tight">
            Ready to get your time back?
          </h2>
          <p className="text-blue-200 mb-8 text-sm leading-relaxed max-w-md mx-auto">
            Free 5-minute diagnosis. Three concrete automation recommendations. No obligation.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="#"
              className="inline-flex items-center justify-center gap-2 text-sm font-bold text-white px-7 py-3.5 rounded-full transition-all hover:opacity-90"
              style={{ background: T.teal, boxShadow: `0 4px 24px ${T.teal}60` }}
            >
              Start free diagnosis <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="https://wa.me/34627345058"
              className="inline-flex items-center justify-center gap-2 text-sm font-bold px-7 py-3.5 rounded-full border-2 border-white/25 text-white hover:border-white/50 transition-all"
            >
              <MessageCircle className="w-4 h-4" /> WhatsApp us
            </a>
          </div>
        </motion.div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer className="py-8 px-4 border-t border-gray-100 bg-white">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-extrabold text-lg tracking-tight" style={{ color: T.navy }}>
            Automat<span style={{ color: T.teal }}>IQ</span>
          </span>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Contact"].map((l) => (
              <a key={l} href="#" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
                {l}
              </a>
            ))}
          </div>
          <p className="text-xs text-gray-400">© 2025 AutomatIQ · Alicante, España</p>
        </div>
      </footer>

    </div>
  )
}
