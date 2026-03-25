document.addEventListener('DOMContentLoaded', () => {
    generateSelect();
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
