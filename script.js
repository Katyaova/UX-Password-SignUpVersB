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
const warningModal = document.getElementById("continueBtn");
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
    hasCase.textContent = `${hasCase ? "✔" : "✖"} Includes uppercase & lowercase`;
    hasNumber.textContent = `${hasNumber ? "✔" : "✖"} Includes a number`;
    hasSymbol.textContent = `${hasSymbol ? "✔" : "✖"} Includes a symbol`;

    if (hasLength) score++;
    if (hasCase) score++;
    if (hasNumber) score++;
    if (hasSymbol) score++;
}