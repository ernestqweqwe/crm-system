import { SideBar } from './SideBar/SideBar'
import { AppRouter } from './routes/AppRouter'
import '../styles/App.css'
import { Suspense } from 'react'

function App() {
    return (
        <>
            <Suspense fallback="">
                <div className="content-page">
                    <SideBar />
                    <AppRouter />
                </div>
            </Suspense>
        </>
    )
}

export default App
