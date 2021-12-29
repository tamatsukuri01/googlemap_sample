<template>
  <div>
    <h1>GoogleMap</h1>
    <b-row>
      <b-col>
        <b-row>
          <b-col>
            <label for="">
              緯度
            </label>
            <input 
              type="text" 
              v-model="lat"
            > 
          </b-col>
          <b-col>
            <label for="">
              経度
            </label>
            <input 
              type="text" 
              v-model="lng"
            >
            <button 
              type="button" 
              @click="searchMainLatLng(lat,lng)"
            >緯度経度検索</button>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <input 
              type="text" 
              v-model="address"
            >
            <button 
              type="button" 
              @click="searchAddress"
            >住所検索</button>
            </b-col>
          </b-row>
        
      </b-col>
      <b-col>
        <div>
          <b-row>
            <b-col>
              <label for="">
                目的地緯度:
              </label>
              <input 
                type="text"
                readonly
                v-model="destinationLat"
              >
              </b-col>
              <b-col>
              <label for="">
                目的地緯度:
              </label>
              <input 
                type="text"
                readonly
                v-model="destinationLng"
              >
            </b-col>
          </b-row>
          <b-row >
            <b-col>
              <label for="">
                目的地住所
              </label>
              <input
                v-model="destinationAddress"
                type="text"
                readonly>
            </b-col>
          </b-row>
        </div>
      </b-col>
    </b-row>
    <hr>
    <b-row class="mt-3">
      <b-col>
        <label for="">
          距離
        </label>
        <input
          v-model="distance"
          type="text"
          readonly
        >
      </b-col>
      <b-col>
        <label for="">
          時間
        </label>
        <input
          v-model="time"
          type="text"
          readonly
        >
      </b-col>
    </b-row>
    <div 
      ref="map" 
      style="height:500px;width:100%;"
    ></div>
  </div>
</template>


<script>
import { GoogleMapLoad } from "../mixins/googlemaploader"

export default {
  mixins:[GoogleMapLoad],
  data(){
    return {
      address:'',
      lat:35.689634,
      lng:139.692101,
      destinationLat:'',
      destinationLng:'',
      destinationAddress:'',
      distance:'',
      time:''
    }
  }
}
</script>