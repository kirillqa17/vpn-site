import { useState } from 'react'
import { Lang, OPERATOR, h1, h2, h3, langToggleStyles, link, note, p, sub, ul } from './legal/legalStyles'

const EFFECTIVE_DATE_RU = '25 апреля 2026 г.'
const EFFECTIVE_DATE_EN = 'April 25, 2026'

export default function PrivacyPage() {
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

        {lang === 'ru' ? <RuPrivacy /> : <EnPrivacy />}
      </div>
    </div>
  )
}

function RuPrivacy() {
  return (
    <section>
      <h1 style={h1}>Политика обработки персональных данных</h1>
      <p style={sub}>Сервис «SvoiVPN» · действует с {EFFECTIVE_DATE_RU}</p>

      <p style={p}>
        Настоящая Политика обработки персональных данных (далее — «Политика») разработана в соответствии с
        требованиями Федерального закона от 27.07.2006 № 152-ФЗ «О персональных данных» (далее — «Закон 152-ФЗ»)
        и определяет порядок обработки персональных данных и меры по обеспечению их безопасности, принимаемые
        Оператором при оказании услуг сервиса «SvoiVPN».
      </p>

      <h2 style={h2}>1. Общие положения</h2>
      <p style={p}>
        1.1. Оператор персональных данных (далее — «Оператор»): {OPERATOR.name}, ИНН {OPERATOR.inn},
        ОГРН/ОГРНИП {OPERATOR.ogrn}, адрес: {OPERATOR.address}.
      </p>
      <p style={p}>
        1.2. Под сервисом «SvoiVPN» (далее — «Сервис») понимается совокупность программных средств, веб-сайта{' '}
        <a href="https://svoiweb.ru" style={link}>
          svoiweb.ru
        </a>
        , мобильных приложений и Telegram-бота, предоставляющих пользователям услуги VPN-соединения.
      </p>
      <p style={p}>
        1.3. Используя Сервис, регистрируясь в нём или предоставляя свои персональные данные, Пользователь даёт
        Оператору согласие на их обработку в соответствии с настоящей Политикой и в соответствии со ст. 6, 9
        Закона 152-ФЗ.
      </p>
      <p style={p}>1.4. Настоящая Политика применяется ко всем персональным данным, обрабатываемым Оператором.</p>

      <h2 style={h2}>2. Основные понятия</h2>
      <p style={p}>
        Используемые термины применяются в значениях, определённых ст. 3 Закона 152-ФЗ. Под «Пользователем»
        понимается физическое лицо, использующее Сервис. Под «обработкой» — любые действия с персональными
        данными (сбор, запись, систематизация, накопление, хранение, уточнение, извлечение, использование,
        передача, обезличивание, блокирование, удаление, уничтожение).
      </p>

      <h2 style={h2}>3. Состав обрабатываемых персональных данных</h2>
      <p style={p}>3.1. Оператор обрабатывает следующие категории данных Пользователя:</p>
      <h3 style={h3}>3.1.1. Учётные данные:</h3>
      <ul style={ul}>
        <li>идентификатор Telegram (Telegram ID), имя пользователя Telegram (username) — при регистрации через Telegram-бот;</li>
        <li>адрес электронной почты — при регистрации через сайт или привязке email к аккаунту;</li>
        <li>хэш пароля (Argon2id) — пароль в открытом виде Оператором не хранится;</li>
        <li>токен сессии (JWT), хранящийся на устройстве Пользователя.</li>
      </ul>
      <h3 style={h3}>3.1.2. Данные о подписке и устройствах:</h3>
      <ul style={ul}>
        <li>выбранный тарифный план, срок действия подписки, статус активности;</li>
        <li>аппаратные идентификаторы (HWID) устройств, подключённых к Сервису, их количество и активность;</li>
        <li>уникальный идентификатор подписки (UUID), персональная ссылка для подключения.</li>
      </ul>
      <h3 style={h3}>3.1.3. Платёжные сведения:</h3>
      <ul style={ul}>
        <li>сумма платежа, валюта, выбранный тариф, идентификатор транзакции (внешний ID платёжной системы);</li>
        <li>последние 4 цифры платёжной карты — при использовании автопродления;</li>
        <li>токен сохранённого способа оплаты (payment_method_id), выдаваемый платёжной системой.</li>
      </ul>
      <p style={p}>
        Полные реквизиты банковской карты Оператором <b>не собираются и не хранятся</b>: они вводятся
        непосредственно на стороне платёжной системы (см. п. 7.1).
      </p>
      <h3 style={h3}>3.1.4. Сообщения службы поддержки:</h3>
      <ul style={ul}>
        <li>тексты сообщений в чат-поддержку (хранятся не более 30 дней с момента создания);</li>
        <li>тематика обращения, временные метки, статус (решено / эскалировано).</li>
      </ul>
      <h3 style={h3}>3.1.5. Технические сведения:</h3>
      <ul style={ul}>
        <li>сведения о версии приложения, типе устройства, версии операционной системы;</li>
        <li>журналы ошибок и отчёты о сбоях, передаваемые приложением (если Пользователь не отказался от их отправки);</li>
        <li>IP-адрес Пользователя на момент аутентификации (только в журналах сервера, без долговременного хранения, не более 30 дней).</li>
      </ul>

      <h2 style={h2}>4. Какие данные мы НЕ собираем</h2>
      <p style={p}>
        4.1. Оператор реализует <b>политику отсутствия журналов VPN-трафика</b>. В частности, Оператор{' '}
        <b>не собирает, не хранит и не анализирует</b>:
      </p>
      <ul style={ul}>
        <li>историю посещаемых Пользователем сайтов и сетевых ресурсов;</li>
        <li>DNS-запросы, исходящие через VPN-туннель;</li>
        <li>содержимое передаваемого трафика;</li>
        <li>исходные и целевые IP-адреса соединений Пользователя в туннеле;</li>
        <li>метаданные конкретных сетевых сессий (время и объём отдельных подключений к сайтам).</li>
      </ul>
      <p style={p}>
        4.2. На VPN-узлах включается только агрегированный учёт трафика (общий объём за период), необходимый
        для контроля квот и предотвращения злоупотреблений.
      </p>

      <h2 style={h2}>5. Цели обработки персональных данных</h2>
      <p style={p}>5.1. Оператор обрабатывает персональные данные исключительно в целях:</p>
      <ul style={ul}>
        <li>заключения и исполнения договора об оказании услуг (Условия использования);</li>
        <li>идентификации Пользователя при аутентификации и предотвращения несанкционированного доступа;</li>
        <li>обработки платежей, выпуска фискальных документов (в соответствии с Федеральным законом
          № 54-ФЗ «О применении контрольно-кассовой техники»);</li>
        <li>оказания технической поддержки и информирования о статусе подписки;</li>
        <li>отправки уведомлений о существенных событиях (истечение подписки, изменение условий) и, с согласия
          Пользователя, рассылки новостей (от рассылки можно отказаться в любое время);</li>
        <li>защиты Сервиса от мошенничества, злоупотреблений и нарушения настоящих документов;</li>
        <li>исполнения обязанностей, возложенных на Оператора законодательством Российской Федерации.</li>
      </ul>

      <h2 style={h2}>6. Правовые основания обработки</h2>
      <p style={p}>6.1. Обработка персональных данных осуществляется на следующих основаниях:</p>
      <ul style={ul}>
        <li>согласие Пользователя (п. 1 ч. 1 ст. 6 Закона 152-ФЗ), выражаемое путём регистрации в Сервисе и
          использования его функционала;</li>
        <li>необходимость исполнения договора, стороной которого является Пользователь (п. 5 ч. 1 ст. 6 Закона 152-ФЗ);</li>
        <li>выполнение обязанностей Оператора, возложенных законодательством РФ (п. 2 ч. 1 ст. 6 Закона 152-ФЗ);</li>
        <li>законные интересы Оператора по обеспечению информационной безопасности и предотвращению злоупотреблений
          (п. 7 ч. 1 ст. 6 Закона 152-ФЗ).</li>
      </ul>

      <h2 style={h2}>7. Передача данных третьим лицам</h2>
      <p style={p}>
        7.1. Оператор передаёт персональные данные третьим лицам только в объёме, необходимом для исполнения
        перечисленных целей, и только следующим категориям получателей:
      </p>
      <ul style={ul}>
        <li>
          <b>ООО НКО «ЮMoney» (платёжный сервис ЮKassa)</b>, ИНН 7750005725 — для приёма платежей по картам и
          через СБП. Передаются: сумма, валюта, описание услуги, идентификатор пользователя в Сервисе. Обработка
          платёжных реквизитов карт осуществляется ЮKassa, к ним Оператор не имеет доступа.
        </li>
        <li>
          <b>CryptoBot</b> (Telegram-сервис криптоплатежей) — при выборе оплаты в криптовалюте. Передаются:
          сумма, валюта, идентификатор инвойса.
        </li>
        <li>
          <b>SMTP-провайдер</b> (Яндекс) — для отправки служебной почты (коды подтверждения, уведомления). Email
          Пользователя обрабатывается провайдером в соответствии с его политикой.
        </li>
        <li>
          <b>Государственные органы</b> — по основаниям и в порядке, прямо установленным федеральным
          законодательством.
        </li>
      </ul>
      <p style={p}>7.2. Оператор <b>не передаёт</b> персональные данные третьим лицам в коммерческих целях.</p>

      <h2 style={h2}>8. Трансграничная передача данных</h2>
      <p style={p}>
        8.1. Оператор может использовать VPN-узлы (серверы), расположенные на территории иностранных государств,
        для предоставления Услуг.
      </p>
      <p style={p}>
        8.2. Через эти узлы проходит сетевой трафик Пользователя; персональные данные в смысле Закона 152-ФЗ
        (учётная запись, платёжные сведения и т. п.) на иностранные серверы <b>не передаются</b> и хранятся в
        Российской Федерации.
      </p>
      <p style={p}>
        8.3. Использование Сервиса означает информирование Пользователя о факте маршрутизации его трафика через
        иностранные узлы и согласие с этим.
      </p>

      <h2 style={h2}>9. Сроки обработки и хранения</h2>
      <ul style={ul}>
        <li>учётные данные и сведения о подписке — в течение всего срока действия учётной записи;</li>
        <li>журнал платежей — 5 лет с момента совершения операции (требование п. 1 ст. 29 ФЗ № 402-ФЗ);</li>
        <li>сообщения службы поддержки — 30 дней с момента отправки;</li>
        <li>журналы аутентификации — не более 30 дней;</li>
        <li>коды подтверждения email — 10 минут с момента генерации.</li>
      </ul>
      <p style={p}>
        9.2. По истечении указанных сроков, а также при удалении учётной записи Пользователем, персональные
        данные подлежат уничтожению в срок не более 30 рабочих дней. Платёжные сведения, подлежащие хранению по
        требованию законодательства, обезличиваются.
      </p>

      <h2 style={h2}>10. Меры по обеспечению безопасности</h2>
      <p style={p}>10.1. Оператор принимает следующие меры (ст. 19 Закона 152-ФЗ):</p>
      <ul style={ul}>
        <li>передача данных между Пользователем и Сервисом по защищённому каналу (TLS 1.2+);</li>
        <li>хранение паролей в виде криптостойких хэшей (Argon2id);</li>
        <li>ограничение доступа сотрудников к персональным данным по принципу необходимого минимума;</li>
        <li>контроль доступа и журналирование операций администраторов;</li>
        <li>регулярное резервное копирование с шифрованием;</li>
        <li>применение современных протоколов шифрования VPN-трафика (VLESS, Reality, XHTTP).</li>
      </ul>

      <h2 style={h2}>11. Права Пользователя (субъекта персональных данных)</h2>
      <p style={p}>11.1. В соответствии со ст. 14 Закона 152-ФЗ Пользователь имеет право:</p>
      <ul style={ul}>
        <li>получать сведения о факте, целях, способах и сроках обработки своих персональных данных;</li>
        <li>требовать уточнения, блокирования или уничтожения некорректных или неактуальных данных;</li>
        <li>отозвать согласие на обработку данных и потребовать удаления учётной записи;</li>
        <li>обжаловать действия Оператора в Роскомнадзоре или в судебном порядке.</li>
      </ul>
      <p style={p}>
        11.2. Запросы направляются на адрес: <a href={`mailto:${OPERATOR.legalEmail}`} style={link}>{OPERATOR.legalEmail}</a>,
        либо через Telegram-бот{' '}
        <a href="https://t.me/svoivpn_help_bot" style={link}>
          @svoivpn_help_bot
        </a>
        . Ответ предоставляется в срок не более 10 рабочих дней.
      </p>

      <h2 style={h2}>12. Cookies и автоматический сбор</h2>
      <p style={p}>
        12.1. Сайт использует только технические cookie / localStorage, необходимые для аутентификации
        (хранение JWT-токена) и работы интерфейса. Сайт не использует сторонние системы веб-аналитики и не
        передаёт данные о действиях Пользователя в рекламные сети.
      </p>

      <h2 style={h2}>13. Изменения настоящей Политики</h2>
      <p style={p}>
        13.1. Оператор вправе изменять настоящую Политику в одностороннем порядке. Актуальная редакция
        размещается по адресу{' '}
        <a href="https://svoiweb.ru/privacy" style={link}>
          svoiweb.ru/privacy
        </a>
        . Существенные изменения доводятся до Пользователя путём уведомления в приложении или по электронной
        почте.
      </p>

      <h2 style={h2}>14. Реквизиты Оператора</h2>
      <div style={note}>
        Оператор: {OPERATOR.name}
        <br />
        ИНН: {OPERATOR.inn}
        <br />
        ОГРН/ОГРНИП: {OPERATOR.ogrn}
        <br />
        Адрес: {OPERATOR.address}
        <br />
        Регистрация в реестре операторов ПДн: {OPERATOR.rkn}
        <br />
        Email для официальной переписки: <a href={`mailto:${OPERATOR.legalEmail}`} style={link}>{OPERATOR.legalEmail}</a>
        <br />
        Telegram: <a href="https://t.me/svoivpn_help_bot" style={link}>@svoivpn_help_bot</a>
      </div>

      <p style={{ ...p, fontSize: 12, color: '#6F6F6F' }}>
        В случае противоречия между русскоязычной и англоязычной редакцией настоящего документа приоритет имеет
        русскоязычная редакция.
      </p>
    </section>
  )
}

function EnPrivacy() {
  return (
    <section>
      <h1 style={h1}>Privacy Policy</h1>
      <p style={sub}>SvoiVPN service · effective {EFFECTIVE_DATE_EN}</p>

      <div style={note}>
        This English version is provided for informational purposes only. It is a translation of the official
        Russian-language Privacy Policy ("Политика обработки персональных данных") prepared in accordance with
        Federal Law of the Russian Federation No. 152-FZ "On Personal Data". In case of any discrepancy, the
        Russian text prevails.
      </div>

      <h2 style={h2}>1. General provisions</h2>
      <p style={p}>
        1.1. Operator: {OPERATOR.name}, INN {OPERATOR.inn}, OGRN/OGRNIP {OPERATOR.ogrn}, registered address: {OPERATOR.address}.
      </p>
      <p style={p}>
        1.2. The "SvoiVPN" service ("Service") consists of the website{' '}
        <a href="https://svoiweb.ru" style={link}>svoiweb.ru</a>, mobile apps, and the Telegram bot, which together
        provide users with VPN connectivity.
      </p>
      <p style={p}>
        1.3. By using the Service, registering an account, or providing personal data, the User consents to its
        processing in accordance with this Policy and Articles 6 and 9 of Law No. 152-FZ.
      </p>

      <h2 style={h2}>2. Personal data we process</h2>
      <h3 style={h3}>2.1. Account data</h3>
      <ul style={ul}>
        <li>Telegram ID and username (when registering via the Telegram bot);</li>
        <li>email address (when registering on the website or linking an email);</li>
        <li>password hash (Argon2id) — we never store plaintext passwords;</li>
        <li>JWT session token, stored on the User's device.</li>
      </ul>
      <h3 style={h3}>2.2. Subscription and device data</h3>
      <ul style={ul}>
        <li>plan, expiry date, active status;</li>
        <li>device hardware identifiers (HWID), count, and last-active timestamps;</li>
        <li>subscription UUID and personal connection link.</li>
      </ul>
      <h3 style={h3}>2.3. Payment data</h3>
      <ul style={ul}>
        <li>amount, currency, plan, external transaction ID;</li>
        <li>last 4 digits of the payment card (for auto-renewal only);</li>
        <li>saved payment-method token issued by the payment provider.</li>
      </ul>
      <p style={p}>
        Full card details are <b>never collected or stored</b> by the Operator; they are entered directly on the
        payment provider's side (see §6.1).
      </p>
      <h3 style={h3}>2.4. Support messages</h3>
      <ul style={ul}>
        <li>support chat content (retained for up to 30 days);</li>
        <li>topic, timestamps, ticket status.</li>
      </ul>
      <h3 style={h3}>2.5. Technical data</h3>
      <ul style={ul}>
        <li>app version, device type, OS version;</li>
        <li>error logs and crash reports (only if the User has not opted out);</li>
        <li>IP address at the moment of authentication (server log only, kept up to 30 days).</li>
      </ul>

      <h2 style={h2}>3. Data we do NOT collect</h2>
      <p style={p}>The Operator follows a <b>no-logs policy</b> for VPN traffic. We do not collect, store, or analyze:</p>
      <ul style={ul}>
        <li>browsing history;</li>
        <li>DNS queries traversing the VPN tunnel;</li>
        <li>content of the transmitted traffic;</li>
        <li>source or destination IP addresses inside the tunnel;</li>
        <li>per-session metadata of individual connections.</li>
      </ul>
      <p style={p}>
        Aggregate bandwidth usage is recorded on VPN nodes only to enforce fair use and prevent abuse.
      </p>

      <h2 style={h2}>4. Purposes of processing</h2>
      <ul style={ul}>
        <li>conclusion and performance of the service agreement;</li>
        <li>user authentication and prevention of unauthorized access;</li>
        <li>payment processing and issuance of fiscal receipts as required by Russian Federal Law No. 54-FZ;</li>
        <li>technical support and subscription-status notifications;</li>
        <li>service-related notifications (expiry, terms updates) and, with consent, marketing emails — opt-out at any time;</li>
        <li>protection of the Service against abuse and fraud;</li>
        <li>compliance with legal obligations under the laws of the Russian Federation.</li>
      </ul>

      <h2 style={h2}>5. Legal basis</h2>
      <ul style={ul}>
        <li>User's consent (Article 6.1.1 of Law 152-FZ);</li>
        <li>performance of the contract to which the User is a party (Article 6.1.5);</li>
        <li>compliance with legal obligations (Article 6.1.2);</li>
        <li>legitimate interests of the Operator in information security and abuse prevention (Article 6.1.7).</li>
      </ul>

      <h2 style={h2}>6. Disclosure to third parties</h2>
      <p style={p}>
        We share personal data only to the extent necessary, with the following recipients:
      </p>
      <ul style={ul}>
        <li>
          <b>NCO YooMoney LLC (YooKassa)</b>, INN 7750005725 — for card and SBP payments. We transmit: amount,
          currency, description, in-service user ID. Card data are processed by YooKassa; we do not have access.
        </li>
        <li>
          <b>CryptoBot</b> (Telegram-based crypto payments) — for crypto checkouts. Transmitted: amount, currency,
          invoice ID.
        </li>
        <li>
          <b>SMTP provider</b> (Yandex) — for service emails (verification codes, notifications). Email is
          processed by the provider under its own policy.
        </li>
        <li>
          <b>Government authorities</b> — only when and as required by Russian federal law.
        </li>
      </ul>
      <p style={p}>We <b>do not</b> share personal data for commercial purposes.</p>

      <h2 style={h2}>7. Cross-border data flows</h2>
      <p style={p}>
        VPN egress nodes may be located in foreign jurisdictions. User network traffic is routed through these
        nodes; personal data within the meaning of Law 152-FZ (account, payment) is <b>not transferred</b> to
        foreign servers and is stored in the Russian Federation.
      </p>

      <h2 style={h2}>8. Retention periods</h2>
      <ul style={ul}>
        <li>account and subscription data — for the lifetime of the account;</li>
        <li>payment ledger — 5 years (Article 29 of Federal Law No. 402-FZ);</li>
        <li>support messages — 30 days;</li>
        <li>authentication logs — up to 30 days;</li>
        <li>email verification codes — 10 minutes from issuance.</li>
      </ul>

      <h2 style={h2}>9. Security measures</h2>
      <ul style={ul}>
        <li>TLS 1.2+ for all transport between User and Service;</li>
        <li>passwords stored as Argon2id hashes;</li>
        <li>least-privilege access for staff;</li>
        <li>access controls and audit logs for administrative operations;</li>
        <li>encrypted backups;</li>
        <li>modern VPN traffic encryption (VLESS, Reality, XHTTP).</li>
      </ul>

      <h2 style={h2}>10. Your rights</h2>
      <p style={p}>Under Article 14 of Law 152-FZ you may:</p>
      <ul style={ul}>
        <li>request information about the processing of your data;</li>
        <li>request correction, blocking, or deletion of inaccurate or outdated data;</li>
        <li>withdraw consent and request account deletion;</li>
        <li>file complaints with Roskomnadzor or in court.</li>
      </ul>
      <p style={p}>
        Submit requests to <a href={`mailto:${OPERATOR.legalEmail}`} style={link}>{OPERATOR.legalEmail}</a> or via
        Telegram <a href="https://t.me/svoivpn_help_bot" style={link}>@svoivpn_help_bot</a>. Replies within 10
        business days.
      </p>

      <h2 style={h2}>11. Cookies and automated collection</h2>
      <p style={p}>
        The website uses only technical cookies / localStorage required for authentication (JWT) and UI state.
        No third-party analytics or advertising trackers are used.
      </p>

      <h2 style={h2}>12. Changes</h2>
      <p style={p}>
        The Operator may update this Policy unilaterally; the current version is at{' '}
        <a href="https://svoiweb.ru/privacy" style={link}>svoiweb.ru/privacy</a>. Material changes are
        communicated via the app or by email.
      </p>

      <h2 style={h2}>13. Operator details</h2>
      <div style={note}>
        Operator: {OPERATOR.name}
        <br />
        INN: {OPERATOR.inn} · OGRN/OGRNIP: {OPERATOR.ogrn}
        <br />
        Address: {OPERATOR.address}
        <br />
        Roskomnadzor data-operator registry: {OPERATOR.rkn}
        <br />
        Legal email: <a href={`mailto:${OPERATOR.legalEmail}`} style={link}>{OPERATOR.legalEmail}</a>
        <br />
        Telegram: <a href="https://t.me/svoivpn_help_bot" style={link}>@svoivpn_help_bot</a>
      </div>
    </section>
  )
}
