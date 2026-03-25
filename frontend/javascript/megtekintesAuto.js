document.addEventListener('DOMContentLoaded', () => {
    generateTable();
});

async function generateTable() {
    const tbody = document.getElementById('autoTable');
    tbody.replaceChildren();
    const { status, data } = await Get('/api/autok');
    if (status == 'success') {
        console.log(data);
        for (const obj of data) {
            const tr = document.createElement('tr');
            for (const value of Object.values(obj)) {
                const td = document.createElement('td');
                td.innerText = value;
                tr.appendChild(td);
            }
            tbody.appendChild(tr);
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
