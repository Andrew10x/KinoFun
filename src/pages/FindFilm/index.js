import React from 'react';
import FilmCatalog from '../../components/FilmCatalog';
import QueryForm from '../../components/QueryForm';

export default function FindFilm() {
    const [name, setName] = React.useState(null);
    console.log(name);
    return (
        <div>
            <QueryForm setName={setName}/>
           {name && <FilmCatalog name={name}/>}
        </div>
    )
}
