import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import { OSM } from 'ol/source';
import TileLayer from 'ol/layer/Tile';
import MousePosition from 'ol/control/MousePosition';
import { createStringXY } from 'ol/coordinate';
import { defaults as defaultControls } from 'ol/control';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.sass'],
})
export class MapComponent implements OnInit {
  public map!: Map;

  @Input() onMapClick!: (args: number[]) => void;

  ngOnInit(): void {
    const OSMlayer = new TileLayer({
      source: new OSM(),
    });

    const mousePositionControl = new MousePosition({
      coordinateFormat: createStringXY(4),
      projection: 'EPSG:4326'
    });


    this.map = new Map({
      controls: defaultControls().extend([mousePositionControl]),
      layers: [
        OSMlayer
      ],
      target: 'map',
      view: new View({
        center: [0, 0],
        zoom: 2, maxZoom: 18,
      }),
    });

    this.map.on('click', (evt) => {
      //console.log(evt);
      this.onMapClick(evt.coordinate);
    });
  }
}