const db = require("../config/db");
const Projects = db.collection("projects");

// Create Project
const createProject = async (req, res) => {
  try {
    const { developerId, projectDetails, reraStatus, financials, media } = req.body;

    // Validation checks
    if (!developerId || !projectDetails) {
      return res.status(400).json({ error: 'Developer ID and project details are required' });
    }

    if (!financials || !media) {
      return res.status(400).json({ error: 'Financials and media are required' });
    }

    const data = {
      developerId,
      projectDetails,
      reraStatus,
      financials,
      media,
    };

    // Add project to Firestore
    const result = await Projects.add(data);
    res.status(201).json({ id: result.id, message: 'Project created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Projects
const getAllProjects = async (req, res) => {
  try {
    const result = await Projects.get();
    const projects = result.docs.map((item) => ({ id: item.id, ...item.data() }));
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Project by ID
const getProjectById = async (req, res) => {
  try {
    const project = await Projects.doc(req.params.id).get();

    if (!project.exists) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.status(200).json({ id: project.id, ...project.data() });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Update Project
const updateProject = async (req, res) => {
  try {
    const { projectDetails, reraStatus, financials, media } = req.body;

    // Validation check
    if (!projectDetails) {
      return res.status(400).json({ error: 'Project details are required' });
    }

    const data = {
      projectDetails,
      reraStatus,
      financials,
      media,
    };

    // Update project in Firestore
    await Projects.doc(req.params.id).update(data);
    res.status(200).json({ message: 'Project updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Project
const deleteProject = async (req, res) => {
  try {
    await Projects.doc(req.params.id).delete();
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
