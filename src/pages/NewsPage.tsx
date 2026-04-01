import { useQuery } from '@tanstack/react-query'
import { Newspaper } from 'lucide-react'
import { getNews } from '../api/news'
import Spinner from '../components/ui/Spinner'

export default function NewsPage() {
  const { data: posts, isLoading } = useQuery({
    queryKey: ['news'],
    queryFn: getNews,
    staleTime: 5 * 60 * 1000,
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Spinner size="lg" />
      </div>
    )
  }

  return (
    <div className="space-y-4 animate-fade-in">
      <h1 className="text-xl font-bold">Новости</h1>

      {!posts || posts.length === 0 ? (
        <div className="glass-card p-8 text-center">
          <Newspaper className="w-10 h-10 mx-auto mb-3 text-surface-600" />
          <p className="text-sm text-surface-400">Пока нет новостей</p>
        </div>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="glass-card p-4 space-y-2">
            {post.media_url && (
              <img
                src={post.media_url}
                alt=""
                className="rounded-xl w-full max-h-64 object-cover"
              />
            )}
            <p className="text-sm text-surface-200 whitespace-pre-wrap leading-relaxed">
              {post.text}
            </p>
            <p className="text-[11px] text-surface-500">
              {new Date(post.date).toLocaleDateString('ru-RU', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>
        ))
      )}
    </div>
  )
}
