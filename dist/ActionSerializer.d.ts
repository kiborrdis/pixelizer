import { Action } from './interfaces/Action';
import { Style } from './interfaces/Style';
import { SerializedObject } from './interfaces/SerializedObject';
import { InteractionRecord } from './recorders/InteractionRecord';
export interface ActionObject {
    tool: SerializedObject;
    record: InteractionRecord;
    style?: Style;
}
export declare class ActionSerializer {
    static serialize(action: Action<InteractionRecord>): ActionObject;
    static deserializeFromObj(actionObj: ActionObject): Action<InteractionRecord>;
}
