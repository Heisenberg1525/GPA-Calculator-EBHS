document.getElementById("gpa-form").addEventListener("submit", function(event) {
    event.preventDefault();

    var gradeInput = document.getElementById("grade");
    var typeInput = document.getElementById("type");
    var resultDiv = document.getElementById("result");

    var grade = parseFloat(gradeInput.value);
    var type = parseInt(typeInput.value);

    if (isNaN(grade)) {
        resultDiv.textContent = "Please enter a valid grade.";
        return;
    }

    var gpa = calculateGPA(grade, type);
    resultDiv.textContent = "Your GPA is: " + gpa.toFixed(2);
});

function calculateGPA(grade, type) {
    if (type === 1) {
        return grade / 20.0;
    } else if (type === 2) {
        return (grade / 20.0) + 1;
    } else if (type === 3) {
        return (grade / 20.0) + 2;
    }
}
