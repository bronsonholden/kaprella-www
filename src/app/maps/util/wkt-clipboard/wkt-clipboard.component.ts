import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-wkt-clipboard',
  templateUrl: './wkt-clipboard.component.html',
  styleUrls: ['./wkt-clipboard.component.scss']
})
export class WktClipboardComponent implements OnInit {

  @Input() disabled: boolean = false;
  @Input() wkt: string;
  @Output() wktChange = new EventEmitter<string>();

  constructor(private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  wktCopyResult(successful) {
    if (successful) {
      var message = 'Well-Known Text copied to clipboard';
    } else {
      var message = 'An error occurred copying the text to your clipboard. Try again.';
    }

    this.snackBar.open(message, '', {
      duration: 2000
    });
  }

}
