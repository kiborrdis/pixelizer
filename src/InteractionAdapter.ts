import { Point } from './interfaces/Point';

export enum InteractionEventType {
  PressStart = 1,
  MoveDuringPress,
  PressStop,
  Press,
  Move,
  DoublePress,
  Increase,
  Decrease,
}

export interface InteractionEvent {
  type: InteractionEventType;
  id?: string;
  position?: Point;
}

export abstract class InteractionAdapter {
  private listeners: Map<
    InteractionEventType,
    Array<(e: InteractionEvent) => void>
  > = new Map();

  constructor() {
    for (const item in InteractionEventType) {
      if (isNaN(Number(item))) {
        this.listeners.set(
          (InteractionEventType[item] as unknown) as InteractionEventType,
          [],
        );
      }
    }
  }

  public abstract setInteractionElement(element: any): void;

  public addInteractionListener(
    eventType: InteractionEventType,
    callback: (e: InteractionEvent) => void,
  ) {
    const typeListeners = this.listeners.get(eventType);

    typeListeners.push(callback);
  }

  protected emitInteractionEvent(event: InteractionEvent) {
    const typeListeners = this.listeners.get(event.type);

    typeListeners.forEach((listener) => {
      listener(event);
    });
  }
}
