import React, {useEffect, useState} from 'react';
import {Collection} from "./Collection";
import './index.css';

const cats = [
    { "name": "Все" },
    { "name": "Море" },
    { "name": "Горы" },
    { "name": "Архитектура" },
    { "name": "Города" }
]


function App() {
    const [searchValue,setSearchValue] = useState('')
    const [page,setPage] = useState(1);
    const [isLoading,setIsLoading] = useState(true)
    const [collections,setCollections] = useState([]);
    const [categoryId,setCategoryId] = useState(0);
    console.log(collections)
    useEffect(()=> {
        setIsLoading(true)

        const category = categoryId ? `category=${categoryId}`: '';

        fetch(`https://630c991853a833c5342f89c2.mockapi.io/Photos-Collections?page=${page}&limit=3&
        ${category}`)
            .then((res)=>res.json())
            .then((json)=> {
                // const data = json[0].collections
                setCollections(json)
            })
            .catch((err) => {
                console.log(err);
                alert('Ошибка при получении данных')
            }).finally(()=>{
                setIsLoading(false)
        })
    },[categoryId,page]);

  return (
      <div className="App">
        <h1>Моя коллекция фотографий</h1>
        <div className="top">
          <ul className="tags">
              {cats.map((obj,i) => (
                      <li onClick={()=>setCategoryId(i)}
                          className={categoryId === i ? 'active' : ''}
                          key={obj.name}>{obj.name}</li>))}
          </ul>
          <input value={searchValue} onChange={e =>setSearchValue(e.target.value)} className="search-input" placeholder="Поиск по названию" />
        </div>
        <div className="content">
            {isLoading ?
                (<h2>Идет загрузка...</h2>) : (collections
            .filter(obj => {
                return (obj.name.toLowerCase().includes(searchValue.toLowerCase()))
            }).map((obj,index) => (
                <Collection key={index} name={obj.name} images={obj.photos}/>
                    )))}
        </div>
        <ul className="pagination">
            {
                [...Array(5)].map((_,i)=> <li onClick={()=>setPage(i+1)} className={page ===(i+1) ? 'active': ''}>{i +1}</li>
                )
            }
        </ul>
      </div>
  );
}

export default App;