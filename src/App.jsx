import { useState } from "react"
import DiagnosticBot from "./components/DiagnosticBot"

const CONTENT = {
  ru: {
    nav_cta: "Бесплатная диагностика",
    hero_badge: "AI-автоматизация · Аликанте",
    hero_title: "Автоматизирую бизнес в Аликанте с помощью ИИ",
    hero_sub: "WhatsApp-боты, автозапись, автоответы на отзывы. Работаю с бизнесами в Аликанте и провинции.",
    hero_cta: "Пройти диагностику бесплатно →",
    hero_cta2: "Смотреть примеры",
    problems_title: "Узнаёте себя?",
    problems: [
      { icon: "🌙", title: "Теряете лиды ночью", text: "Клиент написал в 23:00 — вы ответили утром. Он уже у конкурента." },
      { icon: "🔁", title: "Часы на одинаковые ответы", text: "«Сколько стоит?», «Есть ли место?», «Когда работаете?» — каждый день одно и то же." },
      { icon: "📅", title: "No-show и пустое расписание", text: "Клиенты не приходят без предупреждения. Время потеряно, деньги потеряны." },
    ],
    how_title: "Как это работает",
    how_steps: [
      { n: "01", title: "Диагностика за 5 минут", text: "Отвечаете на 5 вопросов о бизнесе — получаете персональный отчёт с тремя конкретными автоматизациями." },
      { n: "02", title: "Внедрение за 5 дней", text: "Настраиваю систему под ваш бизнес. Вы получаете готовое решение без технических знаний с вашей стороны." },
      { n: "03", title: "Работает само", text: "Боты отвечают клиентам, напоминания уходят автоматически, отзывы обрабатываются — без вашего участия." },
    ],
    packages_title: "Пакеты услуг",
    packages: [
      {
        name: "Starter",
        price: "€900",
        period: "разово",
        desc: "Одна автоматизация под ключ",
        features: [
          "WhatsApp-бот или автоответы на отзывы",
          "Настройка и запуск за 3 дня",
          "Инструкция по использованию",
          "Поддержка 2 недели",
        ],
        cta: "Начать →",
        highlight: false,
      },
      {
        name: "Business",
        price: "€2 400",
        period: "разово",
        desc: "Полная автоматизация процессов",
        features: [
          "До 3 автоматизаций под ключ",
          "Интеграция с CRM и календарём",
          "Запуск за 5–7 дней",
          "Поддержка 1 месяц включена",
        ],
        cta: "Выбрать →",
        highlight: true,
        badge: "Популярный",
      },
      {
        name: "Retainer",
        price: "€500",
        period: "в месяц",
        desc: "Постоянное обслуживание",
        features: [
          "Мониторинг и обновления",
          "1 новая автоматизация в месяц",
          "Приоритетная поддержка",
          "Ежемесячный отчёт",
        ],
        cta: "Подключить →",
        highlight: false,
      },
    ],
    grants_title: "Автоматизация — это не дорого",
    grants_text: "Большинство решений окупаются за 1–2 месяца за счёт сэкономленного времени и сокращения потерь. Для малого бизнеса в Аликанте — рассчитаем ROI конкретно под вас, бесплатно.",
    grants_cta: "Рассчитать окупаемость →",
    demo_title: "Нажмите — попробуйте прямо сейчас",
    demo_sub: "Живой AI-чат для автосалона Alicante Cars",
    demo_try_tg: "Попробовать Telegram",
    demo_try_wa: "Попробовать WhatsApp",
    demo_bot_msg: "Привет! 👋 Я ассистент Alicante Cars. Чем могу помочь?",
    demo_suggestions: ["Купить авто", "Арендовать", "Трансфер"],
    diag_title: "Узнайте за 5 минут что можно автоматизировать",
    diag_sub: "Бесплатная диагностика — три конкретных решения для вашего бизнеса",
    cases_title: "Примеры результатов",
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
    nav_cta: "Free diagnosis",
    hero_badge: "AI Automation · Alicante",
    hero_title: "AI Automation for Businesses in Alicante",
    hero_sub: "WhatsApp bots, automated booking, review replies. Serving businesses in Alicante and the province.",
    hero_cta: "Get free diagnosis →",
    hero_cta2: "See examples",
    problems_title: "Sound familiar?",
    problems: [
      { icon: "🌙", title: "Losing leads overnight", text: "Client messaged at 11pm — you replied in the morning. They've already gone to a competitor." },
      { icon: "🔁", title: "Hours on the same answers", text: "'How much?', 'Is there availability?', 'What are your hours?' — the same questions every single day." },
      { icon: "📅", title: "No-shows and empty slots", text: "Clients don't show up without warning. Your time is wasted, revenue is lost." },
    ],
    how_title: "How it works",
    how_steps: [
      { n: "01", title: "5-minute diagnosis", text: "Answer 5 questions about your business — get a personalised report with three concrete automations." },
      { n: "02", title: "Live in 5 days", text: "I set everything up for your business. You get a working solution with no technical knowledge required." },
      { n: "03", title: "Runs on autopilot", text: "Bots reply to clients, reminders go out automatically, reviews are handled — without your involvement." },
    ],
    packages_title: "Packages",
    packages: [
      {
        name: "Starter",
        price: "€900",
        period: "one-off",
        desc: "One automation, fully set up",
        features: [
          "WhatsApp bot or review auto-replies",
          "Set up and live in 3 days",
          "Usage guide included",
          "2 weeks support",
        ],
        cta: "Get started →",
        highlight: false,
      },
      {
        name: "Business",
        price: "€2,400",
        period: "one-off",
        desc: "Full process automation",
        features: [
          "Up to 3 automations, fully set up",
          "CRM and calendar integration",
          "Live in 5–7 days",
          "1 month support included",
        ],
        cta: "Choose this →",
        highlight: true,
        badge: "Most popular",
      },
      {
        name: "Retainer",
        price: "€500",
        period: "per month",
        desc: "Ongoing maintenance",
        features: [
          "Monitoring and updates",
          "1 new automation per month",
          "Priority support",
          "Monthly report",
        ],
        cta: "Get started →",
        highlight: false,
      },
    ],
    grants_title: "Automation pays for itself",
    grants_text: "Most solutions pay back in 1–2 months through saved time and reduced losses. For small businesses in Alicante — we calculate the ROI specifically for you, free of charge.",
    grants_cta: "Calculate your ROI →",
    demo_title: "Click — try it right now",
    demo_sub: "Live AI chat for Alicante Cars dealership",
    demo_try_tg: "Try Telegram demo",
    demo_try_wa: "Try WhatsApp demo",
    demo_bot_msg: "Hi! 👋 I'm the Alicante Cars assistant. How can I help?",
    demo_suggestions: ["Buy a car", "Rent a car", "Transfer"],
    diag_title: "Find out in 5 minutes what you can automate",
    diag_sub: "Free diagnosis — three concrete solutions for your business",
    cases_title: "Results",
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

export default function App() {
  const [lang, setLang] = useState("ru")
  const c = CONTENT[lang]
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })

  return (
    <div className="min-h-screen bg-[#1a1f3a] text-white font-sans">

      {/* ── НАВИГАЦИЯ ── */}
      <nav className="sticky top-0 z-50 bg-[#1a1f3a]/90 backdrop-blur-md border-b border-white/10 px-4 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="font-bold text-lg">
            <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
              AutomatIQ
            </span>
          </div>
          <div className="flex items-center gap-3">
            {["ru", "en"].map(l => (
              <button key={l} onClick={() => setLang(l)}
                className={`text-xs px-2.5 py-1 rounded-full border transition-colors
                  ${lang === l
                    ? "bg-cyan-500/20 text-cyan-400 border-cyan-500/40"
                    : "text-gray-500 border-white/10 hover:border-white/20 hover:text-gray-300"}`}>
                {l === "ru" ? "🇷🇺 RU" : "🇬🇧 EN"}
              </button>
            ))}
            <button onClick={() => scrollTo("diagnosis")}
              className="hidden sm:block bg-cyan-500 text-black text-sm px-4 py-1.5 rounded-lg font-bold hover:bg-cyan-400 transition-colors">
              {c.nav_cta}
            </button>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative px-4 py-20 sm:py-32 overflow-hidden bg-grid">
        {/* Декоративные орбы */}
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-3xl mx-auto text-center">
          {/* Бейдж */}
          <div className="inline-flex items-center gap-2 border border-cyan-500/30 rounded-full px-4 py-1.5 text-xs text-cyan-400 mb-6 bg-cyan-500/5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            {c.hero_badge}
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold leading-tight mb-6">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-500 bg-clip-text text-transparent">
              {c.hero_title}
            </span>
          </h1>

          <p className="text-lg text-gray-400 mb-10 max-w-xl mx-auto leading-relaxed">
            {c.hero_sub}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={() => scrollTo("diagnosis")}
              className="bg-cyan-500 text-black px-7 py-3 rounded-xl font-bold hover:bg-cyan-400 transition-colors text-sm shadow-lg shadow-cyan-500/25">
              {c.hero_cta}
            </button>
            <button onClick={() => scrollTo("cases")}
              className="border border-white/15 text-gray-300 px-7 py-3 rounded-xl font-semibold hover:border-white/30 hover:text-white transition-colors text-sm">
              {c.hero_cta2}
            </button>
          </div>
        </div>
      </section>

      {/* ── ДЕМО ── */}
      <section className="px-4 py-16 bg-[#1a1f3a]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">Live demo</p>
          <h2 className="text-2xl font-bold mb-2 text-white">{c.demo_title}</h2>
          <p className="text-gray-500 text-sm mb-12">{c.demo_sub}</p>
          <div className="grid sm:grid-cols-2 gap-12 max-w-sm mx-auto sm:max-w-none">

            {/* Telegram */}
            <a href="/demo-telegram" className="group flex flex-col items-center gap-5">
              <div className="w-52 rounded-[2.4rem] border-[5px] border-gray-700 bg-gray-900 overflow-hidden shadow-2xl shadow-sky-500/10 group-hover:shadow-sky-500/30 group-hover:scale-105 transition-all duration-300">
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
                <div className="bg-[#1c2b3a] px-2.5 pt-3 pb-2 space-y-2" style={{minHeight: 170}}>
                  <div className="bg-[#182533] rounded-xl rounded-tl-sm px-2.5 py-2 text-[10px] text-gray-300 leading-relaxed max-w-[88%]">
                    {c.demo_bot_msg}
                  </div>
                  <div className="flex gap-1 flex-wrap">
                    {c.demo_suggestions.map(s => (
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
              <div className="inline-flex items-center gap-2 bg-sky-500/15 border border-sky-500/30 text-sky-400 px-5 py-2.5 rounded-xl text-sm font-semibold group-hover:bg-sky-500/25 transition-colors">
                🤖 {c.demo_try_tg}
              </div>
            </a>

            {/* WhatsApp */}
            <a href="/demo-whatsapp" className="group flex flex-col items-center gap-5">
              <div className="w-52 rounded-[2.4rem] border-[5px] border-gray-700 bg-gray-900 overflow-hidden shadow-2xl shadow-green-500/10 group-hover:shadow-green-500/30 group-hover:scale-105 transition-all duration-300">
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
                <div className="bg-[#efeae2] px-2.5 pt-3 pb-2 space-y-2" style={{minHeight: 170}}>
                  <div className="bg-white rounded-xl rounded-tl-sm px-2.5 py-2 text-[10px] text-gray-700 leading-relaxed max-w-[88%] shadow-sm">
                    {c.demo_bot_msg}
                  </div>
                  <div className="flex gap-1 flex-wrap">
                    {c.demo_suggestions.map(s => (
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
              <div className="inline-flex items-center gap-2 bg-green-500/15 border border-green-500/30 text-green-400 px-5 py-2.5 rounded-xl text-sm font-semibold group-hover:bg-green-500/25 transition-colors">
                💬 {c.demo_try_wa}
              </div>
            </a>

          </div>
        </div>
      </section>

      {/* ── ПРОБЛЕМЫ ── */}
      <section className="px-4 py-16 bg-[#222748]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">{c.problems_title}</h2>
          <div className="grid sm:grid-cols-3 gap-5">
            {c.problems.map((p, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-white/20 transition-colors">
                <div className="text-3xl mb-3">{p.icon}</div>
                <h3 className="font-semibold mb-2 text-white">{p.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── КАК РАБОТАЕТ ── */}
      <section className="px-4 py-16 bg-[#1a1f3a]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-12">{c.how_title}</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {c.how_steps.map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-5xl font-bold text-cyan-400/20 mb-3">{s.n}</div>
                <h3 className="font-semibold mb-2 text-white">{s.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ПАКЕТЫ ── */}
      <section className="px-4 py-16 bg-[#222748]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">{c.packages_title}</h2>
          <div className="grid sm:grid-cols-3 gap-5">
            {c.packages.map((pkg, i) => (
              <div key={i} className={`relative border rounded-2xl p-6 flex flex-col transition-colors ${
                pkg.highlight
                  ? "bg-cyan-500/10 border-cyan-500/40 shadow-lg shadow-cyan-500/10"
                  : "bg-white/5 border-white/10 hover:border-white/20"
              }`}>
                {pkg.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cyan-500 text-black text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                    {pkg.badge}
                  </div>
                )}
                <div className="mb-4">
                  <div className="text-sm font-semibold text-gray-400 mb-1">{pkg.name}</div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-white">{pkg.price}</span>
                    <span className="text-sm text-gray-500">/ {pkg.period}</span>
                  </div>
                  <p className="text-sm text-gray-400 mt-2">{pkg.desc}</p>
                </div>
                <ul className="space-y-2 mb-6 flex-1">
                  {pkg.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-gray-300">
                      <span className="text-cyan-400 mt-0.5 flex-shrink-0">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <button onClick={() => scrollTo("diagnosis")}
                  className={`w-full py-2.5 rounded-xl font-semibold text-sm transition-colors ${
                    pkg.highlight
                      ? "bg-cyan-500 text-black hover:bg-cyan-400"
                      : "border border-white/15 text-gray-300 hover:border-white/30 hover:text-white"
                  }`}>
                  {pkg.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ГРАНТЫ ЕС ── */}
      <section className="px-4 py-14 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-900/50 to-cyan-900/40" />
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="relative max-w-3xl mx-auto text-center">
          <div className="text-3xl mb-3">🇪🇺</div>
          <h2 className="text-2xl font-bold mb-3">{c.grants_title}</h2>
          <p className="text-gray-300 mb-6 leading-relaxed max-w-xl mx-auto">{c.grants_text}</p>
          <button onClick={() => scrollTo("diagnosis")}
            className="bg-white text-gray-900 px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-gray-100 transition-colors">
            {c.grants_cta}
          </button>
        </div>
      </section>

      {/* ── ДИАГНОСТИКА ── */}
      <section id="diagnosis" className="px-4 py-16 bg-[#222748]">
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">{c.diag_title}</h2>
            <p className="text-gray-400 text-sm">{c.diag_sub}</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            <DiagnosticBot
              lang={lang}
              apiBase={import.meta.env.VITE_API_BASE || "http://localhost:8000"}
              darkMode={true}
            />
          </div>
        </div>
      </section>

      {/* ── КЕЙСЫ ── */}
      <section id="cases" className="px-4 py-16 bg-[#1a1f3a]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">{c.cases_title}</h2>
          <div className="grid sm:grid-cols-3 gap-5">
            {c.cases.map((cs, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-white/20 transition-colors">
                <div className="text-xs font-semibold text-cyan-400 mb-3">{cs.sector}</div>
                <div className="mb-3">
                  <div className="text-xs text-gray-600 mb-1">
                    {lang === "ru" ? "Проблема" : "Problem"}
                  </div>
                  <p className="text-sm text-gray-300">{cs.problem}</p>
                </div>
                <div className="mb-3">
                  <div className="text-xs text-gray-600 mb-1">
                    {lang === "ru" ? "Решение" : "Solution"}
                  </div>
                  <p className="text-sm text-gray-300">{cs.solution}</p>
                </div>
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg px-3 py-2 text-xs text-green-400 font-medium">
                  📈 {cs.result}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ОБО МНЕ ── */}
      <section className="px-4 py-16 bg-[#222748]">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row gap-8 items-center">
          <img src="/photo.jpg"
            className="w-24 h-24 rounded-full object-cover flex-shrink-0 ring-2 ring-cyan-500/30"
            alt="Photo" />
          <div>
            <h2 className="text-2xl font-bold mb-3">{c.about_title}</h2>
            <p className="text-gray-400 leading-relaxed mb-4">{c.about_text}</p>
            <div className="flex flex-wrap gap-2">
              {c.about_items.map((item, i) => (
                <span key={i} className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-medium px-3 py-1 rounded-full">
                  ✓ {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── КОНТАКТЫ ── */}
      <section className="px-4 py-16 bg-[#1a1f3a]">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-2xl font-bold mb-2">{c.contact_title}</h2>
          <p className="text-gray-400 text-sm mb-6">{c.contact_text}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="https://wa.me/34627345058"
              className="flex items-center justify-center gap-2 bg-green-500/15 border border-green-500/30 text-green-400 px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-green-500/25 transition-colors">
              💬 WhatsApp
            </a>
            <a href="https://t.me/sanya198426"
              className="flex items-center justify-center gap-2 bg-sky-500/15 border border-sky-500/30 text-sky-400 px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-sky-500/25 transition-colors">
              ✈️ Telegram
            </a>
            <a href="mailto:aryaboshkapov@gmail.com"
              className="flex items-center justify-center gap-2 border border-white/10 text-gray-300 px-5 py-2.5 rounded-xl text-sm font-semibold hover:border-white/25 hover:text-white transition-colors">
              📧 Email
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="px-4 py-6 border-t border-white/5 text-center">
        <p className="text-xs text-gray-700">{c.footer_copy}</p>
      </footer>

    </div>
  )
}
