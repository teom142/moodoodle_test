import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Mobile, Pc } from './responsive';
import { RecoilRoot } from 'recoil';
import Start from './pages/Start';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Main from './pages/Main';
import DiaryWritePage from './pages/DiaryWritePage';
import AnalysisPage from './pages/AnalysisPage';
import Mypage from './pages/Mypage';
import NavigationBar from './components/NavigationBar';

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <div className='bg-slate-100'>
          <section className='w-[390px] h-screen flex flex-col m-auto bg-white'>
            <Pc className='flex flex-col m-auto'>
              <div className='flex-1 relative'>
                <Routes>
                  <Route exact path='/' element={<Home />}>
                    <Route path='/start' element={<Start />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/signup' element={<SignUp />} />
                    <Route path='/' element={<Main />} />
                    <Route
                      path='/diary/:selectedDate'
                      element={<DiaryWritePage />}
                    />
                    <Route
                      path='/analysis/:selectedDate'
                      element={<AnalysisPage />}
                    />
                    <Route path='/mypage' element={<Mypage />} />
                  </Route>
                </Routes>
                <NavigationBar />
              </div>
            </Pc>
            <Mobile className='flex flex-col m-auto'>
              <div className='flex-1'>
                <Routes>
                  <Route exact path='/' element={<Home />}>
                    <Route path='/start' element={<Start />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/signup' element={<SignUp />} />
                    <Route path='/' element={<Main />} />
                    <Route
                      path='/diary/:selectedDate'
                      element={<DiaryWritePage />}
                    />
                    <Route
                      path='/analysis/:selectedDate'
                      element={<AnalysisPage />}
                    />
                    <Route path='/mypage' element={<Mypage />} />
                  </Route>
                </Routes>
              </div>
            </Mobile>
          </section>
        </div>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
