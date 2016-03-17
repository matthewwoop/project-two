window.onload = function () {
  console.log('main.js has loaded...');
  $.ajax({
    url: wikimedia.baseEndpoint,
    dataType: 'jsonp',
    success: function(response) {
      console.log('success');
      console.log(response);
    }
  });
}




var wikimedia = {
  baseStart: 'https://en.wikipedia.org/w/api.php?action=query&titles=',
  baseEnd: '&prop=revisions&rvprop=content&format=json'
}
