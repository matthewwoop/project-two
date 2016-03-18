var graph = {
  target: '#graph-container',
  width:  window.innerWidth,
  height: window.innerHeight,
  data: undefined
},

graphData = {
  nodes: [],
  links: []
};

function constructNode(id, r) {
  /// creates nodes for the graph
  var node = {};
  node.id = id;
  node.r = r;
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
  /// creates nodes and links for the graph
  graphData.nodes.push(constructNode($('#user-choice').val(), 15));
  var nodeNames = [];
  for (var i = 0; i < nodeArr.length; i++){
    if ($.inArray(nodeArr[i], nodeNames) === -1) {
      nodeNames.push(nodeArr[i]);
      graphData.nodes.push(constructNode(nodeArr[i], 25));
      graphData.links.push(constructLink($('#user-choice').val(), nodeArr[i]));
    }
  }
  graph.data = graphData;
}
