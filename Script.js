let prompt = document.querySelector("#prompt")
let chatContainer = document.querySelector(".chat-container")
let imagebtn = document.querySelector("#image")
let imageinput = document.querySelector("#image input ")

// Replace with your real API 
const API_Url="https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=API KEY"

let user={
    data:null,
}

async function genrateResponse(aiChatbox) {
    
    let text=aiChatbox.querySelector(".ai-chat-area")
    let RequestOption={
       method : "POST",
       headers:{'Content-Type' : 'application/json'},
       body:JSON.stringify(
        {
            "contents": [{
              "parts":[{"text": user.data}]
              }]
             }
       )
    }
    try{
        let response= await fetch(API_Url,RequestOption)
        let data=await response.json()
        let apiResponse = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();

        text.innerHTML=apiResponse
    }
    catch(error){
        console.log(error);
    }
    finally{
        chatContainer.scrollTo({top:chatContainer.scrollHeight,behavior:"smooth"})

    }
   

}

function createChatbox (html,classes){
    let div=document.createElement("div")
    div.innerHTML=html
    div.classList.add(classes)
    return div
}
function handleChatResponse(message){
    user.data=message
        let html=`<img src="user.webp" alt="USER" id="user-image" width="80" > 
                    <div class="user-chat-area">

                                ${user.data}
                    </div>`
                    prompt.value=""
                    let userChatbox=createChatbox(html,"user-chat-box")
                    chatContainer.appendChild(userChatbox) 
                    chatContainer.scrollTo({top:chatContainer.scrollHeight,behavior:"smooth"})

        setTimeout(()=>{
            let html=`<img src="ai.png" alt="AI"  id="ai-image" width="60"> 
                    <div class="ai-chat-area">
                    <img src="22.gif" alt="load" class="load" width="50px">
                       
                    </div>`
                let aiChatbox=createChatbox(html,"ai-chat-box")
                chatContainer.appendChild(aiChatbox)
                genrateResponse(aiChatbox)

        },600)


}

prompt.addEventListener("keydown",(e)=>{
    if(e.key=="Enter"){
         handleChatResponse(prompt.value)
    }
})  


imagebtn.addEventListener("click",()=>{
    imagebtn.querySelector("input").click()
})
