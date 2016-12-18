function closeModal(){
    $('.close').click();
  }

function returnAjax(){
  var href = window.location.href ;
  var answer_url = href.replace(/question/, "answer") + "/js:true";
  return $.ajax({
    type: "GET",
    url: answer_url
  });
}

// 四択(1234)
function numberQuestion(){

  returnAjax().done(function(data){
    out_html = $($.parseHTML(data));
    var answer_number =  out_html.find('.pull-left.answer-right-text').html().match(/[0-9]/);
    answer(answer_number);
    setTimeout(closeModal, 1000);
    setTimeout(nextArea, 1500);
  }).fail(function(data){
  console.log("どんまい");
  });

  function answer(number){
    parseInt(number[0]);
  $('input[name="data[Practice][answer]"]:eq(' + number[0] + ')').prop('checked', true);
  $('.btn.btn-primary.btn-answer.btn-block').click();
  }

  function nextArea(){
    var next_link = $('.btn.btn-primary.btn-answer.btn-block').prop('href')
    location.href = next_link
  }
}

// ○X
function maruBatsuQuestion(){

  returnAjax().done(function(data){
    console.log(data);
    out_html = $($.parseHTML(data));
    var answer_symbol =  out_html.find('.pull-left.answer-right-text').html().match(/◯|X/)
    answer(answer_symbol);
    setTimeout(closeModal, 1000);
    setTimeout(nextArea, 1500);
  }).fail(function(data){
  console.log("どんまい");
  });

  function answer(symbol){
    $("a:contains('"+symbol[0]+"')").click();
  }

  function nextArea(){
    var next_link = $('.btn.btn-primary.btn-next.btn-block').prop('href')
    location.href = next_link
  }
}

// 四択（ABCD）
function alphabetQuestion(){

  returnAjax().done(function(data){
    console.log(data);
    out_html = $($.parseHTML(data));
    var answer_alpha =  out_html.find('.pull-left.answer-right-text').html().match(/A|B|C|D/);
    answer(answer_alpha);
    setTimeout(closeModal, 1000);
    setTimeout(nextArea, 1500);
  }).fail(function(data){
  console.log("どんまい");
  });

  function answer(alpha){
    var alpha_number = {"A": "1", "B": "2", "C": "3", "D": "4"};
    var answer_number = alpha_number[alpha[0]];
  $('input[name="data[Practice][answer]"]:eq(' + answer_number + ')').prop('checked', true);
  $('.btn.btn-primary.btn-answer.btn-block').click();
  }

  function nextArea(){
    var next_link = $('.btn.btn-primary.btn-answer.btn-block').prop('href')
    location.href = next_link
  }
}

// 番号たくさん(複数チェック)
function manyNumbers(){

  returnAjax().done(function(data){
    console.log(data);
    out_html = $($.parseHTML(data));

    var answer_numbers =  out_html.find('.pull-left.answer-right-text').html().match(/[1-9]/g)
    var unique_numbers = answer_numbers.filter(function (x, i, self) {
            return self.indexOf(x) === i;
        });
    answer(unique_numbers.join("|"));
    // debugger
    setTimeout(closeModal, 1000);
    setTimeout(nextArea, 1500);
  }).fail(function(data){
  console.log("どんまい");
  });

  function answer(separated_numbers){
    var item = $('#practiceForm').find(".fancy-checkbox");
    for(var i = 0; i < item.length; i++ ){
      if($($(item[i]).find("span.no")[0]).html().match(separated_numbers)){
        var num = i + 1;
        var item_number = $($(item[i]).find("span.no")[0]).html().match(separated_numbers);
        if (num == item_number){
          $("input[name='data[Practice][answer]["+num+"]']").click();
        }else{
        }
      }else{
      }
    }
    $('.btn.btn-primary.btn-answer.btn-block').click();
  }


  function nextArea(){
    var next_link = $('.btn.btn-primary.btn-answer.btn-block').prop('href')
    location.href = next_link
  }
}

// よくわかんない質問
// 解答無いのに解答とるようにしたので、コード間違っています。
function undefinedQuestion(){
  $('.btn.btn-primary.btn-block.open_ans').click();
  returnAjax().done(function(data){
    console.log(data);
    out_html = $($.parseHTML(data));
    var answer_sentence =  out_html.find('.text-center').html().match(/正解|不正解/)
    answer(answer_sentence);
    setTimeout(closeModal, 1000);
    setTimeout(nextArea, 1500);
  }).fail(function(data){
  console.log("どんまい");
  });

  function answer(answer_sentence){
    debugger
    var convert_gate = {"正解": "X", "不正解": "◯"};
    var collect_symbol = convert_gate[`${answer_sentence}`];
    $("a:contains('"+collect_symbol+"')")[0].click();
  }


  function nextArea(){
    var next_link = $('.btn.btn-primary.btn-next.btn-block').prop('href')
    location.href = next_link
  }
}

// 記述の質問
function writeQuestion(){
// $.ajax({
//   url: "javascript:void(0)",
//   type: "GET"
// }).done(function(data){
//   debugger
// }).fail(function(data){
//
// });
// //
//     // var href = window.location.href ;
//     // var answer_url = href.replace(/question/, "answer") + "/js:true"
//     var answer_sentence = $('.kaisetsu_contents')[0].innerText.replace(/\s/g, "").replace(/（）：不正解/,"")
//       answer(answer_sentence);
//
//     // $.ajax({
//     //   type: "GET",
//     //   url: answer_url
//     // }).done(function(data){
//     //   console.log(data);
//     //   out_html = $($.parseHTML(data));
//     //   var answer_sentence =  out_html.find('.pull-left.answer-right-text').text().replace(/\s/g, "")
//     //   answer(answer_sentence);
//     //   setTimeout(closeModal, 1000);
//     //   setTimeout(nextArea, 1500);
//     // }).fail(function(data){
//     // console.log("どんまい");
//     // });
//
//     function answer(answer_sentence){
//       debugger
//       $('.calculator.form-control')[0].value = `${answer_sentence}`
//       $('.btn.btn-primary.btn-answer.btn-block').click();
//     }
//
//     function closeModal(){
//       $('.close').click();
//     }
//
//     function nextArea(){
//       var next_link = $('.btn.btn-primary.btn-next.btn-block').prop('href')
//       location.href = next_link
//     }
}

// 問題種別
function startAnswer(){

  if($('.btn.btn-block.btn-default.btn-alter').html() == undefined){
    if ($('.fancy-radio span')[1]){
      if($('.fancy-radio span')[1].innerHTML.match(/1/) == 1){
        numberQuestion();
      }else if($('.fancy-radio span')[1].innerHTML.match(/A/) == "A"){
        alphabetQuestion();
      }else if($('#practiceForm').find(".fancy-checkbox")){
        manyNumbers();
      }
    }else{
      manyNumbers();
    }
  }else{
    if ($('.btn.btn-primary.btn-block.open_ans').html()=="解答"){
      if($('.calculator.form-control')[0] == undefined){
        undefinedQuestion();
        // 解答がとれん。。。
      }else if($('.calculator.form-control')[0]){
        writeQuestion();
        // 解答がとれん。。。
      }
    }else if($('.btn.btn-block.btn-default.btn-alter').html().match(/◯/) == "◯"){
      maruBatsuQuestion();
    }
  }
}

startAnswer()
