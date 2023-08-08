const today = new Date();
const thisYear = today.getFullYear();
const footer = document.querySelector("footer");
const copyright = document.createElement("p");
const linkedin = document.createElement("a");
linkedin.href = "https://www.linkedin.com/in/aleksandra-folkes-18b6805a/";

copyright.innerHTML = `Aleksandra Folkes &#0169 ${thisYear}`;
linkedin.innerHTML = `<i style="color: blue; margin-left: 6px;" class="fa-brands fa-linkedin"></i>`;
footer.appendChild(copyright);
copyright.appendChild(linkedin);
  

//add skills section
const skills = ["JavaScript", "HTML", "CSS", "Technical writer"];
const skillsSection = document.getElementById("skills");
const skillsList = skillsSection.querySelector("ul");
for (let i = 0; i < skills.length; i++) {
  let skill = document.createElement("li");
  skill.innerHTML = skills[i];
  skillsList.appendChild(skill);
}

//DOM selection
const messageForm = document.getElementById("form");

//Event listener for form submission
messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const usersName = e.target.usersName.value;
  const usersEmail = e.target.usersEmail.value;
  const usersMessage = e.target.usersMessage.value;

  console.log("Name:", usersName);
  console.log("Email:", usersEmail);
  console.log("Message:", usersMessage);
  const messageSection = document.getElementById("messages");
  const messageList = messageSection.querySelector("ul");
  messageList.style.display = "flex";
  messageList.style.flexWrap = "wrap";
  const newMessage = document.createElement("li");
  newMessage.innerHTML = `<a href="mailto:adams41191@yahoo.com">${usersName}</a>
    <span>wrote: &nbsp${usersMessage}</span>`;

  //create Remove button
  const removeButton = document.createElement("button");
  removeButton.textContent = "remove";
  removeButton.type = "button";
  removeButton.addEventListener("click", () => {
    const entry = removeButton.parentNode;
    entry.remove();
  });
  newMessage.appendChild(removeButton);
  messageList.appendChild(newMessage);
  messageForm.reset();
});


// adding GitHub links using AJAX

// create an object (client)
//let githubRequest = new XMLHttpRequest();
// create GET request to fetch API
//githubRequest.open('GET', "https://api.github.com/users/SashaFoxx/repos");/send request
//githubRequest.send();
// create an event listener to process request response when it is ready
//githubRequest.addEventListener('load', (event) => {
//convert JSON to object
//let repositories = JSON.parse(githubRequest.response)
//console.log(repositories)
//let projectSection = document.getElementById('projects')
//let projectList = projectSection.querySelector('ul')
//for (let i = 0; i < repositories.length; i++) {
//let project = document.createElement('li')
//project.innerHTML += `<a href="${repositories[i].html_url}" target="_blank">${repositories[i].name}</a>`
//projectList.appendChild(project)
// }
//})

//adding GitHub links using API via Fetch
const fetchData = () => {
  fetch("https://api.github.com/users/SashaFoxx/repos")
  .then((res) => res.json())
  .then((data) => {
    // console.log("data.length ====> ", data.length)
    let projectSection = document.getElementById("projects");
    let projectList = projectSection.querySelector("ul");
    for (let i = 0; i < data.length; i++) {
      let project = document.createElement("li");
      project.innerHTML += `<a class="projectLink" href="${data[i].html_url}" target="_blank">${data[i].name}</a>`;
      projectList.appendChild(project);
    }
  })
  .catch((error) => console.log("error", error));
}

fetchData();


