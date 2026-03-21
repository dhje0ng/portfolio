import { promises as fs } from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const SKIP_DIRS = new Set(['.git', 'node_modules', '.next', 'out']);
const SKIP_EXT = new Set(['.png', '.jpg', '.jpeg', '.gif', '.webp', '.ico', '.pdf', '.lock']);
const conflictPatterns = [/^<<<<<<<\s/m, /^=======\s/m, /^>>>>>>>\s/m];

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (!SKIP_DIRS.has(entry.name)) {
        files.push(...(await walk(fullPath)));
      }
      continue;
    }

    if (SKIP_EXT.has(path.extname(entry.name).toLowerCase())) {
      continue;
    }

    files.push(fullPath);
  }

  return files;
}

function hasConflictMarkers(content) {
  return conflictPatterns.every((pattern) => pattern.test(content));
}

async function run() {
  const files = await walk(ROOT);
  const conflicted = [];

  for (const file of files) {
    const rel = path.relative(ROOT, file);
    const stat = await fs.stat(file);
    if (stat.size > 1024 * 1024) {
      continue;
    }

    const content = await fs.readFile(file, 'utf8').catch(() => null);
    if (content && hasConflictMarkers(content)) {
      conflicted.push(rel);
    }
  }

  if (conflicted.length > 0) {
    console.error('❌ Merge conflict markers detected:');
    for (const file of conflicted) {
      console.error(` - ${file}`);
    }
    process.exit(1);
  }

  console.log('✅ No merge conflict markers were found in repository files.');
}

run().catch((error) => {
  console.error('❌ Failed to scan repository:', error);
  process.exit(1);
});
