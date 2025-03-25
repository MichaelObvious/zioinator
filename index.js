window.onload = () => {
    let label = document.getElementById("label");
    
    let starting_letter = '';
    let r = Math.random();
    if (r < 0.67) {
        starting_letter = 'p';
    } else if (r < 0.9) {
        starting_letter = 'c';
    } else {
        starting_letter = '';
    }

    let filtered = parole.filter((s, _i, _xs) => s.startsWith(starting_letter));
    let idx = Math.round(Math.random() * (filtered.length-1));
    let final_word = filtered[idx];
    
    label.innerHTML = `zio <a href="https://www.treccani.it/vocabolario/${final_word}">${final_word}</a>`
    // label.innerHTML = `zio <a href="https://en.wiktionary.org/wiki/${final_word}">${final_word}</a>`
}