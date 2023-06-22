academic_grades = {
    "A+": 4.0,
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
}

honors_grades = {
    "A+": 4.5,
    "A": 4.5,
    "A-": 4.2,
    "B+": 3.8,
    "B": 3.5,
    "B-": 3.2,
    "C+": 2.8,
    "C": 2.5,
    "C-": 2.2,
    "D+": 1.8,
    "D": 1.5,
    "D-": 1.2,
    "F": 0.0
}

ap_grades = {
    "A+": 5.0,
    "A": 5.0,
    "A-": 4.7,
    "B+": 4.3,
    "B": 4.0,
    "B-": 3.7,
    "C+": 3.3,
    "C": 3.0,
    "C-": 2.7,
    "D+": 2.3,
    "D": 2.0,
    "D-": 1.7,
    "F": 0.0
}

num_classes = int(input("Enter the number of classes: "))
total_grade_points_weighted = 0.0
total_grade_points_unweighted = 0.0
total_credits = 0.0

for i in range(1, num_classes + 1):
    class_type = input("Enter class type for class {} (Academic, Honors, AP): ")

    is_valid_class_type = False
    grade_value = 0.0

    while not is_valid_class_type:
        if class_type.lower() == "academic":
            grade = input("Enter the grade received for class {}: ".format(i))
            grade_value = academic_grades.get(grade, 0.0)
            is_valid_class_type = True
        elif class_type.lower() == "honors":
            grade = input("Enter the grade received for class {}: ".format(i))
            grade_value = honors_grades.get(grade, 0.0)
            is_valid_class_type = True
        elif class_type.lower() == "ap":
            grade = input("Enter the grade received for class {}: ".format(i))
            grade_value = ap_grades.get(grade, 0.0)
            is_valid_class_type = True
        else:
            print("Invalid class type. Please enter a valid class type (Academic, Honors, AP).")
            class_type = input("Enter class type for class {}: ".format(i))

    credits = float(input("Enter the number of credits for class {}: ".format(i)))

    total_grade_points_weighted += grade_value * credits
    total_grade_points_unweighted += academic_grades.get(grade, 0.0) * credits
    total_credits += credits

weighted_gpa = total_grade_points_weighted / total_credits
unweighted_gpa = total_grade_points_unweighted / total_credits

print("Weighted GPA: {:.2f}".format(weighted_gpa))
print("Unweighted GPA: {:.2f}".format(unweighted_gpa))
