function somar(num) {
    num = Number(num) || 0;
    if (num <= 0) return 0;
    var total = 0;
    for (var x = 1; x <= num; x++) {
        total += x;
    }
    return total;
}

// Executa se chamado diretamente via `node função.js [n]`
function runCli(argv) {
    var n = parseInt((argv && argv[2]) || process.argv[2], 10) || 10;
    return somar(n);
}

function cliInvoke(argv, printer) {
    var out = runCli(argv);
    (printer || console).log(out);
    return out;
}

function main(argv, printer) {
    return cliInvoke(argv, printer);
}

/* istanbul ignore next */
if (require.main === module) {
    main(process.argv);
}

module.exports = somar;
module.exports.runCli = runCli;
module.exports.cliInvoke = cliInvoke;
module.exports.main = main;