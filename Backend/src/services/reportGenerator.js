const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const { reportConfig } = require('../config');
const { assessmentData } = require('../data');

/**
 * Helper: Safely get a nested value from an object using a path string.
 * Supports array filters like 'exercises[id=235].time'.
 * @param {Record<string, any>} data The source data object.
 * @param {string} fullPath The dot-notation path to the desired value.
 * @returns {any} The found value or 'N/A' if not found.
 */
function getValueFromPath(data, fullPath) {
  if (!data || !fullPath) return 'N/A';

  const parts = fullPath.split('.');
  let current = data;

  for (const part of parts) {
    if (current === null || current === undefined) return 'N/A';

    const match = part.match(/(\w+)\[(\w+)=(.+?)\]/);
    if (match) {
      const [, arrayKey, field, value] = match;
      const arr = current[arrayKey];
      current = Array.isArray(arr) ? arr.find(item => String(item[field]) === value) : null;
    } else {
      current = current[part];
    }
  }
  
  const finalValue = current ?? 'N/A';

  if (!isNaN(finalValue) && finalValue !== 'N/A') {
    return parseFloat(parseFloat(finalValue).toFixed(2));
  }
  
  return finalValue;
}

async function generateReport(sessionId) {
  const sessionData = assessmentData.find(d => d.session_id === sessionId);
  if (!sessionData) {
    console.error("Session data not found!");
    return false;
  }

  const assessmentId = sessionData.assessment_id;
  const config = reportConfig[assessmentId];
  if (!config) {
    console.error("Report configuration not found for assessment:", assessmentId);
    return false;
  }

  const sectionsHtml = config.sections.map(section => `
    <h2>${section.title}</h2>
    <ul>
      ${section.fields.map(field => {
        const value = getValueFromPath(sessionData, field.path);
        return `<li><span class="label">${field.label}:</span> ${value} ${field.unit || ''}</li>`;
      }).join('')}
    </ul>
  `).join('');

  const htmlContent = `
    <html>
      <head>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; margin: 40px; color: #333; }
          h1 { color: #1a202c; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; }
          h2 { color: #2d3748; margin-top: 30px; }
          ul { list-style-type: none; padding-left: 0; }
          li { margin-bottom: 8px; font-size: 16px; border-bottom: 1px solid #edf2f7; padding-bottom: 8px; }
          .label { font-weight: 600; color: #4a5568; }
        </style>
      </head>
      <body>
        <h1>${config.reportTitle}</h1>
        ${sectionsHtml}
      </body>
    </html>`;

  // 4. Generate PDF with Puppeteer
  try {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
    const page = await browser.newPage();
    
    await page.setContent(htmlContent, { waitUntil: 'domcontentloaded' });

    const pdfDir = path.join(__dirname, '..', '..', 'pdf_reports');
    await fs.promises.mkdir(pdfDir, { recursive: true });
    const pdfPath = path.join(pdfDir, `${sessionId}.pdf`);

    await page.pdf({ path: pdfPath, format: 'A4', printBackground: true });
    await browser.close();

    console.log(`PDF generated successfully at ${pdfPath}`);
    return true;
  } catch (error) {
    console.error("Error generating PDF:", error);
    return false;
  }
}

module.exports = { generateReport };
