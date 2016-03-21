
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

function callWiki(choice) {
  $('#graph-container').attr('greuler-id', '');   /// clear greuler-id so new graph can be generated
  $('#graph-container').empty();    /// clear previous graph from container
  $.ajax({
    url: wiki.baseStart + choice + wiki.baseEnd,
    dataType: 'jsonp',
    success: function(response) {
      console.log(response);
      console.log('successfully requested', $('#user-choice').val());
      if(!invalidSearch(response)) {
        createWiki(response);        /// chop up response into pieces for wiki object
        console.log(wiki.result);
        populateGraph(wiki.nodes, palette);/// make nodes and edges for graph
        visual = greuler(graph);       /// draw the graph
        visual.update();
      }
    },
    fail: function () {
      console.log('failure');
    }
  }).done(function(response) {
    //// fill in text nodes
    console.log('done');
    setTimeout(fillNucleus, 4500);
    setTimeout(fillNodes, 5000);
  });
}
