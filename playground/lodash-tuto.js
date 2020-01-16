const _ = require('lodash');

const person = {
  name: "Nguyen Van A",
  age: 23,
  education: {
    primary: "le van tam",
    secondary: "cap 2",
    universities: [
      {
        name: "DH Back khoa"
      },
      {
        name: "DH KHTN"
      },
    ]
  }
}

// console.log(person.education.universities[1].name)
// console.log(_.get(person, "education.universities[1].name", "Ko co du lieu"))
// _.set(person, "job[0].name", "Lap trinh vien")
// console.log(person)

//
const course = {};
console.log("Day la object rong?", Object.keys(course).length > 0 ? false : true)
console.log(_.isEmpty(course))