// Start of Lesson 4.2 the DOM 

const today = new Date();
const thisYear = today.getFullYear();
const copyrightSymbol = "\u00A9";

const footer = document.querySelector('footer');
const copyright = document.createElement('p');
    copyright.innerHTML = 'Tiffany ' + copyrightSymbol + ' ' + thisYear; 
    footer.appendChild(copyright)

// include skills in this section
var skills = ['IBM Tools', 'JCL', 'Microsoft Suite', 'Eztrieve', 'Geometry', 'Algebra', 'Pre-Calculus', 'Group Travel', 'Insurance Agent'];

var skillsSection = document.getElementById('skills');
console.log(skillsSection);

var skillsList = skillsSection.querySelector('ul');

for (let i = 0; i < skills.length; i++) {
    var skill = document.createElement("li");
    skill.innerHTML = skills[i];
    skillsList.appendChild(skill);
}



