import { History } from './History';
import { InteractionRecord } from './InteractionRecord';
import { Tool } from './Tool';
import { Action } from './interfaces/Action';
import { Mutation } from './interfaces/Mutation';

class MockTool extends Tool {}

function createAction(): Action {
  return {
    tool: new MockTool(),
    record: new InteractionRecord(),
    style: {
      color: Math.random().toString(36).substring(7),
    },
  };
}

describe('Canvas', () => {
  let history: History;
  let rootCheckpoint: ImageData;

  beforeEach(() => {
    rootCheckpoint = new ImageData(1, 1);
    history = new History(rootCheckpoint);
  });

  test('should return mutation with single action and no checkpoint on add', () => {
    const action = createAction();

    const mutation = history.add(action);

    expect(mutation.actions).toEqual([ action ]);
    expect(mutation.checkpoint).toBeUndefined();
  });

  test('should return mutation with all but last action and root checkpoint on back', () => {
    const action = createAction();
    const action1 = createAction();
    const action2 = createAction();

    history.add(action);
    history.add(action1);
    history.add(action2);

    const mutation = history.back();

    expect(mutation.actions).toEqual([ action, action1 ]);
    expect(mutation.checkpoint).toBe(rootCheckpoint);
  });

  test(`"back" should return mutation with
          all but last action between last checkpoint and current action if checkpoint been added`, () => {
    const action = createAction();
    const action1 = createAction();
    const action2 = createAction();

    history.add(action);
    history.add(action1);
    history.add(action2);

    const checkpoint = new ImageData(2, 2);

    history.addNewCheckpoint(checkpoint);

    const action3 = createAction();
    const action4 = createAction();
    const action5 = createAction();

    history.add(action3);
    history.add(action4);
    history.add(action5);

    const mutation = history.back();

    expect(mutation.actions).toEqual([action3, action4]);
    expect(mutation.checkpoint).toBe(checkpoint);
  });
});
