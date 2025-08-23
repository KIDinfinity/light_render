(() => {
  const mainContent = document.getElementsByClassName('main-content');
  const body = mainContent[0].getElementsByTagName('tbody')[0];
  const trs = body.getElementsByTagName('tr');
  const colors = [];
  Array.from(trs).forEach(tr => {
    const tds = tr.getElementsByTagName('td');
    const tdValues = Array.from(tds).map(el => el.innerHTML);
    const reg = /(<code>)([a-z]{1,})(<\/code>)/;
    const colorName = tdValues.find(i => reg.test(i));
    let name = '';
    if (colorName){
      sp = colorName.split(reg);
      name = sp.find(i => /[a-z]{1,}$/.test(i));
      if (!name) {
        console.log('nnnn', sp);
      }
    }
    const hexReg = /(<code>)(#[a-z|0-9]{6,6})(<\/code>)/;
    const hextd = tdValues.find(i => hexReg.test(i));
    let colorValue = '';
    if (hextd) {
       const colorSP = hextd.split(hexReg);
       colorValue = colorSP.find(i=> /#[0-9|a-z]{6,6}/.test(i));
    } else {
      console.log('not map hexed', tdValues);
    }
    if (name && colorValue){
      colors.push({
        name,
        hex: colorValue
      })
    } else {


    }
  });
  })()
