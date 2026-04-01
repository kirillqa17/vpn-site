import axios from 'axios'

export interface NewsPost {
  id: number
  text: string
  date: string
  media_url?: string
}

// Public endpoint — no auth needed
export async function getNews(): Promise<NewsPost[]> {
  const { data } = await axios.get<NewsPost[]>('/api/web/news')
  return data
}
