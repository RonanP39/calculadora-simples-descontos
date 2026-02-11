const somar = require('../função.js');

test('main(argv, printer) imprime e retorna valor esperado', () => {
  let printed = null;
  const fakePrinter = { log: (v) => { printed = v; } };
  const res = somar.main(['node','função.js','4'], fakePrinter);
  expect(res).toBe(10);
  expect(printed).toBe(10);
});
