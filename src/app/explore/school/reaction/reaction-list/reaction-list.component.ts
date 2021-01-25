import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { ReactionService } from "../reaction.service";

@Component({
  selector: "app-reaction-list",
  templateUrl: "./reaction-list.component.html",
  styleUrls: ["./reaction-list.component.scss"],
})
export class ReactionListComponent extends BaseComponent implements OnInit {
  @Input() type: string;
  @Input() parentID: number;
  minified: boolean;
  constructor(public reactionService: ReactionService, public router: Router) {
    super(reactionService);
  }

  ngOnInit(): void {
    this.router.url.includes("discussion-min")
      ? (this.minified = true)
      : (this.minified = false);
    if (this.type == "discussion") {
      this.getByReaction(this.parentID);
    }
  }

  getByReaction(discussion: number) {
    this.loading = true;
    this.reactionService.getByDiscussion(discussion).subscribe(() => {
      this.loading = false;
    });
  }
}