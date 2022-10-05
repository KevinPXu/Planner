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
    var newDivEl = $("<div>");
    var textAreaEl = $("<textarea>");
    var buttonEl = $("<button>");
    var timeBlockEl = $("<span>");
    newDivEl.addClass("row");
    containerEl.append(newDivEl);
    timeBlockEl.addClass("col-xl-1 time-block hour");
    timeBlockEl.text(hours[i]);
    newDivEl.append(timeBlockEl);
    textAreaEl.addClass(mHour + " col-xl-10 " + hours[i]);
    newDivEl.append(textAreaEl);
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
  timeOfDay();
}

function timeOfDay() {
  for (var [i, mHour] of Object.entries(mHours)) {
    if (
      containerEl.children().children("textarea").attr("class").split(" ")[
        mHour
      ] < moment().hour()
    ) {
      containerEl
        .children()
        .children("textarea")
        .attr("class", mHour + " col-xl-10 " + hours[i] + " past");
    } else if (
      containerEl.children().children("textarea").attr("class").split(" ")[
        mHour
      ] > moment().hour()
    ) {
      containerEl
        .children()
        .children("textarea")
        .attr("class", mHour + " col-xl-10 " + hours[i] + " future");
    } else {
      containerEl
        .children()
        .children("textarea")
        .attr("class", mHour + " col-xl-10 " + hours[i] + " future");
    }
  }
}
