import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';
import { Subscription, fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[touchResizeable]'
})
export class TouchResizeableDirective implements OnDestroy {
  @Input() minWidth: number;
  @Input() maxWidth: number;

  @Output() resize: EventEmitter<any> = new EventEmitter();

  element: HTMLElement;
  subscription: Subscription;
  resizing: boolean = false;
  private resizeHandle: HTMLElement;

  constructor(element: ElementRef) {
    this.element = element.nativeElement;
  }

  ngOnDestroy(): void {
    this.destroySubscription();
  }

  onTouchEnd(): void {
    this.resizing = false;

    if (this.subscription && !this.subscription.closed) {
      this.destroySubscription();
      this.resize.emit(this.element.clientWidth);
    }
  }

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent): void {
    const initialWidth = this.element.clientWidth;
    const touchIndex = event.which;
    const touchStartScreenX = event.changedTouches[touchIndex].screenX;

    event.stopPropagation();
    this.resizing = true;

    const touchEnd = fromEvent(document, 'touchend');
    this.subscription = touchEnd.subscribe((ev: TouchEvent) => this.onTouchEnd());

    const touchMoveSub = fromEvent(document, 'touchmove')
      .pipe(takeUntil(touchEnd))
      .subscribe((e: TouchEvent) => {
        this.move(e, initialWidth, touchStartScreenX);
      });

    this.subscription.add(touchMoveSub);
  }

  move(event: TouchEvent, initialWidth: number, touchStartScreenX: number): void {
    event.stopPropagation();
    const touchIndex = event.which;
    const movementX = event.changedTouches[touchIndex].screenX - touchStartScreenX;
    const newWidth = initialWidth + movementX;
    const overMinWidth = !this.minWidth || newWidth >= this.minWidth;
    const underMaxWidth = !this.maxWidth || newWidth <= this.maxWidth;

    if (overMinWidth && underMaxWidth) {
      this.element.style.width = `${newWidth}px`;
    }
  }

  private destroySubscription() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = undefined;
    }
  }
}
