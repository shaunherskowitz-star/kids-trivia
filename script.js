const questionBank=[
{age:"5-7",category:"Animals",q:"What animal says moo?",a:["Cow","Dog","Cat","Duck"],correct:"Cow"},
{age:"5-7",category:"Animals",q:"Which animal has a long trunk?",a:["Elephant","Lion","Horse","Frog"],correct:"Elephant"},
{age:"5-7",category:"Animals",q:"What do bees make?",a:["Honey","Milk","Bread","Juice"],correct:"Honey"},
{age:"5-7",category:"Science",q:"What do plants need from the sun?",a:["Sunlight","Snow","Rocks","Shoes"],correct:"Sunlight"},
{age:"5-7",category:"Science",q:"What do we breathe in?",a:["Air","Paint","Sand","Glue"],correct:"Air"},
{age:"5-7",category:"Geography",q:"Where do fish live?",a:["Water","Clouds","Trees","Desert"],correct:"Water"},
{age:"5-7",category:"Food",q:"Which fruit is usually yellow?",a:["Banana","Blueberry","Grape","Cherry"],correct:"Banana"},
{age:"5-7",category:"Sports",q:"What do you kick in soccer?",a:["A ball","A puck","A bat","A helmet"],correct:"A ball"},
{age:"5-7",category:"Space",q:"What shines in the sky during the day?",a:["The sun","The moon","A kite","A boat"],correct:"The sun"},
{age:"5-7",category:"History",q:"What do we call stories about the past?",a:["History","Math","Lunch","Music"],correct:"History"},
{age:"8-10",category:"Animals",q:"Which animal is the fastest land animal?",a:["Cheetah","Tiger","Zebra","Bear"],correct:"Cheetah"},
{age:"8-10",category:"Animals",q:"What is a baby frog called?",a:["Tadpole","Cub","Calf","Chick"],correct:"Tadpole"},
{age:"8-10",category:"Science",q:"What force pulls things toward Earth?",a:["Gravity","Magnetism","Electricity","Friction"],correct:"Gravity"},
{age:"8-10",category:"Science",q:"Water freezes at what temperature in Celsius?",a:["0°C","10°C","50°C","100°C"],correct:"0°C"},
{age:"8-10",category:"Geography",q:"What is the largest ocean on Earth?",a:["Pacific Ocean","Atlantic Ocean","Indian Ocean","Arctic Ocean"],correct:"Pacific Ocean"},
{age:"8-10",category:"Geography",q:"Which country has the city Paris?",a:["France","Spain","Italy","Germany"],correct:"France"},
{age:"8-10",category:"Food",q:"What food group gives you strong bones?",a:["Dairy","Candy","Soda","Chips"],correct:"Dairy"},
{age:"8-10",category:"Sports",q:"How many bases are on a baseball field?",a:["4","2","5","6"],correct:"4"},
{age:"8-10",category:"Space",q:"Which planet is known as the Red Planet?",a:["Mars","Venus","Saturn","Neptune"],correct:"Mars"},
{age:"8-10",category:"History",q:"Who was the first president of the United States?",a:["George Washington","Abraham Lincoln","John Adams","Thomas Jefferson"],correct:"George Washington"},
{age:"11-13",category:"Animals",q:"What type of animal is a Komodo dragon?",a:["Lizard","Snake","Bird","Mammal"],correct:"Lizard"},
{age:"11-13",category:"Animals",q:"What do we call animals that eat both plants and meat?",a:["Omnivores","Herbivores","Carnivores","Producers"],correct:"Omnivores"},
{age:"11-13",category:"Science",q:"What is the process plants use to make food?",a:["Photosynthesis","Evaporation","Condensation","Erosion"],correct:"Photosynthesis"},
{age:"11-13",category:"Science",q:"What particle has a negative charge?",a:["Electron","Proton","Neutron","Atom"],correct:"Electron"},
{age:"11-13",category:"Geography",q:"What imaginary line divides Earth into Northern and Southern Hemispheres?",a:["Equator","Prime Meridian","Tropic of Cancer","Arctic Circle"],correct:"Equator"},
{age:"11-13",category:"Geography",q:"Which continent is Egypt in?",a:["Africa","Asia","Europe","Australia"],correct:"Africa"},
{age:"11-13",category:"Food",q:"Carbohydrates mainly give your body what?",a:["Energy","Vision","Height","Hair color"],correct:"Energy"},
{age:"11-13",category:"Sports",q:"In basketball, how many points is a shot behind the arc worth?",a:["3","1","2","4"],correct:"3"},
{age:"11-13",category:"Space",q:"What galaxy do we live in?",a:["Milky Way","Andromeda","Whirlpool","Sombrero"],correct:"Milky Way"},
{age:"11-13",category:"History",q:"The ancient pyramids are most associated with which civilization?",a:["Egyptians","Vikings","Romans","Aztecs"],correct:"Egyptians"}];

let currentQuestions=[],currentIndex=0,score=0,selectedPlayer="Player",answered=false;
const $=id=>document.getElementById(id);
const setup=$("setup"),game=$("game"),endScreen=$("endScreen"),playerName=$("playerName"),ageGroup=$("ageGroup"),categorySelect=$("categorySelect"),startBtn=$("startBtn"),questionEl=$("question"),categoryEl=$("category"),answersEl=$("answers"),feedbackEl=$("feedback"),scoreEl=$("score"),questionCountEl=$("questionCount"),progressEl=$("progress"),nextBtn=$("nextBtn"),finalScore=$("finalScore"),encouragement=$("encouragement"),playAgainBtn=$("playAgainBtn"),homeBtn=$("homeBtn"),highScores=$("highScores"),parentBtn=$("parentBtn"),parentPanel=$("parentPanel"),closeParentBtn=$("closeParentBtn"),clearScoresBtn=$("clearScoresBtn"),questionsPerGame=$("questionsPerGame"),playerBadge=$("playerBadge");
function shuffle(array){return [...array].sort(()=>Math.random()-.5)}
function getSettings(){return{count:Number(localStorage.getItem("ktq_question_count")||10)}}
function saveSettings(){localStorage.setItem("ktq_question_count",questionsPerGame.value)}
function startGame(){
 selectedPlayer=playerName.value.trim()||"Player";
 const selectedAge=ageGroup.value,selectedCategory=categorySelect.value,count=getSettings().count;
 let filtered=questionBank.filter(q=>q.age===selectedAge);
 if(selectedCategory!=="All") filtered=filtered.filter(q=>q.category===selectedCategory);
 currentQuestions=shuffle(filtered).slice(0,Math.min(count,filtered.length));
 if(!currentQuestions.length){alert("No questions found for that setup. Try All Categories.");return}
 currentIndex=0;score=0;scoreEl.textContent=score;questionCountEl.textContent=currentQuestions.length;
 setup.classList.add("hidden");endScreen.classList.add("hidden");game.classList.remove("hidden");showQuestion()
}
function showQuestion(){
 answered=false;feedbackEl.textContent="";nextBtn.classList.add("hidden");answersEl.innerHTML="";
 const q=currentQuestions[currentIndex];questionEl.textContent=q.q;categoryEl.textContent=q.category;playerBadge.textContent=`${selectedPlayer} • ${q.age}`;
 progressEl.style.width=`${(currentIndex/currentQuestions.length)*100}%`;
 shuffle(q.a).forEach(answer=>{const b=document.createElement("button");b.className="answer";b.textContent=answer;b.addEventListener("click",()=>chooseAnswer(b,answer));answersEl.appendChild(b)})
}
function chooseAnswer(button,answer){
 if(answered)return;answered=true;const q=currentQuestions[currentIndex],buttons=document.querySelectorAll(".answer");
 buttons.forEach(btn=>{btn.disabled=true;if(btn.textContent===q.correct)btn.classList.add("correct")});
 if(answer===q.correct){score++;scoreEl.textContent=score;feedbackEl.textContent="Correct! ⭐"}else{button.classList.add("wrong");feedbackEl.textContent=`Good try! The answer was ${q.correct}.`}
 nextBtn.classList.remove("hidden")
}
function nextQuestion(){currentIndex++;currentIndex>=currentQuestions.length?finishGame():showQuestion()}
function finishGame(){
 progressEl.style.width="100%";game.classList.add("hidden");endScreen.classList.remove("hidden");
 const percent=Math.round((score/currentQuestions.length)*100);
 finalScore.textContent=`${selectedPlayer}, you scored ${score} out of ${currentQuestions.length} (${percent}%).`;
 encouragement.textContent=percent>=90?"Amazing! Trivia champion!":percent>=70?"Great work! You know your stuff!":percent>=50?"Nice effort! Keep practicing!":"Good try! Every game helps you learn.";
 saveHighScore(selectedPlayer,score,currentQuestions.length,ageGroup.value,categorySelect.value);renderHighScores()
}
function saveHighScore(name,score,total,age,category){
 const scores=JSON.parse(localStorage.getItem("ktq_scores")||"[]");
 scores.push({name,score,total,age,category,date:new Date().toLocaleDateString()});
 scores.sort((a,b)=>(b.score/b.total)-(a.score/a.total));
 localStorage.setItem("ktq_scores",JSON.stringify(scores.slice(0,8)))
}
function renderHighScores(){
 const scores=JSON.parse(localStorage.getItem("ktq_scores")||"[]");
 highScores.innerHTML=scores.length?scores.map(s=>`<div class="scoreItem"><span>${s.name} • ${s.age} • ${s.category}</span><span>${s.score}/${s.total}</span></div>`).join(""):"<p>No scores yet. Play a game to get started!</p>"
}
function goHome(){game.classList.add("hidden");endScreen.classList.add("hidden");setup.classList.remove("hidden")}
startBtn.addEventListener("click",startGame);nextBtn.addEventListener("click",nextQuestion);playAgainBtn.addEventListener("click",startGame);homeBtn.addEventListener("click",goHome);
parentBtn.addEventListener("click",()=>{questionsPerGame.value=String(getSettings().count);parentPanel.showModal()});
closeParentBtn.addEventListener("click",()=>{saveSettings();parentPanel.close()});
clearScoresBtn.addEventListener("click",()=>{localStorage.removeItem("ktq_scores");renderHighScores()});
renderHighScores();