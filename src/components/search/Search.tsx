// @ts-nocheck

import { useRef, useState } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import { geoApiOptions, geoApiURL } from '../../Api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { SingleValue } from 'react-select';

interface SearchData {
  label: string;
  value: string;
}

interface SearchProps {
  onSearchChange: (searchData: SearchData) => void;
}

const Search = ({ onSearchChange }: SearchProps) => {
  console.log('Search');
  const [search, setSearch] = useState<SearchData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputElem = useRef("");


  const handleButtonClick = () => {
    console.info(inputElem.current);

    console.info(inputElem.current.getValue()[0]);
    if (navigator.geolocation) {
      setError(null);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const [lon, lat] = [position.coords.longitude, position.coords.latitude];
          onSearchChange({
            value: `${lon} ${lat}`,
            label: null
          });
        },
        () => {
          setError('Geolocation error occurred.');
        }
      );
    } else {
      alert("Your browser does not support geolocation");
    }
  };

  const handleOnChange = (searchData: SingleValue<SearchData>) => {
    setSearch(searchData);
    onSearchChange(searchData); 
  };

  const loadOptions = (inputValue: string) => { 

    setError(null);
    return fetch(`${geoApiURL}/cities?minPopulation=10000&namePrefix=${inputValue}`, geoApiOptions)
      .then((res) => res.json())
      .then((res) => {
        return {
          options: res.data.map((city: {longitude: string; latitude: string; name: string; country: string;}) => ({
            value: `${city.longitude} ${city.latitude}`,
            label: `${city.name}, ${city.country}`
          }))
        };
      })
      .catch((err) => {
        setError('Error fetching data from the server.');
        console.log(err);
      });
  };

  return (
    <div className='row'>
      <div className="col-11">
        <AsyncPaginate
          selectRef={inputElem}
          placeholder="Search for city"
          debounceTimeout={600}
          value={search || ''}
          onChange={handleOnChange}
          loadOptions={loadOptions}
        />
        {error && <div className="error-message">{error}</div>}
      </div>
      <div className="col-1">
        <button className='btn btn-light' onClick={handleButtonClick}>
          <FontAwesomeIcon icon={faLocationDot} />
        </button>
      </div>
      
    </div>
  );
};

export default Search;
