// scripts/audit-colors.mjs
import { readFileSync, readdirSync } from "fs";
import { join } from "path";

const ROOT = "./src";
const BAD = /\b(text|bg|border|from|via|to)-(white|black|gray-\d+|zinc-\d+|slate-\d+|blue-\d+|emerald-\d+)\b|dark:(text|bg|border)-\S+/g;

function walk(dir) {
  for (const f of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, f.name);
    if (f.isDirectory()) walk(p);
    else if (/\.(tsx|ts|jsx|js|css)$/.test(p)) {
      const s = readFileSync(p, "utf8");
      const m = s.match(BAD);
      if (m) console.log(p, "→", [...new Set(m)].join(", "));
    }
  }
}

walk(ROOT);
console.log("\nReplace with tokens: text-text, text-muted, bg-surface, bg-bg, border-border, bg-accent, text-accent-foreground.");