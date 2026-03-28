import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const rubyBinCandidates = [
  'C:\\Ruby31-x64\\bin',
  'C:\\Ruby33-x64\\bin',
];

function buildEnv() {
  const env = { ...process.env };
  const rubyBin = rubyBinCandidates.find((candidate) => fs.existsSync(path.join(candidate, 'bundle.bat')));
  if (rubyBin && !(env.PATH || '').toLowerCase().includes(rubyBin.toLowerCase())) {
    env.PATH = `${rubyBin};${env.PATH || ''}`;
  }
  return env;
}

function run(command, args = [], options = {}) {
  const result = spawnSync(command, args, {
    stdio: 'inherit',
    shell: options.shell ?? false,
    env: buildEnv(),
  });
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

function commandExists(command, args = ['--version']) {
  const checkCommand = process.platform === 'win32' ? `where ${command}` : `command -v ${command}`;
  const result = spawnSync(checkCommand, { stdio: 'ignore', shell: true, env: buildEnv() });
  return result.status === 0;
}

run(process.execPath, ['scripts/content-check.mjs']);

if (commandExists('bundle')) {
  run(process.execPath, ['scripts/content-build.mjs']);
} else {
  console.log('Bundler not found on PATH. Skipping Jekyll build step.');
  console.log('Install Ruby + Bundler and run `npm run content:test:full` for the full local build check.');
}
