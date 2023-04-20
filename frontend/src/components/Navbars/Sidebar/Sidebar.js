import React,{useState} from "react";
import logo from "../../../images/logo-no-background.png";
import { Link, json } from "react-router-dom";
import SearchButton from "../../buttons/SearchButton";


const Sidebar = () => {
  
  const [searchdata, setsearchdata] = useState([])
  const search = async ()=>{
    let searchbar=document.getElementById('searchbar').value
   if (searchbar===''){
    return
   }
    const response =await fetch('http://127.0.0.1:3003/search', {
      method: "POST",
   
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ keywords:searchbar}),
    });
   
      let json = await response.json();
     setsearchdata(json)
     //console.log(json)

  }
  
  return (
    <div className="flex  flex-row absolute">
      <div className="h-screen  w-sidebarw  border-r-1 border-gray-400">
        <div className="flex justify-center  m-5">
          <img src={logo} alt="" className="w-sidebarwimg h-sidebarhimg" />
        </div>
      </div>
      <nav className="w-screen h-sidebarh  flex flex-row border-b-1 border-gray-400">
        <div class="flex items-center ml-10 mr-9">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>

          <span class="font-bold text-lg ml-4">Home</span>
        </div>

        <div class="flex items-center w-searchbarw rounded-lg px-4 py-2">
          <input
            className="w-full px-4 py-2 rounded-lg text-gray-700 focus:outline-none border"
            type="text"
            placeholder="Search..."
            onKeyUp={search}
            id="searchbar"
          />
          <SearchButton />
          <table>
         {searchdata.map((element) => {
return <div className="col-md-4 container searchres" key={element}>
<tr><td>{element[3]}</td></tr> 
</div>
})}
</table>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
