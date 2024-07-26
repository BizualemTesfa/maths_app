let num1;
let num2;

const questionEl = document.getElementById("question");
const inputEl = document.getElementById("input");
const formEl = document.getElementById("form");
const scoreEl = document.getElementById("score");
const operationEl = document.getElementById("operation");
const maxNumEl = document.getElementById("maxNum");
const customAlertEl = document.getElementById("custom-alert");
const customAlertMessageEl = document.getElementById("custom-alert-message");
const customAlertBtn = document.getElementById("custom-alert-btn");

let score = JSON.parse(localStorage.getItem("score"));

if (score === null) {
    score = 0;
}

scoreEl.innerText = `ውጤት: ${score}`;
updateQuestion();

formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    const userAns = parseFloat(inputEl.value);
    const correctAns = calculateAnswer();

    if (userAns === correctAns) {
        score++;
        showAlert("በትክክል ተመልሷል");
    } else {
        score--;
        showAlert("ተሳስተዋል መልሱ፡ " + correctAns + " ነው::");
    }
    scoreEl.innerText = `ውጤት: ${score}`; // Update the DOM
    updateLocalStorage();
    updateQuestion();
    inputEl.value = '';
});

operationEl.addEventListener("change", updateQuestion); // Update question

customAlertBtn.addEventListener("click", () => {
    customAlertEl.style.display = 'none';
});

function showAlert(message) {
    customAlertMessageEl.innerText = message;
    customAlertEl.style.display = 'flex';
}

function updateLocalStorage() {
    localStorage.setItem("score", JSON.stringify(score));
}

function updateQuestion() {
    const maxNum = parseInt(maxNumEl.value) || 30;
    num1 = Math.ceil(Math.random() * maxNum);
    num2 = Math.ceil(Math.random() * maxNum);

    const operation = operationEl.value;
    switch (operation) {
        case 'add':
            questionEl.innerText = `${num1} + ${num2} = ___?`;
            break;
        case 'subtract':
            if (num1 < num2) [num1, num2] = [num2, num1]; // Ensure no negative result
            questionEl.innerText = `ከ ${num1} ሲቀነስ ${num2} ስንት ነው?`;
            break;
        case 'divide':
            num1 = num1 * num2; // Ensure integer result
            questionEl.innerText = `${num1} ሲካፈል ለ${num2} ስንት ነው?`;
            break;
        case 'multiply':
            questionEl.innerText = `${num1} ሲባዛ በ${num2} ስንት ነው?`;
            break;
    }
}

function calculateAnswer() {
    const operation = operationEl.value;
    let correctAns;
    switch (operation) {
        case 'add':
            correctAns = num1 + num2;
            break;
        case 'subtract':
            correctAns = num1 - num2;
            break;
        case 'divide':
            correctAns = num1 / num2;
            break;
        case 'multiply':
            correctAns = num1 * num2;
            break;
    }
    return parseFloat(correctAns);
}
