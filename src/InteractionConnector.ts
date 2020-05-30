import {
    InteractionAdapter,
    InteractionEventType,
    InteractionEvent,
} from './InteractionAdapter';
import { InteractionHandler } from './interfaces/InteractionHandler';

export class InteractionConnector {
    private emitter: InteractionAdapter;
    private handler: InteractionHandler;

    constructor(emitter: InteractionAdapter) {
        this.emitter = emitter;

        emitter.addInteractionListener(
            InteractionEventType.PressStart,
            this.handlePressStart,
        );
        emitter.addInteractionListener(
            InteractionEventType.MoveDuringPress,
            this.handleMoveDuringPress,
        );
        emitter.addInteractionListener(
            InteractionEventType.PressStop,
            this.handlePressStop,
        );
        emitter.addInteractionListener(
            InteractionEventType.Move,
            this.handleMove,
        );
        emitter.addInteractionListener(
            InteractionEventType.Press,
            this.handlePress,
        );
        emitter.addInteractionListener(
            InteractionEventType.DoublePress,
            this.handleDoublePress,
        );
        emitter.addInteractionListener(
            InteractionEventType.Increase,
            this.handleIncrease,
        );
        emitter.addInteractionListener(
            InteractionEventType.Decrease,
            this.handleDecrease,
        );
    }

    public setIteractionHandler(handler: InteractionHandler) {
        this.handler = handler;
    }

    private handlePressStart = (event: InteractionEvent) => {
        if (this.handler && this.handler.pressStart) {
            this.handler.pressStart(event);
        }
    };
    private handleMoveDuringPress = (event: InteractionEvent) => {
        if (this.handler && this.handler.moveDuringPress) {
            this.handler.moveDuringPress(event);
        }
    };
    private handlePressStop = (event: InteractionEvent) => {
        if (this.handler && this.handler.pressStop) {
            this.handler.pressStop(event);
        }
    };
    private handleMove = (event: InteractionEvent) => {
        if (this.handler && this.handler.move) {
            this.handler.move(event);
        }
    };
    private handlePress = (event: InteractionEvent) => {
        if (this.handler && this.handler.press) {
            this.handler.press(event);
        }
    };
    private handleDoublePress = (event: InteractionEvent) => {
        if (this.handler && this.handler.doublePress) {
            this.handler.doublePress(event);
        }
    };
    private handleIncrease = (event: InteractionEvent) => {
        if (this.handler && this.handler.increase) {
            this.handler.increase(event);
        }
    };
    private handleDecrease = (event: InteractionEvent) => {
        if (this.handler && this.handler.decrease) {
            this.handler.decrease(event);
        }
    };
}
