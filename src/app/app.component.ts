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

  readonly DEFAULT_URL = 'https://vk.com/video_ext.php?oid=-51321503&id=167612501&hash=0e93e71af1472428';

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
