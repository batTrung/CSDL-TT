$(function(){

	//==========================================================//
	//							Cài đặt			   				//
	//==========================================================//
	
	L.MakiMarkers.accessToken = "pk.eyJ1IjoidHJ1bmdiYXQiLCJhIjoiY2ptdWllZTY4MDlhNjNwcGtqY2FjaGtkeCJ9.F51_3qvVuNyo_C17deJb5A"

	var map = L.map('map').setView([20.9894757,105.8523328], 14);

	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
	// Map
	var results = L.layerGroup().addTo(map);
	
	//Thanh tim kiem
	var searchControl = L.esri.Geocoding.geosearch().addTo(map);
	
	// icon
	var myIcon = L.MakiMarkers.icon({icon: "rocket",
									color: "#ff4b4b",
									size: "3"});
	var homIcon = L.MakiMarkers.icon({icon: "town-hall",
									color: "#3c7be2",
									size: "3"});
	var resultIcon = L.MakiMarkers.icon({icon: "town-hall",
									color: "#f8d73d",
									size: "3"});

	var latlng = {lat: 20.9894757, lng: 105.8523328} // latlng cố định

	// tinnh toan
	var points ;
	var mylocation;
	var k;
	//==========================================================//
	//							Search : Đến và Đi				//
	//==========================================================//

	searchControl.on('results', function(data){
	    results.clearLayers();
	    for (var i = data.results.length - 1; i >= 0; i--) {

	       	var m1 = L.marker(data.results[i].latlng, {draggable:true, icon:myIcon})
	       	results.addLayer(m1);
			m1.on('drag', function(e){
	        	  mylocation  = e.latlng;
	        })
	        var addr = data.results[i].text;
	        $('#myloca').val(addr);
	        mylocation = data.results[i].latlng
	    }
  	});
	$('#map').on('click','.geocoder-control-input', function(){
		map.setView([latlng.lat,latlng.lng], 13);

	});

	// Tìm vị trí hiện tại

	$('#findloca').on('click', function(){
    	map.on('locationfound', onLocationFound);
    	map.on('locationerror', onLocationError);
		map.locate({setView: true, maxZoom: 16});
	});

    function onLocationFound(e) {
	     var radius = e.accuracy / 2;
	     var location = e.latlng;
	     map.setView(location,15);
	     var mk = L.marker(location, {icon:myIcon, draggable:true}).addTo(map)
	     mylocation = e.latlng
       	 mk.on('drag', function(e){
       	 	mylocation = e.latlng;
       	})
    };

	function onLocationError(e) {
         alert('Bạn phải kích hoạt vị trí cho ứng dụng');
    };

    $('#myloca').on('click', function(){
    	$('.geocoder-control-input').click();
    })

	//==========================================================//
	//					upload File  		  					//
	//==========================================================//
	var hostname = location.protocol+'//'+location.hostname +':'+location.port	
	var markers = new L.FeatureGroup();
	$("#js-upload").click(function () {
    	$("#fileupload").click();
  	});

	$("#fileupload").fileupload({
	    url: $("#fileupload").attr('data-url'),
	    dataType: 'json',
	    beforeSend: function(){
	    	$('#submit').addClass('is-loading');
	    },
	    done: function (e, data) {
	      if (data.result.is_valid) {
	      	$('#show-file').html(data.result.name)
	        $('#submit').removeClass('is-loading');
	       	points = JSON.parse(data.result.data)
	       	for (var i in points) {
			    var latlng = L.latLng({ lat: points[i].lat, lng: points[i].lng });
			    var marker = L.marker( latlng,{draggable:false, icon:homIcon});
				markers.addLayer(marker);
			}
			map.addLayer(markers);
	      }
	    }
	});

	//==========================================================//
	//					Tính toán	  		  					//
	//==========================================================//

	$("#submit").click(function(){
		$this = $(this);
		markers.clearLayers();
		$.ajax({
			url: $this.attr("data-url"),
			type:'get',
			dataType: 'json',
			data: {
				lat: mylocation.lat,
				lng: mylocation.lng,
				k: $('#k').val()
			},
			success: function(data){
				var points = data.result;
				for (var i in points) {
			    	var latlng = L.latLng({ lat: points[i].lat, lng: points[i].lng });
			    	L.marker( latlng,{draggable:false, icon:homIcon}).addTo(map);
				}
			}
		})
	});

});