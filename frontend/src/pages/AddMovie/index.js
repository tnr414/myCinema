import Joi from '@hapi/joi';
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { getGenres } from '../../actions/genreAction';
import { addMovie } from '../../actions/moviesAction';
import { Input } from '../../components/common/Input';
import { Select } from '../../components/common/Select';
import { movieSchema } from './schema';

const AddMovie = (props) => {
    const { genres } = props;

    const [data, setData] = useState({
        title: "",
        genre: "",
        numberInStock: "",
        description: "",
        image: null,
        rate: null,
        trailerLink: "",
        movieLength: "",
    });

    const [errors, setErrors] = useState({});
    const [genreOptions, setGenreOptions] = useState([]);

    useEffect(() => {
        props.getGenres();
    }, []);

    useEffect(() => {
        let genreOptionsArray = [];
        for (const genre of genres) {
            genreOptionsArray.push({ _id: genre._id, value: genre.genre });
        }
        setGenreOptions(genreOptionsArray);
    }, [genres]);

    const handleSubmit = (ev) => { 
        ev.preventDefault();
        const { error } = Joi.validate(data, movieSchema);
        setErrors(error);
        if(!error) {
            props.addMovie(data);
            props.history.push('/');
        }
     };

    const handleChange = ({ currentTarget: input }) => { 
        const latestData = { ...data, [input.name]: input.value };
        setData(latestData);
     };

    const uploadImage = (ev) => { 
        if (ev.target.files[0]) {
            const latestData = { ...data, image: ev.target.files[0] };
            setData(latestData);
        }
     };

    return (
        <div className='background-container pt-5'>
            <div className='container'>
                <h1 className='header'>Add a new Movie</h1>

                <form encType='multipart/form=data' onSubmit={handleSubmit}>
                    <Input
                        name="title"
                        value={data.title}
                        label="Title"
                        onChange={handleChange}
                        placeholder="Enter the title..."
                        error={errors['title']}
                        iconClass="fas fa-film"
                        autoFocus
                    />

                    <Select
                        name="genre"
                        label="Genre"
                        onChange={handleChange}
                        value={data.genre}
                        error={errors['genre']}
                        options={genreOptions}
                        iconClass="fas fa-address-card"
                    />

                    <Input
                        name="numberInStock"
                        value={data.numberInStock}
                        label="Number In Stock"
                        error={errors['numberInStock']}
                        type="number"
                        iconClass="fas fa-hashtag"
                        placeholder="Enter numbers the stock"
                        onChange={handleChange}
                    />

                    <Input
                        name="image"
                        label="Cover Image"
                        type="file"
                        accept="image/*"
                        error={errors['coverImage']}
                        onChange={uploadImage}
                        iconClass="fas fa-file-image"
                    />

                    <Input
                        name="description"
                        label="Description"
                        value={data.description}
                        error={errors['description']}
                        type='textarea'
                        onChange={handleChange}
                        placeholder="Enter description about this movie..."
                        iconClass="fas fa-info"
                    />

                    <Input
                        name="rate"
                        label="Rate"
                        value={data.rate}
                        error={errors['rate']}
                        type='number'
                        min="0"
                        max="10"
                        onChange={handleChange}
                        placeholder="Rate movie between 0-10"
                        iconClass="fas fa-info"
                    />

                    <Input
                        name="movieLength"
                        label="Movie Length"
                        value={data.movieLength}
                        error={errors['movieLength']}
                        onChange={handleChange}
                        placeholder="Enter length of movie in hh:mm"
                        iconClass="fas fa-info"
                    />

                    <Input
                        name="trailerLink"
                        label="Trailer Link"
                        value={data.trailerLink}
                        error={errors['trailerLink']}
                        onChange={handleChange}
                        placeholder="Provide the trailer link of movie"
                        iconClass="fas fa-info"
                    />

                    <button className='btn' type='submit'>ADD Movie</button>

                </form>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        genres: state.genre.genres,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        addMovie: (movie) => dispatch(addMovie(movie)),
        getGenres: () => dispatch(getGenres()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddMovie);