let express = require('express')
let router = express.Router()

const member = [
    {
        nama: "Clara",
        alamat: "Belobog",
        element: "Physics",
        gender: "Female"
    },
    {
        nama: "Seele",
        alamat: "Belobog",
        element: "Quantum",
        gender: "Female"
    },
    {
        nama: "Gepard",
        alamat: "Belobog",
        element: "Frozen",
        gender: "Male"
    },
]

router.get('/', (req, res) => {
    res.render('member',{
        member: member
    })
})


module.exports = router