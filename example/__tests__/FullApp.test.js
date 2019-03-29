/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */

describe('app', () => {
  beforeEach(async () => {
    await page.goto('http://localhost:3000');
  }, 30000);

  test('HTML5 Canvas should exist', async () => {
    const particleCanvas = await page.$('canvas');
    expect(particleCanvas).toBeDefined();
  }, 10000);

  test('Three WebGLRenderer Initialized', async () => {
    const logs = [];

    page.on('console', log => {
      const { _type, _text } = log;

      if (_type === 'log') logs.push(_text);
    });

    await page.goto('http://localhost:3000');

    expect(logs.includes('THREE.WebGLRenderer 102')).toBe(true);
  }, 10000);

  test('No page errors', async () => {
    const errors = [];

    page.on('console', log => {
      const { _type, _text } = log;

      if (_type === 'error') errors.push(_text);
    });

    await page.goto('http://localhost:3000');

    expect(errors.length === 0).toBe(true);
  }, 10000);
});
