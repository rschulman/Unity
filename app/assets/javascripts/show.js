$(document).ready(function() {
	var canvas = $('#systemMap');
	var context = canvas.get(0).getContext('2d');
	var scalar = 9000000;
	
	var system = GetSystem( current_sys );
	
	system.done(function(system_data, status, xhr) {
		$(system_data).find("planet").each(function() {
			console.log($(this).find("name").text());
		});
//		DrawSystem(system_data, context, scalar);
	});
	system.fail(function(data_return, status, error){
		alert("Failed! " + error + " " + status);
	});
});


function GetSystem( current_sys ) {
	var deferred = $.Deferred();
	var promise = deferred.promise();
	
	var jqhxr = $.ajax({
		type: "GET",
		url: "/systems/" + current_sys,
		dataType: "xml",
		contentType: "text/xml"
	});
	
	jqhxr.done(function(data, status, xhr){
		deferred.resolve(data, status, xhr);
	});
	
	jqhxr.fail(function(data_return, status, error){
		deferred.reject(data_return, status, error);
	});
	
	return promise;
}
	
	
	
	
	
	
	

	
/*
	var planetX = 0;
	var planetY = 0;
	var planetAngle = 0;
	var planetName = "";

	canvas.attr("width", $(window).get(0).innerWidth);
	canvas.attr("height",$(window).get(0).innerHeight - 100);

	// Set font size.
	context.font = "15px serif"

	// Draw the center sun.
context.beginPath();
context.arc(canvas.width()/2,canvas.height()/2,5,Math.PI*2,false);
context.closePath();
context.fillStyle = "rgb(255,215,0)";
context.fill();
context.strokeStyle = "rgb(255,255,255)";
context.beginPath();
context.arc(canvas.width()/2,canvas.height()/2,6,Math.PI*2,false);
context.closePath();
context.stroke();

// Draw orbits and planets.
<% this_star = @our_game.systems.find_by_name("Sol").stars.find_by_name("A") %>
<% this_star.planets.each do |planet| %>
	context.strokeStyle = "rgb(224,255,255)";
	context.beginPath();
	context.arc(canvas.width()/2,canvas.height()/2,<%= planet.smaxis %>/scalar,Math.PI*2,false);
	context.closePath();
	context.stroke();
	
	planetAngle = <%= planet.mean_anomoly + ((@our_game.game_date - @our_game.epoch_date).to_i * Math.sqrt((6.673e-11*(planet.mass + (this_star.mass * 1e20)))/ ((planet.smaxis * 1000) ** 3))) + planet.arg_peri %> % (Math.PI * 2);
	planetX = canvas.width()/2 + ((<%= planet.smaxis %>/scalar) * Math.cos(planetAngle));
	planetY = canvas.height()/2 + ((<%= planet.smaxis %>/scalar) * Math.sin(planetAngle));
	
	context.beginPath();
	context.arc(planetX,planetY,5,Math.PI*2,false);
	context.closePath();
	context.fillStyle = "rgb(205,133,63)";
	context.fill();
	context.strokeStyle = "rgb(255,255,255)";
	context.beginPath();
	context.arc(planetX,planetY,6,Math.PI*2,false);
	context.closePath();
	context.stroke();
	context.fillStyle = "rgb(255,255,255)";
	context.fillText("<%= planet.name %>", planetX + 10, planetY);
<% end %>
})
*/