import { useState } from 'react'
import { Lang, OPERATOR, h1, h2, h3, langToggleStyles, link, note, p, sub } from './legal/legalStyles'

const SUPPORT_EMAIL = OPERATOR.contactEmail
const SUPPORT_TG = 'https://t.me/svoivpn_help_bot'

export default function SupportPage() {
  const [lang, setLang] = useState<Lang>('ru')

  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh', color: '#fff' }}>
      <div style={{ maxWidth: 820, margin: '0 auto', padding: '40px 20px 60px' }}>
        <div
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 10,
            background: '#0A0A0A',
            padding: '12px 0 16px',
            display: 'flex',
            gap: 6,
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <button style={langToggleStyles(lang === 'ru')} onClick={() => setLang('ru')}>
            Русский
          </button>
          <button style={langToggleStyles(lang === 'en')} onClick={() => setLang('en')}>
            English
          </button>
        </div>

        {lang === 'ru' ? <RuSupport /> : <EnSupport />}
      </div>
    </div>
  )
}

// Exported so scripts/prerender-legal.mjs renders each language to static HTML
// at build time → dist/support.html, served by nginx at /support. This is the
// App Store / Google Play "Support URL": a real web page (not a chat deep-link)
// where users can find how to ask questions and request support.
export function RuSupport() {
  return (
    <section>
      <h1 style={h1}>Поддержка SvoiVPN</h1>
      <p style={sub}>Поможем с установкой, подключением, оплатой и любыми вопросами по сервису.</p>

      <p style={p}>
        Если у вас возникли вопросы или сложности с сервисом SvoiVPN, свяжитесь с нами любым удобным
        способом — мы постараемся ответить как можно быстрее.
      </p>

      <h2 style={h2}>Как с нами связаться</h2>
      <div style={note}>
        Электронная почта: <a href={`mailto:${SUPPORT_EMAIL}`} style={link}>{SUPPORT_EMAIL}</a>
        <br />
        Telegram-поддержка: <a href={SUPPORT_TG} style={link}>@svoivpn_help_bot</a>
        <br />
        Встроенный чат поддержки — в мобильном приложении и в личном кабинете на сайте{' '}
        <a href="https://svoiweb.ru" style={link}>svoiweb.ru</a>
        <br />
        Время ответа: как правило, в течение 24 часов.
      </div>

      <h2 style={h2}>Частые вопросы</h2>

      <h3 style={h3}>Как начать пользоваться</h3>
      <p style={p}>
        Установите приложение, импортируйте свою конфигурацию или ссылку-подписку и нажмите кнопку
        подключения. Оформить подписку можно на сайте{' '}
        <a href="https://svoiweb.ru" style={link}>svoiweb.ru</a> или в Telegram-боте.
      </p>

      <h3 style={h3}>Подписка и оплата</h3>
      <p style={p}>
        Оплата и продление подписки доступны на сайте и в Telegram-боте. По вопросам платежей, чеков и
        автопродления напишите на <a href={`mailto:${SUPPORT_EMAIL}`} style={link}>{SUPPORT_EMAIL}</a>.
      </p>

      <h3 style={h3}>Сколько устройств можно подключить</h3>
      <p style={p}>
        Количество одновременно подключённых устройств зависит от тарифа и отображается в личном
        кабинете. Если достигнут лимит — отключите одно из устройств или напишите в поддержку.
      </p>

      <h3 style={h3}>Не подключается или работает медленно</h3>
      <p style={p}>
        Попробуйте обновить подписку в приложении, выбрать другой сервер или переустановить
        конфигурацию. Если не помогло — напишите нам, указав версию приложения и описание проблемы,
        и мы поможем разобраться.
      </p>

      <h3 style={h3}>Возврат средств и отмена автопродления</h3>
      <p style={p}>
        Автопродление можно отключить в личном кабинете в любой момент. По вопросам возврата средств
        напишите на <a href={`mailto:${SUPPORT_EMAIL}`} style={link}>{SUPPORT_EMAIL}</a>.
      </p>

      <h3 style={h3}>Удаление аккаунта</h3>
      <p style={p}>
        Удалить аккаунт и связанные с ним данные можно в настройках приложения или личного кабинета,
        либо по запросу на <a href={`mailto:${SUPPORT_EMAIL}`} style={link}>{SUPPORT_EMAIL}</a>.
      </p>

      <h2 style={h2}>Контакты</h2>
      <div style={note}>
        Сервис: SvoiVPN — <a href="https://svoiweb.ru" style={link}>svoiweb.ru</a>
        <br />
        Поддержка: <a href={`mailto:${SUPPORT_EMAIL}`} style={link}>{SUPPORT_EMAIL}</a>
        <br />
        Telegram: <a href={SUPPORT_TG} style={link}>@svoivpn_help_bot</a>
        <br />
        Оператор: {OPERATOR.name}
      </div>
    </section>
  )
}

export function EnSupport() {
  return (
    <section>
      <h1 style={h1}>SvoiVPN Support</h1>
      <p style={sub}>We help with installation, connection, billing, and any questions about the service.</p>

      <p style={p}>
        If you have a question or run into a problem with SvoiVPN, contact us in whichever way is most
        convenient — we aim to reply as quickly as possible.
      </p>

      <h2 style={h2}>How to reach us</h2>
      <div style={note}>
        Email: <a href={`mailto:${SUPPORT_EMAIL}`} style={link}>{SUPPORT_EMAIL}</a>
        <br />
        Telegram support: <a href={SUPPORT_TG} style={link}>@svoivpn_help_bot</a>
        <br />
        Built-in support chat — inside the mobile app and in your account on{' '}
        <a href="https://svoiweb.ru" style={link}>svoiweb.ru</a>
        <br />
        Response time: usually within 24 hours.
      </div>

      <h2 style={h2}>Frequently asked questions</h2>

      <h3 style={h3}>Getting started</h3>
      <p style={p}>
        Install the app, import your configuration or subscription link, and tap connect. You can get a
        subscription on <a href="https://svoiweb.ru" style={link}>svoiweb.ru</a> or via the Telegram bot.
      </p>

      <h3 style={h3}>Subscription and billing</h3>
      <p style={p}>
        Payment and renewal are available on the website and in the Telegram bot. For questions about
        payments, receipts, or auto-renewal, email{' '}
        <a href={`mailto:${SUPPORT_EMAIL}`} style={link}>{SUPPORT_EMAIL}</a>.
      </p>

      <h3 style={h3}>How many devices can I connect</h3>
      <p style={p}>
        The number of simultaneously connected devices depends on your plan and is shown in your
        account. If you hit the limit, disconnect one device or contact support.
      </p>

      <h3 style={h3}>It won't connect or it's slow</h3>
      <p style={p}>
        Try refreshing the subscription in the app, choosing a different server, or re-importing the
        configuration. If that doesn't help, message us with your app version and a description of the
        problem and we'll look into it.
      </p>

      <h3 style={h3}>Refunds and cancelling auto-renewal</h3>
      <p style={p}>
        You can turn off auto-renewal in your account at any time. For refund questions, email{' '}
        <a href={`mailto:${SUPPORT_EMAIL}`} style={link}>{SUPPORT_EMAIL}</a>.
      </p>

      <h3 style={h3}>Deleting your account</h3>
      <p style={p}>
        You can delete your account and its associated data in the app or account settings, or by
        request to <a href={`mailto:${SUPPORT_EMAIL}`} style={link}>{SUPPORT_EMAIL}</a>.
      </p>

      <h2 style={h2}>Contact</h2>
      <div style={note}>
        Service: SvoiVPN — <a href="https://svoiweb.ru" style={link}>svoiweb.ru</a>
        <br />
        Support: <a href={`mailto:${SUPPORT_EMAIL}`} style={link}>{SUPPORT_EMAIL}</a>
        <br />
        Telegram: <a href={SUPPORT_TG} style={link}>@svoivpn_help_bot</a>
        <br />
        Operator: {OPERATOR.name}
      </div>
    </section>
  )
}
