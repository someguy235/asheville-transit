var center;
var map = null;
selDay = null;
selNgt = null;

var kml_dict = {};
kml_dict["week-day-route-1"] = new google.maps.KmlLayer('http://www.ethanshepherd.com/transit/kml/r1.week.day.kml');
kml_dict["week-day-route-2"] = new google.maps.KmlLayer('http://www.ethanshepherd.com/transit/kml/r2.week.day.kml');
kml_dict["week-day-route-4"] = new google.maps.KmlLayer('http://www.ethanshepherd.com/transit/kml/r4.week.day.kml');
kml_dict["week-day-route-5"] = new google.maps.KmlLayer('http://www.ethanshepherd.com/transit/kml/r5.week.day.kml');
kml_dict["week-day-route-6"] = new google.maps.KmlLayer('http://www.ethanshepherd.com/transit/kml/r6.week.day.kml');
kml_dict["week-day-route-8"] = new google.maps.KmlLayer('http://www.ethanshepherd.com/transit/kml/r8.week.day.kml');
kml_dict["week-day-route-9"] = new google.maps.KmlLayer('http://www.ethanshepherd.com/transit/kml/r9.week.day.kml');
kml_dict["week-day-route-11"] = new google.maps.KmlLayer('http://www.ethanshepherd.com/transit/kml/r11.week.day.kml');
kml_dict["week-day-route-12"] = new google.maps.KmlLayer('http://www.ethanshepherd.com/transit/kml/r12.week.day.kml');
kml_dict["week-day-route-13"] = new google.maps.KmlLayer('http://www.ethanshepherd.com/transit/kml/r13.week.day.kml');
kml_dict["week-day-route-15"] = new google.maps.KmlLayer('http://www.ethanshepherd.com/transit/kml/r15.week.day.kml');
kml_dict["week-day-route-16"] = new google.maps.KmlLayer('http://www.ethanshepherd.com/transit/kml/r16.week.day.kml');
kml_dict["week-day-route-18"] = new google.maps.KmlLayer('http://www.ethanshepherd.com/transit/kml/r18.week.day.kml');
kml_dict["week-day-route-26"] = new google.maps.KmlLayer('http://www.ethanshepherd.com/transit/kml/r26.week.day.kml');
kml_dict["week-ngt-route-36"] = new google.maps.KmlLayer('http://www.ethanshepherd.com/transit/kml/r36.week.ngt.kml');
kml_dict["week-ngt-route-38"] = new google.maps.KmlLayer('http://www.ethanshepherd.com/transit/kml/r38.week.ngt.kml');
kml_dict["week-ngt-route-41"] = new google.maps.KmlLayer('http://www.ethanshepherd.com/transit/kml/r41.week.ngt.kml');
kml_dict["week-ngt-route-46"] = new google.maps.KmlLayer('http://www.ethanshepherd.com/transit/kml/r46.week.ngt.kml');
kml_dict["week-ngt-route-51"] = new google.maps.KmlLayer('http://www.ethanshepherd.com/transit/kml/r51.week.ngt.kml');
kml_dict["week-ngt-route-52"] = new google.maps.KmlLayer('http://www.ethanshepherd.com/transit/kml/r52.week.ngt.kml');
kml_dict["week-day-route-170"] = new google.maps.KmlLayer('http://www.ethanshepherd.com/transit/kml/r170.week.day.kml');
transit_center_day_map = new google.maps.KmlLayer('http://www.ethanshepherd.com/transit/kml/transit.center.day.kml');
tc_day_arrive_map = new google.maps.KmlLayer('http://www.ethanshepherd.com/transit/kml/tc.day.arrive.kml');
tc_day_depart_map = new google.maps.KmlLayer('http://www.ethanshepherd.com/transit/kml/tc.day.depart.kml');

function initialize(){
  resizeMap();
  if(navigator.geolocation){
    //detectBrowser();
    navigator.geolocation.getCurrentPosition(
      //success callback
      function(position){
        newMap(position.coords.latitude, position.coords.longitude);
      },
      //error callback, usually because user declines geolocation
      function(){
        newMap(35.592793,-82.555710);
      }
    );
  }else{ //user doesn't have geolocation
    //detectBrowser();
    newMap(35.592793,-82.555710);
  }
  setRoutes("week-day");
};

function newMap(lat,lng){
  center = new google.maps.LatLng(lat,lng);
  var myOptions = {
    center: center,
    zoom: 14,
    mapTypeId: google.maps.MapTypeId.TERRAIN
  };
  map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
  addRoutes("week-day-all-routes");
  //addRoutes("route-2");
};

function addRoutes(routes){
  // remove all route placemarks from the map
  $.each(kml_dict, function(index, route){
    route.setMap(null);
  });

  // place the correct day or night arrive/depart placemarks at the tc
  //TODO:check if the placemarks need to be switched, probably not very common
  if(routes.indexOf("day") != -1){
    //this is a day route, remove the night tc arrive/depart placemarks
    //TODO: don't have these placemarks yet
    //tc_ngt_arrive_map.setMap(map);
    //tc_ngt_depart_map.setMap(map);
    //...and add the day arrive/depart placemarks
    tc_day_arrive_map.setMap(map);
    tc_day_depart_map.setMap(map);
  }else{
    //this is a night route, remove the day tc arrive/depart placemarks...
    tc_day_arrive_map.setMap(null);
    tc_day_depart_map.setMap(null);
    //...and add the night arrive/depart placemarks
    //TODO: don't have these placemarks yet
    //tc_ngt_arrive_map.setMap(map);
    //tc_ngt_depart_map.setMap(map);
  }

  // add either all the day routes...
  if(routes==="week-day-all-routes"){
    $.each(kml_dict, function(index, route){
      if(index.indexOf("day") != -1){
        route.setMap(map);
      }
    });
  // ...or all the night routes...
  }else if(routes==="week-ngt-all-routes"){
    $.each(kml_dict, function(index, route){
      if(index.indexOf("ngt") != -1){
        route.setMap(map);
      }
    });
  // ...or just a single route
  }else{
    kml_dict[routes].setMap(map);
  }
//  transit_center_day_map.setMap(map);
  //TODO: this doesn't work
  map.setCenter(center);
};

function setRoutes(times){
  //TODO: actually change the route on the map (maybe), and set the text shown on the select box (maybe)
  //TODO: currently cannot select 'all routes' after switching from day to night, setting map would solve this.
  switch(times){
    case 'week-day':
      $('#routes').html("\
      <option value='week-day-all-routes'>all routes</option>\
      <option value='week-day-route-1'>route 1</option>\
      <option value='week-day-route-2'>route 2</option>\
      <option value='week-day-route-4'>route 4</option>\
      <option value='week-day-route-5'>route 5</option>\
      <option value='week-day-route-6'>route 6</option>\
      <option value='week-day-route-8'>route 8</option>\
      <option value='week-day-route-9'>route 9</option>\
      <option value='week-day-route-11'>route 11</option>\
      <option value='week-day-route-12'>route 12</option>\
      <option value='week-day-route-13'>route 13</option>\
      <option value='week-day-route-15'>route 15</option>\
      <option value='week-day-route-16'>route 16</option>\
      <option value='week-day-route-18'>route 18</option>\
      <option value='week-day-route-26'>route 26</option>\
      <option value='week-day-route-170'>route 170</option>\
      ");
      break;
    case 'week-ngt':
      $('#routes').html("\
      <option value='week-ngt-all-routes'>all routes</option>\
      <option value='week-ngt-route-36'>route 36</option>\
      <option value='week-ngt-route-38'>route 38</option>\
      <option value='week-ngt-route-41'>route 41</option>\
      <option value='week-ngt-route-46'>route 46</option>\
      <option value='week-ngt-route-51'>route 51</option>\
      <option value='week-ngt-route-52'>route 52</option>\
      ");
      break;
  }
};

function resizeMap(){
  $('#map_canvas').height($(window).height()-($('#navbar').height()+2));
};

function detectBrowser(){
  var useragent = navigator.userAgent;
  var mapdivMap = document.getElementById("map_canvas");
  if(useragent.indexOf('iPhone')!= -1 || useragent.indexOf('Android')!= -1){
    mapdivMap.style.width = '100%';
    mapdivMap.style.height = '100%';
  }else{
    mapdivMap.style.width = '600px';
    mapdivMap.style.height = '800px';
  }
};

