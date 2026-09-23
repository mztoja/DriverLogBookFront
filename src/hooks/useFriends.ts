import {useContext} from 'react';
import {FriendsContext} from '../context/FriendsContext';

export const useFriends = () => useContext(FriendsContext);
