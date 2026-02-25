document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('leadas').addEventListener('click', ujauto);
});

async function ujauto() {
    const form = document.getElementById('ujauto');
    const formData = new FormData(form);
    let isMissing = false;
    for (const value of formData.values()) {
        if (value == '') {
            isMissing = true;
        }
    }
    if (isMissing) {
        alert('NEM TÖLTÖTTE KI AZ ADATOKAT!');
    } else {
        const response = await Post('/api/ujauto', formData);
        console.log(Object.values(response));
        for (let i = 0; i < form.children.length - 1; i++) {
            console.log(form.children[i].value);
            form.children[i].value = '';
        }
        alert('Sikeres feltöltése!');
    }
}

async function Post(url, data) {
    try {
        const response = await fetch(url, { method: 'POST', body: data });
        if (!response.ok) {
            throw new Error(`${response.status} ${(await response).statusText}`);
        }
        return await response.json();
    } catch (error) {
        throw new Error(`${error.message}`);
    }
}
