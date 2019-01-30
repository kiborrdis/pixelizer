import { Tool } from './Tool';

class MockTool extends Tool {}

describe('Tool', () => {
  test('should serialize with class name type', () => {
    const tool = new MockTool();

    expect(tool.serialize()).toEqual({
      type: MockTool.name,
    });
  });
});
