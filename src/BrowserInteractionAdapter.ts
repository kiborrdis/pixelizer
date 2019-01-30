import {
  InteractionAdapter,
  InteractionEventType,
} from './InteractionAdapter';

export class BrowserInteractionAdapter extends InteractionAdapter {
  private elementRect: ClientRect;
  private interactionStarted: boolean = false;

  public setInteractionElement(element: HTMLElement): void {
    if (!element) {
      throw new Error('Interaction element is not provided');
    }

    this.elementRect = element.getBoundingClientRect();

    element.addEventListener('mousedown', this.handleMouseDown);
    element.addEventListener('mouseup', this.handleInteractionStop);
    element.addEventListener('mouseleave', this.handleInteractionStop);
    element.addEventListener('mousemove', this.handleMouseMove);
    element.addEventListener('click', this.handleClick);
    element.addEventListener('wheel', this.handleWheel);
  }

  private handleMouseDown = (event: MouseEvent) => {
    this.emitInteractionEvent(
      this.transformMouseEventToInteractionEvent(InteractionEventType.PressStart, event),
    );

    this.interactionStarted = true;
  }

  private handleInteractionStop = (event: MouseEvent) => {
    if (this.interactionStarted) {
      this.emitInteractionEvent(
        this.transformMouseEventToInteractionEvent(InteractionEventType.PressStop, event),
      );
    }

    this.interactionStarted = false;
  }

  private handleMouseMove = (event: MouseEvent) => {
    if (this.interactionStarted) {
      this.emitInteractionEvent(
        this.transformMouseEventToInteractionEvent(InteractionEventType.MoveDuringPress, event),
      );
    } else {
      this.emitInteractionEvent(
        this.transformMouseEventToInteractionEvent(InteractionEventType.Move, event),
      );
    }
  }

  private handleClick = (event: MouseEvent) => {
    this.emitInteractionEvent(
      this.transformMouseEventToInteractionEvent(InteractionEventType.Press, event),
    );
  }

  private handleWheel = (event: WheelEvent) => {
    this.emitInteractionEvent(
      this.transformWheelEventToInteractionEvent(event),
    );
  }

  private transformWheelEventToInteractionEvent(
    event: WheelEvent,
  ) {
    return {
      id: '0',
      type: event.deltaY > 0 ? InteractionEventType.Increase : InteractionEventType.Decrease,
    };
  }

  private transformMouseEventToInteractionEvent(
    type: InteractionEventType,
    event: MouseEvent,
  ) {
    const offsetX = event.clientX - this.elementRect.left;
    const offsetY = event.clientY - this.elementRect.top;

    return { position: { x: offsetX, y: offsetY }, id: '0', type };
  }
}
