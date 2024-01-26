import { useState , useCallback , useEffect , useRef} from 'react'
import './App.css'

function App() {
  const [len, setlen] = useState(0)
  const [numcheck,setnumcheck]=useState(false)
  const [charcheck,setcharcheck]=useState(false)
  const [password,setpassword]=useState("")

  const passwordRef = useRef(null)
  const copyPassword = useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])

  const passwordGenerator = useCallback(()=>{
    let pass =""
    let str ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numcheck) str+="0123456789"
    if(charcheck) str+="{}[]!@#$&*=+?"

    for (let i=1;i<=len;i+=1)
    {
      let char=Math.floor(Math.random()*str.length+1)
      pass+=str[char]
    }
    setpassword(pass)
  },[len,numcheck,charcheck])

  useEffect(()=>{
    passwordGenerator()
  },[len,numcheck,charcheck,passwordGenerator])

  return (
    <>
    
    <h1 class="mb-2 mt-0 text-4xl font-medium leading-tight text-primary">
      Password Generator
    </h1>
     <div class="flex w-full items-center space-x-2 md:w-1/3 mx-auto py-5">
          <input
          class="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
          type="text"
          placeholder="Password" value={password} readOnly ref={passwordRef}
          />
        <button onClick={copyPassword} id='btn'
        type="button"
        class="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          Copy
        </button>
    </div>
    
    <div className='flex text-sm gap-x-2 mx-auto justify-center'>
      <div className='flex items-center gap-x-2'>
        <input type='range' value={len} min={6} max={50} className='w-full h-2 mx-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700'onChange={(e)=>{setlen(e.target.value)}}></input>
        <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-black flex-shrink-0'>Length : {len} </label>
      </div>
      <div className='flex items-center gap-x-1'>
        <input type='checkbox' defaultChecked={numcheck} id='numinput' onChange={()=>{
          setnumcheck((prev)=>!prev)
        }}></input>
        <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-black'>Numbers</label>
      </div>
      <div className='flex items-center gap-x-1'>
        <input type='checkbox' defaultChecked={charcheck} id='charinput' onChange={()=>{
          setcharcheck((prev)=>!prev)
        }}></input>
        <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-black'>Character</label>
      </div>
    </div>
    </>
  )
}

export default App
