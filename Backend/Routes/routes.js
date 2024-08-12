import express from "express";
import { Cards } from '../Model/cards.js';

const router = express.Router();

router.post('/', async (req, resp) => {
    try {
        if (!req.body.question || !req.body.answer) {
            return resp.status(400).send({ message: "Enter all details!" });
        }
        const CardVariable = {
            question: req.body.question,
            answer: req.body.answer,
        };
        const newCard = await Cards.create(CardVariable);
        return resp.status(201).send(newCard);
    } catch (error) {
        console.log(error.message);
        return resp.status(500).send({ message: error.message });
    }
});

router.get('/', async (req, resp) => {
    try {
        const cards = await Cards.find({});
        return resp.status(200).json({
            count: cards.length,
            data: cards
        });
    } catch (error) {
        console.log(error.message);
        return resp.status(400).send({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const card = await Cards.findById(id);
        return res.status(200).json(card);

    } catch (error) {
        console.log(`Error message : ${error.message}`);
        return res.status(500).send({ message: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        if (!req.body.question || !req.body.answer) {
            return res.status(500).send({ message: 'Send all the required details!' });
        }
        const { id } = req.params;

        const result = await Cards.findByIdAndUpdate(id, req.body, { new: true });
        if (!result) {
            return res.status(404).json({ message: 'Card not found!' });
        }
        return res.status(200).send({ message: 'Card updated successfully' });
    } catch (err) {
        console.log(`Error message : ${err.message}`);
        return res.status(500).send({ message: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const result = await Cards.findByIdAndDelete(id);
        if (!result) {
            return res.status(400).json({ message: 'Card could not be deleted!' });
        }
        return res.status(200).send({ message: 'Card deleted successfully!' });
    } catch (error) {
        console.log(error.message);
        return res.status(404).send({ message: error.message });
    }
});

export default router;
