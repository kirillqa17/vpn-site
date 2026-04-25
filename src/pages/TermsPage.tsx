import { useState } from 'react'

type Lang = 'ru' | 'en'

export default function TermsPage() {
  const [lang, setLang] = useState<Lang>('ru')

  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh', color: '#fff' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 20px 60px' }}>
        <LangToggle lang={lang} onChange={setLang} />
        {lang === 'ru' ? <RuTerms /> : <EnTerms />}
      </div>
    </div>
  )
}

function LangToggle({ lang, onChange }: { lang: Lang; onChange: (l: Lang) => void }) {
  const btn = (selected: boolean): React.CSSProperties => ({
    flex: 1,
    background: selected ? 'rgba(0,214,120,0.12)' : '#1A1A1A',
    color: selected ? '#00D678' : '#B5B5B5',
    border: selected ? '1px solid rgba(0,214,120,0.3)' : '1px solid transparent',
    borderRadius: 12,
    padding: '12px 16px',
    fontSize: 13,
    fontWeight: 600,
    letterSpacing: '0.02em',
    cursor: 'pointer',
    transition: 'all 0.2s',
  })
  return (
    <div style={{ position: 'sticky', top: 0, zIndex: 10, background: '#0A0A0A', padding: '12px 0 16px', display: 'flex', gap: 6, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <button style={btn(lang === 'ru')} onClick={() => onChange('ru')}>Русский</button>
      <button style={btn(lang === 'en')} onClick={() => onChange('en')}>English</button>
    </div>
  )
}

const h1: React.CSSProperties = { fontSize: 28, fontWeight: 700, marginTop: 28, marginBottom: 8, letterSpacing: '-0.01em' }
const sub: React.CSSProperties = { color: '#6F6F6F', fontSize: 13, marginBottom: 16 }
const h2: React.CSSProperties = { fontSize: 18, fontWeight: 600, marginTop: 28, marginBottom: 8 }
const p: React.CSSProperties = { color: '#B5B5B5', lineHeight: 1.6, margin: '8px 0' }
const ul: React.CSSProperties = { paddingLeft: 20, color: '#B5B5B5', lineHeight: 1.8, margin: '8px 0' }
const link: React.CSSProperties = { color: '#00D678', textDecoration: 'none' }

function RuTerms() {
  return (
    <section>
      <h1 style={h1}>Условия использования</h1>
      <p style={sub}>SvoiVPN · последнее обновление: 25 апреля 2026 г.</p>

      <h2 style={h2}>1. Принятие условий</h2>
      <p style={p}>Используя сервис SvoiVPN, вы соглашаетесь с настоящими Условиями. Если вы не согласны — не используйте сервис.</p>

      <h2 style={h2}>2. Описание сервиса</h2>
      <p style={p}>SvoiVPN предоставляет VPN-сервис на базе Xray для шифрования и проксирования вашего интернет-трафика.</p>

      <h2 style={h2}>3. Аккаунт и подписка</h2>
      <ul style={ul}>
        <li>Для использования сервиса требуется регистрация (email или Telegram).</li>
        <li>Доступны платные и бесплатный пробный планы. Условия и цены указаны на <a href="https://svoiweb.ru" style={link}>svoiweb.ru</a>.</li>
        <li>Вы несёте ответственность за сохранность учётных данных.</li>
      </ul>

      <h2 style={h2}>4. Допустимое использование</h2>
      <p style={p}>Запрещается использовать сервис для:</p>
      <ul style={ul}>
        <li>совершения противоправных действий по законодательству вашей страны;</li>
        <li>спама, DDoS-атак, фишинга и любых форм мошенничества;</li>
        <li>распространения вредоносного ПО;</li>
        <li>злоупотребления полосой пропускания (например, постоянный P2P-флуд на бесплатном тарифе).</li>
      </ul>

      <h2 style={h2}>5. Прекращение доступа</h2>
      <p style={p}>Мы вправе приостановить или прекратить доступ при нарушении настоящих Условий без возврата средств за оставшийся период.</p>

      <h2 style={h2}>6. Отказ от гарантий</h2>
      <p style={p}>Сервис предоставляется «как есть». Мы стремимся к максимальной доступности, но не гарантируем бесперебойную работу 100% времени.</p>

      <h2 style={h2}>7. Возврат средств</h2>
      <p style={p}>Возврат средств возможен в течение 7 дней с момента оплаты, если сервис не использовался активно. Запросы — через <a href="https://t.me/svoivpn_help_bot" style={link}>@svoivpn_help_bot</a>.</p>

      <h2 style={h2}>8. Изменения условий</h2>
      <p style={p}>Мы можем обновлять настоящие Условия. Актуальная версия всегда доступна по адресу <a href="https://svoiweb.ru/terms" style={link}>svoiweb.ru/terms</a>.</p>

      <h2 style={h2}>9. Применимое право</h2>
      <p style={p}>Настоящее соглашение регулируется законодательством Российской Федерации.</p>

      <h2 style={h2}>10. Контакты</h2>
      <p style={p}>Telegram: <a href="https://t.me/svoivpn_help_bot" style={link}>@svoivpn_help_bot</a> · Сайт: <a href="https://svoiweb.ru" style={link}>svoiweb.ru</a></p>
    </section>
  )
}

function EnTerms() {
  return (
    <section>
      <h1 style={h1}>Terms of Service</h1>
      <p style={sub}>SvoiVPN · Last updated: April 25, 2026</p>

      <h2 style={h2}>1. Acceptance</h2>
      <p style={p}>By using the SvoiVPN service you agree to these Terms. If you do not agree, do not use the service.</p>

      <h2 style={h2}>2. Service description</h2>
      <p style={p}>SvoiVPN provides a VPN service powered by Xray to encrypt and route your internet traffic.</p>

      <h2 style={h2}>3. Account and subscription</h2>
      <ul style={ul}>
        <li>An account (email or Telegram) is required.</li>
        <li>Paid and free-trial plans are available. Pricing details are at <a href="https://svoiweb.ru" style={link}>svoiweb.ru</a>.</li>
        <li>You are responsible for keeping your credentials safe.</li>
      </ul>

      <h2 style={h2}>4. Acceptable use</h2>
      <p style={p}>You may not use the service for:</p>
      <ul style={ul}>
        <li>any activity illegal under the laws of your country;</li>
        <li>spam, DDoS attacks, phishing, or fraud;</li>
        <li>distributing malware;</li>
        <li>bandwidth abuse (e.g. continuous P2P flooding on the free tier).</li>
      </ul>

      <h2 style={h2}>5. Termination</h2>
      <p style={p}>We may suspend or terminate access for violation of these Terms without refund for the remaining period.</p>

      <h2 style={h2}>6. No warranty</h2>
      <p style={p}>The service is provided "as is". We strive for maximum uptime but do not guarantee 100% availability.</p>

      <h2 style={h2}>7. Refunds</h2>
      <p style={p}>Refunds are available within 7 days of payment if the service has not been actively used. Requests via <a href="https://t.me/svoivpn_help_bot" style={link}>@svoivpn_help_bot</a>.</p>

      <h2 style={h2}>8. Changes</h2>
      <p style={p}>We may update these Terms. The current version is always available at <a href="https://svoiweb.ru/terms" style={link}>svoiweb.ru/terms</a>.</p>

      <h2 style={h2}>9. Governing law</h2>
      <p style={p}>These Terms are governed by the laws of the Russian Federation.</p>

      <h2 style={h2}>10. Contact</h2>
      <p style={p}>Telegram: <a href="https://t.me/svoivpn_help_bot" style={link}>@svoivpn_help_bot</a> · Website: <a href="https://svoiweb.ru" style={link}>svoiweb.ru</a></p>
    </section>
  )
}
