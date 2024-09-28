const apiUrl = 'https://wisdompeak.onrender.com/api/projects'; 

function toggleSection(sectionToShow) {
    const formSection = document.getElementById('add-project');
    const listSection = document.getElementById('project-data');

    formSection.style.display = sectionToShow === 'form' ? 'block' : 'none';
    listSection.style.display = sectionToShow === 'list' ? 'block' : 'none';

    if (sectionToShow === 'list') {
        refreshTable(); 
    }
}

document.getElementById('addProjectBtn').addEventListener('click', () => toggleSection('form'));
document.getElementById('projectListBtn').addEventListener('click', () => toggleSection('list'));

toggleSection('list');

document.addEventListener('DOMContentLoaded', refreshTable);

async function fetchProjects() {
    try {
        const response = await fetch(apiUrl);
        const projects = await response.json();
        populateTable(projects);
    } catch (error) {
        console.error('Error fetching projects:', error);
    }
}

function refreshTable() {
    fetchProjects();
}

function populateTable(data) {
    const tableBody = document.querySelector('#projectTable tbody');
    tableBody.innerHTML = '';
    data.forEach(project => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td contenteditable="false">${project.developerId}</td>
            <td contenteditable="false">${project.projectDetails}</td>
            <td contenteditable="false">${project.reraStatus}</td>
            <td contenteditable="false">${project.financials}</td>
            <td contenteditable="false">${project.media.join(', ')}</td>
            <td>
                <button class="edit-btn" data-id="${project.id}">Edit</button>
                <button class="save-btn" style="display:none;" data-id="${project.id}" onclick="saveRow(this)">Save</button>
                <button class="delete-btn" data-id="${project.id}">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });

    document.querySelectorAll('.edit-btn').forEach(button => button.addEventListener('click', () => editRow(button)));
    document.querySelectorAll('.delete-btn').forEach(button => button.addEventListener('click', () => deleteProject(button.getAttribute('data-id'))));
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
    const projectId = button.getAttribute('data-id');

    const updatedProject = {
        developerId: cells[0].textContent,
        projectDetails: cells[1].textContent,
        reraStatus: cells[2].textContent,
        financials: cells[3].textContent,
        media: cells[4].textContent.split(',').map(url => url.trim()) 
    };

    console.log('Updating project ID:', projectId, 'with data:', updatedProject);

    await updateProject(projectId, updatedProject);
    cells.forEach(cell => cell.contentEditable = 'false'); 
    button.style.display = 'none';
    row.querySelector('.edit-btn').style.display = 'inline-block'; 
    row.querySelector('.delete-btn').style.display = 'inline-block'; 
}

async function updateProject(projectId, updatedProject) {
    try {
        const response = await fetch(`${apiUrl}/${projectId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedProject)
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

async function deleteProject(projectId) {
    if (confirm('Are you sure you want to delete this project?')) {
        try {
            const response = await fetch(`${apiUrl}/${projectId}`, { method: 'DELETE' });
            if (response.ok) {
                alert('Project deleted successfully!');
                refreshTable(); 
            } else {
                alert('Error deleting project.');
            }
        } catch (error) {
            console.error('Error deleting project:', error);
        }
    }
}

document.getElementById('projectForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const newProject = {
        developerId: document.getElementById('developerId').value,
        projectDetails: document.getElementById('projectDetails').value,
        reraStatus: document.getElementById('reraStatus').value,
        financials: document.getElementById('financials').value,
        media: document.getElementById('media').value.split(',').map(url => url.trim()) 
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newProject)
        });

        if (response.ok) {
            alert('Project added successfully!');
            refreshTable(); 
            document.getElementById('projectForm').reset(); 
        } else {
            alert('Error adding project.');
        }
    } catch (error) {
        console.error('Error adding project:', error);
    }
});

fetchProjects();
