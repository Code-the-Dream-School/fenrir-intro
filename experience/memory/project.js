
$(()=>{


  $('.box').on('click', function clicky(e) {
    // ...
    if (count === 2 && card1.getAttribute('data-match') === card2.getAttribute('data-match')) {
      // Match found
      score++;
      $('.score').text(score);
      picks = [];
      count = 0;
    } else if (count === 2 && card1.getAttribute('data-match') !== card2.getAttribute('data-match')) {
      // No match
      count = 0;
      setTimeout(change, 1000);
    }
    // ...
  });

$('.Heading').fadeIn(1000).fadeOut(2000).fadeIn(3000);
var faces= [];// picture array
var $img = []; //empty array
var $divs = $('div');
faces[0] = 'blueChatter';
faces[1] = 'pony';
faces[2] = 'blueChatter';
faces[3] = 'orangeChatter';
faces[4] = 'angry4';
faces[5] = 'angry3';
faces[6] = 'angry2';
faces[7] = 'angry';
faces[8] = 'wink';
faces[9] = 'monkey';
faces[10] = 'star';
faces[11] = 'devil';
faces[12] = 'bigsmile';
faces[13] = 'cry';
faces[14] = 'angel';
faces[15] = 'orangeChatter';
faces[16] = 'pony';
faces[17] = 'greenChatter';
faces[18] = 'greenChatter';
faces[19] = 'angry4';
faces[20] = 'angry3';
faces[21] = 'angry2';
faces[22] = 'angry';
faces[23] = 'wink';
faces[24] = 'monkey';
faces[25] = 'star';
faces[26] = 'devil';
faces[27] = 'bigsmile';
faces[28] = 'cry';
faces[29] = 'angel';
var $kitty = $('.kitty');
let count=0;
var $timer = $('.timer');

$('.newgame').on('click', function() {
resetGame();
});
function resetGame() {
  // Reset variables
  count = 0;
  picks = [];
  score = 0;
  $('.score').text(score);

  // Recreate initial game state (assign new images to cards)
  var faces = [
    'blueChatter', 'pony', 'blueChatter', 'orangeChatter', 'angry4', 'angry3', 'angry2', 'angry', 'wink', 'monkey',
    'star', 'devil', 'bigsmile', 'cry', 'angel', 'orangeChatter', 'pony', 'greenChatter', 'greenChatter', 'angry4',
    'angry3', 'angry2', 'angry', 'wink', 'monkey', 'star', 'devil', 'bigsmile', 'cry', 'angel'
  ];

  var $divs = $('.box');
  var $pics = $('.pic');

  // Shuffle the faces array
  faces = _.shuffle(faces);

  // Assign new images to the cards
  $divs.each(function (index) {
    var face = faces[index];
    $(this).attr('class', 'box').addClass(face);
  });

  // Restore the original kitty images
  $pics.show();
}
//end of newgame function
            for(let i=faces.length-1;i>=0;i--){
              var r=Math.floor(Math.random()*faces.length);
              $img.push(faces[r]);
              faces.splice(r,1);
              
            }
            for(let j=0; j<=$img.length-1;j++){
              $divs[j].setAttribute('class', $img[j]);
                  console.log($divs[j]);
            }
            
var $body = $('body');
let picks=[];
let card1;
let card2;
let pic=document.createElement('img');
pic.setAttribute('src','kitty.gif');
pic.setAttribute('class','pic');
let matches =document.getElementById('matches');
let score = 0;
var $timer = document.getElementById('timer');

  $divs.on('click', function clicky(e) {
    count++;
    let target = e.target;
    let parent= target.parentNode;

    if(count=== 1 && target.getAttribute('class')==='pic'){ //removing the first kitty pic of choice one
      target.remove();
      card1=parent;
      picks.push(card1.getAttribute('id'));
    }
    if(count === 2 && target.getAttribute('class')==='pic'){ // removing the second choice kitty pic
      target.remove();
      card2=parent;
      picks.push(card2.getAttribute('id'));

    if(card1.getAttribute('class') === card2.getAttribute('class')) { //comnparing the attributes for matches
       score++;
       $('.score').text(score);
       picks=[];
       count = 0;
        }
    if(card2.getAttribute('class') !== card1.getAttribute('class')) { // if the attrubutes do not match
          count=0;
          setTimeout(change,1000);
        }
    }
    if(score === 15) {
       $body.addClass('won');
       $('.score').append('<br> !! YOU Won The Matching Game !! ').hide(1000).show(2000);
        
        }
});//end of clicky function
  
function change(){
          $(`#${picks[0]}`).html("<img src ='kitty.gif' class='pic' >");
          $(`#${picks[1]}`).html("<img src ='kitty.gif' class='pic' >");
          picks=[];
}
});//end of ready function

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var gradient = context.createLinearGradient(400,178, 360,25);
gradient.addColorStop(1, '#0e0b26');
gradient.addColorStop(0.9, '#8fee90');
gradient.addColorStop(0.8, '#a3a4a4');
gradient.addColorStop(0.5, '#78487e');
gradient.addColorStop(0.2, '#8fee90');
gradient.addColorStop(0, '#0e0b26');
context.fillStyle = gradient;
context.align = 'center';
canvas.style.background = '#483d8b';
context.shadowBlur = 4;
context.font = 'bold 65px Impact';
context.fillText('Matching Memory Game',10,80);
context.shadowColor = '#27a2b7';
































