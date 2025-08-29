export const handleChat=async(req,res)=>{
    const {prompt}=req.body;

    if(!prompt){
        return res.status(400).json({message:"Prompt required!!"})
        
    }

    try{
        const response=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API}`,{
            method:'POST',
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(
                {
                    "contents": [
                        {
                            "parts": 
                            [{"text": prompt}],
                        }
                    ]
                })
        });
        const data=await response.json();
        const reply = data.candidates[0]?.content?.parts[0]?.text || "No reply found";
        return res.json({ reply });

    }catch(error){
        return res.status(500).json({message:"An error Occurred"})
    }
}