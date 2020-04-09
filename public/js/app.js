console.log('client side javascript is running')


// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then(data=>{
//         console.log(data)
//     })
// })


fetch('http://localhost:3000/weather?address=boston').then(res=>{
    res.json().then(data=>{
        if(data.error){
            console.log(data.error)
            return
        }
console.log(data)
    })
}
)


const weatherForm  = document.querySelector('form');
const search = document.querySelector('input')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const location = search.value;
    console.log(location)
})