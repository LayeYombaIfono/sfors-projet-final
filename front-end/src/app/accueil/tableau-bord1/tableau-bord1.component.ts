import { Component, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexNonAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexYAxis,
  ApexLegend,
  ApexFill,
  ApexGrid,
  ApexPlotOptions,
  ApexTooltip,
  ApexMarkers

} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  seriese: ApexAxisChartSeries | ApexNonAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  tooltip: ApexTooltip;
  labels: string[];
  colors: string[];
  legend: ApexLegend;
  fill: ApexFill;
  grid: ApexGrid;
  markers: ApexMarkers;
};

@Component({
  selector: 'app-tableau-bord1',
  templateUrl: './tableau-bord1.component.html',
  styleUrls: ['./tableau-bord1.component.scss']
})
export default class TableauBord1Component  {
  recouvrements = [];
  recouvrement = [];
  
  // public props
  @ViewChild('chart') chart!: ChartComponent;
  chartOptions!: Partial<ChartOptions>;
  chartOptions_1!: Partial<ChartOptions>;
  chartOptions_2!: Partial<ChartOptions>;
  chartOptions_3!: Partial<ChartOptions>;

  totalBeneficiaireMois : number = 0;
  totalBeneficiaire : number = 0;
  totalCotisation : number = 0;
  totalCotisationMois : number = 0;
  totalContentieux : number = 0;
  totalContentieuxMois : number = 0;
  totalDont : number = 0;
  totalDontMois : number = 0;
  totalRecouvrement = 0;
  totalRecouvrementPercu = 0;
  AdherantNonDouanier: number = 0;
   AdherantDouanier : number = 0;

   CotisationParAns: number = 0;
   

  // constructor
  constructor( private modaLService: NgbModal) {
      this.chartOptions = {
      chart: {
        height: 170,
        type: 'line',
        toolbar: {
          show: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: 2,
        curve: 'smooth'
      },
      series: [
        {
          name: 'Arts',
          data: [20, 50, 30, 60, 30, 50]
        },
        {
          name: 'Commerce',
          data: [60, 30, 65, 45, 67, 35]
        }
      ],
      seriese: [
        
        {
          name: 'Commerce',
          data: [60, 30, 65, 45, 67, 35]
        }
      ],
      legend: {
        position: 'top'
      },
      xaxis: {
        type: 'datetime',

       // categories:  ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        categories: ['1/11/2000', '2/11/2000', '3/11/2000', '4/11/2000', '5/11/2000', '6/11/2000'],
        axisBorder: {
          show: false
        }
      },
      yaxis: {
        show: true,
        min: 0,
        max: 10
      },
      colors: ['red', '#59e0c5'],
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'light',
          gradientToColors: ['#4099ff', '#2ed8b6'],
          shadeIntensity: 0.5,
          type: 'horizontal',
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100]
        }
      },
      grid: {
        borderColor: '#cccccc3b'
      }
    };
    
   
    this.chartOptions_3 = {
      chart: {
        type: 'area',
        height: 145,
        sparkline: {
          enabled: true
        }
      },
      dataLabels: {
        enabled: false
      },
      colors: ['#ff5370'],
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          gradientToColors: ['#ff869a'],
          shadeIntensity: 1,
          type: 'horizontal',
          opacityFrom: 1,
          opacityTo: 0.8,
          stops: [0, 100, 100, 100]
        }
      },
      stroke: {
        curve: 'smooth',
        width: 2
      },
      series: [
        {
          data: [45, 35, 60, 50, 85, 70]
        }
      ],
      yaxis: {
        min: 5,
        max: 90
      },
      tooltip: {
        fixed: {
          enabled: false
        },
        x: {
          show: false
        },
        marker: {
          show: false
        }
      }
    };
  
  }
  //fin constructor


  //debut card

  cards = [
    {
      background: 'bg-c-blue',
      title: 'Total formation',
      icon: 'icon-graduation',
      text: 'Formation par an',
      number: 0,
      no: 0
    },
    {
      background: 'bg-c-green',
      title: 'Total Inscription valide ',
      icon: 'icon-repeat',
      text: 'Inscription par an',
      number: 0,
      no: 0
    }
     ,
     {
      background: 'bg-c-yellow',
     title: 'Total Inscription en attente',
      icon: 'icon-repeat',
      text: 'Inscription par an',
       number: 0,
       no: 0
     }
     ,
    {
      background: 'bg-c-red',
      title: 'Total Inscription rejeté ',
      icon: 'icon-repeat',
      text: 'Inscription par',
      number: 0,
      no: 0
    }
  ];

  //fin card
}
 
 


  
  


 

    
  
 
  




 
      
    


   
