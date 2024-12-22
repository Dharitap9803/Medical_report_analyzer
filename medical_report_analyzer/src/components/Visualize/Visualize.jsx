import React from 'react';
import './Visualize.scss';
import PatientInfo from '../PatientInfo/PatientInfo.jsx';
import ReportDetails from '../ReportDetails/ReportDetails.jsx';
import Analysis from '../Analysis/Analysis.jsx';
import AdditionalInfo from '../AdditionalInfo/AdditionalInfo.jsx';

// Predefined JSON data
const reportData = {
  patient_info: {
    patient_id: "12345",
    name: "John Doe",
    age: 45,
    gender: "Male",
    date_of_birth: "1978-05-12",
    report_date: "2023-09-20",
    doctor: "Dr. Smith",
    hospital: "General Hospital"
  },
  report_details: {
    report_type: "Blood Test",
    report_summary: "The patient's blood test shows elevated cholesterol levels.",
    report_sections: [
      {
        section_title: "Cholesterol Panel",
        findings: "Total cholesterol is high.",
        conclusion: "Patient should reduce cholesterol intake.",
        data: {
          parameters: [
            {
              name: "Total Cholesterol",
              value: 250,
              units: "mg/dL",
              reference_range: "125-200 mg/dL"
            }
          ]
        }
      }
    ]
  },
  analysis: {
    diagnosis: [
      {
        condition: "Hypercholesterolemia",
        severity: "moderate",
        description: "Elevated cholesterol levels in the blood."
      }
    ],
    treatment_recommendations: [
      {
        treatment: "Cholesterol-lowering medication",
        medication: {
          name: "Atorvastatin",
          dosage: "10mg",
          duration: "30 days"
        },
        other_treatment: "Dietary changes"
      }
    ],
    lifestyle_recommendations: [
      {
        recommendation: "Reduce fat intake",
        description: "Avoid foods high in saturated fats."
      }
    ],
    follow_up: {
      required: true,
      follow_up_date: "2023-10-20",
      tests_suggested: [
        {
          test_name: "Lipid Panel",
          reason: "Monitor cholesterol levels"
        }
      ]
    }
  },
  additional_info: {
    general_health_advice: [
      {
        topic: "Healthy Eating",
        advice: "Maintain a balanced diet rich in fruits and vegetables."
      }
    ],
    related_articles: [
      {
        title: "How to Reduce Cholesterol",
        link: "https://example.com/reduce-cholesterol"
      }
    ]
  }
};

const Visualize = () => {
  return (
    <div className="app-container">
      <PatientInfo patientInfo={reportData.patient_info} />
      <ReportDetails reportDetails={reportData.report_details} />
      <Analysis analysis={reportData.analysis} />
      <AdditionalInfo additionalInfo={reportData.additional_info} />
    </div>
  );
};

export default Visualize;
