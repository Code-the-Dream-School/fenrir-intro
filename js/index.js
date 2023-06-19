const today = new Date()
const thisYear = today.getFullYear()
const footer = document.querySelector("footer")
const copyright = document.createElement("p")

copyright.innerHTML = `Aleksandra Folkes &#0169 ${thisYear}`
footer.appendChild(copyright)

const skills = ["JavaScript", "HTML", "CSS"]
const skillsSection = document.getElementById("skills")
const skillsList = skillsSection.querySelector("ul")
for (let i = 0; i < skills.length; i++){
    let skill = document.createElement("li")
    skill.innerHTML = skills[i]
    skillsList.appendChild(skill)
}
//DOM selection
const messageForm = document.getElementById("form");

//Event listener for form submission
messageForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const usersName = e.target.usersName.value
    const usersEmail = e.target.usersEmail.value
    const usersMessage = e.target.usersMessage.value

    console.log("Name:", usersName)
    console.log("Email:", usersEmail)
    console.log("Message:", usersMessage)
    const messageSection = document.getElementById("messages")
    const messageList = messageSection.querySelector("ul")
    const newMessage = document.createElement("li")
    newMessage.innerHTML = `<a href="mailto:adams41191@yahoo.com">${usersName}</a>
    <span>wrote: &nbsp${usersMessage}</span>`

    const removeButton = document.createElement("button")
    removeButton.textContent="remove"
    removeButton.type = "button"
    removeButton.addEventListener("click", () => {
        const entry = removeButton.parentNode;
        entry.remove()
    })
    newMessage.appendChild(removeButton)
    messageList.appendChild(newMessage)
    messageForm.reset()

})
