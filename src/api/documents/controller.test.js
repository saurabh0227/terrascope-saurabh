const fs = require('mz/fs');
const app = require('./../../index');
const path = require('path');
const supertest = require('supertest');

describe('DocumenntController', () => {
  describe('POST /document/upload - upload a new file', () => {
    const filePath = path.resolve(__dirname, `../../../avatar.jpg`);
    it('should upload the test file to local storage', () => {
      return supertest(app)
        .post('/documents/upload')
        .attach('file', filePath)
        .expect(200);
    });
  });

  describe('GET /download/:filename/:filetype download file', () => {
    const filePath = path.resolve(
      __dirname,
      `../../../uploadsnew/48fb419c-bd2d-487a-8b94-b7d7bb1c3390.png`
    );
    it('should return file response', () => {
      const fileExist = fs.existsSync(filePath);
      if (!fileExist) throw new Error('file does not exist');
      return supertest(app)
        .get('/documents/download/48fb419c-bd2d-487a-8b94-b7d7bb1c3390.jpg/png')
        .expect(200);
    });
  });
});
