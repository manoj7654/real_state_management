const apiUrl = 'https://wisdompeak.onrender.com/api/series'; 

function toggleSection(sectionToShow) {
    const formSection = document.getElementById('add-series');
    const listSection = document.getElementById('series-data');

    formSection.style.display = sectionToShow === 'form' ? 'block' : 'none';
    listSection.style.display = sectionToShow === 'list' ? 'block' : 'none';

    if (sectionToShow === 'list') {
        refreshTable(); 
    }
}

document.getElementById('addSeriesBtn').addEventListener('click', () => toggleSection('form'));
document.getElementById('seriesListBtn').addEventListener('click', () => toggleSection('list'));

toggleSection('list');

document.addEventListener('DOMContentLoaded', refreshTable);

async function fetchSeries() {
    try {
        const response = await fetch(apiUrl);
        console.log('Response Status:', response.status); 
        const data = await response.json(); 
        console.log('Fetched Data:', data); 

        const series = Array.isArray(data.series) ? data.series : []; 

        if (series.length > 0) {
            populateTable(series);
        } else {
            console.error('No series data available');
        }
    } catch (error) {
        console.error('Error fetching series:', error);
    }
}

function refreshTable() {
    fetchSeries();
}

function populateTable(data) {
    const tableBody = document.querySelector('#seriesTable tbody');
    tableBody.innerHTML = '';
    data.forEach(series => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td contenteditable="false">${series.seriesName}</td>
            <td contenteditable="false">${series.towerId}</td>
            <td contenteditable="false">${series.seriesTypology}</td>
            <td contenteditable="false">${series.seriesDetails}</td>
            <td contenteditable="false">${series.addOns}</td>
            <td>
                <button class="edit-btn" data-id="${series.id}">Edit</button>
                <button class="save-btn" style="display:none;" data-id="${series.id}" onclick="saveRow(this)">Save</button>
                <button class="delete-btn" data-id="${series.id}">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });

    document.querySelectorAll('.edit-btn').forEach(button => button.addEventListener('click', () => editRow(button)));
    document.querySelectorAll('.delete-btn').forEach(button => button.addEventListener('click', () => deleteSeries(button.getAttribute('data-id'))));
}

function editRow(button) {
    const row = button.closest('tr');
    const cells = row.querySelectorAll('td');

    cells.forEach(cell => {
        cell.contentEditable = 'true'; 
    });

    button.style.display = 'none'; 
    row.querySelector('.save-btn').style.display = 'inline-block'; 
    row.querySelector('.delete-btn').style.display = 'none'; 
}

async function saveRow(button) {
    const row = button.closest('tr');
    const cells = row.querySelectorAll('td[contenteditable="true"]');
    const seriesId = button.getAttribute('data-id');

    const updatedSeries = {
        seriesName: cells[0].textContent,
        towerId: cells[1].textContent,
        seriesTypology: cells[2].textContent,
        seriesDetails: cells[3].textContent,
        addOns: cells[4].textContent
    };

    await updateSeries(seriesId, updatedSeries);
    cells.forEach(cell => cell.contentEditable = 'false'); 
    button.style.display = 'none';
    row.querySelector('.edit-btn').style.display = 'inline-block'; 
    row.querySelector('.delete-btn').style.display = 'inline-block'; 
}

async function updateSeries(seriesId, updatedSeries) {
    try {
        const response = await fetch(`${apiUrl}/${seriesId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedSeries)
        });

        let responseBody;
        try {
            responseBody = await response.json(); 
        } catch (error) {
            console.error('Error parsing JSON:', error);
            responseBody = {}; 
        }

        if (response.ok) {
            alert('Data updated successfully!');
        } else {
            console.error('Update failed:', response.status, responseBody);
            alert(`Error updating data: ${responseBody.message || 'Unknown error'}`);
        }
    } catch (error) {
        console.error('Error updating data:', error);
    }
}

async function deleteSeries(seriesId) {
    if (confirm('Are you sure you want to delete this series?')) {
        try {
            const response = await fetch(`${apiUrl}/${seriesId}`, { method: 'DELETE' });
            if (response.ok) {
                alert('Series deleted successfully!');
                refreshTable(); 
            } else {
                alert('Error deleting series.');
            }
        } catch (error) {
            console.error('Error deleting series:', error);
        }
    }
}

document.getElementById('seriesForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const newSeries = {
        seriesName: document.getElementById('seriesName').value,
        towerId: document.getElementById('towerId').value,
        seriesTypology: document.getElementById('seriesTypology').value,
        seriesDetails: document.getElementById('seriesDetails').value,
        addOns: document.getElementById('addOns').value
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newSeries)
        });

        if (response.ok) {
            alert('Series added successfully!');
            refreshTable(); 
            document.getElementById('seriesForm').reset(); 
        } else {
            alert('Error adding series.');
        }
    } catch (error) {
        console.error('Error adding series:', error);
    }
});

fetchSeries();
