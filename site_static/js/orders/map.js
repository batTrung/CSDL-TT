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
	var latlng = {lat: 20.9894757, lng: 105.8523328} // latlng cố định
	var addr= ''; // Địa chỉ tìm kiếm

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

        mk.on('drag', function(e){
        
       	})
    };

	function onLocationError(e) {
         alert('Bạn phải kích hoạt vị trí cho ứng dụng');
    };

	//==========================================================//
	//							Search : Đến và Đi				//
	//==========================================================//

	var setLoca = function(e){
		console.log(e)
		$('.geocoder-control-input').click();
		addr = '';
		var id = '#'+e.target.id;

		searchControl.on('results', function(data){
		    results.clearLayers();
		    for (var i = data.results.length - 1; i >= 0; i--) {

		       var m1 = L.marker(data.results[i].latlng,
		       					{draggable:true, icon:myIcon})
		       results.addLayer(m1);
		       latlng  = data.results[i].latlng;
		       addr = data.results[i].text;
		       $(id).val(addr);

		    }
		});
		$('#map').on('click','.geocoder-control-input', function(){
			map.setView([latlng.lat,latlng.lng], 13);

		});

	};

	$('#myloca').on('click', setLoca);
	$('#to').on('click', setLoca);



});