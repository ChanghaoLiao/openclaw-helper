// 完整的对话流程 - 基于官方文档

export type Question = {
  id: string
  question: string
  options?: string[]
  next?: (answer: string, context: Context) => string
}

export type Context = {
  os?: string
  admin?: boolean
  network?: boolean
  disk?: boolean
}

export const questions: Question[] = [
  {
    id: 'os',
    question: '你好！我是 OpenClaw 部署助手。\n\n请问你的电脑是什么系统？',
    options: ['Mac', 'Windows', 'Linux'],
    next: () => 'admin'
  },
  {
    id: 'admin',
    question: '你有管理员密码吗？（安装软件需要管理员权限）',
    options: ['有', '没有'],
    next: () => 'network'
  },
  {
    id: 'network',
    question: '你的电脑能正常上网吗？（需要联网下载软件）',
    options: ['能上网', '不能上网'],
    next: (answer) => answer.includes('不能') ? 'network_help' : 'disk'
  },
  {
    id: 'network_help',
    question: '不能上网的话，有几个解决方案：\n\n1️⃣ 用手机开热点\n2️⃣ 去网吧/朋友家\n3️⃣ 先把电脑搬到有网的地方\n\n你有手机热点吗？或者能去网吧吗？',
    options: ['有热点', '去网吧', '有网线'],
    next: () => 'disk'
  },
  {
    id: 'disk',
    question: '你的电脑C盘还有20G以上空间吗？（安装需要大约2-3G）',
    options: ['有', '没有'],
    next: () => 'install'
  },
  {
    id: 'install',
    question: '好的！现在开始安装！\n\n【第一步】打开终端\n\nMac用户：按 Command + 空格，输入 terminal，回车\n\nWindows用户：按 Win + X，选择 "Windows PowerShell (管理员)"\n\n打开了吗？',
    options: ['打开了', '找不到'],
    next: (answer) => answer.includes('找不到') ? 'install_help' : 'install_command'
  },
  {
    id: 'install_help',
    question: '找不到终端？\n\nMac：在 Launchpad 里搜索 "终端"\nWindows：在开始菜单搜索 "PowerShell"\n\n找到了吗？',
    options: ['找到了', '还是找不到'],
    next: () => 'install_command'
  },
  {
    id: 'install_command',
    question: '好的！现在复制下面的命令，粘贴到终端里，按回车：\n\n```bash\ncurl -fsSL https://openclaw.ai/install.sh | bash\n```\n\nMac可能需要输入密码（输入时不显示**，输入完按回车）\n\n运行了吗？',
    options: ['运行成功', '出错了', '在运行中'],
    next: (answer) => answer.includes('出错了') ? 'install_error' : 'verify'
  },
  {
    id: 'install_error',
    question: '出错了？\n\n请把错误信息复制发给我，我帮你看看是什么问题。',
    next: () => 'install_command'
  },
  {
    id: 'verify',
    question: '安装成功了！\n\n现在检查一下有没有装好，运行：\n\n```bash\nopenclaw --version\n```\n\n告诉我显示什么？',
    next: () => 'onboard'
  },
  {
    id: 'onboard',
    question: '好的！现在运行初始化向导：\n\n```bash\nopenclaw onboard --install-daemon\n```\n\n会引导你设置聊天渠道（可以选 WhatsApp、Discord 等）。\n\n设置好了吗？',
    next: () => 'dashboard'
  },
  {
    id: 'dashboard',
    question: '太棒了！最后一步：\n\n```bash\nopenclaw dashboard\n```\n\n这会打开一个网页，你就可以和我对话了！\n\n打开了吗？🎉',
    next: () => 'finish'
  },
  {
    id: 'finish',
    question: '恭喜你！OpenClaw 已经安装完成！\n\n现在你可以：\n- 在网页和我对话\n- 配置更多渠道\n- 安装更多技能\n\n有其他问题随时问我！'
  }
]
