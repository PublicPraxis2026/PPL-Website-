// Post-build assertions on dist/. Run after `npm run build`.
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const errors = [];
const fail = (message) => errors.push(message);

function htmlFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return entry.name === '_astro' ? [] : htmlFiles(path);
    return entry.name.endsWith('.html') ? [path] : [];
  });
}

const count = (html, pattern) => (html.match(pattern) ?? []).length;

const pages = htmlFiles('dist');
if (pages.length === 0) fail('no HTML pages found in dist/');

for (const page of pages) {
  const html = readFileSync(page, 'utf8');
  const expectOne = (label, pattern) => {
    const n = count(html, pattern);
    if (n !== 1) fail(`${page}: expected exactly one ${label}, found ${n}`);
  };
  expectOne('<h1>', /<h1[\s>]/g);
  expectOne('<main>', /<main[\s>]/g);
  expectOne('<title>', /<title>[^<]+<\/title>/g);
  expectOne('meta description', /<meta name="description" content="[^"]+"/g);
  // D015: pre-launch noindex. Fails when the launch flip happens, so the flip is deliberate.
  expectOne('noindex robots meta', /<meta name="robots" content="noindex, nofollow"/g);
}

for (const file of ['robots.txt', 'sitemap.xml']) {
  if (!existsSync(join('dist', file))) fail(`dist/${file} is missing`);
}

if (!existsSync('dist/_headers')) {
  fail('dist/_headers is missing');
} else if (readFileSync('dist/_headers', 'utf8') !== readFileSync('public/_headers', 'utf8')) {
  fail('dist/_headers differs from public/_headers');
}

if (errors.length > 0) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`dist checks passed (${pages.length} pages)`);
