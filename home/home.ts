import { Component } from '@angular/core';

import { NavController,AlertController } from 'ionic-angular';
import { ViewController } from 'ionic-angular';

import {Camera,SocialSharing} from 'ionic-native';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  today: number = Date.now();
  imagePath: string;
//JournalList;
  JournalList=[];
  title: string;
  pic;
  URL:string;
  Title:string;




  constructor(public navCtrl: NavController,public alertCtrl: AlertController,public view: ViewController,public storage: Storage) {

    this.storage.get("Journals").then(
      (value) => {
        this.JournalList = JSON.parse(value) || [];
        // value ? JSON.parse(value) : [];
      },
      (err) => {
          console.log(err) }
    )

  }

  Delete(pic){
    this.JournalList.splice(this.JournalList.indexOf(pic),1);
    this.storage.set("Journals", JSON.stringify(this.JournalList));

  }

  TakePhoto(){

    let options = {
    quality: 100, // 0~100, default 50
    destinationType:
    Camera.DestinationType.FILE_URI,

    sourceType:
    Camera.PictureSourceType.CAMERA,


    saveToPhotoAlbum: true//save to the photo album
    };

      Camera.getPicture(options).then(
      (imagePath)=>{
        this.imagePath=imagePath;

      this.alertCtrl.create({
        title: 'Title',

       message: 'Please write your Title!',
        inputs: [{name:'tit',placeholder:'Title msg'}],
        buttons:[
        {text: 'no',role: 'Cancel'},
        {text:'Regist', handler:(data)=>{
          this.title=data.tit;
          let journal=new HomePage(),
          this.JournalList:HomePage[]=[];
          journal.url=this.imagePath;
          journal.title=this.title;
          this.JournalList.push(journal);


        //  this.JournalList=[{"URL":this.imagePath,"Title":this.title}];
        //   let journal=[];
        //  this.JournalList=[{"URL":string,"Title":string}];
        //  journal.push(this.imagePath);
        //  journal.push(data.tit);
        //  this.JournalList.push(journal);
          /**
          let journal=[];

          journal.push(this.imagePath);
          journal.push(data.tit);
          this.JournalList.push(journal);
          this.storage.set("Journals", JSON.stringify(this.JournalList));
          **/

        }}
        ]

      }).present();
    //  this.JournalList=[{"URL":this.imagePath,"Title":this.title}];
      this.storage.set("Journals", JSON.stringify(this.JournalList));
      //this.data1=[{"URL":this.imagePath,"Time":11,"Title":this.title}];
      //this.JournalList.push(data1);
    //  this.JournalList=[{"URL":this.imagePath,"Title":this.title}];
    //  this.storage.set("Journals", JSON.stringify(this.JournalList));
      /**
      this.JournalList=[{"URL":this.imagePath,"Time":11,"Title":this.title}];
      this.JournalList
      .map(data=>data)
      .subscribe(
        data=>{
          this.JournalList.push(data);
          this.storage.set("Journals", JSON.stringify(this.JournalList));
        },
      err=> console.log(err)
    );
**/

    }, (err)=>{
      console.log("cant take photo");
      } );
    }




    Share(){
      this.alertCtrl.create({
        title: 'Sharing',

       message: 'DO you want share this photo',
        inputs: [{name:'msg',placeholder:'Sharing msg'}],
        buttons:[
        {text: 'Do not share',role: 'Cancel'},
        {text:'Share', handler:(data)=>{
          SocialSharing.share(data.msg,null,this.imagePath,null);
        }}
        ]

      }).present();

    }
}
