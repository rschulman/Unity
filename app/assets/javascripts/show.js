$(document).ready(function() {
	var canvas = $('#systemMap');
	var context = canvas.get(0).getContext('2d');
	var scalar = 7000000;
	
	canvas.attr("width", $(window).get(0).innerWidth);
	canvas.attr("height",$(window).get(0).innerHeight);
	
	trackTransforms(context);
	
	var system = GetSystem( current_sys );
	var current_data;
	
	system.done(function(system_data, status, xhr) {
		current_data = system_data;
		DrawSystem(system_data, context, canvas, scalar);
	});
	system.fail(function(data_return, status, error){
		alert("Failed! " + error + " " + status);
	});
	
	var lastX=canvas.width/2, lastY=canvas.height/2;
	var dragStart,dragged;
	canvas.mousedown(function(evt){
		document.body.style.mozUserSelect = document.body.style.webkitUserSelect = document.body.style.userSelect = 'none';
		lastX = evt.offsetX || (evt.pageX - canvas.offsetLeft);
		lastY = evt.offsetY || (evt.pageY - canvas.offsetTop);
		dragStart = context.transformedPoint(lastX,lastY);
		dragged = false;
	});
	canvas.mousemove(function(evt){
		lastX = evt.offsetX || (evt.pageX - canvas.offsetLeft);
		lastY = evt.offsetY || (evt.pageY - canvas.offsetTop);
		dragged = true;
		if (dragStart){
			var pt = context.transformedPoint(lastX,lastY);
			context.translate(pt.x-dragStart.x,pt.y-dragStart.y);
			DrawSystem(current_data, context, canvas, scalar);
		}
	});
	canvas.mouseup(function(evt){
		dragStart = null;
		if (!dragged) zoom(evt.shiftKey ? 1 : -1 );
	});

	var scaleFactor = 1.1;
	var zoom = function(clicks){
		var pt = context.transformedPoint(lastX,lastY);
		context.translate(pt.x,pt.y);
		var factor = Math.pow(scaleFactor,clicks);
		//context.scale(factor,factor);
		scalar = scalar * factor;
		context.translate(-pt.x,-pt.y);
		DrawSystem(current_data, context, canvas, scalar);
	}

	canvas.mousewheel(function(evt, delta, deltaX, deltaY) {
		//var delta = evt.Delta ? evt.Delta/40 : evt.detail ? -evt.detail : 0;
		if (delta) zoom(-delta);
		return evt.preventDefault() && false;
	});
	//canvas.addEventListener('DOMMouseScroll',handleScroll,false);
			
});

// Adds ctx.getTransform() - returns an SVGMatrix
// Adds ctx.transformedPoint(x,y) - returns an SVGPoint
function trackTransforms(ctx){
	var svg = document.createElementNS("http://www.w3.org/2000/svg",'svg');
	var xform = svg.createSVGMatrix();
	ctx.getTransform = function(){ return xform; };
	
	var savedTransforms = [];
	var save = ctx.save;
	ctx.save = function(){
		savedTransforms.push(xform.translate(0,0));
		return save.call(ctx);
	};
	var restore = ctx.restore;
	ctx.restore = function(){
		xform = savedTransforms.pop();
		return restore.call(ctx);
	};

	var scale = ctx.scale;
	ctx.scale = function(sx,sy){
		xform = xform.scaleNonUniform(sx,sy);
		return scale.call(ctx,sx,sy);
	};
	var rotate = ctx.rotate;
	ctx.rotate = function(radians){
		xform = xform.rotate(radians*180/Math.PI);
		return rotate.call(ctx,radians);
	};
	var translate = ctx.translate;
	ctx.translate = function(dx,dy){
		xform = xform.translate(dx,dy);
		return translate.call(ctx,dx,dy);
	};
	var transform = ctx.transform;
	ctx.transform = function(a,b,c,d,e,f){
		var m2 = svg.createSVGMatrix();
		m2.a=a; m2.b=b; m2.c=c; m2.d=d; m2.e=e; m2.f=f;
		xform = xform.multiply(m2);
		return transform.call(ctx,a,b,c,d,e,f);
	};
	var setTransform = ctx.setTransform;
	ctx.setTransform = function(a,b,c,d,e,f){
		xform.a = a;
		xform.b = b;
		xform.c = c;
		xform.d = d;
		xform.e = e;
		xform.f = f;
		return setTransform.call(ctx,a,b,c,d,e,f);
	};
	var pt  = svg.createSVGPoint();
	ctx.transformedPoint = function(x,y){
		pt.x=x; pt.y=y;
		return pt.matrixTransform(xform.inverse());
	};
}

function GetSystem( current_sys ) {
	var deferred = $.Deferred();
	var promise = deferred.promise();
	
	var jqhxr = $.ajax({
		type: "GET",
		url: "/systems/" + current_sys,
		dataType: "xml",
		contentType: "text/xml"
	});
	
	jqhxr.done(function(data, status, xhr) {
		deferred.resolve(data, status, xhr);
	});
	
	jqhxr.fail(function(data_return, status, error) {
		deferred.reject(data_return, status, error);
	});
	
	return promise;
}

function DrawSystem(system_data, context, canvas, scalar) {
	var planetX = 0;
	var planetY = 0;
	var planetAngle = 0;
	var epoch_diff = parseFloat($(system_data).find("epoch_diff").text());
	
	context.save();
	context.setTransform(1, 0, 0, 1, 0, 0);
	context.clearRect(0, 0, canvas.width(), canvas.height());
	context.restore();
	
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
			
			context.strokeStyle = "rgb(224,255,255)";
			context.beginPath();
			context.arc(canvas.width()/2,canvas.height()/2, smaxis/scalar,Math.PI*2,false);
			context.closePath();
			context.stroke();

			planetAngle = (mean + arg_peri + (epoch_diff * Math.sqrt((6.673e-11 * (mass + (starmass * 1e+20)))/Math.pow((smaxis * 1000), 3)))) % (Math.PI * 2);
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