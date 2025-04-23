// Generates a random string of a given length
function generateRandomString(length) {
  const characters = 'abcdefghijklmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

// Generates a random email
function generateRandomEmail() {
  const domain = generateRandomString(5);
  const topLevelDomain = generateRandomString(3);
  return `${generateRandomString(4)}@${domain}.${topLevelDomain}`;
}

// Generates a random phone number of 6 digits
function generateRandomPhoneNumber() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Generates a random password of 20 characters
function generateRandomPassword() {
  return generateRandomString(20);
}

// Generate random data
const studentFirstName = generateRandomString(10);
const studentLastName = generateRandomString(10);
const studentEmail = generateRandomEmail();
const studentPhoneNumber = generateRandomPhoneNumber();
const studentPassword = generateRandomPassword();

const tutorFirstName = generateRandomString(10);
const tutorLastName = generateRandomString(10);
const tutorEmail = generateRandomEmail();
const tutorPhoneNumber = generateRandomPhoneNumber();
const tutorPassword = generateRandomPassword();

const adminEmail = 'admin@test.com'
const adminPassword ='test1234'

describe('Test Appointment', () => {
  it('Navigate to register', () => {
    cy.visit('http://localhost:3000/')
    
    // Assert register link exists and click through
    cy.get('a[href="/register"]').click()
    cy.url().should('include', '/register')
  })

  it('Student registration', () => {
    cy.visit('http://localhost:3000/')
    
    // Assert register link exists and click through
    cy.get('a[href="/register"]').click()
    cy.url().should('include', '/register')

    // Get student button
    cy.get('input[type="radio"][value="Student"]').click();

    // Click next button
    cy.contains('Next').click();

    
    // Fill the form
    cy.get('input#\\:r7\\:').type(studentFirstName);
    cy.get('input#\\:r9\\:').type(studentLastName);
    cy.get('input#\\:rb\\:').type(studentEmail);
    cy.get('input#\\:rd\\:').type(studentPhoneNumber);
    cy.get('input[name="gender"][value="Male"]').check();
    cy.get('input#\\:rj\\:').click();
    cy.contains('button', '1').click();
    cy.contains('button', 'OK').click();
    cy.get('input#\\:rn\\:').type(studentPassword);
    cy.get('input#\\:rp\\:').type(studentPassword);

    // Click next button
    cy.contains('Next').click();

    // Fill the form
    cy.get('input#react-select-3-input').type('Australia{enter}');
    cy.get('input#\\:rt\\:').type('1 Temp Street');
    cy.get('input#\\:rv\\:').type('Temp');
    cy.get('input#\\:r11\\:').type('ACT');
    cy.get('input#\\:r13\\:').type('0000');

    // Click next button
    cy.contains('Next').click();

    // Fill the form
    cy.get('input#react-select-5-input').type('University{enter}');
    cy.get('input#react-select-7-input').type('comp3900{enter}');

    // Click next button
    cy.contains('Next').click();

    // Fill the form
    cy.get('textarea#\\:r15\\:').type('This is a temp bio');
   
    // Click next button
    cy.contains('Register').click();

    // Login
    cy.visit('http://localhost:3000')
    cy.get('input#\\:r1\\:').type(studentEmail);
    cy.get('input#\\:r3\\:').type(studentPassword);

    cy.contains('Log In').click();

  })

  it('Navigate to register', () => {
    cy.visit('http://localhost:3000/')
    
    // Assert register link exists and click through
    cy.get('a[href="/register"]').click()
    cy.url().should('include', '/register')
  })

  it('Tutor registration', () => {
    cy.visit('http://localhost:3000/')
    
    // Assert register link exists and click through
    cy.get('a[href="/register"]').click()
    cy.url().should('include', '/register')

    // Get student button
    cy.get('input[type="radio"][value="Tutor"]').click();

    // Click next button
    cy.contains('Next').click();

    
    // Fill the form
    cy.get('input#\\:r7\\:').type(tutorFirstName);
    cy.get('input#\\:r9\\:').type(tutorLastName);
    cy.get('input#\\:rb\\:').type(tutorEmail);
    cy.get('input#\\:rd\\:').type(tutorPhoneNumber);
    cy.get('input[name="gender"][value="Male"]').check();
    cy.get('input#\\:rj\\:').click();
    cy.contains('button', '1').click();
    cy.contains('button', 'OK').click();
    cy.get('input#\\:rn\\:').type(tutorPassword);
    cy.get('input#\\:rp\\:').type(tutorPassword);

    // Click next button
    cy.contains('Next').click();

    // Fill the form
    cy.get('input#react-select-3-input').type('Australia{enter}');
    cy.get('input#\\:rt\\:').type('1 Temp Street');
    cy.get('input#\\:rv\\:').type('Temp');
    cy.get('input#\\:r11\\:').type('ACT');
    cy.get('input#\\:r13\\:').type('0000');

    // Click next button
    cy.contains('Next').click();

    // Fill the form
    cy.get('textarea#\\:r15\\:').type('This is temp experience ');
    cy.get('input#react-select-5-input').type('comp3900{enter}');

    // Click next button
    cy.contains('Next').click();

    // Fill the form
    cy.get('input#\\:r17\\:').type('100');
    cy.get('textarea#\\:r19\\:').type('This is a temp bio');

    // Click next button
    cy.contains('Register').click();

    // Login
    cy.visit('http://localhost:3000')
    cy.get('input#\\:r1\\:').type(tutorEmail);
    cy.get('input#\\:r3\\:').type(tutorPassword);

    cy.contains('Log In').click();

  })

  it('Accept tutor as admin', () => {


    // Login
    cy.visit('http://localhost:3000')
    cy.get('input#\\:r1\\:').type(adminEmail);
    cy.get('input#\\:r3\\:').type(adminPassword);
  
    cy.contains('Log In').click();
  
    cy.contains('View Application').click();

    cy.wait(1000);

    cy.document().then((doc) => {
      const headings = Array.from(doc.querySelectorAll('h1'));
      const acceptHeading = headings.find(h1 => h1.textContent === 'Accept');
      const acceptButton = acceptHeading ? acceptHeading.closest('button') : null;
  
      if (acceptButton) {
        acceptButton.addEventListener('click', () => {
          setTimeout(() => {
            doc.location.reload();
          }, 1000);
        });
      }
    });
  

    cy.contains('Accept').click((e) => {
      e.preventDefault();
    });
});

  it('Create Appointment Request', () => {
      // Login
      cy.visit('http://localhost:3000')
      cy.get('input#\\:r1\\:').type(studentEmail);
      cy.get('input#\\:r3\\:').type(studentPassword);
  
      cy.contains('Log In').click();
  
      cy.contains('Find Tutors').click();

      cy.contains(`${tutorFirstName}`).click();

      cy.contains('Request Appointment').click();

      cy.get('input[placeholder="DD/MM/YYYY"][readonly]').click();
      cy.contains('button', '30').click();
      cy.contains('button', 'OK').click();
  
      // Alias for 'OK' button to reuse it
      const clickOkButton = () => {
        cy.contains('button', 'OK').should('be.visible').click();
      };

      // Interact with Start Time
      cy.contains('label', 'Start Time').parent('.MuiFormControl-root').find('button[aria-label="Choose time"]').click();
      cy.contains('li', '01').should('be.visible').click();
      cy.contains('li', '00').should('be.visible').click();
      cy.contains('li', 'PM').should('be.visible').click();
      clickOkButton();  // Use aliased function

      // Interact with End Time
      cy.contains('label', 'End Time').parent('.MuiFormControl-root').find('button[aria-label="Choose time"]').click();
      cy.contains('li', '02').should('be.visible').click();
      cy.contains('li', '00').should('be.visible').click();
      cy.contains('li', 'PM').should('be.visible').click();
      clickOkButton();  // Use aliased function

      cy.get('input#react-select-9-input').type('comp3900{enter}');
      cy.get('input#react-select-11-input').type('teams{enter}');

      cy.contains('Submit Request').click();
  })

  it('Accept Appointment Request and send message', () => {
    // Login
    cy.visit('http://localhost:3000')
    cy.get('input#\\:r1\\:').type(tutorEmail);
    cy.get('input#\\:r3\\:').type(tutorPassword);

    cy.contains('Log In').click();

    cy.wait(2500)

    cy.contains('Accept').click();

    cy.visit('http://localhost:3000/home/tutor-dashboard')
    cy.wait(2500)

    cy.contains('button', 'Message').click();
  
    cy.wait(1000)

    cy.get('#\\:r1\\:').type('sample message');
    cy.contains('button', 'Send').click();
  })
  
})

describe('Test Reports and Ban', () => {

  it('Create Report Request', () => {
    // Login
    cy.visit('http://localhost:3000')
    cy.get('input#\\:r1\\:').type(studentEmail);
    cy.get('input#\\:r3\\:').type(studentPassword);

    cy.contains('Log In').click();

    cy.contains('Find Tutors').click();

    cy.contains(`${tutorFirstName}`).click();

    cy.contains('Report').click();

    cy.get('.css-1jn6u9q-control').type('case{enter}');

    cy.get('textarea[aria-invalid="false"]:visible').type('sample explanation');

    cy.contains('Submit Report').click();

  })

  it('Review Report and Ban', () => {
    // Login
    cy.visit('http://localhost:3000')
    cy.get('input#\\:r1\\:').type(adminEmail);
    cy.get('input#\\:r3\\:').type(adminPassword);
  
    cy.contains('Log In').click();
  
    cy.contains('Reports').click();
    
    cy.contains('View Report').click();

    cy.contains('Mark as resolved').click();
  });

})
