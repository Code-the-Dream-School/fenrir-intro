//footer date/copyright
const today = new Date();
const thisYear = today.getFullYear();
const footer = document.querySelector("footer");
const copyright = document.createElement("p");
copyright.innerHTML = "\u00A9" + "Brittney" + thisYear;
footer.appendChild(copyright);

const skills = ["HTML", "CSS", "JavaScript", "RegEx","JQuery", "Node.js", "MySql", "MongoDB", "React"]

const skillsSection = document.querySelector('#skills');

const skillList = skillsSection.querySelector('ul');
for(let i = 0; i < skills.length; i++) {
    const skill = document.createElement('li');
    skill.innerText = skills[i];
    skillList.appendChild(skill);
}