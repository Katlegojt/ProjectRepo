import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/module/user';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { File } from '@ionic-native/File/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  user = {} as User;
  gender;
  imageUrl: string;
list
  selectedFile;
  picRef ;
  constructor(private userS: UserService,
    private afAuth: AngularFireAuth, public navCtrl: NavController, private sSharing: SocialSharing,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private fc: FileChooser,
    private file: File,
    private camera: Camera,
    private db: AngularFirestore,
    public firestore: AngularFirestore,
   ) {

     this.picRef = this.firestore.collection('pics').valueChanges().subscribe(
      data =>{
        this.list = data
      }
     );
   }

  //
  ngOnInit() {
    const key = this.afAuth.auth.currentUser.uid;
    this.userS.getUser(key).subscribe(data => {
      this.user = data;
      
      console.log(data)
    });
  }

  //Neo 5:13 AM
  onUpload(event) {
    this.selectedFile = <File>event.target.files[0];
    console.log(event.target.files[0]);
    const file = event.target.files[0];
    this.uploadViaFileChooser(file);// call helper method
    console.log("upload complete !");
  }
  

  

  //file chooser
  async pickFile() {
    this.fc.open().then((uri) => {
      alert(uri);

      this.file.resolveLocalFilesystemUrl(uri).then((newUri) => {
        alert(JSON.stringify(newUri))

        let dirPath = newUri.nativeURL;
        let dirPathSeg = dirPath.split('/')
        dirPathSeg.pop()
        dirPath = dirPathSeg.join('/')

        this.file.readAsArrayBuffer(dirPath, newUri.name).then(async (buffer) => {
          await this.uploadToFirebase(buffer);
        })
      })
    })
  }

  //file upload to firebase
  // async uploadImage(buffer, name) {

  //   let blob = new Blob([buffer], { type: "image/jpeg" });
  //   let storage = firebase.storage().ref('images/' + name).put(blob).then((d) => {

  //     alert("done");
  //   }).catch((error) => {
  //     alert(JSON.stringify(error) + 'Error Msg')
  //   })
  //}

  // faciltators code 
  //NATIVE CAMERA
  async pickImage() {
    const options: CameraOptions = {
      quality: 80,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };
    try {
      const cameraInfo = await this.camera.getPicture(options);
      const blobInfo = await this.makeFileIntoBlob(cameraInfo);
      const uploadInfo: any = await this.uploadToFirebase(blobInfo);
      alert('File Upload Success ' + uploadInfo.fileName);
    } catch (e) {
      console.log(e.message);
      alert('File Upload Error ' + e.message);
    }
  }

  // FILE STUFF
  //make file into blob
  makeFileIntoBlob(_imagePath) {
    // INSTALL PLUGIN - cordova plugin add cordova-plugin-file
    return new Promise((resolve, reject) => {
      let fileName = '';
      this.file
        .resolveLocalFilesystemUrl(_imagePath)
        .then(fileEntry => {
          const { name, nativeURL } = fileEntry;
          // get the path..
          const path = nativeURL.substring(0, nativeURL.lastIndexOf('/'));
          console.log('path', path);
          console.log('fileName', name);
          fileName = name;
          // we are provided the name, so now read the file into
          // a buffer
          return this.file.readAsArrayBuffer(path, name);
        })
        .then(buffer => {
          // get the buffer and make a blob to be saved
          const imgBlob = new Blob([buffer], {
            type: 'image/jpeg'
          });
          console.log(imgBlob.type, imgBlob.size);
          resolve({
            fileName,
            imgBlob
          });
        })
        .catch(e => reject(e));
    });
  }

  //uploade to file base
  uploadToFirebase(_imageBlobInfo) {
    console.log('uploadToFirebase');
    return new Promise((resolve, reject) => {
      const fileRef = firebase.storage().ref('images/' + _imageBlobInfo.fileName);
      const uploadTask = fileRef.put(_imageBlobInfo.imgBlob);
      uploadTask.on(
        'state_changed',
        (_snapshot: any) => {
          console.log(
            'snapshot progess ' +
            (_snapshot.bytesTransferred / _snapshot.totalBytes) * 100
          );
          const progress = (_snapshot.bytesTransferred / _snapshot.totalBytes) * 100;
          if (progress === 100) {
            fileRef.getDownloadURL().then(uri => {
              this.imageUrl = uri;
            //  this.db.collection('pics').add({ downloadURL: this.imageUrl, uid: this.afAuth.auth.currentUser.uid, })
              // console.log('profile', this.profileUser.key);
              this.userS.profile(this.imageUrl, this.afAuth.auth.currentUser.uid)
              console.log('downloadurl', uri);
            });
          }
        },
        _error => {
          console.log(_error);
          reject(_error);
        },
        () => {
          // completion...
          resolve(uploadTask.snapshot);
        }
      );
    });
  }
  //upload via file chooser
  uploadViaFileChooser(_image) {
    console.log('uploadToFirebase');
    return new Promise((resolve, reject) => {
      const fileRef = firebase.storage().ref('images/' + this.selectedFile.name);
      const uploadTask = fileRef.put(_image);
      uploadTask.on(
        'state_changed',
        (_snapshot: any) => {
          console.log(
            'snapshot progess ' +
            (_snapshot.bytesTransferred / _snapshot.totalBytes) * 100
          );
          const progress = (_snapshot.bytesTransferred / _snapshot.totalBytes) * 100;
          if (progress === 100) {
            fileRef.getDownloadURL().then(uri => {
              this.imageUrl = uri;
              console.log('downloadurl', uri);
              
              this.userS.profile(this.imageUrl, this.afAuth.auth.currentUser.uid)
              
            });
            
            
          }
        },
        _error => {
          console.log(_error);
          reject(_error);
        },
        () => {
          // completion...
          resolve(uploadTask.snapshot);
        }
      );
    });
  }

}


