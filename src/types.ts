// types.ts
export type Shoe = {
  name: string;
  image: string;
  price: number;
  description?: string;
  quantity: number;
  // Add other properties as needed
};

export type RootStackParamList = {
  ShoeShack: undefined;
  Auth: undefined;
  ShoeInfo: {shoe: Shoe};
  Buy: {shoe: Shoe};
  Settings: undefined;
  SellShoe: undefined;
};

export interface ImagePickerResponse {
  didCancel?: boolean;
  errorCode?: string;
  errorMessage?: string;
  assets?: {
    uri?: string;
  }[];
}
