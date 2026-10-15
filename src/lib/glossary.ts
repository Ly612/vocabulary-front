import raw from '../data/glossary_enriched.json';

export interface Example {
  zh: string;
  pinyin: string;
  en: string;
}

export interface RawWord {
  id: string;
  type: number;
  word: string;
  pinyin: string;
  cixing: string;
  sort: number;
  levelName: string;
  释义: string;
  短释义: string;
  例句: Example[];
}

export interface Word {
  id: string;
  slug: string;
  word: string;
  pinyin: string;
  cixing: string;
  sort: number;
  levelName: string;
  /** 归一化后的主级别，如 "一级" / "七-九级" */
  level: string;
  definition: string;
  shortDef: string;
  examples: Example[];
}

/** HSK 级别顺序（用于排序与分组） */
export const LEVEL_ORDER = [
  '一级',
  '二级',
  '三级',
  '四级',
  '五级',
  '六级',
  '七-九级',
] as const;

export type Level = (typeof LEVEL_ORDER)[number];

/** 从 levelName（可能形如 "二级（五级）"）提取主级别 */
function normalizeLevel(levelName: string): string {
  const m = levelName.match(/(七-九级|[一二三四五六]级)/);
  return m ? m[1] : levelName;
}

/** 生成 URL 安全的 slug：优先用 id 保证唯一 */
function toSlug(w: RawWord): string {
  return String(w.id);
}

let _cache: Word[] | null = null;

export function getAllWords(): Word[] {
  if (_cache) return _cache;
  const list = (raw as RawWord[]).map((w) => ({
    id: String(w.id),
    slug: toSlug(w),
    word: w.word,
    pinyin: w.pinyin,
    cixing: w.cixing,
    sort: w.sort,
    levelName: w.levelName,
    level: normalizeLevel(w.levelName),
    definition: w['释义'] ?? '',
    shortDef: w['短释义'] ?? '',
    examples: Array.isArray(w['例句']) ? w['例句'] : [],
  }));
  _cache = list;
  return list;
}

export function getWordBySlug(slug: string): Word | undefined {
  return getAllWords().find((w) => w.slug === slug);
}

export function getWordsByLevel(level: string): Word[] {
  return getAllWords().filter((w) => w.level === level);
}

export interface LevelStat {
  level: string;
  count: number;
}

export function getLevelStats(): LevelStat[] {
  const words = getAllWords();
  return LEVEL_ORDER.map((level) => ({
    level,
    count: words.filter((w) => w.level === level).length,
  })).filter((s) => s.count > 0);
}

/** 所有词性（去重排序） */
export function getAllCixing(): string[] {
  const set = new Set<string>();
  for (const w of getAllWords()) if (w.cixing) set.add(w.cixing);
  return Array.from(set).sort();
}

export const PAGE_SIZE = 60;

export function paginate<T>(items: T[], pageSize = PAGE_SIZE) {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  return {
    totalPages,
    totalItems: items.length,
    pageSize,
    pages: Array.from({ length: totalPages }, (_, i) => ({
      page: i + 1,
      items: items.slice(i * pageSize, (i + 1) * pageSize),
    })),
  };
}

/** 供客户端搜索使用的精简索引 */
export interface SearchEntry {
  s: string; // slug
  w: string; // word
  p: string; // pinyin
  c: string; // cixing
  l: string; // level
  d: string; // shortDef
}

export function getSearchIndex(): SearchEntry[] {
  return getAllWords().map((w) => ({
    s: w.slug,
    w: w.word,
    p: w.pinyin,
    c: w.cixing,
    l: w.level,
    d: w.shortDef,
  }));
}
