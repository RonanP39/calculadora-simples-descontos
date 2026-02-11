var frutas = new Array("Banana", "Laranja", "Limão");

frutas.shift();
frutas.splice(1, 1, "uva");

if (typeof document !== 'undefined') {
    for (var i = 0; i < frutas.length; i++) {
        document.write(frutas[i] + " | ");
    }
} else {
    console.log(frutas.join(" | "));
}