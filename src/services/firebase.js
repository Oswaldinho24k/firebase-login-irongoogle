import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'



const config = {
    apiKey: "AIzaSyDgkR3-h37tPlJVmzImRlJzK_Gq0Mftkuw",
    authDomain: "iron-a8d8e.firebaseapp.com",
    databaseURL: "https://iron-a8d8e.firebaseio.com",
    projectId: "iron-a8d8e",
    storageBucket: "iron-a8d8e.appspot.com",
    messagingSenderId: "857271309319"
};
export const fire = firebase.initializeApp(config);


/*firebase login services*/
export const signup = (userInfo) => {
    return firebase.auth().createUserWithEmailAndPassword(userInfo.email, userInfo.password)
        .then(res => {
            return res
        }).catch(e => {
            throw e
        })
}

export const login = (userInfo) => {
    return firebase.auth().signInWithEmailAndPassword(userInfo.email, userInfo.password)
        .then(res => {
            return res
        }).catch(e => {
            throw e
        })
}

export const loginWithFacebook = () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(provider)
        .then(res => {
            return res
        }).catch(e => {
            throw e
        })
}

export const checkIfUser = () => {
    return firebase.auth().onAuthStateChanged((user) => {
        return user
    })


}

export const logout = () => {
    return firebase.auth().signOut()
}


/* firestore services*/

const db = firebase.firestore()
const foodRef = db.collection('food')

export const getFood = () => {
    return foodRef.get()
        .then(snap => {
            const food = []
            snap.forEach((doc) => {
                const f = doc.data()
                f['id'] = doc.id
                food.push(f)
            })
            return food
        }).catch(e => {
            throw e
        })
}



export const saveFood = (food) => {
    return foodRef.add(food)
        .then(res => {
            return res
        }).catch(e => {
            throw e
        })
}

export const getFoodById = (id) => {
    return foodRef.doc(id).get()
        .then(res => {
            return res
        }).catch(e => {
            throw e
        })
}

export const updateFood = (id, food) => {
    return foodRef.doc(id).set(food)
        .then(res => {
            return res
        }).catch(e => {
            throw e
        })
}

export const deleteFood = (id) => {
    return foodRef.doc(id).delete()
        .then(r => {
            return r
        }).catch(e => {
            throw e
        })
}