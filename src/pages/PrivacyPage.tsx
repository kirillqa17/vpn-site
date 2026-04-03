export default function PrivacyPage() {
  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 20px', color: '#fff', background: '#0A0A0A', minHeight: '100vh' }}>
      <h1 style={{ fontSize: 28, marginBottom: 24 }}>Политика конфиденциальности</h1>
      <p style={{ color: '#aaa', marginBottom: 16 }}>Дата вступления в силу: 1 апреля 2026 г.</p>

      <p>Настоящая Политика конфиденциальности описывает, как SvoiVPN ("мы", "наш") собирает, использует и защищает вашу личную информацию при использовании нашего приложения и сервиса.</p>

      <h2 style={{ fontSize: 20, marginTop: 32, marginBottom: 12 }}>1. Какие данные мы собираем</h2>
      <ul style={{ paddingLeft: 20, lineHeight: 1.8 }}>
        <li><strong>Email-адрес</strong> — для регистрации и восстановления пароля</li>
        <li><strong>Telegram ID</strong> — для авторизации через Telegram</li>
        <li><strong>Информация об устройстве</strong> — модель устройства, версия ОС (для ограничения количества устройств)</li>
        <li><strong>Объём переданного трафика</strong> — для учёта использования сервиса</li>
      </ul>

      <h2 style={{ fontSize: 20, marginTop: 32, marginBottom: 12 }}>2. Какие данные мы НЕ собираем</h2>
      <ul style={{ paddingLeft: 20, lineHeight: 1.8 }}>
        <li>Мы <strong>не ведём логов</strong> вашей интернет-активности</li>
        <li>Мы <strong>не записываем</strong> посещённые вами сайты и сервисы</li>
        <li>Мы <strong>не отслеживаем</strong> содержимое вашего трафика</li>
        <li>Мы <strong>не передаём</strong> ваши данные третьим лицам</li>
      </ul>

      <h2 style={{ fontSize: 20, marginTop: 32, marginBottom: 12 }}>3. Как мы используем данные</h2>
      <p>Собранные данные используются исключительно для:</p>
      <ul style={{ paddingLeft: 20, lineHeight: 1.8 }}>
        <li>Предоставления VPN-сервиса</li>
        <li>Управления вашей подпиской</li>
        <li>Технической поддержки</li>
        <li>Предотвращения злоупотреблений сервисом</li>
      </ul>

      <h2 style={{ fontSize: 20, marginTop: 32, marginBottom: 12 }}>4. Безопасность данных</h2>
      <p>Мы используем современные протоколы шифрования (VLESS, Reality, XHTTP) для защиты вашего интернет-трафика. Пароли хранятся в хешированном виде (Argon2). Доступ к серверам ограничен.</p>

      <h2 style={{ fontSize: 20, marginTop: 32, marginBottom: 12 }}>5. Хранение данных</h2>
      <p>Ваши данные хранятся на защищённых серверах. При удалении аккаунта все персональные данные удаляются безвозвратно.</p>

      <h2 style={{ fontSize: 20, marginTop: 32, marginBottom: 12 }}>6. Права пользователя</h2>
      <p>Вы имеете право:</p>
      <ul style={{ paddingLeft: 20, lineHeight: 1.8 }}>
        <li>Запросить копию своих данных</li>
        <li>Потребовать удаления аккаунта и данных</li>
        <li>Изменить или обновить свои данные</li>
      </ul>

      <h2 style={{ fontSize: 20, marginTop: 32, marginBottom: 12 }}>7. Контакты</h2>
      <p>По вопросам конфиденциальности обращайтесь:</p>
      <ul style={{ paddingLeft: 20, lineHeight: 1.8 }}>
        <li>Telegram: <a href="https://t.me/svoivless_support_bot" style={{ color: '#7C6BFF' }}>@svoivless_support_bot</a></li>
        <li>Сайт: <a href="https://svoiweb.ru" style={{ color: '#7C6BFF' }}>svoiweb.ru</a></li>
      </ul>

      <h2 style={{ fontSize: 20, marginTop: 32, marginBottom: 12 }}>8. Изменения</h2>
      <p>Мы оставляем за собой право обновлять данную политику. Актуальная версия всегда доступна по адресу <a href="https://svoiweb.ru/privacy" style={{ color: '#7C6BFF' }}>svoiweb.ru/privacy</a>.</p>
    </div>
  )
}
