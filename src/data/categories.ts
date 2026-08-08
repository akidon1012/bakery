import type { Category } from '../types/Category'

export const categories: Category[] = [
  {
    value: 'all',
    label: 'すべて',
    code: 'ALL',
  },
  {
    value: 'hard',
    label: 'ハード系',
    code: 'HRD',
  },
  {
    value: 'loaf',
    label: '食パン',
    code: 'LOF',
  },
  {
    value: 'viennoiserie',
    label: 'クロワッサン・デニッシュ',
    code: 'VNO',
  },
  {
    value: 'sweet',
    label: '菓子パン',
    code: 'SWT',
  },
  {
    value: 'deli',
    label: '惣菜パン',
    code: 'DLI',
  },
]
