// Get references to elements
const form = document.getElementById('resume-form') as HTMLFormElement;
const resumeDisplayElement = document.getElementById('resume-display') as HTMLDivElement;
const educationContainer = document.getElementById('education-container') as HTMLDivElement;
const profileImageInput = document.getElementById('profile-image') as HTMLInputElement;
const addEducationBtn = document.getElementById('add-education-btn') as HTMLButtonElement;



let imageURL = '';

profileImageInput.addEventListener('change', () => {
    if (profileImageInput.files && profileImageInput.files[0]) {
        const file = profileImageInput.files[0];
        imageURL = URL.createObjectURL(file);
    }
});

// Function to add a new education entry
const addEducationEntry = (): void => {
    const educationEntry = document.createElement('div');
    educationEntry.classList.add('education-entry');

    // Create input for degree
    const degreeInput = document.createElement('input');
    degreeInput.type = 'text';
    degreeInput.placeholder = 'Degree (e.g., Bachelor\'s)';
    degreeInput.className = 'degree-input';
    degreeInput.required = true;

    // Create input for start year
    const startYearInput = document.createElement('input');
    startYearInput.type = 'number';
    startYearInput.placeholder = 'Start Year';
    startYearInput.className = 'start-year-input';
    startYearInput.required = true;

    // Create input for end year
    const endYearInput = document.createElement('input');
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
form.addEventListener('submit', (event) => {
    event.preventDefault();

    // Collect input values
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const phone = (document.getElementById('phone') as HTMLInputElement).value;
    const skillsInput = (document.getElementById('skills') as HTMLInputElement).value;
    const hobbiesInput = (document.getElementById('hobbies') as HTMLInputElement).value;
    const objective = (document.getElementById('career-objective') as HTMLTextAreaElement).value;
    const experience = (document.getElementById('experience') as HTMLTextAreaElement).value;

    // Process skills
    const skills = skillsInput.split(',').map(skill => skill.trim());

    // Process hobbies
    const hobbies = hobbiesInput.split(',').map(hobby => hobby.trim());

    // Process education entries
    const educationEntries = document.querySelectorAll<HTMLDivElement>('.education-entry');
    const educationList: string[] = [];

    educationEntries.forEach(entry => {
        const degree = (entry.querySelector('.degree-input') as HTMLInputElement).value.trim();
        const startYear = (entry.querySelector('.start-year-input') as HTMLInputElement).value.trim();
        const endYear = (entry.querySelector('.end-year-input') as HTMLInputElement).value.trim();

        if (degree && startYear && endYear) {
            educationList.push(`${degree} <br> (Start Year: ${startYear}, End Year: ${endYear})`);
        }
    });

    // Generate the resume content dynamically
    const resumeHTML = `
    <div id="resume-box">
        <div id="left-section">
            <div class="profile-image">
                ${imageURL ? `<img src="${imageURL}" alt="Profile Image"> `: ''}
            </div>

            <div class="skill">
                <h3>Skills</h3>
                <ul>${skills.map(skill => `<li>${skill}</li>`).join('')}</ul>
            </div>

            <div class="hobby">
                <h3>Hobbies</h3>
                <ul>${hobbies.map(hobby => `<li>${hobby}</li>`).join('')}</ul>
            </div>

            <div class="contact">
                <h3>Contact </h3>
                <p><b>Email:</b> ${email}</p>
                <p><b>Phone:</b> ${phone}</p>
            </div>
        </div>
        
        <div id="right-section">
            <div class="name">
                <h1>${name}</h1>
            </div>

            <div class="education">
                <h3>Education</h3>
                <ul>${educationList.map(entry => `<li>${entry}</li>`).join('')}</ul>
            </div>

            <div class="experience">
                <h3>Work Experience</h3>
                <p>${experience}</p>
            </div>

            <div class="career-objective">
                <h3>Career Objective</h3>
                <p>${objective}</p>
            </div>

        </div>
    </div>
    `;

    // Display the generated resume`
    if (resumeDisplayElement) {
        resumeDisplayElement.innerHTML = resumeHTML;
    } else {
        console.error('The resume display element is missing.');
    }
});

// Add event listener to "Add Education" button
addEducationBtn.addEventListener('click', addEducationEntry);