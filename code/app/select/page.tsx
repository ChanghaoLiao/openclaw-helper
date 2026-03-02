'use client'

import { useRouter } from 'next/navigation'
import { deploymentPaths } from '@/lib/steps'

export default function SelectPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 crystal-base">
      {/* 动态虹彩背景层 */}
      <div className="fixed inset-0 iridescent pointer-events-none z-0" />
      
      <div className="relative z-10 text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-2 text-iridescent">
          OpenClaw 部署教练
        </h1>
        <p className="text-gray-500">选择你的部署方式，我会一步步带你完成</p>
      </div>

      <div className="grid gap-6 w-full max-w-3xl sm:grid-cols-3 relative z-10">
        {deploymentPaths.map((path) => (
          <button
            key={path.id}
            onClick={() => router.push(`/deploy?path=${path.id}`)}
            className="glass-panel flex flex-col items-center gap-3 rounded-2xl p-8 text-center transition-all hover:scale-[1.02]"
          >
            <span className="text-4xl float-up">{path.icon}</span>
            <span className="text-lg font-semibold text-gray-800">{path.name}</span>
            <span className="text-sm text-gray-500">{path.description}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
