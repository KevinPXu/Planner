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

A simple planner for a single day that displays the current day. When you click on a text area, you are able to type in a task and save using the blue save button. The text will stay even after refresh. The color of the text areas will change dynamically depending on the current hour and will tell you if the hour is passed. (\*Note the demonstration above was recorded outside of typical business hours).

## Code Snippet

### Functions to dynamically create the text block, text area, and the save button inline using DOM traversal via Jquery and bootstrap to style the page.

```JavaScript
function createTextArea() {
  for (var [i, mHour] of Object.entries(mHours)) {
    //variables for new elements in HTML
    var newDivEl = $("<div>");
    var textAreaEl = $("<textarea>");
    var buttonEl = $("<button>");
    var timeBlockEl = $("<span>");
    // A container element to store Textarea, text block, and save button
    newDivEl.addClass("row");
    containerEl.append(newDivEl);
    //creating text block with bootstrap styling
    timeBlockEl.addClass("col-xl-1 time-block hour");
    timeBlockEl.text(hours[i]);
    newDivEl.append(timeBlockEl);
    //creating text area with classes with the military time, bootstrap, and the current hour explicitly written
    textAreaEl.addClass(mHour + " col-xl-10 " + hours[i]);
    newDivEl.append(textAreaEl);
    //creating the buttons with bootstrap elements
    buttonEl.addClass("btn btn-primary saveBtn col-xl-1");
    newDivEl.append(buttonEl);
    buttonEl.on("click", function (event) {
      var input = $(event.target).siblings().next().val();
      var hour = $(event.target).siblings().next().attr("class").split(" ")[0];
      saveText(input, hour);
    });
  }
  renderFromLocalStorage();
}
```

## Author Links

[LinkedIn](https://www.linkedin.com/in/kevin-xu-4672a7215/)
[GitHub](https://github.com/KevinPXu)
