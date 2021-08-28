import { Component, OnInit } from "@angular/core";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { LiaisonService } from "../liaison.service";

@Component({
  selector: "app-liaison-citoyen",
  templateUrl: "./liaison-citoyen.component.html",
  styleUrls: ["./liaison-citoyen.component.scss"],
})
export class LiaisonCitoyenComponent
  extends BaseSingleComponent
  implements OnInit
{
  constructor(public liaisonService: LiaisonService) {
    super(liaisonService);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }
}
