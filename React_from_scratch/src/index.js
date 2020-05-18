
import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import MoveList from './components/MovieList';


//here we import components such as search, movieCard, etc...

function App() {
    const dbMovies = [];
    const [movies, setMovies] = useState([
       
        
    ]);

    // await fetch('http://localhost:3001/getAll')
    // .then(response => response.json())
    // .then(data => data.forEach(m => m)

     

    return (
        <section className="wrapper">
            <h1>Dukes Movie Database</h1>
            <MoveList movies={movies}/>
        </section>
    );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);