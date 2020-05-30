import { Action } from './interfaces/Action';
import { Style } from './interfaces/Style';
import { Serializable } from './interfaces/Serializable';
import { SerializedObject } from './interfaces/SerializedObject';
import { InteractionRecord } from './recorders/InteractionRecord';
import * as Tools from './tools/index';

interface StringObj {
    [key: string]: any;
}

export interface ActionObject {
    tool: SerializedObject;
    record: InteractionRecord;
    style?: Style;
}

function serialize(toSerialize: Serializable): SerializedObject {
    return toSerialize.serialize();
}

function deserializeTool(obj: SerializedObject): Tools.Tool<InteractionRecord> {
    // @ts-ignore
    const ToolConstructors: StringObj = Tools;

    if (!ToolConstructors[obj.type]) {
        throw new Error(`No tool with class '${obj.type}'`);
    }

    return new ToolConstructors[obj.type]();
}

function deserializeRecord(obj: InteractionRecord): InteractionRecord {
    const record = { ...obj };

    return record;
}

export class ActionSerializer {
    public static serialize(action: Action<InteractionRecord>): ActionObject {
        return {
            tool: serialize(action.tool),
            record: { ...action.record },
            style: action.style ? { ...action.style } : undefined,
        };
    }

    public static deserializeFromObj(
        actionObj: ActionObject,
    ): Action<InteractionRecord> {
        return {
            tool: deserializeTool(actionObj.tool),
            record: deserializeRecord(actionObj.record),
            style: actionObj.style
                ? {
                      ...actionObj.style,
                  }
                : undefined,
        };
    }
}
