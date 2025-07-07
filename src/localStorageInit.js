export function initLocalStorage() {
  if (!localStorage.getItem("users")) {
    // USERS
    localStorage.setItem("users", JSON.stringify([
      { id: "1", role: "Admin", email: "admin@entnt.in", password: "admin123" },
      { id: "2", role: "Patient", email: "ananya@entnt.in", password: "ananya123", patientId: "p1" },
      { id: "3", role: "Patient", email: "vijaykumar@entnt.in", password: "vijay123", patientId: "p2" },
      { id: "4", role: "Patient", email: "deepika.nair@entnt.in", password: "deepika123", patientId: "p3" },
      { id: "5", role: "Patient", email: "rohit.rana@entnt.in", password: "rohit123", patientId: "p4" },
      { id: "6", role: "Patient", email: "s.karuna@entnt.in", password: "karuna123", patientId: "p5" },
      { id: "7", role: "Patient", email: "harish@entnt.in", password: "harish123", patientId: "p6" }
    ]));

    // PATIENTS
    localStorage.setItem("patients", JSON.stringify([
      {
        id: "p1",
        name: "Ananya Reddy",
        dob: "15-04-1997",
        contact: "9876543210",
        healthInfo: "No allergies"
      },
      {
        id: "p2",
        name: "Vijay Kumar",
        dob: "08-11-1989",
        contact: "9123456780",
        healthInfo: "Asthmatic"
      },
      {
        id: "p3",
        name: "Deepika Nair",
        dob: "23-06-1995",
        contact: "9988776655",
        healthInfo: "Anemic"
      },
      {
        id: "p4",
        name: "Rohit Rana",
        dob: "03-01-1992",
        contact: "8899776655",
        healthInfo: "Blood pressure under control"
      },
      {
        id: "p5",
        name: "S. Karuna Devi",
        dob: "18-12-1990",
        contact: "9812345670",
        healthInfo: "Diabetic, wears dentures"
      },
      {
        id: "p6",
        name: "Harish Mehta",
        dob: "10-05-2000",
        contact: "7887788778",
        healthInfo: "No recent health issues"
      }
    ]));

    // APPOINTMENTS
    localStorage.setItem("appointments", JSON.stringify([
      {
        id: "a1",
        patientId: "p1",
        patientName: "Ananya Reddy",
        dateTime: "2025-07-04T09:00:00",
        reason: "Tooth Extraction",
        status: "Completed",
        amount: "1500",
        files: [
          { name: "invoice-ananya.pdf", url: "data:application/pdf;base64,SAMPLE_INVOICE_BASE64" }
        ]
      },
      {
        id: "a2",
        patientId: "p1",
        patientName: "Ananya Reddy",
        dateTime: "2025-07-10T11:30:00",
        reason: "Follow-up Cleaning",
        status: "Pending",
        amount: "600",
        files: []
      },
      {
        id: "a3",
        patientId: "p2",
        patientName: "Vijay Kumar",
        dateTime: "2025-07-03T10:45:00",
        reason: "Braces Adjustment",
        status: "Completed",
        amount: "1200",
        files: [
          { name: "xray-vijay.png", url: "data:image/png;base64,SAMPLE_XRAY_BASE64" }
        ]
      },
      {
        id: "a4",
        patientId: "p3",
        patientName: "Deepika Nair",
        dateTime: "2025-07-02T15:15:00",
        reason: "Root Canal",
        status: "Completed",
        amount: "2500",
        files: [
          { name: "invoice-deepika.pdf", url: "data:application/pdf;base64,SAMPLE_RC_INVOICE" }
        ]
      },
      {
        id: "a5",
        patientId: "p4",
        patientName: "Rohit Rana",
        dateTime: "2025-07-01T14:00:00",
        reason: "Gum Infection Treatment",
        status: "Pending",
        amount: "1000",
        files: []
      },
      {
        id: "a6",
        patientId: "p5",
        patientName: "S. Karuna Devi",
        dateTime: "2025-07-06T13:00:00",
        reason: "Crown Placement",
        status: "Pending",
        amount: "1800",
        files: [
          { name: "crown-image-karuna.jpg", url: "data:image/jpeg;base64,SAMPLE_CROWN_IMAGE" }
        ]
      }
    ]));
  }
}
