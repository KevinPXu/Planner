var currentDayEl = $("#currentDay");
var containerEl = $(".container");
var mHours = [9, 10, 11, 12, 13, 14, 15, 16, 17];
var hours = ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"];
initLocalStorage();
addCurrentDate();
createTextArea();
setTimeColor();

// using moment.js, creates a dynamically updating date at the top of the page
function addCurrentDate() {
  currentDayEl.text(moment().format("MMM Do YYYY"));
}
// creates the contents of the screen
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
    //retrieves the information within the text area on button click
    buttonEl.on("click", function (event) {
      var input = $(event.target).siblings().next().val();
      var hour = $(event.target).siblings().next().attr("class").split(" ")[0];
      saveText(input, hour);
    });
  }
  //call to render the local storage as soon as page loads
  renderFromLocalStorage();
}
//initializes the local storage to an empty object and checks to see if there is already something in local storage other wise will set the empty string to avoid a null object from pulling from the storage. (only applicable if local storage is manually cleared by user)
function initLocalStorage() {
  var schedule = {};
  if (localStorage.getItem("schedule")) {
    return;
  } else {
    localStorage.setItem("schedule", JSON.stringify(schedule));
  }
}

//saves the text taken from the button click above and saves elements to an object in local storage.
function saveText(input, hour) {
  //temp variable to store what is already in storage so information is not lost
  var schedule = JSON.parse(localStorage.getItem("schedule"));
  if (!schedule) {
    initLocalStorage();
    schedule = JSON.parse(localStorage.getItem("schedule"));
  }
  schedule[hour] = input;
  localStorage.setItem("schedule", JSON.stringify(schedule));
}

//renders the local storage to the screen
function renderFromLocalStorage() {
  //parses the storage to schedule as an object
  var schedule = JSON.parse(localStorage.getItem("schedule"));
  //retrieves each key of the object and changes the text of the Textarea with the given class to the contents of the object.
  for (var hour of Object.keys(schedule)) {
    $("textarea." + hour).text(schedule[hour]);
  }
}

//sets the color of each text area to visualize which times have passed, current time, and future available times
function setTimeColor() {
  var temp;
  //for loop allows me to use both the index and the value of mHours at that index to traverse the dom.
  for (var [i, mHour] of Object.entries(mHours)) {
    temp = containerEl.children().eq(i).children().eq(1).attr("class");
    temp = temp.split(" ");
    //checks if the current time is before, equal to, or after the current time.
    if (moment().hour() > temp[0]) {
      containerEl
        .children()
        .eq(i)
        .children()
        .eq(1)
        .attr("class", mHour + " col-xl-10 " + hours[i] + " past");
    } else if (moment().hour() < temp[0]) {
      containerEl
        .children()
        .eq(i)
        .children()
        .eq(1)
        .attr("class", mHour + " col-xl-10 " + hours[i] + " future");
    } else {
      containerEl
        .children()
        .eq(i)
        .children()
        .eq(1)
        .attr("class", mHour + " col-xl-10 " + hours[i] + " present");
    }
    //resets the temp variable
    temp = "";
  }
}
