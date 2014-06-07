function render_burndown_chart(interface_control) {
	container_element = interface_control.get_container();
	
	container_element.html(
		"<img id='cap' src='images/caps/burndown-chart.png' />"
	);
}
