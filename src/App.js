// import logo from './logo.svg';
import './App.css';
// import CustomizedTables from './components/table';
import {Route, BrowserRouter as Router , Switch} from 'react-router-dom'
import AddItems from './components/items/addItems';
import Categories from './components/categories/categories';
import EditItems from './components/items/editItems'
import Items from './components/items/items'
import SingleItem from './components/items/singleItem'
const  App = () =>{
  
  return (
    <>
      {/* <CustomizedTables /> */}
      <Router>
        <Switch>
          <Route path='/' exact component={Items} />
          <Route path='/items/create' exact component={AddItems} />
          <Route path='/categories' component={Categories} />
          <Route path='/items/:id' exact component={SingleItem} />
          <Route path='/items/edit/:id'  exact component={EditItems} />
        </Switch>
      </Router>

    </>
  );
}

export default App;
