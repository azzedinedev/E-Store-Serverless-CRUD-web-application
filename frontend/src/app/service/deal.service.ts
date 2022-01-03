import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Deal } from '../model/Deal';
import { CreateDealRequest } from '../model/CreateDealRequest';
import { UpdateDealRequest } from '../model/UpdateDealRequest';
import { SpecialDealRequest } from '../model/SpecialDealRequest';
import Axios from 'axios';
import { environment } from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})

export class DealService {

  apiEndpoint = environment.apiHost;
  

  deals!: Deal[]
  
  constructor(private auth: AuthService) { }



  async getRegularDeals(): Promise<Deal[]> {
    const response = await Axios.get(`${this.apiEndpoint}/RegularDeals`, {
      headers: {
        'Content-Type': 'application/json'
        
      },
    })
    console.log('Regular Deals:', response.data)
    return response.data.items

  }


  async getSpecialDeals(): Promise<Deal[]> {

    const response = await Axios.get(`${this.apiEndpoint}/SpecialDeals`, {
      headers: {
        'Content-Type': 'application/json'
        
      },
    }) 
    console.log('Special Deals:', response.data)
    return response.data.items
  }

  async getUserDeals(): Promise<Deal[]> {
    const response = await Axios.get(`${this.apiEndpoint}/deals`, {
      headers: {
        'Content-Type': 'application/json' ,
        'Authorization': 'Bearer ' + this.auth.idToken
        
      },
    })
    console.log('User Deals:', response.data)
    return response.data.items
  }
 
 
 
  
  async getDeal(dealId: string): Promise<Deal> {
    const response = await Axios.get(`${this.apiEndpoint}/deals/${dealId}`, {
      headers: {
        'Content-Type': 'application/json' 
      },
    })
    console.log('getting deal details:', response.data)
    return response.data.item
  }


  async createDeal(newDeal: CreateDealRequest): Promise<Deal> {
    const response = await Axios
      .post(`${this.apiEndpoint}/deals`, JSON.stringify(newDeal), {
        headers: {
          'Content-Type': 'application/json' ,
          'Authorization': 'Bearer ' + this.auth.idToken
          
        },
      })
    return response.data.item

  }


  async updateDeal(dealId: string, updatedDeal: UpdateDealRequest): Promise<Deal> {
    const response = await Axios
      .patch(`${this.apiEndpoint}/deals/${dealId}`, JSON.stringify(updatedDeal), {
        headers: {
          'Content-Type': 'application/json' ,
          'Authorization': 'Bearer ' + this.auth.idToken
          
        },
      })
      return response.data.item

  }

  async createSpecialDeal(
    dealId: string,
    specialDeal: SpecialDealRequest
  ): Promise<Deal> {
    const response = await Axios
      .patch(`${this.apiEndpoint}/deals/${dealId}/special`, JSON.stringify(specialDeal), {
        headers: {
          'Content-Type': 'application/json' ,
          'Authorization': 'Bearer ' + this.auth.idToken
          
        },
      })
      return response.data.item

  }

  async deleteDeal(
    dealId: string
  ): Promise<void> {
    await Axios.delete(`${this.apiEndpoint}/deals/${dealId}`, {
      headers: {
        'Content-Type': 'application/json' ,
        'Authorization': 'Bearer ' + this.auth.idToken
        
      },
    })
  }

  async getUploadUrl(
    dealId: string
    
  ): Promise<string> {
    const response = await Axios.post(`${this.apiEndpoint}/deals/${dealId}/attachment`,  '', {
      headers: {
        'Content-Type': 'application/json' ,
        'Authorization': 'Bearer ' + this.auth.idToken
        
      },
    })
    return response.data.uploadUrl
  
}

  async uploadFile(uploadUrl: string, file: Buffer): Promise<any> {
    await Axios.put(uploadUrl, file)
  }

}