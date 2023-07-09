// lesson-4-2 .
today = new Date();
thisYear = today.getFullYear();
const footer = document.querySelector('footer');
const copyright = document.createElement('p');
copyright.classList.add('copyright');
copyright.textContent = `Raul ${thisYear}`;
footer.appendChild(copyright);


// Skills
skills = ['javaScript', 'HTML', 'CSS', 'GIT', 'Python', 'Django', 'SQL']
const skillsSection = document.querySelector('#skills');
const skillsList = skillsSection.querySelector("ul");
for(var a=0; a < skills.length; a++){
    const skill = document.createElement('li');
    skill.innerText = skills[a];
    skillsList.appendChild(skill);
}

// lesson-4-3
const messageForm = document.querySelector("form[name='leave_message']");

/*const messageForm = document.getElementsByTagName('form');*/
messageForm.addEventListener('submit', event =>{
    event.preventDefault();
    const userName = event.target.userName.value;
    const usersEmail = event.target.usersEmail.value;
    const usersMessage = event.target.usersMessage.value;

    console.log(userName, usersEmail, usersMessage);
    messageForm.reset();

    const messagesSection = document.querySelector('#messages');
    const messagesList = messagesSection.querySelector('ul');
    const newMessage = document.createElement('li');
    newMessage.innerHTML = `<a href=${usersEmail}>${userName} wrote: <span>${usersMessage} </span></a>`;
    

    //create a new button element and set its properties
    const removeButton = document.createElement('button');
    removeButton.innerText = 'remove';
    removeButton.type  = 'button';

    // Add an event listenr to the removeButton 
    removeButton.addEventListener('click', event => {
        const entry = removeButton.parentNode;
        entry.remove();
    });

    // Apend the removeButton to the newMessage element
    newMessage.appendChild(removeButton);

    // Apend the newMessage to the messageList element
    messagesList.appendChild(newMessage);

});