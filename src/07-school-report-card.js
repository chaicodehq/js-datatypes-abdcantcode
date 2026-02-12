/**
 * 📝 School Report Card Generator
 *
 * Sharma ji ke bete ka report card generate karna hai! Student ka naam aur
 * subjects ke marks milenge, tujhe pura analysis karke report card banana hai.
 *
 * Rules:
 *   - student object: { name: "Rahul", marks: { maths: 85, science: 92, ... } }
 *   - Calculate using Object.values() and array methods:
 *     - totalMarks: sum of all marks (use reduce)
 *     - percentage: (totalMarks / (numSubjects * 100)) * 100,
 *       rounded to 2 decimal places using parseFloat(val.toFixed(2))
 *     - grade based on percentage:
 *       "A+" (>= 90), "A" (>= 80), "B" (>= 70), "C" (>= 60), "D" (>= 40), "F" (< 40)
 *     - highestSubject: subject name with highest marks (use Object.entries)
 *     - lowestSubject: subject name with lowest marks
 *     - passedSubjects: array of subject names where marks >= 40 (use filter)
 *     - failedSubjects: array of subject names where marks < 40
 *     - subjectCount: total number of subjects (Object.keys().length)
 *   - Hint: Use Object.keys(), Object.values(), Object.entries(),
 *     reduce(), filter(), map(), Math.max(), Math.min(), toFixed()
 *
 * Validation:
 *   - Agar student object nahi hai ya null hai, return null
 *   - Agar student.name string nahi hai ya empty hai, return null
 *   - Agar student.marks object nahi hai ya empty hai (no keys), return null
 *   - Agar koi mark valid number nahi hai (not between 0 and 100 inclusive),
 *     return null
 *
 * @param {{ name: string, marks: Object<string, number> }} student
 * @returns {{ name: string, totalMarks: number, percentage: number, grade: string, highestSubject: string, lowestSubject: string, passedSubjects: string[], failedSubjects: string[], subjectCount: number } | null}
 *
 * @example
 *   generateReportCard({ name: "Rahul", marks: { maths: 85, science: 92, english: 78 } })
 *   // => { name: "Rahul", totalMarks: 255, percentage: 85, grade: "A",
 *   //      highestSubject: "science", lowestSubject: "english",
 *   //      passedSubjects: ["maths", "science", "english"], failedSubjects: [],
 *   //      subjectCount: 3 }
 *
 *   generateReportCard({ name: "Priya", marks: { maths: 35, science: 28 } })
 *   // => { name: "Priya", totalMarks: 63, percentage: 31.5, grade: "F", ... }
 */
export function generateReportCard(student) {
  if((typeof student!=='object'||Array.isArray(student)||student===null)
    || (typeof student.name!=='string'||student.name.trim().length===0) 
  || (typeof student.marks!=='object'||Array.isArray(student.marks)||student.marks===null)
  || (Object.keys(student.marks).length===0)
  || (Object.values(student.marks).some(e=>typeof e!=='number'||e<0 || e>100 ))
) return null;
  let name=student.name;
  let subjectmarksarray=Object.values(student.marks);
  let totalMarks=subjectmarksarray.reduce((acc,num)=>(acc+num),0)
  let numSubjects=subjectmarksarray.length;
  let percentage=parseFloat(((totalMarks / (numSubjects * 100)) * 100).toFixed(2))
  let subandmarks=Object.entries(student.marks);
  let grade="";
  if(percentage<40) grade="F";
  else if(percentage>= 40 && percentage<59) grade="D";
  else if(percentage>=60 && percentage<69) grade="C";
  else if(percentage>=70 && percentage<79) grade="B";
  else if(percentage>=80 && percentage<89) grade="A";
  else if(percentage>=90 && percentage<=100) grade="A+";
  let passedSubjects = Object.entries(student.marks)
 .filter(([subject, marks]) => marks >= 40)
  .map(([subject]) => subject);
  let failedSubjects = Object.entries(student.marks)
  .filter(([subject, marks]) => marks < 40)
  .map(([subject]) => subject);
  let highestmarkindex=subjectmarksarray.indexOf(Math.max(...subjectmarksarray));
  let lowestmarkindex=subjectmarksarray.indexOf(Math.min(...subjectmarksarray));
  let subjectnamesarray=Object.keys(student.marks);
  let highestMarks=subjectnamesarray[highestmarkindex];
  let lowestMarks=subjectnamesarray[lowestmarkindex];
  return {
  name,
  totalMarks,
  percentage,
  grade,
  highestSubject: highestMarks,
  lowestSubject: lowestMarks,
  passedSubjects,
  failedSubjects,
  subjectCount: subjectnamesarray.length
};


}
