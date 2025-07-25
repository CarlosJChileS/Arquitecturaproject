const express = require('express');
const router = express.Router();
const {
  getAllPlans,
  getPlanById,
  addPlan,
  updatePlan,
  deletePlan
} = require('../../core/application/plansService');
const adminAccess = require('../../shared/middleware/adminAccess');

router.get('/', async (req, res) => {
  try {
    const plans = await getAllPlans();
    res.json(plans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', adminAccess, async (req, res) => {
  try {
    const plan = await addPlan(req.body);
    res.status(201).json(plan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const plan = await getPlanById(req.params.id);
    if (!plan) return res.status(404).json({ error: 'Not found' });
    res.json(plan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', adminAccess, async (req, res) => {
  try {
    const plan = await updatePlan(req.params.id, req.body);
    if (!plan) return res.status(404).json({ error: 'Not found' });
    res.json(plan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', adminAccess, async (req, res) => {
  try {
    const success = await deletePlan(req.params.id);
    if (!success) return res.status(404).json({ error: 'Not found' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
