
function setTextColor(hexcolor) {
  var r = parseInt(hexcolor.substr(0,2),16);
  var g = parseInt(hexcolor.substr(2,2),16);
  var b = parseInt(hexcolor.substr(4,2),16);
  var yiq = ((r*299) + (g*587) + (b*114)) / 1000;
  return (yiq >= 128) ? 'black' : 'white';
}

function colorGraph() {
  console.log('getting colors');
  $.ajax({
    url: colorEndpoint,
    dataType: 'JSONP',
    jsonpCallback: 'callback'
  }).success(function(response) {
    palette = response[0].colors;
  }).done(function () {
    // populateGraph(wiki.nodes, palette);
  });
}
