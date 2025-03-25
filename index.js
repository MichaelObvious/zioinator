window.onload = () => {
    let label = document.getElementById("label");
    let button = document.getElementById("copy-link");
    let params = Object.fromEntries(new URLSearchParams(window.location.search));

    const url = new URL(window.location.href);
    url.search = ''; 
    window.history.replaceState({}, '', url);
    
    let final_word = '';
    let global_idx = 0;
    if ('n' in params && !(params.n === undefined || Number(params.n) === undefined || Number.isNaN(Number(params.n)) || Number(params.n) === Infinity || Number(params.n) === -Infinity)) {
        let idx = Math.round(Math.abs(Number(params.n))) % parole.length;
        global_idx = idx;
        final_word = parole[idx];
    } else {
        let starting_letter = '';
        let r = Math.random();
        if (r < 0.67) {
            starting_letter = 'p';
        } else if (r < 0.9) {
            starting_letter = 'c';
        } else {
            starting_letter = '';
        }

        let enum_parole = [];
        parole.forEach((x, i) => enum_parole[i] = [x, i]);
        let filtered = enum_parole.filter(([s, i], _i, _xs) => s.startsWith(starting_letter));

        let idx = Math.round(Math.random() * (filtered.length-1));

        final_word = filtered[idx][0];
        global_idx = filtered[idx][1];
    }
    
    label.innerHTML = `zio <a href="https://www.treccani.it/vocabolario/${final_word}">${final_word}</a>`
    button.onclick = () => {
        let idx = window.location.href.indexOf('?');
        let url = window.location.href;
        if (idx !== -1) {
            url = url.substring(0, idx);
        }
        navigator.clipboard.writeText(url + `?n=${global_idx}`);
    }
    // label.innerHTML = `zio <a href="https://en.wiktionary.org/wiki/${final_word}">${final_word}</a>`
}