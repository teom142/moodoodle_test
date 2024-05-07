import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Mobile, Pc } from './responsive';
import { RecoilRoot } from 'recoil';
import Home from './pages/Home';
import Main from './pages/Main';
import DiaryWritePage from './pages/DiaryWritePage';
import AnalysisPage from './pages/AnalysisPage';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Start from './pages/Start';

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <div className='bg-slate-100'>
          <section className='w-[390px] h-screen flex flex-col m-auto bg-white'>
            <Pc className='flex flex-col m-auto'>
              <div className='flex-1'>
                <Routes>
                  <Route exact path='/' element={<Start />}>
                    <Route path='/' element={<Main />} />
                    <Route
                      path='/diary/:selectedDate'
                      element={<DiaryWritePage />}
                    />
                    <Route
                      path='/analysis/:selectedDate'
                      element={<AnalysisPage />}
                    />
                  </Route>
                  <Route path='/user/login' element={<Login/>}/>
                  <Route path='/user/signup' element={<SignUp/>}/>
                </Routes>
              </div>
            </Pc>
            <Mobile className='flex flex-col m-auto'>
              <div className=''>
                <div className=''>
                  <p>이것은 모바일이다.</p>
                </div>
              </div>
            </Mobile>
          </section>
        </div>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
