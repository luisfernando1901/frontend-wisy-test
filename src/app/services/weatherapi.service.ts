import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

const BASE_URL = 'https://api.weather.gov/gridpoints/';
const ADITIONAL_INFO = '/31,80/forecast';

@Injectable({
  providedIn: 'root',
})
export class WeatherapiService {
  constructor(private httpClient: HttpClient) {}

  async getWeatherData(locationId: string) {
    const request = this.httpClient.get(
      `${BASE_URL}${locationId}${ADITIONAL_INFO}`
    );
    const resp: any = await firstValueFrom(request);
    const formatData = resp.properties.periods.map((period: any) => {
      return {
        startTime: period.startTime,
        endTime: period.endTime,
        temperature: period.temperature,
        name: period.name,
      };
    });
    return formatData;
  }
}
