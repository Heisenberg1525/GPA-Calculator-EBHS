// Grade table for academic courses
const academicGrades = {
  "A+": 4.3,
  "A": 4.0,
  "A-": 3.7,
  "B+": 3.3,
  "B": 3.0,
  "B-": 2.7,
  "C+": 2.3,
  "C": 2.0,
  "C-": 1.7,
  "D+": 1.3,
  "D": 1.0,
  "D-": 0.7,
  "F": 0.0
};

// Grade table for honors courses
const honorsGrades = {
  "A+": 4.945,
  "A": 4.6,
  "A-": 4.255,
  "B+": 3.795,
  "B": 3.45,
  "B-": 3.105,
  "C+": 2.645,
  "C": 2.3,
  "C-": 1.955,
  "D+": 1.338,
  "D": 1.15,
  "D-": 0.805,
  "F": 0.0
};

// Grade table for AP courses
const apGrades = {
  "A+": 5.375,
  "A": 5.0,
  "A-": 4.625,
  "B+": 4.125,
  "B": 3.75,
  "B-": 3.375,
  "C+": 2.875,
  "C": 2.5,
  "C-": 2.125,
  "D+": 1.625,
  "D": 1.25,
  "D-": 0.875,
  "F": 0.0
};

function createClassInputs() {
  const numClassesInput = document.getElementById("numClasses");
  const numClasses = parseInt(numClassesInput.value);

  const classInputsDiv = document.getElementById("classInputs");
  classInputsDiv.innerHTML = "";

  for (let i = 1; i <= numClasses; i++) {
      const classInput = document.createElement("div");
      classInput.className = "classInput";

      const classTypeLabel = document.createElement("label");
      classTypeLabel.textContent = "Class " + i + " Type:";
      classTypeLabel.setAttribute("for", "classType" + i);
      classInput.appendChild(classTypeLabel);

      const classTypeSelect = document.createElement("select");
      classTypeSelect.name = "classType";
      classTypeSelect.id = "classType" + i;

      const academicOption = document.createElement("option");
      academicOption.value = "academic";
      academicOption.text = "Academic";
      classTypeSelect.appendChild(academicOption);

      const honorsOption = document.createElement("option");
      honorsOption.value = "honors";
      honorsOption.text = "Honors";
      classTypeSelect.appendChild(honorsOption);

      const apOption = document.createElement("option");
      apOption.value = "ap";
      apOption.text = "AP";
      classTypeSelect.appendChild(apOption);

      classInput.appendChild(classTypeSelect);

      const gradeLabel = document.createElement("label");
      gradeLabel.textContent = "Grade for Class " + i + ":";
      gradeLabel.setAttribute("for", "grade" + i);
      classInput.appendChild(gradeLabel);

      const gradeInput = document.createElement("input");
      gradeInput.type = "text";
      gradeInput.className = "gradeInput";
      gradeInput.id = "grade" + i;
      classInput.appendChild(gradeInput);

      const creditsLabel = document.createElement("label");
      creditsLabel.textContent = "Credits for Class " + i + ":";
      creditsLabel.setAttribute("for", "credits" + i);
      classInput.appendChild(creditsLabel);

      const creditsInput = document.createElement("input");
      creditsInput.type = "number";
      creditsInput.className = "creditsInput";
      creditsInput.id = "credits" + i;
      classInput.appendChild(creditsInput);

      classInputsDiv.appendChild(classInput);
  }
}

function calculateGPA() {
  const numClassesInput = document.getElementById("numClasses");
  const numClasses = parseInt(numClassesInput.value);

  let totalGradePointsWeighted = 0.0;
  let totalGradePointsUnweighted = 0.0;
  let totalCredits = 0.0;

  for (let i = 1; i <= numClasses; i++) {
    const classTypeSelect = document.getElementById("classType" + i);
    const classType = classTypeSelect.value;

    let gradeValue = 0.0;
    const gradeInput = document.getElementById("grade" + i);
    const grade = gradeInput.value.toUpperCase();

    if (classType === "academic") {
      gradeValue = academicGrades[grade] || 0.0;
    } else if (classType === "honors") {
      gradeValue = honorsGrades[grade] || 0.0;
    } else if (classType === "ap") {
      gradeValue = apGrades[grade] || 0.0;
    }

    const creditsInput = document.getElementById("credits" + i);
    const credits = parseFloat(creditsInput.value);

    totalGradePointsWeighted += gradeValue * credits;
    totalGradePointsUnweighted += academicGrades[grade] * credits;
    totalCredits += credits;
  }

  const weightedGPA = totalGradePointsWeighted / totalCredits;
  const unweightedGPA = totalGradePointsUnweighted / totalCredits;

  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "Weighted GPA: " + weightedGPA.toFixed(2) + "<br>Unweighted GPA: " + unweightedGPA.toFixed(2);
}

const generateButton = document.getElementById("generateButton");
generateButton.addEventListener("click", createClassInputs);

const calculateButton = document.getElementById("calculateButton");
calculateButton.addEventListener("click", calculateGPA);
