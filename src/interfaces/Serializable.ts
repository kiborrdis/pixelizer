import { SerializedObject } from './SerializedObject';

export interface Serializable {
  serialize: () => SerializedObject;
}
