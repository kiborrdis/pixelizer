import { Action } from './interfaces/Action';
import { Style } from './interfaces/Style';
import { SerializedObject } from './interfaces/SerializedObject';
export interface ActionObject {
    tool: SerializedObject;
    record: SerializedObject;
    style?: Style;
}
export declare class ActionSerializer {
    static serialize(action: Action): ActionObject;
    static deserializeFromObj(actionObj: ActionObject): Action;
}
