import { spawnSync } from 'node:child_process'

const steps = [
  ['npm', ['run', 'clean']],
  ['npm', ['run', 'build:cjs']],
  ['npm', ['run', 'build:esm']],
  ['npm', ['run', 'build:esm:min']],
  ['npm', ['run', 'build:cjs:min']]
]

for (const [cmd, args] of steps) {
  const result = spawnSync(cmd, args, { stdio: 'inherit' })
  if (result.status !== 0) {
    process.exit(result.status ?? 1)
  }
}
