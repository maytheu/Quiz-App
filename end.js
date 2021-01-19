const username = document.getElementById("username")
const saveScoreBtn = document.getElementById('save-score');
const mostRecentScore = window.localStorage.getItem("mostRecentScore")
const finalScore = document.getElementById("score")
localStorage.getItem("highscore")
const highscore = JSON.parse(localStorage.getItem("highscore"))||[]
finalScore.innerText = mostRecentScore

const TOP5 = 5

username.addEventListener("keyup", () =>{
  saveScoreBtn.disabled = !username.value
})
saveHighScore = event =>{
  console.log(event)
  event.preventDefault()
 
  const score = {
  score: mostRecentScore,
  user: username.value
}

highscore.push(score)
highscore.sort((a,b) => b.score - a.score)
highscore.splice(TOP5)

localStorage.setItem("highscore", JSON.stringify(highscore))

window.location.assign("/")
}

