import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { WeatherapiService } from '../../services/weatherapi.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css',
})
export class WeatherComponent implements OnInit {
  locationId = '';
  weatherData: any;

  constructor(
    private route: ActivatedRoute,
    private weatherService: WeatherapiService
  ) {
    this.locationId = this.route.snapshot.paramMap.get('locationId')!;
  }

  ngOnInit() {
    this.generateChart();
  }

  async generateChart() {
    this.weatherData = await this.weatherService.getWeatherData(
      this.locationId
    );

    const ctx: any = document.getElementById('myChart');

    new Chart(ctx, {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'Temperature in F',
            data: this.weatherData,
            borderColor: 'rgb(75, 192, 192)',
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        parsing: {
          xAxisKey: 'name',
          yAxisKey: 'temperature',
        },
        plugins: {
          tooltip: {
            callbacks: {
              footer: this.generateFooterTooltip,
            },
          },
        },
      },
    });
  }

  generateFooterTooltip(tooltipItems: any) {
    const startTime = new Date(
      tooltipItems[0].raw.startTime
    ).toLocaleTimeString();
    const endTime = new Date(tooltipItems[0].raw.endTime).toLocaleTimeString();
    return `From ${startTime} to ${endTime}`;
  }
}
