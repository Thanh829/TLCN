import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { InvoiceService } from 'src/app/shared/services/invoice.service';

@Component({
  selector: 'app-artist-invoice',
  templateUrl: './artist-invoice.component.html',
  styleUrls: ['./artist-invoice.component.scss']
})
export class ArtistInvoiceComponent implements OnInit {

  constructor(private invoiceService: InvoiceService,private router: ActivatedRoute,private auth: AuthService) { }
  DetailsInvoice:any

  ngOnInit() {

    let id = this.router.snapshot.queryParamMap.get("id");
    this.invoiceService.getDetailsInvoice(id).subscribe(
      res=>{
        this.DetailsInvoice=res
      }
    )
  }

}
