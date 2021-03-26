const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json({}));


app.use('/static', express.static('public'));

app.listen(5050, (req, res) => {
    console.log('server on port 5050');
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});


app.post('/recipeFinder', (req, res) => {
    const ingredients = req.body.ingredients;
    const number = req.body.recipeAmt;
    console.log(ingredients, number);


    axios.get('https://api.spoonacular.com/recipes/findByIngredients?apiKey=55060f35504d43049314fb78f1dc86e9', {
        params: {
            ingredients: ingredients,
            number: number
        }
    })
    .then(resp => {
        const id = resp.data[0].id;
        const id2 = resp.data[1].id;
        axios.get('https://api.spoonacular.com/recipes/' + id + '/information?apiKey=55060f35504d43049314fb78f1dc86e9', {

        })
        .then(respo => {
            const title = respo.data.title;
            const imageURL = respo.data.image;
            const summary = respo.data.summary;
            const extendedIngredients = respo.data.extendedIngredients[0].name; // loop here
            const recipeInstructions = respo.data.analyzedInstructions[0].steps[0].step; // loop again

            console.log(title);
            console.log(imageURL);
            console.log(summary);
            console.log(extendedIngredients);
            console.log(recipeInstructions);
        })
    })
    .catch(err => {
        console.log('There was an error!');
    });
    
    res.send('form data');
});

