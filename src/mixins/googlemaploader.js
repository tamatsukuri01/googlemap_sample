export const GoogleMapLoad = {
  data() {
    return {
      map:'',
      latLng: {lat: 35.6905696, lng: 139.690472},
      geocoder:'',
      mainMappin:'',
      addMappin:[],
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
        // console.log(window.google)
      }
    },500)
    
  },
  methods: {
    //マップ初期化
    initMap() {
      let latLng =new window.google.maps.LatLng(this.lat,this.lng)
      this.map = new window.google.maps.Map(this.$refs.map, {
        center: new window.google.maps.LatLng(latLng),
        zoom: 17,
        
      });
      this.initMapPin(latLng)
      this.setMapMethod()
      this.map.addListener('dblclick',(mapsMouseEvent)=>{
        return this.clickOnMap(mapsMouseEvent);
      });
      this.mainMappin.addListener('dragend',(mapPinsMouseEvent)=>{
        return this.dragEndMainMapPin(mapPinsMouseEvent);
      });
      
    },

    setMapMethod() {
       //ジオコーディング用の変数定義
      this.geocoder = new window.google.maps.Geocoder();

      this.directionsService = new window.google.maps.DirectionsService();
      //DirectionsRenderer のオブジェクトを生成
      this.directionsRenderer = new window.google.maps.DirectionsRenderer();
      //directionsRenderer と地図を紐付け
      this.directionsRenderer.setMap(this.map); 
      this.distanceMatrixService = new window.google.maps.DistanceMatrixService();
    },

    getRoute() {
      var start = new window.google.maps.LatLng(this.mainMappin.position.lat(),this.mainMappin.position.lng());  
      //リクエストの終着点の位置（Grand Central Station 到着地点の緯度経度）
      var end = new window.google.maps.LatLng(this.addMappin.position.lat(),this.addMappin.position.lng());  
      
      console.log(start)
      console.log(end)
      // ルートを取得するリクエスト
      var request = {
        origin: start,      // 出発地点の緯度経度
        destination: end,   // 到着地点の緯度経度
        travelMode: 'WALKING' //トラベルモード（歩き）
      };
      //DirectionsService のオブジェクトのメソッド route() にリクエストを渡し、
      //コールバック関数で結果を setDirections(result) で directionsRenderer にセットして表示
      this.directionsService.route(request, (result, status)=> {
        // console.log(result)
        //ステータスがOKの場合、
        if (status === 'OK') {
          this.directionsRenderer.setDirections(result); //取得したルート（結果：result）をセット
        }else{
          alert("取得できませんでした：" + status);
        }
      });
      this.getDistance(start,end)
    },
    getDistance(start,end) {
      let re = {
        origins:[start] ,
        destinations:[end],
        travelMode: 'WALKING',
      }
      console.log("test")
      this.distanceMatrixService.getDistanceMatrix(re, (result, status)=> {
        // console.log(result)
        //ステータスがOKの場合、
        if (status === 'OK') {
          console.log(result); 
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
    dragEndMainMapPin(mapPinEvent) {
      this.lat = mapPinEvent.latLng.lat()
      this.lng = mapPinEvent.latLng.lng()
      this.searchMainLatLng(this.mainMappin.position.lat(),this.mainMappin.position.lng())
    },
    //マップピン生成
    addMapPin(latLng) {
      this.addMappin = new window.google.maps.Marker({
        position:latLng,
        map:this.map,
        draggable: true,
        animation: window.google.maps.Animation.DROP,
        // icon: 'https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|6CB733'
      })
      this.addMappin.addListener('dragend',(mapPinsMouseEvent)=>{
        return this.dragEndaddMapPin(mapPinsMouseEvent);
      });
      this.getRoute()
      this.searchLatLng(this.addMappin.position.lat(),this.addMappin.position.lng())
    },
    dragEndaddMapPin(mapPinEvent) {
      // console.log(mapPinEvent)
      this.destinationLat = mapPinEvent.latLng.lat()
      this.destinationLng = mapPinEvent.latLng.lng()
      this.getRoute()
      this.searchLatLng(this.addMappin.position.lat(),this.addMappin.position.lng())
    },
    //マップクリック時発火
    clickOnMap(mapEvent){
      if(this.addMappin.length !== 0) {
        this.addMappin.setMap(null)
      }
      // console.log(mapEvent)
      this.destinationLat = mapEvent.latLng.lat()
      this.destinationLng = mapEvent.latLng.lng()
      this.addMapPin(mapEvent.latLng)
    },
    //住所から検索
    searchAddress() {
      this.geocoder.geocode({
        'address': this.address
      }, (results, status) => {
        if (status === window.google.maps.GeocoderStatus.OK) {
          this.map.panTo(results[0].geometry.location);
          this.mainMappin.setMap(null)
          this.initMapPin(results[0].geometry.location)
          
          // console.log(results)
          this.lat = results[0].geometry.location.lat();
          this.lng = results[0].geometry.location.lng();
        }
      })
    },
    //代表情報緯度経度から住所
    searchMainLatLng(lat,lng) {
      this.geocoder.geocode({
        'location': {lat:Number(lat),lng:Number(lng)}
      }, (results, status) => {
        if (status === window.google.maps.GeocoderStatus.OK) {
          this.map.setCenter(results[0].geometry.location);
          console.log(results)
          this.address = results[0].formatted_address;
          // this.mainMappin.setMap(results[0].geometry.location)
          // this.destinationAddress = results[0].formatted_address;
        }
      })
    },
    //緯度経度から検索
    searchLatLng(lat,lng) {
      // let lat = this.lat
      // let lng = this.lng
      this.geocoder.geocode({
        'location': {lat:Number(lat),lng:Number(lng)}
      }, (results, status) => {
        if (status === window.google.maps.GeocoderStatus.OK) {
          this.map.setCenter(results[0].geometry.location);
          console.log(results)
          // this.address = results[0].formatted_address;
          // this.mainMappin.setMap(results[0].geometry.location)
          this.destinationAddress = results[0].formatted_address;
          // this.lat = results[0].geometry.location.lat();
          // this.lng = results[0].geometry.location.lng();
          // if(this.addMappin.length !== 0) {
          //   this.addMappin.setMap(null)
          // }
          // this.addMapPin(results[0].geometry.location)
        }
      })
    }
  },
  
}