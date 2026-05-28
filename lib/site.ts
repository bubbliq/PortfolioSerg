export const site = {
  name: 'Сергей Рудаков',
  role: 'Product Designer',
  shortBio:
    'Проектирую мобильные и веб-интерфейсы. Веду полный цикл — от исследования до внедрения, опираясь на данные и интересы пользователей.',
  location: 'Санкт-Петербург',
  experienceYears: '4+ года',
  telegram: 'https://t.me/rudakov_sa',
  telegramHandle: '@rudakov_sa',
  cv: '/CV_RudakovSA.pdf',
  email: 'rudakov.sa2940@gmail.com',
  behance: 'https://www.behance.net/rudakov_sa',
};

export function withBase(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
  if (!path) return path;
  if (path.startsWith('http')) return path;
  return `${base}${path}`;
}
