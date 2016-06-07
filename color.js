/*

ORIGINAL PROJECT TWO CODE

*/
function setTextColor(hexcolor) {
  var r = parseInt(hexcolor.substr(0,2),16);
  var g = parseInt(hexcolor.substr(2,2),16);
  var b = parseInt(hexcolor.substr(4,2),16);
  var yiq = ((r*299) + (g*587) + (b*114)) / 1000;
  return (yiq >= 128) ? 'black' : 'white';
}

palette = ['6BAB90', 'CC939E', 'DDA635', '0D6875', 'E0ED86'];

function callWiki(choice) {
  $('#graph-container').attr('greuler-id', '');   /// clear greuler-id so new graph can be generated
  $('#graph-container').empty();    /// clear previous graph from container
  $.ajax({
    url: wiki.baseStart + choice + wiki.baseEnd,
    dataType: 'jsonp',
    success: function(response) {
      if(!invalidSearch(response)) {
        createWiki(response);        /// chop up response into pieces for wiki object
        populateGraph(wiki.nodes, palette);/// make nodes and edges for graph
        visual = greuler(graph);       /// draw the graph
        visual.update();
      }
    },
    fail: function () {
    }
  }).done(function(response) {
    //// fill in text nodes
    setTimeout(fillNucleus, 4500);
    setTimeout(fillNodes, 5000);
  });
}
