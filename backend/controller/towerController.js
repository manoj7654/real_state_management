const db = require("../config/db");
const Tower = db.collection("towers");

// Create Tower
const createTower = async (req, res) => {
    try {
        const {
            projectId,
            developerId,
            towerNumber,
            towerName,
            towerPhase,
            phaseReraNumber,
            deliveryTimeline,
            currentStatus,
            duplicateTowerOption,
            totalFloors,
            towerCoreDetails,
        } = req.body;

        // Validation checks
        if (!projectId || !developerId || !towerNumber || !towerName) {
            return res.status(400).json({ error: 'Project ID, Developer ID, Tower Number, and Tower Name are required' });
        }

        const data = {
            projectId,
            developerId,
            towerNumber,
            towerName,
            towerPhase,
            phaseReraNumber,
            deliveryTimeline,
            currentStatus,
            duplicateTowerOption,
            totalFloors,
            towerCoreDetails,
        };
     console.log(data)
        // Add tower to Firestore
        const result = await Tower.add(data);
        res.status(201).json({ id: result.id, message: 'Tower created successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create tower' });
    }
};

// Get All Towers
const getAllTowers = async (req, res) => {
    try {
        const result = await Tower.get();
        const list = result.docs.map((item) => ({ id: item.id, ...item.data() }));
        res.status(200).json({ message: "Towers fetched successfully", Towers: list });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch towers' });
    }
};

// Get Tower by ID
const getTowerById = async (req, res) => {
    try {
        const tower = await Tower.doc(req.params.id).get();

        if (!tower.exists) {
            return res.status(404).json({ error: 'Tower not found' });
        }

        res.status(200).json({ id: tower.id, ...tower.data() });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

// Update Tower
const updateTower = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;

        await Tower.doc(id).update(data);
        res.status(200).json({ message: "Tower updated successfully" });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update tower' });
    }
};

// Delete Tower
const deleteTower = async (req, res) => {
    try {
        const id = req.params.id;
        await Tower.doc(id).delete();
        res.status(200).json({ message: "Tower deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete tower' });
    }
};

module.exports = {
    createTower,
    getAllTowers,
    getTowerById,
    updateTower,
    deleteTower,
};
