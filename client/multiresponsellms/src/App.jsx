import { useState } from 'react';
import './App.css';
import ReactMarkdown from 'react-markdown';
import { Copy,CopyCheck } from "lucide-react";



function App() {
  const[selectedModel,setSelectedModel]=useState([]);
  const [prompt,setPrompt]=useState("");
  const [reply,setReply]=useState([]);
  const [loading,setLoading]=useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleCopy = (text, index) => {
  navigator.clipboard.writeText(text).then(() => {
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000); 
  }); 
};
  const models = {
    gemini:{
      label: "Gemini 2.0 Flash",
      options:[
        { value: "gemini-2.0-flash" },
      ]
    },

    gptoss:{
      label: "GPT-OSS-20b",
      options:[
        { value: "openai/gpt-oss-20b:free" },
      ]
    },

    deepseek:{
      label: "DeepSeek-R1 (Reasoning)",
      options:[
        { value: "tngtech/deepseek-r1t2-chimera:free" },
        { value: "deepseek/deepseek-r1-0528:free" },
      ]
    },

    qwen8b:{
      label: "Qwen3-14B (General)",
      options:[
        { value: "qwen/qwen3-14b:free" },
        { value: "qwen/qwen3-8b:free" },
      ]
    },

    qwenCoder:{
      label: "Qwen3-Coder (Code Assistant)",
      options:[
        { value: "qwen/qwen3-coder:free" },
        { value: "qwen/qwen3-14b:free" },
      ]
    },

    llama:{
      label: "LLaMA",
      options:[
        { value: "meta-llama/llama-3.3-70b-instruct:free" },
        { value: "meta-llama/llama-3.3-8b-instruct:free" },
        { value: "meta-llama/llama-3.2-3b-instruct:free" },
      ]
    },
    
    mistral:{
      label: "Mistral Small",
      options:[
        { value:"mistralai/mistral-small-3.2-24b-instruct:free" },
        { value:"mistralai/mistral-small-3.1-24b-instruct:free" },
        { value:"mistralai/mistral-small-24b-instruct-2501:free" },
        { value:"mistralai/mistral-7b-instruct:free" },
      ]
    },

    kimi:{
      label: "Kimi (MoonshotAI)",
      options:[
        { value: "moonshotai/kimi-k2:free" },
      ]
    },

    kimiCoder:{
      label: "Kimi Dev 72B (Coding)",
      options:[
        { value:  "moonshotai/kimi-dev-72b:free" },
      ]
    },
    
  };

  const handleSend=async()=>{
    if(!prompt || selectedModel.length==0) return;

    setLoading(true);
    setReply([]);

    try{
      const responses=await Promise.all(
        selectedModel.map(async(key)=>{
          const modelGroup=models[key];
          for(let option of modelGroup.options){
            try{
              const endpoint=option.value==="gemini-2.0-flash"?"/api/chat":"/api/openrouter";

              const body=option.value==="gemini-2.0-flash"? JSON.stringify({prompt}) 
              :JSON.stringify({
                model:option.value,
                messages:[{role:"user",content:prompt}],
              });

              const res=await fetch(`http://localhost:3000${endpoint}`,{
                method:"POST",
                headers:{
                  "Content-Type":"application/json",
                },
                body,
              });

              const data=await res.json();
              return {model:modelGroup.label, reply:data.reply};
            }catch(err){
              console.warn(`Failed on ${option.value},trying next...`);

            }

            return {model:modelGroup.label ,reply :"All fallbacks failed!!"};
          }
        })
      );
      setReply(responses);
      setPrompt("");
    }catch(err){
      setReply([{ model: "Error", reply: "Something went wrong!" }]);
    }finally {
    setLoading(false);
  }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-950 text-white">
      <h1 className="text-4xl font-extrabold mb-6 bg-gradient-to-r from-cyan-400 via-green-500 to-cyan-500 bg-clip-text text-transparent">
        Multi-LLM Response
      </h1>
      <div className="prompt-box w-full">
      <textarea 
        value={prompt} 
        onChange={(e)=>setPrompt(e.target.value)}
        placeholder='Enter your Prompt here!!'
        rows={1}
      ></textarea>


      <button 
      onClick={handleSend}>
        {loading ? ("...") : (<img src="/paper-plane_9217990.png"  alt="send" className="w-5 h-5"></img>)}
      </button>
      </div>

      <div className="flex flex-wrap gap-4 mt-6">
        {Object.entries(models).map(([key,model])=>(

          <label key={key} className='flex items-center glass px-3 py-2 rounded-lg cursor-pointer hover:bg-white/10'>
            <input
            type='checkbox'
            value={key}
            checked={selectedModel.includes(key)}
            onChange={(e)=>{
              const value=e.target.value;
              if(selectedModel.includes(value)){
                setSelectedModel(selectedModel.filter((m)=>m!==value));
              }else{
                setSelectedModel([...selectedModel,value]);
              }
            }}
            className='mr-2'
            />
            {model.label}
            
          </label>
        ))}
      </div>
      
      
      <div className="mt-5 grid-container">
        {loading ? (
          <p className="text-lg font-bold animate-pulse">thinking...</p>
        ) : reply.length > 0 ? (
          reply.map((r,idx) => (
            
            <div
            key={r.model}
            className="relative response-card p-4 rounded-2xl bg-gray-900 shadow-lg hover:shadow-cyan-500/20 transition"
            >

              
             <div>
              <p className="font-semibold text-cyan-400 mb-2">{r.model}</p>
             <button
              onClick={() => handleCopy(r.reply, idx)}
              className="absolute top-2 right-2 p-1 rounded-lg hover:bg-gray-700 transition"
              title={copiedIndex === idx ? "Copied!" : "Copy"}
              >
              {copiedIndex === idx ? <CopyCheck size={16} className="text-green-400"/> : <Copy size={16} />}
              </button>

              <ReactMarkdown>{r.reply}</ReactMarkdown>

              
              </div>
              
            </div>
          ))
        ) : (
          <p className="text-gray-400">No Response yet</p>
        )}
      </div>
    </div>
  )
}

export default App
