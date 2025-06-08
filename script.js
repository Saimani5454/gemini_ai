function fetchResults(){
    let chat=document.getElementById("text-input").value;
    AppendMessage("user",chat);
    document.getElementById("text-input").value = "";
    document.getElementsByClassName("header")[0].style.display="none";
    let chatArea=document.getElementById("chatArea")
    chatArea.scrollTo({
      top:0,
      behavior:"smooth",
    });
    fetchApiResponse(chat);
}

async function fetchApiResponse(chat){
  
    
    const  resp =await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyBdr8Y15Ry7SXvwdWjeGMk8J8Q7V-yLDqo', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  
  body: JSON.stringify({
    contents: [
      {
        parts: [
          {
            text: chat,
          },
        ],
      },
    ],
  }),
});

const response= await resp.json();
 

 

AppendMessage("Gemini",response.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g,"$1"));
document.getElementById("loading").remove()
}

function AppendMessage(sender,chat){
  
  
  const msgElement=document.createElement("div");
  msgElement.className=`message ${sender}`;
  msgElement.innerHTML=`<p>${chat}</p>`;
  chatArea.appendChild(msgElement);
  if(sender==="user"){
    const loading=document.createElement("div");
    loading.className="loading Gemini";
    loading.id="loading";
    loading.innerText="Loading...";
    chatArea.appendChild(loading);

  }
  

}
function toggle(){
  document.body.classList.toggle("dark");
  const isDark=document.body.classList.contains("dark");
  if(isDark){
   document.getElementById("theme-toggle").innerText="☀️";
  }else{
    document.getElementById("theme-toggle").innerText="🌙";
  }
  
}
