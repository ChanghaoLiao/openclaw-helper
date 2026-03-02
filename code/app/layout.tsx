import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'OpenClaw 部署教练',
  description: '一步步帮你安装 OpenClaw',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  )
}
