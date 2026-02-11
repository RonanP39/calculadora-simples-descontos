document.addEventListener('DOMContentLoaded', () => {
    const inputPeso = document.querySelector('.input-peso');
    const inputAltura = document.querySelector('.input-altura');
    const btnCalcular = document.querySelector('.btn-calculator');
    const mostrarImc = document.querySelector('.imc');
    const mostrarClassificacao = document.querySelector('.classificacao');
    const themeToggle = document.getElementById('theme-toggle');

    function getOrCreateMessageEl() {
        let el = document.querySelector('.imc-message');
        if (!el) {
            el = document.createElement('div');
            el.className = 'imc-message';
            if (btnCalcular && btnCalcular.parentNode) btnCalcular.parentNode.insertBefore(el, btnCalcular.nextSibling);
            else document.body.appendChild(el);
        }
        return el;
    }

    function showMessage(text, type = 'info') {
        const el = getOrCreateMessageEl();
        el.textContent = text;
        el.classList.remove('error', 'success');
        if (type === 'error') el.classList.add('error');
        if (type === 'success') el.classList.add('success');
    }

    function clearMessage() {
        const el = document.querySelector('.imc-message');
        if (el) el.textContent = '';
    }

    function calcular(e) {
        if (e && typeof e.preventDefault === 'function') e.preventDefault();
        clearMessage();

        const pesoRaw = inputPeso ? (inputPeso.value || '').toString().trim() : '';
        const alturaRaw = inputAltura ? (inputAltura.value || '').toString().trim() : '';

        if (!pesoRaw || !alturaRaw) {
            showMessage('Por favor, preencha todos os campos!', 'error');
            return;
        }

        const peso = parseFloat(pesoRaw.replace(',', '.'));
        const altura = parseFloat(alturaRaw.replace(',', '.'));

        if (Number.isNaN(peso) || Number.isNaN(altura) || altura === 0) {
            showMessage('Valores inválidos. Informe números válidos para peso e altura.', 'error');
            return;
        }

        if (btnCalcular) btnCalcular.disabled = true;

        const imcValue = peso / (altura * altura);
        const imc = imcValue.toFixed(2);

        if (mostrarImc) mostrarImc.textContent = imc;

        if (mostrarClassificacao) {
            if (imcValue < 18.5) mostrarClassificacao.textContent = 'Abaixo do peso';
            else if (imcValue < 25) mostrarClassificacao.textContent = 'Peso normal';
            else if (imcValue < 30) mostrarClassificacao.textContent = 'Sobrepeso';
            else mostrarClassificacao.textContent = 'Obesidade';
        }

        showMessage('Cálculo concluído.', 'success');

        setTimeout(() => {
            if (inputPeso) inputPeso.value = '';
            if (inputAltura) inputAltura.value = '';
            if (inputPeso) inputPeso.focus();
            if (btnCalcular) btnCalcular.disabled = false;
        }, 800);
    }

    if (btnCalcular) btnCalcular.addEventListener('click', calcular);

    [inputPeso, inputAltura].forEach((el) => {
        if (!el) return;
        el.addEventListener('keydown', (ev) => { if (ev.key === 'Enter') calcular(ev); });
        el.addEventListener('input', clearMessage);
    });

    // Theme handling
    function applyTheme(theme) {
        if (theme === 'dark') document.body.classList.add('dark');
        else document.body.classList.remove('dark');
        if (themeToggle) {
            themeToggle.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
            // update visual state (class) for animated switch
            themeToggle.classList.toggle('active', theme === 'dark');
        }
    }

    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(saved || (prefersDark ? 'dark' : 'light'));

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isDark = document.body.classList.contains('dark');
            const next = isDark ? 'light' : 'dark';
            applyTheme(next);
            try { localStorage.setItem('theme', next); } catch (_) {}
        });
    }
});