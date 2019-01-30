import { InteractionRecord } from '../InteractionRecord';
import { Serializable } from '../interfaces/Serializable';
import { SerializedObject } from '../interfaces/SerializedObject';

export abstract class Tool implements Serializable {
  public applyToContext(context: CanvasRenderingContext2D, record: InteractionRecord): void {
    throw new Error(`passed record type is not supported`);
  }

  public serialize(): SerializedObject {
    return {
      type: this.constructor.name,
    };
  }
}
