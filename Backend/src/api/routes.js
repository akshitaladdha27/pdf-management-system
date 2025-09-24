const { Router } = require("express");
const { generateReport } = require('../services/reportGenerator');

const router = Router();

router.get('/generate-report', async (req, res) => {
  const { session_id } = req.query;

  if (!session_id || typeof session_id !== 'string') {
    return res.status(400).json({ status: "failure", message: "session_id is required" });
  }

  try {
    const success = await generateReport(session_id);
    if (success) {
      res.status(200).json({ status: "success", message: `Report for ${session_id} generated.` });
    } else {
      res.status(404).json({ status: "failure", message: "Could not generate report." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "failure", message: "An internal server error occurred." });
  }
});


module.exports = router;
