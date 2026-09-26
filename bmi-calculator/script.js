const heightInput = document.getElementById("height");
const weightInput = document.getElementById("weight");
const calculateButton = document.getElementById("calculate-button");
const result = document.getElementById("result");

calculateButton.addEventListener("click", calculateBMI);

function calculateBMI() {
    const height = Number(heightInput.value);
    const weight = Number(weightInput.value);

    if (height <= 0 || weight <= 0) {
        result.textContent = "Please enter valid height and weight.";
        return;
    }

    const heightInMeters = height / 100;

    const bmi = weight / (heightInMeters * heightInMeters);

    let category;

    if (bmi < 18.5) {
        category = "Underweight";
    } else if (bmi < 25) {
        category = "Normal weight";
    } else if (bmi < 30) {
        category = "Overweight";
    } else {
        category = "Obesity";
    }

    result.textContent = `Your BMI is ${bmi.toFixed(1)} (${category})`;
}