function Student(name, gender, age) {
    this.name = name;
    this.gender = gender;
    this.age = age;
    this.marks = [];
}

Student.prototype.setSubject = function(subjectName) {
    this.subject = subjectName;
}

Student.prototype.addMarks = function(...marksToAdd) {
    if (this.marks === undefined) {
        console.log("Студент отчислен и не имеет каких-либо оценок!");
        return;
    }
    this.marks.push(...marksToAdd);
}

Student.prototype.getAverage = function() {
    if (this.marks === undefined || this.marks.length === 0) {
        return 0;
    }
    const sum = this.marks.reduce((total, mark) => total + mark, 0);
    return sum / this.marks.length;
}

Student.prototype.exclude = function(reason) {
    this.subject = undefined;
    this.marks = undefined;
    this.excluded = reason;
}

// Создаем экземпляр объекта студента
const student1 = new Student("Ivan", "Male", 32);

// Устанавливаем предмет
student1.setSubject("Math");

// Добавляем оценки
student1.addMarks(85, 90, 78);

// Получаем средний балл
console.log("Средний балл студента:", student1.getAverage());

// Исключаем студента

student1.exclude("Плохая успеваемость");
console.log("Студент был исключен:", student1);
///

