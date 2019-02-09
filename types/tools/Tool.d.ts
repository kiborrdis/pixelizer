import { InteractionRecord } from '../recorders/InteractionRecord';
import { Serializable } from '../interfaces/Serializable';
import { SerializedObject } from '../interfaces/SerializedObject';
import { CanvasParams } from '../interfaces/CanvasParams';
export declare abstract class Tool implements Serializable {
    applyToContext(context: CanvasRenderingContext2D, record: InteractionRecord, params?: CanvasParams): void;
    serialize(): SerializedObject;
}
