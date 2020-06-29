import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
  AfterViewInit,
  Renderer2
} from '@angular/core';
import { Subscription, fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[mobileResizeable]',
  host: {
    '[class.resizeable]': 'resizeEnabled'
  }
})
export class MobileResizeableDirective implements OnDestroy {
  @Input() resizeEnabled: boolean = true;
  @Input() minWidth: number;
  @Input() maxWidth: number;

  @Output() resize: EventEmitter<any> = new EventEmitter();

  element: HTMLElement;
  subscription: Subscription;
  resizing: boolean = false;
  private resizeHandle: HTMLElement;

  constructor(element: ElementRef, private renderer: Renderer2) {
    this.element = element.nativeElement;
  }

  ngOnDestroy(): void {
    this._destroySubscription();
  }

  onMouseup(): void {
    this.resizing = false;

    if (this.subscription && !this.subscription.closed) {
      this._destroySubscription();
      this.resize.emit(this.element.clientWidth);
    }
  }

  @HostListener('touchstart', ['$event'])
  onMousedown(event: TouchEvent): void {
    const initialWidth = this.element.clientWidth;
    const touchIndex = event.which;
    const mouseDownScreenX = event.changedTouches[touchIndex].screenX;

    event.stopPropagation();
    this.resizing = true;

    const mouseup = fromEvent(document, 'touchend');
    this.subscription = mouseup.subscribe((ev: MouseEvent) => this.onMouseup());

    const mouseMoveSub = fromEvent(document, 'touchmove')
      .pipe(takeUntil(mouseup))
      .subscribe((e: TouchEvent) => {
        this.move(e, initialWidth, mouseDownScreenX);
      });

    this.subscription.add(mouseMoveSub);
  }

  move(event: TouchEvent, initialWidth: number, mouseDownScreenX: number): void {
    event.stopPropagation();
    const touchIndex = event.which;
    const movementX = event.changedTouches[touchIndex].screenX - mouseDownScreenX;
    const newWidth = initialWidth + movementX;

    const overMinWidth = !this.minWidth || newWidth >= this.minWidth;
    const underMaxWidth = !this.maxWidth || newWidth <= this.maxWidth;

    if (overMinWidth && underMaxWidth) {
      this.element.style.width = `${newWidth}px`;
    }
  }

  private _destroySubscription() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = undefined;
    }
  }
}
