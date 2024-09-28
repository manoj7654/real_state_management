const apiUrl = 'https://wisdompeak.onrender.com/api/towers'; 

function toggleSection(sectionToShow) {
    const formSection = document.getElementById('add-tower');
    const listSection = document.getElementById('tower-data');

    formSection.style.display = sectionToShow === 'form' ? 'block' : 'none';
    listSection.style.display = sectionToShow === 'list' ? 'block' : 'none';

    if (sectionToShow === 'list') {
        refreshTable(); 
    }
}

document.getElementById('addTowerBtn').addEventListener('click', () => toggleSection('form'));
document.getElementById('towerListBtn').addEventListener('click', () => toggleSection('list'));

toggleSection('list');

document.addEventListener('DOMContentLoaded', refreshTable);

async function fetchTowers() {
    try {
        const response = await fetch(apiUrl);
        console.log('Response Status:', response.status); // Log response status
        const data = await response.json();
        console.log('Fetched Data:', data); // Log fetched data

        // Access the Towers array from the data
        const towers = Array.isArray(data.Towers) ? data.Towers : []; // Accessing the Towers array

        if (towers.length > 0) {
            populateTable(towers);
        } else {
            console.error('No towers data available');
        }
    } catch (error) {
        console.error('Error fetching towers:', error);
    }
}

function refreshTable() {
    fetchTowers();
}

function populateTable(data) {
    const tableBody = document.querySelector('#towerTable tbody');
    tableBody.innerHTML = '';
    data.forEach(tower => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td contenteditable="false">${tower.developerId}</td>
            <td contenteditable="false">${tower.projectId}</td>
            <td contenteditable="false">${tower.towerNumber}</td>
            <td contenteditable="false">${tower.towerName}</td>
            <td contenteditable="false">${tower.towerPhase}</td>
            <td contenteditable="false">${tower.phaseReraNumber}</td>
            <td contenteditable="false">${tower.deliveryTimeline}</td>
            <td contenteditable="false">${tower.currentStatus}</td>
            <td contenteditable="false">${tower.duplicateTowerOption ? 'Yes' : 'No'}</td> 
            <td contenteditable="false">${tower.totalFloors}</td>
            <td contenteditable="false">${tower.towerCoreDetails}</td>
            <td>
                <button class="edit-btn" data-id="${tower.id}">Edit</button>
                <button class="save-btn" style="display:none;" data-id="${tower.id}" onclick="saveRow(this)">Save</button>
                <button class="delete-btn" data-id="${tower.id}">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });

    document.querySelectorAll('.edit-btn').forEach(button => button.addEventListener('click', () => editRow(button)));
    document.querySelectorAll('.delete-btn').forEach(button => button.addEventListener('click', () => deleteTower(button.getAttribute('data-id'))));
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
    const towerId = button.getAttribute('data-id');

    const updatedTower = {
        developerId: cells[0].textContent,
        projectId: cells[1].textContent,
        towerNumber: cells[2].textContent,
        towerName: cells[3].textContent,
        towerPhase: cells[4].textContent,
        phaseReraNumber: cells[5].textContent,
        deliveryTimeline: cells[6].textContent,
        currentStatus: cells[7].textContent,
        duplicateTowerOption: cells[8].textContent === 'true', 
        totalFloors: parseInt(cells[9].textContent),
        towerCoreDetails: cells[10].textContent
    };


    await updateTower(towerId, updatedTower);
    cells.forEach(cell => cell.contentEditable = 'false'); 
    button.style.display = 'none';
    row.querySelector('.edit-btn').style.display = 'inline-block'; 
    row.querySelector('.delete-btn').style.display = 'inline-block'; 
}

async function updateTower(towerId, updatedTower) {
    try {
        const response = await fetch(`${apiUrl}/${towerId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedTower)
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

async function deleteTower(towerId) {
    if (confirm('Are you sure you want to delete this tower?')) {
        try {
            const response = await fetch(`${apiUrl}/${towerId}`, { method: 'DELETE' });
            if (response.ok) {
                alert('Tower deleted successfully!');
                refreshTable(); 
            } else {
                alert('Error deleting tower.');
            }
        } catch (error) {
            console.error('Error deleting tower:', error);
        }
    }
}

document.getElementById('towerForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const newTower = {
        developerId: document.getElementById('developerId').value,
        projectId: document.getElementById('projectId').value,
        towerNumber: document.getElementById('towerNumber').value,
        towerName: document.getElementById('towerName').value,
        towerPhase: document.getElementById('towerPhase').value,
        phaseReraNumber: document.getElementById('phaseReraNumber').value,
        deliveryTimeline: document.getElementById('deliveryTimeline').value,
        currentStatus: document.getElementById('currentStatus').value,
        duplicateTowerOption: document.getElementById('duplicateTowerOption').checked, // Boolean
        totalFloors: parseInt(document.getElementById('totalFloors').value), // Number
        towerCoreDetails: document.getElementById('towerCoreDetails').value
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newTower)
        });

        if (response.ok) {
            alert('Tower added successfully!');
            refreshTable(); 
            document.getElementById('towerForm').reset(); 
        } else {
            alert('Error adding tower.');
        }
    } catch (error) {
        console.error('Error adding tower:', error);
    }
});

fetchTowers();
