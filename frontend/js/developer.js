const apiUrl = 'https://wisdompeak.onrender.com/api/developers';

function toggleSection(sectionToShow) {
    const formSection = document.getElementById('add-developer');
    const listSection = document.getElementById('developer-data');

    formSection.style.display = sectionToShow === 'form' ? 'block' : 'none';
    listSection.style.display = sectionToShow === 'list' ? 'block' : 'none';

    if (sectionToShow === 'list') {
        refreshTable(); 
    }
}

document.getElementById('addDeveloperBtn').addEventListener('click', () => toggleSection('form'));
document.getElementById('developerListBtn').addEventListener('click', () => toggleSection('list'));

toggleSection('list');

document.addEventListener('DOMContentLoaded', refreshTable);

async function fetchDevelopers() {
    try {
        const response = await fetch(apiUrl);
        const developers = await response.json();
        populateTable(developers);
    } catch (error) {
        console.error('Error fetching developers:', error);
    }
}

function refreshTable() {
    fetchDevelopers();
}

function populateTable(data) {
    const tableBody = document.querySelector('#developerTable tbody');
    tableBody.innerHTML = ''; 
    data.forEach(developer => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td contenteditable="false">${developer.developerName}</td>
            <td contenteditable="false">${developer.address}</td>
            <td contenteditable="false">${developer.incorporationDate}</td>
            <td contenteditable="false">${developer.totalProjectsDelivered}</td>
            <td contenteditable="false">${developer.totalSqFtDelivered}</td>
            <td contenteditable="false">${developer.reasonForChoosingDeveloper}</td>
            <td><a href="${developer.websiteLink}" target="_blank">${developer.websiteLink}</a></td>
            <td>
                <button class="edit-btn" data-id="${developer.id}">Edit</button>
                <button class="save-btn" style="display:none;" data-id="${developer.id}" onclick="saveRow(this)">Save</button>
                <button class="delete-btn" data-id="${developer.id}">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });


    document.querySelectorAll('.edit-btn').forEach(button => button.addEventListener('click', () => editRow(button)));
    document.querySelectorAll('.delete-btn').forEach(button => button.addEventListener('click', () => deleteDeveloper(button.getAttribute('data-id'))));
}


function editRow(button) {
    const row = button.closest('tr');
    const cells = row.querySelectorAll('td');

    cells.forEach(cell => {
        cell.contentEditable = 'true'; 
    });

    button.style.display = 'none'; 
    row.querySelector('.save-btn').style.display = 'inline-block'; 

   
    const deleteButton = row.querySelector('.delete-btn');
    deleteButton.style.display = 'none'; 
}


async function saveRow(button) {
    const row = button.closest('tr');
    const cells = row.querySelectorAll('td[contenteditable="true"]');
    const developerId = button.getAttribute('data-id');

    const updatedDeveloper = {
        developerName: cells[0].textContent,
        address: cells[1].textContent,
        incorporationDate: cells[2].textContent,
        totalProjectsDelivered: cells[3].textContent,
        totalSqFtDelivered: cells[4].textContent,
        reasonForChoosingDeveloper: cells[5].textContent,
        websiteLink: cells[6].textContent
    };

    await updateDeveloper(developerId, updatedDeveloper);
    cells.forEach(cell => cell.contentEditable = 'false'); 
    button.style.display = 'none'; 
    row.querySelector('.edit-btn').style.display = 'inline-block'; 

    const deleteButton = row.querySelector('.delete-btn');
    deleteButton.style.display = 'inline-block'; 
}

async function updateDeveloper(developerId, updatedDeveloper) {
    try {
        const response = await fetch(`${apiUrl}/${developerId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedDeveloper)
        });

        if (response.ok) {
            alert('Data updated successfully!');
        } else {
            alert('Error updating data.');
        }
    } catch (error) {
        console.error('Error updating data:', error);
    }
}

async function deleteDeveloper(developerId) {
    if (confirm('Are you sure you want to delete this developer?')) {
        try {
            const response = await fetch(`${apiUrl}/${developerId}`, { method: 'DELETE' });
            if (response.ok) {
                alert('Developer deleted successfully!');
                refreshTable(); 
            } else {
                alert('Error deleting developer.');
            }
        } catch (error) {
            console.error('Error deleting developer:', error);
        }
    }
}

document.getElementById('developerForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const newDeveloper = {
        developerName: document.getElementById('developerName').value,
        address: document.getElementById('address').value,
        incorporationDate: document.getElementById('incorporationDate').value,
        totalProjectsDelivered: document.getElementById('totalProjectsDelivered').value,
        totalSqFtDelivered: document.getElementById('totalSqFtDelivered').value,
        reasonForChoosingDeveloper: document.getElementById('reasonForChoosingDeveloper').value,
        websiteLink: document.getElementById('websiteLink').value
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newDeveloper)
        });

        if (response.ok) {
            alert('Developer added successfully!');
            refreshTable(); 
            document.getElementById('developerForm').reset(); 
        } else {
            alert('Error adding developer.');
        }
    } catch (error) {
        console.error('Error adding developer:', error);
    }
});

fetchDevelopers();
