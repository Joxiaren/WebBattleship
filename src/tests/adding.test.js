import { adding } from '../scripts/adding.js';

test('adding with function check', () =>{
    expect(adding(2, 2)).toBe(4);
})