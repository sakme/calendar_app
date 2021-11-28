var today = moment().format("dddd, MMMM Do YYYY");
$("#currentDay").text(today);

var items = [];

var hour = moment().hour();

// load items
var loadItems = function() {
  items = JSON.parse(localStorage.getItem("items"));

  // if nothing in localStorage, create a new object to track all items in array
  if (!items) {
      items = [
        {
          "time": 8,
          "text": ""
        },
        {
          "time": 9,
          "text": ""
        },
        {
          "time": 10,
          "text": ""
        },
        {
          "time": 11,
          "text": ""
        },
        {
          "time": 12,
          "text": ""
        },
        {
          "time": 13,
          "text": ""
        },
        {
          "time": 14,
          "text": ""
        },
        {
          "time": 15,
          "text": ""
        },
        {
          "time": 16,
          "text": ""
        },
        {
          "time": 17,
          "text": ""
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

  var itemP = $("<p>")
    .text(itemText)
    .addClass("select");
  
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

// select item text to edit
$(".description").on("click", function() {
  var itemP = $(this).find(".select");
  
  var text = $(itemP)
    .text()
    .trim();

  var textInput = $("<textarea>")
    .addClass("textarea")
    .val(text);

  $(itemP).replaceWith(textInput);

  textInput.trigger("focus");
});

// save edited item text
$(".row").on("click", ".saveBtn", function() {
  // get the parent name attribute
  var timeVal = $(".textarea")
    .closest(".description")
    .attr("name")

  // get current value
  var textVal = $(".textarea")
    .val()
    .trim();

  index = items.findIndex((obj => obj.time == timeVal));
  
  items[index].text = textVal;
    
  saveItems();

  // replace p element
  var itemP = $("<p>")
    .text(textVal)
    .addClass("select");

  // replace textarea with p element
  $(".textarea").replaceWith(itemP);
});

// load page
loadItems();

// refresh every 15 minutes
setInterval(function() {
  location.reload();
}, 900000);