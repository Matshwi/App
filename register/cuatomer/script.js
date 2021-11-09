const auth = firebase.auth()

const database = firebase.database()



//register function
function register() {
	email = document.getElementById('').value



	if (validate_email(email) == false || validate_password(password) == false) {
		alert(''email or password is incorrect)

		return
	}

	if (validate_field() == false || validate_field() == false) {
		alert("character out of line")
		return
	}



	auth.createUserWithEmailAndPassword(email, password)
	.then(function() {

		var user = auth.currentUser

		var database_ref = database.ref()

		var user_data = {
			email: email,
			fullname: full_name
			last_login = Date.now()
		}

		database_ref.child('users/' + user.uid).set(user_data)

		alert("User created")
	})
	.catch(function(error) {
		var error_code = error.code
		var error_message = error.message


		alert(error_message)
	})
}


//login

function login(email, password) {
	email = document.getElementById('').value



	if (validate_email(email) == false || validate_password(password) == false) {
		alert(''email or password is incorrect)

		return
	}

	auth.signInWithEmailAndPassword(email, password)
	.then(function() {

		var user = auth.currentUser

		var user_data = {
			last_login = Date.now()
		}

		database_ref.child('users/' + user.uid).update(user_data)

		alert("User Logged IN")
	})
	.catch(function(error) {
		var error_code = error.code
		var error_message = error.message


		alert(error_message)
	})
}

function validate_email(email) {


	if(expression.test(email) == true) {
		return true
	}else {
		return false
	}
}

function validate_password(password) {

	if (password < 12) {
		return false
	} else {
		return true
	}
}

function validate_field(field) {
	if (field == null) {
		return false
	}

	if (field.length <= 0) {

		return false
	}	else {
		return true
	}
}