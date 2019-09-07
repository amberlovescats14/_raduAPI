const express = require('express')
const app = express()

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/amber', (req, res) => {
  res.send(`Hi Amber!`)
})

//http://localhost:3000/birthday/amber?confetti=true

app.get('/birthday/:userName', (req,res) => {
    const userName = req.params.userName;
    let hasConfetti = req.query.confetti === 'true';
    let confetti = hasConfetti ? '(_#@&%)$%*^@#$)' : ''
    res.send(`${confetti}  Hello ${userName}   ${confetti}`)
})

// app.post('/', async (req, res) => {
//   try {
//     const newPost = req.body;
//     if(!newPost) res.status(404).json({msg: `Please enter info.`})
//     const save = await newPost.save()
//     res.json(save)
//   } catch (error) {
//     console.error(error.message)
//     res.status(500).json({msg: `SERVER ERROR`})
//   }
// })

// app.put('/:id', (req, res) => {
//   try {
//     const res = await 
//   } catch (error) {
    
//   }
// })



const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Listening on port: ${PORT}!`))