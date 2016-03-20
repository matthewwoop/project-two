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
function getRad(length) {
  return 3.25*length;
}

function populateGraph(nodeArr) {
  console.log('populating graph');
  graphData.nodes = [], graphData.links = [];   /// clear old graph
  /// creates nodes and links for the graph
  graphData.nodes.push(constructNode(0, '', getRad($('#user-choice').val().length), 'red'));
  // create nucleus
  var nodeNames = [];
  for (var i = 0; i < 10; i++){
    if ($.inArray(nodeArr[i], nodeNames) === -1) {
      nodeNames.push(nodeArr[i]);
      graphData.nodes.push(constructNode(i+1, '', getRad(nodeArr[i].length)));
      graphData.links.push(constructLink(0, i+1));
    }
  }
  graph.data = graphData;
}

function addLineBreak(label) {
  for (i = 0; i < arr.length; i++) {
    d3.select('#greuler-1 text').append("tspan")
      .text(arr[i])
      .attr("dy", i ? "1.2em" : 0)
      .attr("x", 0)
      .attr("text-anchor", "middle")
      .attr("class", "tspan" + i);
  }
}

// greuler({
//   target: '#graph-container',
//   width: 480,
//   data: {
//     nodes: [
//       {id: 0, r:30, label:'a lil'},
//       {id: 1, r:30, label:''},
//     ],
//     links: [
//       {source: 0, target: 1},
//     ]
//   }
// }).update()
//
// arr = ['please', 'work']
//
// for (i = 0; i < arr.length; i++) {
//   d3.select('#greuler-1 text').append("tspan")
//     .text(arr[i])
//     .attr("dy", i ? "1.2em" : 0)
//     .attr("x", 0)
//     .attr("text-anchor", "middle")
//     .attr("class", "tspan" + i);
// }
