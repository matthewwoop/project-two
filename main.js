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
          wiki.nodes = getNodes(/\[\[[\w+ ]*/g, wiki.text);
          wiki.nodesParens = getNodes(/\[\[[\w+ ]*\([\w+ ]*\)/g, wiki.text);
        }
      });
    } else {
      alert('Please provide an input');
      return;
    }
    greuler({
      target: '#hello-world',
      width: window.innerWidth,
      height: window.innerHeight,
      data: {
        nodes: test.nodes,
        links: [
        {source: 'hydrogen', target: 'atom'},
        ]
      }
    }).update();
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

var test = {
  nodes: [
    {
    id: 'hydrogen',
    r: 25
    },
    {
    id: 'atom',
    r: 25
    }
  ]
};
