'use client'

interface Event {
  id: number
  month: string
  day: string
  title: string
  location: string
  time: string
  category: string
  description: string
}

const EVENTS: Event[] = [
  {
    id: 1,
    month: '02月',
    day: '15',
    title: 'プレミアムコーヒーテイスティング',
    location: '中目黒スペース',
    time: '14:00-16:00',
    category: 'コーヒー愛好家',
    description: '世界各地の希少コーヒー豆を専門家と一緒にテイスティング',
  },
  {
    id: 2,
    month: '03月',
    day: '20',
    title: '春のフライフィッシング体験',
    location: '丹沢湖',
    time: '6:00-15:00',
    category: 'アウトドアスポーツ',
    description: '経験豊富なガイドと一緒に春の釣りを楽しみましょう',
  },
  {
    id: 3,
    month: '03月',
    day: '25',
    title: '現代アート鑑賞ツアー',
    location: '六本木アートミュージアム',
    time: '10:00-12:00',
    category: '文化芸術',
    description: 'キュレーターによる解説付きの特別鑑賞ツアー',
  },
]

export function ClubUpcomingEventsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-text-dark mb-4">
            今後のイベント
          </h2>
          <p className="text-lg text-text-secondary">
            会員限定の特別なイベントとワークショップ{' '}
            <span className="inline-block bg-orange-100 text-primary px-3 py-1 rounded-full text-sm font-semibold">
              準備中
            </span>
          </p>
        </div>

        {/* Events List */}
        <div className="space-y-6">
          {EVENTS.map((event) => (
            <div
              key={event.id}
              className="bg-bg-light rounded-lg border border-gray-200 hover:border-primary hover:shadow-md transition-all duration-300 overflow-hidden"
            >
              <div className="flex flex-col md:flex-row">
                {/* Date Badge */}
                <div className="w-full md:w-32 bg-primary text-white flex flex-col items-center justify-center p-6 md:p-4">
                  <span className="text-sm font-medium">{event.month}</span>
                  <span className="text-4xl font-bold">{event.day}</span>
                </div>

                {/* Event Details */}
                <div className="flex-grow p-6">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    {/* Left Side - Event Info */}
                    <div className="flex-grow">
                      <h3 className="text-xl font-bold text-text-dark mb-2">
                        {event.title}
                      </h3>
                      <div className="flex flex-wrap gap-4 text-sm text-text-secondary mb-3">
                        <div className="flex items-center gap-1">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span>{event.time}</span>
                        </div>
                      </div>
                      <p className="text-text-secondary leading-relaxed">
                        {event.description}
                      </p>
                    </div>

                    {/* Right Side - Category Badge */}
                    <div>
                      <span className="inline-block bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold whitespace-nowrap">
                        {event.category}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
