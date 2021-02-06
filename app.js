import firebase from 'firebase/app'
import 'firebase/storage'
import { upload } from './upload'
import './style.sass'

const firebaseConfig = {
    apiKey: "AIzaSyBdqi1pYlh5BDXxWlZy7q1l3iMkQKwAsXw",
    authDomain: "photo-uploader-a3b4c.firebaseapp.com",
    projectId: "photo-uploader-a3b4c",
    storageBucket: "photo-uploader-a3b4c.appspot.com",
    messagingSenderId: "345604177889",
    appId: "1:345604177889:web:4799b97c592bf9a840dca0"
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