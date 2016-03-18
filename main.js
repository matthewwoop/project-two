window.onload = function () {
  console.log('main.js has loaded...');

  $('#submit-btn').on('click', function() {
    if (validInput($('#user-choice').val())){
      $.ajax({
        url: wiki.baseStart + $('#user-choice').val() + wiki.baseEnd,
        dataType: 'jsonp',
        success: function(response) {
          console.log('successfully requested', $('#user-choice').val());
          createWiki(response);
          populateGraph(wiki.nodes);
          greuler(graph).update();
        }
      });
    } else {
      alert('Please provide an input');
      return;
    }

  });
};

var wiki = {
  baseStart: 'https://en.wikipedia.org/w/api.php?action=query&titles=',
  baseEnd: '&prop=revisions&rvprop=content&rvsection=0&format=json'
};

function validInput(input) {
  if (input) {
    return true;
  } else {
    return false;
  }
}

function getNodes(regExp, text) {
  var links = text.match(regExp),
      nodes = [];
  for (var i=0; i < links.length; i++){
    nodes[i] = links[i].slice(2);
  }
  return nodes;
}

function createWiki(response) {
  wiki.result = response.query.pages[Object.keys(response.query.pages)[0]];
  wiki.text = wiki.result.revisions[0]['*'];
  wiki.nodes = getNodes(/\[\[[\w+ ]*/g, wiki.text);
  wiki.nodesParens = getNodes(/\[\[[\w+ ]*\([\w+ ]*\)/g, wiki.text);
  // for (var i=0; i < wiki.nodesParens.length; i++){
  //   wiki.nodesParens[i] = wiki.nodesParens[i].replace(' ', '_');
  // }
  return wiki;
}
