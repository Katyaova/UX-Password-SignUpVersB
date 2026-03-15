const passwordInput = document.getElementById("password");
const usernameInput = document.getElementById("username");

const strengthText = document.getElementById("strengthText");
const meterFill = document.getElementById("meterFill");
const feedback = document.getElementById("feedback");

const lengthReq = document.getElementById("lengthReq");
const caseReq = document.getElementById("caseReq");
const numberReq = document.getElementById("numberReq");
const symbolReq = document.getElementById("symbolReq");

const continueBtn = document.getElementById("continueBtn");
const warningModal = document.getElementById("warningModal");
const improveBtn = document.getElementById("improveBtn");
const useAnywayBtn = document.getElementById("useAnywayBtn");

function meetsMinimumRequirement(password){
    const hasLength = password.length >= 8;
    const hasCase = /[A-Z]/.test(password) && /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[^A-Za-z0-9]/.test(password);

    return hasLength && hasCase && hasNumber && hasSymbol;
}

function checkPasswordStrength(password, username) {
    lengthReq.classList.remove("requirement-error");
    caseReq.classList.remove("requirement-error");
    numberReq.classList.remove("requirement-error");
    symbolReq.classList.remove("requirement-error")

    const hasLength = password.length >= 8;
    const hasCase = /[A-Z]/.test(password) && /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[^A-Za-z0-9]/.test(password);

    lengthReq.textContent = `${hasLength ? "✔" : "☐"} At least 8 characters`;
    caseReq.textContent = `${hasCase ? "✔" : "☐"} Includes uppercase & lowercase`;
    numberReq.textContent = `${hasNumber ? "✔" : "☐"} Includes a number`;
    symbolReq.textContent = `${hasSymbol ? "✔" : "☐"} Includes a symbol`;

    lengthReq.style.color = hasLength ? "#2ecc71" : "#333"
    caseReq.style.color = hasCase ? "#2ecc71" : "#333"
    numberReq.style.color = hasNumber ? "#2ecc71" : "#333"
    symbolReq.style.color = hasSymbol ? "#2ecc71" : "#333"


    const lowerPassword = password.toLowerCase();
    const lowerUsername = username.toLowerCase();

    const warnings = [];

    if (lowerUsername && lowerPassword.includes(lowerUsername)) {
        warnings.push("Contains name or username");
    }

    if (/(19\d{2}|20\d{2})/.test(password)) {
        warnings.push("Contains a year");
    }

    if (/(123|1234|abc|qwerty)/i.test(password)) {
        warnings.push("Contains a common sequence");
    }

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
    } else if (score === 1) {
        strengthLabel = "Weak";
        meterWidth = "40%";
        meterColor = "#ff944d";
    } else if (score === 2) {
        strengthLabel = "Fair";
        meterWidth = "60%";
        meterColor = "#ffd633";
    } else if (score === 3) {
        strengthLabel = "Good";
        meterWidth = "80%";
        meterColor = "#9be564";
    } else if (score === 4) {
        strengthLabel = "Strong";
        meterWidth = "100%";
        meterColor = "#33cc66";
    }

    strengthText.textContent = `Password Strength: ${strengthLabel}`;
    strengthText.style.color = meterColor;

    meterFill.style.width = meterWidth;
    meterFill.style.backgroundColor = meterColor;

    if (warnings.length > 0) {
        feedback.textContent = `Estimated crack time: ${crackTime} • ${warnings.join(", ")}`;
    } else {
        feedback.textContent = `Estimated crack time: ${crackTime}`;
    }

    return { score, warnings };
}

passwordInput.addEventListener("input", function () {
    checkPasswordStrength(passwordInput.value, usernameInput.value);
});

usernameInput.addEventListener("input", function () {
    checkPasswordStrength(passwordInput.value, usernameInput.value);
});

continueBtn.addEventListener("click", function () {
    const password = passwordInput.value;
    const username = usernameInput.value;

    const result = checkPasswordStrength(password, username);

    const hasLength = password.length >= 8;
    const hasCase = /[A-Z]/.test(password) && /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[^A-Za-z0-9]/.test(password);

    if (!hasLength) lengthReq.classList.add("requirement-error");
    if (!hasCase) caseReq.classList.add("requirement-error");
    if (!hasNumber) numberReq.classList.add("requirement-error");
    if (!hasSymbol) symbolReq.classList.add("requirement-error");

    if (!(hasLength && hasCase && hasNumber && hasSymbol)) {
        passwordInput.focus();
        return;
    }

    if (result.warnings.length > 0 ) {
        warningModal.classList.remove("hidden");
    } else {
        alert ("Account created successfully")
    }
});

improveBtn.addEventListener("click", function () {
    warningModal.classList.add("hidden");
    passwordInput.focus();
});

useAnywayBtn.addEventListener("click", function () {
    warningModal.classList.add("hidden");
    alert("Account created with current password.");
});