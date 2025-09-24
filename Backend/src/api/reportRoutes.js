const { Router } = require("express");
const { generateReport } = require('../services/reportGenerator');
const auth = require('../middleware/authMiddleware');

const router = Router();

// @route   GET /api/reports/generate-report
// @desc    Generate a PDF report for a given session_id
// @access  Public (for now, can be protected later)
router.get('/generate-report', auth, async (req, res) => {
  const { session_id } = req.query;

  if (!session_id) {
    return res.status(400).json({ status: "failure", message: "session_id is required" });
  }

  try {
    const success = await generateReport(session_id);
    
    if (success) {
      res.status(200).json({ status: "success", message: `Report for ${session_id} generated.` });
    } else {
      res.status(404).json({ status: "failure", message: "Could not generate report. Session or configuration not found." });
    }
  } catch (error) {
    console.error("Error in /generate-report route:", error);
    res.status(500).json({ status: "failure", message: "An internal server error occurred." });
  }
});

module.exports = router;
