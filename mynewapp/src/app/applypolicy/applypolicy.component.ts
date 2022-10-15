import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Policy } from '../policy';
import { PolicyService } from '../policy.service';

@Component({
  selector: 'app-applypolicy',
  templateUrl: './applypolicy.component.html',
  styleUrls: ['./applypolicy.component.css']
})
export class ApplypolicyComponent implements OnInit {

  policies:Array<Policy>=[];
  constructor(public router: Router, public ps:PolicyService) { }

  ngOnInit(): void {
    this.findAllPolicy();
  }
  flag:boolean = false;
  policyId:number =0;
  userId:number=0;
  username:string ="";
  policytype:string ="";
  status:string="";
  findAllPolicy() {
    this.ps.findAllPolicy().subscribe({
      next:(result:any)=>this.policies=result,
      error:(error:any)=>console.log(error),
      complete:()=>console.log("completed")
    })
  }

  applyPolicy(policy:any){
    this.flag= true;
    this.userId=policy.userId;
    this.username=policy.username;
    this.policytype=policy.policytype;
}

  deletePolicy(pid:number){
    //console.log(pid)
    this.ps.deletePolicyById(pid).subscribe({
      next:(result:any)=>console.log(result),
      error:(error:any)=>console.log(error),
      complete:()=>{
          this.findAllPolicy();   
      }
    })
  } 


  updatePolicy(policy:any){
      this.flag= true;
      this.userId=policy.userId;
      this.username=policy.username;
      this.policytype=policy.policytype;
  }

  updateDataFromDb(){
    let policy = {userId:this.userId,username:this.username,policytype:this.policytype};
    this.ps.updatePolicy(policy).subscribe({
      next:(result:any)=>console.log(result),
      error:(error:any)=>console.log(error),
      complete:()=>{
          this.findAllPolicy();   
      }
    })
    this.flag=false;
  }
}

