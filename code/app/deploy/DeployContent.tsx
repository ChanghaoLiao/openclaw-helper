'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { getPathById } from '@/lib/steps'
import type { Step } from '@/lib/steps'

export default function DeployContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathId = searchParams.get('path') || ''
  const deployPath = getPathById(pathId)

  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set())
  const [expandedError, setExpandedError] = useState<string | null>(null)

  if (!deployPath) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 crystal-base">
        <div className="glass-panel rounded-2xl p-8 text-center">
          <p className="text-xl text-gray-600 mb-4">未找到部署路径</p>
          <button
            onClick={() => router.push('/select')}
            className="shadow-md px-6 py-2 rounded-xl text-gray-800 font-medium"
          >
            返回选择
          </button>
        </div>
      </div>
    )
  }

  const currentStepIndex = deployPath.steps.findIndex(
    (s) => !completedSteps.has(s.id)
  )
  const allDone = currentStepIndex === -1

  function handleComplete(step: Step) {
    setCompletedSteps((prev) => new Set(prev).add(step.id))
  }

  return (
    <div className="min-h-screen flex flex-col items-center p-6 pb-20 crystal-base">
      {/* 动态虹彩背景层 */}
      <div className="fixed inset-0 iridescent pointer-events-none z-0" />
      
      <div className="w-full max-w-2xl relative z-10">
        {/* Header */}
        <button
          onClick={() => router.push('/select')}
          className="text-sm text-gray-700 hover:text-gray-700 transition mb-6 inline-flex items-center gap-1"
        >
          ← 返回选择
        </button>

        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{deployPath.icon}</span>
          <h1 className="text-2xl font-bold text-gray-800">{deployPath.name}</h1>
        </div>
        <p className="text-gray-700 mb-8">{deployPath.description}</p>

        {/* Progress bar */}
        <div className="flex items-center gap-1 mb-10">
          {deployPath.steps.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                i < completedSteps.size
                  ? 'bg-cosmic-glow'
                  : i === currentStepIndex
                    ? 'bg-gray-400'
                    : 'bg-gray-200'
              }`}
            />
          ))}
        </div>

        {/* Steps */}
        <div className="flex flex-col gap-4">
          {deployPath.steps.map((step, index) => {
            const isCompleted = completedSteps.has(step.id)
            const isCurrent = index === currentStepIndex
            const isLocked = !isCompleted && !isCurrent

            return (
              <div
                key={step.id}
                className={`glass-panel rounded-2xl p-6 transition-all ${
                  isCompleted
                    ? 'border-cosmic-glow/30'
                    : isCurrent
                      ? 'border-gray-300 cosmic-glow'
                      : 'border-gray-200 opacity-40'
                }`}
              >
                {/* Step header */}
                <div className="flex items-start gap-3">
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      isCompleted
                        ? 'bg-cosmic-orange text-white'
                        : isCurrent
                          ? 'bg-gray-700 text-white'
                          : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {isCompleted ? '✓' : index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg font-semibold text-gray-800">{step.title}</h2>
                    <p className="text-sm text-gray-700 mt-1">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Step body - only show for current or completed */}
                {!isLocked && (
                  <div className="mt-4 ml-11 flex flex-col gap-3">
                    {/* Command */}
                    {step.command && (
                      <div>
                        <span className="text-xs text-gray-600 uppercase tracking-wide">
                          执行命令
                        </span>
                        <pre className="mt-1 bg-gray-100/80 rounded-lg p-3 text-sm text-gray-700 overflow-x-auto font-mono">
                          <code>{step.command}</code>
                        </pre>
                      </div>
                    )}

                    {/* Verify */}
                    {step.verify && (
                      <div>
                        <span className="text-xs text-gray-600 uppercase tracking-wide">
                          验证命令
                        </span>
                        <pre className="mt-1 bg-gray-100/80 rounded-lg p-3 text-sm text-cosmic-orange overflow-x-auto font-mono">
                          <code>{step.verify}</code>
                        </pre>
                      </div>
                    )}

                    {/* Official source */}
                    <a
                      href={step.official_source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-cosmic-orange hover:underline"
                    >
                      官方文档 →
                    </a>

                    {/* Common errors */}
                    {step.common_errors && step.common_errors.length > 0 && (
                      <div>
                        <button
                          onClick={() =>
                            setExpandedError(
                              expandedError === step.id ? null : step.id
                            )
                          }
                          className="text-xs text-burgundy-500 hover:text-burgundy-600 transition"
                        >
                          {expandedError === step.id
                            ? '收起常见问题 ▲'
                            : '遇到问题？▼'}
                        </button>
                        {expandedError === step.id && (
                          <div className="mt-2 flex flex-col gap-2">
                            {step.common_errors.map((err, i) => (
                              <div
                                key={i}
                                className="rounded-lg bg-burgundy-50 border border-burgundy-100 p-3 text-sm"
                              >
                                <p className="text-burgundy-600 font-mono text-xs">
                                  {err.error}
                                </p>
                                <p className="text-gray-600 mt-1">
                                  → {err.fix}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Complete button */}
                    {isCurrent && (
                      <button
                        onClick={() => handleComplete(step)}
                        className="mt-2 self-start px-5 py-2 rounded-xl bg-cosmic-orange hover:brightness-110 active:scale-95 transition text-sm font-medium text-white shadow-md"
                      >
                        已完成此步骤 →
                      </button>
                    )}
                  </div>
                )}

                {/* Lock hint */}
                {isLocked && (
                  <p className="mt-2 ml-11 text-xs text-gray-600">
                    请先完成上一步
                  </p>
                )}
              </div>
            )
          })}
        </div>

        {/* All done */}
        {allDone && (
          <div className="mt-10 text-center glass-panel rounded-2xl p-8 border-cosmic-glow/30">
            <p className="text-4xl mb-3">🎉</p>
            <h2 className="text-xl font-bold text-gray-800">部署完成！</h2>
            <p className="text-gray-700 mt-2 text-sm">
              所有步骤已完成，OpenClaw 应该已经在运行了
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
