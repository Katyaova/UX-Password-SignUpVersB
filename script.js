const passwordInput = document.getElementById("password");
const usernameInput = document.getElementById("username");

const strengthText = document.getElementById("strengthText");
const meterfill = document.getElementById("meterfill");
const feedback = document.getElementById("feedback");

const lengthReq = document.getElementById("lengthReq");
const caseReq = document.getElementById("caseReq");
const numberReq = document.getElementById("numberReq");
const symbolReq = document.getElementById("symbolReq");

const continueBtn = document.getElementById("continueBtn");
const warningModal = document.getElementById("warningBtn");
const improveBtn = document.getElementById("improveBtn");
const useAnywayBtn = document.getElementById("useAnywayBtn");

function checkPasswordStrength(password, username) {
    let score = 0;
    let warning = [];

    const hasLength = password.length >=8;
    const hasCase = /[A-Z]/.test(password) && /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[^A-Za-z0-9]/.test(password);

    lengthReq.textContent = `${hasLength ? "✔" : "✖"} At least 8 characters`;
    caseReq.textContent = `${hasCase ? "✔" : "✖"} Includes uppercase & lowercase`;
    numberReq.textContent = `${hasNumber ? "✔" : "✖"} Includes a number`;
    symbolReq.textContent = `${hasSymbol ? "✔" : "✖"} Includes a symbol`;

    if (hasLength) score++;
    if (hasCase) score++;
    if (hasNumber) score++;
    if (hasSymbol) score++;

    const lowerPassword = password.toLowerCase();
    const lowerUsername = username.toLowerCase();

    if (lowerUsername && lowerPassword.includes(lowerUsername)) {
        warning.push("Contains name or username");
    }

    if(/(19\d{2}|20\d{2})/.test(password)){
        warning.push("Contains a year");
    }

    if (/(123|1234|abc|qwerty)/.test(password)){
        warning.push("Contains a common sequence");
    }

    //zxcvbn

    const result = zxcvbn = "Weak";
    let meterWidth = "20%";

    if (scores === 0) {
        strengthLabel = "Very Weak";
        meterWidth = "20%";
    } else if (scores === 1) {
        strengthLabel = "Weak";
        meterWidth = "40%";
    } else if (scores === 2) {
        strengthLabel = "Fair";
        meterWidth = "60%";
    } else if (scores === 3) {
        strengthLabel = "Good";
        meterWidth = "80%";
    } else if (scores === 4) {
        strengthLabel = "Strong";
        meterWidth = "100%";
    }
    

}