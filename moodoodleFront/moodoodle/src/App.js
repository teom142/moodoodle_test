import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Mobile, Pc } from "./responsive";
import Header from "./components/Header";
import Main from "./pages/Main";
import DiaryWritePage from "./pages/DiaryWritePage";

function App() {
  return (
    <BrowserRouter>
      <div className="bg-slate-100">
        <section className="w-[390px] h-[844px] flex flex-col m-auto bg-white">
          <Pc className="flex flex-col m-auto">
            <Header />
            <div className="flex-1">
              <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/diary" element={<DiaryWritePage />} />
              </Routes>
            </div>
          </Pc>
          <Mobile className="flex flex-col m-auto">
            <div className="">
              <Header />
              <div className="">
                <p>이것은 모바일이다.</p>
              </div>
            </div>
          </Mobile>
        </section>
      </div>
    </BrowserRouter>
  );
}

export default App;
