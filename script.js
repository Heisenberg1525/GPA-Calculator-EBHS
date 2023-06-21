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
      const classTypeInput = document.createElement("input");
      classTypeInput.type = "text";
      classTypeInput.placeholder = "Class Type (Academic, Honors, AP)";
      classTypeInput.id = `classType${i}`;
      classTypeInput.className = "classType";
  
      const gradeInput = document.createElement("input");
      gradeInput.type = "text";
      gradeInput.placeholder = "Grade";
      gradeInput.id = `grade${i}`;
      gradeInput.className = "grade";
  
      const creditsInput = document.createElement("input");
      creditsInput.type = "number";
      creditsInput.placeholder = "Credits";
      creditsInput.id = `credits${i}`;
      creditsInput.className = "credits";
  
      classInputsDiv.appendChild(classTypeInput);
      classInputsDiv.appendChild(gradeInput);
      classInputsDiv.appendChild(creditsInput);
      classInputsDiv.appendChild(document.createElement("br"));
    }
  }
  
  function calculateGPA() {
    const classTypeInputs = document.getElementsByClassName("classType");
    const gradeInputs = document.getElementsByClassName("grade");
    const creditsInputs = document.getElementsByClassName("credits");
    const resultDiv = document.getElementById("result");
  
    let totalGradePointsWeighted = 0.0;
    let totalGradePointsUnweighted = 0.0;
    let totalCredits = 0.0;
  
    for (let i = 0; i < classTypeInputs.length; i++) {
      const classType = classTypeInputs[i].value.toLowerCase();
      const grade = gradeInputs[i].value;
      const credits = parseFloat(creditsInputs[i].value);
  
      let gradeValue = 0.0;
  
      if (classType === "academic") {
        gradeValue = academicGrades[grade] || 0.0;
      } else if (classType === "honors") {
        gradeValue = honorsGrades[grade] || 0.0;
      } else if (classType === "ap") {
        gradeValue = apGrades[grade] || 0.0;
      }
  
      totalGradePointsWeighted += gradeValue * credits;
      totalGradePointsUnweighted += academicGrades[classType] * credits;
      totalCredits += credits;
    }
  
    const weightedGPA = totalGradePointsWeighted / totalCredits;
    const unweightedGPA = totalGradePointsUnweighted / totalCredits;
  
    resultDiv.innerHTML = `
      <p>Weighted GPA: ${weightedGPA.toFixed(2)}</p>
      <p>Unweighted GPA: ${unweightedGPA.toFixed(2)}</p>
    `;
  }
  
  document.getElementById("numClasses").addEventListener("change", createClassInputs);
  