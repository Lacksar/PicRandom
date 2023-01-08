import { useEffect, useState } from 'react';
import './App.css';
import Loading from './Loading';


function App() {

const download = ()=>{

const downloadImage = (url) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = 'blob';
  xhr.onload = () => {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(xhr.response);
    a.download = 'image.jpg';
    a.click();
  };
  xhr.open('GET', url);
  xhr.send();
};

downloadImage(link);
}


  const [photo, setPhoto] = useState("")
  const [link, setLink] = useState("")
  const [loading,setLoading] = useState(false)

  const fetchdata = async (name) => {
      setLoading(true)

      const height = Math.floor(Math.random()*400)+400;
      const width = Math.floor(Math.random()*400)+400;
    await fetch(`https://source.unsplash.com/${height}x${width}?${name}`)
      .then((data) => {
        setLink(data.url)
        setLoading(false)
      })

  }

  useEffect(() => { fetchdata("") }
    , [])

  return (
    <>
      <div className="flex items-center bg-blue-900 text-white text-sm font-bold px-4 py-3 mb-2" role="alert">
        <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" /></svg>
        <p>Note: This doesnot work with 100% efficiency but work well.</p>
      </div>

      <div style={{
      }}>
        <center>
           <input value={photo} onChange={(e) => {
          setPhoto(e.target.value)

        }} onKeyDown={(event)=>{
          if (event.key === 'Enter') {
            fetchdata(photo)
           

        }}} className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline mb-1" placeholder="Enter a photo name." style={{ width: "90%" }}></input>

        </center>

        <center><button onClick={() => fetchdata(photo)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline mb-2" type="button">
          {photo!==""?"Get Photo":"Generate Random Photo"}
        </button></center>

      </div>

{
  loading?
  <>
     <center><Loading/></center>

  </>   
      :
      null
}

      {
        link !== "" ?
          <>
            <center><img src={link} alt="logo" onClick={() => window.open(link)} /></center><br />

            <center> <button onClick={() => fetchdata(photo)} className=" mr-2 bg-blue-500 hover:bg-blue-400 text-white font-bold px-1 py-1 rounded focus:outline-none focus:shadow-outline" type="button">
              Refresh Photo
            </button> 
           <button onClick={download} className=" ml-2 bg-blue-500 hover:bg-blue-400 text-white font-bold px-1 py-1 rounded focus:outline-none focus:shadow-outline" type="button">
              Download
            </button> </center>
            <br/>
          </>

          : null
      }

    </>
  );

}

export default App;
