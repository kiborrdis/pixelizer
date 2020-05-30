import { InteractionRecord } from '../recorders/InteractionRecord';
import { Serializable } from '../interfaces/Serializable';
import { SerializedObject } from '../interfaces/SerializedObject';
import { CanvasParams } from '../interfaces/CanvasParams';

export abstract class Tool<R extends InteractionRecord> implements Serializable {
  public abstract applyToContext(context: CanvasRenderingContext2D, record: R, params?: CanvasParams): void;

  public serialize(): SerializedObject {
    return {
      type: this.constructor.name,
    };
  }
}
