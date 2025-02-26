import { Suspense } from 'react'
import { SideBar } from './components/SideBar/SideBar.tsx'
import { AppRouter } from './components/routes/AppRouter.tsx'
import './App.scss'

function App() {
    return (
        <>
            <Suspense fallback="">
                <div className="content">
                    <SideBar />
                    <AppRouter />
                </div>
            </Suspense>
        </>
    )
}

export default App
