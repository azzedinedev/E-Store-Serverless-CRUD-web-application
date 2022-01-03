export interface DealItem {
  userId: string
  dealId: string
  name: string
  description: string
  dealType: string
  originalPrice: string
  salePrice: string
  imageUrl?: string
  createdAt: string
}