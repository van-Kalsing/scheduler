function render_works_categories(container_element) {
container_element_id = container_element.attr("id");
	
// var links = [
//   {source: "Microsoft", target: "Amazon"},
//   {source: "Microsoft", target: "HTC"},
//   {source: "Samsung", target: "Apple"},
//   {source: "Motorola", target: "Apple"},
//   {source: "Nokia", target: "Apple"},
//   {source: "HTC", target: "Apple"},
//   {source: "Kodak", target: "Apple"},
//   {source: "Microsoft", target: "Barnes & Noble"},
//   {source: "Microsoft", target: "Foxconn"},
//   {source: "Apple", target: "HTC"},
//   {source: "Microsoft", target: "Inventec"},
//   {source: "Samsung", target: "Kodak"},
//   {source: "LG", target: "Kodak"},
//   {source: "RIM", target: "Kodak"},
//   {source: "Sony", target: "LG"},
//   {source: "Kodak", target: "LG"},
//   {source: "Apple", target: "Nokia"},
//   {source: "Qualcomm", target: "Nokia"},
//   {source: "Apple", target: "Motorola"},
//   {source: "Microsoft", target: "Motorola"},
//   {source: "Motorola", target: "Microsoft"},
//   {source: "Kodak", target: "Samsung"},
//   {source: "Apple", target: "Samsung"},
//   {source: "Kodak", target: "RIM"},
//   {source: "Nokia", target: "Qualcomm"}
// ];

// var nodes = {};

// // Compute the distinct nodes from the links.
// links.forEach(function(link) {
//   link.source = nodes[link.source] || (nodes[link.source] = {name: link.source});
//   link.target = nodes[link.target] || (nodes[link.target] = {name: link.target});
// });

var graph =
  {
   "name": "flare",
   "children": [
    {
     "name": "analytics",
     "children": [
      {
       "name": "cluster",
       "children": [
        {"name": "AgglomerativeCluster", "size": 3938},
        {"name": "CommunityStructure", "size": 3812},
        {"name": "MergeEdge", "size": 743}
       ]
      },
      {
       "name": "graph",
       "children": [
        {"name": "BetweennessCentrality", "size": 3534},
        {"name": "LinkDistance", "size": 5731}
       ]
      }
     ]
    }
   ]
  }


var width = container_element.width(),
    height = 500;

var svg = d3.select("#" + container_element_id).append("svg")
    .attr("width", width)
    .attr("height", height);

var cluster = d3.layout.cluster()
    .size([width/2, height/2])
    
var link = svg.selectAll(".link")
    .data(cluster.links(cluster.nodes(graph)))
    .enter().append("line")
    .classed("link", true)
    .attr("x1", function(node) { return node.source.y; })
    .attr("y1", function(node) { return node.source.x; })
    .attr("x2", function(node) { return node.target.y; })
    .attr("y2", function(node) { return node.target.x; });
    
var node = svg.selectAll(".node")
    .data(cluster.nodes(graph))
    .enter()
    .append("g")
    .classed("node", true)
    .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });
    
node.append("circle")
    .attr("r", 8);
    
node.append("text")
    .attr("x", 12)
    .attr("dy", ".35em")
    .text(function(node) { return node.name; });
}