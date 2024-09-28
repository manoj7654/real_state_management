const db = require("../config/db");
const Developers = db.collection("developers");

// Create Developer
const createDeveloper = async (req, res) => {
  try {
    const {
      developerName,
      address,
      incorporationDate,
      totalProjectsDelivered,
      totalSqFtDelivered,
      reasonForChoosingDeveloper,
      websiteLink,
    } = req.body;

    // Validation checks
    if (!address) {
      return res.status(400).json({ error: 'Address is required' });
    }
    if (!incorporationDate) {
      return res.status(400).json({ error: 'Incorporation date is required' });
    }
    if (!totalProjectsDelivered) {
      return res.status(400).json({ error: 'Total projects delivered is required' });
    }
    if (!totalSqFtDelivered) {
      return res.status(400).json({ error: 'Total square feet delivered is required' });
    }
    if (!reasonForChoosingDeveloper) {
      return res.status(400).json({ error: 'Reason for choosing developer is required' });
    }
    if (!websiteLink) {
      return res.status(400).json({ error: 'Website link is required' });
    }

    const data = {
      developerName,
      address,
      incorporationDate,
      totalProjectsDelivered,
      totalSqFtDelivered,
      reasonForChoosingDeveloper,
      websiteLink,
    };

    // Add developer to Firestore
    const result = await Developers.add(data);
    res.status(201).json({ id: result.id, message: 'Developer created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Developers
const getAllDevelopers = async (req, res) => {
  try {
    const result = await Developers.get();
    const developers = result.docs.map((item) => ({ id: item.id, ...item.data() }));
    res.status(200).json(developers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Developer by ID
const getDeveloperById = async (req, res) => {
  try {
    const developer = await Developers.doc(req.params.id).get();

    if (!developer.exists) {
      return res.status(404).json({ error: 'Developer not found' });
    }

    res.status(200).json({ id: developer.id, ...developer.data() });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Update Developer
const updateDeveloper = async (req, res) => {
  try {
    const data = req.body;
    const id = req.params.id;

    // Update developer in Firestore
    await Developers.doc(id).update(data);
    res.status(200).json({ message: 'Developer updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Developer
const deleteDeveloper = async (req, res) => {
  try {
    const id = req.params.id;
    await Developers.doc(id).delete();
    res.status(200).json({ message: 'Developer deleted successfully' });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  createDeveloper,
  getAllDevelopers,
  getDeveloperById,
  updateDeveloper,
  deleteDeveloper,
};
