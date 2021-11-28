var today = moment().format("dddd, MMMM Do YYYY");
$("#currentDay").text(today);

var items = [];

var hour = moment().hour();

// load items
var loadItems = function() {
  items = JSON.parse(localStorage.getItem("items"));

  // if nothing in localStorage, create a new object to track all task status arrays
  if (!items) {
      items = [
        {
          "time": 8,
          "text": "temp"
        },
        {
          "time": 9,
          "text": "temp"
        },
        {
          "time": 10,
          "text": "temp"
        },
        {
          "time": 11,
          "text": "temp"
        },
        {
          "time": 12,
          "text": "temp"
        },
        {
          "time": 13,
          "text": "temp"
        },
        {
          "time": 14,
          "text": "temp"
        },
        {
          "time": 15,
          "text": "temp"
        },
        {
          "time": 16,
          "text": "temp"
        },
        {
          "time": 17,
          "text": "temp"
        }];
  }
  
  // loop over object properties
  for (i=0; i < items.length; i++) {
      createItem(items[i].time, items[i].text,);
    };
};

// create items
var createItem = function(itemTime, itemText) {
  var itemDiv = $("#b" + itemTime);

  var itemP = $("<p>").text(itemText);
  
  var evalTime = function() {
      if ((itemTime) < hour){
        $("#b" + itemTime).addClass("past");
      }
      else if ((itemTime) > hour) {
        $("#b" + itemTime).addClass("future");
      }
      else {
        $("#b" + itemTime).addClass("present");
      }
  }

    $(itemDiv)
    .addClass(evalTime);

    $(itemDiv)
      .append(itemP);

    saveItems();
};

// save items
var saveItems = function() {
    localStorage.setItem("items", JSON.stringify(items));
};

// select task text to edit
$(".description").on("click", "p", function() {
  var text = $(this)
    .text()
    .trim();

  var textInput = $("<textarea>")
    .addClass("textarea")
    .val(text);

  $(this).replaceWith(textInput);

  textInput.trigger("focus");
});

// save edited task text
$(".description").on("blur", "textarea", function() {
  // get the parent name attribute
  var timeVal = $(this)
    .closest(".description")
    .attr("name")

  // get current value
  var textVal = $(this)
    .val()
    .trim();

  index = items.findIndex((obj => obj.time == timeVal));
  
  items[index].text = textVal;
    
  
  saveItems();

  // replace p element
  var itemP = $("<p>")
    .text(textVal);

  // replace textarea with p element
  $(this).replaceWith(itemP);
});

loadItems();