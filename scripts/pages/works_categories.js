function render_works_categories(container_element) {

container_element.html("");	
container_element_id = container_element.attr("id");
	
var links = [
  {source: "Microsoft", target: "Amazon"},
  {source: "Microsoft", target: "HTC"},
  {source: "Samsung", target: "Apple"},
  {source: "Motorola", target: "Apple"},
  {source: "Nokia", target: "Apple"},
  {source: "HTC", target: "Apple"},
  {source: "Kodak", target: "Apple"},
  {source: "Microsoft", target: "Barnes & Noble"},
  {source: "Microsoft", target: "Foxconn"},
  {source: "Apple", target: "HTC"},
  {source: "Microsoft", target: "Inventec"},
  {source: "Samsung", target: "Kodak"},
  {source: "LG", target: "Kodak"},
  {source: "RIM", target: "Kodak"},
  {source: "Sony", target: "LG"},
  {source: "Kodak", target: "LG"},
  {source: "Apple", target: "Nokia"},
  {source: "Qualcomm", target: "Nokia"},
  {source: "Apple", target: "Motorola"},
  {source: "Microsoft", target: "Motorola"},
  {source: "Motorola", target: "Microsoft"},
  {source: "Kodak", target: "Samsung"},
  {source: "Apple", target: "Samsung"},
  {source: "Kodak", target: "RIM"},
  {source: "Nokia", target: "Qualcomm"}
];

var nodes = {};

// Compute the distinct nodes from the links.
links.forEach(function(link) {
  link.source = nodes[link.source] || (nodes[link.source] = {name: link.source});
  link.target = nodes[link.target] || (nodes[link.target] = {name: link.target});
});


var width = container_element.width(),
    height = 500;

var force = d3.layout.force()
    .nodes(d3.values(nodes))
    .links(links)
    .size([width, height])
    .linkDistance(60)
    .charge(-300)
	.gravity(0)
    .on("tick", tick)
    .start();

var svg = d3.select("#" + container_element_id).append("svg")
    .attr("width", width)
    .attr("height", height);

var link = svg.selectAll(".link")
    .data(force.links())
  .enter().append("line")
    .attr("class", "link");

var node = svg.selectAll(".node")
    .data(force.nodes())
  .enter().append("g")
    .attr("class", "node")
    .call(force.drag);

node.append("circle")
    .attr("r", 8);

node.append("text")
    .attr("x", 12)
    .attr("dy", ".35em")
    .text(function(d) { return d.name; });

function tick() {
  link
      .attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });

  node
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
}

}