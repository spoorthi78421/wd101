<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Registration Form</title>
  <style>body{
    background-color:blue;
    }</style>
  <script>
    document.addEventListener('DOMContentLoaded', function() {
      // Retrieve saved data from web storage and populate the table if available
      const savedData = JSON.parse(localStorage.getItem('registrationData')) || [];
      populateTable(savedData);

      // Add event listener to the form for submission
      document.getElementById('registrationForm').addEventListener('submit', function(event) {
        event.preventDefault();

        // Validate date of birth
        const dobInput = document.getElementById('dob');
        const dobValue = new Date(dobInput.value);
        const currentDate = new Date();
        const minDate = new Date(currentDate.getFullYear() - 55, currentDate.getMonth(), currentDate.getDate());
        const maxDate = new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate());

        if (dobValue < minDate || dobValue > maxDate) {
          alert('Please enter a valid date of birth between ages 18 and 55.');
          return;
        }

        // Get form data
        const formData = {
          name: document.getElementById('name').value,
          email: document.getElementById('email').value,
          password: document.getElementById('password').value,
          dob: dobInput.value,
          acceptedTerms: document.getElementById('terms').checked,
        };

        // Save data to web storage
        savedData.push(formData);
        localStorage.setItem('registrationData', JSON.stringify(savedData));

        // Populate the table with updated data
        populateTable(savedData);

        // Clear the form
        document.getElementById('registrationForm').reset();
      });

      function populateTable(data) {
        const tableBody = document.getElementById('dataTableBody');
        // Clear existing rows
        tableBody.innerHTML = '';

        // Populate the table with data
        data.forEach(entry => {
          const row = tableBody.insertRow();
          const columns = ['name', 'email', 'password', 'dob', 'acceptedTerms'];

          columns.forEach(column => {
            const cell = row.insertCell();
            cell.textContent = entry[column];
          });
        });
      }
    });
  </script>
</head>
<body>
  <h1>Registration Form</h1>
  <form id="registrationForm">
    <label for="name">Name:</label>
    <input type="text" id="name" required><br>

    <label for="email">Email:</label>
    <input type="email" id="email" required><br>

    <label for="password">Password:</label>
    <input type="password" id="password" required><br>

    <label for="dob">Date of Birth:</label>
    <input type="date" id="dob" required><br>

    <label for="terms">I accept the terms:</label>
    <input type="checkbox" id="terms" required><br>

    <button type="submit">Submit</button>
  </form>

  <h2>Registration Data</h2>
  <table border="1">
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Password</th>
        <th>Dob</th>
        <th>Accepted terms?</th>
      </tr>
    </thead>
    <tbody id="dataTableBody">
      <!-- Table body content will be dynamically populated using JavaScript -->
    </tbody>
  </table>
</body>
</html>
