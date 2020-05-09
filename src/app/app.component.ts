import {Component} from '@angular/core';
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  readonly DEFAULT_URL = 'https://video.sibnet.ru/shell.php?videoid=2984574';

  url = this.DEFAULT_URL;

  constructor(private _sanitizer: DomSanitizer) {}

  sanitizeUrl(url: string): SafeUrl {
    return this._sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
