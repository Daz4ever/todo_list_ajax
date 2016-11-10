$(function() {

  var text = $('#new-task').val();
  var queryData = { 'task': text };
  function updateList() {
    $.get('/tasks', queryData, function(data) {
      //empties the shown search results
      $('#task-list').html('');
      data.forEach(function(result) {
        var html = '<li id='+ result.id + '><input type="checkbox" class="checkbox">' + result.description + '</li>';
        $('ul#task-list').append(html);
      });
    });
  }
  updateList();
  $('#form').submit(function(event) {
    event.preventDefault();
    $.post('/add_task', $('#new-task').serialize(), function(data) {
      updateList();
    });

  });
//this won't work for checkboxes that are dynamically
//generated after the fact
//$('#task-list .checkbox).click(function() {
//console.log('checkbox clicked');
//});
  $('#task-list').on('click', '.checkbox', function() {
    console.log('checkbox clicked');
    $checked = $(this).prop('checked');
    var $li = $(this).closest('li');
    if($checked) {
      $(this).closest('li').css('text-decoration', 'line-through');
    }
    else {
      $(this).closest('li').css('text-decoration', 'none');
    }

    var dataIdDone = {
      id: $li.attr('id'),
      done: $(this).prop('checked')
    };
    $.post('/mark_task', dataIdDone, function() {
      console.log('Marked the task');
    });
  });
  $('#remove-completed').click(function() {
    $.post('/remove_completed', function() {
      updateList();
    });
  });
});
