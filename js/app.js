const cafeList = document.querySelector('#cafe-list');
const form = document.querySelector('#add-cafe-form');



const Categories = urlParams.get('items');

//console.log(userid + " user id");

// create element & render cafe
function renderCafe(doc){
    console.log(doc.data().provider);
    //if (true) {}
    let li = document.createElement('li');
    let name = document.createElement('span');
    let brand = document.createElement('span');
    let cross = document.createElement('div');

    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().Name;
    brand.textContent = doc.data().brand;
    cross.textContent = 'x';

    li.appendChild(name);
    li.appendChild(brand);
    li.appendChild(cross);

    cafeList.appendChild(li);

    // deleting data
    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('todo').doc(id).delete();
    });
}

// getting data
// db.collection('cafes').orderBy('city').get().then(snapshot => {
//     snapshot.docs.forEach(doc => {
//         renderCafe(doc);
//     });
// });

// saving data
form.addEventListener('submit', (e) => {

    
    //let productKey;
    //let productData = {};
    firebase.database().ref('products').on('value', function(snapshot) {
        
                console.log(snapshot.val().Price);
            snapshot.forEach(function(element){

        console.log(element.val().Price);

       // var nameofpro = document.querySelector("").value
       // var nameofpro = document.querySelector("").value

        if (element.val().Name == form.name.value && element.val().Brand == form.brand.value) {
          console.log(element.val());
        

      /*if price shows in the console you will make an if condition to check 
      for specific value however then print out if it does not work you will then
        consider if the orderByChild and equalsTo is able to take two parameters
         if not what can*/

 
      const urlParams = new URLSearchParams(window.location.search);
const userid = urlParams.get('userid');
var uid = Date.now();
    
    e.preventDefault();

firebase.database().ref('cart/'+ userid + '/' + uid).set({
        provider:vendorid,
        photo:element.val().logo,
        title:element.val().Name,
        description: element.val().Tag,
        category:element.val().Category,
        price:element.val().Price,
        quantity: 1,
    })



    
    db.collection('todo/' + userid + "/" + vendorid).add({
        Name: form.name.value,
        brand: form.brand.value,
        user: userid,
    });

    db.collection('invoice/' + userid + "/" + vendorid).add({
        Name: form.name.value,
        brand: form.brand.value,
        user: userid,
        provider: vendorid,
        Price: element.val().Price,
    });
    form.name.value = '';
    form.brand.value = '';

    }
});

});
    

  

});

// real-time listener
db.collection('todo/' + userid + "/" + vendorid).orderBy('brand').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        
        if(change.type == 'added'){
            
            console.log(change.doc);
            renderCafe(change.doc);
        } else if (change.type == 'removed'){
            let li = cafeList.querySelector('[data-id=' + change.doc.id + ']');
            cafeList.removeChild(li);
        }
    });
});




db.collection('todo').orderBy('brand').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        //console.log(change.doc.data());
        
    });
});

// updating records (console demo)
// db.collection('cafes').doc('DOgwUvtEQbjZohQNIeMr').update({
//     name: 'mario world'
// });

// db.collection('cafes').doc('DOgwUvtEQbjZohQNIeMr').update({
//     city: 'hong kong'
// });

// setting data
// db.collection('cafes').doc('DOgwUvtEQbjZohQNIeMr').set({
//     city: 'hong kong'
// });
