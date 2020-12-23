import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TagService } from 'src/app/shared/services/tag.service';

@Component({
  selector: 'app-tag-management',
  templateUrl: './tag-management.component.html',
  styleUrls: ['./tag-management.component.scss']
})
export class TagManagementComponent implements OnInit {

  tags: any
  edit=false
  title: string
  show = false
  tagForm: FormGroup
  count:any
  pageNumber:number[]=[]

  constructor(private tagService: TagService) {}

  ngOnInit() {
    this.tagForm = new FormGroup({
      title: new FormControl(null, {validators: [Validators.required, Validators.minLength(3), Validators.maxLength(255)]})
    });

    this.tagService.countTag().subscribe(
      res=>{
        this.count=res
        this.count = res;
        if (this.count % 4 != 0) {
          this.count = this.count / 4 + 1;
        } else {
          this.count = this.count / 4;
        }
        for (let i=1;i<=this.count;i++)
        {
           this.pageNumber.push(i) 
        }
        if(res!=0)
        this.getPageTag(0)
      }
    )

  }
  getPageTag(page)
  {
      this.tagService.getPageTag(page).subscribe(
        res=>{
          this.tags=res
        }
      )
  }
  allowEdit(i)
  {
    this.tags[i].edit=!this.tags[i].edit
  }
  change(event) 
  {
    this.title=event.target.value
    console.log(event.target.value);
  }

  update(i,id, title)
  {
    this.tagService.updateTag(id, this.title).subscribe(
      res=> {
        let tag: any=res
       
        this.tags[i].title=tag.title
        this.allowEdit(i)
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
    if(this.tagForm.value.title)
    {
      this.tagService.addTag(this.tagForm.value.title).subscribe(
        res=>{
          let Tag:any= res
          this.tags.push(Tag)
          this.showForm()
        }
      )
    }
    }
  


}

export class Tag{
  id: number
  title: string
  edit:boolean=false
}
