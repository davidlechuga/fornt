import {useContext} from 'react';

import AuthContext from '../context/AuthContext';
// devolver el valor de nuestro contexto
export default () => useContext(AuthContext);