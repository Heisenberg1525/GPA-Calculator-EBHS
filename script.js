function calculateGPA() {
    var academic_grades = {
        "A+": 4.3, "A": 4.0, "A-": 3.7, "B+": 3.3, "B": 3.0, "B-": 2.7,
        "C+": 2.3, "C": 2.0, "C-": 1.7, "D+": 1.3, "D": 1.0, "D-": 0.7, "F": 0.0
    };

    var num_classes = parseInt(document.getElementById("num-classes").value);
    var total_grade_points_weighted = 0.0;
    var total_grade_points_unweighted = 0.0;
    var total_credits = 0.0;

    for (var i = 1; i <= num_classes; i++) {
        var class_type = document.getElementById("class-type-" + i).value;
        var grade = document.getElementById("grade-" + i).value;
        var credits = parseFloat(document.getElementById("credits-" + i).value);

        var grade_value = 0.0;

        if (class_type === "academic" || class_type === "honors" || class_type === "ap") {
            grade_value = getGradeValue(class_type, grade);
        }

        total_grade_points_weighted += grade_value * credits;
        total_grade_points_unweighted += getGradeValue("academic", grade) * credits;
        total_credits += credits;
    }

    var weighted_gpa = total_grade_points_weighted / total_credits;
    var unweighted_gpa = total_grade_points_unweighted / total_credits;

    document.getElementById("weighted-gpa").textContent = "Weighted GPA: " + weighted_gpa.toFixed(4);
    document.getElementById("unweighted-gpa").textContent = "Unweighted GPA: " + unweighted_gpa.toFixed(4);
}

function getGradeValue(class_type, grade) {
    var grades = {
        "academic": {
            "A+": 4.3, "A": 4.0, "A-": 3.7, "B+": 3.3, "B": 3.0, "B-": 2.7,
            "C+": 2.3, "C": 2.0, "C-": 1.7, "D+": 1.3, "D": 1.0, "D-": 0.7, "F": 0.0
        },
        "honors": {
            "A+": 4.945, "A": 4.6, "A-": 4.255, "B+": 3.795, "B": 3.45, "B-": 3.105,
            "C+": 2.645, "C": 2.3, "C-": 1.955, "D+": 1.338, "D": 1.15, "D-": 0.805, "F": 0.0
        },
        "ap": {
            "A+": 5.375, "A": 5.0, "A-": 4.625, "B+": 4.125, "B": 3.75, "B-": 3.375,
            "C+": 2.875, "C": 2.5, "C-": 2.125, "D+": 1.625, "D": 1.25, "D-": 0.875, "F": 0.0
        }
    };

    return grades[class_type][grade];
}

document.getElementById("num-classes").addEventListener("input", function () {
    var numClasses = parseInt(this.value);
    var classDetails = document.getElementById("class-details");

    classDetails.innerHTML = "";

    for (var i = 1; i <= numClasses; i++) {
        var classDiv = document.createElement("div");
        classDiv.innerHTML = "<h3>Class " + i + "</h3>";

        var classTypeLabel = document.createElement("label");
        classTypeLabel.textContent = "Class Type (Academic, Honors, AP): ";
        var classTypeInput = document.createElement("select");
        classTypeInput.id = "class-type-" + i;
        classTypeInput.required = true;

        var classTypeOptions = ["Academic", "Honors", "AP"];

        for (var j = 0; j < classTypeOptions.length; j++) {
            var option = document.createElement("option");
            option.value = classTypeOptions[j].toLowerCase();
            option.text = classTypeOptions[j];
            classTypeInput.appendChild(option);
        }

        classDiv.appendChild(classTypeLabel);
        classDiv.appendChild(classTypeInput);

        var gradeLabel = document.createElement("label");
        gradeLabel.textContent = "Grade Received: ";
        var gradeInput = document.createElement("select");
        gradeInput.id = "grade-" + i;
        gradeInput.required = true;

        var gradeOptions = ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "D-", "F"];

        for (var k = 0; k < gradeOptions.length; k++) {
            var option = document.createElement("option");
            option.value = gradeOptions[k];
            option.text = gradeOptions[k];
            gradeInput.appendChild(option);
        }

        classDiv.appendChild(gradeLabel);
        classDiv.appendChild(gradeInput);

        var creditsLabel = document.createElement("label");
        creditsLabel.textContent = "Credits: ";
        var creditsInput = document.createElement("input");
        creditsInput.type = "number";
        creditsInput.id = "credits-" + i;
        creditsInput.required = true;
        creditsInput.step = "0.01";

        classDiv.appendChild(creditsLabel);
        classDiv.appendChild(creditsInput);

        classDetails.appendChild(classDiv);
    }
});
