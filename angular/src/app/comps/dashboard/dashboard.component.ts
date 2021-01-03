import { Component, OnInit } from "@angular/core";
import Chart from "chart.js";
import { AdminService } from "src/app/shared/services/admin.service";
import { TagService } from "src/app/shared/services/tag.service";
import { UserService } from "src/app/shared/services/user.service";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "../../variables/charts";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./scss/argon.scss"],
})
export class DashboardComponent implements OnInit {
  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  revenues: any;
  artists: any;
  tags:any
  totalArtist:any=0
  totalTag:any=0
  totalBannedSong:any=0
  constructor(private adminService: AdminService,private userService: UserService, private tagService:TagService) {}
  ngOnInit() {
    this.datasets = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
    this.data = this.datasets[0];

    var chartOrders = document.getElementById("chart-orders");

    parseOptions(Chart, chartOptions());

    var ordersChart = new Chart(chartOrders, {
      type: "bar",
      options: chartExample2.options,
      data: chartExample2.data,
    });

    var chartSales = document.getElementById("chart-sales");

    this.salesChart = new Chart(chartSales, {
      type: "line",
      options: chartExample1.options,
      data: chartExample1.data,
    });
    this.getPageArtist(0)
    this.getPageTag(0)
    this.userService.countArtist().subscribe(
        res=>{
          this.totalArtist=res
        }
    )
    this.tagService.countTag().subscribe(
      res=>{
        this.totalTag=res
      }
    )
    this.adminService.countBannedSong().subscribe(
      res=>{
        this.totalBannedSong=res
      }
    )
    this.adminService.getRevenue(20).subscribe((res) => {
      this.revenues = res;

      this.revenues.forEach((element) => {
        if (element.month == 1) {
          this.datasets[0][0] = element.revenue;
          this.datasets[1][0] = element.total;
        }
        if (element.month == 2) {
          this.datasets[0][1] = element.revenue;

          this.datasets[1][1] = element.total;
        }
        if (element.month == 3) {
          this.datasets[0][2] = element.revenue;
          this.datasets[1][2] = element.total;
        }
        if (element.month == 4) {
          this.datasets[0][3] = element.revenue;

          this.datasets[1][3] = element.total;
        }
        if (element.month == 5) {
          this.datasets[0][4] = element.revenue;
          this.datasets[1][4] = element.total;
        }
        if (element.month == 6) {
          this.datasets[0][5] = element.revenue;
          this.datasets[1][5] = element.total;
        }
        if (element.month == 7) {
          this.datasets[0][6] = element.revenue;
          this.datasets[1][6] = element.total;
        }
        if (element.month == 8) {
          this.datasets[0][7] = element.revenue;
          this.datasets[1][7] = element.total;
        }
        if (element.month == 9) {
          this.datasets[0][8] = element.revenue;
          this.datasets[1][8] = element.total;
        }
        if (element.month == 10) {
          this.datasets[0][9] = element.revenue;
          this.datasets[1][9] = element.total;
        }
        if (element.month == 11) {
          this.datasets[0][10] = element.revenue;
          this.datasets[1][10] = element.total;
        }
        if (element.month == 12) {
          this.datasets[0][11] = element.revenue;
          this.datasets[1][11] = element.total;
        }
      });
      this.data = this.datasets[0];
      console.log(this.datasets[1])
      this.updateOptions();
      ordersChart.data.datasets[0].data=this.datasets[1]
      ordersChart.update()
    });
  }

  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }
  getPageTag(page)
  {
      this.tagService.getPageTag(page).subscribe(
        res=>{
          this.tags=res
        }
      )
  }
  getPageArtist(page)
  {
      this.userService.getPageArtist(page).subscribe(
        res=>{
          this.artists=res
        }
      )
  }
}
