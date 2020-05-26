import { InteractionAdapter } from './InteractionAdapter';
import { InteractionHandler } from './interfaces/InteractionHandler';
export declare class InteractionConnector {
    private emitter;
    private handler;
    constructor(emitter: InteractionAdapter);
    setIteractionHandler(handler: InteractionHandler): void;
    private handlePressStart;
    private handleMoveDuringPress;
    private handlePressStop;
    private handleMove;
    private handlePress;
    private handleDoublePress;
    private handleIncrease;
    private handleDecrease;
}
