// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  $('#currentDay').text(dayjs().format('dddd, MMMM D, YYYY'));

  // Add a click listener to the save buttons
  $('.saveBtn').click(function () {
    var timeBlockId = $(this).parent().attr('id'); // Get the id of the parent time-block
    var description = $(this).siblings('.description').val(); // Get the value of the textarea
    localStorage.setItem(timeBlockId, description); // Save the description in localStorage
  });

  // Function to update time block classes based on the current time
  function updateTimeBlocks() {
    var currentHour = dayjs().hour(); // Get current hour in 24-hour format

    $('.time-block').each(function () {
      var blockHour = parseInt($(this).attr('id').split('-')[1]); // Extract the hour from the id

      if (blockHour < currentHour) {
        $(this).removeClass('future present').addClass('past');
      } else if (blockHour === currentHour) {
        $(this).removeClass('past future').addClass('present');
      } else {
        $(this).removeClass('past present').addClass('future');
      }
    });
  }

  // Call the function once and set it to run every minute
  updateTimeBlocks();
  setInterval(updateTimeBlocks, 60000);

  // Load saved descriptions from localStorage
  $('.time-block').each(function () {
    var timeBlockId = $(this).attr('id');
    var savedDescription = localStorage.getItem(timeBlockId);
    if (savedDescription) {
      $(this).find('.description').val(savedDescription);
    }
  });
});
