var graph = {
  target: '#graph-container',
  width:  window.innerWidth,
  height: window.innerHeight,
  directed: true,
  symmetricDiffLinkLengths: ['y', 50],
  data: undefined
},

visual = null,

graphData = {
  nodes: [],
  links: []
};

function constructNode(id, r, color) {
  /// creates nodes for the graph
  color = color || '';
  var node = {};
  node.id = id;
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

function populateGraph(nodeArr) {
  console.log('populating graph');
  graphData.nodes = [], graphData.links = [];
  /// creates nodes and links for the graph
  graphData.nodes.push(constructNode($('#user-choice').val(), 35, 'red'));
  var nodeNames = [];
  for (var i = 0; i < 30; i++){
    if ($.inArray(nodeArr[i], nodeNames) === -1) {
      nodeNames.push(nodeArr[i]);
      graphData.nodes.push(constructNode(nodeArr[i], 25));
      graphData.links.push(constructLink($('#user-choice').val(), nodeArr[i]));
    }
  }
  graph.data = graphData;
}
