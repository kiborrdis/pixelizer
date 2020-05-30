import { Tool } from './Tool';
import { InteractionRecord } from '../recorders/InteractionRecord';

class MockTool extends Tool<InteractionRecord> {
    applyToContext() {}
}

describe('Tool', () => {
    test('should serialize with class name type', () => {
        const tool = new MockTool();

        expect(tool.serialize()).toEqual({
            type: MockTool.name,
        });
    });
});
