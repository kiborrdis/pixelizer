import { InteractionRecord } from '../recorders/InteractionRecord';
import { Serializable } from '../interfaces/Serializable';
import { SerializedObject } from '../interfaces/SerializedObject';
import { CanvasParams } from '../interfaces/CanvasParams';

export abstract class Tool implements Serializable {
  public applyToContext(context: CanvasRenderingContext2D, record: InteractionRecord, params?: CanvasParams): void {
    throw new Error(`passed record type is not supported`);
  }

  public serialize(): SerializedObject {
    return {
      type: this.constructor.name,
    };
  }
}
