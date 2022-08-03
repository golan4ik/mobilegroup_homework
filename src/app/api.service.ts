import { Injectable } from '@angular/core';
import axios from 'axios';

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  saveLonLat(lonLat: number[]) {
    const [lon, lat] = lonLat;
    return axios.post('http://localhost:3817/saveLonLat', {
      lon,
      lat
    });
  }
}
