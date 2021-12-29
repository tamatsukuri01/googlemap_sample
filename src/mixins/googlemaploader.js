export const GoogleMapLoad = {
  data() {
    return {
      map:'',
      geocoder:'',
      mainMappin:'',
      endMappin:'',
      position:'',
      directionsRenderer:'',
      directionsService:'',
      distanceMatrixService:''
    }
  },
  mounted() {
    let timer = setInterval(() => {
      if(window.google) {
        clearInterval(timer);
        this.initMap()
      }
    },500)
    
  },
  methods: {
    //マップ初期化
    initMap() {
      let latLng =new window.google.maps.LatLng(this.lat,this.lng)
      this.map = new window.google.maps.Map(this.$refs.map, {
        center: new window.google.maps.LatLng(latLng),
        zoom: 18,
        disableDoubleClickZoom: true
      });
      this.initMapPin(latLng)
      this.setMapMethod()
      this.searchMainLatLng(this.mainMappin.position.lat(),this.mainMappin.position.lng())
      this.map.addListener('dblclick',(e)=>{
        return this.clickOnMap(e);
      });
      this.mainMappin.addListener('dragend',(mapPinsMouseEvent)=>{
        return this.dragEndMainMapPin(mapPinsMouseEvent);
      });
    },

    //マップメソッド定義
    setMapMethod() {
      this.geocoder = new window.google.maps.Geocoder();
      this.directionsService = new window.google.maps.DirectionsService();
      this.directionsRenderer = new window.google.maps.DirectionsRenderer();
      this.directionsRenderer.setMap(this.map); 
      this.distanceMatrixService = new window.google.maps.DistanceMatrixService();
    },
    //2地点のルート取得
    getRoute() {
      let start = new window.google.maps.LatLng(this.lat,this.lng)
      let end = new window.google.maps.LatLng(this.destinationLat,this.destinationLng)
      var request = {
        origin: start,   
        destination: end, 
        travelMode: 'WALKING'
      };
      this.directionsService.route(request, (result, status)=> {
        if (status === 'OK') {
          this.distance = result.routes[0].legs[0].distance.value + 'm'
          this.time = result.routes[0].legs[0].duration.text
          this.directionsRenderer.setOptions({
            suppressMarkers:true
          })
          this.directionsRenderer.setDirections(result);
        }else{
          alert("取得できませんでした：" + status);
        }
      });
    },
    //メインのマップピン生成
    initMapPin(letLng) {
      this.mainMappin = new window.google.maps.Marker({
        position:letLng,
        map:this.map,
        draggable: true,
        animation: window.google.maps.Animation.DROP,
        title:'代表',
      })
    },
    //代表ピンドラッグエンド時
    dragEndMainMapPin(e) {
      // console.log(e)
      this.lat = e.latLng.lat()
      this.lng = e.latLng.lng()
      if(typeof this.endMapPin != "undefined") {
        this.getRoute()
      }
      this.searchMainLatLng(this.lat,this.lng)
      
    },
    //マップピン生成
    addMapPin(e) {
      this.endMapPin = new window.google.maps.Marker({
        position:e.latLng,
        map:this.map,
        draggable: true,
        animation: window.google.maps.Animation.DROP,
        // icon: 'https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|6CB733'
      })
      this.endMapPin.addListener('dragend',(e)=>{
        return this.dragEndaddMapPin(e);
      });
      this.searchLatLng(e.latLng.lat(),e.latLng.lng())
    },
    
    dragEndaddMapPin(e) {
      this.destinationLat = e.latLng.lat()
      this.destinationLng = e.latLng.lng()
      this.searchLatLng(this.destinationLat,this.destinationLng)
      this.getRoute()
    },
    //マップクリック時発火
    clickOnMap(e){
      this.destinationLat = e.latLng.lat()
      this.destinationLng = e.latLng.lng()
      if(typeof this.endMapPin != "undefined") {
        this.endMapPin.setPosition(e.latLng)
      } else {
        this.addMapPin(e)
      }
      this.searchLatLng(this.destinationLat,this.destinationLng)
      this.getRoute()
    },
    //住所から検索
    searchAddress() {
      this.geocoder.geocode({
        'address': this.address,
        'language':'ja',
        'region':'JP'
      }, (results, status) => {
        if (status === window.google.maps.GeocoderStatus.OK) {
          this.map.panTo(results[0].geometry.location);
          this.mainMappin.setPosition(results[0].geometry.location)
          this.lat = results[0].geometry.location.lat();
          this.lng = results[0].geometry.location.lng();
          this.searchMainLatLng(this.lat,this.lng) 
        } else {
          alert("取得できませんでした：" + status);
        }
      })
    },

    //施設名から検索
    searchPlace() {
      this.geocoder.geocode({
        'address': this.place,
        'language':'ja',
        'region':'JP'
      }, (results, status) => {
        if (status === window.google.maps.GeocoderStatus.OK) {
          this.map.panTo(results[0].geometry.location);
          this.mainMappin.setPosition(results[0].geometry.location)
          this.address = results[0].formatted_address.replace('日本、', '');
          // console.log(results)
          this.lat = results[0].geometry.location.lat();
          this.lng = results[0].geometry.location.lng();
        } else {
          alert("取得できませんでした：" + status);
        }
      })
    },
    //代表情報緯度経度から住所
    searchMainLatLng(lat,lng) {
      this.geocoder.geocode({
        'location': {lat:lat,lng:lng},
        'language':'ja',
        'region':'JP'
      }, (results, status) => {
        if (status === window.google.maps.GeocoderStatus.OK) {
          this.map.setCenter(results[0].geometry.location);
          // console.log(results)
          this.address = results[0].formatted_address.replace('日本、', '');
        } else {
          alert("取得できませんでした：" + status);
        }
      })
    },
    //緯度経度から検索
    searchLatLng(lat,lng) {
      this.geocoder.geocode({
        'location': {lat:lat,lng:lng},
        'language':'ja',
        'region':'JP'
      }, (results, status) => {
        if (status === window.google.maps.GeocoderStatus.OK) {
          // this.map.setCenter(results[0].geometry.location);
          // console.log(results)
          this.destinationAddress = results[0].formatted_address.replace('日本、', '');
        } else {
          alert("取得できませんでした：" + status);
        }
      })
    }
  },
  
}