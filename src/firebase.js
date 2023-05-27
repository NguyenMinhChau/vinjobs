import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

firebase.initializeApp({
	apiKey: 'AIzaSyAM1jFd8Jrp3DavEjQtJK-McxEtb0iIKls',
	authDomain: 'vinjob-53a14.firebaseapp.com',
	projectId: 'vinjob-53a14',
	storageBucket: 'vinjob-53a14.appspot.com',
	messagingSenderId: '991293119423',
	appId: '1:991293119423:web:9584aaab8006324c955f0a',
	measurementId: 'G-N1SB47NVXW',
});

const fb = firebase;

const db = fb.firestore();

const Comments = db.collection('comments');
const Likes = db.collection('likes');

export { Comments, Likes };

export default fb;
