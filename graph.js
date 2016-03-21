var graph = {
  target: '#graph-container',
  width:  window.innerWidth,
  height: window.innerHeight,
  directed: true,
  data: undefined
},

visual = null,

graphData = {
  nodes: [],
  links: [],
  linkDistance: 125
};

function constructNode(id, label,  r, color) {
  /// creates nodes for the graph
  color = color || '';
  var node = {};
  node.id = id;
  node.label = label;
  node.r = r;
  node.fill = color;
  return node;
}

function constructLink(source, target) {
  /// creates edges for the graph
  var link = {};
  link.source = source;
  link.target = target;
  return link;
}
function getRad(word) {
  var splitWord = word.split(' '), longest;
  if (splitWord.length > 1) {
    longest = splitWord.sort(function (a, b) { return b.length - a.length; })[0];
  } else {
    longest = splitWord[0];
  }
  return 5.25*longest.length;
}

function populateGraph(nodeArr) {
  console.log('populating graph');
  graphData.nodes = [], graphData.links = [];   /// clear old graph
  /// creates nodes and links for the graph
  graphData.nodes.push(constructNode(0, '', getRad($('#user-choice').val()), 'red'));
  // create nucleus
  var nodeNames = [];
  for (var i = 0; i < 10; i++){
    if ($.inArray(nodeArr[i], nodeNames) === -1) {
      nodeNames.push(nodeArr[i]);
      graphData.nodes.push(constructNode(i+1, '', getRad(nodeArr[i])));
      graphData.links.push(constructLink(0, i+1));
    } else {
      console.log(nodeArr[i], 'is a repeat');
      nodeArr.splice(i, 1);
    }
  }
  graph.data = graphData;
}

var dy = [0, 0, -0.25, -1, -1.5, -2, -3];

function fillNodes() {
  var nodes = d3.selectAll('text.label')[0];
  for (var i = 1; i < nodes.length; i++) {
     var splitWord = wiki.nodes[i-1].split(' ');
     for(var j = 0; j < splitWord.length; j++){
        d3.select('#greuler-'+i+' text').append("tspan")
        .text(splitWord[j])
        .attr("dy", j === 0 ? dy[splitWord.length]+'em' : '1em') // 1 word: 0, 2 word: .25em, 3: -1em, 5: -2em
        .attr("x", 0)
        .attr("text-anchor", "middle")
        .attr("class", "tspan" + i);
    }
  }
}
