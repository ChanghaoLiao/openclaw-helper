import { NextResponse } from 'next/server'

interface Order {
  orderId: string
  pathId: string
  amount: number
  status: 'pending' | 'paid'
  createdAt: number
}

// 内存存储（生产环境应使用数据库）
const orders = new Map<string, Order>()

function generateOrderId(): string {
  const ts = Date.now().toString(36)
  const rand = Math.random().toString(36).substring(2, 8)
  return `OC-${ts}-${rand}`.toUpperCase()
}

export async function POST(request: Request) {
  const body = await request.json()
  const { action } = body

  if (action === 'create') {
    const { pathId } = body
    if (!pathId) {
      return NextResponse.json({ error: '缺少 pathId' }, { status: 400 })
    }

    const orderId = generateOrderId()
    const order: Order = {
      orderId,
      pathId,
      amount: 6.66,
      status: 'pending',
      createdAt: Date.now(),
    }
    orders.set(orderId, order)

    // 模拟二维码：实际项目中对接真实支付接口
    const qrCode = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
      `openclaw-pay://${orderId}?amount=6.66`
    )}`

    return NextResponse.json({
      orderId,
      amount: order.amount,
      qrCode,
    })
  }

  if (action === 'check') {
    const { orderId } = body
    if (!orderId) {
      return NextResponse.json({ error: '缺少 orderId' }, { status: 400 })
    }

    const order = orders.get(orderId)
    if (!order) {
      return NextResponse.json({ error: '订单不存在' }, { status: 404 })
    }

    return NextResponse.json({
      orderId: order.orderId,
      status: order.status,
      pathId: order.pathId,
    })
  }

  if (action === 'simulate-pay') {
    const { orderId } = body
    if (!orderId) {
      return NextResponse.json({ error: '缺少 orderId' }, { status: 400 })
    }

    const order = orders.get(orderId)
    if (!order) {
      return NextResponse.json({ error: '订单不存在' }, { status: 404 })
    }

    order.status = 'paid'
    return NextResponse.json({
      orderId: order.orderId,
      status: 'paid',
      pathId: order.pathId,
    })
  }

  return NextResponse.json({ error: '未知 action' }, { status: 400 })
}
