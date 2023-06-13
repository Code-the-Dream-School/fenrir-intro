const today = new Date()
const thisYear = today.getFullYear()
const footer = document.querySelector("footer")
const copyright = document.createElement("p")

copyright.innerHTML = `Aleksandra Folkes &#0169 ${thisYear}`
footer.appendChild(copyright)

const skills = ['JavaScript', 'HTML', 'SCC']
const skillsSection = document.getElementById("skills")
const skillsList = skillsSection.querySelector('ul')
for (let i = 0; i < skills.length; i++){
    let skill = document.createElement('li')
    skill.innerHTML = skills[i]
    skillsList.appendChild(skill)
}
    
