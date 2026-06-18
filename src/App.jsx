import { useState } from "react"
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion"
import {
  Search,
  Zap,
  TrendingUp,
  Check,
  ChevronDown,
  MessageCircle,
  Send,
  Mail,
  Star,
  Bot,
  Calendar,
  BarChart3,
} from "lucide-react"
import DiagnosticBot from "./components/DiagnosticBot"

// ─── Floating particles (deterministic positions) ─────────────────────────────

const PARTICLE_DATA = [
  { x: 12, y: 22, s: 3, d: 14, dl: 0,   c: "#0F62FE" },
  { x: 78, y: 18, s: 2, d: 11, dl: 2.5, c: "#6929C4" },
  { x: 55, y: 75, s: 4, d: 16, dl: 1,   c: "#0F62FE" },
  { x: 28, y: 82, s: 2, d: 12, dl: 3.8, c: "#6929C4" },
  { x: 88, y: 48, s: 3, d: 13, dl: 0.8, c: "#0F62FE" },
  { x: 42, y: 32, s: 2, d: 15, dl: 4.5, c: "#6929C4" },
  { x: 68, y: 88, s: 3, d: 10, dl: 1.8, c: "#0F62FE" },
  { x: 8,  y: 65, s: 2, d: 17, dl: 3,   c: "#6929C4" },
  { x: 52, y: 8,  s: 3, d: 12, dl: 5,   c: "#0F62FE" },
  { x: 22, y: 52, s: 2, d: 14, dl: 1.2, c: "#6929C4" },
  { x: 95, y: 30, s: 2, d: 13, dl: 2,   c: "#0F62FE" },
  { x: 35, y: 10, s: 3, d: 11, dl: 4,   c: "#6929C4" },
]

function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {PARTICLE_DATA.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.s, height: p.s, background: p.c }}
          animate={{ y: [0, -50, 0], opacity: [0.1, 0.7, 0.1], scale: [1, 2, 1] }}
          transition={{ duration: p.d, delay: p.dl, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  )
}

// ─── Glowing step icon with spinning gradient ring ────────────────────────────

function GlowingStepIcon({ Icon, n }) {
  return (
    <div className="relative mx-auto w-fit mb-6">
      <div
        className="absolute inset-0 rounded-2xl blur-2xl opacity-50"
        style={{ background: "#0F62FE", transform: "scale(1.4)" }}
      />
      <motion.div
        className="absolute inset-[-2px] rounded-[22px]"
        style={{
          background:
            "conic-gradient(from 0deg, #0F62FE 0%, #6929C4 45%, transparent 60%, #0F62FE 100%)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />
      <div className="relative w-20 h-20 rounded-2xl bg-brand-dark flex items-center justify-center border border-white/5">
        <Icon
          className="w-9 h-9 text-brand-primary"
          style={{ filter: "drop-shadow(0 0 10px #0F62FE)" }}
        />
      </div>
      <div className="absolute -top-2.5 -right-2.5 w-6 h-6 rounded-full bg-brand-dark border border-brand-primary/60 flex items-center justify-center">
        <span className="text-[9px] font-bold text-brand-primary font-mono">{n}</span>
      </div>
    </div>
  )
}

// ─── Animated conic-gradient border for pricing highlight ────────────────────

function AnimatedBorder({ children }) {
  return (
    <div className="relative rounded-2xl overflow-hidden p-[1.5px]">
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "conic-gradient(from 0deg, #0F62FE, #6929C4, #0F62FE88, transparent, #0F62FE)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />
      <div className="relative bg-[#0d0d1a] rounded-[14px] h-full">{children}</div>
    </div>
  )
}

// ─── Content ──────────────────────────────────────────────────────────────────

const CONTENT = {
  ru: {
    nav_links: [
      { label: "Как работает", href: "how" },
      { label: "Цены", href: "pricing" },
      { label: "Отзывы", href: "testimonial" },
      { label: "FAQ", href: "faq" },
    ],
    nav_cta: "Диагностика",
    hero_badge: "AI-автоматизация · Аликанте",
    hero_title: "Автоматизирую бизнес в Аликанте с помощью ИИ",
    hero_sub:
      "WhatsApp-боты, автозапись, автоответы на отзывы. Работаю с бизнесами в Аликанте и провинции.",
    hero_cta: "Пройти диагностику бесплатно",
    hero_cta2: "Смотреть примеры",
    activity: [
      { text: "WhatsApp-бот ответил клиенту", status: "0.3с" },
      { text: "Запись подтверждена автоматически", status: "✓" },
      { text: "Напоминание отправлено: −12 no-show", status: "сейчас" },
    ],
    stats: [
      { value: "50+", label: "автоматизаций запущено" },
      { value: "5 дней", label: "среднее время запуска" },
      { value: "2× ROI", label: "окупаемость за месяц" },
    ],
    problems_title: "Узнаёте себя?",
    problems: [
      { icon: "🌙", title: "Теряете лиды ночью", text: "Клиент написал в 23:00 — вы ответили утром. Он уже у конкурента." },
      { icon: "🔁", title: "Часы на одинаковые ответы", text: "«Сколько стоит?», «Есть ли место?» — каждый день одно и то же." },
      { icon: "📅", title: "No-show и пустое расписание", text: "Клиенты не приходят без предупреждения. Время потеряно, деньги потеряны." },
    ],
    how_title: "Как это работает",
    how_label: "процесс",
    how_steps: [
      { Icon: Search, n: "01", title: "Диагностика за 5 минут", text: "Отвечаете на 5 вопросов — получаете персональный отчёт с тремя конкретными автоматизациями." },
      { Icon: Zap, n: "02", title: "Внедрение за 5 дней", text: "Настраиваю систему под ваш бизнес. Готовое решение без технических знаний с вашей стороны." },
      { Icon: TrendingUp, n: "03", title: "Работает само", text: "Боты отвечают клиентам, напоминания уходят автоматически — без вашего участия." },
    ],
    demo_title: "Нажмите — попробуйте прямо сейчас",
    demo_sub: "Живой AI-чат для автосалона Alicante Cars",
    demo_try_tg: "Попробовать Telegram",
    demo_try_wa: "Попробовать WhatsApp",
    demo_bot_msg: "Привет! 👋 Я ассистент Alicante Cars. Чем могу помочь?",
    demo_suggestions: ["Купить авто", "Арендовать", "Трансфер"],
    packages_title: "Пакеты услуг",
    packages_label: "тарифы",
    packages: [
      {
        name: "Starter",
        price: "€900",
        period: "разово",
        desc: "Одна автоматизация под ключ",
        features: ["WhatsApp-бот или автоответы на отзывы", "Настройка и запуск за 3 дня", "Инструкция по использованию", "Поддержка 2 недели"],
        cta: "Начать",
        highlight: false,
      },
      {
        name: "Business",
        price: "€2 400",
        period: "разово",
        desc: "Полная автоматизация процессов",
        features: ["До 3 автоматизаций под ключ", "Интеграция с CRM и календарём", "Запуск за 5–7 дней", "Поддержка 1 месяц включена"],
        cta: "Выбрать",
        highlight: true,
        badge: "Популярный",
      },
      {
        name: "Retainer",
        price: "€400",
        period: "в месяц",
        desc: "Постоянное обслуживание",
        features: ["Мониторинг и обновления", "1 новая автоматизация в месяц", "Приоритетная поддержка", "Ежемесячный отчёт"],
        cta: "Подключить",
        highlight: false,
      },
    ],
    testimonial: {
      quote: "До работы с AutomatIQ мы тратили 3–4 часа в день на ручную переписку с клиентами. Теперь бот отвечает автоматически, а мы занимаемся только бухгалтерией. За первый месяц сэкономили больше €800 на времени сотрудников.",
      name: "Наталья Р.",
      role: "Директор",
      company: "Бухгалтерская фирма · Торревьеха",
    },
    faq_title: "Частые вопросы",
    faq_label: "FAQ",
    faq: [
      { q: "Сколько стоит внедрение и почему такая цена?", a: "Стоимость зависит от пакета: от €900 за одну автоматизацию до €2 400 за комплексное решение. Это не просто бот — настроенная система, которая окупается за 1–2 месяца за счёт сэкономленного времени." },
      { q: "Как быстро появится результат?", a: "Первая автоматизация запускается за 3–5 рабочих дней. Эффект заметен сразу: меньше ручных ответов, меньше пропущенных клиентов." },
      { q: "Нужны ли мне технические знания?", a: "Нет. Вы получаете готовое решение и подробную инструкцию. Я беру на себя всю техническую часть: настройку, тестирование, запуск." },
      { q: "Что если бот не справится с нестандартным вопросом?", a: "Бот переключает сложные запросы на вас с уведомлением. Клиент получает быстрый первичный ответ, вы — только те диалоги, где нужна ваша экспертиза." },
      { q: "Работаете ли вы с испаноязычными клиентами тоже?", a: "Да. Боты настраиваются на русский, испанский и английский. Сам работаю на трёх языках и хорошо понимаю специфику местного рынка." },
      { q: "Как обеспечивается безопасность данных клиентов?", a: "Данные хранятся только в системах, которые вы контролируете (ваш WhatsApp Business, ваша CRM). Я не храню персональные данные ваших клиентов на сторонних серверах." },
    ],
    diag_title: "Узнайте за 5 минут что можно автоматизировать",
    diag_sub: "Бесплатная диагностика — три конкретных решения для вашего бизнеса",
    cases_title: "Примеры результатов",
    cases_label: "кейсы",
    cases: [
      { sector: "Ресторан, Аликанте", problem: "Терял брони ночью, тратил 2 часа на WhatsApp", solution: "WhatsApp-бот + автоподтверждения", result: "−20% потерянных броней, экономия 2 ч/день" },
      { sector: "Стоматология, Аликанте", problem: "20% no-show, администратор тонул в звонках", solution: "Автозапись + напоминания за 24ч и 2ч", result: "No-show с 20% до 6%, −2 ч/день" },
      { sector: "Агентство недвижимости, Аликанте", problem: "Иностранные клиенты не получали ответы ночью", solution: "Мультиязычный бот-квалификатор", result: "+35% конверсия, 4 языка без переводчика" },
    ],
    about_title: "Привет, я живу и работаю в Аликанте",
    about_text: "Помогаю местным бизнесам — русскоязычным и международным — освободить время от рутины с помощью ИИ. Знаю местную специфику изнутри. Работаю на русском, английском и испанском.",
    about_items: ["Живу в Аликанте", "Работаю на 3 языках", "Результат за 5 дней"],
    contact_title: "Остались вопросы?",
    contact_text: "Напишите напрямую — отвечу в течение нескольких часов",
    footer_copy: "© 2025 AutomatIQ · Alicante, España",
  },
  en: {
    nav_links: [
      { label: "How it works", href: "how" },
      { label: "Pricing", href: "pricing" },
      { label: "Reviews", href: "testimonial" },
      { label: "FAQ", href: "faq" },
    ],
    nav_cta: "Free diagnosis",
    hero_badge: "AI Automation · Alicante",
    hero_title: "AI Automation for Businesses in Alicante",
    hero_sub: "WhatsApp bots, automated booking, review replies. Serving businesses in Alicante and the province.",
    hero_cta: "Get free diagnosis",
    hero_cta2: "See examples",
    activity: [
      { text: "WhatsApp bot replied to client", status: "0.3s" },
      { text: "Booking confirmed automatically", status: "✓" },
      { text: "Reminder sent: −12 no-show", status: "now" },
    ],
    stats: [
      { value: "50+", label: "automations launched" },
      { value: "5 days", label: "average launch time" },
      { value: "2× ROI", label: "monthly return" },
    ],
    problems_title: "Sound familiar?",
    problems: [
      { icon: "🌙", title: "Losing leads overnight", text: "Client messaged at 11pm — you replied in the morning. They've already gone to a competitor." },
      { icon: "🔁", title: "Hours on the same answers", text: "'How much?', 'Is there availability?' — the same questions every single day." },
      { icon: "📅", title: "No-shows and empty slots", text: "Clients don't show up without warning. Your time is wasted, revenue is lost." },
    ],
    how_title: "How it works",
    how_label: "process",
    how_steps: [
      { Icon: Search, n: "01", title: "5-minute diagnosis", text: "Answer 5 questions about your business — get a personalised report with three concrete automations." },
      { Icon: Zap, n: "02", title: "Live in 5 days", text: "I set everything up for your business. You get a working solution with no technical knowledge required." },
      { Icon: TrendingUp, n: "03", title: "Runs on autopilot", text: "Bots reply to clients, reminders go out automatically — without your involvement." },
    ],
    demo_title: "Click — try it right now",
    demo_sub: "Live AI chat for Alicante Cars dealership",
    demo_try_tg: "Try Telegram demo",
    demo_try_wa: "Try WhatsApp demo",
    demo_bot_msg: "Hi! 👋 I'm the Alicante Cars assistant. How can I help?",
    demo_suggestions: ["Buy a car", "Rent a car", "Transfer"],
    packages_title: "Packages",
    packages_label: "pricing",
    packages: [
      {
        name: "Starter",
        price: "€900",
        period: "one-off",
        desc: "One automation, fully set up",
        features: ["WhatsApp bot or review auto-replies", "Set up and live in 3 days", "Usage guide included", "2 weeks support"],
        cta: "Get started",
        highlight: false,
      },
      {
        name: "Business",
        price: "€2,400",
        period: "one-off",
        desc: "Full process automation",
        features: ["Up to 3 automations, fully set up", "CRM and calendar integration", "Live in 5–7 days", "1 month support included"],
        cta: "Choose this",
        highlight: true,
        badge: "Most popular",
      },
      {
        name: "Retainer",
        price: "€400",
        period: "per month",
        desc: "Ongoing maintenance",
        features: ["Monitoring and updates", "1 new automation per month", "Priority support", "Monthly report"],
        cta: "Get started",
        highlight: false,
      },
    ],
    testimonial: {
      quote: "Before AutomatIQ, we spent 3–4 hours a day on manual client messaging. Now the bot handles it automatically, and we focus on accounting. We saved over €800 in staff time in the first month alone.",
      name: "Natalia R.",
      role: "Director",
      company: "Accounting Firm · Torrevieja",
    },
    faq_title: "Frequently asked questions",
    faq_label: "FAQ",
    faq: [
      { q: "How much does it cost and why?", a: "Pricing depends on the package: from €900 for one automation to €2,400 for a full solution. This isn't just a bot — it's a tailored system that pays for itself in 1–2 months." },
      { q: "How quickly will I see results?", a: "The first automation is live within 3–5 working days. You'll notice the effect immediately: fewer manual replies, fewer missed clients." },
      { q: "Do I need technical knowledge?", a: "No. You get a ready-made solution with a clear guide. I handle all the technical side: setup, testing, and launch." },
      { q: "What if the bot can't handle an unusual question?", a: "The bot transfers complex queries to you with a notification. Clients get a fast initial response; you only receive conversations where your expertise is needed." },
      { q: "Do you also work with Spanish-speaking clients?", a: "Yes. Bots are configured for Russian, Spanish, and English. I work in all three languages and know the local market well." },
      { q: "How is client data kept secure?", a: "Data is stored only in systems you control (your WhatsApp Business, your CRM). I don't store your clients' personal data on third-party servers." },
    ],
    diag_title: "Find out in 5 minutes what you can automate",
    diag_sub: "Free diagnosis — three concrete solutions for your business",
    cases_title: "Results",
    cases_label: "cases",
    cases: [
      { sector: "Restaurant, Alicante", problem: "Losing bookings overnight, 2 hours daily on WhatsApp", solution: "WhatsApp bot + auto-confirmations", result: "−20% lost bookings, saves 2h/day" },
      { sector: "Dental clinic, Alicante", problem: "20% no-show rate, receptionist overwhelmed", solution: "Automated booking + 24h and 2h reminders", result: "No-show 20% → 6%, saves 2h/day" },
      { sector: "Real estate agency, Alicante", problem: "Foreign clients got no reply overnight", solution: "Multilingual lead-qualifier bot", result: "+35% conversion, 4 languages without a translator" },
    ],
    about_title: "Hi — I'm based in Alicante",
    about_text: "I help local businesses — Russian-speaking and international — reclaim time from routine tasks using AI. I know the local market from the inside and work in Russian, English and Spanish.",
    about_items: ["Based in Alicante", "Works in 3 languages", "Results in 5 days"],
    contact_title: "Any questions?",
    contact_text: "Message me directly — I reply within a few hours",
    footer_copy: "© 2025 AutomatIQ · Alicante, España",
  },
}

// ─── Animation variants ───────────────────────────────────────────────────────

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
}

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

// ─── Section label decorator ──────────────────────────────────────────────────

function SectionLabel({ children }) {
  return (
    <div className="flex items-center justify-center gap-3 mb-3">
      <div className="h-px w-10 bg-gradient-to-r from-transparent to-brand-primary/60" />
      <span className="text-[10px] text-brand-primary uppercase tracking-[0.25em] font-mono">
        {children}
      </span>
      <div className="h-px w-10 bg-gradient-to-l from-transparent to-brand-primary/60" />
    </div>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [lang, setLang] = useState("ru")
  const [navHidden, setNavHidden] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)
  const shouldReduce = useReducedMotion()
  const { scrollY } = useScroll()
  const c = CONTENT[lang]

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0
    setNavHidden(latest > prev && latest > 100)
  })

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })

  const fadeUp = {
    hidden: { opacity: 0, y: shouldReduce ? 0 : 32 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  }

  const wordItem = {
    hidden: { opacity: 0, y: shouldReduce ? 0 : 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  }

  return (
    <div className="min-h-screen bg-brand-dark text-white font-sans">

      {/* ── NAV ──────────────────────────────────────────────────────────── */}
      <motion.nav
        animate={{ y: navHidden ? "-100%" : "0%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-0 left-0 right-0 z-50 bg-brand-dark/80 backdrop-blur-md border-b border-white/10"
      >
        <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
          <span className="font-bold text-lg bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text text-transparent select-none tracking-tight">
            AutomatIQ
          </span>
          <div className="hidden md:flex items-center gap-6">
            {c.nav_links.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-sm text-brand-muted hover:text-white transition-colors font-mono"
              >
                {link.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            {["ru", "en"].map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`text-xs px-2.5 py-1 rounded-full border transition-colors font-mono ${
                  lang === l
                    ? "bg-brand-primary/20 text-brand-primary border-brand-primary/50"
                    : "text-brand-muted border-white/10 hover:border-white/25 hover:text-gray-300"
                }`}
              >
                {l.toUpperCase()}
              </button>
            ))}
            <button
              onClick={() => scrollTo("diagnosis")}
              className="hidden sm:block bg-brand-primary text-white text-sm px-4 py-1.5 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
              style={{ boxShadow: "0 0 20px rgba(15,98,254,0.4)" }}
            >
              {c.nav_cta}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative px-4 pt-32 pb-24 sm:pt-44 sm:pb-32 overflow-hidden">
        {/* Moving grid */}
        <motion.div
          className="absolute inset-0 bg-grid pointer-events-none opacity-40"
          animate={{ backgroundPosition: ["0px 0px", "50px 50px"] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />

        {/* Animated gradient orbs */}
        <motion.div
          className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full bg-brand-primary/20 blur-[120px] pointer-events-none"
          animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.28, 0.15] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-brand-accent/20 blur-[120px] pointer-events-none"
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />

        {/* Floating particles */}
        <FloatingParticles />

        {/* Vertical light beams */}
        {[18, 38, 62, 82].map((x, i) => (
          <motion.div
            key={i}
            className="absolute top-0 bottom-0 w-px pointer-events-none"
            style={{
              left: `${x}%`,
              background: "linear-gradient(180deg, transparent, rgba(15,98,254,0.15), transparent)",
            }}
            animate={{ opacity: [0, 0.8, 0] }}
            transition={{ duration: 4, delay: i * 1.3, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}

        <div className="relative max-w-3xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduce ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 border border-brand-primary/40 rounded-full px-4 py-1.5 text-xs text-brand-primary mb-8 bg-brand-primary/10 font-mono"
          >
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-brand-primary"
              animate={{ opacity: [1, 0.2, 1], scale: [1, 0.8, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            {c.hero_badge}
          </motion.div>

          {/* Animated title word-by-word */}
          <h1 className="text-4xl sm:text-6xl font-bold leading-tight mb-6">
            <motion.span
              className="bg-gradient-to-r from-brand-primary via-blue-400 to-brand-accent bg-clip-text text-transparent"
              style={{ display: "inline-flex", flexWrap: "wrap", justifyContent: "center", gap: "0 0.3em" }}
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {c.hero_title.split(" ").map((word, i) => (
                <motion.span key={i} variants={wordItem} style={{ display: "inline-block" }}>
                  {word}
                </motion.span>
              ))}
            </motion.span>
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: shouldReduce ? 0 : 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.55 }}
            className="text-lg text-gray-400 mb-10 max-w-xl mx-auto leading-relaxed"
          >
            {c.hero_sub}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduce ? 0 : 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            {/* Primary CTA with pulse ring */}
            <div className="relative inline-flex">
              <motion.div
                className="absolute inset-0 rounded-xl bg-brand-primary"
                animate={{ scale: [1, 1.18, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
              />
              <button
                onClick={() => scrollTo("diagnosis")}
                className="relative bg-brand-primary text-white px-7 py-3 rounded-xl font-bold hover:bg-blue-600 transition-colors text-sm"
                style={{ boxShadow: "0 0 30px rgba(15,98,254,0.45)" }}
              >
                {c.hero_cta} →
              </button>
            </div>
            <button
              onClick={() => scrollTo("cases")}
              className="border border-white/15 text-gray-300 px-7 py-3 rounded-xl font-semibold hover:border-white/30 hover:text-white transition-colors text-sm backdrop-blur-sm"
            >
              {c.hero_cta2}
            </button>
          </motion.div>

          {/* Live activity dashboard */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduce ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mt-12 max-w-md mx-auto"
          >
            <div
              className="bg-brand-surface/70 border border-white/10 rounded-xl overflow-hidden backdrop-blur-sm"
              style={{ boxShadow: "0 0 40px rgba(15,98,254,0.08)" }}
            >
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/5 bg-white/3">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                  <motion.div
                    className="w-2.5 h-2.5 rounded-full bg-green-500"
                    animate={{ opacity: [1, 0.4, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </div>
                <span className="text-[10px] text-brand-muted font-mono ml-2 tracking-wider">
                  automatiq.live
                </span>
              </div>
              <div className="p-4 space-y-2.5 font-mono text-[11px]">
                {c.activity.map((a, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2 + i * 0.45 }}
                    className="flex items-center gap-2"
                  >
                    <motion.span
                      className="text-green-400 text-[10px]"
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 2, delay: i * 0.7, repeat: Infinity }}
                    >
                      ▶
                    </motion.span>
                    <span className="text-gray-300">{a.text}</span>
                    <span className="ml-auto text-brand-primary/80">{a.status}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
            className="flex justify-center gap-8 sm:gap-14 mt-10 pt-8 border-t border-white/8"
          >
            {c.stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div
                  className="text-xl sm:text-2xl font-bold font-mono bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text text-transparent"
                >
                  {stat.value}
                </div>
                <div className="text-[10px] text-brand-muted mt-1 tracking-wide">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── PROBLEMS ─────────────────────────────────────────────────────── */}
      <section className="px-4 py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-surface/30 to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto relative">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl sm:text-3xl font-bold">{c.problems_title}</h2>
          </motion.div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid sm:grid-cols-3 gap-5"
          >
            {c.problems.map((p, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                whileHover={{ y: -6, boxShadow: "0 24px 48px rgba(15,98,254,0.15)" }}
                transition={{ duration: 0.2 }}
                className="relative bg-brand-surface border border-white/8 rounded-xl p-6 overflow-hidden group"
              >
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-brand-primary/30 rounded-tl-xl" />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-brand-primary/30 rounded-br-xl" />
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                <div className="text-3xl mb-3">{p.icon}</div>
                <h3 className="font-semibold mb-2 text-white">{p.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{p.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section id="how" className="px-4 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 via-transparent to-brand-accent/5 pointer-events-none" />
        <div className="max-w-4xl mx-auto relative">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <SectionLabel>{c.how_label}</SectionLabel>
            <h2 className="text-2xl sm:text-3xl font-bold">{c.how_title}</h2>
          </motion.div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid sm:grid-cols-3 gap-6"
          >
            {c.how_steps.map((s, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                whileHover={{ y: -6, boxShadow: "0 24px 48px rgba(15,98,254,0.2)" }}
                transition={{ duration: 0.2 }}
                className="relative bg-brand-surface border border-white/8 rounded-2xl p-8 text-center overflow-hidden group"
              >
                {/* Top gradient accent */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-primary/60 to-transparent" />
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-brand-primary/40 rounded-tl-2xl" />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-brand-primary/40 rounded-br-2xl" />
                {/* Background large number */}
                <div className="absolute -bottom-4 -right-2 text-8xl font-black text-white/[0.03] select-none font-mono">
                  {s.n}
                </div>
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                <GlowingStepIcon Icon={s.Icon} n={s.n} />
                <h3 className="font-bold text-white mb-3 text-base">{s.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{s.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── DEMO ─────────────────────────────────────────────────────────── */}
      <section className="px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <p className="text-xs text-brand-muted uppercase tracking-widest mb-2 font-mono">Live demo</p>
            <h2 className="text-2xl font-bold mb-2">{c.demo_title}</h2>
            <p className="text-gray-500 text-sm mb-12">{c.demo_sub}</p>
          </motion.div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid sm:grid-cols-2 gap-12 max-w-sm mx-auto sm:max-w-none"
          >
            {/* Telegram */}
            <motion.a variants={staggerItem} href="/demo-telegram" className="group flex flex-col items-center gap-5">
              <div className="w-52 rounded-[2.4rem] border-[5px] border-gray-700 bg-gray-900 overflow-hidden shadow-2xl shadow-sky-500/10 group-hover:shadow-sky-500/40 group-hover:scale-105 transition-all duration-300">
                <div className="bg-gray-900 h-6 flex justify-center items-end pb-1">
                  <div className="w-16 h-3.5 bg-gray-800 rounded-full" />
                </div>
                <div className="bg-[#2AABEE] px-3 py-2 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#1a7ab5] flex items-center justify-center text-base flex-shrink-0">🚗</div>
                  <div className="text-left">
                    <div className="text-white text-[11px] font-semibold leading-tight">Alicante Cars</div>
                    <div className="text-blue-100 text-[9px]">bot</div>
                  </div>
                </div>
                <div className="bg-[#1c2b3a] px-2.5 pt-3 pb-2 space-y-2" style={{ minHeight: 170 }}>
                  <div className="bg-[#182533] rounded-xl rounded-tl-sm px-2.5 py-2 text-[10px] text-gray-300 leading-relaxed max-w-[88%]">
                    {c.demo_bot_msg}
                  </div>
                  <div className="flex gap-1 flex-wrap">
                    {c.demo_suggestions.map((s) => (
                      <span key={s} className="border border-[#2AABEE]/70 text-[#2AABEE] text-[8px] px-2 py-0.5 rounded-full">{s}</span>
                    ))}
                  </div>
                </div>
                <div className="bg-[#1c1c1e] px-2.5 py-2 flex items-center gap-2 border-t border-gray-700/40">
                  <div className="flex-1 bg-gray-700/40 rounded-full h-5" />
                  <span className="text-[#2AABEE] text-sm">➤</span>
                </div>
                <div className="bg-[#1c1c1e] py-2 flex justify-center">
                  <div className="w-20 h-1 bg-gray-600 rounded-full" />
                </div>
              </div>
              <div className="inline-flex items-center gap-2 bg-sky-500/10 border border-sky-500/30 text-sky-400 px-5 py-2.5 rounded-xl text-sm font-semibold group-hover:bg-sky-500/20 group-hover:border-sky-500/60 transition-all">
                🤖 {c.demo_try_tg}
              </div>
            </motion.a>

            {/* WhatsApp */}
            <motion.a variants={staggerItem} href="/demo-whatsapp" className="group flex flex-col items-center gap-5">
              <div className="w-52 rounded-[2.4rem] border-[5px] border-gray-700 bg-gray-900 overflow-hidden shadow-2xl shadow-green-500/10 group-hover:shadow-green-500/40 group-hover:scale-105 transition-all duration-300">
                <div className="bg-gray-900 h-6 flex justify-center items-end pb-1">
                  <div className="w-16 h-3.5 bg-gray-800 rounded-full" />
                </div>
                <div className="bg-[#075E54] px-3 py-2 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#128C7E] flex items-center justify-center text-base flex-shrink-0">🚗</div>
                  <div className="text-left">
                    <div className="text-white text-[11px] font-semibold leading-tight">Alicante Cars</div>
                    <div className="text-green-100 text-[9px]">online</div>
                  </div>
                </div>
                <div className="bg-[#efeae2] px-2.5 pt-3 pb-2 space-y-2" style={{ minHeight: 170 }}>
                  <div className="bg-white rounded-xl rounded-tl-sm px-2.5 py-2 text-[10px] text-gray-700 leading-relaxed max-w-[88%] shadow-sm">
                    {c.demo_bot_msg}
                  </div>
                  <div className="flex gap-1 flex-wrap">
                    {c.demo_suggestions.map((s) => (
                      <span key={s} className="border border-[#25d366] text-[#075E54] text-[8px] px-2 py-0.5 rounded-full bg-white/80">{s}</span>
                    ))}
                  </div>
                </div>
                <div className="bg-[#1f2c34] px-2.5 py-2 flex items-center gap-2 border-t border-gray-600/40">
                  <div className="flex-1 bg-gray-600/40 rounded-full h-5" />
                  <span className="text-[#25d366] text-sm">➤</span>
                </div>
                <div className="bg-[#1f2c34] py-2 flex justify-center">
                  <div className="w-20 h-1 bg-gray-500 rounded-full" />
                </div>
              </div>
              <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 text-green-400 px-5 py-2.5 rounded-xl text-sm font-semibold group-hover:bg-green-500/20 group-hover:border-green-500/60 transition-all">
                💬 {c.demo_try_wa}
              </div>
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* ── PRICING ──────────────────────────────────────────────────────── */}
      <section id="pricing" className="px-4 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-primary/5 to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto relative">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-12"
          >
            <SectionLabel>{c.packages_label}</SectionLabel>
            <h2 className="text-2xl sm:text-3xl font-bold">{c.packages_title}</h2>
          </motion.div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid sm:grid-cols-3 gap-5 items-start"
          >
            {c.packages.map((pkg, i) => {
              const card = (
                <div className={`relative flex flex-col p-6 h-full ${pkg.highlight ? "" : ""}`}>
                  {pkg.badge && (
                    <div
                      className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-primary text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap"
                      style={{ boxShadow: "0 0 20px rgba(15,98,254,0.6)" }}
                    >
                      {pkg.badge}
                    </div>
                  )}
                  {/* Corner accents for non-highlighted */}
                  {!pkg.highlight && (
                    <>
                      <div className="absolute top-0 left-0 w-5 h-5 border-t border-l border-white/15 rounded-tl-2xl" />
                      <div className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-white/15 rounded-br-2xl" />
                    </>
                  )}
                  <div className="mb-5">
                    <div className="text-xs font-bold text-brand-muted mb-1 font-mono tracking-widest uppercase">{pkg.name}</div>
                    <div className="flex items-baseline gap-1">
                      <span
                        className="text-3xl font-black"
                        style={pkg.highlight ? { filter: "drop-shadow(0 0 10px rgba(15,98,254,0.5))" } : {}}
                      >
                        {pkg.price}
                      </span>
                      <span className="text-sm text-brand-muted font-mono">/ {pkg.period}</span>
                    </div>
                    <p className="text-sm text-gray-400 mt-2">{pkg.desc}</p>
                  </div>
                  <ul className="space-y-2.5 mb-6 flex-1">
                    {pkg.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-gray-300">
                        <Check
                          className="w-4 h-4 mt-0.5 flex-shrink-0"
                          style={{ color: pkg.highlight ? "#0F62FE" : "#6929C4" }}
                        />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => scrollTo("diagnosis")}
                    className={`w-full py-2.5 rounded-xl font-semibold text-sm transition-all ${
                      pkg.highlight
                        ? "bg-brand-primary text-white hover:bg-blue-600"
                        : "border border-white/15 text-gray-300 hover:border-white/30 hover:text-white"
                    }`}
                    style={pkg.highlight ? { boxShadow: "0 0 20px rgba(15,98,254,0.4)" } : {}}
                  >
                    {pkg.cta} →
                  </button>
                </div>
              )

              if (pkg.highlight) {
                return (
                  <motion.div key={i} variants={staggerItem} className="sm:-mt-3 sm:-mb-3">
                    <AnimatedBorder>{card}</AnimatedBorder>
                  </motion.div>
                )
              }

              return (
                <motion.div
                  key={i}
                  variants={staggerItem}
                  whileHover={{ y: -4, boxShadow: "0 24px 48px rgba(0,0,0,0.4)" }}
                  transition={{ duration: 0.2 }}
                  className="relative bg-brand-surface border border-white/8 rounded-2xl overflow-hidden"
                >
                  {card}
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* ── TESTIMONIAL ──────────────────────────────────────────────────── */}
      <section id="testimonial" className="px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            className="relative bg-brand-surface border border-white/10 rounded-2xl p-8 overflow-hidden"
            style={{ boxShadow: "0 0 60px rgba(105,41,196,0.1)" }}
          >
            {/* Top line accent */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-brand-primary/60 via-brand-accent/60 to-brand-primary/60" />
            {/* Ambient glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/10 rounded-full blur-3xl pointer-events-none" />
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-brand-accent/40 rounded-tl-2xl" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-brand-primary/40 rounded-br-2xl" />

            <div className="flex gap-0.5 mb-5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>

            <p className="text-gray-300 leading-relaxed text-base mb-6 relative">
              <span className="text-brand-accent text-4xl font-serif leading-none mr-1 opacity-60">"</span>
              {c.testimonial.quote}
            </p>

            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full bg-brand-primary/20 border border-brand-primary/40 flex items-center justify-center text-sm font-bold text-brand-primary flex-shrink-0"
                style={{ boxShadow: "0 0 15px rgba(15,98,254,0.3)" }}
              >
                {c.testimonial.name.charAt(0)}
              </div>
              <div>
                <div className="font-semibold text-white text-sm">{c.testimonial.name}</div>
                <div className="text-xs text-brand-muted">{c.testimonial.role} · {c.testimonial.company}</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CASES ────────────────────────────────────────────────────────── */}
      <section id="cases" className="px-4 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-surface/40 to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto relative">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-10"
          >
            <SectionLabel>{c.cases_label}</SectionLabel>
            <h2 className="text-2xl sm:text-3xl font-bold">{c.cases_title}</h2>
          </motion.div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid sm:grid-cols-3 gap-5"
          >
            {c.cases.map((cs, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                whileHover={{ y: -6, boxShadow: "0 24px 48px rgba(15,98,254,0.12)" }}
                transition={{ duration: 0.2 }}
                className="relative bg-brand-surface border border-white/8 rounded-xl p-5 overflow-hidden group"
              >
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-primary/40 to-transparent" />
                <div className="absolute top-0 left-0 w-5 h-5 border-t border-l border-brand-primary/30 rounded-tl-xl" />
                <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                <div className="text-xs font-bold text-brand-primary mb-3 font-mono tracking-wide">{cs.sector}</div>
                <div className="mb-2.5">
                  <div className="text-[10px] text-brand-muted mb-1 uppercase tracking-widest font-mono">
                    {lang === "ru" ? "Проблема" : "Problem"}
                  </div>
                  <p className="text-sm text-gray-300">{cs.problem}</p>
                </div>
                <div className="mb-3">
                  <div className="text-[10px] text-brand-muted mb-1 uppercase tracking-widest font-mono">
                    {lang === "ru" ? "Решение" : "Solution"}
                  </div>
                  <p className="text-sm text-gray-300">{cs.solution}</p>
                </div>
                <div
                  className="bg-green-500/10 border border-green-500/25 rounded-lg px-3 py-2 text-xs text-green-400 font-medium font-mono"
                  style={{ boxShadow: "inset 0 0 12px rgba(34,197,94,0.05)" }}
                >
                  ↑ {cs.result}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── DIAGNOSTIC BOT ───────────────────────────────────────────────── */}
      <section id="diagnosis" className="px-4 py-16">
        <div className="max-w-lg mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">{c.diag_title}</h2>
            <p className="text-gray-400 text-sm">{c.diag_sub}</p>
          </motion.div>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="relative rounded-2xl overflow-hidden"
            style={{ boxShadow: "0 0 60px rgba(15,98,254,0.1)" }}
          >
            <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08)" }} />
            <div className="bg-brand-surface">
              <DiagnosticBot
                lang={lang}
                apiBase={import.meta.env.VITE_API_BASE || "http://localhost:8000"}
                darkMode={true}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── ABOUT ────────────────────────────────────────────────────────── */}
      <section className="px-4 py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-surface/30 to-transparent pointer-events-none" />
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row gap-8 items-center relative">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="relative flex-shrink-0"
          >
            <div
              className="absolute inset-0 rounded-full bg-brand-primary/30 blur-xl scale-125"
              style={{ animation: "pulse 3s ease-in-out infinite" }}
            />
            <img
              src="/photo.jpg"
              className="relative w-24 h-24 rounded-full object-cover ring-2 ring-brand-primary/50"
              style={{ boxShadow: "0 0 30px rgba(15,98,254,0.3)" }}
              alt="Photo"
            />
          </motion.div>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-2xl font-bold mb-3">{c.about_title}</h2>
            <p className="text-gray-400 leading-relaxed mb-4">{c.about_text}</p>
            <div className="flex flex-wrap gap-2">
              {c.about_items.map((item, i) => (
                <span
                  key={i}
                  className="bg-brand-primary/10 text-brand-primary border border-brand-primary/25 text-xs font-medium px-3 py-1 rounded-full font-mono"
                >
                  ✓ {item}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section id="faq" className="px-4 py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/5 via-transparent to-brand-primary/5 pointer-events-none" />
        <div className="max-w-2xl mx-auto relative">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-10"
          >
            <SectionLabel>{c.faq_label}</SectionLabel>
            <h2 className="text-2xl sm:text-3xl font-bold">{c.faq_title}</h2>
          </motion.div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-2"
          >
            {c.faq.map((faqItem, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                className="relative bg-brand-surface border border-white/8 rounded-xl overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-white/4 transition-colors"
                >
                  <span className="font-medium text-white text-sm pr-4">{faqItem.q}</span>
                  <motion.div
                    animate={{ rotate: openFaq === i ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown
                      className="w-4 h-4"
                      style={{ color: openFaq === i ? "#0F62FE" : "#8B8B9E" }}
                    />
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pt-1 pb-4 text-sm text-gray-400 leading-relaxed border-t border-white/5">
                        {faqItem.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────────────────────── */}
      <section className="px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-2xl font-bold mb-2">{c.contact_title}</h2>
            <p className="text-gray-400 text-sm mb-8">{c.contact_text}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://wa.me/34627345058"
                className="flex items-center justify-center gap-2 bg-green-500/10 border border-green-500/30 text-green-400 px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-green-500/20 hover:border-green-500/60 hover:shadow-[0_0_20px_rgba(34,197,94,0.2)] transition-all"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </a>
              <a
                href="https://t.me/sanya198426"
                className="flex items-center justify-center gap-2 bg-sky-500/10 border border-sky-500/30 text-sky-400 px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-sky-500/20 hover:border-sky-500/60 hover:shadow-[0_0_20px_rgba(14,165,233,0.2)] transition-all"
              >
                <Send className="w-4 h-4" /> Telegram
              </a>
              <a
                href="mailto:aryaboshkapov@gmail.com"
                className="flex items-center justify-center gap-2 border border-white/10 text-gray-300 px-5 py-2.5 rounded-xl text-sm font-semibold hover:border-white/25 hover:text-white transition-all"
              >
                <Mail className="w-4 h-4" /> Email
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer className="px-4 py-6 border-t border-white/8 text-center">
        <p className="text-xs text-brand-muted font-mono">{c.footer_copy}</p>
      </footer>

    </div>
  )
}
