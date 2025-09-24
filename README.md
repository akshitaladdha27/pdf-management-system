# pdf-management-system

## Documentation – Configuration System Design

This project demonstrates a **configuration-driven backend system** for generating PDF reports from assessment data along with a **secure user authentication system**. It consists of two major parts:

1.  **User Authentication System**
    
2.  **PDF Report Generation System**
    

Both the **frontend (React + Tailwind)** and **backend (Node.js + Express + Puppeteer)** work together.

* * *

## 1\. User Authentication System

### Required Functionality Implemented

*   **User Registration (Signup):**
    
    *   Validates input fields (username, email, password).
        
*   **User Login:**
    
    *   Secure authentication with password validation.
        
*   **Backend Authentication API:**
    
    *   Endpoints for registration and login.
        
*   **Frontend Forms:**
    
    *   User-friendly signup and login pages.
        

* * *

## 2\. PDF Report Generation System

### Authentication Requirement

# 

*   **User must be logged in** to generate a PDF.
    
*   Without login, PDF generation is not allowed.
    

### How PDF Generation Works

# 

1.  User logs in using the authentication system.
    
2.  After login, user can click **“Generate PDF”** button.
    
3.  Backend API receives the `session_id` parameter.
    
4.  System reads the corresponding assessment data from `data.js`.
    
5.  Configuration details for sections, mappings, and classification are taken from `config.js`.
    
6.  PDF is generated and stored in the backend under the `/pdf-reports` folder.
    
7.  API responds with success/failure status.
    

### Flexibility with Config

# 

*   New **assessment types** can be supported just by updating `config.js`.
    
*   You can **add/edit assessment data** in `data.js`.
    
*   No code modification is required—everything is **configuration-driven**.
    


## 3\. How the System Works

### Data Flow

1. **Assessment data** is stored in data.js.

2. Each record is identified by a unique session_id.

3. The frontend sends a request with session_id to the /generate-report API endpoint (only accessible after login).

4. The backend fetches the corresponding assessment record from data.js.

5. The system checks the assessment_id and selects the correct configuration from config.js.

6. Based on this configuration, the system generates a PDF using Puppeteer.

7. The generated PDF is saved in the backend under the /pdf-reports folder.
    

### API Endpoint

`POST /generate-report Parameters: session_id Response: { status: "success" | "failure" } Action: Generate PDF and save locally`

* * *

## 4\. How to Add a New Assessment Type

1. To add a report for a new assessment, you simply add a new entry to the reportConfig object.

2. Open the backend/src/config.js file.

3. Add a new key to the reportConfig object. This key must match the assessment_id of the new assessment type.

4. Define the reportTitle and a sections array for the new report.

* * *

## 5\. Technical Implementation

### Data Storage

*   Data stored in `data.js` (no database).
    
*   Each record linked via `session_id`.
    

### Backend

*   **Node.js + Express (JavaScript)**
    
*   **Puppeteer** for HTML → PDF conversion
    
*   Saves generated PDFs to `/reports` folder
    

### Frontend

*   **React.js (Create React App)**
    
*   **Tailwind CSS** for styling
    
*   Authentication UI (signup/login forms)
    
*   Simple interface to trigger report generation (optional)
    

* * *

## How to Run the Project

### 1\. Clone Repo

`git clone <repo-url> cd <repo-folder>`

### 2\. Install Dependencies

For **frontend**:

`cd frontend npm install`

### 3\. Start the Project

Run **backend**:

`npm run dev`

Run **frontend**:

`npm start`

Both frontend and backend will run together, making the system functional.
