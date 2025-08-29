export const handleOpenRouter=async(req,res)=>{
    const { model, messages }=req.body;

    if(!model || !messages){
        return res.status(400).json({message:"Missing field"})
    }

    try{
        const response=await fetch('https://openrouter.ai/api/v1/chat/completions',{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${process.env.OPENROUTER_API}`,
            },
            body:JSON.stringify(
                {
                    "model": model,
                    "messages": messages,
                }
            )
        })
        const data=await response.json();
        console.log("OpenRouter response:", data);
        const text=data.choices[0].message.content;
        return res.status(200).json({"reply":text});


    }catch(error){
        console.error("OpenRouter error:", error); 
        return res.status(500).json({"message":"something went wrong"})
    }


}