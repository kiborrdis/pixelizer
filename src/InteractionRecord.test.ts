import { InteractionRecord } from './InteractionRecord';

describe('InteractionRecord', () => {
  test('should serialize with class name type', () => {
    const record = new InteractionRecord();

    expect(record.serialize()).toEqual({
      type: InteractionRecord.name,
    });
  });
});
