let today = new Date();
let thisYear = today.getFullYear();

let footer = document.querySelector("footer");
let copyright = document.createElement("p");

copyright.innerHTML = "Chelin Park"+" "+thisYear;

footer.appendChild(copyright);

let messageForm = document.querySelector("name");
target.addEventListener("submit",callback);
function myFunction(){
    document.getElementById("demo").innerHTML = "Hello World";

}