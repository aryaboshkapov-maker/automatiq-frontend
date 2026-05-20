import { useState, useRef } from "react"

const i18n = {
  ru: {
    step_label: (n) => `Вопрос ${n} из 5`,
    analyzing: [
      "Анализирую ваш бизнес...",
      "Подбираю решения...",
      "Считаю экономию...",
      "Формирую предложение...",
    ],
    result_ready: "Ваши рекомендации готовы",
    diagnosis_label: "Диагноз",
    solution_label: "Решение",
    summary_label: "Итоговая оценка",
    hours_label: "экономии в неделю",
    money_label: "доп. выручки в месяц",
    lead_title: "Хотите готовое решение под ваш бизнес?",
    lead_sub: "Подготовим детальный план и смету за 24 часа — бесплатно",
    field_name: "Имя *",
    field_contact: "WhatsApp или Telegram *",
    field_business: "Название бизнеса (необязательно)",
    field_idea_label: "💡 Есть своя идея по автоматизации?",
    field_idea_placeholder:
      "Например: хочу чтобы клиенты сами записывались через Instagram, или автоматически получали счёт после визита...",
    field_idea_hint:
      "Необязательно — но если есть конкретная задача, опишите здесь. Учтём при подготовке плана.",
    submit_btn: "Получить план бесплатно ↗",
    submitting: "Отправляем...",
    thanks_title: "Заявка принята!",
    thanks_sub: "Свяжемся с вами в течение 24 часов.",
    error_required: "Пожалуйста, заполните имя и контакт",
    error_submit: "Ошибка отправки. Попробуйте ещё раз.",
    restart: "← Пройти заново",
    fallback_note: "* Рекомендации сформированы на основе отраслевых данных",
    kit_label: "💡",
  },
  en: {
    step_label: (n) => `Question ${n} of 5`,
    analyzing: [
      "Analysing your business...",
      "Finding solutions...",
      "Calculating savings...",
      "Preparing your report...",
    ],
    result_ready: "Your recommendations are ready",
    diagnosis_label: "Diagnosis",
    solution_label: "Solution",
    summary_label: "Summary",
    hours_label: "saved per week",
    money_label: "additional revenue/month",
    lead_title: "Want a detailed plan for your business?",
    lead_sub: "We'll prepare a full plan and estimate within 24 hours — free",
    field_name: "Name *",
    field_contact: "WhatsApp or Telegram *",
    field_business: "Business name (optional)",
    field_idea_label: "💡 Have your own automation idea?",
    field_idea_placeholder:
      "E.g. I want clients to book via Instagram, or automatically receive invoices after their visit...",
    field_idea_hint:
      "Optional — but if you have a specific task in mind, describe it here.",
    submit_btn: "Get free plan ↗",
    submitting: "Sending...",
    thanks_title: "Request received!",
    thanks_sub: "We'll contact you within 24 hours.",
    error_required: "Please fill in your name and contact",
    error_submit: "Submission error. Please try again.",
    restart: "← Start over",
    fallback_note: "* Recommendations based on industry data",
    kit_label: "💡",
  },
}

const QUESTIONS = [
  {
    id: "q1",
    ru: "Какой у вас бизнес?",
    en: "What type of business do you have?",
    options: [
      { v: "ресторан",      ru: "Ресторан / кафе",       en: "Restaurant / café" },
      { v: "недвижимость",  ru: "Недвижимость",           en: "Real estate" },
      { v: "клиника",       ru: "Клиника / стоматология", en: "Clinic / dentistry" },
      { v: "туризм",        ru: "Туризм / отель",         en: "Tourism / hotel" },
      { v: "строительство", ru: "Строительство",          en: "Construction" },
      { v: "школа",         ru: "Школа / курсы",          en: "School / courses" },
      { v: "магазин",       ru: "Магазин / торговля",     en: "Retail / shop" },
      { v: "другое",        ru: "Другой бизнес",          en: "Other business" },
    ],
  },
  {
    id: "q2",
    ru: "Сколько человек в команде?",
    en: "How many people in your team?",
    options: [
      { v: "1-2",   ru: "Только я / 1–2 чел.", en: "Just me / 1–2 people" },
      { v: "3-10",  ru: "3–10 сотрудников",    en: "3–10 employees" },
      { v: "11-30", ru: "11–30 сотрудников",   en: "11–30 employees" },
      { v: "30+",   ru: "30+ сотрудников",     en: "30+ employees" },
    ],
  },
  {
    id: "q3",
    ru: "Что отнимает больше всего времени?",
    en: "What takes up most of your time?",
    hint_ru: "Выберите одно — самое главное",
    hint_en: "Choose one — the most important",
    options: [
      { v: "сообщения",   ru: "Сообщения / звонки",    en: "Messages / calls" },
      { v: "запись",      ru: "Запись / бронирования", en: "Bookings / scheduling" },
      { v: "документы",   ru: "Счета / документы",     en: "Invoices / documents" },
      { v: "отзывы",      ru: "Отзывы в Google",       en: "Google reviews" },
      { v: "соцсети",     ru: "Соцсети / маркетинг",   en: "Social media" },
      { v: "координация", ru: "Координация команды",   en: "Team coordination" },
    ],
  },
  {
    id: "q4",
    ru: "Как общаетесь с клиентами сейчас?",
    en: "How do you communicate with clients now?",
    options: [
      { v: "wa-manual",   ru: "WhatsApp вручную",  en: "WhatsApp manually" },
      { v: "wa-business", ru: "WhatsApp Business", en: "WhatsApp Business" },
      { v: "email",       ru: "Email / сайт",      en: "Email / website" },
      { v: "multi",       ru: "Несколько каналов", en: "Multiple channels" },
    ],
  },
  {
    id: "q5",
    ru: "Сколько входящих запросов в день?",
    en: "How many incoming requests per day?",
    options: [
      { v: "<5",   ru: "До 5 в день",  en: "Up to 5/day" },
      { v: "5-20", ru: "5–20 в день",  en: "5–20/day" },
      { v: "20-50",ru: "20–50 в день", en: "20–50/day" },
      { v: "50+",  ru: "50+ в день",   en: "50+/day" },
    ],
  },
]

const SOL_ICONS = ["💬", "📅", "📊"]

export default function DiagnosticBot({
  lang = "ru",
  apiBase = import.meta.env.VITE_API_BASE || "",
}) {
  const [step, setStep] = useState(1)
  const [answers, setAnswers] = useState({})
  const [phase, setPhase] = useState("questions")
  const [thinkingText, setThinkingText] = useState("")
  const [result, setResult] = useState(null)
  const [isFallback, setIsFallback] = useState(false)
  const [name, setName] = useState("")
  const [contact, setContact] = useState("")
  const [business, setBusiness] = useState("")
  const [customIdea, setCustomIdea] = useState("")
  const [leadSent, setLeadSent] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")

  const intervalRef = useRef(null)
  const t = i18n[lang] || i18n.ru

  const progress = phase === "result" ? 100 : ((step - 1) / 5) * 100

  async function fetchDiagnosis(finalAnswers) {
    setPhase("thinking")
    let idx = 0
    setThinkingText(t.analyzing[0])
    intervalRef.current = setInterval(() => {
      idx = (idx + 1) % t.analyzing.length
      setThinkingText(t.analyzing[idx])
    }, 900)

    try {
      const res = await fetch(`${apiBase}/api/diagnose`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: finalAnswers, lang }),
      })
      const json = await res.json()
      setResult(json.data)
      setIsFallback(json.fallback)
    } catch {
      setResult(null)
    } finally {
      clearInterval(intervalRef.current)
      setPhase("result")
    }
  }

  function handleSelect(questionId, value) {
    const updated = { ...answers, [questionId]: value }
    setAnswers(updated)
    if (step < 5) {
      setStep(step + 1)
    } else {
      fetchDiagnosis(updated)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim() || !contact.trim()) {
      setSubmitError(t.error_required)
      return
    }
    setIsSubmitting(true)
    setSubmitError("")
    try {
      await fetch(`${apiBase}/api/lead`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          contact,
          business,
          custom_idea: customIdea,
          answers,
          lang,
          source: "web",
          diagnosis: result ? { ...result, fallback: isFallback } : null,
        }),
      })
      setLeadSent(true)
    } catch {
      setSubmitError(t.error_submit)
    } finally {
      setIsSubmitting(false)
    }
  }

  function restart() {
    setStep(1)
    setAnswers({})
    setPhase("questions")
    setThinkingText("")
    setResult(null)
    setIsFallback(false)
    setName("")
    setContact("")
    setBusiness("")
    setCustomIdea("")
    setLeadSent(false)
    setIsSubmitting(false)
    setSubmitError("")
  }

  return (
    <div className="max-w-lg mx-auto p-4">

      {/* Прогресс-бар */}
      <div className="h-1 bg-gray-200 rounded mb-2">
        <div
          className="h-1 bg-blue-500 rounded transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Лейбл шага */}
      <div className="text-xs text-gray-500 mb-4">
        {phase === "thinking"
          ? thinkingText
          : phase === "result"
          ? t.result_ready
          : t.step_label(step)}
      </div>

      {/* ФАЗА: ВОПРОСЫ */}
      {phase === "questions" && (
        <div>
          <h2 className="text-base font-semibold text-gray-900 mb-2">
            {QUESTIONS[step - 1][lang]}
          </h2>
          {QUESTIONS[step - 1][`hint_${lang}`] && (
            <p className="text-xs text-gray-500 mb-3">
              {QUESTIONS[step - 1][`hint_${lang}`]}
            </p>
          )}
          <div className="flex flex-wrap gap-2">
            {QUESTIONS[step - 1].options.map((opt) => (
              <button
                key={opt.v}
                onClick={() => handleSelect(QUESTIONS[step - 1].id, opt.v)}
                className={`px-3 py-2 text-sm border rounded-lg text-left
                  transition-all cursor-pointer
                  ${answers[QUESTIONS[step - 1].id] === opt.v
                    ? "bg-blue-50 border-blue-400 text-blue-700 font-medium"
                    : "border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                  }`}
              >
                {opt[lang]}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ФАЗА: THINKING */}
      {phase === "thinking" && (
        <div className="flex items-center gap-3 py-8 text-gray-500 text-sm">
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
          <span>{thinkingText}</span>
        </div>
      )}

      {/* ФАЗА: РЕЗУЛЬТАТ */}
      {phase === "result" && (
        <div>

          {/* Карточка диагноза */}
          {result?.problem && (
            <div className="border border-gray-200 rounded-xl p-4 mb-3">
              <span className="inline-block text-xs font-semibold px-2 py-1 rounded bg-amber-100 text-amber-800 mb-2">
                {t.diagnosis_label}
              </span>
              <p className="text-sm text-gray-600 leading-relaxed">
                {result.problem}
              </p>
            </div>
          )}

          {/* Три карточки решений */}
          {(result?.solutions || []).map((sol, i) => (
            <div
              key={i}
              className={`border rounded-xl p-4 mb-3
                ${i === 0 ? "border-blue-300 bg-blue-50/30" : "border-gray-200"}`}
            >
              <span className="inline-block text-xs font-semibold px-2 py-1 rounded bg-blue-100 text-blue-800 mb-2">
                {t.solution_label} {i + 1} {SOL_ICONS[i]}
              </span>
              <h3 className="text-sm font-semibold text-gray-900 mb-2">
                {sol.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                {sol.description}
              </p>
              {sol.steps?.length > 0 && (
                <ol className="space-y-1.5 mb-3">
                  {sol.steps.map((s, j) => (
                    <li key={j} className="flex gap-2 text-sm text-gray-600">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center mt-0.5">
                        {j + 1}
                      </span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ol>
              )}
              {sol.benefit && (
                <div className="bg-green-50 rounded-lg px-3 py-2 text-xs text-green-700 leading-relaxed">
                  📈 {sol.benefit}
                </div>
              )}
            </div>
          ))}

          {/* Карточка итога */}
          {result && (
            <div className="border border-gray-200 rounded-xl p-4 mb-3">
              <span className="inline-block text-xs font-semibold px-2 py-1 rounded bg-green-100 text-green-800 mb-3">
                {t.summary_label}
              </span>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-gray-900">
                    {result.total_hours}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {t.hours_label}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-gray-900">
                    {result.total_money}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {t.money_label}
                  </div>
                </div>
              </div>
              {result.kit_digital && (
                <div className="bg-gray-100 rounded-lg px-3 py-2 text-xs text-gray-600 leading-relaxed">
                  {t.kit_label} {result.kit_digital}
                </div>
              )}
              {isFallback && (
                <p className="text-xs text-gray-400 mt-2">{t.fallback_note}</p>
              )}
            </div>
          )}

          {/* ФОРМА ЛИДА */}
          {!leadSent ? (
            <div className="bg-gray-50 rounded-xl p-4 mt-2 border border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900 mb-1">
                {t.lead_title}
              </h3>
              <p className="text-xs text-gray-500 mb-4">{t.lead_sub}</p>
              <form onSubmit={handleSubmit} className="space-y-3">

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    {t.field_name}
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    {t.field_contact}
                  </label>
                  <input
                    type="text"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="+34 ..."
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    {t.field_business}
                  </label>
                  <input
                    type="text"
                    value={business}
                    onChange={(e) => setBusiness(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100"
                  />
                </div>

                {/* Поле своей идеи */}
                <div className="border-2 border-dashed border-blue-200 rounded-xl p-3 bg-blue-50/40">
                  <label className="block text-xs font-medium text-blue-700 mb-1">
                    {t.field_idea_label}
                  </label>
                  <textarea
                    value={customIdea}
                    onChange={(e) => setCustomIdea(e.target.value)}
                    placeholder={t.field_idea_placeholder}
                    rows={3}
                    className="w-full border border-blue-200 rounded-lg px-3 py-2 text-sm outline-none bg-white focus:border-blue-400 focus:ring-1 focus:ring-blue-100 resize-vertical"
                  />
                  <p className="text-xs text-blue-500 mt-1">{t.field_idea_hint}</p>
                </div>

                {submitError && (
                  <p className="text-xs text-red-500">{submitError}</p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold text-sm py-2.5 rounded-lg transition-colors"
                >
                  {isSubmitting ? t.submitting : t.submit_btn}
                </button>
              </form>
            </div>
          ) : (
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center mt-2">
              <div className="text-2xl mb-2">✅</div>
              <h3 className="font-semibold text-gray-900 mb-1">{t.thanks_title}</h3>
              <p className="text-sm text-gray-600">{t.thanks_sub}</p>
            </div>
          )}

          <button
            onClick={restart}
            className="w-full mt-3 text-xs text-gray-400 hover:text-gray-600 py-2 transition-colors"
          >
            {t.restart}
          </button>

        </div>
      )}

    </div>
  )
}
