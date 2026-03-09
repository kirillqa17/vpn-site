export const TARIFF_NAMES: Record<string, string> = {
  base: 'Базовый',
  family: 'Семейный',
  bsbase: 'Базовый PRO',
  bsfamily: 'Семейный PRO',
  trial: 'Пробный',
  free: 'Бесплатный',
}

export const TARIFF_DEVICES: Record<string, number> = {
  base: 2,
  family: 10,
  bsbase: 2,
  bsfamily: 10,
}

export const TARIFF_FEATURES: Record<string, string[]> = {
  base: ['2 устройства', '4 локации', 'Безлимитный трафик', 'YouTube без рекламы'],
  family: ['10 устройств', '4 локации', 'Безлимитный трафик', 'YouTube без рекламы'],
  bsbase: ['2 устройства', '4 локации', 'Безлимитный трафик', 'Обход белых списков'],
  bsfamily: ['10 устройств', '4 локации', 'Безлимитный трафик', 'Обход белых списков'],
}

export const DURATION_LABELS: Record<string, string> = {
  '1m': '1 месяц',
  '3m': '3 месяца',
  '1y': '1 год',
}

export const DURATION_DAYS: Record<string, number> = {
  '1m': 30,
  '3m': 90,
  '1y': 365,
}

export const BOT_USERNAME = 'svoivless_bot'
