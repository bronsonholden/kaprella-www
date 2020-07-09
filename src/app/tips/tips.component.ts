import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tips',
  templateUrl: './tips.component.html',
  styleUrls: ['./tips.component.scss']
})
export class TipsComponent implements OnInit {

  showTips = true;
  tips: string[] = [
    `On touch-screen devices, you can resize a column by tapping and sliding on
    the header.`,
    `On a computer, you can resize a column by clicking and dragging over the
    right side of the header.`
  ];

  currentTipIdx = 0;

  constructor() { }

  ngOnInit(): void {
    this.shuffleTips();
  }

  shuffleTips() {
    this.tips.sort(() => Math.random() - 0.5);
  }

  hideTips() {
    this.showTips = false;
  }

  getCurrentTip() {
    return this.tips[this.currentTipIdx];
  }

  showNextTip() {
    let nextIdx = this.currentTipIdx + 1;

    if (nextIdx >= this.tips.length) {
      nextIdx = 0;
    }

    this.currentTipIdx = nextIdx;
  }

}
