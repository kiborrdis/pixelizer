import { InteractionAdapter } from './InteractionAdapter';
export declare class BrowserInteractionAdapter extends InteractionAdapter {
    private elementRect;
    private element;
    private interactionStarted;
    setInteractionElement(element: HTMLElement): void;
    private handleMouseDown;
    private handleInteractionStop;
    private handleMouseMove;
    private handleClick;
    private handleWheel;
    private transformWheelEventToInteractionEvent;
    private transformMouseEventToInteractionEvent;
}
