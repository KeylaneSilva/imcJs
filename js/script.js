document.getElementById('formulario').addEventListener('submit', calcular);

function calcular(e){
    var nome = document.getElementById('nome_imc').value;
    var peso = document.getElementById('peso_imc').value;
    var altura = document.getElementById('altura_imc').value;
    var situacao = '';

    //verificação dos campos
    if(!nome && !peso && !altura){
        alert('Preencha os campos');
        return false;
    }

    //limpando os campos
    document.getElementById('formulario').reset();
    
    //calculo do imc
    var imc = parseFloat(peso/(altura*altura)).toFixed(2);
    var pesoIdeal = parseFloat(18.5/(altura*2)*10).toFixed(2); 
    
    if(imc < 18.5){
        situacao = "Abaixo do peso!! Seu peso ideial é: " + pesoIdeal;
    }else if(imc > 18.6 && imc < 24.9){
        situacao = "Peso ideal (Parabens!)";
    }else if(imc > 25 && imc < 29.9){
       situacao = "Levemente acima do peso! Seu peso ideial é: " + pesoIdeal;
    }else if(imc > 30 && imc < 34.9){
        situacao = "Obesidade grau 1 Seu peso ideial é: " + pesoIdeal;
    }else if(imc > 35 && imc < 39.9){
        situacao = "Obesidade grau dois (Severa)! Seu peso ideial é: " + pesoIdeal;
    }else if(imc > 40){
        situacao = "Obesidade grau 3 (Mórbida)! Seu peso ideial é: " + pesoIdeal;
    }

    dado = {
        nome_imc: nome,
        peso_imc: peso,
        altura_imc: altura,
        tot_imc: imc,
        situacao_imc: situacao 
    }


    //armazendo os dados
    if(localStorage.getItem('armazdados') == null){
        var dados = [];
        dados.push(dado);
        localStorage.setItem('armazdados', JSON.stringify(dados));
    }else{
        var dados = JSON.parse(localStorage.getItem('armazdados'));
        dados.push(dado);
        localStorage.setItem('armazdados', JSON.stringify(dados));
    }

    e.preventDefault();
    mostrarCadastros();
}

//excluir cadastros || não funciona
function excluirCadastros(imc){
    var dados = JSON.parse(localStorage.getItem('armazdados'));

    for(var i = 0; i < dados.length; i++){
        if(dados[i].tot_imc == imc){
            dados.splice(i, 1); //na posição i, remova um elemento
        }
        localStorage.setItem('armazdados', JSON.stringify(dados));
        mostrarCadastros();
    }
}

//mostrar cadastros
function mostrarCadastros(){
    var dados = JSON.parse(localStorage.getItem('armazdados'));
    var resultadoCastastros = document.getElementById('resultados_table');

    resultadoCastastros.innerHTML = '';
    
    for(var i=0; i < dados.length; i++){
        var nome = dados[i].nome_imc;
        var peso = dados[i].peso_imc;
        var altura = dados[i].altura_imc;
        var imc = dados[i].tot_imc;
        var situacao = dados[i].situacao_imc; 

        resultadoCastastros.innerHTML += '<tr><td>' + nome +
                                            '</td><td>' + peso +
                                            '</td><td>' + altura +
                                            '</td><td>' + imc +
                                            '</td><td>' + situacao + 
                                            '</td><td> <button class="btn btn-danger" onclick="excluirCadastros(\'' + imc + '\')">Excluir'
                                            '</td></tr>'; 
    }
}
