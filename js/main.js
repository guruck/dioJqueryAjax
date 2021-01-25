window.addEventListener('load', () => {
  console.log('start');
  globalInput = document.querySelector('#inputCep');
  $(".escondido").hide();
  preventSubmit();
  activateInput();

});

function preventSubmit() {
  function handleFormSubmit(event) {
    event.preventDefault();
  }
  let form = document.querySelector('form');
  form.addEventListener('submit', handleFormSubmit);
}

function activateInput() {

  function handleTyping(event) {
    let hasText = !!event.target.value && event.target.value.trim() !== '';

    if (!hasText) {
      clearInput();
      return;
    }

    if (event.key === 'Enter') {
      consultaCep(event.target.value);
    }
  }

  globalInput.addEventListener('keyup', handleTyping);
}

function render(dados){
  console.log(dados);
  let table = document.createElement('table');
  let thead = document.createElement('thead');
  let tbody = document.createElement('tbody');
  let thr = document.createElement('tr');
  let th01 = document.createElement('th');
  let th02 = document.createElement('th');
  let keys = Object.keys(dados);

  table.className = "table table-striped table-bordered";
  th01.innerHTML = keys[0];
  th01.scope="col";
  th02.innerHTML = dados[keys[0]];
  th02.scope="col";

  thr.appendChild(th01);
  thr.appendChild(th02);
  thead.appendChild(thr);
  table.appendChild(thead);

  
  for (key in keys){
    if (key == 0) continue;
    let tr = document.createElement('tr');
    let tdTipo = document.createElement('td');
    let tdValor = document.createElement('td');
    tdTipo.innerHTML  = keys[key];
    tdValor.innerHTML = dados[keys[key]];
    tr.appendChild(tdTipo);
    tr.appendChild(tdValor);
    tbody.appendChild(tr);
    //console.log(keys[key] + "|" + dados[keys[key]]);
  }
  
  table.appendChild(tbody);
  let divCeps = document.querySelector('#retornoCep');
  divCeps.appendChild(table);
}

function consultaCep(cep){
  //let cep = "03276000";
  $.ajax({
    url: "https://viacep.com.br/ws/"+cep+"/json",
    type: "GET",
    success: function(response){
      // $('#retornoCep').html(response.logradouro);
      //$('#retornoCep').html(JSON.stringify(response));
      $('#retornoCep').html("");
      render(response);
      // let divCeps = document.querySelector('#retornoCep');
      // divCeps.innerHTML = '';
      // divCeps.innerHTML = response;
      // divCeps.innerHTML = JSON.stringify(response);
    }})
    .fail(function(response){
      $('#retornoCep').html("");
      let json = {"cep":"invalido"};
      render(json);
    }
  )
}