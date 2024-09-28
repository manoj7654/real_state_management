const db = require("../config/db");
const Series = db.collection("series");

// Create Series
const createSeries = async (req, res) => {
    try {
        const { seriesName, towerId, seriesTypology, seriesDetails, addOns } = req.body;

        // Validate required fields
        if (!seriesName || !towerId || !seriesTypology) {
            return res.status(400).json({ error: 'Series Name, Tower ID, and Typology are required' });
        }

        const data = { seriesName, towerId, seriesTypology, seriesDetails, addOns };
        
        // Add series to Firestore
        const result = await Series.add(data);
        res.status(201).json({ message: "Series created successfully", id: result.id });
    } catch (error) {
        res.status(500).json({ error: "Failed to create series" });
    }
};

// Get Series
const getSeriesById = async (req, res) => {
    try {
        const seriesId = req.params.id;
        const series = await Series.doc(seriesId).get();

        if (!series.exists) {
            return res.status(404).json({ error: "Series not found" });
        }

        res.status(200).json({ id: series.id, ...series.data() });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch series" });
    }
};

// Get All Series
const getAllSeries = async (req, res) => {
    try {
        const result = await Series.get();
        const list = result.docs.map((item) => ({ id: item.id, ...item.data() }));
        res.status(200).json({ message: "Series fetched successfully", series: list });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch series" });
    }
};

// Update Series
const updateSeries = async (req, res) => {
    try {
        const seriesId = req.params.id;
        const { seriesName, towerId, seriesTypology, seriesDetails, addOns } = req.body;

        // Validate required fields
        if (!seriesName || !towerId || !seriesTypology) {
            return res.status(400).json({ error: 'Series Name, Tower ID, and Typology are required' });
        }

        const data = { seriesName, towerId, seriesTypology, seriesDetails, addOns };

        // Update series in Firestore
        await Series.doc(seriesId).update(data);
        res.status(200).json({ message: "Series updated successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to update series" });
    }
};

// Delete Series
const deleteSeries = async (req, res) => {
    try {
        const seriesId = req.params.id;

        // Delete series from Firestore
        await Series.doc(seriesId).delete();
        res.status(200).json({ message: "Series deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete series" });
    }
};

module.exports = { createSeries, getSeriesById, getAllSeries, updateSeries, deleteSeries };
