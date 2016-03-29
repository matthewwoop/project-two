var graph = {
  target: '#graph-container',
  width:  window.innerHeight,
  height: window.innerHeight,
  directed: true,
  data: undefined
},
visual = null,
palette,
clicked,
colorEndpoint=  'http://www.colourlovers.com/api/palettes/random?format=json&jsonCallback=callback',
dy = [0, 0, -0.25, -1, -1.5, -2, -3, -3.25, -3.5, -3.75, -4],
graphData = {
  nodes: [],
  links: [],
  linkDistance: 100
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
  console.log(word);
  var splitWord = word.split(' '),
  longest = splitWord.sort(function (a, b) { return b.length - a.length; })[0];
  if (splitWord.length > 5) {
    return 6*longest.length;
  } else if (splitWord.length > 1) {
    return 5.5*longest.length;
  } else if (longest.length > 10) {
    return 3*longest.length;
  } else {
    return 5*longest.length;
  }
}

function populateGraph(nodeArr, palette) {

  graphData.nodes = [], graphData.links = [];   /// clear old graph
  /// creates nodes and links for the graph
  graphData.nodes.push(constructNode(0, '', getRad($('#user-choice').val()||clicked), 'red'));
  // create nucleus
  var nodeNames = [], numNodes, color;
  numNodes = nodeArr.length < 15 ? numNodes = nodeArr.length : numNodes = 15;
  for (var i = 0; i < numNodes; i++){
    if ($.inArray(nodeArr[i], nodeNames) === -1 && nodeArr[i]!== '') {
      console.log('i:', i);
      color = palette[Math.floor(Math.random()*palette.length)];
      nodeNames.push(nodeArr[i]);
      graphData.nodes.push(constructNode(i+1, '', getRad(nodeArr[i]), '#'+color));
      graphData.links.push(constructLink(0, i+1));
    }
  }
  graph.data = graphData;
}


function fillNodes() {
  var nodes = d3.selectAll('text.label')[0];
  console.log(nodes);
  for (var i = 1; i < nodes.length; i++) {
     var splitWord = wiki.nodes[i-1].split(' ');
     for(var j = 0; j < splitWord.length; j++){
        d3.select('#greuler-'+i+' text').append("tspan")
        .text(splitWord[j])
        .attr("dy", j === 0 ? dy[splitWord.length]+'em' : '1em') // 1 word: 0, 2 word: .25em, 3: -1em, 5: -2em
        .attr("x", 0)
        .attr("text-anchor", "middle")
        .attr('fill', setTextColor(graphData.nodes[i].fill.replace('#','')))
        .attr("class", "tspan" + i);
    }
    (function(i){
      $('#greuler-'+(i)).on('mousedown',function(e){
      console.log(e);
      clicked = wiki.nodes[e.currentTarget.__data__.id - 1];
      // console.log(e.currentTarget.id);
      callWiki(wiki.nodes[e.currentTarget.__data__.id - 1].replace(/\s/g, '_'));
      });
    })(i);
  }
}
function fillNucleus() {
  var nucleus = d3.selectAll('text.label')[0];
  var whichTitle = $('#user-choice').val() || clicked;
  var splitNucleus = whichTitle.split(' ');
  console.log('nucleus title: ', splitNucleus);
  for(var j = 0; j < splitNucleus.length; j++){
    d3.select('#greuler-0 text').append("tspan")
    .text(splitNucleus[j])
    .attr("dy", j === 0 ? dy[splitNucleus.length]+'em' : '1em') // 1 word: 0, 2 word: .25em, 3: -1em, 5: -2em
    .attr("x", 0)
    .attr("text-anchor", "middle")
    .attr("class", "tspan" + 0);
  }
  $('#user-choice').val('');
}
