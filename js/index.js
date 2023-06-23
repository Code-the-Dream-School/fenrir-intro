let today = new Date();
let thisYear = today.getFullYear();
let footer = document.querySelector("footer");
let copyright = document.createElement("p");

//4.2
footer.appendChild(copyright);
copyright.innerHTML = "Chelin Park"+" "+thisYear;


//4.3

const messageForm = document.querySelector('form[name="leave_message"]');   //messageForm이란 변수를 만들고, "leave message"란 form을 참조한다.
messageForm.addEventListener('submit', function(event) {    //messageForm의 변수가 참조하는 "leave message" form에서 'submit' 버튼이 클릭되었을 때
    
    event.preventDefault(); //prevent form from submitting/refreshing the page
    let name = event.target.usersName.value;
    let email = event.target.usersEmail.value;
    let message = event.target.usersMessage.value;
    
    let messageSection = document.querySelector('#messages'); //dom select에서 #는 html에서 부여한 ID를 참조하여 가져옴. 이 경우에는 section id가 "messages"이기 때문에  해당 section을 가져온다.
    
    const messageList = messageSection.querySelector('ul'); //ul 쿼리를 참조하는 messageList라는 변수 생성
    //console.log(messageSection);
    
    //newMessage는 "li"라는 element를 만들고 (리스트 속성), 그 element안에 '<a href='mailto:${email}'>${name}</a> <span> wrote: ${message}</span>과 remove 버튼을 만든다.
    let newMessage = document.createElement("li");
    newMessage.innerHTML = `<a href='mailto:${email}'>${name}</a> <span> wrote: ${message}</span> <button class = "remove" id = "removal" type = "button"> remove </button>`;    //remove란 버튼 생성
    messageList.appendChild(newMessage); //messageList변수에 newMessage라는 변수의 값을 '입양'시킨다. 여기서는 ul섹터 안에 들어가게 되는 것.




    //removeButton이란 변수에 button selection을 넣는다.
    let removeButton = document.getElementById("removal");
    removeButton.addEventListener("remove",function(event) {
        //messageList변수에 removeButton라는 변수의 값을 '입양'시킨다. 여기서는 ul섹터 안에 들어가게 되는 것. + 값을 지운 것을 반영해야 한다.
        alert("asdf");
        //newMessage.innerHTML.remove();
    });
    

    


    
    //입력시 텍스트박스 초기화
    messageForm.reset();
});