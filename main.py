from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/calculate', methods=['POST'])
def calculate():
    # Grade table for academic courses
    academic_grades = {
        "A+": 4.3, "A": 4.0, "A-": 3.7,
        "B+": 3.3, "B": 3.0, "B-": 2.7,
        "C+": 2.3, "C": 2.0, "C-": 1.7,
        "D+": 1.3, "D": 1.0, "D-": 0.7,
        "F": 0.0
    }

    # Grade table for honors courses
    honors_grades = {
        "A+": 4.945, "A": 4.6, "A-": 4.255,
        "B+": 3.795, "B": 3.45, "B-": 3.105,
        "C+": 2.645, "C": 2.3, "C-": 1.955,
        "D+": 1.338, "D": 1.15, "D-": 0.805,
        "F": 0.0
    }

    # Grade table for AP courses
    ap_grades = {
        "A+": 5.375, "A": 5.0, "A-": 4.625,
        "B+": 4.125, "B": 3.75, "B-": 3.375,
        "C+": 2.875, "C": 2.5, "C-": 2.125,
        "D+": 1.625, "D": 1.25, "D-": 0.875,
        "F": 0.0
    }

    num_classes = int(request.form['num_classes'])
    total_grade_points_weighted = 0.0
    total_grade_points_unweighted = 0.0
    total_credits = 0.0

    for i in range(1, num_classes + 1):
        class_type = request.form['class_type' + str(i)]
        grade = request.form['grade' + str(i)]
        credits = float(request.form['credits' + str(i)])

        if class_type == "Academic":
            grade_value = academic_grades.get(grade, 0.0)
        elif class_type == "Honors":
            grade_value = honors_grades.get(grade, 0.0)
        elif class_type == "AP":
            grade_value = ap_grades.get(grade, 0.0)
        else:
            return "Invalid class type"

        total_grade_points_weighted += grade_value * credits
        total_grade_points_unweighted += academic_grades.get(class_type, 0.0) * credits
        total_credits += credits

    weighted_gpa = total_grade_points_weighted / total_credits
    unweighted_gpa = total_grade_points_unweighted / total_credits

    return render_template('result.html', weighted_gpa=weighted_gpa, unweighted_gpa=unweighted_gpa)

if __name__ == '__main__':
    app.run()
