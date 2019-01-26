import {
  InteractionAdapter,
  InteractionEvent,
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
  }

  private handleMouseDown = (event: MouseEvent) => {
    this.emitInteractionEvent(
      this.transformEventToInteractionEvent(InteractionEventType.PressStart, event),
    );

    this.interactionStarted = true;
  }

  private handleInteractionStop = (event: MouseEvent) => {
    if (this.interactionStarted) {
      this.emitInteractionEvent(
        this.transformEventToInteractionEvent(InteractionEventType.PressStop, event),
      );
    }

    this.interactionStarted = false;
  }

  private handleMouseMove = (event: MouseEvent) => {
    if (this.interactionStarted) {
      this.emitInteractionEvent(
        this.transformEventToInteractionEvent(InteractionEventType.MoveDuringPress, event),
      );
    }
  }

  private transformEventToInteractionEvent(
    type: InteractionEventType,
    event: MouseEvent,
  ) {
    const offsetX = event.clientX - this.elementRect.left;
    const offsetY = event.clientY - this.elementRect.top;

    return { position: { x: offsetX, y: offsetY }, id: '0', type };
  }
}
