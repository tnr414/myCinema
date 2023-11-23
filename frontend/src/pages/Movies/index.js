import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getGenres } from '../../actions/genreAction';
import { getMovies } from '../../actions/moviesAction';
import { Pagination } from '../../components';
import { Input } from '../../components/common/Input';
import { ListGroup } from '../../components/common/ListGroup';
import { Loading } from '../../components/common/Loading';
import { MoviesTable } from '../../components/MoviesTable';
import categorize from '../../utils/categorize';
import filterRating from '../../utils/filterRating';
import search from '../../utils/search';

export const Movies = (props) => {
    const { movies, genres, loggedIn } = props;

    const [data, setData] = useState({
        genres: [],
        pageSize: 12,
        currentPage: 1,
        currentGenre: "All",
        searchFilter: "",
        rating: 0,
    });

    useEffect(() => {
        props.getMovies();
        props.getGenres();
    }, []);

    const handleChange = (name, value) => {
        const latestData = { ...data, [name]: value, currentPage: 1 };
        setData(latestData);
    };

    const onPageChange = (page) => {
        const latestData = { ...data, currentPage: page };
        setData(latestData);
    };

    const [filteredMovies, setFilteredMovies] = useState([]);

    useEffect(() => {
        let tempFilteredMovies = [];
        tempFilteredMovies = search(movies, data.searchFilter, "title");
        tempFilteredMovies = categorize(tempFilteredMovies, data.currentGenre);
        tempFilteredMovies = filterRating(tempFilteredMovies, data.rating);
        setFilteredMovies(tempFilteredMovies);
    }, [data.currentGenre, data.searchFilter, data.rating, movies]);


    if (_.isEmpty(movies)) {
        return (
            <div className='background-container pt-5'>
                <Loading />
            </div>
        );
    }

    return (
        <div className='background-container'>
            <div className='mx-5 py-5'>
                <div className='row'>
                    <div className='col-lg-2 col-sm-12'>
                        <h4 className='text-muted text-left p-1'>Filters</h4>
                        <ListGroup
                            active={data.currentGenre}
                            onChange={(val) => handleChange("currentGenre", val)}
                            options={genres}
                        />
                        <Input
                            label="Rating"
                            min={0}
                            max={10}
                            placeholder="0-10"
                            type="number"
                            iconClass="fas fa-star"
                            onChange={(ev) =>
                                handleChange("rating", ev.target.value)
                            }
                        />
                    </div>
                    <div className="col-lg-10 col-sm-12">
                        <Input
                            onChange={(event) =>
                                handleChange("searchFilter", event.target.value)
                            }
                            label="Search Movie"
                            iconClass="fas fa-search"
                            placeholder="Search..."
                        />
                        <p className='text-left text-muted'>
                            {!!filteredMovies.length ? `${filteredMovies.length} ` : '0 '}
                            Movies Found
                        </p>
                        {!!filteredMovies ? (
                            <MoviesTable
                                pageSize={data.pageSize}
                                currentPage={data.currentPage}
                                movies={filteredMovies}
                            />
                        ) : (
                            <h1 className='text-white'>No Movies</h1>
                        )}
                        <br />

                        <Pagination
                            itemSize={filteredMovies.length}
                            pageSize={data.pageSize}
                            currentPage={data.currentPage}
                            onPageChange={onPageChange}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        movies: state.movie.movies,
        genres: state.genre.genres,
        loggedIn: state.auth.loggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getMovies: () => dispatch(getMovies()),
        getGenres: () => dispatch(getGenres()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Movies);





