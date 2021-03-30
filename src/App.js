//import logo from './logo.svg';
import './App.css';
import MainDisp from "./MainDisp"

//const Myaddr = "http://localhost:3000"
//const Myaddr = "http://localhost:8080/donut"
const Myaddr = "http://localhost:3001/"


// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
//-----------------------------------------------------
// function App() {
//   function jsonreturn()/*figuring out how to nicely display obj to webpage*/{
//   return JSON.stringify( {title:'hold this', value:500, serialize:"this"} )
// }
// function makeRequest(){
//   console.log("making request")
//   fetch(Myaddr, {method: 'GET'})
//   .then(response => {
//     console.log(response); /*this is just my returned packet at this point*/
//     return response /* returning response because I'm still dealing with the packet in the next block */
//   })
//   .then(response => {
//     if(response.ok) console.log("SUCCSESS!!");
//     else throw new Error("Request was bad: "+response.status);
//     return response.json() /*turning to json spits out the body from the packet*/
//   })
//   .then(data => {
//     console.log(data)/*this is now the body obj*/
//   })
//   .catch(e => console.error(e))
// }

  // return ( <div>
  //   <h1>custom title</h1>
  //   <text> my custom app be going here </text><br/>
  //   {jsonreturn()}<br/>
  //   <text>Make Network Request using Fetch</text><br/>
  //   <button onClick={makeRequest}>Send Request</button><br/>
  //   <hr />
  //   <MainDisp key="Main1" Truth={true} address={Myaddr}/>


  // </div>)
//------------------------------------------------------
function App() {
  //Truth=true is a test value
  return (<div >
    {/* <div class="banner"><h1>THE GREAT EMAIL APP</h1></div> */}
    <h1>THE GREAT EMAIL APP</h1>
    <MainDisp key="Main1" Truth={true} address={Myaddr}/>
  </div>)
}



export default App;
