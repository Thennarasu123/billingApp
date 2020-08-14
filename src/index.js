import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import * as serviceWorker from './serviceWorker';
import $ from 'jquery';
/* import './plugins/bootstrap/dist/css/bootstrap.css';
import './plugins/bootstrap/dist/css/bootstrap-theme.css';
 */
// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import 'rsuite';
/* $.ajax({
  url: 'api.php',
  type: 'POST',
  Accepts: "json",
  datatype: "json",
  //contentType: "application/json",
  //dataType: "json",
  data: '' ,
  async: false,
  //contentType:"application/x-www-form-urlencoded; charset=UTF-8",
  success: function(result){
    console.log('result '+result);
  },
  error: function (error) {
    alert('error '+error);
  }
}).done(function(){
  
});//},1000);   */
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
