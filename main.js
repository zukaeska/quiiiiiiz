

      
function saveCard() {
    var question = document.getElementById("question").value;
    var answer = document.getElementById("answer").value;
    
    var newCard = document.createElement("div");
    $(newCard).addClass("card col-sm-3");
    $(newCard).css("height","100px");
    $(newCard).css("width","18rem");
    var cardBody = document.createElement("div");
    $(cardBody).addClass("card-body");
    var questionTag = document.createElement("p");
    $(questionTag).addClass("card-text");
    $(questionTag).text("Question : " + question + "?");
    var answerTag = document.createElement("p");
    $(answerTag).addClass("card-text");
    $(answerTag).text("Answer : " + answer);
    cardBody.appendChild(questionTag);
    cardBody.appendChild(answerTag);
    newCard.appendChild(cardBody);
    $(newCard).css("margin-top","20px");
    $(newCard).attr("id", 1 + $('#mainDiv .card').length );

    $(newCard).attr("draggable", "true");
    document.getElementById("mainDiv").appendChild(newCard);
    newCard.addEventListener("dragstart", drag);
}

function allowDrop(ev) {
    ev.preventDefault();
  }
  
  function drag(ev) {
    console.log('drag',ev)
    if(ev){
        ev.dataTransfer.setData("text", ev.target.id);
        console.log(ev.target.id)
    }else{
        console.log(ev)
    }
    
  }
  
  function drop(ev) {
    ev.preventDefault();
    if(ev.target.id == 'mainDiv'){
        var data = ev.dataTransfer.getData("text");
        ev.target.appendChild(document.getElementById(data));
    }
   
  }