var editableQeustionElem;
var editableAnswerElem;
var globalCount;

$(function () {
  var cardArray = [];
  var cards = localStorage.getItem('cards');
  globalCount = localStorage.getItem('count');

  if(globalCount == null) {
    globalCount = 1;
    localStorage.setItem('count',globalCount);
  }else {
    globalCount = parseInt(globalCount);
  }
  if(cards != null) {
    cardArray = JSON.parse(cards);

    cardArray.forEach(element => {
      makeCard(element)
    });
  }
});
      
function saveCard() {
    var question = document.getElementById("question").value;
    var answer = document.getElementById("answer").value;
    
    var newCard = document.createElement("div");
    $(newCard).addClass("card");
    $(newCard).css("height","200px");
    $(newCard).css("width","18rem");
    var cardBody = document.createElement("div");
    $(cardBody).addClass("card-body");
    var questionTag = document.createElement("p");
    $(questionTag).addClass("card-text");
    $(questionTag).text("Question : " + question + "?");
    var answerTag = document.createElement("p");
    $(answerTag).addClass("card-text");
    $(answerTag).text("Answer : " + answer);

    var editButton = document.createElement("button");
    $(editButton).addClass("btn btn-outline-success");
    $(editButton).text("Edit");
    $(editButton).attr("type","button");
    $(editButton).attr("onclick","return showEdit(event);");

    var deleteButton = document.createElement("button");
    $(deleteButton).addClass("btn btn-outline-danger");
    $(deleteButton).text("Delete");
    $(deleteButton).attr("type","button");
    $(deleteButton).attr("onclick","return deleteCard(event);");

    cardBody.appendChild(questionTag);
    cardBody.appendChild(answerTag);
    cardBody.appendChild(editButton);
    cardBody.appendChild(deleteButton);
    newCard.appendChild(cardBody);
    $(newCard).css("margin-top","20px");
    $(newCard).attr("id", globalCount );
    globalCount++;

    $(newCard).attr("draggable", "true");
    document.getElementById("mainDiv").appendChild(newCard);

    newCard.addEventListener("dragstart", drag);

    saveToLocalStorage(newCard);
}

function allowDrop(ev) {
    ev.preventDefault();
  }
  
  function drag(ev) {
    console.log('drag',ev)
    if(ev){
        ev.dataTransfer.setData("text", ev.target.id);
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

  function edit(event) {
    var questionValue = document.getElementById("editQuestion").value;
    var answerValue = document.getElementById("editAnswer").value;

    editableQeustionElem.innerText = questionValue;
    editableAnswerElem.innerText = answerValue;

    var editDiv = document.getElementById("textAreaDiv").style.display = "none";


    var cardArray = [];
    var cards = localStorage.getItem('cards');
    if(cards != null) {
      cardArray = JSON.parse(cards);
    }
    
    for(var i = 0; i < cardArray.length; i++) {
      if(cardArray[i].id == editableQeustionElem.parentElement.parentElement.id) {
        cardArray[i].question = questionValue;
        cardArray[i].answer = answerValue;
      }
    }
    if(cardArray.length == 0) {
      localStorage.removeItem('cards')
    } else {
      localStorage.setItem('cards', JSON.stringify(cardArray));
    }
  }
  function showEdit(event) {
    editableQeustionElem = event.target.parentElement.getElementsByTagName("p")[0];
    editableAnswerElem = event.target.parentElement.getElementsByTagName("p")[1];
    var editDiv = document.getElementById("textAreaDiv").style.display = "block";
    var editableQuestion = editableQeustionElem.innerText;
    editableQuestion = editableQuestion.slice(11,editableQuestion.length-1);
    var editableAnswer = editableAnswerElem.innerText.slice(9);

    document.getElementById("editQuestion").value = editableQuestion;
    document.getElementById("editAnswer").value = editableAnswer;
  }

  function deleteCard(event) {
    $(event.target.parentElement.parentElement).remove();

    var cardArray = [];
    var cards = localStorage.getItem('cards');
    if(cards != null) {
      cardArray = JSON.parse(cards);
    }
    
    for(var i = 0; i < cardArray.length; i++) {
      if(cardArray[i].id == event.target.parentElement.parentElement.id) {
        cardArray.splice(i, 1);
      }
    }
    if(cardArray.length == 0) {
      localStorage.removeItem('cards')
    } else {
      localStorage.setItem('cards', JSON.stringify(cardArray));
    }
  }

  function saveToLocalStorage(elem) {
    localStorage.setItem('count',globalCount);
    var cardArray = [];
    var cards = localStorage.getItem('cards');
    if(cards != null) {
      cardArray = JSON.parse(cards);
    }
    var id = elem.id;
    var question = elem.firstChild.getElementsByTagName("p")[0].innerText;
    question = question.slice(11,question.length-1)
    var answer = elem.firstChild.getElementsByTagName("p")[1].innerText.slice(9);

    var saveCard  = { "question": question, "answer": answer, "id" : id};
    cardArray.push(saveCard);

    localStorage.setItem('cards', JSON.stringify(cardArray));

  }

  function makeCard(elem) {
    var question = elem.question;
    var answer = elem.answer;
    
    var newCard = document.createElement("div");
    $(newCard).addClass("card");
    $(newCard).css("height","200px");
    $(newCard).css("width","18rem");
    var cardBody = document.createElement("div");
    $(cardBody).addClass("card-body");
    var questionTag = document.createElement("p");
    $(questionTag).addClass("card-text");
    $(questionTag).text("Question : " + question + "?");
    var answerTag = document.createElement("p");
    $(answerTag).addClass("card-text");
    $(answerTag).text("Answer : " + answer);

    var editButton = document.createElement("button");
    $(editButton).addClass("btn btn-outline-success");
    $(editButton).text("Edit");
    $(editButton).attr("type","button");
    $(editButton).attr("onclick","return showEdit(event);");

    var deleteButton = document.createElement("button");
    $(deleteButton).addClass("btn btn-outline-danger");
    $(deleteButton).text("Delete");
    $(deleteButton).attr("type","button");
    $(deleteButton).attr("onclick","return deleteCard(event);");

    cardBody.appendChild(questionTag);
    cardBody.appendChild(answerTag);
    cardBody.appendChild(editButton);
    cardBody.appendChild(deleteButton);
    newCard.appendChild(cardBody);
    $(newCard).css("margin-top","20px");
    $(newCard).attr("id", 1 + $('#mainDiv .card').length );

    $(newCard).attr("draggable", "true");
    document.getElementById("mainDiv").appendChild(newCard);

    newCard.addEventListener("dragstart", drag);
  }