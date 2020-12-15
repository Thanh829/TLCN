import { Component, OnInit } from '@angular/core';
import { TagService } from 'src/app/shared/services/tag.service';

@Component({
  selector: 'app-tag-management',
  templateUrl: './tag-management.component.html',
  styleUrls: ['./tag-management.component.scss']
})
export class TagManagementComponent implements OnInit {

  tags: Tag[]
  edit=false
  title: string
  constructor(private tagService: TagService) {}

  ngOnInit() {
    this.tagService.getALLTag().subscribe(
      res=> {
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



}

export class Tag{
  id: number
  title: string
  edit:boolean=false
}
