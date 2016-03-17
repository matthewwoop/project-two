window.onload = function () {
  console.log('main.js has loaded...');

  $('#submit-btn').on('click', function() {
    if (validInput($('#user-choice').val())){
      $.ajax({
        url: wiki.baseStart + $('#user-choice').val() + wiki.baseEnd,
        dataType: 'jsonp',
        success: function(response) {
          console.log('success');
          wiki.result = response.query.pages[Object.keys(response.query.pages)[0]];
          wiki.text = wiki.result.revisions[0]['*'];
        }
      });
    } else {
      alert('Please provide an input');
      return;
    }
  });
}




var wiki = {
  baseStart: 'https://en.wikipedia.org/w/api.php?action=query&titles=',
  baseEnd: '&prop=revisions&rvprop=content&rvsection=0&format=json',
  result: undefined
}



function validInput(input) {
  if (input) {
    return true;
  } else {
    return false;
  }
}

function getNodes(text) {

}
