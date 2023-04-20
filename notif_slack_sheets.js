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