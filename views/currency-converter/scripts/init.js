const countries = <%- JSON.stringify(countries) %>;

fx.base = "<%- rates.base %>";
fx.rates = <%- JSON.stringify(rates.rates) %>;

function find(e, index) {
  const id = $($('.flag')[index]).data('id');
  return e.code === id;
}

function update() {
  const x = $(input).val();
  if(isNaN(Number(x))) {
    alert(`${input} is not a number!`);
    return;
  }

  const inputs = $('.input');
  
  const c1 = countries.find(e => find(e, 0));
  const c2 = countries.find(e => find(e, 1));

  let convertTo1 = false;
  let convertTo2 = false;

  convertTo1 = c1;
  convertTo2 = c2;

  let a = false;

  a = fx.convert(x, {
    from: convertTo1.curr, to: convertTo2.curr
  });

  const end1 = new Intl.NumberFormat(
    `${c1.code}-${c1.code}`
    , { style: 'currency', currency: c1.curr }
  ).format(x);
  const end2 = new Intl.NumberFormat(
    `${c2.code}-${c2.code}`
    , { style: 'currency', currency: c2.curr }
  ).format(a);

  $(inputs[0]).val(end1);
  $(inputs[1]).val(end2);
}
