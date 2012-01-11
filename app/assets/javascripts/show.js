$(document).ready(function() {
	var canvas = $('#systemMap');
	var context = canvas.get(0).getContext('2d');
	var scalar = 9000000;
	
	canvas.attr("width", $(window).get(0).innerWidth);
	canvas.attr("height",$(window).get(0).innerHeight - 100);
	
	var system = GetSystem( current_sys );
	
	system.done(function(system_data, status, xhr) {
		DrawSystem(system_data, context, canvas, scalar);
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

function DrawSystem(system_data, context, canvas, scalar){
	var planetX = 0;
	var planetY = 0;
	var planetAngle = 0;
	var epoch_diff = parseFloat($(system_data).find("epoch_diff").text());
	
	console.log(system_data);
	console.log(epoch_diff);
	


	// Set font size.
	context.font = "15px serif"
	
	// Draw the stars, and planets for each star.
	$(system_data).find("star").each(function() {
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
		
		var starmass = parseFloat($(this).find("starmass").text());
		
		$(this).find("planet").each(function() {
			var mean = parseFloat($(this).find("mean_anomoly").text());
			var mass = parseFloat($(this).find("mass").text());
			var smaxis = parseFloat($(this).find("smaxis").text());
			var arg_peri = parseFloat($(this).find("arg_peri").text());
			console.log(mass);
			
			context.strokeStyle = "rgb(224,255,255)";
			context.beginPath();
			context.arc(canvas.width()/2,canvas.height()/2, smaxis/scalar,Math.PI*2,false);
			context.closePath();
			context.stroke();

			planetAngle = (mean + arg_peri + (epoch_diff * Math.sqrt((6.673e-11 * (mass + (starmass * 1e+20)))/Math.pow((smaxis * 1000), 3)))) % (Math.PI * 2);
			//planetAngle = <%= planet.mean_anomoly + ((@our_game.game_date - @our_game.epoch_date).to_i * Math.sqrt((6.673e-11*(planet.mass + (this_star.mass * 1e20)))/ ((planet.smaxis * 1000) ** 3))) + planet.arg_peri %> % (Math.PI * 2);
			//console.log(planetAngle);
			planetX = canvas.width()/2 + ((smaxis/scalar) * Math.cos(planetAngle));
			planetY = canvas.height()/2 + ((smaxis/scalar) * Math.sin(planetAngle));
			
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
			context.fillText($(this).find("name").text(), planetX + 10, planetY);
		});
	});
}