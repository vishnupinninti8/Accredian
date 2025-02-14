import { useState } from 'react'
import './App.css'
import { Button } from './components/ui/button';
import ReferAndEarnPage from './components/ReferAndEarnPage';
function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <ReferAndEarnPage />
        </>
    )
}

export default App;
