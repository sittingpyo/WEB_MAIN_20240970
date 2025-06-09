// map.js - 카카오 지도 연동
var container = document.getElementById('map');
var options = {
  center: new kakao.maps.LatLng(37.5665, 126.9780), // 서울 시청 기준
  level: 3
};

var map = new kakao.maps.Map(container, options);

// 지도 타입 컨트롤
var mapTypeControl = new kakao.maps.MapTypeControl();
map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

// 줌 컨트롤
var zoomControl = new kakao.maps.ZoomControl();
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

// 마커 생성 및 초기 위치
var markerPosition = new kakao.maps.LatLng(37.5665, 126.9780);
var marker = new kakao.maps.Marker({
  position: markerPosition
});
marker.setMap(map);

// 지도 클릭 이벤트
kakao.maps.event.addListener(map, 'click', function(mouseEvent) {
  var latlng = mouseEvent.latLng;
  marker.setPosition(latlng);

  var message = '클릭한 위치의 위도는 ' + latlng.getLat() + ' 이고, ';
  message += '경도는 ' + latlng.getLng() + ' 입니다';
  var resultDiv = document.getElementById('clickLatlng');
  resultDiv.innerHTML = message;
});
