document.addEventListener('DOMContentLoaded', () => {
    generateSelect();
    document.getElementById('autok').addEventListener('change', loadAuto);
});

async function generateSelect() {
    const select = document.getElementById('autok');
    select.replaceChildren();
    const { status, data } = await Get('/api/autok');
    if (status == 'success') {
        console.log(data);
        for (const obj of data) {
            const option = document.createElement('option');
            option.innerText = obj.modell;
            option.value = obj.id;

            select.appendChild(option);
        }
    }
}

async function loadAuto() {
    const { results } = await Get('/api/getAuto/' + this.value);
    let values = Object.values(results);

    const form = document.getElementById('ujauto');
    for (let i = 0; i < form.children.length - 1; i++) {
        form.children[i].value = values[i];
    }
}

async function Get(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`${response.status} ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        throw new Error(error);
    }
}
