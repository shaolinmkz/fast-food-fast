const token3 = localStorage.getItem("token");
const decodedToken = jwt_decode(token3);
const userId = decodedToken.id;

const getHistory = () => {
  fetch(`http://localhost:7000/api/v2/users/${userId}/orders`, {
    method: "GET",
    headers: {
      "Accept": "application/json, text/plain, */*",
      "Content-type": "application/json",
      "x-access-token": token3
    }
  })
    .then(res => res.json())
    .then(data => {
      // console.log(data.history[1].subtotal);
      // let i, j;
      const { history } = data;
      let dateAppend = ` <div class='bold'>Order No.</div>
                         <div class='bold' > Ordered Items</div >
                         <div class='bold'>Billing Breakdown</div>
                         <div class='bold' >Date/Time</div>
                         `;

      // let objConvert = Object.keys(history).map((key) => {
      //   return [key, history[key]];
      // });
      // console.log(objConvert);
history.forEach((elem) => {
  dateAppend += `
                    <div>${elem.id} <br> ${elem.status} </div>
                    <div><span class='bold'>Food Item(s):</span> ${elem.food_items} <br> <span class='bold'>Food Quantities:</span> ${elem.food_quantities} <br> <br>
                        <p><span class='bold'>Drink Item(s):</span> </span> ${elem.drink_items} <br> <span class='bold'>Drink Quantities</span> ${elem.drink_quantities}</p>
                    </div>
                    <div><span class='bold'>Subtotal:</span> ₦${elem.subtotal} <br>
                    <span class='bold'>Delivery:</span> ₦${elem.delivery} <br><span class='bold'>Discount:</span> ₦${elem.discount} <br>
                   <span class='bold'> Total:</span> ₦${elem.total}</div>
                    <div>${elem.created_date.slice(0,10)} <br>
                    ${elem.created_date.slice(11, 19)}</div>
                   `
})



      document.getElementById("grid-history").innerHTML = dateAppend;
    })
    .catch(err => console.log(err));
};




window.addEventListener("load", getHistory);


// {
//   "status": "Success",
//     "message": "All order history received successfully",
//       "history": [
        // {
        //   "id": 3,
        //   "food_items": "citizens meal,pot lovers menu",
        //   "food_quantities": "3,2",
        //   "drink_items": "five alive 1L,fanta orange 50cl,coca cola 50cl",
        //   "drink_quantities": "4,1,1",
        //   "subtotal": "18850",
        //   "delivery": "250",
        //   "discount": "3770",
        //   "total": "15330",
        //   "status": "NEW",
        //   "user_id": 5,
        //   "created_date": "2018-10-03T17:28:48.044Z"
        // }
//       ]
// }
