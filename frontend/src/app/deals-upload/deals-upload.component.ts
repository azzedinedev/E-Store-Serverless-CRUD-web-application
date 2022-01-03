import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { DealService } from '../service/deal.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-deals-upload',
  templateUrl: './deals-upload.component.html',
  styleUrls: ['./deals-upload.component.css']
})
export class DealsUploadComponent implements OnInit {

  getId: any;
  uploadForm!: FormGroup;
  error!: string; 
  imageData!: string;
  uploadResponse = { status: '', message: '', uploadUrl: '' };
  previewDataUrl:any;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
    private dealService: DealService,
    private auth: AuthService
  ) { 
    
    this.getId = this.activatedRoute.snapshot.paramMap.get('id');

    
  }

  ngOnInit(): void {
    this.uploadForm = new FormGroup({
      image: new FormControl(null),
    });

  }

  setPreviewDataUrl(file: Blob) {
    const reader  = new FileReader();
    reader.onloadend = () => {
      this.previewDataUrl = reader.result;
    };

    reader.readAsDataURL(file);
  }

  onFileChange(event:any) {
    const file = event.target.files[0];
    this.uploadForm.patchValue({ image: file });
    this.setPreviewDataUrl(file);
    
  }
 
  onUpload = async ($event: any ) => {
    $event.preventDefault();
    const uploadUrl = await this.dealService.getUploadUrl(this.getId)
    console.log ("uploadUrl" + ":" + uploadUrl);
    
    (this.dealService.uploadFile(uploadUrl, this.uploadForm.value.image))
    .then(() => {
    console.log ('File was uploaded!')
    this.ngZone.run(() => this.router.navigateByUrl('/regular-deals'))
    
  }, (err) => {
    console.log(err);
});


}
}