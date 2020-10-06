function listaItem(opcao) {
  // Hide all elements with class="tabcontent" by default */
  console.log(opcao)
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
 
  // Remove the background color of all tablinks/buttons
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].style.backgroundColor = "";
  }

  // Show the specific tab content
  document.getElementById(opcao).style.display = "flex";
}

fetch('./data.json')
  .then(function (resp) {
    return resp.json();
  })
  .then(function (data) {

    const categorias = [];
    var categoria = 'a';
    var subcategoria = 'h';
    
    data.map((item) => {
      const index = categorias.indexOf(item.categoria);
      if (index === -1) {
        categorias.push(item.categoria);
        var btn = document.createElement("BUTTON");
        btn.innerHTML = item.categoria;
        btn.classList.add("tablink");
        document.getElementById('cardapio_buttons').appendChild(btn);
        var divCategories = document.createElement("DIV");
        divCategories.id = item.categoria;
        divCategories.classList.add("tabcontent");
        if (categorias.length === 1) {
          divCategories.classList.add("defaultOpen");
        }
        else {
          divCategories.style.display = "none";
        }

        document.getElementById('products_container').appendChild(divCategories);
        btn.onclick = function (event) {
        listaItem(item.categoria);}
      }

    })

    data.map((item) => {
      console.log(subcategoria);
      console.log(item.subcategoria);
      console.log(categoria);
      console.log(item.categoria);
      if (item.categoria !== categoria) {
        if (categoria !== 'a') {
          subcategoria = 'h';
        }
        categoria = item.categoria;
      }
      if (subcategoria !== item.subcategoria) {
        if (item.subcategoria !== '') {
          var title3 = document.createElement("h3");
          title3.textContent = item.subcategoria;
          document.getElementById(item.categoria).appendChild(title3);
        }
        var divSubCategories = document.createElement("DIV");
        if (item.subcategoria === '') {
          divSubCategories.id = 'sub'+item.categoria;
         }
        else {
          divSubCategories.id = item.subcategoria.split(' ').join('');
          subcategoria = item.subcategoria.split(' ').join('');
        }
        divSubCategories.classList.add("subcategoria");
        document.getElementById(item.categoria).appendChild(divSubCategories);
      }
  
      var details = document.createElement("details");
      details.id = item.nome;
      details.innerHTML = '<Div class="info-nutricional">' +
                          '<br>' + '<Div class="box">' + 'INFORMAÇÃO NUTRICIONAL' + '</Div>' + '<br>' +
                          '<Div class="box">' + 'Porção de 100g(' + item.porção + ')' + '</Div>' + '<br>' +
                          '<Div class="linha">' + 
                          '<Div class="box1">' + '' + '</Div>' +
                          '<Div class="box2">' + 'Qtde por porção' + '</Div>' +
                          '<Div class="box3">' + '%VD(*)' + '</Div>' +
                          '</Div>' + 
                          '<Div class="linha">' + 
                          '<Div class="box1">' + 'Valor energético: ' + '</Div>' + 
                          '<Div class="box2">' + item.valorenergetico + '</Div>' +
                          '<Div class="box3">' + item.valorenergeticoP + '</Div>' +
                          '</Div>' +
                          '<Div class="linha">' + 
                          '<Div class="box1">' + 'Carboidratos: ' + '</Div>' +
                          '<Div class="box2">' + item.carboidratos + '</Div>' +
                          '<Div class="box3">' + item.carboidratosP + '</Div>' +
                          '</Div>' +
                          '<Div class="linha">' +
                          '<Div class="box1">' + 'Proteínas: ' + '</Div>' +
                          '<Div class="box2">' + item.proteinas + '</Div>' +
                          '<Div class="box3">' + item.proteinasP + '</Div>' +
                          '</Div>' + 
                          '<Div class="linha">' +
                          '<Div class="box1">' + 'Gorduras totais: ' + '</Div>' +
                          '<Div class="box2">' + item.gtotal + '</Div>' +
                          '<Div class="box3">' + item.gtotalP + '</Div>' +
                          '</Div>' +
                          '<Div class="linha">' + 
                          '<Div class="box1">' + 'Gorduras saturadas: ' + '</Div>' +
                          '<Div class="box2">' + item.gsaturada + '</Div>' +
                          '<Div class="box3">' + item.gsaturadaP + '</Div>' +
                          '</Div>' +
                          '<Div class="linha">' +
                          '<Div class="box1">' + 'Gorduras trans: ' + '</Div>' +
                          '<Div class="box2">' + item.gtrans + '</Div>' +
                          '<Div class="box3">' + item.gtransP + '</Div>' +
                          '</Div>' +
                          '<Div class="linha">' + 
                          '<Div class="box1">' + 'Fibras: ' + '</Div>' +
                          '<Div class="box2">' + item.fibras + '</Div>' +
                          '<Div class="box3">' + item.fibrasP + '</Div>' +
                          '</Div>' +
                          '<Div class="linha">' +
                          '<Div class="box1">' + 'Sódio: ' + '</Div>' +
                          '<Div class="box2">' + item.sodio + '</Div>' +
                          '<Div class="box3">' + item.sodioP + '</Div>' +
                          '</Div>' + '<br>' +
                          '(*) % Valores Diários de referência com base em uma dieta de 2.000 kcal ou 8.400 kJ. Seus valores diários podem ser maiores ou menores dependendo de suas necessidades energéticas.' + '<br>' + '<br>' +
                          '(**) Valores diários não estabelecidos' + '<br>' + '<br>' +
                          item.ingredientes + '<br>' + '<br>' +
                          'ALÉRGICOS: ' + item.alergicos +
                          '</Div>';

      if (item.subcategoria === '') {
        document.getElementById('sub'+item.categoria).appendChild(details);
      }
      else {
        document.getElementById(item.subcategoria.split(' ').join('')).appendChild(details);
      }
      var summary = document.createElement("summary");
      summary.innerHTML = item.nome;
      document.getElementById(item.nome).appendChild(summary);

      subcategoria = item.subcategoria
    })
  });