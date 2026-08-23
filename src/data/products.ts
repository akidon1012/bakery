import type { Product } from '../types/Product'


import dli001 from '../assets/images/products/DLI-001.webp'
import dli001_01 from '../assets/images/products/DLI-001_01.webp'
import dli002 from '../assets/images/products/DLI-002.webp'
import dli003 from '../assets/images/products/DLI-003.webp'
import dli004 from '../assets/images/products/DLI-004.webp'

import hrd001 from '../assets/images/products/HRD-001.webp'
import hrd001_01 from '../assets/images/products/HRD-001_01.webp'
import hrd002 from '../assets/images/products/HRD-002.webp'
import hrd003 from '../assets/images/products/HRD-003.webp'
import hrd004 from '../assets/images/products/HRD-004.webp'

import lof001 from '../assets/images/products/LOF-001.webp'
import lof001_01 from '../assets/images/products/LOF-001_01.webp'
import lof002 from '../assets/images/products/LOF-002.webp'
import lof002_01 from '../assets/images/products/LOF-002_01.webp'
import lof003 from '../assets/images/products/LOF-003.webp'
import lof004 from '../assets/images/products/LOF-004.webp'
import lof005 from '../assets/images/products/LOF-005.webp'
import lof006 from '../assets/images/products/LOF-006.webp'
import lof007 from '../assets/images/products/LOF-007.webp'

import swt001 from '../assets/images/products/SWT-001.webp'
import swt002 from '../assets/images/products/SWT-002.webp'
import swt003 from '../assets/images/products/SWT-003.webp'
import swt003_01 from '../assets/images/products/SWT-003_01.webp'

import vno001 from '../assets/images/products/VNO-001.webp'
import vno001_01 from '../assets/images/products/VNO-001_01.webp'
import vno002 from '../assets/images/products/VNO-002.webp'
import vno004 from '../assets/images/products/VNO-004.webp'
import vno005 from '../assets/images/products/VNO-005.webp'
import vno006 from '../assets/images/products/VNO-006.webp'
import vno007 from '../assets/images/products/VNO-007.webp'

export const products: Product[] = [
  {
    id: 'DLI-001',
    name: 'カレーパン',
    category: 'deli',
    categoryLabel: '惣菜パン',
    price: 320,
    stock: 12,
    image: dli001,
    detailImages: [dli001_01],
    description: 'スパイス香る自家製カレーを包んだ人気のカレーパンです。',
  },
  {
    id: 'DLI-002',
    name: 'ウインナーロール',
    category: 'deli',
    categoryLabel: '惣菜パン',
    price: 340,
    stock: 5,
    image: dli002,
    detailImages: [],
    description: 'ジューシーなソーセージをふんわり生地で包みました。',
  },
  {
    id: 'DLI-003',
    name: '塩パン',
    category: 'deli',
    categoryLabel: '惣菜パン',
    price: 220,
    stock: 12,
    image: dli003,
    detailImages: [],
    description: 'バターの香りと塩味がクセになる定番人気商品。',
  },
  {
    id: 'DLI-004',
    name: 'フォカッチャ',
    category: 'deli',
    categoryLabel: '惣菜パン',
    price: 380,
    stock: 5,
    image: dli004,
    detailImages: [],
    description: '香草とオリーブオイルが香るもちもちフォカッチャ。',
  },

  {
    id: 'HRD-001',
    name: 'バゲット',
    category: 'hard',
    categoryLabel: 'ハード系',
    price: 420,
    stock: 6,
    image: hrd001,
    detailImages: [hrd001_01],
    description: '外はパリッと、中はもっちり食感の本格バゲット。',
  },
  {
    id: 'HRD-002',
    name: 'カンパーニュ',
    category: 'hard',
    categoryLabel: 'ハード系',
    price: 480,
    stock: 4,
    image: hrd002,
    detailImages: [],
    description: 'ライ麦を使用した風味豊かな田舎パン。',
  },
  {
    id: 'HRD-003',
    name: 'ブール',
    category: 'hard',
    categoryLabel: 'ハード系',
    price: 460,
    stock: 3,
    image: hrd003,
    detailImages: [],
    description: 'シンプルながら小麦の旨味をしっかり味わえる一品。',
  },
  {
    id: 'HRD-004',
    name: 'ベーコンエピ',
    category: 'hard',
    categoryLabel: 'ハード系',
    price: 460,
    stock: 0,
    image: hrd004,
    detailImages: [],
    description: 'ブラックペッパーを効かせたベーコンを包み込み、香ばしく焼き上げたハード系パン。',
  },

  {
    id: 'LOF-001',
    name: '角食パン',
    category: 'loaf',
    categoryLabel: '食パン',
    price: 1000,
    stock: 8,
    image: lof001,
    detailImages: [lof001_01],
    description: 'しっとりやわらかな口当たりの定番食パン。',
  },
  {
    id: 'LOF-002',
    name: '山型食パン',
    category: 'loaf',
    categoryLabel: '食パン',
    price: 380,
    stock: 6,
    image: lof002,
    detailImages: [lof002_01],
    description: '香ばしい焼き上がりが特徴の山型食パン。',
  },
  {
    id: 'LOF-003',
    name: 'デニッシュ食パン',
    category: 'loaf',
    categoryLabel: '食パン',
    price: 520,
    stock: 4,
    image: lof003,
    detailImages: [],
    description: 'バターをたっぷり折り込んだ贅沢なデニッシュ食パン。',
  },
  {
    id: 'LOF-004',
    name: 'レーズンブレッド',
    category: 'loaf',
    categoryLabel: '食パン',
    price: 480,
    stock: 5,
    image: lof004,
    detailImages: [],
    description: 'ラム酒漬けレーズンをたっぷり使用しました。',
  },
  {
    id: 'LOF-005',
    name: '全粒粉食パン',
    category: 'loaf',
    categoryLabel: '食パン',
    price: 280,
    stock: 10,
    image: lof005,
    detailImages: [],
    description: '香ばしい全粒粉の風味と、もっちり食感を楽しめるやさしい味わいの食パン。',
  },
  {
    id: 'LOF-006',
    name: 'ブリオッシュ食パン',
    category: 'loaf',
    categoryLabel: '食パン',
    price: 320,
    stock: 7,
    image: lof006,
    detailImages: [],
    description: '卵とバターを贅沢に使ったリッチなパン。',
  },
  {
    id: 'LOF-007',
    name: 'チーズブレッド',
    category: 'loaf',
    categoryLabel: '食パン',
    price: 450,
    stock: 5,
    image: lof007,
    detailImages: [],
    description: 'チーズをたっぷり使用した香ばしいブレッド。',
  },
 
  {
    id: 'SWT-001',
    name: 'メロンパン',
    category: 'sweet',
    categoryLabel: '菓子パン',
    price: 240,
    stock: 15,
    image: swt001,
    detailImages: [],
    description: 'サクサク食感が人気の定番メロンパン。',
  },
  {
    id: 'SWT-002',
    name: 'クリームパン',
    category: 'sweet',
    categoryLabel: '菓子パン',
    price: 260,
    stock: 10,
    image: swt002,
    detailImages: [],
    description: '自家製カスタードをたっぷり包みました。',
  },
  {
    id: 'SWT-003',
    name: 'ブリオッシュ',
    category: 'sweet',
    categoryLabel: '菓子パン',
    price: 300,
    stock: 12,
    image: swt003,
    detailImages: [swt003_01],
    description: '卵とバターを贅沢に使ったリッチなパン。',
  },

  {
    id: 'VNO-001',
    name: 'クロワッサン',
    category: 'viennoiserie',
    categoryLabel: 'クロワッサン・デニッシュ',
    price: 320,
    stock: 9,
    image: vno001,
    detailImages: [vno001_01],
    description: '発酵バターを使用したサクサククロワッサン。',
  },
  {
    id: 'VNO-002',
    name: 'ベリーデニッシュ',
    category: 'viennoiserie',
    categoryLabel: 'クロワッサン・デニッシュ',
    price: 420,
    stock: 4,
    image: vno002,
    detailImages: [],
    description: 'ベリーの酸味とカスタードが相性抜群。',
  },
  {
    id: 'VNO-004',
    name: 'コーンデニッシュ',
    category: 'viennoiserie',
    categoryLabel: 'クロワッサン・デニッシュ',
    price: 380,
    stock: 5,
    image: vno004,
    detailImages: [],
    description: '甘みのあるコーンをたっぷり使用。',
  },
  {
    id: 'VNO-005',
    name: 'ツナデニッシュ',
    category: 'viennoiserie',
    categoryLabel: 'クロワッサン・デニッシュ',
    price: 400,
    stock: 3,
    image: vno005,
    detailImages: [],
    description: 'ツナマヨを包んだ食事系デニッシュ。',
  },
  {
    id: 'VNO-006',
    name: 'アップルデニッシュ',
    category: 'viennoiserie',
    categoryLabel: 'クロワッサン・デニッシュ',
    price: 440,
    stock: 2,
    image: vno006,
    detailImages: [],
    description: 'りんごの甘みを楽しめる人気デニッシュ。',
  },
  {
    id: 'VNO-007',
    name: 'パン・オ・レザン',
    category: 'viennoiserie',
    categoryLabel: 'クロワッサン・デニッシュ',
    price: 360,
    stock: 6,
    image: vno007,
    detailImages: [],
    description: 'ラムレーズンをたっぷり巻き込み、香ばしく焼き上げたサクサク食感のデニッシュ。',
  },
]
