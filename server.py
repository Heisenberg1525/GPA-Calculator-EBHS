from flask import Flask, render_template, request, jsonify

app = Flask(__name__, static_folder='static')

academic_grades = {
    "A+": 4.3, "A": 4.0, "A-": 3.7, "B+": 3.3, "B": 3.0, "B-": 2.7,
    "C+": 2.3, "C": 2.0, "C-": 1.7, "D+": 1.3, "D": 1.0, "D-": 0.7, "F": 0.0
}

honors_grades = {
    "A+": 4.945, "A": 4.6, "A-": 4.255, "B+": 3.795, "B": 3.45, "B-": 3.105,
    "C+": 2.645, "C": 2.3, "C-": 1.955, "D+": 1.338, "D": 1.15, "D-": 0.805, "F": 0.0
}

ap_grades = {
    "A+": 5.375, "A": 5.0, "A-": 4.625, "B+": 4.125, "B": 3.75, "B-": 3.375,
    "C+": 2.875, "C": 2.5, "C-": 2.125, "D+": 1.625, "D": 1.25, "D-": 0.875, "F": 0.0
}

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/calculate-gpa", methods=["POST"])
def calculate_gpa():
    num_classes = int(request.json["numClasses"])
    total_grade_points_weighted = 0.0
    total_grade_points_unweighted = 0.0
    total_credits = 0.0

    for i in range(1, num_classes + 1):
        class_type = input("Enter class type (Academic, Honors, AP): ")
        class_type = class_type.lower()
        grade_value = 0.0

        if class_type == "1":
            grade_value = academic_grades[get_valid_grade(academic_grades)]
        elif class_type == "2":
            grade_value = honors_grades[get_valid_grade(honors_grades)]
        elif class_type == "3":
            grade_value = ap_grades[get_valid_grade(ap_grades)]

        credits = get_valid_credits()

        total_grade_points_weighted += grade_value * credits
        total_grade_points_unweighted += academic_grades[get_valid_grade(academic_grades)] * credits
        total_credits += credits

    weighted_gpa = total_grade_points_weighted / total_credits
    unweighted_gpa = total_grade_points_unweighted / total_credits

    return jsonify({
        "weightedGPA": weighted_gpa,
        "unweightedGPA": unweighted_gpa
    })

def get_valid_grade(grade_options):
    grade = input("Enter grade: ")
    while grade not in grade_options:
        grade = input("Invalid grade. Please enter a valid grade: ")
    return grade

def get_valid_credits():
    credits = input("Enter credits: ")
    while not credits.isdigit():
        credits = input("Invalid credits. Please enter a valid number of credits: ")
    return float(credits)

if __name__ == "__main__":
    app.run()
