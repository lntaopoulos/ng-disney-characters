/* eslint-disable camelcase */
import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import * as Highcharts from 'highcharts'
import HC_more from 'highcharts/highcharts-more'
import HC_exportData from 'highcharts/modules/export-data'
import HC_exporting from 'highcharts/modules/exporting'

HC_exporting(Highcharts)
HC_exportData(Highcharts)
HC_more(Highcharts)

@Component({
  selector: 'app-character-pie-chart',
  templateUrl: './character-pie-chart.component.html',
  styleUrls: ['./character-pie-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterPieChartComponent {
  @Input() set chartData(value: { name: string; y: number; films: string }[] | null) {
    if (value?.length && this.chartOptions) {
      this.prepareChartOptions(value)
    }
  }

  Highcharts: typeof Highcharts = Highcharts
  chartOptions: Highcharts.Options = {
    chart: {
      type: 'pie',
      backgroundColor: '#fafafa',
    },
    title: {
      text: 'Film Appearances',
      style: { color: '#673ab7', fill: '#673ab7' },
    },
    tooltip: {
      pointFormat: '<b>{series.name}:</b> {point.y} ({point.percentage:.1f}%)<br> <b>Films:</b> {point.films}',
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
        },
      },
    },
    series: [
      {
        type: 'pie',
        name: 'Total films',
        colorByPoint: true,
        data: [],
      },
    ],
    exporting: {
      enabled: true,
      buttons: {
        contextButton: {
          menuItems: ['downloadXLS'],
        },
      },
    },
    navigation: {
      buttonOptions: {
        theme: {
          fill: '#fafafa',
        },
      },
    },
  }

  private prepareChartOptions(chartData: { name: string; y: number; films: string }[]) {
    this.chartOptions = {
      ...this.chartOptions,
      series: {
        ...this.chartOptions,
        data: [...chartData],
      } as any,
    }
  }
}
