const expect = require('expect');
var {isRealString} = require('./validation');

describe('isRealString',()=>{
  it('should reject non-string values',()=>{
    var res = isRealString(98);
    expect(res).toBe(false)
  });

  it('should reject strings with only spaces',()=>{
    var res = isRealString('       ');
    expect(res).toBe(false);
  });

  it('should allow strings with non-space characters', ()=>{
    var res = isRealString('   Tom    ');
    expect(res).toBe(true)
  })
});

//impost isRealString

//isRealString

//should reject non-string values

//should reject strings with only spaces

//should allow strings with non-space characters
