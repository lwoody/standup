import Editor from '../Editor';

let ed = new Editor;

it('detect URL', () => {
    expect(ed.detectURL("my www.devpools.kr")).toEqual("www.devpools.kr");
});

it('hasValue 1', () => {
    expect(ed.hasValue(1)).toEqual(false);
});
it('hasValue 2', () => {
    expect(ed.hasValue(new Date)).toEqual(false);
});
it('hasValue 3', () => {
    expect(ed.hasValue("1")).toEqual(true);
});
it('hasValue 4', () => {
    expect(ed.hasValue()).toEqual(false);
});
it('hasValue 5', () => {
    expect(ed.hasValue({})).toEqual(false);
});
it('hasValue 6', () => {
    expect(ed.hasValue([])).toEqual(false);
});