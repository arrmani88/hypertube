const langFlags = {
  aa: '🇦🇫', // Afar - Afghanistan flag
  ab: '🇦🇲', // Abkhazian - Abkhazia flag
  af: '🇿🇦', // Afrikaans - South Africa flag
  ak: '🇬🇭', // Akan - Ghana flag
  am: '🇪🇹', // Amharic - Ethiopia flag
  an: '🇪🇸', // Aragonese - Spain flag
  ar: '🇸🇦', // Arabic - Saudi Arabia flag
  as: '🇮🇳', // Assamese - India flag
  av: '🇷🇺', // Avaric - Russia flag
  ay: '🇧🇴', // Aymara - Bolivia flag
  az: '🇦🇿', // Azerbaijani - Azerbaijan flag
  ba: '🇷🇺', // Bashkir - Russia flag
  be: '🇧🇾', // Belarusian - Belarus flag
  bg: '🇧🇬', // Bulgarian - Bulgaria flag
  bh: '🇮🇳', // Bihari - India flag
  bi: '🇻🇺', // Bislama - Vanuatu flag
  bm: '🇲🇱', // Bambara - Mali flag
  bn: '🇧🇩', // Bengali - Bangladesh flag
  bo: '🇹🇳', // Tibetan - Tibet flag
  br: '🇫🇷', // Breton - France flag
  bs: '🇧🇦', // Bosnian - Bosnia and Herzegovina flag
  ca: '🇪🇸', // Catalan - Spain flag
  ce: '🇷🇺', // Chechen - Russia flag
  ch: '🇺🇸', // Chamorro - Guam flag
  co: '🇫🇷', // Corsican - France flag
  cr: '🇨🇦', // Cree - Canada flag
  cs: '🇨🇿',
  cu: '🇺🇦', // Church Slavic - Ukraine flag
  cv: '🇷🇺', // Chuvash - Russia flag
  cy: '🏴󠁧󠁢󠁷󠁬󠁳󠁿', // Welsh - Wales flag
  da: '🇩🇰', // Danish - Denmark flag
  de: '🇩🇪', // German - Germany flag
  dv: '🇲🇻', // Divehi - Maldives flag
  dz: '🇧🇹', // Dzongkha - Bhutan flag
  ee: '🇬🇭', // Ewe - Ghana flag
  el: '🇬🇷', // Greek - Greece flag
  en: '🇬🇧', // English - United Kingdom flag
  eo: '🇺🇳', // Esperanto - United Nations flag
  es: '🇪🇸', // Spanish - Spain flag
  et: '🇪🇪', // Estonian - Estonia flag
  eu: '🇪🇸', // Basque - Spain flag
  fa: '🇮🇷', // Persian - Iran flag
  ff: '🇸🇳', // Fulah - Senegal flag
  fi: '🇫🇮',
  fj: '🇫🇯', // Fijian - Fiji flag
  fo: '🇫🇴', // Faroese - Faroe Islands flag
  fr: '🇫🇷', // French - France flag
  fy: '🇳🇱', // Western Frisian - Netherlands flag
  ga: '🇮🇪', // Irish - Ireland flag
  gd: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', // Scottish Gaelic - Scotland flag
  gl: '🇪🇸', // Galician - Spain flag
  gn: '🇵🇾', // Guarani - Paraguay flag
  gu: '🇮🇳', // Gujarati - India flag
  gv: '🇮🇲', // Manx - Isle of Man flag
  ha: '🇳🇬', // Hausa - Nigeria flag
  he: '🇮🇱', // Hebrew - Israel flag
  hi: '🇮🇳', // Hindi - India flag
  ho: '🇵🇬', // Hiri Motu - Papua New Guinea flag
  hr: '🇭🇷', // Croatian - Croatia flag
  ht: '🇭🇹', // Haitian - Haiti flag
  hu: '🇭🇺', // Hungarian - Hungary flag
  hy: '🇦🇲', // Armenian - Armenia flag
  hz: '🇳🇦', // Herero - Namibia flag
  ia: '🏳', // Interlingua - International flag
  id: '🇮🇩', // Indonesian - Indonesia flag
  ie: '🏳', // Interlingue - International flag
  ig: '🇳🇬', // Igbo - Nigeria flag
  ii: '🇨🇳', // Sichuan Yi - China flag
  ik: '🇺🇸', // Inupiaq - United States flag
  io: '🇺🇳', // Ido - United Nations flag
  is: '🇮🇸', // Icelandic - Iceland flag
  it: '🇮🇹', // Italian - Italy flag
  iu: '🇨🇦', // Inuktitut - Canada flag
  ja: '🇯🇵', // Japanese - Japan flag
  jv: '🇮🇩', // Javanese - Indonesia flag
  ka: '🇬🇪', // Georgian - Georgia flag
  kg: '🇨🇩', // Kongo - Democratic Republic of the Congo flag
  ki: '🇰🇪', // Kikuyu - Kenya flag
  kj: '🇦🇴', // Kuanyama - Angola flag
  kk: '🇰🇿', // Kazakh - Kazakhstan flag
  kl: '🇬🇱', // Kalaallisut - Greenland flag
  km: '🇰🇭', // Khmer - Cambodia flag
  kn: '🇮🇳', // Kannada - India flag
  ko: '🇰🇷', // Korean - South Korea flag
  kr: '🇰🇪', // Kanuri - Kenya flag
  ks: '🇮🇳', // Kashmiri - India flag
  ku: '🇹🇷', // Kurdish - Turkey flag
  kv: '🇷🇺', // Komi - Russia flag
  kw: '🏴󠁧󠁢󠁷󠁬󠁳󠁿', // Cornish - Wales flag
  ky: '🇰🇬', // Kirghiz - Kyrgyzstan flag
  la: '🇻🇦', // Latin - Vatican City flag
  lb: '🇱🇺', // Luxembourgish - Luxembourg flag
  lg: '🇺🇬', // Ganda - Uganda flag
  li: '🇳🇱', // Limburgan - Netherlands flag
  ln: '🇨🇩', // Lingala - Democratic Republic of the Congo flag
  lo: '🇱🇦', // Lao - Laos flag
  lt: '🇱🇹', // Lithuanian - Lithuania flag
  lu: '🇨🇬', // Luba-Katanga - Congo flag
  lv: '🇱🇻', // Latvian - Latvia flag
  mg: '🇲🇬', // Malagasy - Madagascar flag
  mh: '🇺🇸', // Marshallese - Marshall Islands flag
  mi: '🇳🇺', // Maori - New Zealand flag
  mk: '🇲🇰', // Macedonian - North Macedonia flag
  ml: '🇮🇳', // Malayalam - India flag
  mn: '🇲🇳', // Mongolian - Mongolia flag
  mo: '🇲🇩', // Moldavian - Moldova flag
  mr: '🇮🇳', // Marathi - India flag
  ms: '🇲🇾', // Malay - Malaysia flag
  mt: '🇲🇹', // Maltese - Malta flag
  my: '🇲🇲', // Burmese - Myanmar flag
  na: '🇳🇦', // Nauru - Nauru flag
  nb: '🇳🇴', // Norwegian Bokmål - Norway flag
  nd: '🇿🇦', // North Ndebele - South Africa flag
  ne: '🇳🇵', // Nepali - Nepal flag
  ng: '🇳🇬', // Ndonga - Angola flag
  nl: '🇳🇱', // Dutch - Netherlands flag
  nn: '🇳🇴', // Norwegian Nynorsk - Norway flag
  no: '🇳🇴', // Norwegian - Norway flag
  nr: '🇿🇦', // South Ndebele - South
  nr: '🇿🇦', // South Ndebele - South Africa flag
  nv: '🇺🇸', // Navajo - United States flag
  ny: '🇲🇼', // Chichewa - Malawi flag
  oc: '🇫🇷', // Occitan - France flag
  oj: '🇨🇦', // Ojibwa - Canada flag
  om: '🇪🇹', // Oromo - Ethiopia flag
  or: '🇮🇳', // Oriya - India flag
  os: '🇷🇺', // Ossetian - Russia flag
  pa: '🇮🇳', // Panjabi - India flag
  pi: '🇮🇳', // Pali - India flag
  pl: '🇵🇱', // Polish - Poland flag
  ps: '🇦🇫', // Pashto - Afghanistan flag
  pt: '🇵🇹', // Portuguese - Portugal flag
  qu: '🇵🇪', // Quechua - Peru flag
  rm: '🇨🇭', // Romansh - Switzerland flag
  rn: '🇧🇮', // Rundi - Burundi flag
  ro: '🇷🇴', // Romanian - Romania flag
  ru: '🇷🇺', // Russian - Russia flag
  rw: '🇷🇼', // Kinyarwanda - Rwanda flag
  sa: '🇮🇳', // Sanskrit - India flag
  sc: '🇮🇹', // Sardinian - Italy flag
  sd: '🇵🇰', // Sindhi - Pakistan flag
  se: '🇳🇴', // Northern Sami - Norway flag
  sg: '🇨🇬', // Sango - Congo flag
  si: '🇱🇰', // Sinhala - Sri Lanka flag
  sk: '🇸🇰', // Slovak - Slovakia flag
  sl: '🇸🇮', // Slovenian - Slovenia flag
  sm: '🇼🇸', // Samoan - Samoa flag
  sn: '🇿🇼', // Shona - Zimbabwe flag
  so: '🇸🇴', // Somali - Somalia flag
  sq: '🇦🇱', // Albanian - Albania flag
  sr: '🇷🇸', // Serbian - Serbia flag
  ss: '🇿🇦', // Swati - South Africa flag
  st: '🇿🇦', // Southern Sotho - South Africa flag
  su: '🇸🇬', // Sundanese - Indonesia flag
  sv: '🇸🇪', // Swedish - Sweden flag
  sw: '🇹🇿', // Swahili - Tanzania flag
  ta: '🇮🇳', // Tamil - India flag
  te: '🇮🇳', // Telugu - India flag
  tg: '🇹🇯', // Tajik - Tajikistan flag
  th: '🇹🇭', // Thai - Thailand flag
  ti: '🇪🇹', // Tigrinya - Ethiopia flag
  tk: '🇹🇲', // Turkmen - Turkmenistan flag
  tl: '🇵🇭', // Tagalog - Philippines flag
  tn: '🇿🇦', // Tswana - South Africa flag
  to: '🇹🇴', // Tonga - Tonga flag
  tr: '🇹🇷', // Turkish - Turkey flag
  ts: '🇿🇦', // Tsonga - South Africa flag
  tt: '🇷🇺', // Tatar - Russia flag
  tw: '🇹🇼', // Twi - Ghana flag
  ty: '🇵🇫', // Tahitian - French Polynesia flag
  ug: '🇺🇬', // Uighur - China flag
  uk: '🇺🇦', // Ukrainian - Ukraine flag
  ur: '🇵🇰', // Urdu - Pakistan flag
  uz: '🇺🇿', // Uzbek - Uzbekistan flag
  ve: '🇿🇦', // Venda - South Africa flag
  vi: '🇻🇳', // Vietnamese - Vietnam flag
  vo: '🇺🇳', // Volapük - United Nations flag
  wa: '🇧🇪', // Walloon - Belgium flag
  wo: '🇸🇳', // Wolof - Senegal flag
  xh: '🇿🇦', // Xhosa - South Africa flag
  yi: '🇮🇱', // Yiddish - Israel flag
  yo: '🇳🇬', // Yoruba - Nigeria flag
  za: '🇨🇳', // Zhuang - China flag
  zh: '🇨🇳', // Chinese - China flag
  zu: '🇿🇦' // Zulu - South Africa flag
}