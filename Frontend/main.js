const btn = document.querySelector(`.btn`);
const userinput = document.querySelector(`#userQuestion`)
btn.addEventListener("click",async()=>{
    const input = document.querySelector(`#userQuestion`).value;
    const answerbox= document.querySelector(`.answer`);
    answerbox.textContent="Thinking .....";
    try{
        const res = await fetch("http://localhost:3000/ask",{
            method:"POST",
            headers:{ "Content-Type": "application/json" },
            body:JSON.stringify({question:input})
        })
        const data = await res.json()
        answerbox.textContent=data.answer|| "no response"
    }
    catch (err) {
    answerbox.textContent = "❌ Cannot connect to Server";
  }
})
userinput.addEventListener("keydown",function(event){
    if(event.key == "Enter"){
        event.preventDefault();
        btn.click();
    }
})