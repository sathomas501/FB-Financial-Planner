import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

const CONTENT_DIRS = [
  '_posts',
];

const ROOT_CONTENT_FILES = [
  'index.html',
  'pricing.html',
  'comparison.md',
  'federal-retirement.md',
  'about.md',
  'advisor-alternative.md',
  'research-methodology.md',
  'roth-conversion.md',
  'success.md',
  'tcja-2026.md',
  'why-fatboy.md',
];

const encodingArtifacts = ['â€œ', 'â€\x9d', 'â€™', 'â€"', 'â€¢', 'â†', 'Ã', '\uFFFD'];

function walkMarkdownFiles(dir) {
  const absDir = path.join(root, dir);
  if (!fs.existsSync(absDir)) return [];
  const entries = fs.readdirSync(absDir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const relPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return walkMarkdownFiles(relPath);
    if (entry.isFile() && /\.(md|html)$/i.test(entry.name)) return [relPath];
    return [];
  });
}

function extractFrontMatter(raw) {
  const normalized = raw.replace(/^\uFEFF/, '').replace(/\r\n/g, '\n');
  if (!normalized.startsWith('---\n')) {
    return { hasFrontMatter: false, frontMatter: '', body: raw };
  }
  const endMarker = normalized.indexOf('\n---\n', 4);
  if (endMarker === -1) {
    return { hasFrontMatter: false, frontMatter: '', body: raw };
  }
  return {
    hasFrontMatter: true,
    frontMatter: normalized.slice(4, endMarker),
    body: normalized.slice(endMarker + 5),
  };
}

function checkRequiredFrontMatter(file, raw, issues) {
  const { hasFrontMatter, frontMatter } = extractFrontMatter(raw);
  const isPost = file.startsWith('_posts' + path.sep) || file.startsWith('_posts/');
  const expectsFrontMatter = isPost || ROOT_CONTENT_FILES.includes(file);

  if (expectsFrontMatter && !hasFrontMatter) {
    issues.push(`${file}: missing YAML front matter`);
    return;
  }

  if (!hasFrontMatter) return;

  const requires = isPost
    ? ['layout:', 'title:', 'date:', 'description:']
    : ['layout:', 'title:'];

  for (const marker of requires) {
    if (!frontMatter.includes(marker)) {
      issues.push(`${file}: front matter missing ${marker.replace(':', '')}`);
    }
  }
}

function checkEncodingArtifacts(file, raw, issues) {
  for (const artifact of encodingArtifacts) {
    if (raw.includes(artifact)) {
      issues.push(`${file}: possible encoding artifact detected (${artifact})`);
      break;
    }
  }
}

function resolveSitePath(sitePath) {
  if (sitePath === '/') return path.join(root, 'index.html');

  const trimmed = sitePath.replace(/^\//, '').replace(/\/$/, '');
  const directCandidates = [
    path.join(root, trimmed),
    path.join(root, `${trimmed}.md`),
    path.join(root, `${trimmed}.html`),
    path.join(root, trimmed, 'index.html'),
  ];

  for (const candidate of directCandidates) {
    if (fs.existsSync(candidate)) return candidate;
  }

  // Jekyll permalinks for posts: /blog/yyyy/mm/dd/slug/
  const postMatch = trimmed.match(/^blog\/(\d{4})\/(\d{2})\/(\d{2})\/(.+)$/);
  if (postMatch) {
    const [, year, month, day, slug] = postMatch;
    const postPrefix = `${year}-${month}-${day}-${slug}`;
    const postsDir = path.join(root, '_posts');
    if (fs.existsSync(postsDir)) {
      const match = fs.readdirSync(postsDir).find((name) => name.startsWith(postPrefix) && /\.md$/i.test(name));
      if (match) return path.join(postsDir, match);
    }
  }

  return null;
}

function checkBrokenSiteLinks(file, raw, issues) {
  const links = [...raw.matchAll(/\]\((\/[^)\s#?]+)(?:[?#][^)]+)?\)/g)];
  for (const match of links) {
    const sitePath = match[1];
    if (sitePath.startsWith('//')) continue;
    const resolved = resolveSitePath(sitePath);
    if (resolved) continue;

    issues.push(`${file}: internal link target not found (${sitePath})`);
  }
}

function main() {
  const files = [
    ...ROOT_CONTENT_FILES.filter((file) => fs.existsSync(path.join(root, file))),
    ...CONTENT_DIRS.flatMap((dir) => walkMarkdownFiles(dir)),
  ];

  const uniqueFiles = [...new Set(files)].sort();
  const issues = [];

  for (const file of uniqueFiles) {
    const absPath = path.join(root, file);
    const raw = fs.readFileSync(absPath, 'utf8');
    checkRequiredFrontMatter(file, raw, issues);
    checkEncodingArtifacts(file, raw, issues);
    checkBrokenSiteLinks(file, raw, issues);
  }

  if (issues.length) {
    console.error('Content validation failed:\n');
    for (const issue of issues) {
      console.error(`- ${issue}`);
    }
    process.exit(1);
  }

  console.log(`Content validation passed for ${uniqueFiles.length} files.`);
}

main();
