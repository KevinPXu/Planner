# Timed-Coding-Quiz

## Technologies Used

- HTML
- CSS
- JavaScript
- Jquery
- Web APIs
- Moment.js
- VS Code
- Git
- GitHub

## Link to Application

https://kevinpxu.github.io/Timed-Coding-Quiz/

## Summary

This project was used to teach myself how to properly utilize third-party API's such as jquery and moment.js. This exercise used jquery to create dynamically created elements and store those elements to local storage in an organized way to then be able to retrieve those elements again and display them on the screen. We used moment.js to dynamically update parts of the screen depending on the current time.

## Demonstration

![A user inputs data into a planner and saves the information to the planner using the save button, when the page is refreshed, the text stays and can be rewritten](./Assets/Demo.gif)

## Description

## Code Snippet

### Functions to dynamically create the questions and to clear the questions when a choice is clicked

```JavaScript
function setQuestion(question) {
  setQuestionText(question.questionText);
  setQuestionChoices(question.answerChoices);
}

function setQuestionText(questionText) {
  document.getElementById("question").textContent = questionText;
}

function setQuestionChoices(answerChoices) {
  answerChoicesEl.innerHTML = " ";
  for (var i in answerChoices) {
    var ansChoice = document.createElement("button");
    ansChoice.addEventListener("click", function (event) {
      answerClicked(event.target);
    });
    var ansChoiceCont = document.createTextNode(answerChoices[i]);
    ansChoice.appendChild(ansChoiceCont);
    answerChoicesEl.appendChild(ansChoice);
  }
}
```

### Function to show and store the highscores

```JavaScript
function storeHighscore(initials) {
  highscores.push({
    initials,
    score: mainTimer,
  });
  highscores.sort((a, b) => b.score - a.score);
  localStorage.setItem("highscores", JSON.stringify(highscores));
}

function renderHighscore() {
  highscoreListEl.innerHTML = "";
  for (var highscore of highscores) {
    var li = document.createElement("li");
    li.textContent = highscore.initials + ": " + highscore.score;
    highscoreListEl.appendChild(li);
  }
}
```

## Author Links

[LinkedIn](https://www.linkedin.com/in/kevin-xu-4672a7215/)
[GitHub](https://github.com/KevinPXu)
