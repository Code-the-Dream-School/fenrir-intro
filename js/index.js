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
//form
const messageForm = document.querySelector('form[name = "leave_message"]');
//messages
const messageSection = document.querySelector("#messages");

//list
const messageList = messageSection.querySelector('ul');
messageForm.addEventListener('submit',(event) => {
    event.preventDefault();
    const messageHeader = document.getElementById('messages');
    console.log(messageHeader);
    const name = event.target.usersName.value;
    const email = event.target.usersEmail.value;
    const message = event.target.usersMessage.value;
   
    console.log( `Name: ${name} Email: ${email} Message: ${message}`);
//new message
    const newMessage = document.createElement('li');
    newMessage.innerHTML = `
    <a href = "mailto:${email}">${name}</a>
    <span>${message}</span>`;
//remove message
const removeButton = document.createElement('button');
removeButton.type = 'button';
removeButton.innerText = 'Remove';
removeButton.classList.add('custom-button');

removeButton.addEventListener('click', () => {
  const entry = removeButton.parentNode;
  entry.remove();
});

newMessage.appendChild(removeButton);

// Edit button
const editButton = document.createElement('button');
editButton.type = 'button';
editButton.innerText = 'Edit Message';
editButton.classList.add('custom-button');

editButton.addEventListener('click', () => {
  const newMessageText = prompt('Enter the new message:');
  if (newMessageText !== null) {
    const messageSpan = newMessage.querySelector('span');
    messageSpan.textContent = newMessageText;
  }
});

newMessage.appendChild(editButton);

messageList.appendChild(newMessage);
messageForm.reset();
});

function toggleFirstCol() {
    const firstCol = document.querySelector('.firstCol');
    firstCol.classList.toggle('show-firstCol');
  }

  const links = document.querySelectorAll('.firstCol a');
  links.forEach(link => {
    link.addEventListener('click', toggleFirstCol);
  });