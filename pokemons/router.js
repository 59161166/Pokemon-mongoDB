const express = require('express')
const router = express.Router()
const pokemon = require('./pokemon')

router.get('/pokemons', (req, res) => {
    pokemon.getAllPokemon().then((result)=>{
        res.send(result)
    }).catch((err)=>{
        res.status(500).send({error:err})
    })
})

router.get('/pokemon/:id', (req, res) => {

    if (!isSufficientParam(req.params.id)) {
        res.status(400).send({
            error: 'Insufficient parameter : id is required parameter'
        })
        return
    }

    let id = req.params.id
    // if (!pokemon.isPokemonExisted(id)) {
    //     res.status(400).send({
    //         error: 'Pokemon is not found'
    //     })
    //     return
    // }
    // res.send(pokemon.getPokemon(id))
    pokemon.getPokemon(id).then((result)=>{
        res.send(result)
    }).catch((err)=>{
        res.status(500).send({error:err})
    })
})

router.post('/pokemon', function (req, res) {
    if (!isSufficientParam(req.body.name) ||
        !isSufficientParam(req.body.primaryType)
    ) {
        res.status(400).send({
            error: 'Insufficient parameters : name and primaryType are required parameter'
        })
        return
    }
    // let p = pokemon.createPokemon(req.body.name, req.body.primaryType)
    // let success = pokemon.savePokemon(req.body.name, req.body.primaryType)
    pokemon.savePokemon(req.body.name, req.body.primaryType).then((result)=>{
        res.sendStatus(201)
    }).catch((err)=>{
        res.status(400).send({error:'Create Pokemon is unsuccesfully'})
    })
    
})

router.put('/pokemon/:id', function (req, res) {
    let id = req.params.id
    if (!isSufficientParam(req.body.secondaryType)) {
        res.status(400).send({
            error: 'Insufficient parameter : secondaryType is required parameter'
        })
        return
    }
    // let success = pokemon.editPokemon(id, req.body.name, req.body.primaryType, req.body.secondaryType)
    // if(!success){
    //     res.status(500).send({ error: 'Update pokemon is unsuccessfully'})
    //     return
    // }

    pokemon.editPokemon(id, req.body.name, req.body.primaryType, req.body.secondaryType).then((result)=>{
        res.sendStatus(200)
    }).catch((err)=>{
        res.status(500).send({ error: 'Update pokemon is unsuccessfully'})
    })
})

router.delete('/pokemon/:id', (req, res) => {
    let id = req.params.id
    if (!isSufficientParam(id)) {
        res.status(400).send({
            error: 'Insufficient parameter : id is required parameter'
        })
        return
    }
    // let success = pokemon.deletePokemon(id)
    // if(!success){
    //     res.status(500).send({ error: 'Delete pokemon is unsuccessfully'})
    //     return
    // }
    // res.status(200).send("deleted")
    pokemon.deletePokemon(id).then((result)=>{
        res.status(200).send("deleted")
    }).catch((err)=>{
        res.status(500).send({ error: 'Delete pokemon is unsuccessfully'})
    })
})

function isSufficientParam(v) {
    return v !== undefined && v !== null && v !== ''
}

module.exports = router