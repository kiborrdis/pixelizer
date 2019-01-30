import { PointScalarRecorder } from './PointScalarRecorder';
import { InteractionEventType } from '../InteractionAdapter';
import { Point } from '../interfaces/Point';

describe('PointScalarRecorder', () => {
  let recorder: PointScalarRecorder;
  let preview: jest.Mock;
  let finish: jest.Mock;

  const startPoint: Point = { x: 10, y: 20 };
  const endPoint: Point = { x: 20, y: 10 };

  function press(point: Point) {
    recorder.press({
      type: InteractionEventType.Press,
      position: point,
    });
  }

  function move(point: Point) {
    recorder.move({
      type: InteractionEventType.Move,
      position: point,
    });
  }

  function increase() {
    recorder.increase({
      type: InteractionEventType.Increase,
    });
  }

  function decrease() {
    recorder.decrease({
      type: InteractionEventType.Decrease,
    });
  }

  beforeEach(() => {
    preview = jest.fn();
    finish = jest.fn();

    recorder = new PointScalarRecorder(preview, finish);
  });

  test('should call preview on move with move point and value', () => {
    move(startPoint);

    expect(preview).toBeCalledWith({ point: startPoint, value: 3 });
  });

  test('should call preview on decrease with move point and right value', () => {
    move(startPoint);
    decrease();

    expect(preview).toBeCalledWith({ point: startPoint, value: 2 });
  });

  test('should call preview on increase with move point and right value', () => {
    move(startPoint);
    increase();

    expect(preview).toBeCalledWith({ point: startPoint, value: 4 });
  });

  test('should call finish record on press with press point', () => {
    move(startPoint);
    increase();
    press(endPoint);

    expect(finish).toBeCalledWith({ point: endPoint, value: 4 });
  });
});
