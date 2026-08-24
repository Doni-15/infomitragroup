import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const backendDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const validateCommand = "import('./config/env.js').then((m) => m.validateRuntimeConfig())";

function validateProduction(extraEnv = {}) {
    return spawnSync(process.execPath, ['--input-type=module', '--eval', validateCommand], {
        cwd: backendDir,
        encoding: 'utf8',
        env: { NODE_ENV: 'production', PATH: process.env.PATH, ...extraEnv },
    });
}

test('production gagal tertutup tanpa runtime secret', () => {
    const result = validateProduction();
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /JWT_SECRET/);
});

test('production menolak JWT secret yang terlalu pendek', () => {
    const result = validateProduction({ JWT_SECRET: 'too-short' });
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /minimal 32 karakter/);
});
