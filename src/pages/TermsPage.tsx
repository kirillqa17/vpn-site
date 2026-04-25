import { useState } from 'react'
import { Lang, OPERATOR, h1, h2, h3, langToggleStyles, link, note, p, sub, ul } from './legal/legalStyles'

const EFFECTIVE_DATE_RU = '25 апреля 2026 г.'
const EFFECTIVE_DATE_EN = 'April 25, 2026'

export default function TermsPage() {
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

        {lang === 'ru' ? <RuTerms /> : <EnTerms />}
      </div>
    </div>
  )
}

function RuTerms() {
  return (
    <section>
      <h1 style={h1}>Пользовательское соглашение (публичная оферта)</h1>
      <p style={sub}>Сервис «SvoiVPN» · действует с {EFFECTIVE_DATE_RU}</p>

      <p style={p}>
        Настоящее Пользовательское соглашение (далее — «Соглашение») является публичной офертой в значении
        ст. 437 Гражданского кодекса РФ. Полным и безоговорочным акцептом настоящей оферты в соответствии с
        п. 3 ст. 438 ГК РФ считается совершение Пользователем любого из следующих действий: регистрация
        учётной записи в Сервисе, оплата подписки, активация пробного периода или иное использование
        Сервиса.
      </p>

      <h2 style={h2}>1. Термины и определения</h2>
      <ul style={ul}>
        <li>
          <b>Оператор / Исполнитель</b> — {OPERATOR.name}, ИНН {OPERATOR.inn}, ОГРН/ОГРНИП {OPERATOR.ogrn},
          адрес: {OPERATOR.address}.
        </li>
        <li>
          <b>Сервис «SvoiVPN»</b> — программно-аппаратный комплекс, включающий сайт{' '}
          <a href="https://svoiweb.ru" style={link}>svoiweb.ru</a>, мобильные приложения, Telegram-бот и серверную
          инфраструктуру, обеспечивающий предоставление Услуг.
        </li>
        <li>
          <b>Услуги</b> — предоставление доступа к VPN-соединению (виртуальной частной сети) для шифрования и
          маршрутизации сетевого трафика Пользователя.
        </li>
        <li><b>Пользователь / Заказчик</b> — дееспособное физическое лицо, заключившее настоящее Соглашение.</li>
        <li><b>Учётная запись</b> — совокупность данных, идентифицирующих Пользователя в Сервисе.</li>
        <li><b>Подписка</b> — оплаченный Пользователем срок предоставления Услуг по выбранному тарифу.</li>
        <li><b>Тарифы</b> — план предоставления Услуг и стоимость, размещённые на сайте Сервиса.</li>
      </ul>

      <h2 style={h2}>2. Предмет Соглашения</h2>
      <p style={p}>
        2.1. Исполнитель обязуется предоставлять Пользователю Услуги VPN-доступа в порядке и на условиях,
        предусмотренных настоящим Соглашением и выбранным тарифным планом, а Пользователь — оплачивать
        Услуги и соблюдать условия их использования.
      </p>
      <p style={p}>
        2.2. Услуга считается оказанной с момента предоставления Пользователю доступа к VPN-инфраструктуре и
        в течение всего срока действия Подписки, независимо от фактического использования.
      </p>

      <h2 style={h2}>3. Порядок заключения Соглашения</h2>
      <p style={p}>
        3.1. Соглашение заключается путём акцепта настоящей оферты в соответствии с введением выше. До
        акцепта Пользователь обязан ознакомиться с настоящим Соглашением и{' '}
        <a href="https://svoiweb.ru/privacy" style={link}>Политикой обработки персональных данных</a>.
      </p>
      <p style={p}>
        3.2. Регистрируясь в Сервисе, Пользователь подтверждает, что ему исполнилось 18 лет, либо что он
        получил согласие законного представителя.
      </p>
      <p style={p}>
        3.3. Соглашение вступает в силу с момента акцепта и действует до прекращения предоставления Услуг по
        одному из оснований, указанных в разделе 14.
      </p>

      <h2 style={h2}>4. Учётная запись</h2>
      <p style={p}>
        4.1. Регистрация осуществляется через сайт (по адресу электронной почты) либо через Telegram-бот.
      </p>
      <p style={p}>
        4.2. Пользователь обязуется указывать достоверные сведения и обеспечивать сохранность своих учётных
        данных. Все действия, совершённые в рамках учётной записи Пользователя, считаются совершёнными
        Пользователем.
      </p>
      <p style={p}>
        4.3. В случае утраты доступа Пользователь может восстановить его через процедуру сброса пароля или
        через службу поддержки.
      </p>

      <h2 style={h2}>5. Тарифы и порядок оплаты</h2>
      <p style={p}>
        5.1. Действующие тарифы размещены на сайте{' '}
        <a href="https://svoiweb.ru" style={link}>svoiweb.ru</a> и в приложении. На дату вступления настоящего
        Соглашения в силу тарифы составляют:
      </p>

      <h3 style={h3}>5.1.1. Тариф «Базовый»:</h3>
      <ul style={ul}>
        <li>1 месяц — 150 ₽;</li>
        <li>3 месяца — 430 ₽;</li>
        <li>1 год — 1 500 ₽.</li>
      </ul>
      <h3 style={h3}>5.1.2. Тариф «Семейный» (повышенный лимит устройств):</h3>
      <ul style={ul}>
        <li>1 месяц — 250 ₽;</li>
        <li>3 месяца — 700 ₽;</li>
        <li>1 год — 2 200 ₽.</li>
      </ul>
      <h3 style={h3}>5.1.3. Тариф «Обход БС»:</h3>
      <ul style={ul}>
        <li>1 месяц — 450 ₽;</li>
        <li>3 месяца — 1 250 ₽;</li>
        <li>1 год — 4 500 ₽.</li>
      </ul>
      <h3 style={h3}>5.1.4. Тариф «Обход БС Семейный»:</h3>
      <ul style={ul}>
        <li>1 месяц — 750 ₽;</li>
        <li>3 месяца — 2 100 ₽;</li>
        <li>1 год — 7 500 ₽.</li>
      </ul>

      <p style={p}>
        5.2. Оплата осуществляется через платёжного агрегатора <b>ЮKassa</b> (банковской картой или через СБП)
        либо через сервис <b>CryptoBot</b> (криптовалютой). Оплата считается совершённой с момента поступления
        подтверждения от платёжной системы.
      </p>
      <p style={p}>
        5.3. По факту оплаты Пользователю выдаётся фискальный кассовый чек в порядке, предусмотренном
        Федеральным законом № 54-ФЗ. Чек направляется на адрес электронной почты, указанный Пользователем
        при оплате.
      </p>
      <p style={p}>
        5.4. Цены могут изменяться Исполнителем в одностороннем порядке. Изменение тарифов не распространяется
        на уже оплаченные Подписки.
      </p>
      <p style={p}>
        5.5. К стоимости Услуг могут применяться промокоды, бонусы за приглашённых пользователей и иные
        предусмотренные Сервисом скидки. Условия их применения указаны на сайте.
      </p>

      <h2 style={h2}>6. Пробный период</h2>
      <p style={p}>
        6.1. Каждому новому Пользователю предоставляется однократный бесплатный пробный период в течение 7
        (семи) календарных дней с расширенным функционалом.
      </p>
      <p style={p}>
        6.2. Пробный период предоставляется один раз на одно физическое лицо и одну учётную запись.
        Активация пробного периода через несколько учётных записей запрещена и может расцениваться как
        злоупотребление с последующей блокировкой.
      </p>
      <p style={p}>
        6.3. По окончании пробного периода Услуги прекращаются автоматически, если Пользователь не оплатил
        Подписку.
      </p>

      <h2 style={h2}>7. Автоматическое продление подписки</h2>
      <p style={p}>
        7.1. При оплате с включённой опцией «Автопродление» Пользователь даёт согласие на регулярное списание
        стоимости Подписки с привязанной банковской карты по истечении оплаченного периода. Сумма списания
        соответствует тарифу на дату списания.
      </p>
      <p style={p}>
        7.2. Пользователь вправе в любое время отключить автопродление и/или отвязать платёжный метод в
        разделе «Настройки» личного кабинета. Отключение действует начиная со следующего расчётного периода.
      </p>
      <p style={p}>
        7.3. Если списание невозможно (недостаточно средств, карта заблокирована и т. п.), Подписка
        прекращается без уведомления.
      </p>

      <h2 style={h2}>8. Возврат денежных средств</h2>
      <p style={p}>
        8.1. Услуги, оказываемые по настоящему Соглашению, в соответствии с п. 1 ст. 26.1 Закона РФ
        № 2300-1 «О защите прав потребителей» относятся к услугам связи, имеющим ограниченное действие во
        времени и предоставляемым непрерывно. Возврат уплаченных средств производится с учётом фактически
        оказанных Услуг.
      </p>
      <p style={p}>
        8.2. Пользователь вправе отказаться от Услуг и потребовать возврата денежных средств:
      </p>
      <ul style={ul}>
        <li>
          в течение <b>14 календарных дней</b> с момента оплаты — при условии, что Услугами он фактически не
          воспользовался (трафик через VPN не передавался, устройства не подключались);
        </li>
        <li>
          в течение всего срока действия Подписки — пропорционально неиспользованному периоду, за вычетом
          фактических расходов Исполнителя.
        </li>
      </ul>
      <p style={p}>
        8.3. Заявление о возврате направляется на электронную почту{' '}
        <a href={`mailto:${OPERATOR.legalEmail}`} style={link}>{OPERATOR.legalEmail}</a> или через Telegram-бот{' '}
        <a href="https://t.me/svoivpn_help_bot" style={link}>@svoivpn_help_bot</a> с указанием email учётной
        записи и реквизитов для возврата. Возврат производится в течение 10 рабочих дней с момента получения
        заявления тем же способом, что и оплата.
      </p>
      <p style={p}>
        8.4. Возврат средств, оплаченных криптовалютой, осуществляется в эквиваленте по курсу на момент
        оплаты, на крипто-кошелёк Пользователя.
      </p>

      <h2 style={h2}>9. Права и обязанности Исполнителя</h2>
      <p style={p}>9.1. Исполнитель вправе:</p>
      <ul style={ul}>
        <li>проводить плановые и внеплановые работы по обслуживанию инфраструктуры с уведомлением Пользователя;</li>
        <li>изменять список доступных VPN-узлов и протоколов в целях улучшения Услуг;</li>
        <li>приостанавливать или прекращать предоставление Услуг при нарушении Пользователем настоящего Соглашения (раздел 11);</li>
        <li>в одностороннем порядке вносить изменения в настоящее Соглашение в порядке, предусмотренном разделом 15.</li>
      </ul>
      <p style={p}>9.2. Исполнитель обязан:</p>
      <ul style={ul}>
        <li>предоставлять Услуги в объёме, предусмотренном выбранным тарифом, в течение оплаченного периода;</li>
        <li>обеспечивать конфиденциальность персональных данных Пользователя в соответствии с Политикой;</li>
        <li>оказывать техническую поддержку через указанные каналы связи в разумные сроки.</li>
      </ul>

      <h2 style={h2}>10. Права и обязанности Пользователя</h2>
      <p style={p}>10.1. Пользователь вправе:</p>
      <ul style={ul}>
        <li>пользоваться Услугами в полном объёме согласно выбранному тарифу;</li>
        <li>обращаться в службу поддержки;</li>
        <li>требовать удаления учётной записи и связанных персональных данных в порядке, установленном Политикой обработки персональных данных.</li>
      </ul>
      <p style={p}>10.2. Пользователь обязан:</p>
      <ul style={ul}>
        <li>соблюдать условия настоящего Соглашения и законодательство Российской Федерации;</li>
        <li>не передавать свои учётные данные и персональную ссылку подключения третьим лицам;</li>
        <li>самостоятельно следить за окончанием срока Подписки;</li>
        <li>использовать Услуги исключительно в целях, не противоречащих закону.</li>
      </ul>

      <h2 style={h2}>11. Ограничения использования</h2>
      <p style={p}>11.1. Запрещается использовать Сервис для:</p>
      <ul style={ul}>
        <li>совершения действий, нарушающих законодательство Российской Федерации, страны фактического пребывания Пользователя или страны размещения VPN-узла;</li>
        <li>распространения экстремистских материалов, материалов с насилием в отношении детей, иной запрещённой информации;</li>
        <li>совершения хакерских атак (DDoS, brute-force, эксплуатация уязвимостей), сканирования сетей без согласия владельцев;</li>
        <li>массовой рассылки спама, фишинга, распространения вредоносного программного обеспечения;</li>
        <li>мошенничества, в том числе финансового;</li>
        <li>злоупотребления полосой пропускания, наносящего ущерб качеству Услуг для других Пользователей;</li>
        <li>попыток обхода технических ограничений Сервиса (HWID, лимит устройств, антифрод).</li>
      </ul>
      <p style={p}>
        11.2. При выявлении подобных действий Исполнитель вправе незамедлительно приостановить или прекратить
        предоставление Услуг без возврата уплаченных средств за оставшийся период. Сохраняется право
        Исполнителя требовать возмещения причинённого ущерба в установленном законом порядке.
      </p>

      <h2 style={h2}>12. Ответственность сторон. Ограничения</h2>
      <p style={p}>
        12.1. Исполнитель не гарантирует абсолютную бесперебойность работы Сервиса в связи с особенностями
        работы сетей связи общего пользования и инфраструктуры третьих лиц. Заявленный ориентир доступности —
        не менее 99% (за исключением плановых работ).
      </p>
      <p style={p}>
        12.2. Исполнитель не несёт ответственности за:
      </p>
      <ul style={ul}>
        <li>невозможность доступа к Сервису по причинам, находящимся вне его контроля (действия операторов связи, провайдеров, государственных органов);</li>
        <li>содержание сторонних сайтов и сервисов, к которым Пользователь обращается через VPN;</li>
        <li>действия Пользователя, нарушающие законодательство;</li>
        <li>косвенные убытки, упущенную выгоду, моральный вред в части, превышающей размер фактически уплаченных Пользователем средств за период, в котором произошло событие.</li>
      </ul>
      <p style={p}>
        12.3. Совокупная ответственность Исполнителя в любом случае ограничивается размером средств,
        фактически уплаченных Пользователем по настоящему Соглашению за последний оплаченный расчётный период.
      </p>

      <h2 style={h2}>13. Форс-мажор</h2>
      <p style={p}>
        13.1. Стороны освобождаются от ответственности за полное или частичное неисполнение обязательств,
        если оно явилось следствием обстоятельств непреодолимой силы (стихийных бедствий, военных действий,
        решений государственных органов, ограничений работы сетей связи, кибератак на инфраструктуру и иных
        обстоятельств вне разумного контроля Сторон).
      </p>

      <h2 style={h2}>14. Срок действия и порядок прекращения</h2>
      <p style={p}>14.1. Соглашение действует до прекращения предоставления Услуг по любому из следующих оснований:</p>
      <ul style={ul}>
        <li>истечение срока Подписки без её продления;</li>
        <li>удаление учётной записи Пользователем;</li>
        <li>блокировка учётной записи Исполнителем при нарушении Соглашения (раздел 11);</li>
        <li>прекращение деятельности Сервиса с уведомлением не менее чем за 30 дней.</li>
      </ul>
      <p style={p}>
        14.2. Прекращение Соглашения не освобождает Стороны от исполнения обязательств, возникших до его
        прекращения.
      </p>

      <h2 style={h2}>15. Изменение условий</h2>
      <p style={p}>
        15.1. Исполнитель вправе в одностороннем порядке вносить изменения в настоящее Соглашение. Актуальная
        редакция размещается по адресу{' '}
        <a href="https://svoiweb.ru/terms" style={link}>svoiweb.ru/terms</a>.
      </p>
      <p style={p}>
        15.2. Существенные изменения доводятся до Пользователя путём публикации в Сервисе либо уведомления
        по электронной почте не менее чем за 7 дней до их вступления в силу.
      </p>
      <p style={p}>
        15.3. Если Пользователь не согласен с изменениями, он вправе расторгнуть Соглашение и потребовать
        возврата средств за неиспользованный период (раздел 8).
      </p>

      <h2 style={h2}>16. Разрешение споров. Применимое право</h2>
      <p style={p}>
        16.1. Настоящее Соглашение регулируется и толкуется в соответствии с законодательством Российской
        Федерации.
      </p>
      <p style={p}>
        16.2. Стороны разрешают споры путём переговоров. Обязательный досудебный порядок: претензия
        направляется на адрес <a href={`mailto:${OPERATOR.legalEmail}`} style={link}>{OPERATOR.legalEmail}</a>{' '}
        и подлежит рассмотрению в течение 30 дней.
      </p>
      <p style={p}>
        16.3. При недостижении согласия споры подлежат рассмотрению в суде по месту нахождения Исполнителя в
        соответствии с подсудностью, установленной процессуальным законодательством РФ. Положение настоящего
        пункта не ограничивает права потребителя на предъявление иска в порядке, предусмотренном Законом РФ
        № 2300-1 «О защите прав потребителей».
      </p>

      <h2 style={h2}>17. Реквизиты Исполнителя</h2>
      <div style={note}>
        Наименование: {OPERATOR.name}
        <br />
        ИНН: {OPERATOR.inn}
        <br />
        ОГРН/ОГРНИП: {OPERATOR.ogrn}
        <br />
        Адрес: {OPERATOR.address}
        <br />
        Банковские реквизиты: {OPERATOR.bankRequisites}
        <br />
        Email для официальной переписки:{' '}
        <a href={`mailto:${OPERATOR.legalEmail}`} style={link}>
          {OPERATOR.legalEmail}
        </a>
        <br />
        Telegram-поддержка:{' '}
        <a href="https://t.me/svoivpn_help_bot" style={link}>@svoivpn_help_bot</a>
      </div>

      <p style={{ ...p, fontSize: 12, color: '#6F6F6F' }}>
        В случае противоречия между русскоязычной и англоязычной редакцией настоящего документа приоритет
        имеет русскоязычная редакция.
      </p>
    </section>
  )
}

function EnTerms() {
  return (
    <section>
      <h1 style={h1}>Terms of Service (Public Offer)</h1>
      <p style={sub}>SvoiVPN service · effective {EFFECTIVE_DATE_EN}</p>

      <div style={note}>
        This English version is provided for informational purposes only. It is a translation of the official
        Russian-language Terms ("Пользовательское соглашение"), which constitute a public offer under
        Articles 437–438 of the Civil Code of the Russian Federation. In case of any discrepancy, the Russian
        text prevails.
      </div>

      <p style={p}>
        These Terms constitute a public offer. The User accepts the offer (Article 438.3 of the Civil Code of
        RF) by registering an account, paying for a subscription, activating the trial, or otherwise using the
        Service.
      </p>

      <h2 style={h2}>1. Definitions</h2>
      <ul style={ul}>
        <li><b>Operator / Provider</b>: {OPERATOR.name}, INN {OPERATOR.inn}, OGRN/OGRNIP {OPERATOR.ogrn}, address: {OPERATOR.address}.</li>
        <li><b>Service "SvoiVPN"</b>: the website <a href="https://svoiweb.ru" style={link}>svoiweb.ru</a>, mobile apps, Telegram bot, and back-end infrastructure that together provide VPN connectivity.</li>
        <li><b>User / Customer</b>: a legally capable natural person entering into this agreement.</li>
        <li><b>Subscription</b>: a paid service period for the chosen plan.</li>
      </ul>

      <h2 style={h2}>2. Subject</h2>
      <p style={p}>
        2.1. The Provider supplies the User with VPN access; the User pays the fees and complies with these
        Terms.
      </p>
      <p style={p}>
        2.2. The Service is deemed delivered from the moment access is provided and throughout the
        Subscription period, regardless of actual usage.
      </p>

      <h2 style={h2}>3. Conclusion of the agreement</h2>
      <p style={p}>
        3.1. The agreement is concluded by acceptance of this offer. Before acceptance the User must read
        these Terms and the <a href="https://svoiweb.ru/privacy" style={link}>Privacy Policy</a>.
      </p>
      <p style={p}>
        3.2. By registering, the User confirms being at least 18 years old, or having the consent of a legal
        guardian.
      </p>

      <h2 style={h2}>4. Account</h2>
      <p style={p}>
        4.1. Registration is via the website (email) or Telegram bot. The User must provide accurate
        information and keep credentials safe. All actions performed under the User's account are deemed to be
        performed by the User.
      </p>

      <h2 style={h2}>5. Pricing and payment</h2>
      <p style={p}>5.1. Current pricing is published at <a href="https://svoiweb.ru" style={link}>svoiweb.ru</a> and in the app. As of the effective date:</p>
      <h3 style={h3}>5.1.1. Base plan:</h3>
      <ul style={ul}>
        <li>1 month — RUB 150;</li>
        <li>3 months — RUB 430;</li>
        <li>1 year — RUB 1,500.</li>
      </ul>
      <h3 style={h3}>5.1.2. Family plan (higher device limit):</h3>
      <ul style={ul}>
        <li>1 month — RUB 250;</li>
        <li>3 months — RUB 700;</li>
        <li>1 year — RUB 2,200.</li>
      </ul>
      <h3 style={h3}>5.1.3. "Bypass BS" plan:</h3>
      <ul style={ul}>
        <li>1 month — RUB 450;</li>
        <li>3 months — RUB 1,250;</li>
        <li>1 year — RUB 4,500.</li>
      </ul>
      <h3 style={h3}>5.1.4. "Bypass BS Family" plan:</h3>
      <ul style={ul}>
        <li>1 month — RUB 750;</li>
        <li>3 months — RUB 2,100;</li>
        <li>1 year — RUB 7,500.</li>
      </ul>

      <p style={p}>
        5.2. Payments are processed via <b>YooKassa</b> (card / SBP) or <b>CryptoBot</b> (crypto). Payment is
        complete once the provider confirms it.
      </p>
      <p style={p}>
        5.3. A fiscal cash receipt is issued in accordance with Federal Law No. 54-FZ and sent to the email
        provided at checkout.
      </p>
      <p style={p}>
        5.4. Prices may change unilaterally. Changes do not apply to subscriptions already paid for.
      </p>

      <h2 style={h2}>6. Trial period</h2>
      <p style={p}>
        6.1. New Users receive a one-time, 7-day free trial. The trial is granted once per natural person and
        per account; circumventing this restriction (multiple accounts) may result in suspension. After the
        trial expires, Service stops automatically unless a Subscription is purchased.
      </p>

      <h2 style={h2}>7. Auto-renewal</h2>
      <p style={p}>
        7.1. With auto-renewal enabled, the User authorizes the Provider to charge the saved payment method at
        the end of each paid period at the then-current price. Auto-renewal can be disabled at any time in the
        account settings; cancellation takes effect from the next period. If a charge fails, the Subscription
        ends without notice.
      </p>

      <h2 style={h2}>8. Refunds</h2>
      <p style={p}>
        8.1. The Service falls under continuously delivered services with limited duration. Refunds are
        calculated taking into account the portion of the Subscription that has been delivered.
      </p>
      <p style={p}>8.2. The User may request a refund:</p>
      <ul style={ul}>
        <li>within <b>14 calendar days</b> from payment, provided the Service has not been actually used (no traffic, no devices connected); a full refund is issued;</li>
        <li>at any time during the Subscription — pro-rata for the unused period, less the Provider's actual costs.</li>
      </ul>
      <p style={p}>
        8.3. Refund requests are sent to <a href={`mailto:${OPERATOR.legalEmail}`} style={link}>{OPERATOR.legalEmail}</a>{' '}
        or via <a href="https://t.me/svoivpn_help_bot" style={link}>@svoivpn_help_bot</a>. Refunds are paid
        within 10 business days using the same method as the original payment.
      </p>
      <p style={p}>8.4. Crypto payments are refunded in equivalent value, calculated at the rate at the moment of payment.</p>

      <h2 style={h2}>9. Provider rights and duties</h2>
      <ul style={ul}>
        <li>perform scheduled and unscheduled maintenance with reasonable notice;</li>
        <li>change the list of available VPN nodes and protocols;</li>
        <li>suspend or terminate Service for breach of §11;</li>
        <li>amend these Terms in accordance with §15;</li>
        <li>provide Service per the chosen plan during the paid period;</li>
        <li>protect the confidentiality of personal data per the Privacy Policy;</li>
        <li>provide technical support via the published channels.</li>
      </ul>

      <h2 style={h2}>10. User rights and duties</h2>
      <ul style={ul}>
        <li>use the Service per the plan;</li>
        <li>contact support;</li>
        <li>request deletion of the account and personal data;</li>
        <li>comply with these Terms and applicable law;</li>
        <li>not share account credentials or the personal subscription link;</li>
        <li>monitor the Subscription expiry date;</li>
        <li>use the Service only for lawful purposes.</li>
      </ul>

      <h2 style={h2}>11. Acceptable use</h2>
      <p style={p}>The User shall not use the Service for:</p>
      <ul style={ul}>
        <li>activity unlawful under Russian law, the law of the User's location, or the law of the VPN node's location;</li>
        <li>distribution of extremist or child-abuse materials, or other prohibited content;</li>
        <li>cyberattacks (DDoS, brute-force, exploits), unauthorized scanning;</li>
        <li>spam, phishing, malware distribution;</li>
        <li>fraud, including financial;</li>
        <li>bandwidth abuse harming Service quality for other Users;</li>
        <li>circumvention of technical limits (HWID, device cap, anti-fraud).</li>
      </ul>
      <p style={p}>
        Upon detection, the Provider may immediately suspend or terminate Service without refund for the
        remaining period and reserves all legal remedies.
      </p>

      <h2 style={h2}>12. Liability and disclaimers</h2>
      <p style={p}>
        12.1. The Provider does not guarantee absolute uninterrupted operation due to the nature of public
        networks and third-party infrastructure. Targeted availability: at least 99% (excluding planned
        maintenance).
      </p>
      <p style={p}>
        12.2. The Provider is not liable for inability to access the Service due to events beyond its control,
        for the content of third-party sites, for User actions in breach of law, or for indirect damages,
        lost profit, or non-pecuniary harm in excess of the amount actually paid by the User for the period
        when the event occurred.
      </p>
      <p style={p}>
        12.3. Aggregate liability is in any case limited to the amount paid by the User for the latest
        Subscription period.
      </p>

      <h2 style={h2}>13. Force majeure</h2>
      <p style={p}>
        Neither party is liable for failure or delay caused by circumstances beyond reasonable control,
        including natural disasters, hostilities, government decisions, network restrictions, cyberattacks
        on infrastructure, etc.
      </p>

      <h2 style={h2}>14. Term and termination</h2>
      <ul style={ul}>
        <li>expiry of the Subscription without renewal;</li>
        <li>account deletion by the User;</li>
        <li>termination by the Provider for breach (§11);</li>
        <li>discontinuation of the Service with at least 30 days' notice.</li>
      </ul>

      <h2 style={h2}>15. Amendments</h2>
      <p style={p}>
        The Provider may amend these Terms unilaterally. Material changes are posted at{' '}
        <a href="https://svoiweb.ru/terms" style={link}>svoiweb.ru/terms</a> and communicated via the Service or
        email at least 7 days before they take effect. If the User disagrees, the User may terminate this
        agreement and request a refund per §8.
      </p>

      <h2 style={h2}>16. Disputes; governing law</h2>
      <p style={p}>
        16.1. These Terms are governed by the laws of the Russian Federation.
      </p>
      <p style={p}>
        16.2. The parties shall first attempt to resolve disputes through negotiation. Mandatory pre-trial
        procedure: a written claim is sent to{' '}
        <a href={`mailto:${OPERATOR.legalEmail}`} style={link}>{OPERATOR.legalEmail}</a> and considered within
        30 days.
      </p>
      <p style={p}>
        16.3. Failing settlement, disputes are heard by the court at the Provider's location, subject to
        jurisdiction rules of the Civil Procedure Code of RF. This does not limit the User's consumer rights
        under Federal Law No. 2300-1.
      </p>

      <h2 style={h2}>17. Provider details</h2>
      <div style={note}>
        Name: {OPERATOR.name}
        <br />
        INN: {OPERATOR.inn} · OGRN/OGRNIP: {OPERATOR.ogrn}
        <br />
        Address: {OPERATOR.address}
        <br />
        Banking: {OPERATOR.bankRequisites}
        <br />
        Legal email: <a href={`mailto:${OPERATOR.legalEmail}`} style={link}>{OPERATOR.legalEmail}</a>
        <br />
        Telegram support: <a href="https://t.me/svoivpn_help_bot" style={link}>@svoivpn_help_bot</a>
      </div>
    </section>
  )
}
