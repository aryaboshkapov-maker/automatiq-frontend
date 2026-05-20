import { useState } from "react"
import DiagnosticBot from "./components/DiagnosticBot"

const CONTENT = {
  ru: {
    nav_cta: "Бесплатная диагностика",
    hero_title: "Автоматизирую ваш бизнес в Испании с помощью ИИ",
    hero_sub: "WhatsApp-боты, автозапись, автоответы на отзывы. Экономия 10+ часов в неделю. Работает без вашего участия.",
    hero_cta: "Пройти диагностику бесплатно →",
    hero_cta2: "Смотреть примеры",
    problems_title: "Узнаёте себя?",
    problems: [
      { icon: "😴", title: "Теряете лиды ночью", text: "Клиент написал в 23:00 — вы ответили утром. Он уже у конкурента." },
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
    kit_title: "Субсидия до €12 000",
    kit_text: "В Испании действует программа Kit Digital — государство компенсирует расходы на цифровизацию малого бизнеса. Ваш бизнес может получить автоматизацию за €0 из собственного кармана.",
    kit_cta: "Узнать подходит ли мой бизнес →",
    diag_title: "Узнайте за 5 минут что можно автоматизировать",
    diag_sub: "Бесплатная диагностика — три конкретных решения для вашего бизнеса",
    cases_title: "Примеры результатов",
    cases: [
      { sector: "Ресторан, Аликанте", problem: "Терял брони ночью, тратил 2 часа на WhatsApp", solution: "WhatsApp-бот + автоподтверждения", result: "−20% потерянных броней, экономия 2 ч/день" },
      { sector: "Стоматология, Торревьеха", problem: "20% no-show, администратор тонул в звонках", solution: "Автозапись + напоминания за 24ч и 2ч", result: "No-show с 20% до 6%, −2 ч/день" },
      { sector: "Агентство недвижимости, Бенидорм", problem: "Иностранные клиенты не получали ответы ночью", solution: "Мультиязычный бот-квалификатор", result: "+35% конверсия, 4 языка без переводчика" },
    ],
    about_title: "Привет, я живу в Аликанте",
    about_text: "Помогаю местным бизнесам — русскоязычным и международным — освободить время от рутины с помощью ИИ. Работаю на русском, английском и испанском. Знаю местную специфику изнутри.",
    about_items: ["Живу в Аликанте", "Работаю на 3 языках", "Результат за 5 дней"],
    contact_title: "Остались вопросы?",
    contact_text: "Напишите напрямую — отвечу в течение нескольких часов",
    footer_copy: "© 2025 AutomatIQ · Alicante, España",
  },
  en: {
    nav_cta: "Free diagnosis",
    hero_title: "AI Automation for Local Businesses in Alicante",
    hero_sub: "WhatsApp bots, automated booking, review replies. Save 10+ hours per week. Runs without you.",
    hero_cta: "Get free diagnosis →",
    hero_cta2: "See examples",
    problems_title: "Sound familiar?",
    problems: [
      { icon: "😴", title: "Losing leads overnight", text: "Client messaged at 11pm — you replied in the morning. They've already gone to a competitor." },
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
    kit_title: "Subsidy up to €12,000",
    kit_text: "Spain's Kit Digital programme reimburses small businesses for digitalisation costs. Your business could receive automation at €0 out of pocket.",
    kit_cta: "Check if my business qualifies →",
    diag_title: "Find out in 5 minutes what you can automate",
    diag_sub: "Free diagnosis — three concrete solutions for your business",
    cases_title: "Results",
    cases: [
      { sector: "Restaurant, Alicante", problem: "Losing bookings overnight, 2 hours daily on WhatsApp", solution: "WhatsApp bot + auto-confirmations", result: "−20% lost bookings, saves 2h/day" },
      { sector: "Dental clinic, Torrevieja", problem: "20% no-show rate, receptionist overwhelmed", solution: "Automated booking + 24h and 2h reminders", result: "No-show 20% → 6%, saves 2h/day" },
      { sector: "Real estate agency, Benidorm", problem: "Foreign clients got no reply overnight", solution: "Multilingual lead-qualifier bot", result: "+35% conversion, 4 languages without a translator" },
    ],
    about_title: "Hi — I'm based in Alicante",
    about_text: "I help local businesses — Russian-speaking and international — reclaim time from routine tasks using AI. I work in Russian, English and Spanish, and I know the local market from the inside.",
    about_items: ["Based in Alicante", "Works in 3 languages", "Results in 5 days"],
    contact_title: "Any questions?",
    contact_text: "Message me directly — I reply within a few hours",
    footer_copy: "© 2025 AutomatIQ · Alicante, España",
  },
}

export default function App() {
  const [lang, setLang] = useState("ru")
  const c = CONTENT[lang]

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">

      {/* ── НАВИГАЦИЯ ── */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 px-4 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="font-bold text-lg text-blue-600">AutomatIQ</div>
          <div className="flex items-center gap-3">
            {["ru", "en"].map(l => (
              <button key={l} onClick={() => setLang(l)}
                className={`text-xs px-2.5 py-1 rounded-full border transition-colors
                  ${lang === l
                    ? "bg-blue-600 text-white border-blue-600"
                    : "text-gray-500 border-gray-300 hover:border-gray-400"}`}>
                {l === "ru" ? "🇷🇺 RU" : "🇬🇧 EN"}
              </button>
            ))}
            <button onClick={() => scrollTo("diagnosis")}
              className="hidden sm:block bg-blue-600 text-white text-sm px-4 py-1.5 rounded-lg hover:bg-blue-700 transition-colors">
              {c.nav_cta}
            </button>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="px-4 py-16 sm:py-24 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
            {c.hero_title}
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto leading-relaxed">
            {c.hero_sub}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={() => scrollTo("diagnosis")}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors text-sm">
              {c.hero_cta}
            </button>
            <button onClick={() => scrollTo("cases")}
              className="border border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:border-gray-400 transition-colors text-sm">
              {c.hero_cta2}
            </button>
          </div>
        </div>
      </section>

      {/* ── ПРОБЛЕМЫ ── */}
      <section className="px-4 py-16 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">{c.problems_title}</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {c.problems.map((p, i) => (
              <div key={i} className="border border-gray-200 rounded-xl p-5">
                <div className="text-3xl mb-3">{p.icon}</div>
                <h3 className="font-semibold mb-2">{p.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── КАК РАБОТАЕТ ── */}
      <section className="px-4 py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">{c.how_title}</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {c.how_steps.map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl font-bold text-blue-100 mb-2">{s.n}</div>
                <h3 className="font-semibold mb-2">{s.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ПАКЕТЫ ── */}
      <section className="px-4 py-16 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">{c.packages_title}</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {c.packages.map((pkg, i) => (
              <div key={i} className={`border rounded-xl p-5 relative flex flex-col
                ${pkg.highlight ? "border-blue-400 shadow-md" : "border-gray-200"}`}>
                {pkg.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {pkg.badge}
                  </div>
                )}
                <div className="mb-4">
                  <div className="font-bold text-lg mb-1">{pkg.name}</div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-blue-600">{pkg.price}</span>
                    <span className="text-sm text-gray-500">{pkg.period}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{pkg.desc}</p>
                </div>
                <ul className="space-y-2 mb-5 flex-1">
                  {pkg.features.map((f, j) => (
                    <li key={j} className="flex gap-2 text-sm text-gray-700">
                      <span className="text-green-500 flex-shrink-0">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <button onClick={() => scrollTo("diagnosis")}
                  className={`w-full py-2 rounded-lg text-sm font-semibold transition-colors
                    ${pkg.highlight
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "border border-gray-300 text-gray-700 hover:border-gray-400"}`}>
                  {pkg.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── KIT DIGITAL ── */}
      <section className="px-4 py-12 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-3xl mx-auto text-center text-white">
          <div className="text-3xl mb-3">💶</div>
          <h2 className="text-2xl font-bold mb-3">{c.kit_title}</h2>
          <p className="text-blue-100 mb-6 leading-relaxed">{c.kit_text}</p>
          <button onClick={() => scrollTo("diagnosis")}
            className="bg-white text-blue-600 px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-blue-50 transition-colors">
            {c.kit_cta}
          </button>
        </div>
      </section>

      {/* ── ДИАГНОСТИКА ── */}
      <section id="diagnosis" className="px-4 py-16 bg-white">
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">{c.diag_title}</h2>
            <p className="text-gray-600 text-sm">{c.diag_sub}</p>
          </div>
          <DiagnosticBot
            lang={lang}
            apiBase={import.meta.env.VITE_API_BASE || "http://localhost:8000"}
          />
        </div>
      </section>

      {/* ── КЕЙСЫ ── */}
      <section id="cases" className="px-4 py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">{c.cases_title}</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {c.cases.map((cs, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-xl p-5">
                <div className="text-xs font-semibold text-blue-600 mb-3">{cs.sector}</div>
                <div className="mb-3">
                  <div className="text-xs text-gray-500 mb-1">
                    {lang === "ru" ? "Проблема" : "Problem"}
                  </div>
                  <p className="text-sm text-gray-700">{cs.problem}</p>
                </div>
                <div className="mb-3">
                  <div className="text-xs text-gray-500 mb-1">
                    {lang === "ru" ? "Решение" : "Solution"}
                  </div>
                  <p className="text-sm text-gray-700">{cs.solution}</p>
                </div>
                <div className="bg-green-50 rounded-lg px-3 py-2 text-xs text-green-700 font-medium">
                  📈 {cs.result}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ОБО МНЕ ── */}
      <section className="px-4 py-16 bg-white">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row gap-8 items-center">
          <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center text-4xl flex-shrink-0">
            👋
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-3">{c.about_title}</h2>
            <p className="text-gray-600 leading-relaxed mb-4">{c.about_text}</p>
            <div className="flex flex-wrap gap-2">
              {c.about_items.map((item, i) => (
                <span key={i} className="bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1 rounded-full">
                  ✓ {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── КОНТАКТЫ ── */}
      <section className="px-4 py-16 bg-gray-50">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-2xl font-bold mb-2">{c.contact_title}</h2>
          <p className="text-gray-600 text-sm mb-6">{c.contact_text}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="https://wa.me/34627345058"
              className="flex items-center justify-center gap-2 bg-green-500 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-green-600 transition-colors">
              💬 WhatsApp
            </a>
            <a href="https://t.me/sanya198426"
              className="flex items-center justify-center gap-2 bg-blue-500 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-600 transition-colors">
              ✈️ Telegram
            </a>
            <a href="mailto:aryaboshkapov@gmail.com"
              className="flex items-center justify-center gap-2 border border-gray-300 text-gray-700 px-5 py-2.5 rounded-xl text-sm font-semibold hover:border-gray-400 transition-colors">
              📧 Email
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="px-4 py-6 border-t border-gray-100 text-center">
        <p className="text-xs text-gray-400">{c.footer_copy}</p>
      </footer>

    </div>
  )
}
