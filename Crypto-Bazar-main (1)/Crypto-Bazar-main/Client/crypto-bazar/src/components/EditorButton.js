import React from 'react'
import { useNavigate } from 'react-router-dom';

const EditorButton = () => {
    const navigate=useNavigate();

    const validateuser=()=>{
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            alert('Sign in to access the editor');
        }
        else{
           navigate('/Editor')
        }
    }
  return (
    <div>
      <button onClick={validateuser} className="bg-green-600 hover:bg-green-700 text-black font-bold py-2 px-4 rounded">Editor</button>
    </div>
  )
}

export default EditorButton
