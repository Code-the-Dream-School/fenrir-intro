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

    //newMessage는 "li"라는 element를 만들고 (리스트 속성), 그 element안에 '<a href='mailto:${email}'>${name}</a> <span> wrote: ${message}</span>을 만든다.
    let newMessage = document.createElement("li");
    newMessage.innerHTML = `<a href='mailto:${email}'>${name}</a> <span> wrote: ${message}</span> `;    //remove란 버튼 생성 <button class = "remove" id = "removal" type = "button"> remove </button>

    //removeButton이란 변수에 'button'이란 element를 만든다.
    // Create a new <button> element
    const removeButton = document.createElement('button');

    // Set the inner text and type attribute of removeButton
    removeButton.innerText = 'remove';
    removeButton.type = 'button';

        removeButton.addEventListener('click',function(event) {    //removeButton에 addEventListener를 통해서 'click'했을 때의 inner function을 선언한다.
            //entry 라는 변수를 선언해서 removeButton의 parentNode를 찾는다 (이 경우에는 messageList).
            const entry = removeButton.parentNode;
            //entry변수를 remove 해서 newMessage의 값을 지운다.
            entry.remove();

        });

    //messageList element에 newMessage와 remove Button의 값을넣어준다.
    messageList.appendChild(newMessage) + newMessage.appendChild(removeButton);//messageList변수에 newMessage라는 변수의 값을 '입양'시킨다. 여기서는 ul섹터 안에 들어가게 되는 것. 

    // Show the #messages section including its header if there are messages
    messageSection.style.display = 'block';

    //입력시 텍스트박스 초기화
    messageForm.reset();
});