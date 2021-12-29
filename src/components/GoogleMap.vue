<template>
  <div>
    <b-container style="max-width:95%;">
      <h1>GoogleMap</h1>
      <b-row>
        <b-col>
          <b-row>
            <b-col md="2">
              <label for="lat">
                緯度:
              </label>
            </b-col>
            <b-col md="4">
              <b-form-input
                id="lat"
                type="text" 
                v-model="lat"
              /> 
            </b-col>
            <b-col md="2">
              <label for="lng">
                経度:
              </label>
            </b-col>
            <b-col md="4">
              <b-form-input
                id="ing"
                type="text" 
                v-model="lng"
              />
            </b-col>
            <b-row class="mt-1">
              <b-col 
                style="text-align:center;" 
              >
                <b-button
                  size="sm"
                  style="width:50%;"
                  variant="primary"
                  type="button" 
                  @click="searchMainLatLng(lat,lng)"
                >
                  緯度経度検索
                </b-button>
              </b-col>
            </b-row>
          </b-row>
          <b-row class="mt-2">
            <b-col md="2">
              <label for="address">
                住所:
              </label>
            </b-col>
            <b-col md="10">
              <b-form-input
                id="address"
                type="text" 
                v-model="address"
              />
            </b-col>
            <b-row class="mt-1">
              <b-col 
                style="text-align:center;"
              >
                <b-button
                  size="sm"
                  style="width:50%;"
                  variant="primary"
                  type="button" 
                  @click="searchAddress"
                >
                  住所検索
                </b-button>
              </b-col>
            </b-row>
            
          </b-row>
          <b-row class="mt-2">
            <b-col md="2">
              <label for="place">
                施設名:
              </label>
            </b-col>
            <b-col md="10">
              <b-form-input
                id="place"
                type="text" 
                v-model="place"
              />
            </b-col>
            <b-row class="mt-1">
              <b-col 
                style="text-align:center;"
              >
                <b-button
                  size="sm"
                  style="width:50%;"
                  variant="primary"
                  type="button" 
                  @click="searchPlace"
                >
                  施設名検索
                </b-button>
              </b-col>
            </b-row>
            
          </b-row>
        </b-col>

        <b-col>
          <b-row>
            <b-row>
              <b-col md="2">
                <label for="destinationLat">
                  目的地緯度:
                </label>
              </b-col>
              <b-col md="4">
                <b-form-input 
                  id="destinationLat"
                  type="text"
                  readonly
                  v-model="destinationLat"
                />
              </b-col>
              <b-col md="2">
                <label for="destinationLng">
                  目的地緯度:
                </label>
              </b-col>
              <b-col md="4">
                <b-form-input 
                  id="destinationLng"
                  type="text"
                  readonly
                  v-model="destinationLng"
                />
              </b-col>
            </b-row>
            <b-row class="mt-2">
              <b-col md="2">
                <label for="destinationAddress">
                  目的地住所:
                </label>
              </b-col>
              <b-col md="10">
                <b-form-input
                  id="destinationAddress"
                  v-model="destinationAddress"
                  type="text"
                  readonly
                />
              </b-col>
            </b-row>

            <b-row class="mt-2">
              <b-col md="2">
                <label for="distance">
                  距離
                </label>
              </b-col>
              <b-col md="auto">
                <b-form-input
                  id="distance"
                  v-model="distance"
                  type="text"
                  readonly
                />
              </b-col>
            </b-row>

            <b-row class="mt-2">
              <b-col md="2">
                <label for="time">
                  時間:
                </label>
              </b-col>
              <b-col md="auto">
                <b-form-input
                  id="time"
                  v-model="time"
                  type="text"
                  readonly
                />
              </b-col>
            </b-row>
          </b-row>
        </b-col>
      </b-row>
      <hr>
      <div 
        ref="map" 
        style="height:390px;width:100%;"
      ></div>
    </b-container>
  </div>
</template>


<script>
import { GoogleMapLoad } from "../mixins/googlemaploader"

export default {
  mixins:[GoogleMapLoad],
  data(){
    return {
      address:'',
      lat:35.689677569206,
      lng:139.692101,
      destinationLat:'',
      destinationLng:'',
      destinationAddress:'',
      distance:'',
      time:'',
      place:''
    }
  }
}
</script>