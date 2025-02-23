import React from 'react';

import NewsList from '../components/NewsList';
import FilterBar from '../components/FilterBar';

const Home: React.FC = () => {
    return (
        <div>
            <FilterBar />
            <NewsList />
        </div>
    );
};

export default Home;
