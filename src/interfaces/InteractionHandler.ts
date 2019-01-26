import { InteractionEvent } from '../InteractionAdapter';

export interface InteractionHandler {
  pressStart?: (event: InteractionEvent) => void;
  moveDuringPress?: (event: InteractionEvent) => void;
  pressStop?: (event: InteractionEvent) => void;
  press?: (event: InteractionEvent) => void;
  move?: (event: InteractionEvent) => void;
  doublePress?: (event: InteractionEvent) => void;
  increase?: (event: InteractionEvent) => void;
  decrease?: (event: InteractionEvent) => void;
}
