import { Point } from './interfaces/Point';
export declare enum InteractionEventType {
    PressStart = 1,
    MoveDuringPress = 2,
    PressStop = 3,
    Press = 4,
    Move = 5,
    DoublePress = 6,
    Increase = 7,
    Decrease = 8
}
export interface InteractionEvent {
    type: InteractionEventType;
    id?: string;
    position?: Point;
}
export declare abstract class InteractionAdapter {
    private listeners;
    constructor();
    abstract setInteractionElement(element: any): void;
    addInteractionListener(eventType: InteractionEventType, callback: (e: InteractionEvent) => void): void;
    protected emitInteractionEvent(event: InteractionEvent): void;
}
