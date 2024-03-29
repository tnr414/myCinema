import Joi from "@hapi/joi";

export const movieSchema = {
    id: Joi.string(),
    title: Joi.string().required().label('Title'),
    genre: Joi.string().required().label('Genre'),
    numberInStock: Joi.number().min(0).required().label('Number In Stocks'),
    description: Joi.string().required().label('Description'),
    image: Joi.object().allow(null).label('Cover Image'),
    rate: Joi.number().required().label('Rate'),
    movieLength: Joi.string().required().label('Movie Length'),
    trailerLink: Joi.string().required().label('Trailer Link'),
};