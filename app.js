const express = require('express')
const app = express()
const port = 3000

let listaProdutos = [
    {
        id: 1,
        nome: "Produto 1",
        preco: 10.50
    },
    {
        id: 2,
        nome: "Produto 2",
        preco: 20.75
    }

];

// daqui para baixo, tudo o que estiver no body será tratado como JSON:
app.use(express.json())

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/produtos', (req, res) => {
  res.json(listaProdutos)
})

// O operador + antes de uma string, transforma a string em um int.
app.get('/produtos/:id', (req, res) => {
    const id = +req.params.id;
    let produto = listaProdutos.find((produto) => {
        return produto.id === id;    
    })

    if(produto){
        res.json(produto);
    }
    else{
        res.status(404).json({erro: "Produto não encontrado!"})
    }
})

app.post('/produtos', (req, res) => {
    const produto = req.body;

    listaProdutos.push(produto);

    res.status(201).json(produto);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})