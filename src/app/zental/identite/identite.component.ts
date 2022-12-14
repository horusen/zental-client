import { AfterViewInit, Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "src/app/authentification/auth.service";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { UserService } from "src/app/zental/user/user.service";
import { IdentiteService } from "./identite.service";

@Component({
  selector: "app-identite",
  templateUrl: "./identite.component.html",
  styleUrls: ["./identite.component.scss"],
})
export class IdentiteComponent
  extends BaseSingleComponent
  implements OnInit, AfterViewInit
{
  user: any;
  edit = false;

  constructor(
    public authService: AuthService,
    public userService: UserService,
    public identiteService: IdentiteService,
    public route: ActivatedRoute,
    public router: Router
  ) {
    super(userService, route);
  }

  ngAfterViewInit(): void {
    this.route.fragment.subscribe((fragment) => {
      if (fragment == "edit-identite") {
        this.edit = true;
        this.helper.toggleModal("identite-edit-modal");
      }
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params.id === "current-user") {
        this.user = this.auth.user;
        this.identiteService.user = this.auth.user;
      } else {
        this.loading = true;
        this.userService.getSingle(+params.id, false).subscribe((user) => {
          this.identiteService.user = user;
          this.loading = false;
        });
      }
    });

    this._subscription["user"] = this.identiteService.user$.subscribe(
      (user) => {
        this.user = user;
      }
    );
  }
}
