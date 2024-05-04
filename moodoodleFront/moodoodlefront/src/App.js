import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Mobile, Pc } from './responsive';
import { RecoilRoot } from 'recoil';
import Home from './pages/Home';
import Main from './pages/Main';
import DiaryWritePage from './pages/DiaryWritePage';
import AnalysisPage from './pages/AnalysisPage';

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <div className='bg-slate-100'>
          <section className='w-[390px] h-screen flex flex-col m-auto bg-white'>
            <Pc className='flex flex-col m-auto'>
              <div className='flex-1'>
                <Routes>
                  <Route exact path='/' element={<Home />}>
                    <Route path='/' element={<Main />} />
                    <Route path='/diary' element={<DiaryWritePage />} />
                    <Route path='/analysis' element={<AnalysisPage />} />
                  </Route>
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
