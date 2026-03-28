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
  env.BUNDLE_USER_HOME = env.BUNDLE_USER_HOME || path.join(process.cwd(), '.bundle-user');
  env.BUNDLE_PATH = env.BUNDLE_PATH || path.join(process.cwd(), 'vendor', 'bundle');
  env.JEKYLL_ENV = env.JEKYLL_ENV || 'production';
  return env;
}

function commandExists(command, args = ['--version']) {
  const result = spawnSync(command, args, { stdio: 'ignore', shell: true, env: buildEnv() });
  return result.status === 0;
}

function main() {
  if (!commandExists('bundle')) {
    console.error('Content build requires Bundler, but `bundle` was not found on PATH.');
    console.error('Install Ruby + Bundler, then run `bundle install` in this repo.');
    process.exit(1);
  }

  const result = spawnSync('bundle exec jekyll build --trace', {
    stdio: 'inherit',
    shell: true,
    env: buildEnv(),
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

main();
