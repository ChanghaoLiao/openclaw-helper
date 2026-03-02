export interface Step {
  id: string
  title: string
  description: string
  official_source: string
  command?: string
  verify?: string
  common_errors?: { error: string; fix: string }[]
}

export interface DeploymentPath {
  id: string
  name: string
  icon: string
  description: string
  steps: Step[]
}

const macSteps: Step[] = [
  {
    id: 'mac-1',
    title: '检查 Node.js 22+',
    description: '打开终端（Command + 空格，输入 terminal），检查是否已安装 Node.js 22 或更高版本。如果没有，用 Homebrew 安装：brew install node',
    official_source: 'https://docs.openclaw.ai/start/getting-started',
    command: 'node --version',
    verify: 'node --version',
    common_errors: [
      { error: 'command not found: node', fix: '未安装 Node.js，先安装 Homebrew（brew.sh），然后运行：brew install node' },
      { error: '版本低于 v22', fix: '版本太旧，运行 brew upgrade node 升级到最新版' },
      { error: 'brew: command not found', fix: '需要先安装 Homebrew：/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"' },
    ],
  },
  {
    id: 'mac-2',
    title: '安装 OpenClaw',
    description: '使用 npm 全局安装 OpenClaw CLI。安装脚本会自动检测 macOS 环境并配置。',
    official_source: 'https://docs.openclaw.ai/install',
    command: 'npm install -g openclaw@latest',
    verify: 'openclaw --version',
    common_errors: [
      { error: 'EACCES: permission denied', fix: '权限不足，使用 sudo npm install -g openclaw@latest，或配置 npm 全局目录：npm config set prefix ~/.npm-global' },
      { error: 'npm install failed for openclaw@latest', fix: '安装失败，尝试：1) 检查网络 2) 清除缓存 npm cache clean --force 3) 重试安装' },
      { error: 'SHARP_IGNORE_GLOBAL_LIBVIPS 相关报错', fix: '这是 sharp 图片库的问题，运行：env SHARP_IGNORE_GLOBAL_LIBVIPS=1 npm install -g openclaw@latest' },
      { error: 'npm: command not found', fix: 'npm 随 Node.js 一起安装，回到第一步确保 Node.js 已正确安装' },
    ],
  },
  {
    id: 'mac-3',
    title: '运行 Onboarding',
    description: '运行 onboarding 向导完成初始配置。会显示安全警告，阅读后选择 Yes 继续。这会设置你的 OpenClaw 配置文件（~/.openclaw/openclaw.json）。',
    official_source: 'https://docs.openclaw.ai/start/onboarding',
    command: 'openclaw onboard',
    verify: 'ls ~/.openclaw/openclaw.json',
    common_errors: [
      { error: 'openclaw: command not found', fix: '安装后终端可能需要重新打开，或检查 npm 全局 bin 是否在 PATH 中：echo $PATH' },
      { error: '选了 No 退出了', fix: '重新运行 openclaw onboard，在安全提示处选择 Yes 继续' },
      { error: 'Config file already exists', fix: '已经 onboard 过了，可以跳过此步。如需重新配置：openclaw onboard --force' },
    ],
  },
  {
    id: 'mac-4',
    title: '检查 Gateway 状态',
    description: '检查 OpenClaw Gateway 是否正常运行。Gateway 是 OpenClaw 的核心服务，默认监听 127.0.0.1:18789（仅本地访问）。',
    official_source: 'https://docs.openclaw.ai/start/getting-started',
    command: 'openclaw status',
    verify: 'openclaw status',
    common_errors: [
      { error: 'Gateway not running', fix: '手动启动 Gateway：openclaw gateway start，或检查 LaunchAgent 是否加载：launchctl list | grep openclaw' },
      { error: 'RPC probe: failed', fix: 'Gateway 进程可能卡死，尝试重启：openclaw gateway restart' },
      { error: 'port 18789 already in use', fix: '端口被占用，查看占用进程：lsof -i :18789，然后 kill 对应进程或更换端口' },
      { error: 'LaunchAgent not loaded', fix: '运行 openclaw gateway install 安装 LaunchAgent 服务，然后 openclaw gateway start' },
    ],
  },
  {
    id: 'mac-5',
    title: '打开 Dashboard 控制面板',
    description: '打开 OpenClaw Dashboard 控制面板。会自动生成带 token 的 URL 并在浏览器中打开。保持这个标签页来控制 OpenClaw。',
    official_source: 'https://docs.openclaw.ai/start/getting-started',
    command: 'openclaw dashboard',
    verify: 'curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:18789/',
    common_errors: [
      { error: '浏览器没有自动打开', fix: '手动复制终端中输出的 Dashboard URL（带 #token=... 的链接）到浏览器打开' },
      { error: 'Dashboard 页面白屏', fix: '检查 Gateway 是否运行：openclaw status，如未运行先启动 Gateway' },
      { error: 'token 过期或无效', fix: '重新运行 openclaw dashboard 生成新的 token URL' },
      { error: 'connection refused', fix: 'Gateway 未启动，运行 openclaw gateway start 后重试' },
    ],
  },
]

const windowsSteps: Step[] = [
  {
    id: 'win-1',
    title: 'PowerShell 安装 OpenClaw',
    description: '以管理员身份打开 PowerShell（Win + X → Windows PowerShell 管理员）。需要先确保 Node.js 22+ 已安装（winget install OpenJS.NodeJS），然后全局安装 OpenClaw。',
    official_source: 'https://docs.openclaw.ai/install',
    command: 'npm install -g openclaw@latest',
    verify: 'openclaw --version',
    common_errors: [
      { error: 'node: command not found / 不是内部或外部命令', fix: '先安装 Node.js：winget install OpenJS.NodeJS，安装后重新打开 PowerShell' },
      { error: 'npm install failed for openclaw@latest', fix: '安装失败，尝试：1) 以管理员身份运行 PowerShell 2) npm cache clean --force 3) 重试' },
      { error: 'EPERM: operation not permitted', fix: '权限不足，确保以管理员身份运行 PowerShell（右键 → 以管理员身份运行）' },
      { error: 'node 版本低于 22', fix: '运行 node --version 检查，如版本过低用 winget upgrade OpenJS.NodeJS 升级' },
    ],
  },
  {
    id: 'win-2',
    title: '运行 Onboarding',
    description: '运行 onboarding 向导完成初始配置。会显示安全警告，阅读后选择 Yes 继续。配置文件存储在 %USERPROFILE%\\.openclaw\\openclaw.json。',
    official_source: 'https://docs.openclaw.ai/start/onboarding',
    command: 'openclaw onboard',
    verify: 'Test-Path $env:USERPROFILE\\.openclaw\\openclaw.json',
    common_errors: [
      { error: 'openclaw: 不是内部或外部命令', fix: '安装后 PowerShell 需要重新打开，或检查 npm 全局 bin 是否在 PATH 中' },
      { error: '选了 No 退出了', fix: '重新运行 openclaw onboard，在安全提示处选择 Yes 继续' },
      { error: 'Windows Defender 阻止运行', fix: '在 Windows 安全中心添加 OpenClaw 为例外，或临时关闭实时保护后重试' },
    ],
  },
  {
    id: 'win-3',
    title: '检查 Gateway 状态',
    description: '检查 OpenClaw Gateway 是否正常运行。Gateway 默认监听 127.0.0.1:18789（仅本地访问）。',
    official_source: 'https://docs.openclaw.ai/start/getting-started',
    command: 'openclaw status',
    verify: 'openclaw status',
    common_errors: [
      { error: 'Gateway not running', fix: '手动启动 Gateway：openclaw gateway start' },
      { error: 'RPC probe: failed', fix: 'Gateway 进程可能卡死，尝试重启：openclaw gateway restart' },
      { error: 'port 18789 already in use', fix: '端口被占用，查看占用进程：netstat -ano | findstr 18789，然后在任务管理器中结束对应进程' },
    ],
  },
  {
    id: 'win-4',
    title: '打开 Dashboard 控制面板',
    description: '打开 OpenClaw Dashboard 控制面板。会自动生成带 token 的 URL 并在浏览器中打开。保持这个标签页来控制 OpenClaw。',
    official_source: 'https://docs.openclaw.ai/start/getting-started',
    command: 'openclaw dashboard',
    verify: 'curl -s -o NUL -w "%{http_code}" http://127.0.0.1:18789/',
    common_errors: [
      { error: '浏览器没有自动打开', fix: '手动复制终端中输出的 Dashboard URL（带 #token=... 的链接）到浏览器打开' },
      { error: 'Dashboard 页面白屏', fix: '检查 Gateway 是否运行：openclaw status，如未运行先启动 Gateway' },
      { error: 'token 过期或无效', fix: '重新运行 openclaw dashboard 生成新的 token URL' },
      { error: '防火墙拦截', fix: '在 Windows 防火墙中允许 Node.js 通过，或临时关闭防火墙测试' },
    ],
  },
]

const linuxCloudSteps: Step[] = [
  {
    id: 'linux-1',
    title: '检查 Node.js 22+',
    description: 'SSH 连接到云服务器后，检查是否已安装 Node.js 22 或更高版本。如果没有，使用 NodeSource 安装最新版。',
    official_source: 'https://docs.openclaw.ai/start/getting-started',
    command: 'node --version || (curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash - && sudo apt-get install -y nodejs)',
    verify: 'node --version',
    common_errors: [
      { error: 'command not found: node', fix: '未安装 Node.js，运行：curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash - && sudo apt-get install -y nodejs' },
      { error: '版本低于 v22', fix: '先卸载旧版：sudo apt remove nodejs，再按上面的命令安装新版' },
      { error: 'curl: (7) Failed to connect', fix: '网络问题，检查服务器是否能访问外网，或配置代理' },
      { error: 'E: Unable to locate package nodejs', fix: '先更新包列表：sudo apt update，然后重试' },
    ],
  },
  {
    id: 'linux-2',
    title: '安装 OpenClaw',
    description: '使用 npm 全局安装 OpenClaw CLI。云服务器上建议使用 root 或 sudo 安装。',
    official_source: 'https://docs.openclaw.ai/install',
    command: 'sudo npm install -g openclaw@latest',
    verify: 'openclaw --version',
    common_errors: [
      { error: 'npm install failed for openclaw@latest', fix: '安装失败，尝试：1) 检查网络 2) npm cache clean --force 3) 重试' },
      { error: 'EACCES: permission denied', fix: '使用 sudo 运行：sudo npm install -g openclaw@latest' },
      { error: 'npm: command not found', fix: 'npm 随 Node.js 一起安装，回到第一步确保 Node.js 已正确安装' },
      { error: 'SHARP_IGNORE_GLOBAL_LIBVIPS 相关报错', fix: '运行：sudo env SHARP_IGNORE_GLOBAL_LIBVIPS=1 npm install -g openclaw@latest' },
    ],
  },
  {
    id: 'linux-3',
    title: '运行 Onboarding',
    description: '运行 onboarding 向导完成初始配置。云服务器上尤其注意安全警告——如果要暴露到公网，务必配置 allowlist 和 mention gating。',
    official_source: 'https://docs.openclaw.ai/start/onboarding',
    command: 'openclaw onboard',
    verify: 'ls ~/.openclaw/openclaw.json',
    common_errors: [
      { error: 'openclaw: command not found', fix: '检查 npm 全局 bin 路径：npm bin -g，确保该路径在 PATH 中' },
      { error: '选了 No 退出了', fix: '重新运行 openclaw onboard，在安全提示处选择 Yes 继续' },
      { error: 'Error: ENOENT: no such file or directory', fix: '确保 home 目录存在且有写权限：mkdir -p ~/.openclaw' },
    ],
  },
  {
    id: 'linux-4',
    title: '检查 Gateway 状态',
    description: '检查 OpenClaw Gateway 是否正常运行。云服务器需要 Gateway 24/7 运行，建议配置 systemd 服务确保开机自启和崩溃自动恢复。',
    official_source: 'https://docs.openclaw.ai/start/getting-started',
    command: 'openclaw status',
    verify: 'openclaw status',
    common_errors: [
      { error: 'Gateway not running', fix: '启动 Gateway：openclaw gateway start。云服务器建议安装为 systemd 服务：openclaw gateway install --systemd' },
      { error: 'RPC probe: failed', fix: 'Gateway 进程可能卡死，尝试重启：openclaw gateway restart' },
      { error: 'port 18789 already in use', fix: '端口被占用，查看占用进程：lsof -i :18789 或 ss -tlnp | grep 18789，kill 对应进程' },
      { error: 'SSH 断开后 Gateway 停止', fix: '使用 systemd 管理或用 tmux/screen 保持后台运行：tmux new -d "openclaw gateway start"' },
    ],
  },
  {
    id: 'linux-5',
    title: '打开 Dashboard 控制面板',
    description: '生成 Dashboard 访问链接。云服务器默认只监听 127.0.0.1，如需远程访问需配置反向代理（nginx）或 SSH 隧道。保持 Dashboard 标签页来控制 OpenClaw。',
    official_source: 'https://docs.openclaw.ai/start/getting-started',
    command: 'openclaw dashboard',
    verify: 'curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:18789/',
    common_errors: [
      { error: '无法从本地浏览器访问', fix: '云服务器只监听 loopback，使用 SSH 隧道访问：ssh -L 18789:127.0.0.1:18789 user@服务器IP，然后本地浏览器打开 URL' },
      { error: 'connection refused', fix: 'Gateway 未运行，运行 openclaw gateway start 后重试' },
      { error: '想暴露到公网', fix: '不建议直接暴露。配置 nginx 反向代理 + HTTPS + 认证，参考 https://docs.openclaw.ai/gateway/security' },
      { error: 'token 过期或无效', fix: '重新运行 openclaw dashboard 生成新的 token URL' },
    ],
  },
]

export const deploymentPaths: DeploymentPath[] = [
  {
    id: 'mac-local',
    name: 'Mac 本地部署',
    icon: '🍎',
    description: '在 Mac 上通过 npm 安装 OpenClaw，适合个人本地使用',
    steps: macSteps,
  },
  {
    id: 'windows-local',
    name: 'Windows 本地部署',
    icon: '🪟',
    description: '在 Windows 上通过 PowerShell + npm 安装 OpenClaw',
    steps: windowsSteps,
  },
  {
    id: 'linux-cloud',
    name: 'Linux 云服务器部署',
    icon: '☁️',
    description: '在 Linux 云服务器上部署 OpenClaw，适合 24/7 长期运行',
    steps: linuxCloudSteps,
  },
]

export function getPathById(id: string): DeploymentPath | undefined {
  return deploymentPaths.find((p) => p.id === id)
}

export function getStepById(pathId: string, stepId: string): Step | undefined {
  const path = getPathById(pathId)
  return path?.steps.find((s) => s.id === stepId)
}
