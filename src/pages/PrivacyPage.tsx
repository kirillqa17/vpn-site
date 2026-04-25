import { useState } from 'react'

type Lang = 'ru' | 'en'

export default function PrivacyPage() {
  const [lang, setLang] = useState<Lang>('ru')

  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh', color: '#fff' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 20px 60px' }}>
        <LangToggle lang={lang} onChange={setLang} />

        {lang === 'ru' ? <RuPrivacy /> : <EnPrivacy />}
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

function RuPrivacy() {
  return (
    <section>
      <h1 style={h1}>Политика конфиденциальности</h1>
      <p style={sub}>SvoiVPN · последнее обновление: 25 апреля 2026 г.</p>

      <h2 style={h2}>1. Общие положения</h2>
      <p style={p}>SvoiVPN («мы», «сервис») уважает вашу конфиденциальность. Эта политика описывает, какие данные мы собираем, как используем и как защищаем.</p>

      <h2 style={h2}>2. Какие данные мы собираем</h2>
      <ul style={ul}>
        <li><b>Email</b> — для регистрации и восстановления доступа.</li>
        <li><b>Telegram ID</b> — если вы вошли через Telegram-бот.</li>
        <li><b>Платёжные данные</b> — обрабатываются провайдером оплаты, мы храним только статус подписки и идентификатор транзакции.</li>
        <li><b>Технические логи</b> — анонимные ошибки и crash-репорты для улучшения стабильности.</li>
      </ul>

      <h2 style={h2}>3. Что мы НЕ собираем</h2>
      <ul style={ul}>
        <li>Историю посещений сайтов</li>
        <li>DNS-запросы</li>
        <li>IP-адреса источника и назначения трафика</li>
        <li>Содержимое передаваемых данных</li>
      </ul>
      <p style={p}>Это <b>политика no-logs</b> в отношении VPN-трафика.</p>

      <h2 style={h2}>4. Хранение данных</h2>
      <p style={p}>Email и метаданные подписки хранятся на серверах в Российской Федерации до момента удаления аккаунта пользователем.</p>

      <h2 style={h2}>5. Передача третьим лицам</h2>
      <p style={p}>Мы не продаём и не передаём ваши данные третьим лицам, кроме случаев, прямо предусмотренных законом.</p>

      <h2 style={h2}>6. Безопасность</h2>
      <p style={p}>Используются современные протоколы шифрования (VLESS, Reality, XHTTP). Пароли хранятся в хешированном виде (Argon2). Доступ к серверам ограничен.</p>

      <h2 style={h2}>7. Ваши права</h2>
      <p style={p}>Вы можете запросить удаление аккаунта и связанных данных, написав в Telegram <a href="https://t.me/svoivpn_help_bot" style={link}>@svoivpn_help_bot</a>.</p>

      <h2 style={h2}>8. Контакты</h2>
      <p style={p}>По вопросам конфиденциальности: <a href="https://t.me/svoivpn_help_bot" style={link}>@svoivpn_help_bot</a> · <a href="https://svoiweb.ru" style={link}>svoiweb.ru</a></p>
    </section>
  )
}

function EnPrivacy() {
  return (
    <section>
      <h1 style={h1}>Privacy Policy</h1>
      <p style={sub}>SvoiVPN · Last updated: April 25, 2026</p>

      <h2 style={h2}>1. Overview</h2>
      <p style={p}>SvoiVPN ("we", "the service") respects your privacy. This policy describes what data we collect, how we use it, and how we protect it.</p>

      <h2 style={h2}>2. Data we collect</h2>
      <ul style={ul}>
        <li><b>Email</b> — for account registration and password recovery.</li>
        <li><b>Telegram ID</b> — if you signed in via the Telegram bot.</li>
        <li><b>Payment data</b> — processed by our payment provider; we only store subscription status and transaction id.</li>
        <li><b>Technical logs</b> — anonymous errors and crash reports for stability improvements.</li>
      </ul>

      <h2 style={h2}>3. Data we do NOT collect</h2>
      <ul style={ul}>
        <li>Browsing history</li>
        <li>DNS queries</li>
        <li>Source / destination IP addresses of your traffic</li>
        <li>Content of transmitted data</li>
      </ul>
      <p style={p}>This is a <b>no-logs policy</b> regarding VPN traffic.</p>

      <h2 style={h2}>4. Data retention</h2>
      <p style={p}>Your email and subscription metadata are stored on servers in the Russian Federation until you delete your account.</p>

      <h2 style={h2}>5. Third parties</h2>
      <p style={p}>We do not sell or share your data with third parties, except as required by law.</p>

      <h2 style={h2}>6. Security</h2>
      <p style={p}>We use modern encryption protocols (VLESS, Reality, XHTTP). Passwords are stored hashed (Argon2). Access to servers is restricted.</p>

      <h2 style={h2}>7. Your rights</h2>
      <p style={p}>You can request deletion of your account and associated data via Telegram <a href="https://t.me/svoivpn_help_bot" style={link}>@svoivpn_help_bot</a>.</p>

      <h2 style={h2}>8. Contact</h2>
      <p style={p}>For privacy questions: <a href="https://t.me/svoivpn_help_bot" style={link}>@svoivpn_help_bot</a> · <a href="https://svoiweb.ru" style={link}>svoiweb.ru</a></p>
    </section>
  )
}
