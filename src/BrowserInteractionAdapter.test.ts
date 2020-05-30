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
        let pressStartFn: jest.Mock<{}>;
        let moveDuringPressFn: jest.Mock<{}>;
        let pressStopFn: jest.Mock<{}>;
        let moveFn: jest.Mock<{}>;
        let pressFn: jest.Mock<{}>;
        let increaseFn: jest.Mock<{}>;
        let decreaseFn: jest.Mock<{}>;
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

        function mouseClick({ x = 0, y = 0 } = {}) {
            element.dispatchEvent(
                new MouseEvent('click', { clientX: x, clientY: y }),
            );
        }

        function mouseWheel(increase = true) {
            element.dispatchEvent(
                new WheelEvent('wheel', { deltaY: increase ? 1 : -1 }),
            );
        }

        beforeEach(() => {
            adapter = new BrowserInteractionAdapter();
            element = document.createElement('canvas');

            pressStartFn = jest.fn();
            moveDuringPressFn = jest.fn();
            moveFn = jest.fn();
            pressStopFn = jest.fn();
            pressFn = jest.fn();
            increaseFn = jest.fn();
            decreaseFn = jest.fn();

            adapter.setInteractionElement(element);
            adapter.addInteractionListener(
                InteractionEventType.PressStart,
                pressStartFn,
            );
            adapter.addInteractionListener(
                InteractionEventType.MoveDuringPress,
                moveDuringPressFn,
            );
            adapter.addInteractionListener(
                InteractionEventType.PressStop,
                pressStopFn,
            );
            adapter.addInteractionListener(InteractionEventType.Move, moveFn);
            adapter.addInteractionListener(InteractionEventType.Press, pressFn);
            adapter.addInteractionListener(
                InteractionEventType.Increase,
                increaseFn,
            );
            adapter.addInteractionListener(
                InteractionEventType.Decrease,
                decreaseFn,
            );

            testPosition = { x: 10, y: 20 };
        });

        test('emits pressStart on mouseDown', () => {
            mouseDown();

            expect(pressStartFn).toBeCalled();
        });

        test('dont emit pressStop on mouseUp if there wasnt mouseDown', () => {
            mouseUp();

            expect(pressStopFn).not.toBeCalled();
        });

        test('emits pressStop on mouseUp if there was mouseDown', () => {
            mouseDown();
            mouseUp();

            expect(pressStopFn).toBeCalled();
        });

        test('dont emit moveDuringPress on mousemove if there wasnt mouseDown', () => {
            mouseMove();

            expect(moveDuringPressFn).not.toBeCalled();
        });

        test('emits moveDuringPress on mousemove if there was mouseDown', () => {
            mouseDown();
            mouseMove();

            expect(moveDuringPressFn).toBeCalled();
        });

        test('dont emit moveDuringPress on mousemove if there was consequent mouseDown, mouseUp', () => {
            mouseDown();
            mouseUp();
            mouseMove();

            expect(moveDuringPressFn).not.toBeCalled();
        });

        test('dont emit moveDuringPress on mousemove if there was consequent mouseDown, mouseLeave', () => {
            mouseDown();
            mouseLeave();
            mouseMove();

            expect(moveDuringPressFn).not.toBeCalled();
        });

        test('dont emit pressStop on mouseleave if there wasnt mouseDown', () => {
            mouseLeave();

            expect(pressStopFn).not.toBeCalled();
        });

        test('emits pressStop on mouseleave if there was mouseDown', () => {
            mouseDown();
            mouseLeave();

            expect(pressStopFn).toBeCalled();
        });

        test('emits move on mousemove if there wasnt mouseDown', () => {
            mouseMove();

            expect(moveFn).toBeCalled();
        });

        test('doesnt emit move on mousemove if there was mouseDown', () => {
            mouseDown();
            mouseMove();

            expect(moveFn).not.toBeCalled();
        });

        test('emits move on mousemove if there was mouseDown and mouseUp', () => {
            mouseDown();
            mouseUp();
            mouseMove();

            expect(moveFn).toBeCalled();
        });

        test('emits pressStart on mousedown with right coordinates and type', () => {
            mouseDown(testPosition);

            expect(pressStartFn).toBeCalledWith({
                id: '0',
                position: testPosition,
                type: InteractionEventType.PressStart,
            });
        });

        test('emits pressStop on mouseup with right coordinates and type', () => {
            mouseDown();
            mouseUp(testPosition);

            expect(pressStopFn).toBeCalledWith({
                id: '0',
                position: testPosition,
                type: InteractionEventType.PressStop,
            });
        });

        test('emits pressStop on mouseleave with right coordinates and type', () => {
            mouseDown();
            mouseLeave(testPosition);

            expect(pressStopFn).toBeCalledWith({
                id: '0',
                position: testPosition,
                type: InteractionEventType.PressStop,
            });
        });

        test('emits moveDuringPress on mousemove with right coordinates and type', () => {
            mouseDown();
            mouseMove(testPosition);

            expect(moveDuringPressFn).toBeCalledWith({
                id: '0',
                position: testPosition,
                type: InteractionEventType.MoveDuringPress,
            });
        });

        test('emits move on mousemove with right coordinates and type', () => {
            mouseMove(testPosition);

            expect(moveFn).toBeCalledWith({
                id: '0',
                position: testPosition,
                type: InteractionEventType.Move,
            });
        });

        test('emits press on click with right coordinates and type', () => {
            mouseClick(testPosition);

            expect(pressFn).toBeCalledWith({
                id: '0',
                position: testPosition,
                type: InteractionEventType.Press,
            });
        });

        test('emits increase on wheel with right coordinates and type', () => {
            mouseWheel(true);

            expect(increaseFn).toBeCalledWith({
                id: '0',
                type: InteractionEventType.Increase,
            });
        });

        test('emits increase on wheel with right coordinates and type', () => {
            mouseWheel(false);

            expect(decreaseFn).toBeCalledWith({
                id: '0',
                type: InteractionEventType.Decrease,
            });
        });
    });
});
