const reportConfig = {
  "as_hr_02": { // Health & Fitness Assessment
    reportTitle: "Health & Fitness Assessment Report",
    sections: [
      {
        title: "Key Body Vitals",
        fields: [
          { label: "Wellness Score", path: "wellness_score", unit: "/ 100" },
          { label: "Heart Rate", path: "vitals.heart_rate", unit: "bpm" },
          { label: "Blood Pressure (Systolic)", path: "vitals.bp_sys", unit: "mmHg" },
          { label: "Blood Pressure (Diastolic)", path: "vitals.bp_dia", unit: "mmHg" },
          { label: "Oxygen Saturation", path: "vitals.oxy_sat_prcnt", unit: "%" },
        ],
      },
      {
        title: "Heart Health",
        fields: [
            { label: "Heart Rate Recovery (HRR)", path: "vitalsMap.metadata.heart_scores.HRR", unit: "bpm" },
        ]
      },
      // NEW SECTION ADDED
      {
        title: "Stress Level",
        fields: [
            { label: "Stress Index", path: "vitalsMap.metadata.heart_scores.stress_index" },
        ]
      },
      {
        title: "Fitness Levels",
        fields: [
            { label: "Jog Test Duration", path: "exercises[id=235].time", unit: "s" },
            { label: "Squat Repetitions", path: "exercises[id=259].correctReps", unit: "reps" },
            { label: "VO2 Max", path: "vitalsMap.metadata.physiological_scores.vo2max" },
        ]
      },
      // RENAMED
      {
        title: "Posture",
        fields: [
            { label: "Frontal Body Score", path: "exercises[id=73].analysisScore", unit: "/ 100" },
            { label: "Side Body Score", path: "exercises[id=74].analysisScore", unit: "/ 100" },
        ]
      },
      {
        title: "Body Composition",
        fields: [
          { label: "Body Mass Index (BMI)", path: "bodyCompositionData.BMI" },
          { label: "Body Fat Percentage", path: "bodyCompositionData.BFC", unit: "%" },
          { label: "Metabolic Age", path: "bodyCompositionData.M_Age", unit: "years" },
        ],
      },
    ],
  },
  "as_card_01": { // Cardiac Assessment
    reportTitle: "Cardiac Assessment Report",
    sections: [
      {
        title: "Key Body Vitals",
        fields: [
          { label: "Heart Rate", path: "vitals.heart_rate", unit: "bpm" },
          { label: "Systolic BP", path: "vitals.bp_sys", unit: "mmHg" },
          { label: "Diastolic BP", path: "vitals.bp_dia", unit: "mmHg" },
        ],
      },
      {
        title: "Cardiovascular Endurance",
        fields: [
          { label: "Jog Test Duration", path: "exercises[id=235].time", unit: "s" },
          { label: "VO2 Max", path: "vitalsMap.metadata.physiological_scores.vo2max" },
        ],
      },
      {
        title: "Body Composition",
        fields: [
            { label: "Body Mass Index (BMI)", path: "bodyCompositionData.BMI" },
            { label: "Body Fat Percentage", path: "bodyCompositionData.BFC", unit: "%" },
        ]
      }
    ],
  },
};

module.exports = { reportConfig };