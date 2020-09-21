// Frameworks functions
import React, { Fragment, useState, useEffect } from 'react';
// Frameworks and local styles
import './Search.scss';
import { Search as SearchSU, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import { size } from 'lodash'
import ImageNoFound from '../../../assets/imagenes/avatar.png'
//Queries or mutations
import { useQuery } from '@apollo/client';
import { SEARCH } from '../../../gql/user';
export default function Search() {
    const [search, setSearch] = useState(null);
    const [results, setResults] = useState([])
    const { data, loading } = useQuery(SEARCH, {
        variables: { search }
    });

    useEffect(() => {
        if (size(data?.search) > 0) {
            const users = [];
            data.search.forEach((user, index) => {
                users.push({
                    key: index,
                    title: user.name,
                    username: user.username,
                    avatar: user.avatar
                });
            });
            setResults(users);
        } else {
            setResults([])
        }
    }, [data]);

    const onChange = (e) => {
        if (e.target.value) setSearch(e.target.value);
        else setSearch(null);
    };

    const handleResultSelect = () => {
        setSearch(null);
        setResults([]);
    }

    return (
        <Fragment>
            <SearchSU
                className="search-users"
                fluid
                loading={loading}
                value={search || ""}
                results={results}
                resultRenderer={(e) => <ResultSearch data={e} />}
                input={{ icon: 'search', iconPosition: 'left' }}
                onSearchChange={onChange}
                onResultSelect={handleResultSelect}
            />
        </Fragment>
    );
}

function ResultSearch(props) {
    const { data } = props;
    console.log(data);

    return (
        <Link className="search-users__item" to={`/${data.username}`}>
            <Image
                src={data.avatar || ImageNoFound}
            />
            <div>
                <p> {data.title} </p>
                <p> {data.username} </p>
            </div>
        </Link>
    );
}