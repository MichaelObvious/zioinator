let imprecation_url = '';

window.onload = () => {
    let label = document.getElementById("label");
    let copy_button = document.getElementById("copy-link");
    let gen_button = document.getElementById("generate");
    let render_button = document.getElementById("render");
    let params = Object.fromEntries(new URLSearchParams(window.location.search));

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

        let idx = Math.round(Math.random() * (filtered.length - 1));

        final_word = filtered[idx][0];
        global_idx = filtered[idx][1];
    }

    {
        let idx = window.location.href.indexOf('?');
        let url = window.location.href;
        if (idx !== -1) {
            url = url.substring(0, idx);
        }
        imprecation_url = url + `?n=${global_idx}`;
    }

    const url = new URL(window.location.href);
    url.search = '';
    window.history.replaceState({}, '', url);

    label.innerHTML = `zio <a href="https://www.treccani.it/vocabolario/${final_word}">${final_word}</a>`
    copy_button.onclick = () => {
        navigator.clipboard.writeText(imprecation_url);
    }
    gen_button.onclick = () => {
        const url = new URL(window.location.href);
        url.search = '';
        window.history.replaceState({}, '', imprecation_url);
        window.location = url;
    }
    render_button.onclick = () => {
        // Create a canvas element
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Set canvas size
        canvas.width = 600;
        canvas.height = 200;
        let padding = canvas.width/85;

        // Background (optional)
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#181818';
        ctx.fillRect(padding, padding, canvas.width-padding*2, canvas.height-padding*2);
        
        let fontSize = 100;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'alphabetic';
        let text = `zio ${final_word}`.toUpperCase()

        do {
            ctx.font = `bold ${fontSize}px Iosevka Web`;
            const textWidth = ctx.measureText(text).width;
            if (textWidth <= canvas.width * 0.85) break; // leave some padding
            fontSize -= 1;
        } while (fontSize > 5); // minimum font size

        // Draw text
        ctx.fillStyle = '#e4e4ef';
        const metrics = ctx.measureText(text);
        const textHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
        ctx.fillText(text, canvas.width / 2, canvas.height / 2 + textHeight / 2 - metrics.actualBoundingBoxDescent);

        // Convert and download image
        const imageURL = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.href = imageURL;
        downloadLink.download = `zio-${final_word.replace(' ', '-')}.png`;
        downloadLink.click();
    }
    // label.innerHTML = `zio <a href="https://en.wiktionary.org/wiki/${final_word}">${final_word}</a>`

    document.addEventListener('keyup', (e) => {
        if (e.code === "Space" || e.code === "Enter") {
            const url = new URL(window.location.href);
            url.search = '';
            window.history.replaceState({}, '', imprecation_url);
            window.location = url;
        }
    });
}

window.addEventListener('beforeunload', (e) => {
    // e.preventDefault();
    window.history.pushState({}, '', imprecation_url);
})

console.log(`https://michaelobvious.github.io/zioinator?n=${parole.indexOf('prepuzio')}`)