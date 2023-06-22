from flask import Flask, render_template, request

app = Flask(__name__)

academic_grades = {
    "A+": 4.3, "A": 4.0, "A-": 3.7, "B+": 3.3, "B": 3.0, "B-": 2.7,
    "C+": 2.3, "C": 2.0, "C-": 1.7, "D+": 1.3, "D": 1.0, "D-": 0.7, "F": 0.0
}

def get_valid_class_type():
    class_type = request.form['class_type']
    while class_type.lower() not in ["academic", "honors", "ap"]:
        print("Invalid class type. Please enter a valid class type (Academic, Honors, AP).")
        class_type = request.form['class_type']
    return class_type.lower()

def get_valid_grade(grade_table):
    grade = request.form['grade']
    while grade not in grade_table:
        print("Invalid grade. Please enter a valid grade.")
        grade = request.form['grade']
    return grade

def get_valid_credits():
    while True:
        credits = request.form['credits']
        try:
            credits = float(credits)
            if credits >= 0:
                return credits
            else:
                print("Invalid credit value. Please enter a non-negative value.")
        except ValueError:
            print("Invalid input. Please enter a numeric value for credits.")

@app.route('/', methods=['GET', 'POST'])
def calculate_gpa():
    if request.method == 'POST':
        num_classes = int(request.form['num_classes'])
        total_grade_points_weighted = 0.0
        total_grade_points_unweighted = 0.0
        total_credits = 0.0

        for i in range(1, num_classes + 1):
            class_type = get_valid_class_type()
            grade_value = 0.0

            if class_type in ["academic", "honors", "ap"]:
                grade_value = academic_grades[get_valid_grade(academic_grades)]

            credits = get_valid_credits()

            total_grade_points_weighted += grade_value * credits
            total_grade_points_unweighted += academic_grades[get_valid_grade(academic_grades)] * credits
            total_credits += credits

        weighted_gpa = total_grade_points_weighted / total_credits
        unweighted_gpa = total_grade_points_unweighted / total_credits

        return render_template('result.html', weighted_gpa=weighted_gpa, unweighted_gpa=unweighted_gpa)
    return render_template('form.html')

if __name__ == '__main__':
    app.run(debug=True)
