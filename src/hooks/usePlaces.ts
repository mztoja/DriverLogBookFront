import {useContext} from 'react';
import {PlacesContext} from '../context/PlacesContext';

export const usePlaces = () => useContext(PlacesContext);
