const somar = require('../função.js');

describe('somar', () => {
  test('retorna 0 para 0', () => expect(somar(0)).toBe(0));
  test('retorna 1 para 1', () => expect(somar(1)).toBe(1));
  test('soma 1..5 = 15', () => expect(somar(5)).toBe(15));
  test('soma 1..15 = 120', () => expect(somar(15)).toBe(120));
  test('valores negativos retornam 0', () => expect(somar(-3)).toBe(0));
  test('string numerica é convertida', () => expect(somar('4')).toBe(10));
  test('runCli retorna soma para argv', () => expect(somar.runCli(['node','função.js','3'])).toBe(6));
  test('cliInvoke imprime e retorna valor', () => {
    let printed = null;
    const fakePrinter = { log: (v) => { printed = v; } };
    const res = somar.cliInvoke(['node','função.js','4'], fakePrinter);
    expect(res).toBe(10);
    expect(printed).toBe(10);
  });
  test('runCli com argv vazio usa process.argv ou default', () => {
    const orig = process.argv;
    process.argv = ['node','função.js','2'];
    const res = somar.runCli([]);
    expect(res).toBe(3); // sum 1..2 = 3
    process.argv = orig;
  });
  test('runCli com arg nao numerico cai no default 10', () => {
    const res = somar.runCli(['node','função.js','abc']);
    expect(res).toBe(55); // sum 1..10 = 55
  });
  test('main sem printer usa console.log', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {});
    const res = somar.main(['node','função.js','2']);
    expect(res).toBe(3);
    expect(spy).toHaveBeenCalledWith(3);
    spy.mockRestore();
  });
});
