import { NextResponse } from 'next/server'
import { questions, type Context } from '@/lib/flow'

const sessions = new Map<string, { step: number, context: Context, answers: Record<string, string> }>()

function getSession(id: string) {
  if (!sessions.has(id)) {
    sessions.set(id, { step: 0, context: {}, answers: {} })
  }
  return sessions.get(id)!
}

// 关键词匹配函数
function matchAnswer(answer: string, options: string[]): string | null {
  const lower = answer.toLowerCase()
  
  for (const opt of options) {
    const optLower = opt.toLowerCase()
    // 完全匹配
    if (lower === optLower) return opt
    // 包含匹配
    if (lower.includes(optLower) || optLower.includes(lower)) return opt
  }
  return null
}

export async function POST(request: Request) {
  const { message, sessionId = 'default' } = await request.json()
  const session = getSession(sessionId)
  
  const currentQ = questions[session.step]
  
  // 第一次请求 - 返回第一个问题
  if (!message) {
    return NextResponse.json({ 
      reply: currentQ?.question || '你好！',
      step: session.step,
      done: false,
      totalSteps: questions.length,
      progress: 0
    })
  }
  
  let reply = ''
  let nextStepFound = false
  
  if (currentQ.options) {
    // 关键词匹配
    const matched = matchAnswer(message, currentQ.options)
    
    if (matched) {
      // 保存答案
      session.answers[currentQ.id] = matched
      
      // 更新上下文
      if (currentQ.id === 'os') {
        session.context.os = matched.toLowerCase()
      } else if (currentQ.id === 'admin') {
        session.context.admin = matched.includes('有')
      } else if (currentQ.id === 'network') {
        session.context.network = !matched.includes('不能')
      } else if (currentQ.id === 'disk') {
        session.context.disk = matched.includes('有')
      }
      
      // 找下一个问题
      if (currentQ.next) {
        const nextId = currentQ.next(matched, session.context)
        const nextIndex = questions.findIndex(q => q.id === nextId)
        if (nextIndex >= 0) {
          session.step = nextIndex
          nextStepFound = true
        }
      }
    } else {
      reply = '请选择：' + currentQ.options.join(' / ')
    }
  }
  
  // 获取当前问题回复
  if (!reply && nextStepFound) {
    const nextQ = questions[session.step]
    reply = nextQ?.question || '安装已完成！🎉'
  } else if (!reply) {
    const nextQ = questions[session.step]
    reply = nextQ?.question || '安装已完成！🎉'
  }
  
  return NextResponse.json({ 
    reply,
    step: session.step,
    done: session.step >= questions.length - 1,
    totalSteps: questions.length,
    progress: Math.round((session.step / (questions.length - 1)) * 100)
  })
}
