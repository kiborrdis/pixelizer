import { InteractionEventType } from './InteractionAdapter';
import { BrowserInteractionAdapter } from './BrowserInteractionAdapter';
import { Point } from './interfaces/Point';

describe('BrowserInteractionAdapter', () => {
  test('should succesfully be creared', () => {
    const adapter = new BrowserInteractionAdapter();
  });

  test('should throw error when interaction element is not provided', () => {
    const adapter = new BrowserInteractionAdapter();

    expect(() => adapter.setInteractionElement(null)).toThrow();
  });

  describe('with set interaction element', () => {
    let adapter: BrowserInteractionAdapter;
    let element: HTMLElement;
    let startFn: jest.Mock<{}>;
    let moveFn: jest.Mock<{}>;
    let stopFn: jest.Mock<{}>;
    let testPosition: Point;

    function mouseDown({ x = 0, y = 0 } = {}) {
      element.dispatchEvent(
        new MouseEvent('mousedown', { clientX: x, clientY: y }),
      );
    }

    function mouseMove({ x = 0, y = 0 } = {}) {
      element.dispatchEvent(
        new MouseEvent('mousemove', { clientX: x, clientY: y }),
      );
    }

    function mouseLeave({ x = 0, y = 0 } = {}) {
      element.dispatchEvent(
        new MouseEvent('mouseleave', { clientX: x, clientY: y }),
      );
    }

    function mouseUp({ x = 0, y = 0 } = {}) {
      element.dispatchEvent(
        new MouseEvent('mouseup', { clientX: x, clientY: y }),
      );
    }

    beforeEach(() => {
      adapter = new BrowserInteractionAdapter();
      element = document.createElement('canvas');

      startFn = jest.fn();
      moveFn = jest.fn();
      stopFn = jest.fn();

      adapter.setInteractionElement(element);
      adapter.addInteractionListener(InteractionEventType.PressStart, startFn);
      adapter.addInteractionListener(InteractionEventType.MoveDuringPress, moveFn);
      adapter.addInteractionListener(InteractionEventType.PressStop, stopFn);

      testPosition = { x: 10, y: 20 };
    });

    test('emits start interaction on mouseDown', () => {
      mouseDown();

      expect(startFn).toBeCalled();
    });

    test('dont emit stop interaction on mouseUp if there wasnt mouseDown', () => {
      mouseUp();

      expect(stopFn).not.toBeCalled();
    });

    test('emits stop interaction on mouseUp if there was mouseDown', () => {
      mouseDown();
      mouseUp();

      expect(stopFn).toBeCalled();
    });

    test('dont emit move interaction on mousemove if there wasnt mouseDown', () => {
      mouseMove();

      expect(moveFn).not.toBeCalled();
    });

    test('emits move interaction on mousemove if there was mouseDown', () => {
      mouseDown();
      mouseMove();

      expect(moveFn).toBeCalled();
    });

    test('dont emit move interaction on mousemove if there was consequent mouseDown, mouseUp', () => {
      mouseDown();
      mouseUp();
      mouseMove();

      expect(moveFn).not.toBeCalled();
    });

    test('dont emit move interaction on mousemove if there was consequent mouseDown, mouseLeave', () => {
      mouseDown();
      mouseLeave();
      mouseMove();

      expect(moveFn).not.toBeCalled();
    });

    test('dont emit stop interaction on mouseleave if there wasnt mouseDown', () => {
      mouseLeave();

      expect(stopFn).not.toBeCalled();
    });

    test('emits stop interaction on mouseleave if there was mouseDown', () => {
      mouseDown();
      mouseLeave();

      expect(stopFn).toBeCalled();
    });

    test('emits start interaction on mousedown with right coordinates and type', () => {
      mouseDown(testPosition);

      expect(startFn).toBeCalledWith({
        id: '0',
        position: testPosition,
        type: InteractionEventType.PressStart,
      });
    });

    test('emits stop interaction on mouseup with right coordinates and type', () => {
      mouseDown();
      mouseUp(testPosition);

      expect(stopFn).toBeCalledWith({
        id: '0',
        position: testPosition,
        type: InteractionEventType.PressStop,
      });
    });

    test('emits stop interaction on mouseleave with right coordinates and type', () => {
      mouseDown();
      mouseLeave(testPosition);

      expect(stopFn).toBeCalledWith({
        id: '0',
        position: testPosition,
        type: InteractionEventType.PressStop,
      });
    });

    test('emits move interaction on mousemove with right coordinates and type', () => {
      mouseDown();
      mouseMove(testPosition);

      expect(moveFn).toBeCalledWith({
        id: '0',
        position: testPosition,
        type: InteractionEventType.MoveDuringPress,
      });
    });
  });
});
