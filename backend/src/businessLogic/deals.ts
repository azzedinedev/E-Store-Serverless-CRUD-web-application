import * as uuid from 'uuid'
import { DealsAcess } from '../dataLayer/dealsAcess';
import { DealItem } from '../models/DealItem';
import { DealSpecial } from '../models/DealSpecial';
import { DealUpdate } from '../models/DealUpdate';
import { CreateDealRequest } from '../requests/CreateDealRequest';
import { SpecialDealRequest } from '../requests/SpecialDealRequest';
import { UpdateDealRequest } from '../requests/UpdateDealRequest';




// DEAL: Implement businessLogic

const dealsAcess = new DealsAcess()
const bucketName = process.env.IMAGE_S3_BUCKET

export async function getAllRegularDeals(): Promise<DealItem[]> {
  return await dealsAcess.getAllRegularDeals();
}

export async function getAllSpecialDeals(): Promise<DealItem[]> {
  return await dealsAcess.getAllSpecialDeals();
}

export async function getAllDealsPerUser(userId: string): Promise<DealItem[]> {
  return await dealsAcess.getAllDealsPerUser(userId);
}

export async function createDeal(
  createDealRequest: CreateDealRequest, userId: string): Promise<DealItem> {

  const dealId = uuid.v4()
  return await dealsAcess.createDeal({
    userId: userId,
    dealId: dealId,
    createdAt: new Date().getTime().toString(),
    name: createDealRequest.name,
    description: createDealRequest.description,
    originalPrice: createDealRequest.originalPrice,
    dealType: 'Regular Deal',
    salePrice: '',
    imageUrl: `https://${bucketName}.s3.amazonaws.com/${dealId}`
  })
}

export async function getDeal(dealId: string): Promise<DealItem> {
  return await dealsAcess.getDeal(dealId);
}


export async function updateDeal(
  updateDealRequest: UpdateDealRequest,
  dealId: string,
  userId: string
): Promise<DealUpdate> {

  return await dealsAcess.updateDeal(updateDealRequest, dealId, userId)
}

export function deleteDeal(dealId: string, userId: string): Promise<string> {

  return dealsAcess.deleteDeal(dealId, userId)
}

export async function makeDealSpecial(
  specialDealRequest: SpecialDealRequest,
  dealId: string,
  userId: string
): Promise<DealSpecial> {

  return await dealsAcess.makeDealSpecial(specialDealRequest, dealId, userId)
}


export function createAttachmentPresignedUrl(dealId: string): Promise<string> {
  return dealsAcess.createAttachmentPresignedUrl(dealId);
}