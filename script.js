$(document).ready(function(){

//0-7 low-high
var rules={
    Hate: 4,
    SelfHarm: 4,
    Sexual: 4,
    Violence: 4
};

var $comments = $('#comments');

var header = {
    "Content-Type":"application/json",
    "Ocp-Apim-Subscription-Key":"d2bf0fb2ea6a4783aedd6051aae33e68"
};

    $('#send').click( function(){

        var $txt = $('#input_textarea').val();

        console.log($txt);

        var body = {
            text: $txt,
            categories: [
              "Hate",
              "SelfHarm",
              "Sexual",
              "Violence"
            ],
            // "blocklistNames": [
            //   "string"
            // ],
            haltOnBlocklistHit: true,
            //outputType: "FourSeverityLevels"
             outputType: "EightSeverityLevels"
          };

        $.ajax({
            type: "POST",
            url: 'https://projektzaliczeniowy.cognitiveservices.azure.com/contentsafety/text:analyze?api-version=2023-10-01',
            data: JSON.stringify(body),
            headers: header,
            success: function(com){
                console.log(com);
                console.log(com.categoriesAnalysis[0].severity);
                if( com.categoriesAnalysis[0].severity >= rules.Hate ||
                    com.categoriesAnalysis[1].severity >= rules.SelfHarm ||
                    com.categoriesAnalysis[2].severity >= rules.Sexual ||
                    com.categoriesAnalysis[3].severity >= rules.Violence ){
                        alert("This comment is incompatible with our guidelines!")
                    }
                else{
                    $comments.append('<li>'+ $txt+'</li>');
                }
            },
            error: function(error) {
                
                console.error('Error:', error);
            }
        });

    });
});