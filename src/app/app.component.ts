import { Component } from '@angular/core';
import { toLonLat } from 'ol/proj';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  providers: [ApiService]
})
export class AppComponent {
  title = 'mobilegroup';

  constructor(private api: ApiService, private toastr: ToastrService) { }

  public onMapClicked = (coordinates: number[]) => {
    const lonLat = toLonLat(coordinates);

    this.api.saveLonLat(lonLat).then((response) => {
      console.log(`data saved successfully: ${JSON.stringify(response.data)}`);

      const { clickTime, lat, lon } = response.data;

      this.toastr.success(`<p>Lat: <b>${lat}</b></p><p>Lon: <b>${lon}</b></p>`, clickTime, {
        enableHtml: true,
        positionClass: 'toast-bottom-left',
        timeOut: 2000
      });
    }).catch((error) => {
      console.log(`error saving data: '${error}`);
      this.toastr.error('Failed to save coordinates', 'Server error');
    });
  }
}
