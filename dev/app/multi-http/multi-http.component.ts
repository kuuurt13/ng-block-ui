import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "multi-http",
  templateUrl: "./multi-http.component.html",
  styleUrls: [],
  moduleId: __moduleName
})
export class MultiHttpComponent {
  requests = {
    first: "undefined",
    second: "undefined"
  };
  url = "https://httpstat.us/200?sleep=";

  constructor(public http: HttpClient) { }

  getWithTimeout(request: string, timeout: number) {
    this.requests[request] = "pending";
    this.http.get(this.url + timeout).subscribe(data => {
      this.requests[request] = "complete";
    });
  }

  makeRequests() {
    this.getWithTimeout("first", 1000);
    this.getWithTimeout("second", 3000);
  }
}
