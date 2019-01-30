import { Serializable } from '../interfaces/Serializable';
import { SerializedObject } from '../interfaces/SerializedObject';

export class InteractionRecord implements Serializable {
  public serialize(): SerializedObject {
    return {
      type: this.constructor.name,
    };
  }
}
