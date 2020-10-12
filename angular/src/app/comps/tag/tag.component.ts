import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TagService } from 'src/app/shared/services/tag.service';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {

  constructor(private tagService: TagService) { }

  ngOnInit() {
    this.getAllTag()
    this.tagForm = new FormGroup({
      title: new FormControl(null, {validators: [Validators.required, Validators.minLength(3), Validators.maxLength(255)]})
    });
  }
  show = false
  tagForm: FormGroup
  tags: Tag[]=[]
  getAllTag()
  {
    console.log("tag")
    this.tagService.getALLTag().subscribe(
      res=>{
        this.tags=res
       
      }
    )
  }

  showForm()
  {
    this.show=!this.show;
  }

  addTag()
  {
    console.log(this.tagForm.value.title)
    this.tagService.addTag(this.tagForm.value.title).subscribe(
      res=>{}
    )
  }


}

export class Tag {
  public id: number
  public title: string
  constructor(
    
   
  ){

  }
}
