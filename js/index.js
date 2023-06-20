// Add elements to the footer
const today = new Date();
const thisYear = today.getFullYear();
const footer = document.querySelector('footer');
const copyright = document.createElement('p');
const myName = "Sabina Kazantseva";
copyright.innerHTML = "\u00A9" + myName + " " + thisYear;
footer.appendChild(copyright);

// Add skills to the skills sections
const skills = ["HTML", "CSS", "JavaScript", "Git"];
const skillsSection = document.querySelector('#skills');
const skillsList = skillsSection.querySelector('ul');
for (let i = 0; i < skills.length; i++) {
  const skill = document.createElement('li');
  skill.innerText = skills[i];
  skillsList.appendChild(skill);
}

// Handle message form submit
const messageForm = document.getElementsByName("leave_message")[0];
messageForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const usersName = event.target.usersName.value;
  const usersEmail = event.target.usersEmail.value;
  const usersMessage = event.target.usersMessage.value;
  console.log("usersName ===> ", usersName);
  console.log("usersEmail ===> ", usersEmail);
  console.log("usersMessage ===> ", usersMessage);

  // Display messages in a list
  const messageSection = document.querySelector("#messages");
  console.log("messageSection ===> ", messageSection);
  const messageList = messageSection.querySelector("ul");
  const newMessage = document.createElement(`li`);
  newMessage.innerHTML =
    `<a href="mailto:{email}">${usersName}</a>
    <span>${usersMessage}</span>
  </a>`
  messageList.appendChild(newMessage);
  console.log("newMessage =>>>", newMessage);
  const messageLink = document.createElement('a');
  messageLink.href = `mailto:${usersEmail}`;
  messageLink.innerText = usersName;
  const editButton = document.createElement('button');
  editButton.innerText = "edit";
  editButton.setAttribute('type', 'button');
  editButton.addEventListener("click", function (event) {
    event.preventDefault();
    const editedMessage = prompt('Enter the edited message:');
    const messageText = newMessage.querySelector("span");
    messageText.innerText = editedMessage;
  });

  const removeButton = document.createElement('button')
  removeButton.innerText = "remove";
  removeButton.setAttribute('type', 'button');
  removeButton.addEventListener("click", function (event) {
    event.preventDefault();
    const entry = removeButton.parentNode;
    entry.remove();
  });

  newMessage.appendChild(editButton);
  newMessage.appendChild(removeButton);
  messageForm.reset();
});
