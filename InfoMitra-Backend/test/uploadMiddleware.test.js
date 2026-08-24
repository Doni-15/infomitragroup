import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';

const { validateUploadedImage } = await import('../middleware/uploadMiddleware.js');

async function invokeValidator(filePath) {
    const req = { file: { filename: path.basename(filePath), mimetype: 'image/png', path: filePath } };
    let statusCode;
    let responseBody;
    let nextError;
    let nextCalled = false;
    const res = {
        status(code) { statusCode = code; return this; },
        json(body) { responseBody = body; return this; },
    };
    await validateUploadedImage(req, res, (error) => {
        nextCalled = true;
        nextError = error;
    });
    return { req, statusCode, responseBody, nextCalled, nextError };
}

test('menerima PNG berdasarkan signature', async (t) => {
    const directory = await fs.mkdtemp(path.join(os.tmpdir(), 'infomitra-upload-'));
    t.after(() => fs.rm(directory, { recursive: true, force: true }));
    const source = path.join(directory, 'claimed.upload');
    await fs.writeFile(source, Buffer.from(
        'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=',
        'base64'
    ));
    const result = await invokeValidator(source);
    assert.equal(result.nextCalled, true);
    assert.equal(result.nextError, undefined);
    assert.match(result.req.file.filename, /\.png$/);
});

test('menolak file non-image dengan MIME palsu', async (t) => {
    const directory = await fs.mkdtemp(path.join(os.tmpdir(), 'infomitra-upload-'));
    t.after(() => fs.rm(directory, { recursive: true, force: true }));
    const source = path.join(directory, 'spoofed.upload');
    await fs.writeFile(source, 'not an image');
    const result = await invokeValidator(source);
    assert.equal(result.nextCalled, false);
    assert.equal(result.statusCode, 400);
    assert.match(result.responseBody.msg, /bukan gambar/i);
    await assert.rejects(fs.access(source));
});
