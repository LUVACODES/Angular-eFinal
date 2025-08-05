import { BigTitle } from "./big-title";

describe('BigTitle', () => {
  it('should create an instance', () => {
    const directive = new BigTitle('' as any, '' as any);
    expect(directive).toBeTruthy();
  });
});