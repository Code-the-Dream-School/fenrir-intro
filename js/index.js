const today = new Date();
const thisYear = today.getFullYear();
console.log(thisYear);

let footer = document.querySelector('footer');
//console.log(footer);

let copyright = document.createElement('p');
copyright.innerHTML = `Olena ${thisYear}`;
footer.appendChild(copyright);

//Create List of Skills

let skillsJS = ['HTML', 'CSS', 'JavaScript', 'git', 'NodeJS', 'Cypress'];
let skillsSection = document.getElementById('skills');
let skillsHTMLList = skillsSection.querySelector('ul');

for (let i = 0; i < skillsJS.length; i++) {
  let skill = document.createElement('li');
  skill.innerText = skillsJS[i];
  //console.log(skill.innerText);
  skillsHTMLList.appendChild(skill);
}
//Handle Message Form Submit

let messageForm = document.getElementsByName('Leave_message');
addEventListener('submit', 'messageForm')
