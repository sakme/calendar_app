var today = moment().format("dddd, MMMM Do YYYY");
var items = [
  {
    time = 8,
    text = "temp"
  },
  {
    time = 9,
    text = "temp"
  },
  {
    time = 10,
    text = "temp"
  },
  {
    time = 11,
    text = "temp"
  },
  {
    time = 12,
    text = "temp"
  },
  {
    time = 1,
    text = "temp"
  },
  {
    time = 2,
    text = "temp"
  },
  {
    time = 3,
    text = "temp"
  },
  {
    time = 4,
    text = "temp"
  },
  {
    time = 5,
    text = "temp"
  }
];

$("#currentDay").text(today);

var hour = moment().hour();
console.log(hour);
var loadItems = function() {
  items = JSON.parse(localStorage.getItem("items"));

  // if nothing in localStorage, create a new object to track all task status arrays
  if (!items) {
      items = [];
  }

  // loop over object properties
  for (i=0; i < items.length; i++) {
      createItem(items[i].time, items[i].text,);
    };
};

var saveItems = function() {
    localStorage.setItem("items", JSON.stringify(items));
};

var createItem = function(itemTime, itemText) {
  var itemDiv = $("#b" + itemTime);

  var itemP = $("<p>").text(itemText);

  var evalTime = function() {
      if ((itemTime) < hour){
        $("#b" + itemTime).addClass("past");
      } 
      else if ((itemTime) < hour) {
        $("#b" + itemTime).addClass("present");
      } 
      else {
        $("#b" + itemTime).addClass("future");
      }
  }

    $(itemDiv)
    .addClass(evalTime);

    $(itemDiv)
      .append(itemP);
};

  // select task text to edit
$(".description").on("click", "p", function() {
  // $(this).append("<p>");

  var text = $(this)
    .text()
    .trim();

  var textInput = $("<textarea>")
    .addClass("textarea")
    .val(text);

    console.log(textInput);

  $(this).replaceWith(textInput);

  textInput.trigger("focus");
});

// save edited task text
$(".description").on("blur", "textarea", function() {
  // get current value
  var text = $(this)
    .val()
    .trim();
    console.log(text);

  // get the parent name attribute
  var time = $(this)
    .closest(".description")
    .attr("name")

   items.push({
     time: time,
     text: text
   }) 
  
  saveItems();

    // replace p element
    var itemP = $("<p>")
      .text(text);

  // replace textarea with p element
  $(this).replaceWith(itemP);
});

loadItems();