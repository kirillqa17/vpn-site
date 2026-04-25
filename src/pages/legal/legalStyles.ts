import type React from 'react'

export const h1: React.CSSProperties = {
  fontSize: 26,
  fontWeight: 700,
  marginTop: 28,
  marginBottom: 6,
  letterSpacing: '-0.01em',
}
export const sub: React.CSSProperties = { color: '#6F6F6F', fontSize: 13, marginBottom: 16 }
export const h2: React.CSSProperties = {
  fontSize: 17,
  fontWeight: 600,
  marginTop: 28,
  marginBottom: 8,
  color: '#F2F2F2',
}
export const h3: React.CSSProperties = {
  fontSize: 14,
  fontWeight: 600,
  marginTop: 16,
  marginBottom: 6,
  color: '#E5E5E5',
}
export const p: React.CSSProperties = { color: '#B5B5B5', lineHeight: 1.65, margin: '8px 0' }
export const ul: React.CSSProperties = {
  paddingLeft: 22,
  color: '#B5B5B5',
  lineHeight: 1.75,
  margin: '8px 0',
}
export const link: React.CSSProperties = { color: '#00D678', textDecoration: 'none' }
export const note: React.CSSProperties = {
  background: '#1A1A1A',
  border: '1px solid rgba(255,255,255,0.06)',
  borderRadius: 12,
  padding: '12px 14px',
  fontSize: 13,
  color: '#B5B5B5',
  lineHeight: 1.5,
  margin: '14px 0',
}

export type Lang = 'ru' | 'en'

export function langToggleStyles(selected: boolean): React.CSSProperties {
  return {
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
  }
}

// Operator placeholders. Replace at render time once the legal entity is set.
// Until then, we render an obvious placeholder so reviewers can see what's missing.
export const OPERATOR = {
  name: '[ИП / ООО — наименование оператора]',
  inn: '[ИНН]',
  ogrn: '[ОГРН / ОГРНИП]',
  address: '[Юридический адрес оператора]',
  bankRequisites: '[Расчётный счёт, БИК, банк]',
  contactEmail: 'support@svoiweb.ru',
  legalEmail: '[Email для официальной переписки]',
  rkn: '[Регистрационный номер оператора в реестре Роскомнадзора, при наличии]',
}
