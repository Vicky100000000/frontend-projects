const birthDateInput = document.getElementById("birth-date");
const calculateButton = document.getElementById("calculate-button");
const result = document.getElementById("result");

calculateButton.addEventListener("click", calculateAge);

function calculateAge() {
    const birthDate = new Date(birthDateInput.value);
    const today = new Date();

    if (!birthDateInput.value) {
        result.textContent = "Please enter your date of birth.";
        return;
    }

    if (birthDate > today) {
        result.textContent = "Please enter a valid date of birth.";
        return;
    }

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
        months--;
        days += new Date(
            today.getFullYear(),
            today.getMonth(),
            0
        ).getDate();
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    result.innerHTML = `
        You are <strong>${years} years, ${months} months, 
        and ${days} days</strong> old.
    `;
}