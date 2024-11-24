// Get references to elements
var form = document.getElementById('resume-form');
var resumeDisplayElement = document.getElementById('resume-display');
var educationContainer = document.getElementById('education-container');
var profileImageInput = document.getElementById('profile-image');
var addEducationBtn = document.getElementById('add-education-btn');
var imageURL = '';
profileImageInput.addEventListener('change', function () {
    if (profileImageInput.files && profileImageInput.files[0]) {
        var file = profileImageInput.files[0];
        imageURL = URL.createObjectURL(file);
    }
});
// Function to add a new education entry
var addEducationEntry = function () {
    var educationEntry = document.createElement('div');
    educationEntry.classList.add('education-entry');
    // Create input for degree
    var degreeInput = document.createElement('input');
    degreeInput.type = 'text';
    degreeInput.placeholder = 'Degree (e.g., Bachelor\'s)';
    degreeInput.className = 'degree-input';
    degreeInput.required = true;
    // Create input for start year
    var startYearInput = document.createElement('input');
    startYearInput.type = 'number';
    startYearInput.placeholder = 'Start Year';
    startYearInput.className = 'start-year-input';
    startYearInput.required = true;
    // Create input for end year
    var endYearInput = document.createElement('input');
    endYearInput.type = 'number';
    endYearInput.placeholder = 'End Year';
    endYearInput.className = 'end-year-input';
    endYearInput.required = true;
    // Append inputs to the education entry
    educationEntry.appendChild(degreeInput);
    educationEntry.appendChild(startYearInput);
    educationEntry.appendChild(endYearInput);
    // Append the entry to the container
    educationContainer.appendChild(educationEntry);
};
// Handle form submission
form.addEventListener('submit', function (event) {
    event.preventDefault();
    // Collect input values
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var skillsInput = document.getElementById('skills').value;
    var hobbiesInput = document.getElementById('hobbies').value;
    var objective = document.getElementById('career-objective').value;
    var experience = document.getElementById('experience').value;
    // Process skills
    var skills = skillsInput.split(',').map(function (skill) { return skill.trim(); });
    // Process hobbies
    var hobbies = hobbiesInput.split(',').map(function (hobby) { return hobby.trim(); });
    // Process education entries
    var educationEntries = document.querySelectorAll('.education-entry');
    var educationList = [];
    educationEntries.forEach(function (entry) {
        var degree = entry.querySelector('.degree-input').value.trim();
        var startYear = entry.querySelector('.start-year-input').value.trim();
        var endYear = entry.querySelector('.end-year-input').value.trim();
        if (degree && startYear && endYear) {
            educationList.push("".concat(degree, " <br> (Start Year: ").concat(startYear, ", End Year: ").concat(endYear, ")"));
        }
    });
    // Generate the resume content dynamically
    var resumeHTML = "\n    <div id=\"resume-box\">\n        <div id=\"left-section\">\n            <div class=\"profile-image\">\n                ".concat(imageURL ? "<img src=\"".concat(imageURL, "\" alt=\"Profile Image\"> ") : '', "\n            </div>\n\n            <div class=\"skill\">\n                <h3>Skills</h3>\n                <ul>").concat(skills.map(function (skill) { return "<li>".concat(skill, "</li>"); }).join(''), "</ul>\n            </div>\n\n            <div class=\"hobby\">\n                <h3>Hobbies</h3>\n                <ul>").concat(hobbies.map(function (hobby) { return "<li>".concat(hobby, "</li>"); }).join(''), "</ul>\n            </div>\n\n            <div class=\"contact\">\n                <h3>Contact </h3>\n                <p><b>Email:</b> ").concat(email, "</p>\n                <p><b>Phone:</b> ").concat(phone, "</p>\n            </div>\n        </div>\n        \n        <div id=\"right-section\">\n            <div class=\"name\">\n                <h1>").concat(name, "</h1>\n            </div>\n\n            <div class=\"education\">\n                <h3>Education</h3>\n                <ul>").concat(educationList.map(function (entry) { return "<li>".concat(entry, "</li>"); }).join(''), "</ul>\n            </div>\n\n            <div class=\"experience\">\n                <h3>Work Experience</h3>\n                <p>").concat(experience, "</p>\n            </div>\n\n            <div class=\"career-objective\">\n                <h3>Career Objective</h3>\n                <p>").concat(objective, "</p>\n            </div>\n\n        </div>\n    </div>\n    ");
    // Display the generated resume`
    if (resumeDisplayElement) {
        resumeDisplayElement.innerHTML = resumeHTML;
    }
    else {
        console.error('The resume display element is missing.');
    }
});
// Add event listener to "Add Education" button
addEducationBtn.addEventListener('click', addEducationEntry);
