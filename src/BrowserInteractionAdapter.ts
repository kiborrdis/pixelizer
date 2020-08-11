import { InteractionAdapter, InteractionEventType } from './InteractionAdapter';

export class BrowserInteractionAdapter extends InteractionAdapter {
    private elementRect: ClientRect;
    private element: HTMLElement;
    private interactionStarted: boolean = false;

    public setInteractionElement(element: HTMLElement): void {
        if (!element) {
            throw new Error('Interaction element is not provided');
        }
        this.element = element;
        this.elementRect = element.getBoundingClientRect();

        element.addEventListener('pointerdown', this.handleMouseDown);
        element.addEventListener('pointerup', this.handleInteractionStop);
        element.addEventListener('pointerout', this.handleInteractionStop);
        element.addEventListener('pointermove', this.handleMouseMove);
        element.addEventListener('click', this.handleClick);
        element.addEventListener('wheel', this.handleWheel);
    }

    private handleMouseDown = (event: PointerEvent) => {
        event.preventDefault();
        this.emitInteractionEvent(
            this.transformMouseEventToInteractionEvent(
                InteractionEventType.PressStart,
                event,
            ),
        );

        this.interactionStarted = true;
    };

    private handleInteractionStop = (event: PointerEvent) => {
        event.preventDefault();
        if (this.interactionStarted) {
            this.emitInteractionEvent(
                this.transformMouseEventToInteractionEvent(
                    InteractionEventType.PressStop,
                    event,
                ),
            );
        }
        this.interactionStarted = false;
    };

    private handleMouseMove = (event: PointerEvent) => {
        event.preventDefault();
        if (this.interactionStarted) {
            this.emitInteractionEvent(
                this.transformMouseEventToInteractionEvent(
                    InteractionEventType.MoveDuringPress,
                    event,
                ),
            );
        } else {
            this.emitInteractionEvent(
                this.transformMouseEventToInteractionEvent(
                    InteractionEventType.Move,
                    event,
                ),
            );
        }
    };

    private handleClick = (event: PointerEvent) => {
        this.emitInteractionEvent(
            this.transformMouseEventToInteractionEvent(
                InteractionEventType.Press,
                event,
            ),
        );
    };

    private handleWheel = (event: WheelEvent) => {
        this.emitInteractionEvent(
            this.transformWheelEventToInteractionEvent(event),
        );
    };

    private transformWheelEventToInteractionEvent(event: WheelEvent) {
        return {
            id: '0',
            type:
                event.deltaY > 0
                    ? InteractionEventType.Increase
                    : InteractionEventType.Decrease,
        };
    }

    private transformMouseEventToInteractionEvent(
        type: InteractionEventType,
        event: PointerEvent,
    ) {
        this.elementRect = this.element.getBoundingClientRect();
        const offsetX = event.clientX - this.elementRect.left;
        const offsetY = event.clientY - this.elementRect.top;

        return {
            position: { x: Math.floor(offsetX), y: Math.floor(offsetY) },
            id: '0',
            type,
            pressure: event.pressure,
        };
    }
}
