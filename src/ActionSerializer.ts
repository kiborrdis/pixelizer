import { Action } from './interfaces/Action';
import { Style } from './interfaces/Style';
import { Serializable } from './interfaces/Serializable';
import { SerializedObject } from './interfaces/SerializedObject';
import { InteractionRecord } from './InteractionRecord';
import * as Tools from './tools/index';
import * as Records from './recorders/index';

interface StringObj {
  [key: string]: any;
}

interface ActionObject {
  tool: SerializedObject;
  record: SerializedObject;
  style?: Style;
}

function serialize(toSerialize: Serializable): SerializedObject {
  return toSerialize.serialize();
}

function deserializeTool(obj: SerializedObject): Tools.Tool {
  // @ts-ignore
  const ToolConstructors: StringObj = Tools;

  if (!ToolConstructors[obj.type]) {
    throw new Error(`No tool with class '${obj.type}'`);
  }

  return new ToolConstructors[obj.type]();
}

function deserializeRecord(obj: SerializedObject): InteractionRecord {
  // @ts-ignore
  const RecordConstructors: StringObj = Records;

  if (!RecordConstructors[obj.type]) {
    throw new Error(`No record with class '${obj.type}'`);
  }

  const record = new RecordConstructors[obj.type]();

  switch (obj.type) {
    case Records.TwoPointRecord.name: {
      record.startPoint = obj.data.startPoint;
      record.endPoint = obj.data.endPoint;

      return record;
    }
    case Records.NPointRecord.name: {
      record.points = [...obj.data];

      return record;
    }
    default: {
      throw new Error(`No deserialization strategy for record with class '${obj.type}'`);
    }
  }
}

export class ActionSerializer {
  public static serialize(action: Action): ActionObject {
    return {
      tool: serialize(action.tool),
      record: serialize(action.record),
      style: action.style ? { ...action.style } : undefined,
    };
  }

  public static deserializeFromObj(actionObj: ActionObject): Action {
    return {
      tool: deserializeTool(actionObj.tool),
      record: deserializeRecord(actionObj.record),
      style: actionObj.style ? {
        ...actionObj.style,
      } : undefined,
    };
  }
}
