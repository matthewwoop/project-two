window.onload = function () {
  console.log('main.js has loaded...');

  colorGraph();

  $('#submit-btn').on('click', function(e) {
    var choice = $('#user-choice').val().replace(' ', '_');  /// convert 2+ word search queries
    console.log(choice);
    if(visual){
      $('#graph-container').attr('greuler-id', '');   /// clear greuler-id so new graph can be generated
      $('#graph-container').empty();    /// clear previous graph from container
    }
    if (validInput($('#user-choice').val())){
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
            console.log('graph drawn');
          }
        },
        fail: function () {
          console.log('failure');
        }
      }).done(function(response) {
        //// fill in text nodes
        console.log('done');
        // setTimeout(fillNucleus, 0);
        // setTimeout(fillNodes, 0);
        setTimeout(fillNucleus, 1000);
        setTimeout(fillNodes, 1000);
      });
    }
  });
};

var wiki = {
  baseStart: 'https://en.wikipedia.org/w/api.php?action=query&titles=',
  // baseEnd: '&prop=revisions&rvprop=content&rvsection=0&format=json'
  baseEnd: '&prop=revisions&rvprop=content&format=json'
};

function validInput(input) {
  /// safeguards against blank input
  if (input) {
    return true;
  } else {
    alert('Please provide a valid input');
    return;
  }
}
function invalidSearch(response) {
  if (response.query.pages.hasOwnProperty('-1')){
    alert('Invalid search term');
    $('#user-choice').val('');
    return true;
  }
}
function getNodes(regExp, text) {
  /// turns regExp matches into nodes granted they're not ambiguous
  var links = text.match(regExp),
      nodes = [];
    if (links){
      for (var i=0; i < links.length; i++){
        nodes[i] = links[i].slice(2).slice(0,-1);
      }
    }
  return nodes;
}
function getNodesParens(regExp, text) {
  /// creates nodes for matches that are ambiguous links
  var links = text.match(regExp),
      nodes = [];
  if (links){
    for (var i=0; i < links.length; i++){
      nodes[i] = links[i].slice(2);
    }
  }
  return nodes;
}

function createWiki(response) {
  console.log('creating wiki');
  wiki.result = response.query.pages[Object.keys(response.query.pages)[0]];
  wiki.text = wiki.result.revisions[0]['*'];
  wiki.nodes = getNodes(/\[\[[\w ]*[^\(\w+ ]/g, wiki.text);
  wiki.nodesParens = getNodesParens(/\[\[[\w+ ]*\([\w+ ]*\)/g, wiki.text);
  // for (var i=0; i < wiki.nodesParens.length; i++){
  //   wiki.nodesParens[i] = wiki.nodesParens[i].replace(' ', '_');
  // }
  return wiki;
}
