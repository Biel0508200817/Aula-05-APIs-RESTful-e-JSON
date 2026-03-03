const express = require('express');
const router = express.Router();

let db = require('../data/database');

router.get('/', (req, res) => {
    throw new Error('O servidor encontrou um erro');
});

router.get('/todos', (req, res) => {
    const categoria = req.query.categoria;
    if (categoria) {
        const produtosFiltrados = db.produtos.filter(p => p.categoria === categoria);
        return res.json(db.produtosFiltrados);

    }
    res.json(db.produtos);
});

router.post('/', (req, res) => {
    const novoProduto = {
        id: db.produtos.length > 0 ? Math.max(...db.produtos.map(p => p.id)) + 1 : 1,
        categoriaId:  req.body.categoriaId,
        nome: req.body.nome,
        descricao: req.body.descricao,
        preco: req.body.preco,
        image: req.body.image
    };

    db.produtos.push(novoProduto);
    res.status(201).json(novoProduto);
});

router.put('/:id', (req, res) => {
    const produtoId = parseInt(req.params.id);
    const indes = db.produtos.findIndex(p => p.id === produtoId);
    if (indes === -1) {
        db.produtos[index] = {
            ...db.produtos[index],
        };
        res.json(db.produtos[index]);
    } else {
        res.status(404).json({ message: 'Produto não encontrado' });
    }
});

router.delete('/:id', (req, res) => {
    const produtoId = parseInt(req.params.id);
    db.produtos = db.produtos.filter(p => p.id !== produtoId);
    res.json({ message: 'Produto deletado com sucesso' });
});

module.exports = router;