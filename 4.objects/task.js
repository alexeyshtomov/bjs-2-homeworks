function Student(name, gender, age) {
    this.name = name;
    this.gender = gender;
    this.age = age;
    this.marks = [];
  
}
Student.prototype.setSubject = function Student(subjectName){

    this.subject = subjectName;
}
Student.prototype.addMarks = function Student (...marks){

    if(this.marks == undefined) {
        console.log("Студент отчислен и не имеет каких-либо оценок");
        return;
    }
    this.marks.push(...marks)


}
Student.prototype.getAverage = function Student() {

    
    if(this.average == undefined || this.marks.length === 0) {
        return 0;
    }
    const sum = this.marks.reduce((total, mark) => total + mark, 0);
    return sum / this.marks.length;
    
  
}

Student.prototype.exclude = function Student (reason) {

    this.subject = undefined;
    this.marks = undefined;
    this.exclude = reason;
  
}

const student1 = new Student("Витя", "мужской", 20);
const student2 = new Student("Паша", "мужской", 23);
const marks_student = new Student(...marks);
student1.addMarks(4,5,4,5);
student2.addMarks(4,5,4,5);
student1.setSubject("Algebra");
student1.setSubject("Geometry");

console.log(student1.getAverage());
console.log(student2.getAverage());
console.log("Средний балл:", student1.getAverage());
student1.exclude("Плохая учеба");
console.log("Студент был исключен:", student1);



