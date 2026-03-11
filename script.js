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
 
    let warning = [];

    const hasLength = password.length >=8;
    const hasCase = /[A-Z]/.test(password) && /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[^A-Za-z0-9]/.test(password);

    lengthReq.textContent = `${hasLength ? "✔" : "✖"} At least 8 characters`;
    caseReq.textContent = `${hasCase ? "✔" : "✖"} Includes uppercase & lowercase`;
    numberReq.textContent = `${hasNumber ? "✔" : "✖"} Includes a number`;
    symbolReq.textContent = `${hasSymbol ? "✔" : "✖"} Includes a symbol`;



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

    const result = zxcvbn(password, [username]);
    const score = result.score;
    const crackTime = result.crack_times_display.offline_slow_hashing_1e4_per_second;

    let strengthLabel = "Very Weak";
    let meterWidth = "20%";
    let meterColor = "#ff4d4d"; 

    if (score === 0) {
        strengthLabel = "Very Weak";
        meterWidth = "20%";
        meterColor = "#ff4d4d";

    } else if (scores === 1) {
        strengthLabel = "Weak";
        meterWidth = "40%";
        meterColor = "#ff944d";

    } else if (scores === 2) {
        strengthLabel = "Fair";
        meterWidth = "60%";
        meterColor = "#ffd633";

    } else if (scores === 3) {
        strengthLabel = "Good";
        meterWidth = "80%";
        meterColor = "#9be564";

    } else if (scores === 4) {
        strengthLabel = "Strong";
        meterWidth = "100%";
        meterColor = "#33cc66";
    }

    meterfill.stylewidth = meterWidth;
    meterfill.style.backgroundColor = meterColor;
    strengthText.textContent = `Password Strength: ${strengthLabel}`;
    feedback.textContent = `Estimated crack time: ${crackTime}`;

    return {
        score, crackTime, warning };
}

passwordInput.addEventListener("input", function () {
    checkPasswordStrength(passwordInput.ariaValueMax, usernameInput.value);
});

usernameInput.addEventListener("input", function (){
    checkPasswordStrength(passwordInput.ariaValueMax, usernameInput.value);
});

continueBtn.addEventListener("click", function () {
    const result = checkPasswordStrength(passwordInput.value, usernameInput.value);
onst
    if (result.warning.length > 0) {
        warningModal.classList.remove("hidden");
    } else {
        alert("Account created successfully.");
    }
});

improveBtn.addEventListener("click", function (){
    warningModal.classList.add("hidden");
    passwordInput.focus();
});

useAnywayBtn.addEventListener("click", function (){
    warningModal.classList.add("hidden");
    alert("Account created with current password");
});