var currentDayEl = $("#currentDay");
var containerEl = $(".container");
var mHours = [9, 10, 11, 12, 13, 14, 15, 16, 17];
var hours = ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"];
initLocalStorage();
addCurrentDate();
createTextArea();

function addCurrentDate() {
  currentDayEl.text(moment().format("MMM Do YYYY"));
}

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

function initLocalStorage() {
  var schedule = {};
  if (localStorage.getItem("schedule")) {
    return;
  } else {
    localStorage.setItem("schedule", JSON.stringify(schedule));
  }
}

function saveText(input, hour) {
  var schedule = JSON.parse(localStorage.getItem("schedule"));
  if (!schedule) {
    initLocalStorage();
    schedule = JSON.parse(localStorage.getItem("schedule"));
  }
  schedule[hour] = input;
  localStorage.setItem("schedule", JSON.stringify(schedule));
}

function renderFromLocalStorage() {
  var schedule = JSON.parse(localStorage.getItem("schedule"));
  for (var hour of Object.keys(schedule)) {
    $("textarea." + hour).text(schedule[hour]);
  }
}

setTimeColor();
function setTimeColor() {
  var temp;
  for (var [i, mHour] of Object.entries(mHours)) {
    temp = containerEl.children().eq(i).children().eq(1).attr("class");
    temp = temp.split(" ");

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
    temp = "";
  }
}
var test = containerEl.children().eq(1).children().eq(1).attr("class");
console.log(test.split());
