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

const messageForm = document.forms.leave_message;
messageForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const usersName = event.target.usersName.value;
  const usersEmail = event.target.usersEmail.value;
  const usersMessage = event.target.usersMessage.value;

  console.log('Name:', usersName);
  console.log('Email:', usersEmail);
  console.log('Message:', usersMessage);

  //messageForm.reset();

  //Display Messages in List

  const messageSection = document.getElementById('messages');
  const messageList = messageSection.querySelector('ul');
  const newMessage = document.createElement('li');
  newMessage.innerHTML = `
      <a href="mailto:${usersEmail}">${usersName}</a> wrote:
      <span>${usersMessage}</span>
    `;

  const removeButton = document.createElement('button');
  removeButton.innerText = 'Remove';
  removeButton.type = 'button';

  removeButton.addEventListener('click', function () {
    const entry = removeButton.parentNode;

    entry.remove();
  });

  newMessage.appendChild(removeButton);
  messageList.appendChild(newMessage);

  //messageForm.reset();
});
