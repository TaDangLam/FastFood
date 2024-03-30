import express from 'express';
const Router = express.Router();

Router.get('/', (req, res) => {
    res.send('/aaa');
});

export const OptionRoute = Router;
