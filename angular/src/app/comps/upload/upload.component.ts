import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FormGroup, FormArray, FormControl, Validators } from "@angular/forms";
import { AuthService } from "src/app/shared/services/auth.service";
import { HttpClient, HttpHeaders, HttpEventType } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { CompleterService, CompleterData } from 'ng2-completer';
import { TagService } from 'src/app/shared/services/tag.service';

@Component({
  selector: "app-upload",
  templateUrl: "./upload.component.html",
  styleUrls: ["./upload.component.scss"]
})
export class UploadComponent implements OnInit {
  uploadForm: FormGroup;
  myGroup:FormGroup;


  fileError: string = "";
  public text="";
  dataService: CompleterData;
  @ViewChild("fileNameInput", { static: true }) fileNameInput: ElementRef;

  loading: boolean = false;
  width: number = 0;
  file: File = null;
  imageFile: File = null;
  tagData: String[]=[];

  @ViewChild("tagsBox", { static: true }) tagsBox: ElementRef;
  tagsError: string = "";

  // Drop box
  @ViewChild("box", { static: true }) box: ElementRef;
  @ViewChild("img", {static: true}) img: ElementRef;

  @ViewChild("file", {static: true}) imageBox: ElementRef;


  constructor(private _auth: AuthService, private _http: HttpClient, private _msg: MessagesService, private completerService: CompleterService, private tagService: TagService ) {}

  ngOnInit() {
    this.setPath("/assets/images/placeholder.png");
    this.myGroup = new FormGroup({
      firstName: new FormControl(null, {validators: [Validators.required, Validators.minLength(3), Validators.maxLength(255)]})
   });
   this.tagService.getALLTag().subscribe(
     res=> {
       res.forEach(element => {
       this.tagData.push(element.title)  
       });
       console.log(this.tagData[0])
     }
   )


    this.uploadForm = new FormGroup({
      name: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20)
        ]
      }),
      tags: new FormArray([], {
        validators: [Validators.required, Validators.maxLength(5)]
      }),
      price: new FormControl(null, {validators: [Validators.required, Validators.minLength(2), Validators.maxLength(255)]})
    });

    // ============== Drop Box ==============

    // Drop event
    this.box.nativeElement.addEventListener("drop", (e: any) => {
      e.stopPropagation();
      e.preventDefault();

      if (e.dataTransfer.files.length) {
        this.storeFile(e.dataTransfer.files[0]);
       
      }
    });
    // Drag over the element event
    this.box.nativeElement.addEventListener("dragover", (e: any) => {
      e.stopPropagation();
      e.preventDefault();

      e.dataTransfer.dropEffect = "copy";
    });
    this.imageBox.nativeElement.addEventListener("drop", (e: any) => {
      e.stopPropagation();
      e.preventDefault();

      if (e.dataTransfer.files.length) {
        this.storeImageFile(e.dataTransfer.files[0]);
      }
    });
    // Drag over the element event
    this.imageBox.nativeElement.addEventListener("dragover", (e: any) => {
      e.stopPropagation();
      e.preventDefault();

      e.dataTransfer.dropEffect = "copy";
    });
    // ============== Tags Box ==============
    this.tagsBox.nativeElement.addEventListener("keyup", () => {
      let value = this.tagsBox.nativeElement.value; // Input value

      // Base condition
      if (value[value.length - 1] != " ") return;
      else this.tagsBox.nativeElement.value = value.replace(' ', '');

      value = value.replace(' ', ''); // Trim sapces
      if(this.uploadForm.value.tags.length >= 5){
        this.tagsError = "You can't have more than 5 tags";
        return;
      } else if (value.length < 3) {
        this.tagsError = "The tag can't be less than 3 characters long";
        return;
      } else if (value.length > 10) {
        this.tagsError = "The tag can't be greater than 10 characters long";
        return;
      } else if (this.uploadForm.value.tags.indexOf(value) != -1) {
        this.tagsError = "The tag is already used";
        return;
      }

      let newTag = this.createTagInput(value);
      (<FormArray>this.uploadForm.get("tags")).push(newTag);
      console.log(this.uploadForm.invalid,this.loading,!this.file)
      this.tagsBox.nativeElement.value = "";

    });

   
   
  }
 

  /**
   * Upload the song to the server
   */
onKey()
{
  
  let value = this.myGroup.value.firstName;

  // Base condition
  if (value[value.length - 1] != " ") return;
  else this.myGroup.value.firstName = value.replace(' ', '');


  value = value.replace(' ', ''); // Trim sapces
  if(!this.tagData.includes(value))
{
  this.tagsError = "This tag does not exist";
    return;
}
  if(this.uploadForm.value.tags.length >= 5){
    this.tagsError = "You can't have more than 5 tags";
    return;
  } else if (value.length < 3) {
    this.tagsError = "The tag can't be less than 3 characters long";
    return;
  } else if (value.length > 10) {
    this.tagsError = "The tag can't be greater than 10 characters long";
    return;
  } else if (this.uploadForm.value.tags.indexOf(value) != -1) {
    this.tagsError = "The tag is already used";
    return;
  }

  let newTag = this.createTagInput(value);
  (<FormArray>this.uploadForm.get("tags")).push(newTag);
  console.log(this.uploadForm.invalid,this.loading,!this.file)
  this.myGroup.reset();

}

  upload() {
    // Get the token
    //let token = this._auth.getToken();
    //let headers = new HttpHeaders()
    //  .set("Accept", "application/json")
    //  .set("Authorization", "Bearer " + token);
    console.log("upload")
    // Form data
    let fd = new FormData();

    fd.append("title", this.uploadForm.value.name);

    // Append tags
    for (let i = 0; i < this.uploadForm.value.tags.length; i++) {
      
    }
    fd.append("tags[]", this.uploadForm.value.tags);
    fd.append("price", this.uploadForm.value.price);

    fd.append("song", this.file);
    fd.append("image",this.imageFile)
    //Upload file
    this.loading = true;
    this._http
      .post("http://localhost:8090/api/v1/songs/add", fd, {
     //   headers: headers,
        reportProgress: true,
        observe: "events"
      })
      .subscribe(
        (event: any) => {
          // Upload progress
          if (event.type == HttpEventType.UploadProgress) {
            this.width = (event.loaded / event.total) * 100;
            console.log(this.width + "%");
            return;
          } else if (event.type == HttpEventType.Response) {
            // Redirect the user to the profile page
            //this._auth.redirectProfile();

            this._msg.success("Congratulations!", "Your song uploaded successfully");

            // Increase number of songs
            //this._auth.addSongNumber(1);
          }
        },
        error => {
          console.log(error);
          this._msg.danger("Error!", "Something went wrong uploading the song.");
          this.loading = false;
        },
        () => {
          this.loading = false;
        }
      );
  }

  /**
   * Storing the file in "virable" after validating it
   * @param file
   */
  storeFile(file: File) {
    if (file.size > 1024 * 1024 * 8) {
      // File greater than 8MB
      this.fileError = "The song can't be larger than 8MB";
      return;
    } else if (file.type != "audio/mpeg") {
      // Not a song file
      this.fileError = 'The file must be of type "audio/mpeg"';
      return;
    }

    // Store file info and clear file errors
    this.file = file;
    this.fileNameInput.nativeElement.value = this.file.name;
    this.fileError = "";
  }

  /**
   * Create new tag input
   * @param tagValue string
   * @return FormControl
   */
  createTagInput(tagValue: string) {
    let tag = new FormControl(tagValue, {
      validators: [Validators.minLength(3), Validators.maxLength(10)]
    });

    return tag;
  }

  removeTag(index: number){
    (<FormArray>this.uploadForm.get("tags")).removeAt(index);
  }

  setPath(path){

    this.img.nativeElement.src = path;

    console.log("Path ne")
    console.log(path)
  }
  storeImageFile(file: File){
    console.log(file.type);
    if(file.size > (1024 * 1024 * 2)){
      return;
    }
    let validTypes = ["image/jpeg", "image/png", "image/jpg"];
    if(validTypes.indexOf(file.type) == -1){
      return;
    }
    
    // Store the file
    this.imageFile = file;
    // this.img.nativeElement.src = URL.createObjectURL(this.file);
    this.setPath(URL.createObjectURL(this.imageFile));
  }
}
