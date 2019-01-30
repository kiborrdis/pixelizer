import { InteractionAdapter, InteractionEventType } from './InteractionAdapter';
import { InteractionHandler } from './interfaces/InteractionHandler';
import { InteractionConnector } from './InteractionConnector';

class InteractionAdapterImpl extends InteractionAdapter {
  public setInteractionElement() {}

  public emitEvent(type: InteractionEventType) {
    this.emitInteractionEvent({
      type,
      position: { x: 0, y: 0 },
    });
  }
}

class InteractionHandlerImpl implements InteractionHandler {
  public pressStart = jest.fn();
  public moveDuringPress = jest.fn();
  public pressStop = jest.fn();
  public press = jest.fn();
  public move = jest.fn();
  public doublePress = jest.fn();
  public increase = jest.fn();
  public decrease = jest.fn();
}

describe('InteractionConnector', () => {
  let adapter: InteractionAdapterImpl;
  let handler: InteractionHandler;
  let connector: InteractionConnector;

  beforeEach(() => {
    adapter = new InteractionAdapterImpl();
    connector = new InteractionConnector(adapter);
    handler = new InteractionHandlerImpl();

    connector.setIteractionHandler(handler);
  });

  test('should connect pressStart event to handler', () => {
    adapter.emitEvent(InteractionEventType.PressStart);

    expect(handler.pressStart).toBeCalled();
  });

  test('should connect moveDuringPress event to handler', () => {
    adapter.emitEvent(InteractionEventType.MoveDuringPress);

    expect(handler.moveDuringPress).toBeCalled();
  });

  test('should connect pressStop event to handler', () => {
    adapter.emitEvent(InteractionEventType.PressStop);

    expect(handler.pressStop).toBeCalled();
  });

  test('should connect press event to handler', () => {
    adapter.emitEvent(InteractionEventType.Press);

    expect(handler.press).toBeCalled();
  });

  test('should connect move event to handler', () => {
    adapter.emitEvent(InteractionEventType.Move);

    expect(handler.move).toBeCalled();
  });

  test('should connect doublePress event to handler', () => {
    adapter.emitEvent(InteractionEventType.DoublePress);

    expect(handler.doublePress).toBeCalled();
  });

  test('should connect increase event to handler', () => {
    adapter.emitEvent(InteractionEventType.Increase);

    expect(handler.increase).toBeCalled();
  });

  test('should connect decrease event to handler', () => {
    adapter.emitEvent(InteractionEventType.Decrease);

    expect(handler.decrease).toBeCalled();
  });
});
