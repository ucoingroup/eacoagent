#!/usr/bin/env node
/**
 * 内部链接自检 · 零依赖
 * 用法：node scripts/check-links.js
 * 退出码：0 = 通过，1 = 发现问题（可用于 CI）
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SKIP_SCHEME = /^(https?:|mailto:|tel:|data:|javascript:|#)/i;

function htmlFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true })
    .filter(d => d.isFile() && d.name.endsWith('.html'))
    .map(d => path.join(dir, d.name));
}

function attrs(html, name) {
  const re = new RegExp(`${name}\\s*=\\s*["']([^"']+)["']`, 'gi');
  const out = [];
  let m;
  while ((m = re.exec(html)) !== null) out.push(m[1]);
  return out;
}

const problems = [];
const files = htmlFiles(ROOT).sort();
let checked = 0;

for (const file of files) {
  const html = fs.readFileSync(file, 'utf8');
  const refs = [...attrs(html, 'href'), ...attrs(html, 'src')];

  for (const raw of refs) {
    const ref = raw.trim();
    if (!ref || SKIP_SCHEME.test(ref)) continue;
    // 跳过 JS 模板字符串占位符（运行时才拼出的地址）
    if (ref.includes('${')) continue;
    // 去掉 query / hash
    const clean = ref.split('#')[0].split('?')[0];
    if (!clean) continue;
    if (clean.startsWith('/')) {
      problems.push(`${path.basename(file)} → 绝对路径（GitHub Pages 项目站点会 404）：${ref}`);
      continue;
    }
    const target = path.resolve(path.dirname(file), clean);
    checked++;
    if (!fs.existsSync(target)) {
      problems.push(`${path.basename(file)} → 文件不存在：${ref}`);
    }
  }
}

// sitemap 覆盖检查
const sitemapPath = path.join(ROOT, 'sitemap.xml');
if (fs.existsSync(sitemapPath)) {
  const xml = fs.readFileSync(sitemapPath, 'utf8');
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
  const listed = new Set(locs.map(u => {
    const clean = u.split('#')[0].split('?')[0].replace(/\/+$/, '');
    const seg = clean.split('/').pop();
    // 根地址（…/eacoagent/）→ index.html
    return (!seg || seg === 'eacoagent') ? 'index.html' : seg;
  }));
  for (const f of files) {
    const base = path.basename(f);
    if (base === '404.html') continue;
    if (!listed.has(base)) problems.push(`sitemap.xml 未收录：${base}`);
  }
}

console.log(`扫描 ${files.length} 个 HTML，校验 ${checked} 个内部引用。`);
if (problems.length) {
  console.error(`\n发现 ${problems.length} 个问题：`);
  problems.forEach(p => console.error(' - ' + p));
  process.exit(1);
}
console.log('全部通过 ✓');
