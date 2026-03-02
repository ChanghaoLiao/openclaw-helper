import { Suspense } from 'react'
import DeployContent from './DeployContent'

export default function DeployPage() {
  return (
    <Suspense fallback={<div style={{ padding: 40, textAlign: 'center' }}>加载中...</div>}>
      <DeployContent />
    </Suspense>
  )
}
