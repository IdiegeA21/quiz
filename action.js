

// the date set here is used to open the quiz for a period of time


    // const targetTime = new Date("2023-09-11T00:00:00"); // inital date for usage 2022, then used again in September 2,  2023 23:59:00
    const targetTime = new Date("2027-09-11T00:00:00");
    const currentTime = new Date();
    const targetDate = new Date('2023-09-01T23:35:00');// this is for testing
    const newTime = targetTime - currentTime;


if(newTime > 0){
  
const timerElement = document.getElementById("timer");
function startTimer(duration) {
  let timer = duration;
  const timerElement = document.getElementById("timer");

  const interval = setInterval(function() {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;

    timerElement.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

    if (--timer < 0) {
      clearInterval(interval);
      timerElement.textContent = "Time's up!";
      let endTime = 0
      submit(endTime);
    }
  }, 1000);
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
function generate() {
  const userQuestions = shuffleArray(mainQuiz);
  const qs = userQuestions.slice(0, 30);
  localStorage.setItem("question", JSON.stringify(qs));
}
const a = document.getElementById("err");
const que =  document.getElementById("this-que");
const op1 =  document.getElementById("firstRadio");
const op2 =  document.getElementById("secondRadio");
const op3 =  document.getElementById("thirdRadio");
const op4 =  document.getElementById("forthRadio");
const lb1 =  document.getElementById("label1");
const lb2 =  document.getElementById("label2");
const lb3 =  document.getElementById("label3");
const lb4 =  document.getElementById("label4");
const ns = document.getElementById("ns");
const number = document.querySelector(".q-number");
let count = 0;
let score = 0;

function place() {
  const themq =  localStorage.getItem("question");
  const q = JSON.parse(themq)
  number.textContent = count + 1;
  if(count == 30){
    let timerInterval
    Swal.fire({
      title: 'Submitting!',
      html: 'submitting in <b></b> milliseconds.',
      timer: 5000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
        const b = Swal.getHtmlContainer().querySelector('b')
        timerInterval = setInterval(() => {
          b.textContent = Swal.getTimerLeft()
        }, 100)
      },
      willClose: () => {
        clearInterval(timerInterval)
      }
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        let endTime = timerElement.innerText;
        submit(endTime);
      }
    });

  }else if(count == 29){
    ns.textContent = "Submit";  
    que.textContent = q[count].que;
    op1.setAttribute("value", q[count].options.opt1);
    lb1.textContent = q[count].options.opt1;
    op1.setAttribute("value", q[count].options.opt1);
    lb1.textContent = q[count].options.opt1;
    op2.setAttribute("value", q[count].options.opt2);
    lb2.textContent = q[count].options.opt2;
    op3.setAttribute("value", q[count].options.opt3);
    lb3.textContent = q[count].options.opt3;
    op4.setAttribute("value", q[count].options.opt4);
    lb4.textContent = q[count].options.opt4;
  }else{
    que.textContent = q[count].que;
    op1.setAttribute("value", q[count].options.opt1);
    lb1.textContent = q[count].options.opt1;
    op1.setAttribute("value", q[count].options.opt1);
    lb1.textContent = q[count].options.opt1;
    op2.setAttribute("value", q[count].options.opt2);
    lb2.textContent = q[count].options.opt2;
    op3.setAttribute("value", q[count].options.opt3);
    lb3.textContent = q[count].options.opt3;
    op4.setAttribute("value", q[count].options.opt4);
    lb4.textContent = q[count].options.opt4;
  }
  let sol = q[count].answer
  sol = q[count].options[sol];
  a.setAttribute("value", sol);
  const che =  document.querySelector('input[type="radio"]:checked');
  che ? che.checked = false: null;
  count++;
}
function stufTk(t){
  let presentScore = localStorage.getItem("score");
  presentScore= JSON.parse(presentScore);
  presentScore = t == 1 ? presentScore + 1 : presentScore + 0;
  localStorage.setItem("score", presentScore);
  console.log(localStorage.getItem("score"));
}
function result(tk) {
  if(!localStorage.getItem("score")){
    localStorage.setItem("score", 0);
    stufTk(tk)
  }else{
    stufTk(tk)
  }
}
function marker() {
  const selected =  document.querySelector('input[type="radio"]:checked');
  if(selected){
    if(a.value == selected.value){
      result(true);
    }else{
      result(false);
    }
  }else{
    result(false)
  }
}
function subFinal() {
  let num = localStorage.getItem("score");
  num = JSON.parse(num);
  num = 100 * (num / 30);
  let number = num.toFixed(1);
  return number;
}
function submit(timeEnd){
  let userScore = subFinal();
  let scoreDetials = {
    score: userScore,
    time: timeEnd
  };
  localStorage.setItem("score", JSON.stringify(scoreDetials));

  let timerInterval
  Swal.fire({
    title: 'Time up!',
    html: 'Quiz auto submitting in <b></b> milliseconds.',
    timer: 5000,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading()
      const b = Swal.getHtmlContainer().querySelector('b')
      timerInterval = setInterval(() => {
        b.textContent = Swal.getTimerLeft()
      }, 100)
    },
    willClose: () => {
      clearInterval(timerInterval)
    }
  }).then((result) => {
    if (result.dismiss === Swal.DismissReason.timer) {
      showResult();
    }
  })
}
function showResult(){
  window.location.replace("/result.html");
}
ns.addEventListener("click", (e) => {
  e.preventDefault();
  marker();
  place();
});



const storedUser = localStorage.getItem("userInfo");
const user = JSON.parse(storedUser);
window.addEventListener("load", () => {
    setTimeout(() => {
      const boom = document.getElementById("loadingScreen");
      boom.style.height = "0";
      boom.style.display = "none";
      document.getElementById("acMain").style.display = "flex";

      if(user == null){
        document.write("<h1>sessions expired</h1>");
      }else{
        let timerInterval

        Swal.fire({
        title: 'Generating your Questions!',
        html: 'Quiz begins in <b></b> milliseconds.',
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading()
            const b = Swal.getHtmlContainer().querySelector('b')
            timerInterval = setInterval(() => {
            b.textContent = Swal.getTimerLeft()
            }, 100)
        },
        willClose: () => {
            clearInterval(timerInterval)
        }
        }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
            Swal.fire(
                `GoodLuck ${user.name}!!`,
                'Your time starts now.',
                'info'
            );
            if (!localStorage.getItem("visitedBefore")) {
                const time = 20*60;
                setTimeout(startTimer(time), 2000);
                generate();
                place();
                document.getElementById("aciton").style.display = "flex";
                localStorage.setItem("visitedBefore", "true");
            } else {
                console.log("You have already taken this quiz");
              window.location.replace("/result.html");
            }
        }
        })
      }
    }, 1000);
});

}else{
  setTimeout(() => {
    document.write("<h1>Sorry the page you are trying to access is no longer available</h1>");
    console.log("Time's out!!!")
  },8000);
}



