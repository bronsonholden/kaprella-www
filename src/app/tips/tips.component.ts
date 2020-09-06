import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tips',
  templateUrl: './tips.component.html',
  styleUrls: ['./tips.component.scss']
})
export class TipsComponent implements OnInit {

  showTips = true;
  tips: string[] = [
    `On touch-screen devices, you can resize a column by tapping and sliding
    on the header.`,
    `On a computer, you can resize a column by clicking and dragging over the
    right side of the header.`,
    `You can click or tap table cells that show area to switch between acres
    and hectares.`,
    `Most table columns can be sorted. Click or tap on the column title to
    alter and combine column sorting.`
  ];

  currentTipIdx = 0;

  constructor() { }

  ngOnInit(): void {
    this.shuffleTips();
  }

  shuffleTips(): void {
    this.tips.sort(() => Math.random() - 0.5);
  }

  hideTips(): void {
    this.showTips = false;
  }

  getCurrentTip(): string {
    return this.tips[this.currentTipIdx];
  }

  showNextTip(): void {
    let nextIdx = this.currentTipIdx + 1;

    if (nextIdx >= this.tips.length) {
      nextIdx = 0;
    }

    this.currentTipIdx = nextIdx;
  }

}
