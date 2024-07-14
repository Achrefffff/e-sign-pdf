E-sign
E-sign is a web application that allows users to upload a PDF, draw their signature on it, and save the signed PDF. This application is particularly useful for electronically signing documents in a secure and efficient manner.

Features
PDF Upload: Users can upload a PDF document to the application.
Signature Drawing: Users can draw their signature on the PDF using a canvas.
Color and Thickness Adjustment: Users can select the color and thickness of the signature.
Clear Signature: Option to clear the signature and start over.
Download Signed PDF: Users can download the signed PDF document.
Responsive Design: The application is designed to be responsive and works well on various devices.
Getting Started
Prerequisites
A web browser that supports HTML5, JavaScript, and canvas.
Installation
Clone the repository:


Navigate to the project directory:

cd e-sign
Usage
Open the index.html file in your web browser.
Upload a PDF document using the file input.
Adjust the color and thickness of the signature as desired.
Draw your signature on the PDF canvas.
Click the "Soumettre" button to save and download the signed PDF.
Project Structure
r
e-sign/
├── index.html
├── app.css
├── app.js
├── README.md
index.html: The main HTML file that contains the structure of the web application.
app.css: The CSS file that contains styles for the web application.
app.js: The JavaScript file that contains the functionality for handling PDF uploads, drawing signatures, and saving the signed PDF.
README.md: The file you are currently reading, which provides information about the application.
Dependencies
pdf-lib - A JavaScript library to create and modify PDF documents.
pdf.js - A Portable Document Format (PDF) library that is used to render PDFs in a <canvas> element.
Contributing
Contributions are welcome! Please fork the repository and submit a pull request for any changes.

Fork the repository.
Create a new branch: git checkout -b feature-branch.
Make your changes and commit them: git commit -m 'Add new feature'.
Push to the branch: git push origin feature-branch.
Submit a pull request.
License
This project is licensed under the MIT License. See the LICENSE file for details.

Acknowledgements
Thanks to the developers of pdf-lib and pdf.js for their amazing libraries.