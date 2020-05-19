import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {fromEvent} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  readonly DEFAULT_URL = 'https://video.sibnet.ru/shell.php?videoid=2984574';

  @ViewChild('urlInput', { static: true })
  inputField: ElementRef<HTMLInputElement>;

  url = this.DEFAULT_URL;

  constructor(private _sanitizer: DomSanitizer) {}

  ngAfterViewInit(): void {
    fromEvent(this.inputField.nativeElement, 'input')
      .pipe(
        map((evt) => (evt.target as HTMLInputElement).value),
        distinctUntilChanged(),
        debounceTime(500)
      )
      .subscribe((value: string) => this.url = value);
  }

  sanitizeUrl(url: string): SafeUrl {
    return this._sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
