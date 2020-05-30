import { InteractionRecord } from '../recorders/InteractionRecord';
import { Serializable } from '../interfaces/Serializable';
import { SerializedObject } from '../interfaces/SerializedObject';
import { CanvasParams } from '../interfaces/CanvasParams';
export declare abstract class Tool<R extends InteractionRecord> implements Serializable {
    abstract applyToContext(context: CanvasRenderingContext2D, record: R, params?: CanvasParams): void;
    serialize(): SerializedObject;
}
