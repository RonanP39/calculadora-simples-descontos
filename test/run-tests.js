const assert = require('assert');
const somar = require('../função.js');

const cases = [
  { in: 0, out: 0 },
  { in: 1, out: 1 },
  { in: 5, out: 15 },
  { in: 15, out: 120 },
  { in: -3, out: 0 },
  { in: '4', out: 10 }
];

let failed = 0;

cases.forEach((c, i) => {
  try {
    const res = somar(c.in);
    assert.strictEqual(res, c.out);
    console.log(`ok ${i + 1}: somar(${JSON.stringify(c.in)}) === ${c.out}`);
  } catch (e) {
    failed++;
    const actual = e.actual !== undefined ? e.actual : e.message;
    console.error(`FAIL ${i + 1}: somar(${JSON.stringify(c.in)}) expected ${c.out} — got ${actual}`);
  }
});

if (failed) {
  console.error(`${failed} test(s) failed`);
  process.exit(1);
} else {
  console.log('All tests passed');
  process.exit(0);
}
