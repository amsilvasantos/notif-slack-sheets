# notif-slack-sheets
<h2>Notificação no slack de alteração em planilha do google sheets - Google Apps Script</h2>

Este projeto consiste em um script escrito utilizando a biblioteca do Google Apps Script e a API do Slack para realizar notificações em um canal toda vez que o usuário do Google Sheets selecionar a opção "Chat". O objetivo principal é automatizar a comunicação entre os usuários da planilha e a equipe responsável.

Este projeto é útil para facilitar a comunicação entre os usuários da planilha e a equipe responsável pelos ajustes de saldo, garantindo que todos sejam notificados em tempo real sobre as atualizações e alterações feitas na planilha. Além disso, permite que a equipe responsável possa agir rapidamente e tomar as medidas necessárias.

Como os usuários podem começar a usar o projeto:

Os usuários podem começar a usar este projeto copiando a planilha do Google Sheets fornecida no link fornecido no repositório do GitHub e, em seguida, copiando e colando o script GS fornecido no editor de script do Google Sheets. Depois disso, basta salvar o script e a planilha e selecionar a opção "Chat" para começar a receber notificações no canal do Slack.

Script em GS:

```
function disparar(){  
const ss = SpreadsheetApp.openById('1--SNmUTOGUVWm6PSYfRHlzWxtOdwMnsfTEgKz1-ydnc');
const sheetBS = ss.getSheetByName('Sheet1');
var data =sheetBS.getDataRange().getValues();

  data.shift(); //"shift" deleta a primeira linha do array (Ou sejá os titulos)
  
  data.forEach(row =>{
    if(row[15] == true){
     chamado = row[16]
     status = row[14]
     sku = row[3]
     qtd = row[8]
      if(status == "Pendente"){
        message_registrada(chamado, status, sku, qtd)
      }else if(status == "Ajustado"){
        message_atualizada(chamado, status, sku, qtd)
      }else if(status == "Registro indevido"){
        message_indevida(chamado, status, sku, qtd)
      }

    }
  }
  ); 
   limpar()
}

var webhookUrl = "https://hooks.slack.com/services/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"

function message_registrada(chamado, status, sku, qtd) {
  var payload = {
    "channel" : "#sinais-prev-perdas",
    "username" : "Bot_Prevenção",
    "icon_url" : "https://puu.sh/BQqA9/408cadc2b3.png",
    "text" : "Ajuste de saldo",
    "attachments": [{
      "text": ":alert: " + "*Chamado*: " + chamado + ", adicionado a sheet para ajuste de saldo, " + "*sku*: " + sku + ", *qtd*: " + qtd,
      "footer": "<http://www.linktoyourscript.com|edit script>",
      "mrkdwn_in": ["text"]
    }]
  }
  
  var options = {
    "method" : "post",
    "contentType" : "application/json",
    "payload" : JSON.stringify(payload)
  };
 
  return UrlFetchApp.fetch(webhookUrl, options)
}

function message_atualizada(chamado, status, sku, qtd) {
  var payload = {
    "channel" : "#sinais-prev-perdas",
    "username" : "Bot_Prevenção",
    "icon_url" : "https://puu.sh/BQqA9/408cadc2b3.png",
    "text" : "Ajuste de saldo",
    "attachments": [{
      "text": "✔️ " + "Chamado: " + chamado + ", sku ajustado!" + " *sku*: " + sku + ", *qtd*: " + qtd,
      "footer": "<http://www.linktoyourscript.com|edit script>",
      "mrkdwn_in": ["text"]
    }]
  }
  
    var options = {
    "method" : "post",
    "contentType" : "application/json",
    "payload" : JSON.stringify(payload)
  };
 
  return UrlFetchApp.fetch(webhookUrl, options)
}

function message_indevida(chamado, status, sku, qtd) {
  var payload = {
    "channel" : "#sinais-prev-perdas",
    "username" : "Bot_Prevenção",
    "icon_url" : "https://puu.sh/BQqA9/408cadc2b3.png",
    "text" : "Ajuste de saldo",
    "attachments": [{
      "text": "🚫 " + "Chamado: " + chamado + ", registro indevido 💬Por favor verificar, " + "*sku*: " + sku + ", *qtd*: " + qtd,
      "footer": "<http://www.linktoyourscript.com|edit script>",
      "mrkdwn_in": ["text"]
    }]
  }
  
  var options = {
    "method" : "post",
    "contentType" : "application/json",
    "payload" : JSON.stringify(payload)
  };
 
  return UrlFetchApp.fetch(webhookUrl, options)
}
```

Link para copiar a planilha do google:
https://docs.google.com/spreadsheets/d/1qqvdKBckijFnpO5_gxWGyaGA6rAQvYr5JkXfJ8TAeQg/edit?usp=sharing


<h3>IMPORTANTE!</h3>
<li>Deve-se trocar o id da variavel <b>ss</b> pelo id da sua nova planilha, na função <b>disparar</b></li>




