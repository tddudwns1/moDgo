<<<<<<< HEAD:front/src/App.js

=======
>>>>>>> 3b0726b427b23e0b7bb6e2b643a0ac6e4b6f61ce:front/src/App.jsx
import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "../src/pages/Home";
import Board from "../src/pages/Board";
import Detail from "../src/pages/Detail";
import MyPage from "./pages/MyPage";
import ScrollToTop from "./components/common/ScrollToTop";
import GlobalStyles from "./GlobalStyles";

const App = () => {
<<<<<<< HEAD:front/src/App.js
	return (
		<BrowserRouter>
			<GlobalStyles />
			<ScrollToTop>
				<Switch>
					<Route exact path="/"component={Home} />
					<Route exact path="/board" component={Board} />
					<Route exact path="/detail/:id" component={Detail} />
					<Route exact path="/myPage" component={MyPage} />
				</Switch>
			</ScrollToTop>
		</BrowserRouter>
	);
=======
  return (
    <BrowserRouter>
      <GlobalStyles />
      <ScrollToTop>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/board" component={Board} />
          <Route exact path="/detail/:id" component={Detail} />
          <Route exact path="/myPage" component={MyPage} />
        </Switch>
      </ScrollToTop>
    </BrowserRouter>
  );
>>>>>>> 3b0726b427b23e0b7bb6e2b643a0ac6e4b6f61ce:front/src/App.jsx
};

export default App;
