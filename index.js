window.onload = ()=> {


	var firebaseConfig = {
    	apiKey: "AIzaSyCFnpOVwlaJR6pHjpCmEzQdjOzjSgM6EfM",
   		 authDomain: "greenwin-farm.firebaseapp.com",
    	databaseURL: "https://greenwin-farm.firebaseio.com",
    	projectId: "greenwin-farm",
    	storageBucket: "greenwin-farm.appspot.com",
    	messagingSenderId: "150375443675",
    	appId: "1:150375443675:web:d43992bb7d3896549ff0fe",
    	measurementId: "G-J523QGPWTR"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);




	document.querySelector('.order-form .page1 form').onsubmit = function(ev) {
		ev.preventDefault();
		this.querySelectorAll('input').forEach(el => {
			if (el.checked) {
				['page1', 'page2', 'page3', 'page4', 'page5', 'page6', 'page7'].forEach(page => {
					document.querySelector('.'+page).style.display = 'none';
				});
				document.querySelector(`.${el.value}`).style.display = 'block';
			}
		})
	}

	// page navigation

	document.querySelector('.page2 button.next').onclick = ()=> {
		document.querySelector('.page2').style.display = 'none';
		document.querySelector('.page3').style.display = 'block';
		window.scrollTo(0,0);
	}

	document.querySelector('.page2 button.prev').onclick = ()=> {
		document.querySelector('.page2').style.display = 'none';
		document.querySelector('.page1').style.display = 'block';
		window.scrollTo(0,0);

	}


	document.querySelector('.page3 button.next').onclick = ()=> {
		document.querySelector('.page3').style.display = 'none';
		document.querySelector('.page4').style.display = 'block';
		window.scrollTo(0,0);

	}

	document.querySelector('.page3 button.prev').onclick = ()=> {
		document.querySelector('.page3').style.display = 'none';
		document.querySelector('.page2').style.display = 'block';
		window.scrollTo(0,0);

	}


	document.querySelector('.page4 button.next').onclick = ()=> {
		document.querySelector('.page4').style.display = 'none';
		document.querySelector('.page5').style.display = 'block';
		window.scrollTo(0,0);

	}

	document.querySelector('.page4 button.prev').onclick = ()=> {
		document.querySelector('.page4').style.display = 'none';
		document.querySelector('.page3').style.display = 'block';
		window.scrollTo(0,0);

	}

	document.querySelector('.page5 button.next').onclick = ()=> {
		document.querySelector('.page5').style.display = 'none';
		document.querySelector('.page6').style.display = 'block';
		window.scrollTo(0,0);

	}

	document.querySelector('.page5 button.prev').onclick = ()=> {
		document.querySelector('.page5').style.display = 'none';
		document.querySelector('.page4').style.display = 'block';
		window.scrollTo(0,0);

	}


	document.querySelector('.page6 button.next').onclick = ()=> {
		document.querySelector('.page6').style.display = 'none';
		document.querySelector('.page7').style.display = 'block';
		window.scrollTo(0,0);

		cart = ``;
		total = 0;
		new_val = '';

		document.querySelectorAll('.product').forEach(product => {
			total += (product.querySelector('select').value - 1) + 1;

			if (product.querySelector('select').value !== '0') {
				product.querySelectorAll('select option').forEach(option => {
					if (option.getAttribute('value') === product.querySelector('select').value) {
						new_val = option.innerText;
					}
				})
				cart += `
					<tr>
						<td>${product.querySelector('.name').innerText}</td>
						<td>${new_val}</td>
					</tr>
				`;
			}


		});


		cart += `
					<tr>
						<td>Shipping Charges</td>
						<td>20</td>
					</tr>
				`;

		total += 20;

		cart += `
					<tr>
						<td>Total amount</td>
						<td>${total}</td>
					</tr>
				`;

		document.querySelector('.page7 .total span').innerText = total;
		document.querySelector('.page7 .checkout span').innerText = total;
		// document.querySelector('.page7 .place span').innerText = total;

		document.querySelector('.page7 table').innerHTML = cart;

	}

	document.querySelector('.page6 button.prev').onclick = ()=> {
		document.querySelector('.page6').style.display = 'none';
		document.querySelector('.page5').style.display = 'block';
		window.scrollTo(0,0);

	}




	document.querySelector('.page7 .checkout').onclick = ()=> {
		paymentProcess((total -1 ) + 1)
	}




	function paymentProcess(price) {

			var options = {
		        "key": "rzp_test_0SiKmPeJo1dwwj", // Enter the Key ID generated from the Dashboard
		        "amount": price*100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 means 50000 paise or ₹500.
		        "currency": "INR",
		        "name": "GreenWin farm's site",
		        "description": "- A gift from Mother Earth -",
		        "image": "",// Replace this with the order_id created using Orders API (https://razorpay.com/docs/api/orders).
		        "handler": function (response){
		            console.log(response);
		            sendData(response);
		            // alert('hello');
		        },
		        "prefill": {
		            "name": document.querySelector('.username').value,
		            "email": document.querySelector('.mailin').value,
		            "contact": document.querySelector('.phone').value
		        },
		        "notes": {
		            "address": "note value"
		        },
		        "theme": {
		            "color": "#9932CC"
		        }
		    }
		    var propay = new Razorpay(options);
		    propay.open();
	}


	function sendData(id) {
			let data = {
				orderType : "Prepaid",
				payid : id.razorpay_payment_id,
				table : document.querySelector('.page7 table').innerHTML,
				uid :  document.querySelector('.username').value,
				phone : document.querySelector('.phone').value,
				mail : document.querySelector('.mailin').value,
				address : document.querySelector('.deliveryin').value
			}
			console.log(data);
			firebase.database().ref('orders/greenwinForm2/' + new Date().getTime() ).set(data)
				.then(swal({
					  title: "success",
					  text: "Order placed",
					  icon: "success",
					  button: "Close",
					}))

	}
	






	document.querySelector('.place').onclick = ()=> {
		let data = {
				orderType : "COD",
				table : document.querySelector('.page7 table').innerHTML,
				uid :  document.querySelector('.username').value,
				phone : document.querySelector('.phone').value,
				mail : document.querySelector('.mailin').value,
				address : document.querySelector('.deliveryin').value
			}
		firebase.database().ref('orders/greenwinForm2/' + new Date().getTime() ).set(data)
				.then(swal({
					  title: "success",
					  text: "Order placed",
					  icon: "success",
					  button: "Close",
					}))
	}









}