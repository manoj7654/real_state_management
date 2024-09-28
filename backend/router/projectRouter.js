const express = require('express');
const {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
} = require('../controller/projectController');

const projectRouter = express.Router();

projectRouter.post('/projects', createProject);
projectRouter.get('/projects', getAllProjects);
projectRouter.get('/projects/:id', getProjectById);
projectRouter.put('/projects/:id', updateProject);
projectRouter.delete('/projects/:id', deleteProject);

module.exports = projectRouter;