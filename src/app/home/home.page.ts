import { Component, OnInit } from '@angular/core';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { MediaCapture } from '@ionic-native/media-capture/ngx';
import { File, FileEntry } from '@ionic-native/File/ngx';
import { Media } from '@ionic-native/media/ngx';
import { StreamingMedia } from '@ionic-native/streaming-media/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { ActionSheetController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private imagePicker: ImagePicker,
    private mediaCapture: MediaCapture,
    private file: File,
    private media: Media,
    private streamingMedia: StreamingMedia,
    private photoViewer: PhotoViewer,
    private actionSheetController: ActionSheetController,
    private platform: Platform
  ) { }

  ngOnInit() {
    this.platform.ready().then(() => {
      const path = this.file.dataDirectory;
      this.file.checkDir(path, 'appMediaFiles').then(
        () => {
          this.loadFiles();
        },
        err => {
          console.log('Error when check dir: ', err);

          this.file.createDir(path, 'appMediaFiles', false);
        }
      );
    });
  }

  loadFiles() {
    this.file.listDir(this.file.dataDirectory, 'appMediaFiles').then(
      resp => {
        console.log('resp loadFiles: ', resp);
      },
      err => console.log('error loading files: ', err)
    );
  }



}
