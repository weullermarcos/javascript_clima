

//interceptando o formulario ao ser submetido
document.querySelector('.busca').addEventListener('submit', async (event)=>{

    //remove o evento padrão do elemento, que no caso do forumlário seria o envio
    event.preventDefault();

    //recupera o valor do input
    let input = document.querySelector('#searchInput').value;

    if(input != ''){

        showMessage('Carregando...');

        //monta a url
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=4f322f7b8986f48af4fc22fbacacb579&units=metric&lang=pt_br`;

        //realiza a requisição
        let results = await fetch(url);
        //transform em json
        let json = await results.json();

        //se encontrar a localização
        if(json.cod === 200){

            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg,

            });

        }
        else{

            clearInfo();
            showMessage('Não encontramos essa localização');
        }
    }

});

function showInfo(json){

    showMessage('');

    //preenchendo informações
    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`;
    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle-90}deg)`;

    //exibindo informações
    document.querySelector('.resultado').style.display = 'block';
}

//função para atribuir mensagem
function showMessage(msg){

    //seta na div a mensagem recebida
    document.querySelector('.aviso').innerHTML = msg;
}

//limpa informações
function clearInfo(){

    showMessage('');
    document.querySelector('.resultado').style.display = 'none';
}


