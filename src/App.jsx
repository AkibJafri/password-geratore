import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [password, setpassword] = useState("");
  const [length, setlength] = useState(8);
  const [numAll, setnumAll] = useState(false);
  const [charAll, setcharAll] = useState(false);

  const passref = useRef(null)

  const passwordgen = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTWXYZabcdefjhijklmnopqrstwxyz";

    if (numAll) str += "0123456789";
    if (charAll) str += "!@#$%^&*(){}[]";

    for (let index = 1; index <= length; index++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
      
    }

    setpassword(pass);
  }, [setpassword, length, numAll, charAll]);

const copyPasswordToclipboard = useCallback(() => {
  passref.current?.select();
  passref.current?.setSelectionRange(0,100)
  window.navigator.clipboard.writeText(password)
},
[password])


  useEffect(() => {
    passwordgen()
  },[length, numAll, charAll, passwordgen]);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-600 h-[150px] bg-gray-800">
        <h1 className="text-white text-center my-4 pt-3 font-bold">
          Password Genratore
        </h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            placeholder="Password"
            readOnly
            className="outline-none w-full py-1 px-3"
            ref={passref}
            
          />
          <button onClick={copyPasswordToclipboard} className="bg-blue-900 font-bold py-2 px-3 outline-none text-white shrink-0 hover:bg-blue-800">
            Copy
          </button>
        </div>

        <div className="flex text-sm">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer text-[10px]"
              onChange={(e) => {
                setlength(e.target.value);
              }}
            />
            <label>Length: {length}</label>
          </div>

          <div className="flex items-center gap-x-1 ml-5">
            <input
              type="checkbox"
              defaultChecked={numAll}
              id="numburInpute"
              onChange={() => {
                setnumAll((preview) => !preview);
              }}
            />
            <label>Numbers</label>
          </div>

          <div className="flex items-center gap-x-1 ml-2">
            <input
              type="checkbox"
              defaultChecked={charAll}
              id="numburInpute"
              onChange={() => {
                setcharAll((preview) => !preview);
              }}
            />
            <label>Character</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
