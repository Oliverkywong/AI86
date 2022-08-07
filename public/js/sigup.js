login()
register()

function login() {
	document.querySelector('#loginbu')
		.addEventListener('click', async(e)=> {
			e.preventDefault()
			e.stopPropagation()
			const email = document.querySelector('#playeremail').value
			const password = document.querySelector('#password').value
			
			let res = await fetch('/login', {
				method: 'POST',
                headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({email:email,password:password})
			})
			let json = await res.json()
			document.querySelector('#loginform').reset()
			if(json.login){
				window.location.replace('lobby.html')
			}else {
				document.querySelector('#loginstatus').innerHTML = json.result
			}
		})
}

function register() {
	document.querySelector('#sigbu')
		.addEventListener('click', async(e)=> {
			e.preventDefault()
			e.stopPropagation()
			const id = document.querySelector('#signame').value
			const email = document.querySelector('#playeremail').value
			const password = document.querySelector('#password').value
			
			let res = await fetch('/register', {
				method: 'POST',
                headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({id:id,email:email,password:password})
			})
			let json = await res.json()
			document.querySelector('#sigform').reset()
			if(json.register){
				document.querySelector('#sigstatus').innerHTML = json.result
			}else {
				document.querySelector('#sigstatus').innerHTML = json.result
			}
		})
}