import { LineTool, RectangleTool, MultilineTool, Tool } from './tools/index';
import { TwoPointRecord, NPointRecord, PointScalarRecord, InteractionRecord } from './recorders/index';
import { ActionSerializer } from './ActionSerializer';

class MockTool extends Tool<InteractionRecord> {
  applyToContext() {}
}

const createTestTwoPointRecord = () => ({ startPoint: { x: 1, y: 2 }, endPoint: { x: 0, y: 0 } })
const createTestNPointRecord = () => ({ points: [{ x: 1, y: 2 }] });
const createTestPointScalarRecord = () => ({ point: { x: 1, y: 2 }, value: 2 });

describe('ActionSerializer', () => {
  test('should serialize and deserialize action with TwoPointRecord and LineTool', () => {
    const record: TwoPointRecord = createTestTwoPointRecord();
    const tool = new LineTool();

    const action = {
      record,
      tool,
    };

    expect(ActionSerializer.deserializeFromObj(
      ActionSerializer.serialize(action),
    )).toEqual(action);
  });

  test('should serialize and deserialize action with TwoPointRecord and RectangleTool', () => {
    const record = createTestTwoPointRecord();
    record.startPoint = { x: 1, y: 2 };
    const tool = new RectangleTool();

    const action = {
      record,
      tool,
    };

    expect(ActionSerializer.deserializeFromObj(
      ActionSerializer.serialize(action),
    )).toEqual(action);
  });

  test('should serialize and deserialize action with TwoPointRecord and MultilineTool', () => {
    const record = createTestTwoPointRecord();
    record.startPoint = { x: 1, y: 2 };
    const tool = new MultilineTool();

    const action = {
      record,
      tool,
    };

    expect(ActionSerializer.deserializeFromObj(
      ActionSerializer.serialize(action),
    )).toEqual(action);
  });

  test('should serialize and deserialize action with NPointRecord and MultilineTool', () => {
    const record = createTestNPointRecord();
    record.points = [{ x: 1, y: 2 }];
    const tool = new MultilineTool();

    const action = {
      record,
      tool,
    };

    expect(ActionSerializer.deserializeFromObj(
      ActionSerializer.serialize(action),
    )).toEqual(action);
  });

  test('should serialize and deserialize action with NPointRecord, MultilineTool and style', () => {
    const record = createTestNPointRecord();
    record.points = [{ x: 1, y: 2 }];
    const tool = new MultilineTool();
    const style = { color: '#fff', lineWidth: 1 };

    const action = {
      record,
      tool,
      style,
    };

    expect(ActionSerializer.deserializeFromObj(
      ActionSerializer.serialize(action),
    )).toEqual(action);
  });

  test('should serialize and deserialize action with PointScalarRecord, MultilineTool and style', () => {
    const record = createTestPointScalarRecord();
    const tool = new MultilineTool();
    const style = { color: '#fff', lineWidth: 1 };

    const action = {
      record,
      tool,
      style,
    };

    expect(ActionSerializer.deserializeFromObj(
      ActionSerializer.serialize(action),
    )).toEqual(action);
  });
});
