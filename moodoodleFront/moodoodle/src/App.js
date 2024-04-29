import { BrowserRouter } from "react-router-dom";
import { Mobile, Pc } from "./responsive";
import Header from "./components/Header";

function App() {
  return (
    <BrowserRouter>
      <section className="w-[390px] h-[844px] flex flex-col m-auto">
        <Pc className="flex flex-col m-auto">
          <div className="k">
            <Header />
            <div className="">
              <p>이것은 컴퓨터다.</p>
            </div>
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
    </BrowserRouter>
  );
}

export default App;
