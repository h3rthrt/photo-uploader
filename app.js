import firebase from 'firebase/app'
import 'firebase/storage'
import { upload } from './upload'
import './style.sass'

const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
}

firebase.initializeApp(firebaseConfig)

const storage = firebase.storage()

upload('#file', {
    multi: true,
    accept: ['.jpeg', '.png', '.jpg', '.gif'],
    onUpload(files, blocks) {
        files.forEach((file, index) => {
            const ref = storage.ref(`images/${file.name}`)
            const task = ref.put(file)

            task.on('state_changed', snapshot => {
                const percentage = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0)
                const block = blocks[index].querySelector('.preview__info-progress')
                block.textContent = percentage
                block.style.width = percentage + '%'
            }, error => {
                console.log(error)
            }, () => {
                console.log('complete')
            })
        })
    }
})
