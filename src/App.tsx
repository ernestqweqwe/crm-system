import { PageRouter } from 'components/routes/PageRouter'
import { NotFoundPage } from 'pages/NotFoundPage/index'
import { Suspense } from 'react'
import './App.scss'
import { Route, Routes } from 'react-router'

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
