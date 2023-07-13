//footer date/copyright

  document.addEventListener("DOMContentLoaded", function() {
    const today = new Date();
    const thisYear = today.getFullYear();
    const footer = document.querySelector("footer");
    const copyright = document.createElement("p");
    copyright.innerHTML = "\u00A9" + "Brittney" + thisYear;
    footer.appendChild(copyright);
  });

const skills = ["HTML", "CSS", "JavaScript", "RegEx","JQuery", "Node.js", "MySql", "MongoDB", "React"]

const skillsSection = document.querySelector('#skills');

const skillList = skillsSection.querySelector('ul');
for(let i = 0; i < skills.length; i++) {
    const skill = document.createElement('li');
    skill.innerText = skills[i];
    skill.classList.add('skill-item');
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

  // Fetch GitHub Repositories

const url = 'https://api.github.com/users/brittney-betzold/repos';

fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not OK');
    }
    return response.json();
  })
  
  .then(repositories => {
    console.log(repositories);

    const projectSection = document.getElementById('projects');
    const projectList = projectSection.querySelector('ul');

    for (let i = 0; i < repositories.length; i++) {
      const project = document.createElement('li');
      const repositoryLink = document.createElement('a');
      repositoryLink.href = repositories[i].html_url;
      repositoryLink.textContent = repositories[i].name;
      project.appendChild(repositoryLink);

      const repositoryDescription = document.createElement('p');
      repositoryDescription.textContent = repositories[i].description;
      project.appendChild(repositoryDescription);

      const repositoryDate = document.createElement('p');
      const createdAt = new Date(repositories[i].created_at);
      const formattedDate = createdAt.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      repositoryDate.textContent = 'Created at: ' + formattedDate;
      project.appendChild(repositoryDate);

      projectList.appendChild(project);
    }
  })
.catch(error => {
    console.log("Error:", error);
    const errorMessage = document.createElement('p');
    errorMessage.textContent = 'Oops! Something went wrong. Please try again later.';
    document.body.appendChild(errorMessage);
});