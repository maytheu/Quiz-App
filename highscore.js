const scores = document.getElementById("highscorelist")
const highscore = JSON.parse(localStorage.getItem("highscore")) ||[]

scores.innerHTML = highscore.map(score =>{
  return `<li class="high-score">${score.user} - ${score.score}</li>`;
  })
  .join("");
