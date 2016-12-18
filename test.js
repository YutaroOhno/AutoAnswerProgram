
var questions = $('.question-box.mb20')

$.each(questions,function(index, val){
  if ($($(val)[0]).children().hasClass("fancy-radio")){
    numberAjax(index);
  }else{
    maruBatsuAjax(index);
  }
})

// 番号
function numberAjax(index){
  var current_url = window.location.href;
  var answer_url = current_url.replace(/init:true/, "explain:true#q_container_1");
  $.ajax({
    url: answer_url,
    type: 'GET',
    context:{
      number: index
    }
  }).done(function(data){
      var answer_form_number = this.number + 1;
      var answer_number =  $($(data).find("#q_container_"+answer_form_number)).find("tbody td:nth(1)").text().match(/[1-4]/);
      // answer(answer_symbol)
      var post_form = $('#ExamPracticeAnswerForm').find('.question-box.mb20')[this.number];

      // $(post_form).find("a:contains('"+answer_number+"')")[0].click();
      var collect_select = answer_number-1;
      $(post_form).find($('input[type="radio"]'))[collect_select].click();
    }).fail(function(data){
    console.log("どんまい");
    });
}


// まるばつ
function maruBatsuAjax(index){
  var current_url = window.location.href;
  var answer_url = current_url.replace(/init:true/, "explain:true#q_container_1")
  $.ajax({
    url: answer_url,
    type: 'GET',
    context:{
      number: index
    }
  }).done(function(data){
      var answer_form_number = this.number + 1;
      var answer_symbol = $($(data).find("#q_container_"+answer_form_number)).find("tbody td:nth(1)").text().match(/◯|X/);
      var post_form = $('#ExamPracticeAnswerForm').find('.question-box.mb20')[this.number];
      $(post_form).find("a:contains('"+answer_symbol+"')")[0].click();
    }).fail(function(data){
    console.log("どんまい");
    });
}
